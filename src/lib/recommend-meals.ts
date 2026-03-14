import type { AgeGroup } from "@/data/sleep-content";
import type { Meal, MealTiming, MealTag } from "@/data/meal-library";
import type { ScheduleEvent, DailyLog } from "@/types";
import { determineDayType, type DayType } from "@/lib/recommend-drills";
import { determineReadiness, type Readiness } from "@/lib/recommend-drills";

export interface MealPlan {
  meals: Meal[];
  daySummary: string;
  dayType: DayType;
  readiness: Readiness;
  timingSlots: MealTiming[];
}

function getTimingSlots(dayType: DayType, readiness: Readiness): MealTiming[] {
  let slots: MealTiming[];

  switch (dayType) {
    case "game_day":
      slots = ["breakfast", "morning_snack", "pre_game", "halftime", "post_game", "dinner"];
      break;
    case "practice_day":
    case "training_day":
      slots = ["breakfast", "morning_snack", "lunch", "afternoon_snack", "dinner"];
      break;
    case "rest_day":
    case "free_day":
    default:
      slots = ["breakfast", "lunch", "afternoon_snack", "dinner"];
      break;
  }

  // Low readiness on non-game days: drop morning snack
  if (readiness === "low" && dayType !== "game_day") {
    slots = slots.filter((s) => s !== "morning_snack");
  }

  return slots;
}

function getMealDaySummary(dayType: DayType, readiness: Readiness): string {
  const dayLabels: Record<DayType, string> = {
    game_day: "Game Day",
    rest_day: "Rest Day",
    practice_day: "Practice Day",
    training_day: "Training Day",
    free_day: "Free Day",
  };

  const readinessNotes: Record<Readiness, string> = {
    low: "Keep meals light and easy to digest today.",
    moderate: "Balanced meals to fuel a normal day.",
    high: "You're feeling great — fuel up for peak performance!",
  };

  return `${dayLabels[dayType]} — ${readinessNotes[readiness]}`;
}

function getPreferredTags(readiness: Readiness): Set<MealTag> {
  if (readiness === "low") return new Set(["light", "recovery"]);
  if (readiness === "high") return new Set(["high-carb", "energy-boost"]);
  return new Set();
}

export function recommendMeals(params: {
  allMeals: Meal[];
  ageGroup: AgeGroup | null;
  todayEvents: ScheduleEvent[];
  todayLog: DailyLog | null;
}): MealPlan {
  const { allMeals, ageGroup, todayEvents, todayLog } = params;

  const dayType = determineDayType(todayEvents);
  const readiness = determineReadiness(todayLog);
  const daySummary = getMealDaySummary(dayType, readiness);
  const timingSlots = getTimingSlots(dayType, readiness);
  const preferredTags = getPreferredTags(readiness);

  // Deterministic daily variety: use day-of-year as seed
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000);

  const meals: Meal[] = [];

  for (const slot of timingSlots) {
    // Filter meals for this timing slot
    let candidates = allMeals.filter((m) => m.mealTiming === slot);

    // Filter by age group if set
    if (ageGroup) {
      const ageFiltered = candidates.filter((m) => m.ageGroups.includes(ageGroup));
      if (ageFiltered.length > 0) candidates = ageFiltered;
    }

    if (candidates.length === 0) continue;

    // Prefer tag-matched meals
    if (preferredTags.size > 0) {
      const tagMatched = candidates.filter((m) =>
        m.tags.some((t) => preferredTags.has(t))
      );
      if (tagMatched.length > 0) candidates = tagMatched;
    }

    // Pick one deterministically based on day of year
    const pick = candidates[dayOfYear % candidates.length];
    meals.push(pick);
  }

  return { meals, daySummary, dayType, readiness, timingSlots };
}

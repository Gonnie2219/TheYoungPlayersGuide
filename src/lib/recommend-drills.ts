import type { AgeGroup } from "@/data/sleep-content";
import type { Drill } from "@/data/drill-library";
import type { PlayingLevel, ScheduleEvent, DailyLog } from "@/types";

export type DayType = "game_day" | "rest_day" | "practice_day" | "training_day" | "free_day";
export type Readiness = "low" | "moderate" | "high";

export interface DrillRecommendation {
  drills: Drill[];
  daySummary: string;
  dayType: DayType;
  readiness: Readiness;
}

export function determineDayType(events: ScheduleEvent[]): DayType {
  if (events.some((e) => e.eventType === "game")) return "game_day";
  if (events.some((e) => e.eventType === "rest")) return "rest_day";
  if (events.some((e) => e.eventType === "team_practice")) return "practice_day";
  if (events.some((e) => e.eventType === "individual_training")) return "training_day";
  return "free_day";
}

export function determineReadiness(todayLog: DailyLog | null): Readiness {
  if (!todayLog) return "moderate";
  const score = (todayLog.energy + (6 - todayLog.soreness)) / 2;
  if (score >= 3.5) return "high";
  if (score >= 2.5) return "moderate";
  return "low";
}

function getDaySummary(dayType: DayType, readiness: Readiness): string {
  const dayLabels: Record<DayType, string> = {
    game_day: "Game Day",
    rest_day: "Rest Day",
    practice_day: "Practice Day",
    training_day: "Training Day",
    free_day: "Free Day",
  };

  const readinessLabels: Record<Readiness, string> = {
    low: "Take it easy — your body needs lighter work today.",
    moderate: "You're feeling decent — moderate intensity is a good fit.",
    high: "You're feeling great — push yourself today!",
  };

  return `${dayLabels[dayType]} — ${readinessLabels[readiness]}`;
}

function getDrillCap(playingLevel: PlayingLevel | null): number {
  switch (playingLevel) {
    case "recreational": return 3;
    case "club": return 4;
    case "academy":
    case "elite": return 5;
    default: return 3;
  }
}

function getAllowedDifficulties(playingLevel: PlayingLevel | null): Set<string> {
  switch (playingLevel) {
    case "recreational": return new Set(["beginner"]);
    case "club": return new Set(["beginner", "intermediate"]);
    case "academy":
    case "elite": return new Set(["beginner", "intermediate", "advanced"]);
    default: return new Set(["beginner", "intermediate"]);
  }
}

export function recommendDrills(params: {
  allDrills: Drill[];
  ageGroup: AgeGroup | null;
  playingLevel: PlayingLevel | null;
  todayEvents: ScheduleEvent[];
  todayLog: DailyLog | null;
  recentLogs: DailyLog[];
}): DrillRecommendation {
  const { allDrills, ageGroup, playingLevel, todayEvents, todayLog } = params;

  const dayType = determineDayType(todayEvents);
  const readiness = determineReadiness(todayLog);
  const daySummary = getDaySummary(dayType, readiness);

  // 1. Filter by age group
  let filtered = ageGroup
    ? allDrills.filter((d) => d.ageGroups.includes(ageGroup))
    : allDrills;

  // 2. Filter by difficulty based on playing level
  const allowedDifficulties = getAllowedDifficulties(playingLevel);
  filtered = filtered.filter((d) => allowedDifficulties.has(d.difficulty));

  // 3. Filter by intensity based on day type and readiness
  const allowedIntensities = new Set<string>();
  allowedIntensities.add("low");

  if (dayType === "practice_day" || dayType === "training_day" || dayType === "free_day") {
    allowedIntensities.add("moderate");
  }
  if ((dayType === "training_day" || dayType === "free_day") && readiness !== "low") {
    allowedIntensities.add("high");
  }

  filtered = filtered.filter((d) => allowedIntensities.has(d.intensity));

  // 4. Diversify across skill areas — pick from each eligible area
  const cap = getDrillCap(playingLevel);
  const byArea = new Map<string, Drill[]>();
  for (const drill of filtered) {
    const list = byArea.get(drill.skillArea) || [];
    list.push(drill);
    byArea.set(drill.skillArea, list);
  }

  const selected: Drill[] = [];
  const areas = Array.from(byArea.keys());
  const remainingAreas = new Set(areas);

  // Round-robin pick from each area
  let areaIndex = 0;
  while (selected.length < cap && remainingAreas.size > 0) {
    const areaKeys = Array.from(remainingAreas);
    const area = areaKeys[areaIndex % areaKeys.length];
    const areaList = byArea.get(area);
    if (areaList && areaList.length > 0) {
      selected.push(areaList.shift()!);
      areaIndex++;
    } else {
      remainingAreas.delete(area);
    }
  }

  return { drills: selected, daySummary, dayType, readiness };
}

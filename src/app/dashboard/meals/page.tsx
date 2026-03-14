"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";
import { useScheduleEvents } from "@/hooks/use-schedule-events";
import { useDailyLogs } from "@/hooks/use-daily-logs";
import { useUserProfileStore } from "@/stores/user-profile-store";
import { MEALS, MEAL_TIMING_META, type MealTiming } from "@/data/meal-library";
import { recommendMeals } from "@/lib/recommend-meals";
import { MealCard } from "@/components/meals/meal-card";

const MEAL_TIMINGS = Object.keys(MEAL_TIMING_META) as MealTiming[];

export default function MealsPage() {
  const { ageGroup } = useUserProfileStore();
  const { events, loading: eventsLoading } = useScheduleEvents(0);
  const { logs, loading: logsLoading } = useDailyLogs(5);

  const [activeFilter, setActiveFilter] = useState<MealTiming | "all">("all");

  const todayStr = new Date().toISOString().split("T")[0];
  const todayEvents = useMemo(
    () => events.filter((e) => e.date === todayStr),
    [events, todayStr]
  );
  const todayLog = useMemo(
    () => logs.find((l) => l.date === todayStr) ?? null,
    [logs, todayStr]
  );

  const mealPlan = useMemo(
    () =>
      recommendMeals({
        allMeals: MEALS,
        ageGroup,
        todayEvents,
        todayLog,
      }),
    [ageGroup, todayEvents, todayLog]
  );

  const browseMeals = useMemo(() => {
    if (activeFilter === "all") return MEALS;
    return MEALS.filter((m) => m.mealTiming === activeFilter);
  }, [activeFilter]);

  const loading = eventsLoading || logsLoading;

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Loading meals...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Meal Planner</h1>

      <Tabs defaultValue="plan">
        <TabsList>
          <TabsTrigger value="plan">Today&apos;s Meal Plan</TabsTrigger>
          <TabsTrigger value="browse">Browse Meals</TabsTrigger>
        </TabsList>

        {/* Meal Plan Tab */}
        <TabsContent value="plan">
          <div className="space-y-4 mt-4">
            <Card>
              <CardContent className="flex items-start gap-3 pt-6">
                <Lightbulb className="h-5 w-5 mt-0.5 text-amber-500 shrink-0" />
                <div>
                  <p className="font-medium">{mealPlan.daySummary}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {mealPlan.meals.length === 0
                      ? "No meals match your current profile and schedule. Try browsing the full library."
                      : `${mealPlan.meals.length} meal${mealPlan.meals.length !== 1 ? "s" : ""} planned based on your schedule and wellness.`}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mealPlan.meals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Browse Tab */}
        <TabsContent value="browse">
          <div className="space-y-4 mt-4">
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveFilter("all")}>
                <Badge
                  variant={activeFilter === "all" ? "default" : "outline"}
                  className="cursor-pointer"
                >
                  All
                </Badge>
              </button>
              {MEAL_TIMINGS.map((timing) => (
                <button key={timing} onClick={() => setActiveFilter(timing)}>
                  <Badge
                    className={
                      activeFilter === timing
                        ? MEAL_TIMING_META[timing].color + " cursor-pointer"
                        : "cursor-pointer"
                    }
                    variant={activeFilter === timing ? "default" : "outline"}
                  >
                    {MEAL_TIMING_META[timing].label}
                  </Badge>
                </button>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              {browseMeals.length} meal{browseMeals.length !== 1 ? "s" : ""}
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {browseMeals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

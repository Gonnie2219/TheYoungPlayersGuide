"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";
import { useScheduleEvents } from "@/hooks/use-schedule-events";
import { useDailyLogs } from "@/hooks/use-daily-logs";
import { useUserProfileStore } from "@/stores/user-profile-store";
import { DRILLS, SKILL_AREA_META, type SkillArea } from "@/data/drill-library";
import { recommendDrills } from "@/lib/recommend-drills";
import { DrillCard } from "@/components/drills/drill-card";

const SKILL_AREAS = Object.keys(SKILL_AREA_META) as SkillArea[];

export default function DrillsPage() {
  const { ageGroup, playingLevel } = useUserProfileStore();
  const { events, loading: eventsLoading } = useScheduleEvents(0);
  const { logs, loading: logsLoading } = useDailyLogs(5);

  const [activeFilter, setActiveFilter] = useState<SkillArea | "all">("all");

  const todayStr = new Date().toISOString().split("T")[0];
  const todayEvents = useMemo(
    () => events.filter((e) => e.date === todayStr),
    [events, todayStr]
  );
  const todayLog = useMemo(
    () => logs.find((l) => l.date === todayStr) ?? null,
    [logs, todayStr]
  );

  const recommendation = useMemo(
    () =>
      recommendDrills({
        allDrills: DRILLS,
        ageGroup,
        playingLevel,
        todayEvents,
        todayLog,
        recentLogs: logs,
      }),
    [ageGroup, playingLevel, todayEvents, todayLog, logs]
  );

  const browseDrills = useMemo(() => {
    if (activeFilter === "all") return DRILLS;
    return DRILLS.filter((d) => d.skillArea === activeFilter);
  }, [activeFilter]);

  const loading = eventsLoading || logsLoading;

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Loading drills...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Drills</h1>

      <Tabs defaultValue="recommend">
        <TabsList>
          <TabsTrigger value="recommend">Today&apos;s Recommendation</TabsTrigger>
          <TabsTrigger value="browse">Browse Library</TabsTrigger>
        </TabsList>

        {/* Recommendations Tab */}
        <TabsContent value="recommend">
          <div className="space-y-4 mt-4">
            <Card>
              <CardContent className="flex items-start gap-3 pt-6">
                <Lightbulb className="h-5 w-5 mt-0.5 text-amber-500 shrink-0" />
                <div>
                  <p className="font-medium">{recommendation.daySummary}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {recommendation.drills.length === 0
                      ? "No drills match your current profile and schedule. Try browsing the full library."
                      : `${recommendation.drills.length} drill${recommendation.drills.length !== 1 ? "s" : ""} selected for you based on your schedule, wellness, and level.`}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recommendation.drills.map((drill) => (
                <DrillCard key={drill.id} drill={drill} />
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
              {SKILL_AREAS.map((area) => (
                <button key={area} onClick={() => setActiveFilter(area)}>
                  <Badge
                    className={
                      activeFilter === area
                        ? SKILL_AREA_META[area].color + " cursor-pointer"
                        : "cursor-pointer"
                    }
                    variant={activeFilter === area ? "default" : "outline"}
                  >
                    {SKILL_AREA_META[area].label}
                  </Badge>
                </button>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              {browseDrills.length} drill{browseDrills.length !== 1 ? "s" : ""}
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {browseDrills.map((drill) => (
                <DrillCard key={drill.id} drill={drill} />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

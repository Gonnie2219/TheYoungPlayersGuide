"use client";

import { useDailyLogs } from "@/hooks/use-daily-logs";
import { useUserProfileStore } from "@/stores/user-profile-store";
import { SleepTrendChart } from "@/components/dashboard/sleep-trend-chart";
import { WellnessTrendChart } from "@/components/dashboard/wellness-trend-chart";
import { TrainingLoadChart } from "@/components/dashboard/training-load-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function computeGoalProgress(goal: string, logs: { sleepQuality: number; energy: number; mood: number; soreness: number; sleepHours: number; hadTraining: boolean; hadMatch: boolean; hydration: string | null }[]): number {
  if (logs.length === 0) return 0;
  const lower = goal.toLowerCase();

  if (lower.includes("sleep")) {
    return (logs.filter((l) => l.sleepQuality >= 4).length / logs.length) * 100;
  }
  if (lower.includes("nutrition")) {
    return (logs.filter((l) => l.hydration === "good" || l.hydration === "great").length / logs.length) * 100;
  }
  if (lower.includes("injury")) {
    return (logs.filter((l) => l.soreness >= 4).length / logs.length) * 100;
  }
  if (lower.includes("mental")) {
    return (logs.filter((l) => l.mood >= 4).length / logs.length) * 100;
  }
  if (lower.includes("training")) {
    return (logs.filter((l) => l.hadTraining || l.hadMatch).length / logs.length) * 100;
  }
  if (lower.includes("recovery")) {
    return (logs.filter((l) => l.sleepHours >= 8 && l.soreness >= 4).length / logs.length) * 100;
  }
  // Fallback: % of days logged out of 30
  return (logs.length / 30) * 100;
}

function aggregateWeeklyTraining(logs: { date: string; hadTraining: boolean; hadMatch: boolean }[]): { label: string; training: number; match: number }[] {
  if (logs.length === 0) return [];

  // Group into 4 weekly buckets
  const sorted = [...logs].sort((a, b) => a.date.localeCompare(b.date));
  const weeks: { label: string; training: number; match: number }[] = [];
  const bucketSize = Math.ceil(sorted.length / 4);

  for (let i = 0; i < 4; i++) {
    const slice = sorted.slice(i * bucketSize, (i + 1) * bucketSize);
    if (slice.length === 0) continue;
    weeks.push({
      label: `Week ${i + 1}`,
      training: slice.filter((l) => l.hadTraining).length,
      match: slice.filter((l) => l.hadMatch).length,
    });
  }

  return weeks;
}

const hydrationColors: Record<string, string> = {
  poor: "bg-red-400",
  ok: "bg-yellow-400",
  good: "bg-green-400",
  great: "bg-blue-400",
};

export default function ProgressPage() {
  const { logs, loading } = useDailyLogs(30);
  const { goals } = useUserProfileStore();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Loading progress...</p>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <Card>
          <CardContent className="py-12">
            <h2 className="mb-2 text-xl font-semibold">No data yet</h2>
            <p className="text-muted-foreground">
              Start logging daily to track your 30-day progress.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sleepData = logs.map((l) => ({ date: l.date, sleepHours: l.sleepHours }));
  const wellnessData = logs.map((l) => ({
    date: l.date,
    sleepQuality: l.sleepQuality,
    energy: l.energy,
    mood: l.mood,
    soreness: l.soreness,
  }));
  const weeklyTraining = aggregateWeeklyTraining(logs);

  // Hydration distribution
  const hydrationCounts: Record<string, number> = { poor: 0, ok: 0, good: 0, great: 0 };
  logs.forEach((l) => {
    if (l.hydration && hydrationCounts[l.hydration] !== undefined) {
      hydrationCounts[l.hydration]++;
    }
  });
  const totalHydration = Object.values(hydrationCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Progress</h1>

      {/* Charts row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <SleepTrendChart data={sleepData} />
        <WellnessTrendChart data={wellnessData} />
      </div>

      {/* Training load (full width) */}
      <TrainingLoadChart data={weeklyTraining} />

      {/* Goal progress */}
      {goals.length > 0 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold">Goal Progress</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {goals.map((goal, i) => {
              const pct = Math.min(100, Math.round(computeGoalProgress(goal, logs)));
              return (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <p className="mb-2 text-sm font-medium">{goal}</p>
                    <div className="flex items-center gap-3">
                      <div className="h-2.5 flex-1 rounded-full bg-muted">
                        <div
                          className="h-2.5 rounded-full bg-primary transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{pct}%</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Hydration distribution */}
      {totalHydration > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Hydration Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-6 w-full overflow-hidden rounded-full">
              {(["poor", "ok", "good", "great"] as const).map((level) => {
                const pct = (hydrationCounts[level] / totalHydration) * 100;
                if (pct === 0) return null;
                return (
                  <div
                    key={level}
                    className={`${hydrationColors[level]} flex items-center justify-center text-xs font-medium text-white`}
                    style={{ width: `${pct}%` }}
                    title={`${level}: ${hydrationCounts[level]}`}
                  >
                    {pct >= 15 ? level : ""}
                  </div>
                );
              })}
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              {(["poor", "ok", "good", "great"] as const).map((level) => (
                <span key={level} className="capitalize">
                  {level}: {hydrationCounts[level]}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

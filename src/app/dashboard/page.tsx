"use client";

import Link from "next/link";
import { useDailyLogs } from "@/hooks/use-daily-logs";
import { useUserProfileStore } from "@/stores/user-profile-store";
import { SleepTrendChart } from "@/components/dashboard/sleep-trend-chart";
import { TrainingLoadChart } from "@/components/dashboard/training-load-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, BarChart3, TrendingUp, Target, Calendar, Dumbbell, UtensilsCrossed } from "lucide-react";

export default function DashboardPage() {
  const { logs, loading } = useDailyLogs(7);
  const { goals } = useUserProfileStore();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <Card>
          <CardContent className="py-12">
            <h2 className="mb-2 text-xl font-semibold">Start logging to see your trends</h2>
            <p className="mb-6 text-muted-foreground">
              Log your first day to unlock charts, wellness scores, and streak tracking.
            </p>
            <Link
              href="/dashboard/log"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <ClipboardList className="h-4 w-4" />
              Log Today
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Today's snapshot
  const todayStr = new Date().toISOString().split("T")[0];
  const todayLog = logs.find((l) => l.date === todayStr);

  // Wellness score (average of 4 metrics across all logs)
  const wellnessScore =
    logs.reduce((sum, l) => sum + (l.sleepQuality + l.energy + l.mood + l.soreness) / 4, 0) /
    logs.length;

  // Streak (consecutive days backwards from today with a log)
  let streak = 0;
  const logDates = new Set(logs.map((l) => l.date));
  const checkDate = new Date();
  while (true) {
    const dateStr = checkDate.toISOString().split("T")[0];
    if (logDates.has(dateStr)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  // Chart data
  const sleepData = logs.map((l) => ({ date: l.date, sleepHours: l.sleepHours }));

  const trainingData = logs.map((l) => ({
    label: new Date(l.date + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "short",
    }),
    training: l.hadTraining ? 1 : 0,
    match: l.hadMatch ? 1 : 0,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Row 1: Today + Wellness Score */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Today&apos;s Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            {todayLog ? (
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Sleep</span>
                  <p className="font-medium">{todayLog.sleepHours}h (Quality: {todayLog.sleepQuality}/5)</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Energy</span>
                  <p className="font-medium">{todayLog.energy}/5</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Mood</span>
                  <p className="font-medium">{todayLog.mood}/5</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Soreness</span>
                  <p className="font-medium">{todayLog.soreness}/5</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="mb-3 text-sm text-muted-foreground">No log yet today</p>
                <Link
                  href="/dashboard/log"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Log now
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Wellness Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">{wellnessScore.toFixed(1)}</span>
              <span className="text-lg text-muted-foreground">/5</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">7-day average</p>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Charts */}
      <div className="grid gap-4 sm:grid-cols-2">
        <SleepTrendChart data={sleepData} />
        <TrainingLoadChart data={trainingData} />
      </div>

      {/* Row 3: Streak + Quick Nav */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">{streak}</span>
              <span className="text-muted-foreground">day{streak !== 1 ? "s" : ""}</span>
            </div>
          </CardContent>
        </Card>

        <Link href="/dashboard/log" className="block">
          <Card className="h-full transition-colors hover:bg-muted/50">
            <CardContent className="flex items-center gap-3 pt-6">
              <ClipboardList className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Daily Log</p>
                <p className="text-sm text-muted-foreground">Record today</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/plans" className="block">
          <Card className="h-full transition-colors hover:bg-muted/50">
            <CardContent className="flex items-center gap-3 pt-6">
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Plans</p>
                <p className="text-sm text-muted-foreground">Weekly view</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/schedule" className="block">
          <Card className="h-full transition-colors hover:bg-muted/50">
            <CardContent className="flex items-center gap-3 pt-6">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Schedule</p>
                <p className="text-sm text-muted-foreground">Team calendar</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/drills" className="block">
          <Card className="h-full transition-colors hover:bg-muted/50">
            <CardContent className="flex items-center gap-3 pt-6">
              <Dumbbell className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Drills</p>
                <p className="text-sm text-muted-foreground">Today&apos;s picks</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/meals" className="block">
          <Card className="h-full transition-colors hover:bg-muted/50">
            <CardContent className="flex items-center gap-3 pt-6">
              <UtensilsCrossed className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Meals</p>
                <p className="text-sm text-muted-foreground">Daily meal plan</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/progress" className="block">
          <Card className="h-full transition-colors hover:bg-muted/50">
            <CardContent className="flex items-center gap-3 pt-6">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Progress</p>
                <p className="text-sm text-muted-foreground">30-day trends</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Goals summary */}
      {goals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              {goals.map((goal, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Target className="h-3 w-3 text-muted-foreground" />
                  {goal}
                </li>
              ))}
            </ul>
            <Link
              href="/dashboard/progress"
              className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
            >
              View progress
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

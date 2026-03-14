"use client";

import { useDailyLogs } from "@/hooks/use-daily-logs";
import { useUserProfileStore } from "@/stores/user-profile-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const levelRecommendations: Record<string, string> = {
  recreational: "2\u20133 sessions/week",
  club: "3\u20134 sessions/week",
  academy: "4\u20135 sessions/week with structured rest",
  elite: "5\u20136 sessions/week with periodized recovery",
};

function getWeekDays(): { label: string; dateStr: string }[] {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7)); // back to Monday

  const days: { label: string; dateStr: string }[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push({
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      dateStr: d.toISOString().split("T")[0],
    });
  }
  return days;
}

export default function PlansPage() {
  const { logs, loading } = useDailyLogs(7);
  const { playingLevel } = useUserProfileStore();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Loading plans...</p>
      </div>
    );
  }

  const weekDays = getWeekDays();
  const logMap = new Map(logs.map((l) => [l.date, l]));

  // Summary counts
  let trainingDays = 0;
  let matchDays = 0;
  let restDays = 0;
  logs.forEach((l) => {
    if (l.hadTraining) trainingDays++;
    if (l.hadMatch) matchDays++;
    if (!l.hadTraining && !l.hadMatch) restDays++;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Training Plans</h1>

      {/* 7-day grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 max-sm:grid-cols-1">
            {weekDays.map(({ label, dateStr }) => {
              const log = logMap.get(dateStr);
              return (
                <div
                  key={dateStr}
                  className="flex flex-col items-center gap-1 rounded-lg border p-3 text-center"
                >
                  <span className="text-xs font-medium text-muted-foreground">{label}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>

                  {!log ? (
                    <span className="mt-1 text-sm text-muted-foreground">&mdash;</span>
                  ) : (
                    <div className="mt-1 flex flex-col items-center gap-1">
                      {log.hadTraining && (
                        <Badge variant="outline" className="border-orange-400 text-orange-500 text-xs">
                          Training
                        </Badge>
                      )}
                      {log.hadMatch && (
                        <Badge variant="outline" className="border-green-400 text-green-500 text-xs">
                          Match
                        </Badge>
                      )}
                      {!log.hadTraining && !log.hadMatch && (
                        <Badge variant="secondary" className="text-xs">Rest</Badge>
                      )}
                      <div className="flex gap-1 text-xs">
                        <span title="Sleep Quality">
                          {log.sleepQuality >= 4 ? "\u{1F7E2}" : log.sleepQuality >= 3 ? "\u{1F7E1}" : "\u{1F534}"}
                        </span>
                        <span title="Energy">
                          {log.energy >= 4 ? "\u26A1" : log.energy >= 3 ? "\u{1F7E1}" : "\u{1F534}"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Training load summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Weekly Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{trainingDays}</p>
              <p className="text-sm text-muted-foreground">Training days</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{matchDays}</p>
              <p className="text-sm text-muted-foreground">Match days</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{restDays}</p>
              <p className="text-sm text-muted-foreground">Rest days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Based on your{" "}
            <span className="font-medium capitalize">{playingLevel ?? "recreational"}</span> level:
          </p>
          <p className="mt-2 text-lg font-semibold">
            {levelRecommendations[playingLevel ?? "recreational"]}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Balance training intensity with adequate rest. Monitor your energy and soreness levels to
            avoid overtraining.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

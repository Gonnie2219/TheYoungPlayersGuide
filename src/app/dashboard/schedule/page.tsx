"use client";

import { useState } from "react";
import { useScheduleEvents } from "@/hooks/use-schedule-events";
import { AddEventDialog } from "@/components/schedule/add-event-dialog";
import { WeeklyCalendar } from "@/components/schedule/weekly-calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

function getWeekLabel(weekOffset: number): string {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7) + weekOffset * 7);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return `Week of ${fmt(monday)}–${fmt(sunday)}, ${monday.getFullYear()}`;
}

export default function SchedulePage() {
  const [weekOffset, setWeekOffset] = useState(0);
  const { events, loading, refetch } = useScheduleEvents(weekOffset);

  async function handleDelete(id: string) {
    await fetch(`/api/schedule?id=${id}`, { method: "DELETE" });
    refetch();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Schedule</h1>
        <AddEventDialog onCreated={refetch} />
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-center gap-4">
        <Button variant="outline" size="icon-sm" onClick={() => setWeekOffset((w) => w - 1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">{getWeekLabel(weekOffset)}</span>
        <Button variant="outline" size="icon-sm" onClick={() => setWeekOffset((w) => w + 1)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Weekly Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex min-h-[200px] items-center justify-center">
              <p className="text-muted-foreground">Loading schedule...</p>
            </div>
          ) : (
            <WeeklyCalendar events={events} weekOffset={weekOffset} onDelete={handleDelete} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

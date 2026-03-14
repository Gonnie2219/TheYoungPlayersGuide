"use client";

import { X } from "lucide-react";
import type { ScheduleEvent, EventType } from "@/types";

const EVENT_COLORS: Record<EventType, { card: string; border: string }> = {
  team_practice: {
    card: "bg-green-50 dark:bg-green-950/40",
    border: "border-l-green-500",
  },
  game: {
    card: "bg-red-50 dark:bg-red-950/40",
    border: "border-l-red-500",
  },
  individual_training: {
    card: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-l-blue-500",
  },
  rest: {
    card: "bg-gray-50 dark:bg-gray-800/40",
    border: "border-l-gray-400",
  },
};

function formatTime(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${m.toString().padStart(2, "0")} ${suffix}`;
}

function getWeekDays(weekOffset: number): { label: string; dateStr: string; dayIndex: number }[] {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7) + weekOffset * 7);

  const days: { label: string; dateStr: string; dayIndex: number }[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push({
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      dateStr: d.toISOString().split("T")[0],
      dayIndex: d.getDay(), // 0=Sun..6=Sat
    });
  }
  return days;
}

export function WeeklyCalendar({
  events,
  weekOffset,
  onDelete,
}: {
  events: ScheduleEvent[];
  weekOffset: number;
  onDelete: (id: string) => void;
}) {
  const weekDays = getWeekDays(weekOffset);

  function getEventsForDay(dateStr: string, dayIndex: number): ScheduleEvent[] {
    return events.filter((e) => {
      if (e.recurrence === "one_time") {
        return e.date === dateStr;
      }
      // Weekly recurring: match by dayOfWeek
      return e.dayOfWeek === dayIndex;
    });
  }

  return (
    <div className="grid grid-cols-7 gap-2 max-sm:grid-cols-1">
      {weekDays.map(({ label, dateStr, dayIndex }) => {
        const dayEvents = getEventsForDay(dateStr, dayIndex);
        const isToday = dateStr === new Date().toISOString().split("T")[0];

        return (
          <div
            key={dateStr}
            className={`flex min-h-[120px] flex-col rounded-lg border p-2 ${
              isToday ? "border-primary/50 bg-primary/5" : ""
            }`}
          >
            <div className="mb-2 text-center">
              <span className="text-xs font-medium text-muted-foreground">{label}</span>
              <br />
              <span className={`text-xs ${isToday ? "font-bold text-primary" : "text-muted-foreground"}`}>
                {new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-1">
              {dayEvents.length === 0 && (
                <span className="text-center text-xs text-muted-foreground">&mdash;</span>
              )}
              {dayEvents.map((event) => {
                const colors = EVENT_COLORS[event.eventType as EventType];
                return (
                  <div
                    key={event.id + dateStr}
                    className={`group relative rounded border-l-3 p-1.5 ${colors.card} ${colors.border}`}
                  >
                    <button
                      onClick={() => onDelete(event.id)}
                      className="absolute top-0.5 right-0.5 hidden rounded p-0.5 hover:bg-black/10 group-hover:block dark:hover:bg-white/10"
                      title="Delete event"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <p className="text-xs font-medium leading-tight">{event.title}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {formatTime(event.startTime)} – {formatTime(event.endTime)}
                    </p>
                    {event.location && (
                      <p className="text-[10px] text-muted-foreground truncate">{event.location}</p>
                    )}
                    {event.recurrence === "weekly" && (
                      <p className="text-[10px] italic text-muted-foreground">weekly</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

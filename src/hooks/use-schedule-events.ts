"use client";

import { useEffect, useState, useCallback } from "react";
import type { ScheduleEvent } from "@/types";

export function useScheduleEvents(weekOffset: number) {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchKey, setFetchKey] = useState(0);

  const refetch = useCallback(() => setFetchKey((k) => k + 1), []);

  useEffect(() => {
    setLoading(true);

    const today = new Date();
    const dayOfWeek = today.getDay(); // 0=Sun
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7) + weekOffset * 7);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const fromStr = monday.toISOString().split("T")[0];
    const toStr = sunday.toISOString().split("T")[0];

    fetch(`/api/schedule?from=${fromStr}&to=${toStr}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setEvents(data))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, [weekOffset, fetchKey]);

  return { events, loading, refetch };
}

"use client";

import { useEffect, useState } from "react";
import type { DailyLog } from "@/types";

export function useDailyLogs(days: number) {
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    const from = new Date(today);
    from.setDate(from.getDate() - days);

    const toStr = today.toISOString().split("T")[0];
    const fromStr = from.toISOString().split("T")[0];

    fetch(`/api/daily-log?from=${fromStr}&to=${toStr}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setLogs(data))
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  }, [days]);

  return { logs, loading };
}

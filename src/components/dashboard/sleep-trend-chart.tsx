"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SleepTrendChartProps {
  data: { date: string; sleepHours: number }[];
}

export function SleepTrendChart({ data }: SleepTrendChartProps) {
  const formatted = data.map((d) => ({
    ...d,
    date: new Date(d.date + "T00:00:00").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Sleep Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={formatted}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="date" fontSize={12} />
            <YAxis domain={[0, 12]} fontSize={12} unit="h" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sleepHours"
              stroke="var(--color-chart-1)"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Sleep Hours"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WellnessTrendChartProps {
  data: {
    date: string;
    sleepQuality: number;
    energy: number;
    mood: number;
    soreness: number;
  }[];
}

export function WellnessTrendChart({ data }: WellnessTrendChartProps) {
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
        <CardTitle className="text-base">Wellness Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={formatted}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="date" fontSize={12} />
            <YAxis domain={[1, 5]} fontSize={12} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sleepQuality"
              stroke="var(--color-chart-1)"
              strokeWidth={2}
              dot={{ r: 2 }}
              name="Sleep Quality"
            />
            <Line
              type="monotone"
              dataKey="energy"
              stroke="var(--color-chart-2)"
              strokeWidth={2}
              dot={{ r: 2 }}
              name="Energy"
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="var(--color-chart-3)"
              strokeWidth={2}
              dot={{ r: 2 }}
              name="Mood"
            />
            <Line
              type="monotone"
              dataKey="soreness"
              stroke="var(--color-chart-4)"
              strokeWidth={2}
              dot={{ r: 2 }}
              name="Soreness"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

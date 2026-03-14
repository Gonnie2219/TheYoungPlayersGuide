"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TrainingLoadChartProps {
  data: { label: string; training: number; match: number }[];
}

export function TrainingLoadChart({ data }: TrainingLoadChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Training Load</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="label" fontSize={12} />
            <YAxis fontSize={12} allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="training"
              fill="var(--color-chart-2)"
              name="Training"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="match"
              fill="var(--color-chart-1)"
              name="Match"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

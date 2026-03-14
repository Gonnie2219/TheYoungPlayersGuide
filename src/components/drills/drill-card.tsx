"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Package } from "lucide-react";
import type { Drill } from "@/data/drill-library";
import { SKILL_AREA_META } from "@/data/drill-library";

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function DrillCard({ drill }: { drill: Drill }) {
  const areaMeta = SKILL_AREA_META[drill.skillArea];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap gap-1.5 mb-1.5">
          <Badge className={areaMeta.color}>{areaMeta.label}</Badge>
          <Badge className={DIFFICULTY_COLORS[drill.difficulty]}>
            {drill.difficulty}
          </Badge>
        </div>
        <CardTitle className="text-base">{drill.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {drill.durationMinutes} min
          </span>
          {drill.equipment.length > 0 && (
            <span className="flex items-center gap-1">
              <Package className="h-3 w-3" />
              {drill.equipment.join(", ")}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{drill.description}</p>
        <div>
          <p className="text-xs font-medium mb-1">Coaching Points</p>
          <ul className="space-y-0.5 text-xs text-muted-foreground">
            {drill.coachingPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

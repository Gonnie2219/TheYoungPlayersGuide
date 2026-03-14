"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, UtensilsCrossed } from "lucide-react";
import type { Meal } from "@/data/meal-library";
import { MEAL_TIMING_META } from "@/data/meal-library";

const TAG_COLORS: Record<string, string> = {
  "high-carb": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  "high-protein": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "light": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "recovery": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "quick-prep": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  "hydrating": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  "energy-boost": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function MealCard({ meal }: { meal: Meal }) {
  const timingMeta = MEAL_TIMING_META[meal.mealTiming];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap gap-1.5 mb-1.5">
          <Badge className={timingMeta.color}>{timingMeta.label}</Badge>
          {meal.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} className={TAG_COLORS[tag] ?? ""}>
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-base">{meal.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {meal.prepMinutes} min prep
          </span>
          <span className="flex items-center gap-1">
            <UtensilsCrossed className="h-3 w-3" />
            {meal.ingredients.length} ingredients
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{meal.description}</p>
        <div>
          <p className="text-xs font-medium mb-1">Ingredients</p>
          <ul className="space-y-0.5 text-xs text-muted-foreground">
            {meal.ingredients.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-muted-foreground/70 italic">{meal.portionNote}</p>
      </CardContent>
    </Card>
  );
}

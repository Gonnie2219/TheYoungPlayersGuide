"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { CitationRef } from "@/components/shared/citation-ref";
import { CitationList } from "@/components/shared/citation-list";
import { NutritionHero } from "@/components/nutrition/nutrition-hero";
import { type AgeGroup } from "@/data/sleep-content";
import {
  nutritionByAge,
  energyFuelingContent,
  macronutrientsContent,
  micronutrientsContent,
  hydrationContent,
  matchDayContent,
  redFlagsContent,
  quickTakeaways,
} from "@/data/nutrition-content";

const ageGroups: { value: AgeGroup; label: string }[] = [
  { value: "6-9", label: "6–9" },
  { value: "10-12", label: "10–12" },
  { value: "13-15", label: "13–15" },
  { value: "16-18", label: "16–18" },
];

export default function NutritionPage() {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("10-12");

  const recommendation = nutritionByAge.find(
    (r) => r.ageGroup === ageGroup
  )!;

  return (
    <main className="flex min-h-screen flex-col">
      <NutritionHero />

      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
        {/* Age Group Selector */}
        <div className="mb-8">
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">
            Select age group
          </h2>
          <div className="flex flex-wrap gap-2">
            {ageGroups.map((ag) => (
              <button
                key={ag.value}
                onClick={() => setAgeGroup(ag.value)}
                className="cursor-pointer"
              >
                <Badge
                  variant={ageGroup === ag.value ? "default" : "outline"}
                >
                  {ag.label}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue={0}>
          <TabsList className="mb-6 w-full flex-wrap">
            <TabsTrigger value={0}>Energy &amp; Fueling</TabsTrigger>
            <TabsTrigger value={1}>Macronutrients</TabsTrigger>
            <TabsTrigger value={2}>Micronutrients</TabsTrigger>
            <TabsTrigger value={3}>Hydration</TabsTrigger>
            <TabsTrigger value={4}>Match Day</TabsTrigger>
            <TabsTrigger value={5}>Red Flags</TabsTrigger>
          </TabsList>

          {/* Energy & Fueling */}
          <TabsContent value={0} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {energyFuelingContent.intro}
            </p>
            <ul className="space-y-3">
              {energyFuelingContent.points.map((point, i) => (
                <li key={i} className="flex gap-2 leading-relaxed">
                  <span className="mt-1 text-primary">•</span>
                  <span>
                    {point.text}
                    <CitationRef id={point.citation} />
                  </span>
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* Macronutrients */}
          <TabsContent value={1} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {macronutrientsContent.intro}
            </p>
            <Card>
              <CardHeader>
                <CardTitle>
                  {recommendation.label}: Macronutrient Targets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-primary">
                      <CheckCircle className="size-4" />
                    </span>
                    <span>
                      <strong>Calories:</strong> {recommendation.calories} per day
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-primary">
                      <CheckCircle className="size-4" />
                    </span>
                    <span>
                      <strong>Carbs:</strong> {recommendation.carbsPerKg} body weight
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-primary">
                      <CheckCircle className="size-4" />
                    </span>
                    <span>
                      <strong>Protein:</strong> {recommendation.proteinPerKg} body weight
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-primary">
                      <CheckCircle className="size-4" />
                    </span>
                    <span>
                      <strong>Daily fluids:</strong> {recommendation.hydrationMl}
                    </span>
                  </li>
                </ul>
                <hr className="my-4" />
                <ul className="space-y-2">
                  {recommendation.tips.map((tip, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-0.5 text-primary">
                        <CheckCircle className="size-4" />
                      </span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <ul className="space-y-3">
              {macronutrientsContent.points.map((point, i) => (
                <li key={i} className="flex gap-2 leading-relaxed">
                  <span className="mt-1 text-primary">•</span>
                  <span>
                    {point.text}
                    <CitationRef id={point.citation} />
                  </span>
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* Micronutrients */}
          <TabsContent value={2} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {micronutrientsContent.intro}
            </p>
            <ul className="space-y-3">
              {micronutrientsContent.points.map((point, i) => (
                <li key={i} className="flex gap-2 leading-relaxed">
                  <span className="mt-1 text-primary">•</span>
                  <span>
                    {point.text}
                    <CitationRef id={point.citation} />
                  </span>
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* Hydration */}
          <TabsContent value={3} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {hydrationContent.intro}
            </p>
            <ul className="space-y-3">
              {hydrationContent.points.map((point, i) => (
                <li key={i} className="flex gap-2 leading-relaxed">
                  <span className="mt-1 text-primary">•</span>
                  <span>
                    {point.text}
                    <CitationRef id={point.citation} />
                  </span>
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* Match Day */}
          <TabsContent value={4} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {matchDayContent.intro}
            </p>
            <ul className="space-y-3">
              {matchDayContent.points.map((point, i) => (
                <li key={i} className="flex gap-2 leading-relaxed">
                  <span className="mt-1 text-primary">•</span>
                  <span>
                    {point.text}
                    <CitationRef id={point.citation} />
                  </span>
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* Red Flags */}
          <TabsContent value={5} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {redFlagsContent.intro}
            </p>
            <ul className="space-y-3">
              {redFlagsContent.points.map((point, i) => (
                <li key={i} className="flex gap-2 leading-relaxed">
                  <span className="mt-1 text-primary">•</span>
                  <span>
                    {point.text}
                    <CitationRef id={point.citation} />
                  </span>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>

        {/* Quick Takeaways */}
        <Card className="mt-10">
          <CardHeader>
            <CardTitle>Quick Takeaways</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {quickTakeaways.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-0.5 text-primary">
                    <CheckCircle className="size-4" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* References */}
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold">References</h2>
          <CitationList category="nutrition" />
        </section>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
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
import { InjuryPreventionHero } from "@/components/injury-prevention/injury-prevention-hero";
import { type AgeGroup } from "@/data/sleep-content";
import {
  injuryPreventionByAge,
  commonInjuriesContent,
  riskFactorsContent,
  preventionStrategiesContent,
  sleepNutritionInjuryContent,
  whenInjuredContent,
  quickTakeaways,
} from "@/data/injury-prevention-content";

const ageGroups: { value: AgeGroup; label: string }[] = [
  { value: "6-9", label: "6–9" },
  { value: "10-12", label: "10–12" },
  { value: "13-15", label: "13–15" },
  { value: "16-18", label: "16–18" },
];

export default function InjuryPreventionPage() {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("10-12");

  const ageData = injuryPreventionByAge.find((r) => r.ageGroup === ageGroup)!;

  return (
    <main className="flex min-h-screen flex-col">
      <InjuryPreventionHero />

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
            <TabsTrigger value={0}>Common Injuries</TabsTrigger>
            <TabsTrigger value={1}>Risk Factors</TabsTrigger>
            <TabsTrigger value={2}>Prevention Strategies</TabsTrigger>
            <TabsTrigger value={3}>Sleep, Nutrition &amp; Injury</TabsTrigger>
            <TabsTrigger value={4}>When Injured</TabsTrigger>
          </TabsList>

          {/* Common Injuries */}
          <TabsContent value={0} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {commonInjuriesContent.intro}
            </p>
            <ul className="space-y-3">
              {commonInjuriesContent.points.map((point, i) => (
                <li key={i} className="flex gap-2 leading-relaxed">
                  <span className="mt-1 text-primary">•</span>
                  <span>
                    {point.text}
                    <CitationRef id={point.citation} />
                  </span>
                </li>
              ))}
            </ul>
            <Card>
              <CardHeader>
                <CardTitle>
                  {ageData.label}: Common Injuries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {ageData.commonInjuries.map((injury, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-0.5 text-primary">
                        <CheckCircle className="size-4" />
                      </span>
                      <span>{injury}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Risk Factors */}
          <TabsContent value={1} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {riskFactorsContent.intro}
            </p>
            <ul className="space-y-3">
              {riskFactorsContent.points.map((point, i) => (
                <li key={i} className="flex gap-2 leading-relaxed">
                  <span className="mt-1 text-primary">•</span>
                  <span>
                    {point.text}
                    <CitationRef id={point.citation} />
                  </span>
                </li>
              ))}
            </ul>
            <Card>
              <CardHeader>
                <CardTitle>
                  {ageData.label}: Risk Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {ageData.riskFactors.map((factor, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-0.5 text-primary">
                        <CheckCircle className="size-4" />
                      </span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prevention Strategies */}
          <TabsContent value={2} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {preventionStrategiesContent.intro}
            </p>
            <ul className="space-y-3">
              {preventionStrategiesContent.points.map((point, i) => (
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

          {/* Sleep, Nutrition & Injury */}
          <TabsContent value={3} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {sleepNutritionInjuryContent.intro}
            </p>
            <ul className="space-y-3">
              {sleepNutritionInjuryContent.points.map((point, i) => (
                <li key={i} className="flex gap-2 leading-relaxed">
                  <span className="mt-1 text-primary">•</span>
                  <span>
                    {point.text}
                    <CitationRef id={point.citation} />
                  </span>
                </li>
              ))}
            </ul>
            <Card>
              <CardHeader>
                <CardTitle>Related Sections</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-primary">
                      <CheckCircle className="size-4" />
                    </span>
                    <span>
                      Learn more about sleep recommendations in our{" "}
                      <Link
                        href="/sleep"
                        className="font-medium text-primary underline underline-offset-4"
                      >
                        Sleep Guide
                      </Link>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-primary">
                      <CheckCircle className="size-4" />
                    </span>
                    <span>
                      Explore fueling strategies in our{" "}
                      <Link
                        href="/nutrition"
                        className="font-medium text-primary underline underline-offset-4"
                      >
                        Nutrition Guide
                      </Link>
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* When Injured */}
          <TabsContent value={4} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {whenInjuredContent.intro}
            </p>
            <ul className="space-y-3">
              {whenInjuredContent.points.map((point, i) => (
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
          <CitationList category="injury-prevention" />
        </section>
      </div>
    </main>
  );
}

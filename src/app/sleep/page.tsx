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
import { SleepHero } from "@/components/sleep/sleep-hero";
import {
  type AgeGroup,
  sleepRecommendations,
  whyItMattersContent,
  sleepHygieneContent,
  gameDayContent,
  warningSigns,
  quickTakeaways,
} from "@/data/sleep-content";

const ageGroups: { value: AgeGroup; label: string }[] = [
  { value: "6-9", label: "6–9" },
  { value: "10-12", label: "10–12" },
  { value: "13-15", label: "13–15" },
  { value: "16-18", label: "16–18" },
];

export default function SleepPage() {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("10-12");

  const recommendation = sleepRecommendations.find(
    (r) => r.ageGroup === ageGroup
  )!;

  return (
    <main className="flex min-h-screen flex-col">
      <SleepHero />

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
            <TabsTrigger value={0}>Why It Matters</TabsTrigger>
            <TabsTrigger value={1}>How Much Sleep</TabsTrigger>
            <TabsTrigger value={2}>Sleep Hygiene</TabsTrigger>
            <TabsTrigger value={3}>Game Day</TabsTrigger>
            <TabsTrigger value={4}>Warning Signs</TabsTrigger>
          </TabsList>

          {/* Why It Matters */}
          <TabsContent value={0} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {whyItMattersContent.intro}
            </p>
            <ul className="space-y-3">
              {whyItMattersContent.points.map((point, i) => (
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

          {/* How Much Sleep */}
          <TabsContent value={1} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              Sleep needs vary by age. The recommendations below come from
              the National Sleep Foundation
              <CitationRef id="hirshkowitz-2015" /> and the American Academy
              of Sleep Medicine
              <CitationRef id="paruthi-2016" />.
            </p>
            <Card>
              <CardHeader>
                <CardTitle>
                  {recommendation.label}: {recommendation.hours} per night
                </CardTitle>
              </CardHeader>
              <CardContent>
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
          </TabsContent>

          {/* Sleep Hygiene */}
          <TabsContent value={2} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {sleepHygieneContent.intro}
            </p>
            <ul className="space-y-3">
              {sleepHygieneContent.tips.map((tip, i) => (
                <li key={i} className="flex gap-2 leading-relaxed">
                  <span className="mt-1 text-primary">•</span>
                  <span>
                    {tip.text}
                    <CitationRef id={tip.citation} />
                  </span>
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* Game Day */}
          <TabsContent value={3} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {gameDayContent.intro}
            </p>
            <ul className="space-y-3">
              {gameDayContent.tips.map((tip, i) => (
                <li key={i} className="flex gap-2 leading-relaxed">
                  <span className="mt-1 text-primary">•</span>
                  <span>
                    {tip.text}
                    <CitationRef id={tip.citation} />
                  </span>
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* Warning Signs */}
          <TabsContent value={4} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {warningSigns.intro}
            </p>
            <ul className="space-y-3">
              {warningSigns.signs.map((sign, i) => (
                <li key={i} className="flex gap-2 leading-relaxed">
                  <span className="mt-1 text-primary">•</span>
                  <span>
                    {sign.text}
                    <CitationRef id={sign.citation} />
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
          <CitationList category="sleep" />
        </section>
      </div>
    </main>
  );
}

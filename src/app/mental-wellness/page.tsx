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
import { MentalWellnessHero } from "@/components/mental-wellness/mental-wellness-hero";
import { type AgeGroup } from "@/data/sleep-content";
import {
  mentalWellnessByAge,
  burnoutRecognitionContent,
  stressManagementContent,
  identityContent,
  communicationContent,
  parentsCoachesContent,
  quickTakeaways,
} from "@/data/mental-wellness-content";

const ageGroups: { value: AgeGroup; label: string }[] = [
  { value: "6-9", label: "6–9" },
  { value: "10-12", label: "10–12" },
  { value: "13-15", label: "13–15" },
  { value: "16-18", label: "16–18" },
];

export default function MentalWellnessPage() {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("10-12");

  const ageData = mentalWellnessByAge.find((r) => r.ageGroup === ageGroup)!;

  return (
    <main className="flex min-h-screen flex-col">
      <MentalWellnessHero />

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
            <TabsTrigger value={0}>Burnout Recognition</TabsTrigger>
            <TabsTrigger value={1}>Stress Management</TabsTrigger>
            <TabsTrigger value={2}>Identity Beyond Sport</TabsTrigger>
            <TabsTrigger value={3}>Communication</TabsTrigger>
            <TabsTrigger value={4}>For Parents &amp; Coaches</TabsTrigger>
          </TabsList>

          {/* Burnout Recognition */}
          <TabsContent value={0} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {burnoutRecognitionContent.intro}
            </p>
            <ul className="space-y-3">
              {burnoutRecognitionContent.points.map((point, i) => (
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
                  {ageData.label}: Warning Signs to Watch For
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {ageData.stressSignals.map((signal, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-0.5 text-primary">
                        <CheckCircle className="size-4" />
                      </span>
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stress Management */}
          <TabsContent value={1} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {stressManagementContent.intro}
            </p>
            <ul className="space-y-3">
              {stressManagementContent.points.map((point, i) => (
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
                  {ageData.label}: Coping Strategies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {ageData.copingStrategies.map((strategy, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-0.5 text-primary">
                        <CheckCircle className="size-4" />
                      </span>
                      <span>{strategy}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Identity Beyond Sport */}
          <TabsContent value={2} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {identityContent.intro}
            </p>
            <ul className="space-y-3">
              {identityContent.points.map((point, i) => (
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

          {/* Communication */}
          <TabsContent value={3} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {communicationContent.intro}
            </p>
            <ul className="space-y-3">
              {communicationContent.points.map((point, i) => (
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

          {/* For Parents & Coaches */}
          <TabsContent value={4} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {parentsCoachesContent.intro}
            </p>
            <ul className="space-y-3">
              {parentsCoachesContent.points.map((point, i) => (
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
          <CitationList category="mental-wellness" />
        </section>
      </div>
    </main>
  );
}

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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CitationRef } from "@/components/shared/citation-ref";
import { CitationList } from "@/components/shared/citation-list";
import { TrainingHero } from "@/components/training/training-hero";
import { type AgeGroup } from "@/data/sleep-content";
import {
  trainingByAge,
  ltadStages,
  activityCategories,
  planProfiles,
  positionRelevance,
  ltadStagesContent,
  trainingVolumeContent,
  sampleActivitiesContent,
  planGeneratorContent,
  earlySpecializationContent,
  quickTakeaways,
  type TrainingLevel,
  type Position,
  type PlanProfile,
} from "@/data/training-content";

const ageGroups: { value: AgeGroup; label: string }[] = [
  { value: "6-9", label: "6–9" },
  { value: "10-12", label: "10–12" },
  { value: "13-15", label: "13–15" },
  { value: "16-18", label: "16–18" },
];

const levels: { value: TrainingLevel; label: string }[] = [
  { value: "recreational", label: "Recreational" },
  { value: "club", label: "Club" },
  { value: "academy", label: "Academy" },
];

const positions: { value: Position; label: string }[] = [
  { value: "goalkeeper", label: "Goalkeeper" },
  { value: "defender", label: "Defender" },
  { value: "midfielder", label: "Midfielder" },
  { value: "forward", label: "Forward" },
];

export default function TrainingPage() {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("10-12");
  const [level, setLevel] = useState<TrainingLevel>("club");
  const [position, setPosition] = useState<Position>("midfielder");
  const [generatedPlan, setGeneratedPlan] = useState<PlanProfile | null>(null);

  const volumeRec = trainingByAge.find((r) => r.ageGroup === ageGroup)!;
  const ltadStage = ltadStages.find((s) => s.ageGroup === ageGroup)!;

  function handleGenerate() {
    const plan = planProfiles.find(
      (p) => p.ageGroup === ageGroup && p.level === level
    );
    setGeneratedPlan(plan ?? null);
  }

  const relevantActivities = positionRelevance[position] ?? [];

  return (
    <main className="flex min-h-screen flex-col">
      <TrainingHero />

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
                onClick={() => {
                  setAgeGroup(ag.value);
                  setGeneratedPlan(null);
                }}
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
            <TabsTrigger value={0}>LTAD Stages</TabsTrigger>
            <TabsTrigger value={1}>Training Volume</TabsTrigger>
            <TabsTrigger value={2}>Sample Activities</TabsTrigger>
            <TabsTrigger value={3}>Plan Generator</TabsTrigger>
            <TabsTrigger value={4}>Early Specialization</TabsTrigger>
          </TabsList>

          {/* LTAD Stages */}
          <TabsContent value={0} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {ltadStagesContent.intro}
            </p>
            <Card>
              <CardHeader>
                <CardTitle>
                  {ltadStage.stageName} — {volumeRec.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">{ltadStage.focus}</p>
                <ul className="space-y-2">
                  {ltadStage.keyPrinciples.map((principle, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-0.5 text-primary">
                        <CheckCircle className="size-4" />
                      </span>
                      <span>{principle}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <ul className="space-y-3">
              {ltadStagesContent.points.map((point, i) => (
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

          {/* Training Volume */}
          <TabsContent value={1} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {trainingVolumeContent.intro}
            </p>
            <Card>
              <CardHeader>
                <CardTitle>{volumeRec.label}: Training Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-primary">
                      <CheckCircle className="size-4" />
                    </span>
                    <span>
                      <strong>Sessions/week:</strong> {volumeRec.sessionsPerWeek}
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-primary">
                      <CheckCircle className="size-4" />
                    </span>
                    <span>
                      <strong>Session duration:</strong> {volumeRec.sessionDuration}
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-primary">
                      <CheckCircle className="size-4" />
                    </span>
                    <span>
                      <strong>Matches/week:</strong> {volumeRec.matchesPerWeek}
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-primary">
                      <CheckCircle className="size-4" />
                    </span>
                    <span>
                      <strong>Focus split:</strong> {volumeRec.focusSplit}
                    </span>
                  </li>
                </ul>
                <hr className="my-4" />
                <ul className="space-y-2">
                  {volumeRec.tips.map((tip, i) => (
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
              {trainingVolumeContent.points.map((point, i) => (
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

          {/* Sample Activities */}
          <TabsContent value={2} className="space-y-6">
            <p className="leading-relaxed text-muted-foreground">
              {sampleActivitiesContent.intro}
            </p>
            {activityCategories.map((cat) => {
              const filtered = cat.activities.filter((a) =>
                a.ageGroups.includes(ageGroup)
              );
              if (filtered.length === 0) return null;
              return (
                <Card key={cat.category}>
                  <CardHeader>
                    <CardTitle>{cat.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {filtered.map((activity, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-0.5 text-primary">
                            <CheckCircle className="size-4" />
                          </span>
                          <span>
                            <strong>{activity.name}</strong> —{" "}
                            {activity.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
            <ul className="space-y-3">
              {sampleActivitiesContent.points.map((point, i) => (
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

          {/* Plan Generator */}
          <TabsContent value={3} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {planGeneratorContent.intro}
            </p>
            <Card>
              <CardHeader>
                <CardTitle>Build Your Weekly Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Level</label>
                    <Select
                      value={level}
                      onValueChange={(val) => {
                        setLevel(val as TrainingLevel);
                        setGeneratedPlan(null);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((l) => (
                          <SelectItem key={l.value} value={l.value}>
                            {l.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Position</label>
                    <Select
                      value={position}
                      onValueChange={(val) => setPosition(val as Position)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleGenerate}>Generate Plan</Button>
              </CardContent>
            </Card>

            {generatedPlan && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    Weekly Schedule — {volumeRec.label},{" "}
                    {levels.find((l) => l.value === level)?.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {generatedPlan.sessionsPerWeek} sessions/week ·{" "}
                    {generatedPlan.sessionMinutes} min each
                  </p>
                  <div className="space-y-4">
                    {generatedPlan.weeklyPlan.map((day, i) => (
                      <div key={i}>
                        <h4 className="font-medium">
                          {day.day}{" "}
                          <span className="text-sm font-normal text-muted-foreground">
                            — {day.focus}
                          </span>
                        </h4>
                        <ul className="mt-1 space-y-1 pl-4">
                          {day.activities.map((activity, j) => (
                            <li
                              key={j}
                              className={`flex gap-2 text-sm ${
                                relevantActivities.includes(activity)
                                  ? "font-medium text-primary"
                                  : ""
                              }`}
                            >
                              <span>•</span>
                              <span>
                                {activity}
                                {relevantActivities.includes(activity) && (
                                  <span className="ml-1 text-xs text-muted-foreground">
                                    ({positions.find((p) => p.value === position)?.label}-relevant)
                                  </span>
                                )}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <ul className="space-y-3">
              {planGeneratorContent.points.map((point, i) => (
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

          {/* Early Specialization */}
          <TabsContent value={4} className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              {earlySpecializationContent.intro}
            </p>
            <ul className="space-y-3">
              {earlySpecializationContent.points.map((point, i) => (
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
          <CitationList category="training" />
        </section>
      </div>
    </main>
  );
}

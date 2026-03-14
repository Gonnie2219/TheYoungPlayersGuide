"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { goalPresets } from "@/data/goal-presets";
import type { AgeGroup } from "@/data/sleep-content";
import type { Gender, PlayingLevel } from "@/types";

const ageGroups: { value: AgeGroup; label: string }[] = [
  { value: "6-9", label: "6–9" },
  { value: "10-12", label: "10–12" },
  { value: "13-15", label: "13–15" },
  { value: "16-18", label: "16–18" },
];

const genders: { value: Gender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const levels: { value: PlayingLevel; label: string }[] = [
  { value: "recreational", label: "Recreational" },
  { value: "club", label: "Club" },
  { value: "academy", label: "Academy" },
  { value: "elite", label: "Elite" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [gender, setGender] = useState<Gender | null>(null);
  const [playingLevel, setPlayingLevel] = useState<PlayingLevel | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.push("/login");
      return;
    }

    fetch("/api/profile")
      .then((res) => {
        if (res.ok) {
          router.push("/dashboard");
        } else {
          setChecking(false);
        }
      });
  }, [isPending, session, router]);

  function toggleGoal(id: string) {
    setSelectedGoals((prev) => {
      if (prev.includes(id)) return prev.filter((g) => g !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  async function handleSubmit() {
    if (!ageGroup || !gender || !playingLevel || selectedGoals.length === 0) return;
    setLoading(true);

    const goalLabels = selectedGoals.map(
      (id) => goalPresets.find((g) => g.id === id)!.label
    );

    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ageGroup,
        gender,
        playingLevel,
        goals: goalLabels,
      }),
    });

    router.push("/dashboard");
  }

  if (isPending || checking) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </main>
    );
  }

  const canSubmit = ageGroup && gender && playingLevel && selectedGoals.length >= 1;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-xl">Welcome! Tell us about yourself</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          {/* Age Group */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Age Group</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {ageGroups.map((ag) => (
                <Button
                  key={ag.value}
                  variant={ageGroup === ag.value ? "default" : "outline"}
                  onClick={() => setAgeGroup(ag.value)}
                  className="h-12"
                >
                  {ag.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Gender</p>
            <div className="grid grid-cols-3 gap-2">
              {genders.map((g) => (
                <Button
                  key={g.value}
                  variant={gender === g.value ? "default" : "outline"}
                  onClick={() => setGender(g.value)}
                  className="h-12"
                >
                  {g.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Playing Level */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Playing Level</p>
            <div className="grid grid-cols-2 gap-2">
              {levels.map((l) => (
                <Button
                  key={l.value}
                  variant={playingLevel === l.value ? "default" : "outline"}
                  onClick={() => setPlayingLevel(l.value)}
                  className="h-12"
                >
                  {l.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Your Goals</p>
            <p className="text-xs text-muted-foreground">Pick 1–3 goals</p>
            <div className="grid grid-cols-1 gap-2">
              {goalPresets.map((gp) => (
                <button
                  key={gp.id}
                  onClick={() => toggleGoal(gp.id)}
                  className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                    selectedGoals.includes(gp.id)
                      ? "border-primary bg-primary/10 ring-2 ring-primary"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <span className="text-xl">{gp.emoji}</span>
                  <span className="text-sm font-medium">{gp.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || loading}
            className="h-12"
          >
            {loading ? "Setting up..." : "Get Started"}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

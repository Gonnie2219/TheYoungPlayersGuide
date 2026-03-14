"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { EmojiScale } from "@/components/daily-log/emoji-scale";

function todayDate() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function formatDateLabel(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

const hydrationOptions = ["poor", "ok", "good", "great"] as const;

export default function LogPage() {
  const date = todayDate();
  const [sleepHours, setSleepHours] = useState(8);
  const [sleepQuality, setSleepQuality] = useState<number | null>(null);
  const [energy, setEnergy] = useState<number | null>(null);
  const [mood, setMood] = useState<number | null>(null);
  const [soreness, setSoreness] = useState<number | null>(null);
  const [hadTraining, setHadTraining] = useState(false);
  const [hadMatch, setHadMatch] = useState(false);
  const [hydration, setHydration] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`/api/daily-log?date=${date}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        setSleepHours(data.sleepHours);
        setSleepQuality(data.sleepQuality);
        setEnergy(data.energy);
        setMood(data.mood);
        setSoreness(data.soreness);
        setHadTraining(data.hadTraining);
        setHadMatch(data.hadMatch);
        setHydration(data.hydration);
        setNotes(data.notes ?? "");
        setIsUpdate(true);
      });
  }, [date]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!sleepQuality || !energy || !mood || !soreness) return;
    setSubmitting(true);
    setSuccess(false);

    await fetch("/api/daily-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        sleepHours,
        sleepQuality,
        energy,
        mood,
        soreness,
        hadTraining,
        hadMatch,
        hydration,
        notes: notes || null,
      }),
    });

    setSubmitting(false);
    setSuccess(true);
    setIsUpdate(true);
  }

  const canSubmit = sleepQuality && energy && mood && soreness;

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-xl">Daily Log</CardTitle>
          <p className="text-sm text-muted-foreground">{formatDateLabel(date)}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Sleep Hours */}
            <div className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-medium">Sleep</p>
                <p className="text-2xl font-bold">{sleepHours}h</p>
              </div>
              <Slider
                value={[sleepHours]}
                onValueChange={(val) => {
                  const v = Array.isArray(val) ? val[0] : val;
                  setSleepHours(v);
                }}
                min={4}
                max={12}
                step={0.5}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>4h</span>
                <span>12h</span>
              </div>
            </div>

            {/* Sleep Quality */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Sleep Quality</p>
              <EmojiScale
                value={sleepQuality}
                onChange={setSleepQuality}
                emojis={["😫", "😕", "😐", "🙂", "😴"]}
              />
            </div>

            <Separator />

            {/* How You Feel */}
            <div className="flex flex-col gap-4">
              <p className="text-sm font-medium">How You Feel</p>

              <div className="flex flex-col gap-1">
                <p className="text-xs text-muted-foreground">Energy</p>
                <EmojiScale
                  value={energy}
                  onChange={setEnergy}
                  emojis={["😫", "😕", "😐", "💪", "⚡"]}
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-xs text-muted-foreground">Mood</p>
                <EmojiScale
                  value={mood}
                  onChange={setMood}
                  emojis={["😢", "😕", "😐", "🙂", "😄"]}
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-xs text-muted-foreground">Soreness</p>
                <EmojiScale
                  value={soreness}
                  onChange={setSoreness}
                  emojis={["😫", "😣", "😐", "👍", "💯"]}
                />
              </div>
            </div>

            <Separator />

            {/* Activity */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Activity</p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={hadTraining ? "default" : "outline"}
                  onClick={() => setHadTraining(!hadTraining)}
                  className="h-10 flex-1"
                >
                  Training
                </Button>
                <Button
                  type="button"
                  variant={hadMatch ? "default" : "outline"}
                  onClick={() => setHadMatch(!hadMatch)}
                  className="h-10 flex-1"
                >
                  Match
                </Button>
              </div>
            </div>

            <Separator />

            {/* Hydration */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Hydration</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {hydrationOptions.map((opt) => (
                  <Button
                    key={opt}
                    type="button"
                    variant={hydration === opt ? "default" : "outline"}
                    onClick={() => setHydration(opt)}
                    className="h-10 capitalize"
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Notes */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Notes (optional)</p>
              <Input
                placeholder="How was your day?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Submit */}
            <Button type="submit" disabled={!canSubmit || submitting} className="h-12">
              {submitting
                ? "Saving..."
                : isUpdate
                  ? "Update Today's Log"
                  : "Save Today's Log"}
            </Button>

            {success && (
              <p className="text-center text-sm text-green-600">
                Log saved successfully!
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

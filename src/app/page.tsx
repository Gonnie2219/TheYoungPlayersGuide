import type { Metadata } from "next";
import Link from "next/link";
import {
  Moon,
  Apple,
  Dumbbell,
  Brain,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: { absolute: "The Young Player's Guide — Youth Soccer Development" },
  description:
    "Evidence-based guides on sleep, nutrition, training, mental wellness, and injury prevention for young soccer players aged 6–18.",
  openGraph: {
    title: "The Young Player's Guide — Youth Soccer Development",
    description:
      "Evidence-based guides on sleep, nutrition, training, mental wellness, and injury prevention for young soccer players aged 6–18.",
    type: "website",
  },
};

const features = [
  {
    title: "Sleep",
    description:
      "Learn how sleep fuels recovery, growth, and on-field performance for every age group.",
    href: "/sleep",
    icon: Moon,
    color: "text-blue-500",
  },
  {
    title: "Nutrition",
    description:
      "Age-appropriate fueling strategies, hydration plans, and match-day nutrition tips.",
    href: "/nutrition",
    icon: Apple,
    color: "text-green-500",
  },
  {
    title: "Training",
    description:
      "Evidence-based training volume, LTAD stages, and position-specific sample plans.",
    href: "/training",
    icon: Dumbbell,
    color: "text-orange-500",
  },
  {
    title: "Mental Wellness",
    description:
      "Recognise burnout, manage stress, and build a healthy identity beyond sport.",
    href: "/mental-wellness",
    icon: Brain,
    color: "text-purple-500",
  },
  {
    title: "Injury Prevention",
    description:
      "Common youth injuries, risk factors, and strategies to stay on the pitch.",
    href: "/injury-prevention",
    icon: ShieldCheck,
    color: "text-red-500",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            The Young Player&apos;s{" "}
            <span className="text-primary">Guide</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Evidence-based resources to help youth soccer players aged 6&ndash;18
            sleep better, eat smarter, train safely, and thrive on and off the
            pitch.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sleep"
              className="inline-flex items-center gap-2 rounded-md border px-6 py-3 text-sm font-medium hover:bg-muted"
            >
              Explore Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <h2 className="mb-3 text-center text-2xl font-bold sm:text-3xl">
          Everything a Young Player Needs
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-muted-foreground">
          Five pillars of youth development, backed by research and tailored by
          age group.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link key={feature.href} href={feature.href} className="group block">
              <Card className="h-full transition-shadow group-hover:shadow-md">
                <CardContent className="pt-6">
                  <feature.icon
                    className={`mb-3 h-8 w-8 ${feature.color}`}
                  />
                  <h3 className="mb-1 text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Read guide <ArrowRight className="h-3 w-3" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Dashboard CTA */}
      <section className="border-t bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
            Track Your Progress
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
            Create a free account to log sleep, nutrition, and training daily.
            Get personalised insights, streak tracking, and goal progress charts.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            Create Your Account
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

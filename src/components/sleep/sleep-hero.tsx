import { Moon } from "lucide-react";
import { CitationRef } from "@/components/shared/citation-ref";

export function SleepHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-soccer-green to-soccer-green-light px-6 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <Moon className="mx-auto mb-4 size-12 opacity-90" />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Sleep &amp; Recovery
        </h1>
        <p className="mt-3 text-lg text-white/80">
          The most underrated performance tool in youth soccer
        </p>
        <div className="mx-auto mt-8 max-w-md rounded-xl bg-white/15 px-6 py-4 backdrop-blur-sm">
          <p className="text-sm font-medium leading-relaxed">
            Athletes who slept <strong>10+ hours</strong> improved sprint
            times by <strong>5%</strong> and reaction times by{" "}
            <strong>9%</strong>
            <CitationRef id="mah-2011" />
          </p>
        </div>
      </div>
    </section>
  );
}

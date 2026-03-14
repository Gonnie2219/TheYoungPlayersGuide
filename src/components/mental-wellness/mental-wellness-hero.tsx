import { Brain } from "lucide-react";
import { CitationRef } from "@/components/shared/citation-ref";

export function MentalWellnessHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 to-purple-500 px-6 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <Brain className="mx-auto mb-4 size-12 opacity-90" />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Mental Wellness
        </h1>
        <p className="mt-3 text-lg text-white/80">
          The mental side of youth sport matters just as much as the physical
        </p>
        <div className="mx-auto mt-8 max-w-md rounded-xl bg-white/15 px-6 py-4 backdrop-blur-sm">
          <p className="text-sm font-medium leading-relaxed">
            Burnout affects up to <strong>1–5% of youth athletes</strong> and is
            linked to chronic stress, loss of motivation, and dropout
            <CitationRef id="gustafsson-2017" />
          </p>
        </div>
      </div>
    </section>
  );
}

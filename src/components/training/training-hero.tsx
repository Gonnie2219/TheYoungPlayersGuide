import { Dumbbell } from "lucide-react";
import { CitationRef } from "@/components/shared/citation-ref";

export function TrainingHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 to-blue-500 px-6 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <Dumbbell className="mx-auto mb-4 size-12 opacity-90" />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Training &amp; Development
        </h1>
        <p className="mt-3 text-lg text-white/80">
          Age-appropriate training that builds better players for the long term
        </p>
        <div className="mx-auto mt-8 max-w-md rounded-xl bg-white/15 px-6 py-4 backdrop-blur-sm">
          <p className="text-sm font-medium leading-relaxed">
            Players who follow age-appropriate <strong>LTAD guidelines</strong>{" "}
            are more likely to reach elite levels and avoid burnout
            <CitationRef id="ford-2011" />
          </p>
        </div>
      </div>
    </section>
  );
}

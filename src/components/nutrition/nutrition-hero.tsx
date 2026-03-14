import { Apple } from "lucide-react";
import { CitationRef } from "@/components/shared/citation-ref";

export function NutritionHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-soccer-orange to-soccer-orange-light px-6 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <Apple className="mx-auto mb-4 size-12 opacity-90" />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Nutrition &amp; Fueling
        </h1>
        <p className="mt-3 text-lg text-white/80">
          Powering growth, performance, and recovery through smart eating
        </p>
        <div className="mx-auto mt-8 max-w-md rounded-xl bg-white/15 px-6 py-4 backdrop-blur-sm">
          <p className="text-sm font-medium leading-relaxed">
            Youth soccer players can burn{" "}
            <strong>1,500+ calories</strong> in a single training day
            <CitationRef id="desbrow-2014" />
          </p>
        </div>
      </div>
    </section>
  );
}

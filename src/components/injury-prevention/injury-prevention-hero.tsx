import { ShieldCheck } from "lucide-react";
import { CitationRef } from "@/components/shared/citation-ref";

export function InjuryPreventionHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-700 to-red-500 px-6 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <ShieldCheck className="mx-auto mb-4 size-12 opacity-90" />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Injury Prevention
        </h1>
        <p className="mt-3 text-lg text-white/80">
          Keeping young players safe, healthy, and on the pitch
        </p>
        <div className="mx-auto mt-8 max-w-md rounded-xl bg-white/15 px-6 py-4 backdrop-blur-sm">
          <p className="text-sm font-medium leading-relaxed">
            Neuromuscular training programs like the FIFA 11+ can reduce youth
            soccer injuries by <strong>up to 50%</strong>
            <CitationRef id="emery-2015" />
          </p>
        </div>
      </div>
    </section>
  );
}

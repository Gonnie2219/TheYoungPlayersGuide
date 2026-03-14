import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Injury Prevention",
  description:
    "Common youth soccer injuries, risk factors, prevention strategies, and recovery guidance by age group.",
  openGraph: {
    title: "Injury Prevention | The Young Player's Guide",
    description:
      "Injury prevention strategies, risk factors, and recovery guidance for young soccer players.",
  },
};

export default function InjuryPreventionLayout({ children }: { children: React.ReactNode }) {
  return children;
}

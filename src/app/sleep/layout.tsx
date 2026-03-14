import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sleep Guide",
  description:
    "How much sleep do young soccer players need? Age-specific recommendations, sleep hygiene tips, and game-day routines.",
  openGraph: {
    title: "Sleep Guide | The Young Player's Guide",
    description:
      "Age-specific sleep recommendations, hygiene tips, and game-day routines for youth soccer players.",
  },
};

export default function SleepLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training Guide",
  description:
    "Evidence-based training volume, LTAD stages, position-specific plans, and early specialization guidance for youth soccer.",
  openGraph: {
    title: "Training Guide | The Young Player's Guide",
    description:
      "Training volume, LTAD stages, and position-specific plans for youth soccer players.",
  },
};

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
  return children;
}

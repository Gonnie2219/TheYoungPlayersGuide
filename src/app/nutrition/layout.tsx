import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nutrition Guide",
  description:
    "Youth soccer nutrition: age-appropriate fueling, macronutrient targets, hydration strategies, and match-day eating plans.",
  openGraph: {
    title: "Nutrition Guide | The Young Player's Guide",
    description:
      "Age-appropriate fueling, hydration strategies, and match-day nutrition for young soccer players.",
  },
};

export default function NutritionLayout({ children }: { children: React.ReactNode }) {
  return children;
}

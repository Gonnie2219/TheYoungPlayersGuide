import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mental Wellness",
  description:
    "Burnout recognition, stress management, and building a healthy identity for young soccer players and their families.",
  openGraph: {
    title: "Mental Wellness | The Young Player's Guide",
    description:
      "Burnout recognition, stress management, and identity development for youth soccer players.",
  },
};

export default function MentalWellnessLayout({ children }: { children: React.ReactNode }) {
  return children;
}

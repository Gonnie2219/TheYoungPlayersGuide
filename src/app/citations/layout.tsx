import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Citations & References",
  description:
    "Full reference list of peer-reviewed research supporting The Young Player's Guide content.",
  openGraph: {
    title: "Citations & References | The Young Player's Guide",
    description:
      "Peer-reviewed research references supporting youth soccer development guidance.",
  },
};

export default function CitationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "Sign in or create your free account on The Young Player's Guide.",
  openGraph: {
    title: "Account | The Young Player's Guide",
    description: "Sign in or create your free account to track your soccer development.",
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}

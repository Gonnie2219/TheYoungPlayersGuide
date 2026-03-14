"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { useUserProfileStore } from "@/stores/user-profile-store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [ready, setReady] = useState(false);
  const setProfile = useUserProfileStore((s) => s.setProfile);

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.push("/login");
      return;
    }

    fetch("/api/profile")
      .then((res) => {
        if (res.status === 404) {
          router.push("/onboarding");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setProfile({
            ageGroup: data.ageGroup,
            gender: data.gender,
            playingLevel: data.playingLevel,
            goals: data.goals,
          });
          setReady(true);
        }
      });
  }, [isPending, session, router, setProfile]);

  if (!ready) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </main>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      {children}
    </div>
  );
}

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { userProfile, goal } from "@/lib/db/schema";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await db
    .select()
    .from(userProfile)
    .where(eq(userProfile.userId, session.user.id))
    .then((rows) => rows[0] ?? null);

  if (!profile) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const goals = await db
    .select()
    .from(goal)
    .where(eq(goal.userId, session.user.id));

  return NextResponse.json({
    ...profile,
    goals: goals.map((g) => g.text),
  });
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { ageGroup, gender, playingLevel, goals: goalTexts } = body;

  await db.insert(userProfile).values({
    id: crypto.randomUUID(),
    userId: session.user.id,
    ageGroup,
    gender,
    playingLevel,
  });

  if (goalTexts && goalTexts.length > 0) {
    await db.insert(goal).values(
      goalTexts.map((text: string) => ({
        id: crypto.randomUUID(),
        userId: session.user.id,
        text,
      }))
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

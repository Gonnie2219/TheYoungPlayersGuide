import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { eq, and, gte, lte, asc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { dailyLog } from "@/lib/db/schema";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const from = request.nextUrl.searchParams.get("from");
  const to = request.nextUrl.searchParams.get("to");
  const date = request.nextUrl.searchParams.get("date");

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (from && to) {
    if (!dateRegex.test(from) || !dateRegex.test(to)) {
      return NextResponse.json({ error: "Invalid date format, use YYYY-MM-DD" }, { status: 400 });
    }
    const logs = await db
      .select()
      .from(dailyLog)
      .where(
        and(
          eq(dailyLog.userId, session.user.id),
          gte(dailyLog.date, from),
          lte(dailyLog.date, to)
        )
      )
      .orderBy(asc(dailyLog.date));
    return NextResponse.json(logs);
  }

  if (!date) {
    return NextResponse.json({ error: "Missing date or from/to params" }, { status: 400 });
  }

  const log = await db
    .select()
    .from(dailyLog)
    .where(and(eq(dailyLog.userId, session.user.id), eq(dailyLog.date, date)))
    .then((rows) => rows[0] ?? null);

  if (!log) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(log);
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { date, sleepHours, sleepQuality, energy, mood, soreness, hadTraining, hadMatch, hydration, notes } = body;

  const existing = await db
    .select()
    .from(dailyLog)
    .where(and(eq(dailyLog.userId, session.user.id), eq(dailyLog.date, date)))
    .then((rows) => rows[0] ?? null);

  if (existing) {
    await db
      .update(dailyLog)
      .set({ sleepHours, sleepQuality, energy, mood, soreness, hadTraining, hadMatch, hydration, notes })
      .where(eq(dailyLog.id, existing.id));
    return NextResponse.json({ success: true }, { status: 200 });
  }

  await db.insert(dailyLog).values({
    id: crypto.randomUUID(),
    userId: session.user.id,
    date,
    sleepHours,
    sleepQuality,
    energy,
    mood,
    soreness,
    hadTraining,
    hadMatch,
    hydration,
    notes,
  });

  return NextResponse.json({ success: true }, { status: 201 });
}

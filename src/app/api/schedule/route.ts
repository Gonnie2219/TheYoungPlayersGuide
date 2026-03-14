import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { eq, and, gte, lte, asc, or } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { scheduleEvent } from "@/lib/db/schema";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const from = request.nextUrl.searchParams.get("from");
  const to = request.nextUrl.searchParams.get("to");

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!from || !to || !dateRegex.test(from) || !dateRegex.test(to)) {
    return NextResponse.json({ error: "Invalid or missing from/to params, use YYYY-MM-DD" }, { status: 400 });
  }

  const events = await db
    .select()
    .from(scheduleEvent)
    .where(
      and(
        eq(scheduleEvent.userId, session.user.id),
        or(
          // One-time events within the date range
          and(
            eq(scheduleEvent.recurrence, "one_time"),
            gte(scheduleEvent.date, from),
            lte(scheduleEvent.date, to)
          ),
          // Weekly recurring events whose start date <= end of range
          and(
            eq(scheduleEvent.recurrence, "weekly"),
            lte(scheduleEvent.date, to)
          )
        )
      )
    )
    .orderBy(asc(scheduleEvent.date));

  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { eventType, title, date, startTime, endTime, recurrence, dayOfWeek, location, opponent, notes } = body;

  if (!eventType || !title || !date || !startTime || !endTime) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const validEventTypes = ["team_practice", "game", "individual_training", "rest"];
  const validRecurrences = ["one_time", "weekly"];
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const timeRegex = /^\d{2}:\d{2}$/;

  if (!validEventTypes.includes(eventType)) {
    return NextResponse.json({ error: "Invalid eventType" }, { status: 400 });
  }
  if (recurrence && !validRecurrences.includes(recurrence)) {
    return NextResponse.json({ error: "Invalid recurrence" }, { status: 400 });
  }
  if (!dateRegex.test(date)) {
    return NextResponse.json({ error: "Invalid date format, use YYYY-MM-DD" }, { status: 400 });
  }
  if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
    return NextResponse.json({ error: "Invalid time format, use HH:MM" }, { status: 400 });
  }
  if (dayOfWeek != null && (typeof dayOfWeek !== "number" || dayOfWeek < 0 || dayOfWeek > 6)) {
    return NextResponse.json({ error: "Invalid dayOfWeek, must be 0-6" }, { status: 400 });
  }

  await db.insert(scheduleEvent).values({
    id: crypto.randomUUID(),
    userId: session.user.id,
    eventType,
    title,
    date,
    startTime,
    endTime,
    recurrence: recurrence ?? "one_time",
    dayOfWeek: dayOfWeek ?? null,
    location: location ?? null,
    opponent: opponent ?? null,
    notes: notes ?? null,
  });

  return NextResponse.json({ success: true }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id param" }, { status: 400 });
  }

  await db
    .delete(scheduleEvent)
    .where(and(eq(scheduleEvent.id, id), eq(scheduleEvent.userId, session.user.id)));

  return NextResponse.json({ success: true });
}

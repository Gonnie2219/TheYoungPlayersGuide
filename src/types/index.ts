export type Gender = "male" | "female" | "other";
export type PlayingLevel = "recreational" | "club" | "academy" | "elite";

export type CitationType = "journal" | "book" | "website" | "report";

export type CitationCategory =
  | "sleep"
  | "nutrition"
  | "training"
  | "mental-wellness"
  | "injury-prevention"
  | "general";

export interface DailyLog {
  id: string;
  userId: string;
  date: string;
  sleepHours: number;
  sleepQuality: number;
  energy: number;
  mood: number;
  soreness: number;
  hadTraining: boolean;
  hadMatch: boolean;
  hydration: string | null;
  notes: string | null;
  createdAt: string;
}

export type EventType = "team_practice" | "game" | "individual_training" | "rest";
export type Recurrence = "one_time" | "weekly";

export interface ScheduleEvent {
  id: string;
  userId: string;
  eventType: EventType;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  recurrence: Recurrence;
  dayOfWeek: number | null;
  location: string | null;
  opponent: string | null;
  notes: string | null;
  createdAt: string;
}

export interface Citation {
  id: string;
  authors: string[];
  year: number;
  title: string;
  source: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
  type: CitationType;
  category: CitationCategory;
}

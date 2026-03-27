"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { calendarEvents, clients, reminders, courtDates } from "@/lib/db/schema";
import { calendarEventFormSchema } from "@/lib/validations";
import { eq, gte, lte, and } from "drizzle-orm";
import { auth } from "@/lib/auth/config";

const ADMIN_PREFIX = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

export type CalendarActionState = { success: boolean; message: string } | null;

export type CalendarEvent = {
  id: string;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date | null;
  eventType: string;
  color: string | null;
  isAllDay: boolean | null;
  clientId: string | null;
  clientFirstName: string | null;
  clientLastName: string | null;
  source: "calendar" | "reminder" | "courtDate";
};

const reminderTypeToEventType: Record<string, string> = {
  mahkeme: "mahkeme",
  odeme: "odeme",
  devlet_islemi: "diger",
  vergi: "odeme",
  deadline: "diger",
  ozel: "kisisel",
};

const reminderTypeColor: Record<string, string> = {
  mahkeme: "#EF4444",
  odeme: "#F59E0B",
  devlet_islemi: "#6B7280",
  vergi: "#F59E0B",
  deadline: "#6B7280",
  ozel: "#8B5CF6",
};

export async function getCalendarEvents(startStr?: string, endStr?: string): Promise<CalendarEvent[]> {
  await requireAuth();

  // 1) Calendar events created manually (exclude auto-generated duplicates)
  const calConditions = [];
  if (startStr) calConditions.push(gte(calendarEvents.startDate, new Date(startStr)));
  if (endStr) calConditions.push(lte(calendarEvents.startDate, new Date(endStr)));

  const calWhere = calConditions.length > 0
    ? calConditions.length === 1 ? calConditions[0] : and(...calConditions)
    : undefined;

  const calRows = await db
    .select({
      id: calendarEvents.id,
      title: calendarEvents.title,
      description: calendarEvents.description,
      startDate: calendarEvents.startDate,
      endDate: calendarEvents.endDate,
      eventType: calendarEvents.eventType,
      color: calendarEvents.color,
      isAllDay: calendarEvents.isAllDay,
      clientId: calendarEvents.clientId,
      clientFirstName: clients.firstName,
      clientLastName: clients.lastName,
    })
    .from(calendarEvents)
    .leftJoin(clients, eq(calendarEvents.clientId, clients.id))
    .where(calWhere)
    .orderBy(calendarEvents.startDate);

  // 2) Reminders → calendar events
  const reminderRows = await db
    .select({
      id: reminders.id,
      title: reminders.title,
      description: reminders.description,
      dueDate: reminders.dueDate,
      type: reminders.type,
      isCompleted: reminders.isCompleted,
      clientId: reminders.clientId,
      clientFirstName: clients.firstName,
      clientLastName: clients.lastName,
    })
    .from(reminders)
    .leftJoin(clients, eq(reminders.clientId, clients.id))
    .orderBy(reminders.dueDate);

  // 3) Court dates → calendar events
  const courtRows = await db
    .select({
      id: courtDates.id,
      courtName: courtDates.courtName,
      caseNumber: courtDates.caseNumber,
      hearingDate: courtDates.hearingDate,
      hearingTime: courtDates.hearingTime,
      notes: courtDates.notes,
      status: courtDates.status,
      clientId: courtDates.clientId,
      clientFirstName: clients.firstName,
      clientLastName: clients.lastName,
    })
    .from(courtDates)
    .leftJoin(clients, eq(courtDates.clientId, clients.id))
    .orderBy(courtDates.hearingDate);

  // Build a set of auto-generated calendar event titles + dates to avoid duplicates
  const autoGenKeys = new Set<string>();

  // Map reminders into calendar format
  const reminderEvents: CalendarEvent[] = reminderRows.map((r) => {
    const d = new Date(r.dueDate);
    autoGenKeys.add(`Hatırlatma: ${r.title}|${d.toISOString().slice(0, 10)}`);
    return {
      id: `rem-${r.id}`,
      title: r.title,
      description: r.description,
      startDate: d,
      endDate: null,
      eventType: reminderTypeToEventType[r.type] || "diger",
      color: reminderTypeColor[r.type] || "#8B5CF6",
      isAllDay: true,
      clientId: r.clientId,
      clientFirstName: r.clientFirstName,
      clientLastName: r.clientLastName,
      source: "reminder" as const,
    };
  });

  // Map court dates into calendar format
  const courtEvents: CalendarEvent[] = courtRows.map((c) => {
    const d = new Date(c.hearingDate);
    if (c.hearingTime) {
      const [h, m] = c.hearingTime.split(":");
      d.setHours(Number(h), Number(m));
    }
    autoGenKeys.add(`Duruşma: ${c.courtName}|${d.toISOString().slice(0, 10)}`);
    return {
      id: `court-${c.id}`,
      title: `Duruşma: ${c.courtName}`,
      description: c.caseNumber ? `Dosya No: ${c.caseNumber}` : c.notes,
      startDate: d,
      endDate: null,
      eventType: "mahkeme",
      color: "#EF4444",
      isAllDay: !c.hearingTime,
      clientId: c.clientId,
      clientFirstName: c.clientFirstName,
      clientLastName: c.clientLastName,
      source: "courtDate" as const,
    };
  });

  // Filter out auto-generated calendar events (duplicates of reminders/court dates)
  const manualCalEvents: CalendarEvent[] = calRows
    .filter((ev) => {
      const dateKey = new Date(ev.startDate).toISOString().slice(0, 10);
      const key = `${ev.title}|${dateKey}`;
      return !autoGenKeys.has(key);
    })
    .map((ev) => ({
      ...ev,
      source: "calendar" as const,
    }));

  // Merge and sort by startDate
  const all = [...manualCalEvents, ...reminderEvents, ...courtEvents];
  all.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  return all;
}

export async function createCalendarEvent(
  _prev: CalendarActionState,
  formData: FormData
): Promise<CalendarActionState> {
  await requireAuth();
  const raw = Object.fromEntries(formData.entries());
  const parsed = calendarEventFormSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Geçersiz veri." };
  }

  try {
    await db.insert(calendarEvents).values({
      clientId: parsed.data.clientId || null,
      title: parsed.data.title,
      description: parsed.data.description || null,
      startDate: new Date(parsed.data.startDate),
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
      eventType: parsed.data.eventType,
      color: parsed.data.color || eventTypeColors[parsed.data.eventType] || "#3B82F6",
      isAllDay: parsed.data.isAllDay === "true",
    });

    revalidatePath(`/${ADMIN_PREFIX}/takvim`);
    return { success: true, message: "Etkinlik eklendi." };
  } catch {
    return { success: false, message: "Etkinlik eklenirken hata oluştu." };
  }
}

export async function deleteCalendarEvent(eventId: string): Promise<CalendarActionState> {
  await requireAuth();
  try {
    await db.delete(calendarEvents).where(eq(calendarEvents.id, eventId));
    revalidatePath(`/${ADMIN_PREFIX}/takvim`);
    return { success: true, message: "Etkinlik silindi." };
  } catch {
    return { success: false, message: "Etkinlik silinirken hata oluştu." };
  }
}

const eventTypeColors: Record<string, string> = {
  toplanti: "#3B82F6",
  mahkeme: "#EF4444",
  odeme: "#F59E0B",
  kisisel: "#8B5CF6",
  diger: "#6B7280",
};

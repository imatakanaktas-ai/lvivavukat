"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { calendarEvents, clients } from "@/lib/db/schema";
import { calendarEventFormSchema } from "@/lib/validations";
import { eq, gte, lte, and, desc } from "drizzle-orm";
import { auth } from "@/lib/auth/config";

const ADMIN_PREFIX = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

export type CalendarActionState = { success: boolean; message: string } | null;

export async function getCalendarEvents(startStr?: string, endStr?: string) {
  await requireAuth();

  const conditions = [];
  if (startStr) conditions.push(gte(calendarEvents.startDate, new Date(startStr)));
  if (endStr) conditions.push(lte(calendarEvents.startDate, new Date(endStr)));

  const where = conditions.length > 0
    ? conditions.length === 1 ? conditions[0] : and(...conditions)
    : undefined;

  const events = await db
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
    .where(where)
    .orderBy(calendarEvents.startDate);

  return events;
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

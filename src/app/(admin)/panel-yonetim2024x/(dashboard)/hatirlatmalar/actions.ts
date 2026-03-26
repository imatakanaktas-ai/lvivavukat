"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { reminders, clients, payments, courtDates } from "@/lib/db/schema";
import { reminderFormSchema } from "@/lib/validations";
import { eq, asc, desc } from "drizzle-orm";
import { auth } from "@/lib/auth/config";

const ADMIN_PREFIX = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

export type ReminderActionState = { success: boolean; message: string } | null;

export type UnifiedItem = {
  id: string;
  itemType: "reminder" | "payment" | "courtDate";
  title: string;
  description: string | null;
  date: string; // ISO string
  type: string;
  status: string;
  amount: string | null;
  currency: string | null;
  clientId: string | null;
  clientFirstName: string | null;
  clientLastName: string | null;
};

export async function getAllEvents(): Promise<{ items: UnifiedItem[]; clients: { id: string; name: string }[] }> {
  await requireAuth();

  const [reminderRows, paymentRows, courtDateRows] = await Promise.all([
    db
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
      .orderBy(asc(reminders.dueDate)),
    db
      .select({
        id: payments.id,
        title: payments.title,
        amount: payments.amount,
        currency: payments.currency,
        dueDate: payments.dueDate,
        status: payments.status,
        type: payments.type,
        notes: payments.notes,
        clientId: payments.clientId,
        clientFirstName: clients.firstName,
        clientLastName: clients.lastName,
      })
      .from(payments)
      .leftJoin(clients, eq(payments.clientId, clients.id))
      .orderBy(desc(payments.createdAt)),
    db
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
      .orderBy(asc(courtDates.hearingDate)),
  ]);

  const items: UnifiedItem[] = [];

  for (const r of reminderRows) {
    items.push({
      id: r.id,
      itemType: "reminder",
      title: r.title,
      description: r.description,
      date: new Date(r.dueDate).toISOString(),
      type: r.type,
      status: r.isCompleted ? "completed" : "active",
      amount: null,
      currency: null,
      clientId: r.clientId,
      clientFirstName: r.clientFirstName,
      clientLastName: r.clientLastName,
    });
  }

  for (const p of paymentRows) {
    items.push({
      id: p.id,
      itemType: "payment",
      title: p.title,
      description: p.notes,
      date: p.dueDate ? new Date(p.dueDate).toISOString() : new Date().toISOString(),
      type: p.type,
      status: p.status,
      amount: p.amount,
      currency: p.currency,
      clientId: p.clientId,
      clientFirstName: p.clientFirstName,
      clientLastName: p.clientLastName,
    });
  }

  for (const c of courtDateRows) {
    items.push({
      id: c.id,
      itemType: "courtDate",
      title: c.courtName,
      description: c.caseNumber ? `Dosya: ${c.caseNumber}` : c.notes,
      date: new Date(c.hearingDate).toISOString(),
      type: "mahkeme",
      status: c.status,
      amount: null,
      currency: null,
      clientId: c.clientId,
      clientFirstName: c.clientFirstName,
      clientLastName: c.clientLastName,
    });
  }

  // Unique client list for filter dropdown
  const clientMap = new Map<string, string>();
  for (const item of items) {
    if (item.clientId && item.clientFirstName) {
      clientMap.set(item.clientId, `${item.clientFirstName} ${item.clientLastName || ""}`.trim());
    }
  }
  const clientList = Array.from(clientMap.entries())
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return { items, clients: clientList };
}

export async function createReminder(
  _prev: ReminderActionState,
  formData: FormData
): Promise<ReminderActionState> {
  await requireAuth();
  const raw = Object.fromEntries(formData.entries());
  const parsed = reminderFormSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Geçersiz veri." };
  }

  try {
    await db.insert(reminders).values({
      clientId: parsed.data.clientId || null,
      title: parsed.data.title,
      description: parsed.data.description || null,
      dueDate: new Date(parsed.data.dueDate),
      type: parsed.data.type,
    });

    revalidatePath(`/${ADMIN_PREFIX}/hatirlatmalar`);
    return { success: true, message: "Hatırlatma eklendi." };
  } catch {
    return { success: false, message: "Hatırlatma eklenirken hata oluştu." };
  }
}

export async function toggleReminderComplete(reminderId: string, isCompleted: boolean): Promise<ReminderActionState> {
  await requireAuth();
  try {
    await db.update(reminders).set({ isCompleted }).where(eq(reminders.id, reminderId));
    revalidatePath(`/${ADMIN_PREFIX}/hatirlatmalar`);
    return { success: true, message: isCompleted ? "Tamamlandı." : "Geri alındı." };
  } catch {
    return { success: false, message: "Güncelleme sırasında hata oluştu." };
  }
}

export async function deleteReminder(reminderId: string): Promise<ReminderActionState> {
  await requireAuth();
  try {
    await db.delete(reminders).where(eq(reminders.id, reminderId));
    revalidatePath(`/${ADMIN_PREFIX}/hatirlatmalar`);
    return { success: true, message: "Hatırlatma silindi." };
  } catch {
    return { success: false, message: "Silme sırasında hata oluştu." };
  }
}

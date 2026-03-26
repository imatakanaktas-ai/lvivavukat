"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { reminders, clients } from "@/lib/db/schema";
import { reminderFormSchema } from "@/lib/validations";
import { eq, asc } from "drizzle-orm";
import { auth } from "@/lib/auth/config";

const ADMIN_PREFIX = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

export type ReminderActionState = { success: boolean; message: string } | null;

export async function getReminders(opts?: { showCompleted?: boolean }) {
  await requireAuth();
  const { showCompleted = false } = opts || {};

  const where = !showCompleted ? eq(reminders.isCompleted, false) : undefined;

  const data = await db
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
    .where(where)
    .orderBy(asc(reminders.dueDate));

  return data;
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

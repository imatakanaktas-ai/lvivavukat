"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { clients, clientNotes, payments, courtDates, reminders, calendarEvents } from "@/lib/db/schema";
import { clientFormSchema, paymentFormSchema } from "@/lib/validations";
import { eq, desc, ilike, or, sql, count } from "drizzle-orm";
import { auth } from "@/lib/auth/config";

const ADMIN_PREFIX = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session;
}

// ============================================================
// CLIENTS
// ============================================================

export async function getClients(opts?: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  await requireAuth();
  const { search, status, page = 1, limit = 20 } = opts || {};

  const conditions = [];
  if (status && status !== "all") {
    conditions.push(eq(clients.status, status));
  }
  if (search) {
    conditions.push(
      or(
        ilike(clients.firstName, `%${search}%`),
        ilike(clients.lastName, `%${search}%`),
        ilike(clients.email, `%${search}%`),
        ilike(clients.phone, `%${search}%`)
      )!
    );
  }

  const where = conditions.length > 0
    ? conditions.length === 1
      ? conditions[0]
      : sql`${conditions[0]} AND ${conditions[1]}`
    : undefined;

  const [data, [total]] = await Promise.all([
    db
      .select()
      .from(clients)
      .where(where)
      .orderBy(desc(clients.createdAt))
      .limit(limit)
      .offset((page - 1) * limit),
    db.select({ count: count() }).from(clients).where(where),
  ]);

  return {
    clients: data,
    total: total?.count || 0,
    page,
    totalPages: Math.ceil((total?.count || 0) / limit),
  };
}

export async function getClientById(id: string) {
  await requireAuth();
  const [client] = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
  return client || null;
}

export async function getClientWithRelations(id: string) {
  await requireAuth();
  const result = await db.query.clients.findFirst({
    where: eq(clients.id, id),
    with: {
      payments: { orderBy: (p, { desc: d }) => [d(p.createdAt)] },
      clientNotes: { orderBy: (n, { desc: d }) => [d(n.createdAt)] },
      reminders: { orderBy: (r, { asc: a }) => [a(r.dueDate)] },
      courtDates: { orderBy: (c, { asc: a }) => [a(c.hearingDate)] },
    },
  });
  return result || null;
}

export type ClientActionState = { success: boolean; message: string; id?: string } | null;

export async function createClient(
  _prev: ClientActionState,
  formData: FormData
): Promise<ClientActionState> {
  await requireAuth();
  const raw = Object.fromEntries(formData.entries());
  const parsed = clientFormSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Geçersiz veri." };
  }

  try {
    const [created] = await db
      .insert(clients)
      .values({
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        phone: parsed.data.phone || null,
        email: parsed.data.email || null,
        nationality: parsed.data.nationality || "Türk",
        passportNo: parsed.data.passportNo || null,
        address: parsed.data.address || null,
        notes: parsed.data.notes || null,
        status: parsed.data.status,
      })
      .returning({ id: clients.id });

    revalidatePath(`/${ADMIN_PREFIX}/muvekiller`);
    return { success: true, message: "Müvekkil başarıyla eklendi.", id: created.id };
  } catch {
    return { success: false, message: "Müvekkil eklenirken bir hata oluştu." };
  }
}

export async function updateClient(
  id: string,
  _prev: ClientActionState,
  formData: FormData
): Promise<ClientActionState> {
  await requireAuth();
  const raw = Object.fromEntries(formData.entries());
  const parsed = clientFormSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Geçersiz veri." };
  }

  try {
    await db
      .update(clients)
      .set({
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        phone: parsed.data.phone || null,
        email: parsed.data.email || null,
        nationality: parsed.data.nationality || "Türk",
        passportNo: parsed.data.passportNo || null,
        address: parsed.data.address || null,
        notes: parsed.data.notes || null,
        status: parsed.data.status,
        updatedAt: new Date(),
      })
      .where(eq(clients.id, id));

    revalidatePath(`/${ADMIN_PREFIX}/muvekiller`);
    revalidatePath(`/${ADMIN_PREFIX}/muvekiller/${id}`);
    return { success: true, message: "Müvekkil başarıyla güncellendi." };
  } catch {
    return { success: false, message: "Müvekkil güncellenirken bir hata oluştu." };
  }
}

export async function deleteClient(id: string): Promise<ClientActionState> {
  await requireAuth();
  try {
    await db.delete(clients).where(eq(clients.id, id));
    revalidatePath(`/${ADMIN_PREFIX}/muvekiller`);
    return { success: true, message: "Müvekkil silindi." };
  } catch {
    return { success: false, message: "Müvekkil silinirken bir hata oluştu." };
  }
}

// ============================================================
// CLIENT NOTES
// ============================================================

export async function addClientNote(
  clientId: string,
  content: string
): Promise<ClientActionState> {
  await requireAuth();
  if (!content || content.trim().length < 2) {
    return { success: false, message: "Not en az 2 karakter olmalıdır." };
  }
  try {
    await db.insert(clientNotes).values({ clientId, content: content.trim() });
    revalidatePath(`/${ADMIN_PREFIX}/muvekiller/${clientId}`);
    return { success: true, message: "Not eklendi." };
  } catch {
    return { success: false, message: "Not eklenirken hata oluştu." };
  }
}

export async function deleteClientNote(
  noteId: string,
  clientId: string
): Promise<ClientActionState> {
  await requireAuth();
  try {
    await db.delete(clientNotes).where(eq(clientNotes.id, noteId));
    revalidatePath(`/${ADMIN_PREFIX}/muvekiller/${clientId}`);
    return { success: true, message: "Not silindi." };
  } catch {
    return { success: false, message: "Not silinirken hata oluştu." };
  }
}

// ============================================================
// PAYMENTS
// ============================================================

export async function createPayment(
  _prev: ClientActionState,
  formData: FormData
): Promise<ClientActionState> {
  await requireAuth();
  const raw = Object.fromEntries(formData.entries());
  const parsed = paymentFormSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Geçersiz ödeme bilgisi." };
  }

  try {
    await db.insert(payments).values({
      clientId: parsed.data.clientId,
      title: parsed.data.title,
      amount: parsed.data.amount,
      currency: parsed.data.currency,
      dueDate: parsed.data.dueDate || null,
      status: parsed.data.status,
      type: parsed.data.type,
      notes: parsed.data.notes || null,
    });

    revalidatePath(`/${ADMIN_PREFIX}/muvekiller/${parsed.data.clientId}`);
    return { success: true, message: "Ödeme kaydı eklendi." };
  } catch {
    return { success: false, message: "Ödeme eklenirken hata oluştu." };
  }
}

export async function deletePayment(
  paymentId: string,
  clientId: string
): Promise<ClientActionState> {
  await requireAuth();
  try {
    await db.delete(payments).where(eq(payments.id, paymentId));
    revalidatePath(`/${ADMIN_PREFIX}/muvekiller/${clientId}`);
    return { success: true, message: "Ödeme kaydı silindi." };
  } catch {
    return { success: false, message: "Ödeme silinirken hata oluştu." };
  }
}

// ============================================================
// COURT DATES
// ============================================================

export async function addCourtDate(
  clientId: string,
  data: {
    courtName: string;
    caseNumber?: string;
    hearingDate: string;
    hearingTime?: string;
    notes?: string;
  }
): Promise<ClientActionState> {
  await requireAuth();
  if (!data.courtName || data.courtName.length < 2) {
    return { success: false, message: "Mahkeme adı gereklidir." };
  }
  if (!data.hearingDate) {
    return { success: false, message: "Duruşma tarihi seçiniz." };
  }

  try {
    await db.insert(courtDates).values({
      clientId,
      courtName: data.courtName,
      caseNumber: data.caseNumber || null,
      hearingDate: data.hearingDate,
      hearingTime: data.hearingTime || null,
      notes: data.notes || null,
      status: "scheduled",
    });

    // Also create calendar event
    const hearingDateObj = new Date(data.hearingDate);
    if (data.hearingTime) {
      const [h, m] = data.hearingTime.split(":");
      hearingDateObj.setHours(Number(h), Number(m));
    }
    await db.insert(calendarEvents).values({
      clientId,
      title: `Duruşma: ${data.courtName}`,
      description: data.caseNumber ? `Dosya No: ${data.caseNumber}` : null,
      startDate: hearingDateObj,
      eventType: "mahkeme",
      color: "#EF4444",
      isAllDay: !data.hearingTime,
    });

    revalidatePath(`/${ADMIN_PREFIX}/muvekiller/${clientId}`);
    revalidatePath(`/${ADMIN_PREFIX}/takvim`);
    return { success: true, message: "Mahkeme tarihi eklendi." };
  } catch {
    return { success: false, message: "Mahkeme tarihi eklenirken hata oluştu." };
  }
}

// ============================================================
// REMINDERS (for client context)
// ============================================================

export async function addClientReminder(
  clientId: string,
  data: {
    title: string;
    description?: string;
    dueDate: string;
    type: string;
  }
): Promise<ClientActionState> {
  await requireAuth();
  if (!data.title || data.title.length < 2) {
    return { success: false, message: "Başlık gereklidir." };
  }
  if (!data.dueDate) {
    return { success: false, message: "Tarih seçiniz." };
  }

  try {
    await db.insert(reminders).values({
      clientId,
      title: data.title,
      description: data.description || null,
      dueDate: new Date(data.dueDate),
      type: data.type || "ozel",
      isCompleted: false,
    });

    // Also create calendar event
    await db.insert(calendarEvents).values({
      clientId,
      title: `Hatırlatma: ${data.title}`,
      description: data.description || null,
      startDate: new Date(data.dueDate),
      eventType: data.type === "mahkeme" ? "mahkeme" : data.type === "odeme" ? "odeme" : "diger",
      color: data.type === "mahkeme" ? "#EF4444" : data.type === "odeme" ? "#F59E0B" : "#8B5CF6",
      isAllDay: true,
    });

    revalidatePath(`/${ADMIN_PREFIX}/muvekiller/${clientId}`);
    revalidatePath(`/${ADMIN_PREFIX}/takvim`);
    revalidatePath(`/${ADMIN_PREFIX}/hatirlatmalar`);
    return { success: true, message: "Hatırlatma eklendi." };
  } catch {
    return { success: false, message: "Hatırlatma eklenirken hata oluştu." };
  }
}

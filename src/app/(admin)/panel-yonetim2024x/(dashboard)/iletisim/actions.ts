"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";
import { eq, desc, count } from "drizzle-orm";
import { auth } from "@/lib/auth/config";

const ADMIN_PREFIX = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

export async function getContactSubmissions(opts?: { page?: number }) {
  await requireAuth();
  const { page = 1 } = opts || {};
  const perPage = 20;
  const offset = (page - 1) * perPage;

  const [submissions, totalResult] = await Promise.all([
    db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt))
      .limit(perPage)
      .offset(offset),
    db.select({ count: count() }).from(contactSubmissions),
  ]);

  return {
    submissions,
    total: totalResult[0]?.count || 0,
    page,
    totalPages: Math.ceil((totalResult[0]?.count || 0) / perPage),
  };
}

export async function markAsRead(id: string) {
  await requireAuth();
  await db.update(contactSubmissions).set({ isRead: true }).where(eq(contactSubmissions.id, id));
  revalidatePath(`/${ADMIN_PREFIX}/iletisim`);
}

export async function deleteSubmission(id: string) {
  await requireAuth();
  await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
  revalidatePath(`/${ADMIN_PREFIX}/iletisim`);
}

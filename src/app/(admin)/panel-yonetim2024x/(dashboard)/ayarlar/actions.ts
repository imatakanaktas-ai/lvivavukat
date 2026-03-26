"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { siteSettings, adminUsers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth/config";
import bcrypt from "bcryptjs";

const ADMIN_PREFIX = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session;
}

export type SettingsActionState = { success: boolean; message: string } | null;

export async function getSiteSettings() {
  await requireAuth();
  const settings = await db.select().from(siteSettings);
  const map: Record<string, string> = {};
  for (const s of settings) {
    if (s.value !== null) map[s.key] = s.value;
  }
  return map;
}

export async function updateSiteSetting(
  key: string,
  value: string
): Promise<SettingsActionState> {
  await requireAuth();
  try {
    const existing = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, key))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(siteSettings)
        .set({ value, updatedAt: new Date() })
        .where(eq(siteSettings.key, key));
    } else {
      await db.insert(siteSettings).values({ key, value });
    }

    revalidatePath(`/${ADMIN_PREFIX}/ayarlar`);
    return { success: true, message: "Ayar güncellendi." };
  } catch {
    return { success: false, message: "Ayar güncellenirken hata oluştu." };
  }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<SettingsActionState> {
  const session = await requireAuth();

  if (newPassword.length < 8) {
    return { success: false, message: "Yeni şifre en az 8 karakter olmalıdır." };
  }

  try {
    const user = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, session.user?.email || ""))
      .limit(1);

    if (!user[0]) return { success: false, message: "Kullanıcı bulunamadı." };

    const isValid = await bcrypt.compare(currentPassword, user[0].passwordHash);
    if (!isValid) return { success: false, message: "Mevcut şifre hatalı." };

    const newHash = await bcrypt.hash(newPassword, 12);
    await db
      .update(adminUsers)
      .set({ passwordHash: newHash })
      .where(eq(adminUsers.id, user[0].id));

    return { success: true, message: "Şifre başarıyla değiştirildi." };
  } catch {
    return { success: false, message: "Şifre değiştirme sırasında hata oluştu." };
  }
}

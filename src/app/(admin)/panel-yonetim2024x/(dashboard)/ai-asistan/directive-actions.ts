"use server";

import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { aiDirectives } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

export type DirectiveCategory = "tone" | "knowledge" | "rules" | "examples" | "general";

export interface DirectiveItem {
  id: string;
  title: string;
  content: string;
  category: DirectiveCategory;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export async function getDirectives(): Promise<{
  success: boolean;
  directives?: DirectiveItem[];
  error?: string;
}> {
  try {
    await requireAuth();
    const rows = await db
      .select()
      .from(aiDirectives)
      .orderBy(asc(aiDirectives.sortOrder), asc(aiDirectives.createdAt));
    return {
      success: true,
      directives: rows.map((r) => ({
        ...r,
        category: r.category as DirectiveCategory,
      })),
    };
  } catch {
    return { success: false, error: "Не вдалося завантажити директиви." };
  }
}

export async function createDirective(data: {
  title: string;
  content: string;
  category: DirectiveCategory;
}): Promise<{ success: boolean; directive?: DirectiveItem; error?: string }> {
  try {
    await requireAuth();
    if (!data.title.trim() || !data.content.trim()) {
      return { success: false, error: "Назва та зміст є обов'язковими." };
    }
    const [row] = await db
      .insert(aiDirectives)
      .values({
        title: data.title.trim(),
        content: data.content.trim(),
        category: data.category,
      })
      .returning();
    return {
      success: true,
      directive: { ...row, category: row.category as DirectiveCategory },
    };
  } catch {
    return { success: false, error: "Не вдалося створити директиву." };
  }
}

export async function updateDirective(
  id: string,
  data: { title?: string; content?: string; category?: DirectiveCategory; isActive?: boolean }
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    const updates: Record<string, unknown> = { updatedAt: new Date() };
    if (data.title !== undefined) updates.title = data.title.trim();
    if (data.content !== undefined) updates.content = data.content.trim();
    if (data.category !== undefined) updates.category = data.category;
    if (data.isActive !== undefined) updates.isActive = data.isActive;
    await db.update(aiDirectives).set(updates).where(eq(aiDirectives.id, id));
    return { success: true };
  } catch {
    return { success: false, error: "Не вдалося оновити директиву." };
  }
}

export async function deleteDirective(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    await db.delete(aiDirectives).where(eq(aiDirectives.id, id));
    return { success: true };
  } catch {
    return { success: false, error: "Не вдалося видалити директиву." };
  }
}

export async function getActiveDirectivesText(): Promise<string> {
  try {
    const rows = await db
      .select({ title: aiDirectives.title, content: aiDirectives.content, category: aiDirectives.category })
      .from(aiDirectives)
      .where(eq(aiDirectives.isActive, true))
      .orderBy(asc(aiDirectives.sortOrder), asc(aiDirectives.createdAt));

    if (rows.length === 0) return "";

    return rows
      .map((r) => `[${getCategoryLabel(r.category as DirectiveCategory)}] ${r.title}:\n${r.content}`)
      .join("\n\n");
  } catch {
    return "";
  }
}

function getCategoryLabel(cat: DirectiveCategory): string {
  const labels: Record<DirectiveCategory, string> = {
    tone: "СТИЛЬ",
    knowledge: "ЗНАННЯ",
    rules: "ПРАВИЛО",
    examples: "ПРИКЛАД",
    general: "ЗАГАЛЬНЕ",
  };
  return labels[cat] || "ЗАГАЛЬНЕ";
}

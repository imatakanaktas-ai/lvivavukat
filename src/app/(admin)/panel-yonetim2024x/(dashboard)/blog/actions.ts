"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { blogPosts, blogCategories } from "@/lib/db/schema";
import { blogPostFormSchema } from "@/lib/validations";
import { eq, desc, ilike, and, sql, count } from "drizzle-orm";
import { auth } from "@/lib/auth/config";
import { generateContent } from "@/lib/ai/gemini";
import {
  BLOG_SYSTEM_PROMPT,
  BLOG_CONTENT_PROMPT,
  BLOG_META_PROMPT,
  BLOG_TOPIC_PROMPT,
  BLOG_TITLE_ALTERNATIVES_PROMPT,
} from "@/lib/ai/prompts";

const ADMIN_PREFIX = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

export type BlogActionState = { success: boolean; message: string; id?: string } | null;

// ============================================================
// CRUD
// ============================================================

export async function getBlogPosts(opts?: {
  search?: string;
  status?: string;
  page?: number;
}) {
  await requireAuth();
  const { search, status, page = 1 } = opts || {};
  const perPage = 12;
  const offset = (page - 1) * perPage;

  const conditions = [];
  if (search) conditions.push(ilike(blogPosts.title, `%${search}%`));
  if (status && status !== "all") conditions.push(eq(blogPosts.status, status));

  const where = conditions.length > 0
    ? conditions.length === 1 ? conditions[0] : and(...conditions)
    : undefined;

  const [posts, totalResult] = await Promise.all([
    db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        status: blogPosts.status,
        excerpt: blogPosts.excerpt,
        publishedAt: blogPosts.publishedAt,
        aiGenerated: blogPosts.aiGenerated,
        readingTime: blogPosts.readingTime,
        createdAt: blogPosts.createdAt,
      })
      .from(blogPosts)
      .where(where)
      .orderBy(desc(blogPosts.createdAt))
      .limit(perPage)
      .offset(offset),
    db.select({ count: count() }).from(blogPosts).where(where),
  ]);

  return {
    posts,
    total: totalResult[0]?.count || 0,
    page,
    totalPages: Math.ceil((totalResult[0]?.count || 0) / perPage),
  };
}

export async function getBlogPostById(id: string) {
  await requireAuth();
  const post = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);
  return post[0] || null;
}

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function createBlogPost(
  _prev: BlogActionState,
  formData: FormData
): Promise<BlogActionState> {
  await requireAuth();
  const raw = Object.fromEntries(formData.entries());
  const parsed = blogPostFormSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Geçersiz veri." };
  }

  try {
    const isAI = formData.get("aiGenerated") === "true";
    const readingTime = estimateReadingTime(parsed.data.content);

    const result = await db
      .insert(blogPosts)
      .values({
        title: parsed.data.title,
        slug: parsed.data.slug,
        content: parsed.data.content,
        excerpt: parsed.data.excerpt || null,
        metaDescription: parsed.data.metaDescription || null,
        metaKeywords: parsed.data.metaKeywords || null,
        categoryId: parsed.data.categoryId || null,
        status: parsed.data.status,
        coverImageUrl: parsed.data.coverImageUrl || null,
        publishedAt: parsed.data.status === "published" ? new Date() : null,
        aiGenerated: isAI,
        readingTime,
      })
      .returning({ id: blogPosts.id });

    revalidatePath(`/${ADMIN_PREFIX}/blog`);
    return { success: true, message: "Blog yazısı oluşturuldu.", id: result[0]?.id };
  } catch (err: unknown) {
    const msg = err instanceof Error && err.message.includes("unique")
      ? "Bu slug zaten kullanılıyor."
      : "Blog yazısı oluşturulurken hata oluştu.";
    return { success: false, message: msg };
  }
}

export async function updateBlogPost(
  id: string,
  _prev: BlogActionState,
  formData: FormData
): Promise<BlogActionState> {
  await requireAuth();
  const raw = Object.fromEntries(formData.entries());
  const parsed = blogPostFormSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Geçersiz veri." };
  }

  try {
    const existing = await db.select({ status: blogPosts.status, publishedAt: blogPosts.publishedAt })
      .from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    const wasPublished = existing[0]?.publishedAt;

    const readingTime = estimateReadingTime(parsed.data.content);

    await db
      .update(blogPosts)
      .set({
        title: parsed.data.title,
        slug: parsed.data.slug,
        content: parsed.data.content,
        excerpt: parsed.data.excerpt || null,
        metaDescription: parsed.data.metaDescription || null,
        metaKeywords: parsed.data.metaKeywords || null,
        categoryId: parsed.data.categoryId || null,
        status: parsed.data.status,
        coverImageUrl: parsed.data.coverImageUrl || null,
        publishedAt: parsed.data.status === "published" && !wasPublished ? new Date() : wasPublished,
        readingTime,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id));

    revalidatePath(`/${ADMIN_PREFIX}/blog`);
    revalidatePath(`/${ADMIN_PREFIX}/blog/${id}`);
    return { success: true, message: "Blog yazısı güncellendi." };
  } catch (err: unknown) {
    const msg = err instanceof Error && err.message.includes("unique")
      ? "Bu slug zaten kullanılıyor."
      : "Güncelleme sırasında hata oluştu.";
    return { success: false, message: msg };
  }
}

export async function deleteBlogPost(id: string): Promise<BlogActionState> {
  await requireAuth();
  try {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    revalidatePath(`/${ADMIN_PREFIX}/blog`);
    return { success: true, message: "Blog yazısı silindi." };
  } catch {
    return { success: false, message: "Silme sırasında hata oluştu." };
  }
}

// ============================================================
// AI GENERATION
// ============================================================

export async function generateBlogTopics(): Promise<{
  success: boolean;
  topics?: { title: string; keyword: string; description: string }[];
  error?: string;
}> {
  await requireAuth();
  try {
    const raw = await generateContent(BLOG_TOPIC_PROMPT, BLOG_SYSTEM_PROMPT);
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return { success: false, error: "AI yanıtı ayrıştırılamadı." };
    const topics = JSON.parse(jsonMatch[0]);
    return { success: true, topics };
  } catch {
    return { success: false, error: "AI konu önerisi oluşturulamadı." };
  }
}

export async function generateBlogContent(
  topic: string,
  keyword: string
): Promise<{
  success: boolean;
  content?: string;
  meta?: { metaTitle: string; metaDescription: string; slug: string; keywords: string[]; excerpt: string };
  error?: string;
}> {
  await requireAuth();
  try {
    // Generate content
    const outline = `Konu: ${topic}\nAnahtar Kelime: ${keyword}`;
    const content = await generateContent(
      BLOG_CONTENT_PROMPT(topic, outline, "profesyonel ama samimi"),
      BLOG_SYSTEM_PROMPT
    );

    // Generate meta
    const metaRaw = await generateContent(BLOG_META_PROMPT(topic, content));
    const metaMatch = metaRaw.match(/\{[\s\S]*\}/);
    let meta = undefined;
    if (metaMatch) {
      try {
        meta = JSON.parse(metaMatch[0]);
      } catch {
        // meta parse failed, continue without
      }
    }

    return { success: true, content, meta };
  } catch {
    return { success: false, error: "AI içerik oluşturulamadı." };
  }
}

export async function generateTitleAlternatives(topic: string): Promise<{
  success: boolean;
  titles?: string[];
  error?: string;
}> {
  await requireAuth();
  try {
    const raw = await generateContent(BLOG_TITLE_ALTERNATIVES_PROMPT(topic), BLOG_SYSTEM_PROMPT);
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return { success: false, error: "Yanıt ayrıştırılamadı." };
    const titles = JSON.parse(jsonMatch[0]);
    return { success: true, titles };
  } catch {
    return { success: false, error: "Başlık önerileri oluşturulamadı." };
  }
}

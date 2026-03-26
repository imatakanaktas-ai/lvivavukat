"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { documentTemplates, clients } from "@/lib/db/schema";
import { eq, desc, ilike } from "drizzle-orm";
import { auth } from "@/lib/auth/config";
import { generateContent } from "@/lib/ai/gemini";

const ADMIN_PREFIX = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

export type TemplateActionState = { success: boolean; message: string; id?: string } | null;

const categoryLabels: Record<string, string> = {
  dilekce: "Dilekçe",
  sozlesme: "Sözleşme",
  vekaletname: "Vekaletname",
  basvuru: "Başvuru",
  diger: "Diğer",
};

// ============================================================
// TEMPLATES CRUD
// ============================================================

export async function getTemplates(category?: string) {
  await requireAuth();
  const where = category && category !== "all"
    ? eq(documentTemplates.category, category)
    : undefined;

  return db
    .select()
    .from(documentTemplates)
    .where(where)
    .orderBy(desc(documentTemplates.createdAt));
}

export async function getTemplateById(id: string) {
  await requireAuth();
  const result = await db.select().from(documentTemplates).where(eq(documentTemplates.id, id)).limit(1);
  return result[0] || null;
}

export async function createTemplate(
  _prev: TemplateActionState,
  formData: FormData
): Promise<TemplateActionState> {
  await requireAuth();
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const contentTemplate = formData.get("contentTemplate") as string;
  const variablesStr = formData.get("variables") as string;

  if (!name || name.length < 2) return { success: false, message: "Şablon adı gereklidir." };
  if (!contentTemplate || contentTemplate.length < 10) return { success: false, message: "Şablon içeriği gereklidir." };

  try {
    const variables = variablesStr
      ? variablesStr.split(",").map((v) => v.trim()).filter(Boolean)
      : [];

    const result = await db.insert(documentTemplates).values({
      name,
      category: category || "diger",
      contentTemplate,
      variables,
    }).returning({ id: documentTemplates.id });

    revalidatePath(`/${ADMIN_PREFIX}/sablonlar`);
    return { success: true, message: "Şablon oluşturuldu.", id: result[0]?.id };
  } catch {
    return { success: false, message: "Şablon oluşturulurken hata oluştu." };
  }
}

export async function deleteTemplate(id: string): Promise<TemplateActionState> {
  await requireAuth();
  try {
    await db.delete(documentTemplates).where(eq(documentTemplates.id, id));
    revalidatePath(`/${ADMIN_PREFIX}/sablonlar`);
    return { success: true, message: "Şablon silindi." };
  } catch {
    return { success: false, message: "Silme sırasında hata oluştu." };
  }
}

// ============================================================
// DOCUMENT GENERATION
// ============================================================

export async function generateDocument(
  templateId: string,
  variableValues: Record<string, string>
): Promise<{ success: boolean; content?: string; error?: string }> {
  await requireAuth();

  const template = await getTemplateById(templateId);
  if (!template) return { success: false, error: "Şablon bulunamadı." };

  let content = template.contentTemplate;
  for (const [key, value] of Object.entries(variableValues)) {
    content = content.replaceAll(`{{${key}}}`, value);
  }

  return { success: true, content };
}

export async function generateDocumentWithAI(
  documentType: string,
  details: string,
  clientName?: string
): Promise<{ success: boolean; content?: string; error?: string }> {
  await requireAuth();

  const prompt = `Aşağıdaki bilgilere dayanarak profesyonel bir ${documentType} belgesi oluştur.

Belge Türü: ${documentType}
${clientName ? `Müvekkil: ${clientName}` : ""}
Detaylar: ${details}

ÖNEMLİ KURALLAR:
- Ukrayna hukukuna uygun olsun
- Resmi dilde yazılsın
- Tarih formatı: GG.AA.YYYY
- Kullanıcının detayları hangi dilde yazdıysa o dilde oluştur (Ukraynaca ise Ukraynaca, Türkçe ise Türkçe)
- Gerekli yerlerde boşluk bırak ({{imza}}, {{tarih}} gibi)
- Uygun başlık ve format kullan
- Hukuki terminolojiyi doğru kullan`;

  const systemPrompt = `Sen Ukrayna Lviv'de çalışan deneyimli bir avukatsın. Türk vatandaşları için Ukrayna hukukuna uygun resmi belgeler hazırlıyorsun. Belgeler profesyonel, doğru ve eksiksiz olmalı.`;

  try {
    const content = await generateContent(prompt, systemPrompt);
    return { success: true, content };
  } catch {
    return { success: false, error: "AI belge oluşturulamadı." };
  }
}

// ============================================================
// CLIENT LIST (for document generation)
// ============================================================

export async function getClientsForSelect() {
  await requireAuth();
  return db
    .select({ id: clients.id, firstName: clients.firstName, lastName: clients.lastName })
    .from(clients)
    .orderBy(clients.firstName);
}

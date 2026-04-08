"use server";

import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { aiChatSessions, aiChatMessages } from "@/lib/db/schema";
import { eq, desc, asc } from "drizzle-orm";
import { generateChatResponse, generateContent, type ChatTurn } from "@/lib/ai/gemini";
import { getActiveDirectivesText } from "./directive-actions";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

const ASSISTANT_SYSTEM_PROMPT = `Sen Av. Lyudmyla Chubai'nin kişisel AI hukuk asistanısın. Lyudmyla, Ukrayna Lviv'de çalışan ve Türk vatandaşlarına hukuki danışmanlık sunan deneyimli bir avukattır.

SENİN ROLÜN:
- Lyudmyla'nın kişisel asistanısın — ona doğrudan yardım ediyorsun
- Ona ismiyle hitap et: "Lyudmyla" veya "Lyudmyla Hanım"
- Selamlaşmalarda kişisel ol: örneğin "Merhaba Lyudmyla! Bugün sana nasıl yardımcı olabilirim?"
- O zaten avukat olduğu için "bir avukata danışın" gibi ifadeler ASLA kullanma
- Ona meslektaş gibi, profesyonel ama samimi bir şekilde yanıt ver

GÖREV ALANLARIN:
- Ukrayna hukuku hakkında detaylı analiz ve bilgi sunma
- Türk vatandaşlarının Ukrayna'daki hukuki süreçleri hakkında araştırma desteği
- Oturum izni, çalışma izni, evlilik, şirket kurma prosedürleri hakkında güncel bilgi
- Belge taslakları hazırlama ve mevzuat referansları sunma
- Mahkeme süreçleri, içtihatlar ve emsal kararlar hakkında bilgilendirme
- Müvekkil dosyaları ve stratejileri hakkında beyin fırtınası
- Hukuki metinlerin Türkçe-Ukraynaca çeviri desteği
- Yüklenen PDF belgelerini analiz etme, özetleme ve düzenleme
- Yüklenen resimleri analiz edip açıklama yapma

DOSYA ANALİZİ:
- Kullanıcı bir PDF yüklediğinde, içeriğini dikkatli oku ve sorulara göre yanıt ver
- Kullanıcı bir resim yüklediğinde, resmi detaylı analiz et ve açıkla
- Düzenlenmiş belge istendiğinde, metnin TAMAMINI yaz — kısaltma yapma

KURALLAR:
- Kullanıcı hangi dilde yazıyorsa O DİLDE yanıt ver
- Somut, uygulanabilir bilgiler ver — genel laflardan kaçın
- Gerektiğinde madde madde ve detaylı açıkla
- Güncel Ukrayna mevzuatına ve kanun maddelerine referans ver
- Emin olmadığın konularda bunu açıkça belirt, ama yine de en iyi tahminini sun`;

// Re-export generateContent for backward compat (belgeler, blog actions)
export { generateContent };

// =============================================
// SESSION CRUD
// =============================================

export async function getSessions() {
  await requireAuth();
  try {
    const rows = await db
      .select()
      .from(aiChatSessions)
      .orderBy(desc(aiChatSessions.updatedAt));
    return { success: true as const, sessions: rows };
  } catch {
    return { success: false as const, error: "Не вдалося завантажити сесії." };
  }
}

export async function createSession() {
  await requireAuth();
  try {
    const [row] = await db
      .insert(aiChatSessions)
      .values({ title: "Нова розмова" })
      .returning();
    return { success: true as const, session: row };
  } catch {
    return { success: false as const, error: "Не вдалося створити сесію." };
  }
}

export async function deleteSession(id: string) {
  await requireAuth();
  try {
    await db.delete(aiChatSessions).where(eq(aiChatSessions.id, id));
    return { success: true as const };
  } catch {
    return { success: false as const, error: "Не вдалося видалити сесію." };
  }
}

export async function renameSession(id: string, title: string) {
  await requireAuth();
  try {
    await db
      .update(aiChatSessions)
      .set({ title: title.trim(), updatedAt: new Date() })
      .where(eq(aiChatSessions.id, id));
    return { success: true as const };
  } catch {
    return { success: false as const, error: "Не вдалося перейменувати." };
  }
}

// =============================================
// MESSAGES
// =============================================

export async function getMessages(sessionId: string) {
  await requireAuth();
  try {
    const rows = await db
      .select()
      .from(aiChatMessages)
      .where(eq(aiChatMessages.sessionId, sessionId))
      .orderBy(asc(aiChatMessages.createdAt));
    return { success: true as const, messages: rows };
  } catch {
    return { success: false as const, error: "Не вдалося завантажити повідомлення." };
  }
}

// =============================================
// SEND MESSAGE — multi-turn with file support
// =============================================

export async function sendAIMessage(
  sessionId: string,
  message: string,
  fileData?: { base64: string; mimeType: string; fileName: string; extractedText?: string }
): Promise<{ success: boolean; reply?: string; error?: string }> {
  await requireAuth();

  if (!message.trim() && !fileData) {
    return { success: false, error: "Повідомлення порожнє." };
  }

  try {
    // 1. Determine file type
    const fileType = fileData
      ? fileData.mimeType === "application/pdf"
        ? "pdf"
        : "image"
      : undefined;

    // 2. Save user message
    await db.insert(aiChatMessages).values({
      sessionId,
      role: "user",
      content: message,
      fileName: fileData?.fileName ?? null,
      fileType: fileType ?? null,
      fileUrl: fileData && fileType === "image"
        ? `data:${fileData.mimeType};base64,${fileData.base64}`
        : null,
    });

    // 3. Load conversation history
    const dbMessages = await db
      .select()
      .from(aiChatMessages)
      .where(eq(aiChatMessages.sessionId, sessionId))
      .orderBy(asc(aiChatMessages.createdAt));

    // 4. Build chat turns (limit to last 40 messages to avoid token overflow)
    const recentMessages = dbMessages.slice(-40);
    const history: ChatTurn[] = recentMessages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    // Attach file to the LAST user message for Gemini
    const lastTurn = history[history.length - 1];
    if (fileData && lastTurn) {
      // Send both PDFs and images directly to Gemini as inline data
      // Gemini natively understands PDF and image content
      lastTurn.fileBase64 = fileData.base64;
      lastTurn.fileMimeType = fileData.mimeType;
      if (message) {
        lastTurn.content = message;
      } else {
        lastTurn.content = `Завантажено файл: "${fileData.fileName}". Проаналізуй його зміст.`;
      }
    }

    // 5. Build system prompt with directives
    let systemPrompt = ASSISTANT_SYSTEM_PROMPT;
    const directivesText = await getActiveDirectivesText();
    if (directivesText) {
      systemPrompt += "\n\n--- НАВЧАЛЬНІ ДИРЕКТИВИ АДВОКАТА ---\n" + directivesText;
    }

    // 6. Call Gemini
    const reply = await generateChatResponse(history, systemPrompt);

    // 7. Save assistant reply
    await db.insert(aiChatMessages).values({
      sessionId,
      role: "assistant",
      content: reply,
    });

    // 8. Auto-title on first exchange
    if (dbMessages.length <= 1) {
      const titleText = message.slice(0, 80) || fileData?.fileName || "Розмова";
      await db
        .update(aiChatSessions)
        .set({ title: titleText, updatedAt: new Date() })
        .where(eq(aiChatSessions.id, sessionId));
    } else {
      await db
        .update(aiChatSessions)
        .set({ updatedAt: new Date() })
        .where(eq(aiChatSessions.id, sessionId));
    }

    return { success: true, reply };
  } catch (e) {
    console.error("AI message error:", e);
    return { success: false, error: "AI відповідь не вдалося отримати." };
  }
}

// =============================================
// PDF GENERATION
// =============================================

export async function generatePdfFromText(
  text: string
): Promise<{ success: boolean; base64?: string; error?: string }> {
  await requireAuth();
  try {
    const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 11;
    const margin = 50;
    const lineHeight = fontSize * 1.5;

    const lines = text.split("\n");
    let page = pdfDoc.addPage([595, 842]); // A4
    let y = 842 - margin;

    for (const rawLine of lines) {
      const words = rawLine.split(" ");
      let currentLine = "";

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const width = font.widthOfTextAtSize(testLine, fontSize);

        if (width > 595 - margin * 2) {
          if (y < margin + lineHeight) {
            page = pdfDoc.addPage([595, 842]);
            y = 842 - margin;
          }
          page.drawText(currentLine, { x: margin, y, size: fontSize, font, color: rgb(0.1, 0.1, 0.1) });
          y -= lineHeight;
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }

      if (y < margin + lineHeight) {
        page = pdfDoc.addPage([595, 842]);
        y = 842 - margin;
      }
      page.drawText(currentLine, { x: margin, y, size: fontSize, font, color: rgb(0.1, 0.1, 0.1) });
      y -= lineHeight;
    }

    const pdfBytes = await pdfDoc.save();
    const base64 = Buffer.from(pdfBytes).toString("base64");
    return { success: true, base64 };
  } catch (e) {
    console.error("PDF generation error:", e);
    return { success: false, error: "PDF oluşturulamadı." };
  }
}

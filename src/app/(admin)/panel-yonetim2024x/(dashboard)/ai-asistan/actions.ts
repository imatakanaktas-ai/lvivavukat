"use server";

import { auth } from "@/lib/auth/config";
import { generateContent } from "@/lib/ai/gemini";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

const ASSISTANT_SYSTEM_PROMPT = `Sen Ukrayna Lviv'de çalışan deneyimli bir hukuk asistanısın. Adın "Lviv Avukat AI Asistan". 

GÖREV ALANLARIN:
- Ukrayna hukuku hakkında genel bilgi verme
- Türk vatandaşlarının Ukrayna'daki hukuki süreçleri hakkında danışmanlık
- Oturum izni, çalışma izni, evlilik, şirket kurma prosedürleri
- Belge hazırlama konusunda yönlendirme
- Mahkeme süreçleri hakkında bilgilendirme
- Müvekkil yönetimi konusunda öneriler

KURALLAR:
- Her zaman Türkçe yanıt ver
- Profesyonel ama samimi bir ton kullan
- Hukuki tavsiye verirken "kesin hukuki tavsiye için avukatınıza danışın" uyarısını ekle
- Somut, faydalı bilgiler ver
- Gerektiğinde madde madde açıkla
- Güncel Ukrayna mevzuatına referans ver`;

export async function sendAIMessage(
  message: string
): Promise<{ success: boolean; reply?: string; error?: string }> {
  await requireAuth();

  if (!message.trim()) {
    return { success: false, error: "Mesaj boş olamaz." };
  }

  try {
    const reply = await generateContent(message, ASSISTANT_SYSTEM_PROMPT);
    return { success: true, reply };
  } catch {
    return { success: false, error: "AI yanıt oluşturulamadı. Lütfen tekrar deneyin." };
  }
}

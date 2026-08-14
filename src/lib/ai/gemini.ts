/**
 * Model tiers exposed to the admin panel:
 * - "pro"  → deeper reasoning, slower
 * - "fast" → quick answers, low thinking budget
 */
export type ModelTier = "pro" | "fast";

const MODELS: Record<ModelTier, string> = {
  pro: "gemini-3.1-pro-preview",
  fast: "gemini-3.7-flash",
};

export const DEFAULT_TIER: ModelTier = "pro";

const TEXT_MODEL = MODELS[DEFAULT_TIER];
const IMAGE_MODEL = "imagen-4.0-ultra-generate-001";

function resolveModel(tier?: ModelTier) {
  return MODELS[tier ?? DEFAULT_TIER] ?? MODELS[DEFAULT_TIER];
}

function getApiKey() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  return apiKey;
}

function getProjectId() {
  const project = process.env.GOOGLE_CLOUD_PROJECT;
  if (!project) {
    throw new Error("GOOGLE_CLOUD_PROJECT is not set");
  }
  return project;
}

function getEndpoint(model: string, method: string) {
  const project = getProjectId();
  return `https://aiplatform.googleapis.com/v1/projects/${project}/locations/global/publishers/google/models/${model}:${method}?key=${getApiKey()}`;
}

// Part types for multimodal support
interface TextPart {
  text: string;
}
interface InlineDataPart {
  inlineData: { mimeType: string; data: string };
}
type Part = TextPart | InlineDataPart | Record<string, unknown>;

interface GeminiMessage {
  role: "user" | "model";
  parts: Part[];
}

interface ResponsePart {
  text?: string;
  thought?: boolean;
  functionCall?: { name: string; args?: Record<string, unknown> };
}

interface GroundingChunk {
  web?: { uri?: string; title?: string; domain?: string };
}

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: ResponsePart[];
    };
    finishReason?: string;
    groundingMetadata?: {
      groundingChunks?: GroundingChunk[];
      webSearchQueries?: string[];
    };
  }[];
  promptFeedback?: { blockReason?: string };
}

/**
 * Gemini 3 returns multiple parts (thought parts + answer parts).
 * Taking only parts[0].text silently produced empty replies, so join
 * every non-thought text part instead.
 */
function extractText(data: GeminiResponse): string {
  const candidate = data.candidates?.[0];

  const text = (candidate?.content?.parts ?? [])
    .filter((p) => !p.thought && typeof p.text === "string")
    .map((p) => p.text as string)
    .join("")
    .trim();

  if (text) return text;

  if (data.promptFeedback?.blockReason) {
    throw new Error(
      `Gemini yanıtı engellendi (${data.promptFeedback.blockReason}).`
    );
  }
  if (candidate?.finishReason && candidate.finishReason !== "STOP") {
    throw new Error(`Gemini yanıtı tamamlanamadı (${candidate.finishReason}).`);
  }
  throw new Error("Gemini boş yanıt döndürdü.");
}

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
  fileBase64?: string;
  fileMimeType?: string;
}

function historyToContents(history: ChatTurn[]): GeminiMessage[] {
  return history.map((turn) => {
    const parts: Part[] = [];
    if (turn.fileBase64 && turn.fileMimeType) {
      parts.push({
        inlineData: { mimeType: turn.fileMimeType, data: turn.fileBase64 },
      });
    }
    if (turn.content) {
      parts.push({ text: turn.content });
    }
    return {
      role: turn.role === "assistant" ? "model" : "user",
      parts,
    } as GeminiMessage;
  });
}

/**
 * Multi-turn chat with optional multimodal support.
 * Sends full conversation history so the model remembers context.
 */
export async function generateChatResponse(
  history: ChatTurn[],
  systemInstruction?: string,
  tier: ModelTier = DEFAULT_TIER
): Promise<string> {
  const contents = historyToContents(history);

  const body: Record<string, unknown> = { contents };

  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction }] };
  }
  body.generationConfig = {
    temperature: 0.8,
    topP: 0.95,
    maxOutputTokens: tier === "fast" ? 8192 : 32768,
    // "fast" keeps the thinking budget low so replies come back quickly
    thinkingConfig: { thinkingLevel: tier === "fast" ? "low" : "high" },
  };

  const endpoint = getEndpoint(resolveModel(tier), "generateContent");
  const res = await postWithRetry(endpoint, body);

  const data: GeminiResponse = await res.json();
  return extractText(data);
}

// =============================================
// RESEARCH-CAPABLE REPLY (fast tier only)
// =============================================

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface AssistantReply {
  text: string;
  sources: GroundingSource[];
}

const RESEARCH_TOOLS = [
  { googleSearch: {} },
  {
    functionDeclarations: [
      {
        name: "read_court_decision",
        description:
          "Читає ПОВНИЙ текст судового рішення з Єдиного державного реєстру судових рішень (reyestr.court.gov.ua) за ID або URL рішення. Використовуй після того, як знайшов рішення через пошук, щоб процитувати його точно.",
        parameters: {
          type: "OBJECT",
          properties: {
            id: {
              type: "STRING",
              description:
                "ID рішення (наприклад 100000000) або повний URL виду https://reyestr.court.gov.ua/Review/100000000",
            },
          },
          required: ["id"],
        },
      },
    ],
  },
];

/**
 * Max model↔tool round-trips. Set for thoroughness, not speed — the lawyer
 * would rather wait than get a shallow answer.
 */
const MAX_TOOL_STEPS = 8;

export type ThinkingLevel = "low" | "medium" | "high";

/**
 * Research answers are legal advice, so they get the full thinking budget.
 * Measured on the scenario suite: "low" produced repealed provisions and
 * wrong limitation periods, "high" did not.
 */
const RESEARCH_THINKING_LEVEL: ThinkingLevel = "high";

function collectSources(data: GeminiResponse, into: Map<string, string>) {
  const chunks = data.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
  for (const chunk of chunks) {
    const uri = chunk.web?.uri;
    if (!uri) continue;
    const title = chunk.web?.domain || chunk.web?.title || uri;
    if (!into.has(uri)) into.set(uri, title);
  }
}

interface LoopContext {
  sources: Map<string, string>;
  verifiedDecisionIds: Set<string>;
  thinkingLevel: ThinkingLevel;
}

/**
 * Runs one model turn to completion, executing any tool calls it makes along
 * the way. Returns the final text.
 */
async function runToolLoop(
  contents: GeminiMessage[],
  systemInstruction: string,
  ctx: LoopContext
): Promise<string> {
  const { readCourtDecision } = await import("./legal-sources");

  const body: Record<string, unknown> = {
    contents,
    systemInstruction: { parts: [{ text: systemInstruction }] },
    tools: RESEARCH_TOOLS,
    generationConfig: {
      // Lower temperature than chat: statutes and deadlines are not a place
      // for creative variance.
      temperature: 0.3,
      topP: 0.95,
      maxOutputTokens: 16384,
      thinkingConfig: { thinkingLevel: ctx.thinkingLevel },
    },
  };

  const endpoint = getEndpoint(resolveModel("fast"), "generateContent");

  for (let step = 0; step < MAX_TOOL_STEPS; step++) {
    const res = await postWithRetry(endpoint, body);
    const data: GeminiResponse = await res.json();

    collectSources(data, ctx.sources);

    const parts = data.candidates?.[0]?.content?.parts ?? [];
    const calls = parts.filter((p) => p.functionCall);

    if (calls.length === 0) return extractText(data);

    // Echo the model turn back verbatim — Gemini 3 needs its own parts
    // (including thoughtSignature) to continue a tool call.
    contents.push({ role: "model", parts: parts as Part[] });

    const responses = await Promise.all(
      calls.map(async (part) => {
        const call = part.functionCall!;
        const arg = String(call.args?.id ?? "");
        const result =
          call.name === "read_court_decision"
            ? await readCourtDecision(arg)
            : { error: `Невідомий інструмент: ${call.name}` };

        if ("found" in result && result.found && result.url) {
          ctx.sources.set(result.url, "reyestr.court.gov.ua");
          if (result.id) ctx.verifiedDecisionIds.add(result.id);
        }

        return {
          functionResponse: { name: call.name, response: { result } },
        };
      })
    );

    contents.push({ role: "user", parts: responses as Part[] });
  }

  throw new Error("Дослідження не завершилося — забагато кроків.");
}

const AUDIT_MARKER = "ЧИСТО";

const AUDIT_INSTRUCTION = `Sen bir hukuki denetçisin. Görevin YENİ CEVAP YAZMAK DEĞİL — sadece aşağıdaki taslağı denetlemek.

Şunları TEK TEK kontrol et, her biri için ARAMA YAP:
1. Taslakta atıf yapılan her kanun maddesi HÂLÂ YÜRÜRLÜKTE mi? Ukrayna'da 2024-2026'da çok madde kaldırıldı veya değişti. Bir madde "виключено на підставі Закону №..." ile kaldırılmışsa bu KRİTİK hatadır.
2. SÜRELER — en tehlikeli alan, en sıkı kontrol burada:
   - Taslaktaki HER süre iddiası için (zamanaşımı, hak düşürücü, başvuru süresi) o süreyi belirleyen maddeyi bul ve METNİNİ ALINTILA. Alıntılayamıyorsan iddia doğrulanmamıştır — bildir.
   - "Genel zamanaşımı 3 yıl" denen HER yerde ЦК md. 258'i (özel zamanaşımı) ayrıca aç ve listeyi oku: o talep türü orada sayılmış mı? Sayılmışsa genel süre DEĞİL, özel süre geçerlidir.
   - Özel bir kanunun "kısaltılmış süre içermediği" gerekçesi yeterli değil — özel süre çoğu zaman ЦК'ya eklenmiş olarak durur.
3. Dava numarası verilen her mahkeme kararını read_court_decision ile AÇ. Açamıyorsan veya dava numarası eşleşmiyorsa bu uydurma atıftır.

Ayna siteleri (kodeksy.com.ua, protocol.ua, ligazakon.net) değil, resmi kaynağı esas al.

ÇIKTI BİÇİMİ:
- Hiçbir sorun bulamadıysan SADECE şu kelimeyi yaz: ${AUDIT_MARKER}
- Sorun bulduysan madde madde listele: [NE YANLIŞ] → [DOĞRUSU] → [KAYNAK]`;

const REVISE_INSTRUCTION = `Denetçi taslağında hatalar buldu. Cevabı DÜZELT.

- Yapıyı, tonu ve kapsamı KORU. Baştan yazma, sadece hatalı kısımları düzelt.
- Kaldırılmış bir maddeye dayanan strateji varsa o stratejiyi çıkar veya geçerli dayanakla değiştir.
- Doğrulanamayan mahkeme kararı atıflarını (dava numarası, tarih) TAMAMEN ÇIKAR. Yerine "bu konuda ВС pratiği var, istersen sicilden bulayım" yaz.
- Düzelttiğin şeyi ayrıca açıklama, sadece düzeltilmiş cevabı ver.`;

/**
 * Reply that can consult live sources: Google Search grounding for
 * legislation and a direct reader for court decisions. Used only by the
 * "fast" tier — the "pro" tier deliberately stays on the plain path the
 * lawyer already relies on.
 *
 * Runs draft → audit → revise. The audit pass exists because raising the
 * thinking level was not enough: asked directly, the model knows ч. 2 ст. 110
 * СК was repealed, but while building a strategy it still reached for it.
 * A separate pass whose only job is checking catches that.
 */
export async function generateResearchReply(
  history: ChatTurn[],
  systemInstruction: string,
  thinkingLevel: ThinkingLevel = RESEARCH_THINKING_LEVEL
): Promise<AssistantReply> {
  const { sanitizeCitations } = await import("./legal-sources");

  const ctx: LoopContext = {
    sources: new Map(),
    verifiedDecisionIds: new Set(),
    thinkingLevel,
  };

  // 1. Draft
  const draft = await runToolLoop(
    historyToContents(history),
    systemInstruction,
    ctx
  );

  let final = draft;

  // 2. Audit — a fresh turn so the model checks rather than defends.
  try {
    const audit = await runToolLoop(
      [{ role: "user", parts: [{ text: `TASLAK:\n\n${draft}` }] }],
      AUDIT_INSTRUCTION,
      ctx
    );

    // 3. Revise only when the audit actually found something.
    if (!audit.trim().toUpperCase().startsWith(AUDIT_MARKER)) {
      final = await runToolLoop(
        [
          {
            role: "user",
            parts: [
              { text: `TASLAK:\n\n${draft}\n\n---\n\nDENETÇİ BULGULARI:\n\n${audit}` },
            ],
          },
        ],
        `${systemInstruction}\n\n--- DÜZELTME GÖREVİ ---\n${REVISE_INSTRUCTION}`,
        ctx
      );
    }
  } catch (e) {
    // A failed audit must not cost the lawyer the answer; keep the draft.
    console.error("Audit pass failed, returning draft:", e);
  }

  const clean = sanitizeCitations(final, ctx.verifiedDecisionIds);

  return {
    text: clean.text,
    sources: [...ctx.sources].map(([uri, title]) => ({ uri, title })),
  };
}

/**
 * Vertex returns transient 429/503 under load; retry a few times
 * with backoff instead of surfacing a failure to the lawyer.
 */
async function postWithRetry(
  endpoint: string,
  body: Record<string, unknown>,
  attempts = 3
): Promise<Response> {
  let lastError = "";

  for (let i = 0; i < attempts; i++) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) return res;

    lastError = `Gemini API error ${res.status}: ${await res.text()}`;

    const retriable = res.status === 429 || res.status >= 500;
    if (!retriable || i === attempts - 1) break;

    await new Promise((r) => setTimeout(r, 1000 * 2 ** i));
  }

  throw new Error(lastError);
}

/**
 * Simple single-turn generation (backward compatible).
 */
export async function generateContent(
  prompt: string,
  systemInstruction?: string,
  tier: ModelTier = DEFAULT_TIER
): Promise<string> {
  return generateChatResponse(
    [{ role: "user", content: prompt }],
    systemInstruction,
    tier
  );
}

export async function generateContentStream(
  prompt: string,
  systemInstruction?: string
): Promise<ReadableStream<string>> {
  const streamEndpoint = getEndpoint(TEXT_MODEL, "streamGenerateContent");

  const contents: GeminiMessage[] = [
    { role: "user", parts: [{ text: prompt }] },
  ];

  const body: Record<string, unknown> = { contents };

  if (systemInstruction) {
    body.systemInstruction = {
      parts: [{ text: systemInstruction }],
    };
  }

  body.generationConfig = {
    temperature: 0.8,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
  };

  const res = await fetch(streamEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${errorText}`);
  }

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();

  return new ReadableStream<string>({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      const text = decoder.decode(value, { stream: true });
      controller.enqueue(text);
    },
  });
}

export async function generateImage(
  prompt: string,
  aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4" = "16:9"
): Promise<string> {
  const endpoint = getEndpoint(IMAGE_MODEL, "predict");

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio,
      },
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Imagen API error ${res.status}: ${errorText}`);
  }

  const data = await res.json();
  const base64Image = data.predictions?.[0]?.bytesBase64Encoded;
  if (!base64Image) {
    throw new Error("No image returned from Imagen API");
  }
  return base64Image;
}

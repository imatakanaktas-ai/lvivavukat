/**
 * Model tiers exposed to the admin panel:
 * - "pro"  → deeper reasoning, slower
 * - "fast" → quick answers, low thinking budget
 */
export type ModelTier = "pro" | "fast";

const MODELS: Record<ModelTier, string> = {
  pro: "gemini-3.1-pro-preview",
  fast: "gemini-3.8-flash",
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
  tier: ModelTier = DEFAULT_TIER,
  deadline?: number
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
  const data = await postWithRetry(endpoint, body, deadline);
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
  /** Epoch ms after which no further model call may run. */
  deadline?: number;
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
    const data = await postWithRetry(endpoint, body, ctx.deadline);

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

/** Closes a reply that goes out without a finished audit. */
const UNAUDITED_NOTE =
  "> ⚠️ **Перевірку не завершено.** Повторну перевірку цієї відповіді не вдалося завершити. Перед використанням слід перевірити чинність норм, строки та посилання.";

/** Closes a reply the audit faulted but the revision never fixed; the findings follow it. */
const UNREVISED_NOTE =
  "> ⚠️ **Відповідь не виправлено.** Перевірка знайшла зауваження, але виправити відповідь не вдалося. Зауваження перевірки:";

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
  thinkingLevel: ThinkingLevel = RESEARCH_THINKING_LEVEL,
  deadline?: number
): Promise<AssistantReply> {
  const { sanitizeCitations } = await import("./legal-sources");

  const ctx: LoopContext = {
    sources: new Map(),
    verifiedDecisionIds: new Set(),
    thinkingLevel,
    deadline,
  };

  const startedAt = Date.now();
  const logPhase = (phase: string) =>
    console.info(
      `[ai] research: ${phase} done at ${Math.round((Date.now() - startedAt) / 1000)}s`
    );

  // 1. Draft
  const draft = await runToolLoop(
    historyToContents(history),
    systemInstruction,
    ctx
  );
  logPhase("draft");

  let final = draft;
  // Findings of an audit whose revision has not been written yet.
  let openFindings: string | null = null;

  // 2. Audit — a fresh turn so the model checks rather than defends.
  try {
    const audit = await runToolLoop(
      [{ role: "user", parts: [{ text: `TASLAK:\n\n${draft}` }] }],
      AUDIT_INSTRUCTION,
      ctx
    );
    logPhase("audit");

    // 3. Revise only when the audit actually found something.
    if (!audit.trim().toUpperCase().startsWith(AUDIT_MARKER)) {
      openFindings = audit;
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
      openFindings = null;
      logPhase("revise");
    }
  } catch (e) {
    // A failed audit must not cost the lawyer the answer; keep the draft, but
    // never let it pass for a checked one.
    console.error("Audit pass failed, returning draft:", e);
    final = `${draft}\n\n---\n${
      openFindings ? `${UNREVISED_NOTE}\n\n${openFindings}` : UNAUDITED_NOTE
    }`;
  }

  const clean = sanitizeCitations(final, ctx.verifiedDecisionIds);

  return {
    text: clean.text,
    sources: [...ctx.sources].map(([uri, title]) => ({ uri, title })),
  };
}

// =============================================
// DOCUMENT DRAFTING
// =============================================

/**
 * Cheap pre-filter: only messages that mention a file at all go to the
 * classifier, so ordinary questions pay no extra latency.
 */
const FILE_HINT =
  /pdf|пдф|файл|dosya|indir|завантаж|скача|роздрук|распечат|yazdır|çıktı/i;

const DOCUMENT_REQUEST_INSTRUCTION = `Avukatın mesajını sınıflandır. Soru: avukat şimdi bir belgenin HAZIRLANIP kendisine PDF/dosya olarak VERİLMESİNİ mi istiyor?

EVET örnekleri: "dilekçeyi PDF olarak ver", "bunu pdf yap", "sözleşmeyi dosya olarak hazırla", "підготуй позов у PDF".
HAYIR örnekleri: yüklenmiş bir PDF hakkında soru ("bu PDF'te ne yazıyor", "yüklediğim dosyayı incele"), PDF'in ne olduğunu sormak, sadece bilgi istemek.

Sadece EVET veya HAYIR yaz.`;

/**
 * Vertex latency is spiky: the same one-word classification usually returns
 * in ~2s but occasionally hangs for 40s+. A short timeout with one retry
 * gets past a stalled call without making the lawyer wait on it.
 */
const CLASSIFIER_TIMEOUT_MS = 8_000;
const CLASSIFIER_ATTEMPTS = 2;

/**
 * True when the lawyer asks for a document delivered as a file. A slow or
 * failed classification falls back to a normal chat reply, never an error.
 */
export async function isDocumentRequest(message: string): Promise<boolean> {
  if (!FILE_HINT.test(message)) return false;

  const body = JSON.stringify({
    contents: [{ role: "user", parts: [{ text: message }] }],
    systemInstruction: { parts: [{ text: DOCUMENT_REQUEST_INSTRUCTION }] },
    generationConfig: {
      temperature: 0,
      maxOutputTokens: 1024,
      thinkingConfig: { thinkingLevel: "low" },
    },
  });

  for (let i = 0; i < CLASSIFIER_ATTEMPTS; i++) {
    try {
      const res = await fetch(
        getEndpoint(resolveModel("fast"), "generateContent"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(CLASSIFIER_TIMEOUT_MS),
          body,
        }
      );
      if (!res.ok) throw new Error(`Gemini API error ${res.status}`);
      const answer = extractText(await res.json());
      return /^\s*(EVET|YES|ТАК)/i.test(answer);
    } catch (e) {
      console.error(`Document request classification attempt ${i + 1} failed:`, e);
    }
  }
  return false;
}

/**
 * Writes a standalone legal document (not a chat reply) from the
 * conversation so far. Returns the document markup parsed by
 * parseDocumentMarkup in lib/pdf/legal-document.
 *
 * Plain text on purpose: under a JSON response schema Gemini looped on empty
 * blocks until it hit the token limit.
 *
 * Always the fast tier, whatever the chat is set to: on the same claim it
 * wrote a complete document in ~40s, while the pro preview had not returned
 * after 5 minutes — past what a serverless request can wait.
 */
export async function generateDocumentDraft(
  history: ChatTurn[],
  systemInstruction: string,
  deadline?: number
): Promise<string> {
  const body: Record<string, unknown> = {
    contents: historyToContents(history),
    systemInstruction: { parts: [{ text: systemInstruction }] },
    generationConfig: {
      // Same reasoning as research: a filed document is not a place for
      // creative variance.
      temperature: 0.3,
      topP: 0.95,
      maxOutputTokens: 32768,
      thinkingConfig: { thinkingLevel: "high" },
    },
  };

  const endpoint = getEndpoint(resolveModel("fast"), "generateContent");
  const data = await postWithRetry(endpoint, body, deadline);

  // extractText returns whatever text there is; a document cut off mid-way
  // must not reach the lawyer looking complete.
  if (data.candidates?.[0]?.finishReason === "MAX_TOKENS") {
    throw new Error("Документ вийшов задовгим і обірвався.");
  }
  return extractText(data);
}

/**
 * Longest a single Vertex call may take. Node's fetch gives up on a request
 * that has sent no response headers after 300 s, so a slower reply would
 * never arrive anyway; stopping just short of that turns a stalled call into
 * a clean retry instead of a bare "fetch failed".
 */
const CALL_TIMEOUT_MS = 290_000;

/** With less than this left of the request's budget a call cannot finish. */
const MIN_CALL_MS = 15_000;

/**
 * Thrown when the request's time budget runs out. Past its hard limit the
 * platform kills the request and the lawyer gets an error page instead of an
 * answer, so model calls stop a little before it.
 */
class TimeBudgetError extends Error {
  constructor() {
    super(
      "Час на підготовку відповіді вичерпано. Спробуйте ще раз або розділіть питання на частини."
    );
    this.name = "TimeBudgetError";
  }
}

/**
 * Vertex returns transient 429/503 under load and now and then stalls on a
 * call without answering; retry a few times with backoff instead of
 * surfacing a failure to the lawyer.
 *
 * `deadline` is the epoch-ms time budget of the whole request: no attempt
 * runs past it.
 */
async function postWithRetry(
  endpoint: string,
  body: Record<string, unknown>,
  deadline?: number,
  attempts = 3
): Promise<GeminiResponse> {
  const payload = JSON.stringify(body);
  // For the log line only — the endpoint itself carries the API key.
  const model = endpoint.match(/\/models\/([^:]+):/)?.[1] ?? "gemini";
  const outOfTime = () =>
    deadline !== undefined && deadline - Date.now() < MIN_CALL_MS;

  let lastError = "";
  let stalled = false;

  for (let i = 0; i < attempts; i++) {
    if (outOfTime()) throw new TimeBudgetError();

    const startedAt = Date.now();
    const timeout =
      deadline === undefined
        ? CALL_TIMEOUT_MS
        : Math.min(CALL_TIMEOUT_MS, deadline - startedAt);
    let retriable = true;
    stalled = false;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        signal: AbortSignal.timeout(timeout),
      });

      if (res.ok) {
        const data: GeminiResponse = await res.json();
        console.info(
          `[ai] ${model}: ${Math.round((Date.now() - startedAt) / 1000)}s`
        );
        return data;
      }

      lastError = `Gemini API error ${res.status}: ${await res.text()}`;
      retriable = res.status === 429 || res.status >= 500;
    } catch (e) {
      // No HTTP answer at all: the call stalled until the timeout, or the
      // connection dropped. A fresh attempt usually goes through.
      const name = (e as { name?: string } | null)?.name;
      stalled = name === "TimeoutError" || name === "AbortError";
      lastError = stalled
        ? "Модель не відповіла вчасно. Спробуйте ще раз."
        : `Gemini API request failed: ${e instanceof Error ? e.message : String(e)}`;
      console.error(`[ai] ${model}: attempt ${i + 1} failed`, e);
    }

    if (!retriable || i === attempts - 1) break;

    await new Promise((r) => setTimeout(r, 1000 * 2 ** i));
  }

  // A call cut short by the budget is the budget's failure, not the model's.
  if (stalled && outOfTime()) throw new TimeBudgetError();
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

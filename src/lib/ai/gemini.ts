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

/** Max model↔tool round-trips before we stop and answer with what we have. */
const MAX_TOOL_STEPS = 4;

function collectSources(data: GeminiResponse, into: Map<string, string>) {
  const chunks = data.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
  for (const chunk of chunks) {
    const uri = chunk.web?.uri;
    if (!uri) continue;
    const title = chunk.web?.domain || chunk.web?.title || uri;
    if (!into.has(uri)) into.set(uri, title);
  }
}

/**
 * Reply that can consult live sources: Google Search grounding for
 * legislation and a direct reader for court decisions. Used only by the
 * "fast" tier — the "pro" tier deliberately stays on the plain path the
 * lawyer already relies on.
 */
export async function generateResearchReply(
  history: ChatTurn[],
  systemInstruction: string
): Promise<AssistantReply> {
  const { readCourtDecision } = await import("./legal-sources");

  const contents = historyToContents(history);
  const sources = new Map<string, string>();

  const body: Record<string, unknown> = {
    contents,
    systemInstruction: { parts: [{ text: systemInstruction }] },
    tools: RESEARCH_TOOLS,
    generationConfig: {
      temperature: 0.8,
      topP: 0.95,
      maxOutputTokens: 8192,
      thinkingConfig: { thinkingLevel: "low" },
    },
  };

  const endpoint = getEndpoint(resolveModel("fast"), "generateContent");

  for (let step = 0; step < MAX_TOOL_STEPS; step++) {
    const res = await postWithRetry(endpoint, body);
    const data: GeminiResponse = await res.json();

    collectSources(data, sources);

    const parts = data.candidates?.[0]?.content?.parts ?? [];
    const calls = parts.filter((p) => p.functionCall);

    if (calls.length === 0) {
      return {
        text: extractText(data),
        sources: [...sources].map(([uri, title]) => ({ uri, title })),
      };
    }

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
          sources.set(result.url, "reyestr.court.gov.ua");
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

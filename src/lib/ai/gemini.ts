const TEXT_MODEL = "gemini-3.1-pro-preview";
const IMAGE_MODEL = "imagen-4.0-ultra-generate-001";

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
type Part = TextPart | InlineDataPart;

interface GeminiMessage {
  role: "user" | "model";
  parts: Part[];
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
}

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
  fileBase64?: string;
  fileMimeType?: string;
}

/**
 * Multi-turn chat with optional multimodal support.
 * Sends full conversation history so the model remembers context.
 */
export async function generateChatResponse(
  history: ChatTurn[],
  systemInstruction?: string
): Promise<string> {
  const contents: GeminiMessage[] = history.map((turn) => {
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
    };
  });

  const body: Record<string, unknown> = { contents };

  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction }] };
  }
  body.generationConfig = {
    temperature: 0.8,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
  };

  const endpoint = getEndpoint(TEXT_MODEL, "generateContent");
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${errorText}`);
  }

  const data: GeminiResponse = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

/**
 * Simple single-turn generation (backward compatible).
 */
export async function generateContent(
  prompt: string,
  systemInstruction?: string
): Promise<string> {
  return generateChatResponse(
    [{ role: "user", content: prompt }],
    systemInstruction
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

const TEXT_MODEL = "gemini-3.1-pro-preview";
const IMAGE_MODEL = "imagen-4.0-ultra-generate-001";

function getApiKey() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  return apiKey;
}

function getEndpoint() {
  return `https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent?key=${getApiKey()}`;
}

interface GeminiMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
}

export async function generateContent(
  prompt: string,
  systemInstruction?: string
): Promise<string> {
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

  const endpoint = getEndpoint();
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

export async function generateContentStream(
  prompt: string,
  systemInstruction?: string
): Promise<ReadableStream<string>> {
  const streamEndpoint = getEndpoint().replace(":generateContent", ":streamGenerateContent");

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
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:predict?key=${getApiKey()}`;

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

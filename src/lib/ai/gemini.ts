const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;
const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.0-flash";

const ENDPOINT = `https://aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/global/publishers/google/models/${MODEL}:generateContent?key=${API_KEY}`;

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

  const res = await fetch(ENDPOINT, {
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
  const streamEndpoint = ENDPOINT.replace(":generateContent", ":streamGenerateContent");

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

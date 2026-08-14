/**
 * Live legal sources the assistant can consult.
 *
 * Only ЄДРСР (reyestr.court.gov.ua) is fetched directly — it publishes no
 * robots.txt, and we read a single decision the lawyer asked about rather
 * than crawling. Legislation (zakon.rada.gov.ua) is NOT fetched here: its
 * robots.txt disallows every agent except Googlebot, so laws reach the model
 * through Google Search grounding instead.
 */

const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Accept-Language": "uk-UA,uk;q=0.9",
};

const FETCH_TIMEOUT_MS = 20_000;
const MAX_DECISION_CHARS = 60_000;

function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|tr|h[1-6])>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&mdash;/g, "—")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n\s*\n+/g, "\n\n")
    .trim();
}

/** Accepts a bare id ("100000000") or any reyestr URL containing one. */
function normalizeDecisionId(input: string): string | null {
  const match = input.match(/(\d{6,})/);
  return match ? match[1] : null;
}

export interface CourtDecision {
  found: boolean;
  id?: string;
  url?: string;
  text?: string;
  truncated?: boolean;
  error?: string;
}

/**
 * Reads the full text of a single decision from the Unified State Register
 * of Court Decisions.
 */
export async function readCourtDecision(
  idOrUrl: string
): Promise<CourtDecision> {
  const id = normalizeDecisionId(idOrUrl);
  if (!id) {
    return { found: false, error: "Некоректний ID рішення." };
  }

  const url = `https://reyestr.court.gov.ua/Review/${id}`;

  try {
    const res = await fetch(url, {
      headers: BROWSER_HEADERS,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) {
      return { found: false, id, url, error: `HTTP ${res.status}` };
    }

    const text = htmlToText(await res.text());

    // A missing decision still returns 200 with just the portal chrome.
    if (text.length < 2000) {
      return { found: false, id, url, error: "Рішення не знайдено в реєстрі." };
    }

    const truncated = text.length > MAX_DECISION_CHARS;

    return {
      found: true,
      id,
      url,
      text: truncated ? text.slice(0, MAX_DECISION_CHARS) : text,
      truncated,
    };
  } catch (e) {
    return {
      found: false,
      id,
      url,
      error: e instanceof Error ? e.message : "Помилка запиту.",
    };
  }
}

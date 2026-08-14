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

/**
 * Strips citations the model invented instead of retrieved.
 *
 * Two failure modes seen in testing, both dangerous for a lawyer:
 * 1. zakon.rada deep anchors (#n1350) were fabricated — the article number in
 *    the prose was right but the link landed on an unrelated article.
 * 2. ЄДРСР decision links were fabricated — a cited "case 923/876/16" pointed
 *    at a Review id that is actually a different case entirely.
 *
 * Anchors are dropped so the link still opens the correct law, and any court
 * decision the assistant did not actually open with the tool loses its link.
 */
export function sanitizeCitations(
  text: string,
  verifiedDecisionIds: Set<string>
): { text: string; strippedDecisions: number } {
  let strippedDecisions = 0;

  // 1. zakon.rada.gov.ua/...#nNNN  ->  zakon.rada.gov.ua/...
  let out = text.replace(
    /(https?:\/\/zakon\.rada\.gov\.ua\/[^\s)\]]*?)#n\d+/gi,
    "$1"
  );

  const isUnverified = (url: string) => {
    const id = url.match(/reyestr\.court\.gov\.ua\/Review\/(\d+)/i)?.[1];
    return id ? !verifiedDecisionIds.has(id) : false;
  };

  // 2. [text](unverified reyestr url) -> text
  out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/gi, (m, label, url) => {
    if (!isUnverified(url)) return m;
    strippedDecisions++;
    return label;
  });

  // 3. bare unverified reyestr urls
  out = out.replace(/https?:\/\/reyestr\.court\.gov\.ua\/Review\/\d+/gi, (url) => {
    if (!isUnverified(url)) return url;
    strippedDecisions++;
    return "(посилання не наведено)";
  });

  if (strippedDecisions > 0) {
    out +=
      "\n\n> ⚠️ **Увага:** посилання на судові рішення, які асистент не відкривав, було прибрано — номери справ у тексті НЕ перевірені. Перевір їх у ЄДРСР перед використанням.";
  }

  return { text: out, strippedDecisions };
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

/**
 * The document markup contract between the drafting prompt and the PDF
 * renderer. Kept free of Node imports so the chat UI can parse a stored
 * draft too (title and placeholder count for the document card).
 */

export type DocumentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "signature"; left?: string; right?: string }
  | { type: "spacer" };

export interface LegalDocumentSpec {
  /** Centred title, e.g. "ПОЗОВНА ЗАЯВА". */
  title: string;
  /** Optional line under the title, e.g. what the claim is about. */
  subtitle?: string;
  /** Right-aligned addressee block ("До Личаківського районного суду…"). */
  recipient?: string[];
  /** Place of issue, e.g. "м. Львів". */
  place?: string;
  /** Already-formatted date, e.g. "21.09.2026". */
  date?: string;
  blocks: DocumentBlock[];
  /** Base name for the download; ".pdf" is appended if missing. */
  fileName?: string;
}

/**
 * Parses the document markup the model writes into a spec.
 *
 * The model is asked for restricted markdown rather than JSON: under a JSON
 * schema, long legal text made Gemini loop on empty blocks until it hit the
 * token limit. Markdown it writes reliably.
 *
 *   > line            addressee block (before the title)
 *   # Title
 *   ## Heading
 *   1. item           ordered list
 *   - item            bullet list
 *   ::subtitle text
 *   ::sign left | right
 *   ::place м. Львів
 *   ::date 21.09.2026
 *   ::file short-name
 *
 * Anything else is paragraph text; blank lines separate paragraphs.
 */
export function parseDocumentMarkup(markup: string): LegalDocumentSpec {
  const spec: LegalDocumentSpec = { title: "", blocks: [] };
  const recipient: string[] = [];

  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushParagraph = () => {
    const text = paragraph.join(" ").trim();
    if (text) spec.blocks.push({ type: "paragraph", text });
    paragraph = [];
  };
  const flushList = () => {
    if (list?.items.length) {
      spec.blocks.push({ type: "list", ordered: list.ordered, items: list.items });
    }
    list = null;
  };
  const flush = () => {
    flushParagraph();
    flushList();
  };

  // Models sometimes wrap the whole thing in a code fence.
  const body = markup
    .replace(/^\s*```[a-z]*\s*\n/i, "")
    .replace(/\n```\s*$/, "");

  for (const raw of body.split("\n")) {
    const line = raw.trim();

    if (!line) {
      flush();
      continue;
    }

    const directive = line.match(/^::(\w+)\s*(.*)$/);
    if (directive) {
      flush();
      const [, key, value] = directive;
      switch (key.toLowerCase()) {
        case "subtitle":
          spec.subtitle = value;
          break;
        case "place":
          spec.place = value;
          break;
        case "date":
          spec.date = value;
          break;
        case "file":
          spec.fileName = value;
          break;
        case "sign": {
          const [left, right] = value.split("|").map((s) => s.trim());
          spec.blocks.push({ type: "signature", left: left || undefined, right: right || undefined });
          break;
        }
      }
      continue;
    }

    if (line.startsWith(">") && !spec.title) {
      recipient.push(line.replace(/^>\s?/, ""));
      continue;
    }

    const h1 = line.match(/^#\s+(.+)$/);
    if (h1 && !spec.title) {
      flush();
      spec.title = h1[1];
      continue;
    }

    const heading = line.match(/^#{1,6}\s+(.+)$/);
    if (heading) {
      flush();
      spec.blocks.push({ type: "heading", text: heading[1] });
      continue;
    }

    const ordered = line.match(/^\d+[.)]\s+(.+)$/);
    const bullet = line.match(/^[-*•—]\s+(.+)$/);
    if (ordered || bullet) {
      flushParagraph();
      const isOrdered = Boolean(ordered);
      if (!list || list.ordered !== isOrdered) {
        flushList();
        list = { ordered: isOrdered, items: [] };
      }
      list.items.push((ordered ?? bullet)![1]);
      continue;
    }

    // A wrapped continuation of the last list item.
    if (list && !paragraph.length && /^\s{2,}/.test(raw)) {
      list.items[list.items.length - 1] += ` ${line}`;
      continue;
    }

    flushList();
    paragraph.push(line);
  }
  flush();

  if (recipient.length) spec.recipient = recipient;
  if (!spec.title) spec.title = "Документ";
  return spec;
}

export function documentFileName(spec: LegalDocumentSpec): string {
  const base = (spec.fileName || spec.title || "document")
    .replace(/\.pdf$/i, "")
    .replace(/[\\/:*?"<>|]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
  return `${base || "document"}.pdf`;
}

/** Fields the model could not fill, written as "[...]". */
export function countPlaceholders(markup: string): number {
  return markup.match(/\[[^\]\n]{1,80}\]/g)?.length ?? 0;
}

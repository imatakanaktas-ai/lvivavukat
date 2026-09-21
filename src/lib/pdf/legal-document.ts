import { readFile } from "node:fs/promises";
import path from "node:path";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb } from "pdf-lib";

import type { LegalDocumentSpec } from "./markup";

/**
 * Renders a formal legal document as a PDF.
 *
 * Two things make this different from dumping chat text into a page:
 *
 * 1. The font. pdf-lib's StandardFonts are WinAnsi-encoded and throw on the
 *    first Cyrillic character, so every Ukrainian document failed. PT Serif is
 *    embedded (subset) instead — it covers Cyrillic and Turkish, and it is a
 *    Times-like serif, which is what Ukrainian courts expect.
 * 2. The structure. The caller passes an outline (title, addressee, numbered
 *    body, signature block), not a blob of prose, so the result is laid out
 *    like an official document rather than a transcript.
 */

// A4 in PDF points.
const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;

const MARGIN_X = 56.7; // 20mm
const MARGIN_TOP = 56.7;
const MARGIN_BOTTOM = 56.7;

const BODY_SIZE = 12;
const TITLE_SIZE = 14;
const LINE_HEIGHT = 1.45;
const PARAGRAPH_GAP = 6;
const INDENT = 35.4; // 12.5mm first-line indent, as in Ukrainian practice

const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;

let fontCache: { regular: Uint8Array; bold: Uint8Array } | null = null;

async function loadFonts() {
  if (fontCache) return fontCache;
  const dir = path.join(process.cwd(), "src", "lib", "pdf", "fonts");
  const [regular, bold] = await Promise.all([
    readFile(path.join(dir, "PTSerif-Regular.ttf")),
    readFile(path.join(dir, "PTSerif-Bold.ttf")),
  ]);
  fontCache = { regular, bold };
  return fontCache;
}

/**
 * The model is told to emit plain text, but it still slips in markdown
 * emphasis and bullet characters often enough to be worth stripping.
 */
function clean(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/^\s*[-*•]\s+/gm, "")
    .replace(/ /g, " ")
    .trimEnd();
}

interface Measurer {
  widthOfTextAtSize(text: string, size: number): number;
}

interface WrappedLine {
  text: string;
  /** Last line of its paragraph — never justified. */
  last: boolean;
}

/**
 * Greedy wrap. Splits on spaces, and hard-splits words wider than the line.
 * `firstIndent` narrows the first line of each paragraph so an indented
 * opening line does not run past the right margin.
 */
function wrap(
  text: string,
  font: Measurer,
  size: number,
  maxWidth: number,
  firstIndent = 0
): WrappedLine[] {
  const out: WrappedLine[] = [];

  for (const rawLine of text.split("\n")) {
    if (!rawLine.trim()) {
      out.push({ text: "", last: true });
      continue;
    }

    const start = out.length;
    const widthFor = () =>
      out.length === start ? maxWidth - firstIndent : maxWidth;

    let line = "";
    for (const word of rawLine.split(/\s+/).filter(Boolean)) {
      const candidate = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= widthFor()) {
        line = candidate;
        continue;
      }

      if (line) out.push({ text: line, last: false });

      if (font.widthOfTextAtSize(word, size) <= widthFor()) {
        line = word;
        continue;
      }

      // A single token longer than the line (a long URL, a case number).
      let chunk = "";
      for (const ch of word) {
        if (font.widthOfTextAtSize(chunk + ch, size) > widthFor()) {
          out.push({ text: chunk, last: false });
          chunk = ch;
        } else {
          chunk += ch;
        }
      }
      line = chunk;
    }

    out.push({ text: line, last: true });
  }

  return out;
}

export async function renderLegalDocumentPdf(
  spec: LegalDocumentSpec
): Promise<Uint8Array> {
  const fonts = await loadFonts();

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const regular = await pdfDoc.embedFont(fonts.regular, { subset: true });
  const bold = await pdfDoc.embedFont(fonts.bold, { subset: true });
  const ink = rgb(0.08, 0.08, 0.1);

  let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN_TOP;

  const newPage = () => {
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    y = PAGE_HEIGHT - MARGIN_TOP;
  };

  const ensure = (needed: number) => {
    if (y - needed < MARGIN_BOTTOM) newPage();
  };

  type DrawOpts = {
    size?: number;
    font?: typeof regular;
    align?: "left" | "center" | "right" | "justify";
    indentFirst?: boolean;
    maxWidth?: number;
    x?: number;
  };

  const draw = (text: string, opts: DrawOpts = {}) => {
    const size = opts.size ?? BODY_SIZE;
    const font = opts.font ?? regular;
    const align = opts.align ?? "left";
    const maxWidth = opts.maxWidth ?? CONTENT_WIDTH;
    const boxX = opts.x ?? MARGIN_X;
    const step = size * LINE_HEIGHT;
    const firstIndent = opts.indentFirst ? INDENT : 0;

    const lines = wrap(clean(text), font, size, maxWidth, firstIndent);

    lines.forEach((line, i) => {
      ensure(step);
      if (!line.text) {
        y -= step;
        return;
      }

      const indent = i === 0 ? firstIndent : 0;
      const baseline = y - size;
      const available = maxWidth - indent;

      const words = line.text.split(" ");
      if (align === "justify" && !line.last && words.length > 1) {
        const wordsWidth = words.reduce(
          (sum, w) => sum + font.widthOfTextAtSize(w, size),
          0
        );
        const gap = (available - wordsWidth) / (words.length - 1);
        let x = boxX + indent;
        for (const w of words) {
          page.drawText(w, { x, y: baseline, size, font, color: ink });
          x += font.widthOfTextAtSize(w, size) + gap;
        }
      } else {
        const width = font.widthOfTextAtSize(line.text, size);
        let x = boxX + indent;
        if (align === "center") x = boxX + (maxWidth - width) / 2;
        else if (align === "right") x = boxX + maxWidth - width;
        page.drawText(line.text, { x, y: baseline, size, font, color: ink });
      }

      y -= step;
    });
  };

  // ---- Addressee block, right half of the page ----
  if (spec.recipient?.length) {
    const boxWidth = CONTENT_WIDTH * 0.52;
    for (const line of spec.recipient) {
      draw(line, { x: MARGIN_X + CONTENT_WIDTH - boxWidth, maxWidth: boxWidth });
    }
    y -= PARAGRAPH_GAP * 3;
  }

  // ---- Title ----
  if (spec.title.trim()) {
    draw(spec.title.toUpperCase(), {
      size: TITLE_SIZE,
      font: bold,
      align: "center",
    });

    if (spec.subtitle) {
      y -= PARAGRAPH_GAP / 2;
      draw(spec.subtitle, { align: "center" });
    }

    y -= PARAGRAPH_GAP * 2;
  }

  // ---- Body ----
  for (const block of spec.blocks) {
    switch (block.type) {
      case "heading":
        y -= PARAGRAPH_GAP;
        ensure(BODY_SIZE * LINE_HEIGHT * 2);
        draw(block.text, { font: bold });
        y -= PARAGRAPH_GAP / 2;
        break;

      case "paragraph":
        draw(block.text, { indentFirst: true, align: "justify" });
        y -= PARAGRAPH_GAP;
        break;

      case "list": {
        block.items.forEach((item, i) => {
          const marker = block.ordered ? `${i + 1}.` : "—";
          const markerWidth = regular.widthOfTextAtSize(`${marker} `, BODY_SIZE);
          ensure(BODY_SIZE * LINE_HEIGHT);
          page.drawText(marker, {
            x: MARGIN_X + INDENT,
            y: y - BODY_SIZE,
            size: BODY_SIZE,
            font: regular,
            color: ink,
          });
          draw(item, {
            x: MARGIN_X + INDENT + markerWidth,
            maxWidth: CONTENT_WIDTH - INDENT - markerWidth,
            align: "justify",
          });
        });
        y -= PARAGRAPH_GAP;
        break;
      }

      case "signature": {
        y -= PARAGRAPH_GAP * 2;
        ensure(BODY_SIZE * LINE_HEIGHT * 2);
        const half = CONTENT_WIDTH / 2;
        const baseline = y - BODY_SIZE;
        if (block.left) {
          page.drawText(clean(block.left), {
            x: MARGIN_X,
            y: baseline,
            size: BODY_SIZE,
            font: regular,
            color: ink,
          });
        }
        if (block.right) {
          const t = clean(block.right);
          page.drawText(t, {
            x:
              MARGIN_X +
              CONTENT_WIDTH -
              regular.widthOfTextAtSize(t, BODY_SIZE),
            y: baseline,
            size: BODY_SIZE,
            font: regular,
            color: ink,
          });
        }
        if (!block.left && !block.right) {
          page.drawText("_".repeat(24), {
            x: MARGIN_X + half,
            y: baseline,
            size: BODY_SIZE,
            font: regular,
            color: ink,
          });
        }
        y -= BODY_SIZE * LINE_HEIGHT;
        break;
      }

      case "spacer":
        y -= BODY_SIZE * LINE_HEIGHT;
        break;
    }
  }

  // ---- Place / date footer line ----
  if (spec.place || spec.date) {
    y -= PARAGRAPH_GAP * 2;
    ensure(BODY_SIZE * LINE_HEIGHT);
    const baseline = y - BODY_SIZE;
    if (spec.place) {
      page.drawText(clean(spec.place), {
        x: MARGIN_X,
        y: baseline,
        size: BODY_SIZE,
        font: regular,
        color: ink,
      });
    }
    if (spec.date) {
      const t = clean(spec.date);
      page.drawText(t, {
        x: MARGIN_X + CONTENT_WIDTH - regular.widthOfTextAtSize(t, BODY_SIZE),
        y: baseline,
        size: BODY_SIZE,
        font: regular,
        color: ink,
      });
    }
  }

  // ---- Page numbers, from page 2 on ----
  const pages = pdfDoc.getPages();
  if (pages.length > 1) {
    pages.forEach((p, i) => {
      if (i === 0) return;
      const label = String(i + 1);
      p.drawText(label, {
        x: (PAGE_WIDTH - regular.widthOfTextAtSize(label, 10)) / 2,
        y: MARGIN_BOTTOM / 2,
        size: 10,
        font: regular,
        color: rgb(0.45, 0.45, 0.5),
      });
    });
  }

  return pdfDoc.save();
}

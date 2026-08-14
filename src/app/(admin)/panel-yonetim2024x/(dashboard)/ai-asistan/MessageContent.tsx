"use client";

/**
 * Minimal markdown renderer for assistant messages.
 *
 * The assistant now cites sources, so links must be clickable. Everything is
 * HTML-escaped first and only our own tags are injected afterwards, so model
 * output can never introduce markup.
 */

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeHref(url: string): string | null {
  return /^https?:\/\//i.test(url) ? url : null;
}

function renderInline(escaped: string): string {
  return (
    escaped
      // [text](url)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, text, url) => {
        const href = safeHref(url);
        if (!href) return text;
        return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-purple-600 underline underline-offset-2 hover:text-purple-800 break-all">${text}</a>`;
      })
      // bare URLs not already inside an anchor
      .replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, (match, pre, url) => {
        return `${pre}<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-purple-600 underline underline-offset-2 hover:text-purple-800 break-all">${url}</a>`;
      })
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-gray-200 text-[12px]">$1</code>')
  );
}

function toHtml(markdown: string): string {
  const lines = markdown.split("\n");
  const out: string[] = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const escaped = escapeHtml(line);

    if (/^\s*---+\s*$/.test(line)) {
      closeList();
      out.push('<hr class="my-3 border-gray-200" />');
      continue;
    }

    const heading = escaped.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      closeList();
      out.push(
        `<div class="font-bold mt-3 mb-1">${renderInline(heading[2])}</div>`
      );
      continue;
    }

    const bullet = escaped.match(/^\s*[-*•]\s+(.*)$/);
    if (bullet) {
      if (!inList) {
        out.push('<ul class="list-disc pl-5 space-y-0.5 my-1">');
        inList = true;
      }
      out.push(`<li>${renderInline(bullet[1])}</li>`);
      continue;
    }

    const numbered = escaped.match(/^\s*(\d+)\.\s+(.*)$/);
    if (numbered) {
      if (!inList) {
        out.push('<ul class="list-decimal pl-5 space-y-0.5 my-1">');
        inList = true;
      }
      out.push(`<li>${renderInline(numbered[2])}</li>`);
      continue;
    }

    closeList();

    if (!line.trim()) {
      out.push('<div class="h-2"></div>');
      continue;
    }

    out.push(`<div>${renderInline(escaped)}</div>`);
  }

  closeList();
  return out.join("");
}

export default function MessageContent({
  content,
  isUser,
}: {
  content: string;
  isUser: boolean;
}) {
  if (isUser) {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }

  return (
    <div
      className="leading-relaxed [&_a]:font-medium"
      dangerouslySetInnerHTML={{ __html: toHtml(content) }}
    />
  );
}

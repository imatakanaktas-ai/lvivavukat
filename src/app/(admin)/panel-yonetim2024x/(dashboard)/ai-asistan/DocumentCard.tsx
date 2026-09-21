"use client";

import { useMemo, useState } from "react";
import {
  FileText,
  Download,
  Loader2,
  ChevronDown,
  ChevronUp,
  TriangleAlert,
} from "lucide-react";
import { countPlaceholders, parseDocumentMarkup } from "@/lib/pdf/markup";

/**
 * An assistant message that is a drafted document. The message content is the
 * document markup; the PDF is rendered on the server when downloaded.
 */
export default function DocumentCard({
  markup,
  isDownloading,
  error,
  onDownload,
}: {
  markup: string;
  isDownloading: boolean;
  error: string | null;
  onDownload: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const spec = useMemo(() => parseDocumentMarkup(markup), [markup]);
  const placeholders = useMemo(() => countPlaceholders(markup), [markup]);

  return (
    <div className="w-full">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-12 rounded-md bg-white border border-gray-200 flex items-center justify-center">
          <FileText className="w-5 h-5 text-red-500" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-gray-900 leading-snug">{spec.title}</p>
          {spec.subtitle && (
            <p className="text-xs text-gray-500 mt-0.5">{spec.subtitle}</p>
          )}
          {placeholders > 0 && (
            <p className="flex items-center gap-1 text-xs text-amber-700 mt-1.5">
              <TriangleAlert className="w-3.5 h-3.5 flex-shrink-0" />
              Полів для заповнення: {placeholders} — у [квадратних дужках]
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A1628] text-white text-xs font-semibold
            hover:bg-[#1B2A4A] transition-colors disabled:opacity-60"
        >
          {isDownloading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5" />
          )}
          Завантажити PDF
        </button>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-100 transition-colors"
        >
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
          {expanded ? "Сховати текст" : "Показати текст"}
        </button>
      </div>

      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}

      {expanded && (
        <div className="mt-3 p-4 rounded-lg bg-white border border-gray-200 font-serif text-[13px] leading-relaxed text-gray-800 max-h-[60vh] overflow-y-auto">
          {spec.recipient && (
            <div className="ml-auto w-3/5 mb-4">
              {spec.recipient.map((line, i) =>
                line ? <p key={i}>{line}</p> : <div key={i} className="h-3" />
              )}
            </div>
          )}
          <p className="text-center font-bold uppercase">{spec.title}</p>
          {spec.subtitle && <p className="text-center mb-3">{spec.subtitle}</p>}
          {spec.blocks.map((block, i) => {
            switch (block.type) {
              case "heading":
                return (
                  <p key={i} className="font-bold mt-3 mb-1">
                    {block.text}
                  </p>
                );
              case "paragraph":
                return (
                  <p key={i} className="indent-8 text-justify mb-1.5">
                    {block.text}
                  </p>
                );
              case "list": {
                const List = block.ordered ? "ol" : "ul";
                return (
                  <List
                    key={i}
                    className={`pl-12 mb-1.5 ${block.ordered ? "list-decimal" : "list-[circle]"}`}
                  >
                    {block.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </List>
                );
              }
              case "signature":
                return (
                  <div key={i} className="flex justify-between mt-4">
                    <span>{block.left}</span>
                    <span>{block.right}</span>
                  </div>
                );
              case "spacer":
                return <div key={i} className="h-4" />;
            }
          })}
          {(spec.place || spec.date) && (
            <div className="flex justify-between mt-4">
              <span>{spec.place}</span>
              <span>{spec.date}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

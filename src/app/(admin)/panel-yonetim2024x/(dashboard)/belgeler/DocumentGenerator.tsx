"use client";

import { useState, useTransition } from "react";
import {
  FileText,
  Bot,
  Sparkles,
  Loader2,
  Copy,
  Check,
  Printer,
  FolderOpen,
  AlertCircle,
  FileSignature,
  ScrollText,
  Stamp,
  ClipboardList,
  MoreHorizontal,
} from "lucide-react";
import { generateDocument, generateDocumentWithAI } from "./actions";

const documentTypes = [
  { value: "dilekce", label: "Dilekçe", icon: FileSignature },
  { value: "sozlesme", label: "Sözleşme", icon: ScrollText },
  { value: "vekaletname", label: "Vekaletname", icon: Stamp },
  { value: "basvuru", label: "Başvuru Formu", icon: ClipboardList },
  { value: "diger", label: "Diğer", icon: MoreHorizontal },
];

type Template = {
  id: string;
  name: string;
  category: string;
  contentTemplate: string;
  variables: unknown;
};

type Client = {
  id: string;
  firstName: string;
  lastName: string;
};

export default function DocumentGenerator({
  templates,
  clients,
}: {
  templates: Template[];
  clients: Client[];
}) {
  const [mode, setMode] = useState<"template" | "ai">("ai");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const [aiDocType, setAiDocType] = useState("dilekce");
  const [aiDetails, setAiDetails] = useState("");
  const [aiClient, setAiClient] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, startGenerate] = useTransition();

  const handleTemplateSelect = (t: Template) => {
    setSelectedTemplate(t);
    setVariableValues({});
    setGeneratedContent("");
  };

  const handleTemplateGenerate = () => {
    if (!selectedTemplate) return;
    setError("");
    startGenerate(async () => {
      const result = await generateDocument(selectedTemplate.id, variableValues);
      if (result.success && result.content) {
        setGeneratedContent(result.content);
      } else {
        setError(result.error || "Belge oluşturulamadı.");
      }
    });
  };

  const handleAIGenerate = () => {
    if (!aiDetails.trim()) return;
    setError("");
    startGenerate(async () => {
      const clientName = aiClient
        ? clients.find((c) => c.id === aiClient)
          ? `${clients.find((c) => c.id === aiClient)!.firstName} ${clients.find((c) => c.id === aiClient)!.lastName}`
          : undefined
        : undefined;
      const typeLabel = documentTypes.find((d) => d.value === aiDocType)?.label || aiDocType;
      const result = await generateDocumentWithAI(typeLabel, aiDetails, clientName);
      if (result.success && result.content) {
        setGeneratedContent(result.content);
      } else {
        setError(result.error || "AI belge oluşturulamadı.");
      }
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(`
        <html><head><title>Belge</title>
        <style>body{font-family:serif;max-width:800px;margin:40px auto;padding:20px;line-height:1.8;white-space:pre-wrap;}</style>
        </head><body>${generatedContent.replace(/\n/g, "<br>")}</body></html>
      `);
      win.document.close();
      win.print();
    }
  };

  const variables = selectedTemplate?.variables as string[] | null;

  return (
    <>
      {/* Mode Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => { setMode("ai"); setGeneratedContent(""); setError(""); }}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all
            ${mode === "ai"
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-200"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
        >
          <Bot className="w-4 h-4" />
          AI ile Oluştur
        </button>
        <button
          onClick={() => { setMode("template"); setGeneratedContent(""); setError(""); }}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all
            ${mode === "template"
              ? "bg-[#0A1628] text-white"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
        >
          <FolderOpen className="w-4 h-4" />
          Şablondan Oluştur
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-5">
          {mode === "ai" ? (
            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 space-y-4">
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                AI Belge Oluşturucu
              </h2>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Belge Türü <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {documentTypes.map((dt) => {
                    const Icon = dt.icon;
                    return (
                      <button
                        key={dt.value}
                        type="button"
                        onClick={() => setAiDocType(dt.value)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all
                          ${aiDocType === dt.value
                            ? "bg-[#0A1628] text-white"
                            : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                          }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {dt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Müvekkil (opsiyonel)</label>
                <select
                  value={aiClient}
                  onChange={(e) => setAiClient(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                    focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                >
                  <option value="">Müvekkil seçin...</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.firstName} {c.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Belge Detayları <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={aiDetails}
                  onChange={(e) => setAiDetails(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 resize-y
                    focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                  placeholder="Belgenin konusu, amacı ve içermesi gereken bilgileri yazın...&#10;&#10;Ör: Türk vatandaşı Ahmet Yılmaz için Ukrayna oturum izni başvuru dilekçesi. Pasaport no: U12345678, başvuru tarihi: 15.03.2026"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                onClick={handleAIGenerate}
                disabled={isGenerating || !aiDetails.trim()}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold
                  bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700
                  transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                {isGenerating ? "Oluşturuluyor..." : "Belge Oluştur"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Template list */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200/80 space-y-3">
                <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-gray-400" />
                  Şablon Seçin
                </h2>
                {templates.length === 0 ? (
                  <p className="text-sm text-gray-400 py-4 text-center">
                    Henüz şablon yok. Şablonlar sayfasından ekleyin.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {templates.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleTemplateSelect(t)}
                        className={`w-full text-left p-3 rounded-xl text-sm transition-all
                          ${selectedTemplate?.id === t.id
                            ? "bg-[#0A1628] text-white"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        <p className="font-semibold">{t.name}</p>
                        <p className={`text-xs mt-0.5 ${selectedTemplate?.id === t.id ? "text-gray-300" : "text-gray-400"}`}>
                          {t.category}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Variables fill */}
              {selectedTemplate && variables && variables.length > 0 && (
                <div className="p-6 rounded-2xl bg-white border border-gray-200/80 space-y-3">
                  <h2 className="text-sm font-bold text-gray-800">Değişkenleri Doldurun</h2>
                  {variables.map((v) => (
                    <div key={v}>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{v}</label>
                      <input
                        type="text"
                        value={variableValues[v] || ""}
                        onChange={(e) => setVariableValues((prev) => ({ ...prev, [v]: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                          focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                        placeholder={`{{${v}}}`}
                      />
                    </div>
                  ))}
                  <button
                    onClick={handleTemplateGenerate}
                    disabled={isGenerating}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold
                      bg-[#0A1628] hover:bg-[#1B2A4A] text-white transition-colors disabled:opacity-50"
                  >
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                    Belge Oluştur
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Output Panel */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200/80 min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" />
              Oluşturulan Belge
            </h2>
            {generatedContent && (
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                    text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Kopyalandı" : "Kopyala"}
                </button>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                    text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Yazdır
                </button>
              </div>
            )}
          </div>

          {generatedContent ? (
            <div className="flex-1 p-4 rounded-xl bg-gray-50 border border-gray-100 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-serif leading-relaxed">
                {generatedContent}
              </pre>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-300">
              <div className="text-center">
                <FileText className="w-16 h-16 mx-auto mb-3 opacity-30" />
                <p className="text-sm text-gray-400">
                  {mode === "ai"
                    ? "Detayları girin ve AI ile belge oluşturun"
                    : "Şablon seçin ve değişkenleri doldurun"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

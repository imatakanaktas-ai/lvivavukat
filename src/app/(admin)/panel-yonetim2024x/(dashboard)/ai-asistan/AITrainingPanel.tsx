"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import {
  Brain,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  BookOpen,
  Shield,
  MessageSquareQuote,
  Zap,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Lightbulb,
} from "lucide-react";
import {
  getDirectives,
  createDirective,
  updateDirective,
  deleteDirective,
  type DirectiveCategory,
  type DirectiveItem,
} from "./directive-actions";

const CATEGORY_CONFIG: Record<
  DirectiveCategory,
  { label: string; icon: typeof Brain; color: string; bgColor: string }
> = {
  tone: {
    label: "Ton & Üslup",
    icon: MessageSquareQuote,
    color: "text-violet-600",
    bgColor: "bg-violet-50 border-violet-200",
  },
  knowledge: {
    label: "Bilgi & Uzmanlık",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
  },
  rules: {
    label: "Kurallar & Kısıtlamalar",
    icon: Shield,
    color: "text-amber-600",
    bgColor: "bg-amber-50 border-amber-200",
  },
  examples: {
    label: "Örnek Yanıtlar",
    icon: Lightbulb,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 border-emerald-200",
  },
  general: {
    label: "Genel Yönerge",
    icon: Zap,
    color: "text-gray-600",
    bgColor: "bg-gray-50 border-gray-200",
  },
};

const PRESET_TEMPLATES: { title: string; content: string; category: DirectiveCategory }[] = [
  {
    title: "Samimi ama profesyonel ton",
    content:
      "Müvekkillere her zaman nazik, sıcak ve profesyonel bir dille yanıt ver. Hukuki terimleri basit Türkçe/Ukraynaca ile açıkla. Resmi ama soğuk olma, samimi ama laubali olma.",
    category: "tone",
  },
  {
    title: "2025 oturum izni değişiklikleri",
    content:
      "2025 yılı itibarıyla Ukrayna'da geçici oturum izni başvurularında dijital başvuru sistemi devreye alınmıştır. ДМС artık e-başvuru kabul etmektedir. Süre 15 iş gününe düşürülmüştür.",
    category: "knowledge",
  },
  {
    title: "Ceza hukuku kısıtlaması",
    content:
      "Ceza hukuku konularında kesin hukuki tavsiye verme. Bunun yerine genel bilgi sun ve 'bu konuda detaylı bir inceleme yapmam gerekiyor' de. Ceza davalarında strateji önerisi yapma.",
    category: "rules",
  },
  {
    title: "Oturum izni sorusu örneği",
    content:
      'Müvekkil oturum izni süreci sorarsa şu formatta cevap ver:\n1. Başvuru şartları (madde madde)\n2. Gerekli belgeler (liste halinde)\n3. Süre ve maliyet\n4. "Belgelerin hazırlanmasında size yardımcı olabilirim" ile bitir.',
    category: "examples",
  },
];

export default function AITrainingPanel() {
  const [directives, setDirectives] = useState<DirectiveItem[]>([]);
  const [isLoading, startLoad] = useTransition();
  const [isSaving, startSave] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formCategory, setFormCategory] = useState<DirectiveCategory>("general");

  const loadDirectives = useCallback(() => {
    startLoad(async () => {
      const result = await getDirectives();
      if (result.success && result.directives) {
        setDirectives(result.directives);
      }
    });
  }, []);

  useEffect(() => {
    loadDirectives();
  }, [loadDirectives]);

  const resetForm = () => {
    setFormTitle("");
    setFormContent("");
    setFormCategory("general");
    setShowForm(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!formTitle.trim() || !formContent.trim()) return;

    startSave(async () => {
      if (editingId) {
        const result = await updateDirective(editingId, {
          title: formTitle,
          content: formContent,
          category: formCategory,
        });
        if (result.success) {
          loadDirectives();
          resetForm();
        }
      } else {
        const result = await createDirective({
          title: formTitle,
          content: formContent,
          category: formCategory,
        });
        if (result.success) {
          loadDirectives();
          resetForm();
        }
      }
    });
  };

  const handleEdit = (d: DirectiveItem) => {
    setFormTitle(d.title);
    setFormContent(d.content);
    setFormCategory(d.category);
    setEditingId(d.id);
    setShowForm(true);
  };

  const handleToggle = (d: DirectiveItem) => {
    startSave(async () => {
      const result = await updateDirective(d.id, { isActive: !d.isActive });
      if (result.success) loadDirectives();
    });
  };

  const handleDelete = (id: string) => {
    startSave(async () => {
      const result = await deleteDirective(id);
      if (result.success) loadDirectives();
    });
  };

  const handleUseTemplate = (t: (typeof PRESET_TEMPLATES)[number]) => {
    setFormTitle(t.title);
    setFormContent(t.content);
    setFormCategory(t.category);
    setShowForm(true);
    setShowTemplates(false);
  };

  const activeCount = directives.filter((d) => d.isActive).length;

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] min-h-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">AI Eğitim Paneli</h2>
            <p className="text-xs text-gray-500">
              {activeCount} aktif yönerge
              {directives.length > activeCount && ` / ${directives.length} toplam`}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0A1628] text-white text-xs font-semibold
            hover:bg-[#1B2A4A] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Yeni Ekle
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-4 p-4 rounded-2xl bg-white border-2 border-purple-200 shadow-lg shadow-purple-100/50 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-800">
              {editingId ? "✏️ Yönergeyi Düzenle" : "✨ Yeni Yönerge"}
            </h3>
            <button onClick={resetForm} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400">
              <X className="w-4 h-4" />
            </button>
          </div>

          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Yönerge başlığı..."
            className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800
              focus:outline-none focus:ring-2 focus:ring-purple-300 mb-2"
          />

          <textarea
            value={formContent}
            onChange={(e) => setFormContent(e.target.value)}
            placeholder="AI'ya vermek istediğiniz talimatı yazın...&#10;&#10;Örnek: Müvekkillere her zaman Türkçe ve Ukraynaca seçenekleri sun. Hukuki terimleri basit bir dille açıkla."
            rows={4}
            className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800
              resize-none focus:outline-none focus:ring-2 focus:ring-purple-300 mb-2"
          />

          {/* Category selector */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {(Object.entries(CATEGORY_CONFIG) as [DirectiveCategory, typeof CATEGORY_CONFIG.tone][]).map(
              ([key, cfg]) => {
                const Icon = cfg.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setFormCategory(key)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all
                      ${formCategory === key
                        ? `${cfg.bgColor} ${cfg.color} ring-2 ring-offset-1 ring-purple-300`
                        : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}
                  >
                    <Icon className="w-3 h-3" />
                    {cfg.label}
                  </button>
                );
              }
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving || !formTitle.trim() || !formContent.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold
                hover:bg-purple-700 transition-colors disabled:opacity-40"
            >
              <Check className="w-3.5 h-3.5" />
              {editingId ? "Güncelle" : "Kaydet"}
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 rounded-xl border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      {/* Templates */}
      {!showForm && (
        <button
          onClick={() => setShowTemplates(!showTemplates)}
          className="flex items-center justify-between w-full px-4 py-2.5 mb-3 rounded-xl
            bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 text-xs text-purple-700
            hover:from-purple-100 hover:to-indigo-100 transition-all"
        >
          <span className="flex items-center gap-2 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Hazır Şablonlar
          </span>
          {showTemplates ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      )}

      {showTemplates && !showForm && (
        <div className="mb-3 grid grid-cols-1 gap-2 animate-in slide-in-from-top-2">
          {PRESET_TEMPLATES.map((t, i) => {
            const cfg = CATEGORY_CONFIG[t.category];
            const Icon = cfg.icon;
            return (
              <button
                key={i}
                onClick={() => handleUseTemplate(t)}
                className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all
                  hover:shadow-md ${cfg.bgColor}`}
              >
                <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${cfg.color}`} />
                <div>
                  <p className="text-xs font-semibold text-gray-800">{t.title}</p>
                  <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">{t.content}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Directives list */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {isLoading && directives.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Brain className="w-10 h-10 mb-2 animate-pulse" />
            <p className="text-xs">Yükleniyor...</p>
          </div>
        ) : directives.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center mb-3">
              <Brain className="w-7 h-7 text-purple-500" />
            </div>
            <h3 className="text-sm font-bold text-gray-700 mb-1">Henüz yönerge eklenmedi</h3>
            <p className="text-xs text-gray-400 max-w-[240px] mb-4">
              AI asistanın nasıl yanıt vermesi gerektiğini öğretmek için yönergeler ekleyin.
              Her yönerge kalıcı olarak saklanır.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold
                hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              İlk Yönergeyi Ekle
            </button>
          </div>
        ) : (
          directives.map((d) => {
            const cfg = CATEGORY_CONFIG[d.category] || CATEGORY_CONFIG.general;
            const Icon = cfg.icon;
            const isExpanded = expandedId === d.id;

            return (
              <div
                key={d.id}
                className={`group rounded-xl border transition-all ${
                  d.isActive
                    ? "bg-white border-gray-200 hover:border-purple-200 hover:shadow-md"
                    : "bg-gray-50/50 border-gray-100 opacity-60"
                }`}
              >
                <div className="flex items-start gap-2.5 p-3">
                  <div className={`mt-0.5 p-1.5 rounded-lg ${cfg.bgColor}`}>
                    <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-gray-800 truncate">{d.title}</h4>
                      <span
                        className={`flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          d.isActive ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {d.isActive ? "Aktif" : "Pasif"}
                      </span>
                    </div>
                    <p
                      className={`text-[11px] text-gray-500 mt-0.5 ${isExpanded ? "" : "line-clamp-2"}`}
                    >
                      {d.content}
                    </p>
                    {d.content.length > 100 && (
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : d.id)}
                        className="text-[10px] text-purple-500 hover:text-purple-700 mt-0.5 font-medium"
                      >
                        {isExpanded ? "Daha az" : "Devamını gör"}
                      </button>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleToggle(d)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      title={d.isActive ? "Devre dışı bırak" : "Aktifleştir"}
                    >
                      {d.isActive ? (
                        <ToggleRight className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <ToggleLeft className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEdit(d)}
                      className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Düzenle"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      title="Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer info */}
      {directives.length > 0 && (
        <div className="mt-3 px-3 py-2 rounded-xl bg-purple-50/80 border border-purple-100">
          <p className="text-[11px] text-purple-600 flex items-center gap-1.5">
            <Brain className="w-3 h-3" />
            <span>
              <strong>{activeCount} aktif yönerge</strong> her AI yanıtında otomatik olarak uygulanır.
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useActionState, useEffect } from "react";
import {
  Plus,
  X,
  Trash2,
  Loader2,
  FileText,
  FolderOpen,
  Eye,
  AlertCircle,
} from "lucide-react";
import { createTemplate, deleteTemplate, type TemplateActionState } from "../belgeler/actions";

type Template = {
  id: string;
  name: string;
  category: string;
  contentTemplate: string;
  variables: unknown;
  createdAt: string;
};

type CategoryConfig = Record<string, { label: string; icon: typeof FileText; color: string }>;

export default function TemplateManager({
  initialTemplates,
  categoryConfig,
}: {
  initialTemplates: Template[];
  categoryConfig: CategoryConfig;
}) {
  const [templates, setTemplates] = useState(initialTemplates);
  const [showModal, setShowModal] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formState, formAction, isPending] = useActionState<TemplateActionState, FormData>(
    createTemplate,
    null
  );

  useEffect(() => {
    if (formState?.success) {
      setShowModal(false);
      window.location.reload();
    }
  }, [formState]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const result = await deleteTemplate(id);
    if (result?.success) {
      setTemplates((prev) => prev.filter((t) => t.id !== id));
    }
    setDeletingId(null);
  };

  return (
    <>
      {/* Actions */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-[#0A1628] hover:bg-[#1B2A4A] text-white 
            px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yeni Şablon
        </button>
      </div>

      {/* Templates Grid */}
      {templates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-200/80">
          <FolderOpen className="w-12 h-12 text-gray-200 mb-4" />
          <p className="text-gray-500 font-medium">Henüz şablon yok</p>
          <p className="text-sm text-gray-400 mt-1">İlk şablonunuzu oluşturun.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t) => {
            const cfg = categoryConfig[t.category] || categoryConfig.diger;
            const Icon = cfg.icon;
            const vars = t.variables as string[] | null;
            return (
              <div key={t.id} className="group bg-white rounded-2xl border border-gray-200/80 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${cfg.color}`}>
                    <Icon className="w-3 h-3" />
                    {cfg.label}
                  </span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setPreviewTemplate(t)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      disabled={deletingId === t.id}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      {deletingId === t.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">{t.name}</h3>
                {vars && vars.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {vars.slice(0, 5).map((v) => (
                      <span key={v} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-gray-100 text-gray-500">
                        {`{{${v}}}`}
                      </span>
                    ))}
                    {vars.length > 5 && (
                      <span className="text-[10px] text-gray-400">+{vars.length - 5}</span>
                    )}
                  </div>
                )}
                <p className="text-[11px] text-gray-400 mt-3">
                  {new Date(t.createdAt).toLocaleDateString("tr-TR")}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">{previewTemplate.name}</h3>
              <button onClick={() => setPreviewTemplate(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-serif leading-relaxed">
                {previewTemplate.contentTemplate}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* New Template Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">Yeni Şablon</h3>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form action={formAction} className="space-y-4">
              {formState && !formState.success && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-sm text-red-600">{formState.message}</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Şablon Adı <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                    focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                  placeholder="Ör: Oturum İzni Başvuru Dilekçesi"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Kategori</label>
                <select
                  name="category"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                    focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                >
                  <option value="dilekce">Dilekçe</option>
                  <option value="sozlesme">Sözleşme</option>
                  <option value="vekaletname">Vekaletname</option>
                  <option value="basvuru">Başvuru</option>
                  <option value="diger">Diğer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Değişkenler <span className="text-gray-400">(virgülle ayırın)</span>
                </label>
                <input
                  type="text"
                  name="variables"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                    focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                  placeholder="müvekkil_adı, tarih, pasaport_no"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Şablon İçeriği <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="contentTemplate"
                  required
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 
                    font-mono resize-y focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                  placeholder={"Değişkenleri {{değişken_adı}} formatında kullanın.\n\nÖrnek:\nSayın Yetkili,\n\n{{müvekkil_adı}} isimli müvekkilim adına..."}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                    bg-[#0A1628] hover:bg-[#1B2A4A] text-white transition-colors disabled:opacity-50"
                >
                  {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Oluştur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

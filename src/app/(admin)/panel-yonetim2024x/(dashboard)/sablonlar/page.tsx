import Link from "next/link";
import { FileText, FolderOpen, FileSignature, ScrollText, Stamp, ClipboardList, MoreHorizontal } from "lucide-react";
import { getTemplates } from "../belgeler/actions";
import TemplateManager from "./TemplateManager";

const categoryConfig: Record<string, { label: string; icon: typeof FileText; color: string }> = {
  dilekce: { label: "Dilekçe", icon: FileSignature, color: "text-blue-600 bg-blue-50" },
  sozlesme: { label: "Sözleşme", icon: ScrollText, color: "text-emerald-600 bg-emerald-50" },
  vekaletname: { label: "Vekaletname", icon: Stamp, color: "text-purple-600 bg-purple-50" },
  basvuru: { label: "Başvuru", icon: ClipboardList, color: "text-amber-600 bg-amber-50" },
  diger: { label: "Diğer", icon: MoreHorizontal, color: "text-gray-600 bg-gray-100" },
};

export default async function TemplatesPage() {
  let templates: Awaited<ReturnType<typeof getTemplates>> = [];
  try {
    templates = await getTemplates();
  } catch {
    // DB not connected
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">Belge Şablonları</h1>
        <p className="text-sm text-gray-500 mt-1">Tekrar kullanılabilir belge şablonlarını yönetin</p>
      </div>
      <TemplateManager initialTemplates={templates} categoryConfig={categoryConfig} />
    </div>
  );
}

import Link from "next/link";
import { FileText, FolderOpen, FileSignature, ScrollText, Stamp, ClipboardList, MoreHorizontal } from "lucide-react";
import { getTemplates } from "../belgeler/actions";
import TemplateManager from "./TemplateManager";

const categoryConfig: Record<string, { label: string; icon: typeof FileText; color: string }> = {
  dilekce: { label: "Клопотання", icon: FileSignature, color: "text-blue-600 bg-blue-50" },
  sozlesme: { label: "Договір", icon: ScrollText, color: "text-emerald-600 bg-emerald-50" },
  vekaletname: { label: "Довіреність", icon: Stamp, color: "text-purple-600 bg-purple-50" },
  basvuru: { label: "Заява", icon: ClipboardList, color: "text-amber-600 bg-amber-50" },
  diger: { label: "Інше", icon: MoreHorizontal, color: "text-gray-600 bg-gray-100" },
};

export default async function TemplatesPage() {
  let templates: Awaited<ReturnType<typeof getTemplates>> = [];
  try {
    templates = await getTemplates();
  } catch {
    // DB not connected
  }

  // Serialize for client component
  const serializedTemplates = templates.map((t) => ({
    id: t.id,
    name: t.name,
    category: t.category,
    contentTemplate: t.contentTemplate,
    variables: t.variables,
    createdAt: t.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">Шаблони документів</h1>
        <p className="text-sm text-gray-500 mt-1">Керуйте багаторазовими шаблонами документів</p>
      </div>
      <TemplateManager initialTemplates={serializedTemplates} categoryConfig={categoryConfig} />
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ClientForm from "../components/ClientForm";

const ADMIN_PREFIX = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

export default function NewClientPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href={`/${ADMIN_PREFIX}/muvekiller`}
          className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center 
            text-gray-500 hover:text-gray-800 hover:border-gray-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Yeni Müvekkil</h1>
          <p className="text-sm text-gray-500 mt-0.5">Yeni müvekkil kaydı oluşturun</p>
        </div>
      </div>
      <ClientForm />
    </div>
  );
}

import Link from "next/link";
import { Scale, Home, ArrowLeft, Phone } from "lucide-react";
import { cookies } from "next/headers";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedHref } from "@/i18n/locale-utils";

export default async function NotFound() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "tr") as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#1B2A4A] to-[#0A1628] flex items-center justify-center px-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#C9A84C]/3 rounded-full blur-3xl" />
      </div>

      <div className="relative text-center max-w-lg">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 mb-8">
          <Scale className="w-10 h-10 text-[#C9A84C]" />
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-bold text-white/10 font-[family-name:var(--font-playfair)] mb-2 select-none">
          404
        </h1>
        <h2 className="text-2xl font-bold text-white mb-3 font-[family-name:var(--font-playfair)]">
          {dict.notFound.title}
        </h2>
        <p className="text-gray-400 mb-10 leading-relaxed">
          {dict.notFound.description}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={localizedHref("/", locale)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A84C] hover:bg-[#D4AF37] text-[#0A1628] font-semibold rounded-xl transition-colors text-sm"
          >
            <Home className="w-4 h-4" />
            {dict.notFound.home}
          </Link>
          <Link
            href={localizedHref("/hizmetler", locale)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition-colors text-sm border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            {dict.notFound.services}
          </Link>
          <Link
            href={localizedHref("/iletisim", locale)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition-colors text-sm border border-white/10"
          >
            <Phone className="w-4 h-4" />
            {dict.notFound.contact}
          </Link>
        </div>

        {/* Brand */}
        <p className="mt-12 text-xs text-gray-500">
          Lviv Avukat — Av. Lyudmyla Chubai
        </p>
      </div>
    </div>
  );
}

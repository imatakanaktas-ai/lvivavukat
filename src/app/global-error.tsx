"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="tr">
      <body className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#1B2A4A] to-[#0A1628] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Bir Hata Oluştu
          </h2>
          <p className="text-gray-400 mb-8">
            Beklenmeyen bir sorun oluştu. Sayfayı yenilemeyi deneyin veya ana sayfaya dönün.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A84C] hover:bg-[#D4AF37] text-[#0A1628] font-semibold rounded-xl transition-colors text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Tekrar Dene
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition-colors text-sm border border-white/10"
            >
              <Home className="w-4 h-4" />
              Ana Sayfa
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}

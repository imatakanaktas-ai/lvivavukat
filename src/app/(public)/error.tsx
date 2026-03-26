"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 border border-red-100 mb-6">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-[#0A1628] mb-2">
          Bir Hata Oluştu
        </h2>
        <p className="text-gray-500 mb-8 text-sm">
          Bu sayfa yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A1628] hover:bg-[#1B2A4A] text-white font-semibold rounded-xl transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Tekrar Dene
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors text-sm"
          >
            <Home className="w-4 h-4" />
            Ana Sayfa
          </Link>
        </div>
      </div>
    </div>
  );
}

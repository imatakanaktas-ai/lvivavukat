"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { deleteClient } from "../actions";

const ADMIN_PREFIX = process.env.NEXT_PUBLIC_ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

export default function DeleteClientButton({
  clientId,
  clientName,
}: {
  clientId: string;
  clientName: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      await deleteClient(clientId);
      router.push(`/${ADMIN_PREFIX}/muvekiller`);
    });
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-red-500">
          {clientName} silinsin mi?
        </span>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white 
            px-3 py-2 rounded-xl text-xs font-semibold transition-colors disabled:opacity-60"
        >
          {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
          Evet, Sil
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-3 py-2 rounded-xl text-xs font-semibold text-gray-500 bg-gray-100 
            hover:bg-gray-200 transition-colors"
        >
          İptal
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="inline-flex items-center gap-2 border border-red-200 text-red-500 
        hover:bg-red-50 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
    >
      <Trash2 className="w-4 h-4" />
      Sil
    </button>
  );
}

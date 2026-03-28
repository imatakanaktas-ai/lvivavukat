"use client";

import { useState, useTransition } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { addCourtDate } from "../actions";

export default function AddCourtDateForm({ clientId }: { clientId: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const data = {
      courtName: form.get("courtName") as string,
      caseNumber: form.get("caseNumber") as string,
      hearingDate: form.get("hearingDate") as string,
      hearingTime: form.get("hearingTime") as string,
      notes: form.get("notes") as string,
    };
    startTransition(async () => {
      const result = await addCourtDate(clientId, data);
      if (result?.success) {
        setOpen(false);
      } else {
        setError(result?.message || "Помилка.");
      }
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-7 h-7 rounded-lg bg-[#0A1628] hover:bg-[#1B2A4A] text-white flex items-center justify-center transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    );
  }

  return (
    <div className="mt-3 p-4 rounded-xl bg-gray-50 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-gray-700">Нова судова дата</p>
        <button onClick={() => setOpen(false)} className="p-1 hover:bg-gray-200 rounded-lg">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input type="text" name="courtName" required placeholder="Назва суду *"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30" />
        <input type="text" name="caseNumber" placeholder="Номер справи"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30" />
        <div className="grid grid-cols-2 gap-2">
          <input type="date" name="hearingDate" required
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30" />
          <input type="time" name="hearingTime" placeholder="Час"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30" />
        </div>
        <input type="text" name="notes" placeholder="Нотатки"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30" />
        <button type="submit" disabled={isPending}
          className="w-full py-2 rounded-lg bg-[#0A1628] hover:bg-[#1B2A4A] text-white text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Додати судову дату
        </button>
      </form>
    </div>
  );
}

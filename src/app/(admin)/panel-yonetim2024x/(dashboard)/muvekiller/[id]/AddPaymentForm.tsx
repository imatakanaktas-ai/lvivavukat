"use client";

import { useState, useTransition } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { createPayment, type ClientActionState } from "../actions";

export default function AddPaymentForm({ clientId }: { clientId: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(formData: FormData) {
    setError("");
    formData.set("clientId", clientId);
    startTransition(async () => {
      const result: ClientActionState = await createPayment(null, formData);
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
        <p className="text-xs font-semibold text-gray-700">Нова оплата</p>
        <button onClick={() => setOpen(false)} className="p-1 hover:bg-gray-200 rounded-lg">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
      <form action={handleSubmit} className="space-y-2">
        <input type="text" name="title" required placeholder="Назва *"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30" />
        <div className="grid grid-cols-2 gap-2">
          <input type="number" name="amount" required placeholder="Сума *" step="0.01" min="0"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30" />
          <select name="currency" defaultValue="UAH"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30">
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="TRY">TRY</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input type="date" name="dueDate"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30" />
          <select name="status" defaultValue="pending"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30">
            <option value="pending">Очікує</option>
            <option value="paid">Оплачено</option>
            <option value="overdue">Протерміновано</option>
          </select>
        </div>
        <select name="type" defaultValue="avukat_ucreti"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30">
          <option value="avukat_ucreti">Гонорар адвоката</option>
          <option value="devlet_harci">Державне мито</option>
          <option value="vergi">Податок</option>
          <option value="noter">Нотаріус</option>
          <option value="diger">Інше</option>
        </select>
        <input type="text" name="notes" placeholder="Нотатки"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30" />
        <button type="submit" disabled={isPending}
          className="w-full py-2 rounded-lg bg-[#0A1628] hover:bg-[#1B2A4A] text-white text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Додати оплату
        </button>
      </form>
    </div>
  );
}

"use client";

import { useState, useActionState, useEffect, useTransition } from "react";
import Link from "next/link";
import {
  Plus,
  X,
  Bell,
  Gavel,
  DollarSign,
  FileText,
  Receipt,
  Clock,
  Star,
  CheckCircle2,
  Circle,
  Trash2,
  Loader2,
  AlertCircle,
  Users,
} from "lucide-react";
import { createReminder, toggleReminderComplete, deleteReminder, type ReminderActionState } from "./actions";

const ADMIN_PREFIX = process.env.NEXT_PUBLIC_ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

const typeConfig: Record<string, { label: string; color: string; bgColor: string; icon: typeof Gavel }> = {
  mahkeme: { label: "Mahkeme", color: "text-red-700", bgColor: "bg-red-50", icon: Gavel },
  odeme: { label: "Ödeme", color: "text-amber-700", bgColor: "bg-amber-50", icon: DollarSign },
  devlet_islemi: { label: "Devlet İşlemi", color: "text-blue-700", bgColor: "bg-blue-50", icon: FileText },
  vergi: { label: "Vergi", color: "text-emerald-700", bgColor: "bg-emerald-50", icon: Receipt },
  deadline: { label: "Son Tarih", color: "text-orange-700", bgColor: "bg-orange-50", icon: Clock },
  ozel: { label: "Özel", color: "text-purple-700", bgColor: "bg-purple-50", icon: Star },
};

type Reminder = {
  id: string;
  title: string;
  description: string | null;
  dueDate: Date;
  type: string;
  isCompleted: boolean;
  clientId: string | null;
  clientFirstName: string | null;
  clientLastName: string | null;
};

export default function RemindersList({
  initialReminders,
  showCompleted,
}: {
  initialReminders: Reminder[];
  showCompleted: boolean;
}) {
  const [reminders, setReminders] = useState(initialReminders);
  const [showModal, setShowModal] = useState(false);
  const [isToggling, startToggle] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formState, formAction, isPending] = useActionState<ReminderActionState, FormData>(
    createReminder,
    null
  );

  useEffect(() => {
    if (formState?.success) {
      setShowModal(false);
      window.location.reload();
    }
  }, [formState]);

  const handleToggle = (id: string, current: boolean) => {
    startToggle(async () => {
      const result = await toggleReminderComplete(id, !current);
      if (result?.success) {
        setReminders((prev) =>
          prev.map((r) => (r.id === id ? { ...r, isCompleted: !current } : r))
        );
      }
    });
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const result = await deleteReminder(id);
    if (result?.success) {
      setReminders((prev) => prev.filter((r) => r.id !== id));
    }
    setDeletingId(null);
  };

  const now = new Date();

  // Group reminders
  const overdue = reminders.filter(
    (r) => !r.isCompleted && new Date(r.dueDate) < now
  );
  const upcoming = reminders.filter(
    (r) => !r.isCompleted && new Date(r.dueDate) >= now
  );
  const completed = reminders.filter((r) => r.isCompleted);

  const renderReminder = (r: Reminder) => {
    const cfg = typeConfig[r.type] || typeConfig.ozel;
    const TypeIcon = cfg.icon;
    const isOverdue = !r.isCompleted && new Date(r.dueDate) < now;
    const dueDate = new Date(r.dueDate);

    return (
      <div
        key={r.id}
        className={`group flex items-start gap-3 p-4 rounded-xl border transition-all
          ${r.isCompleted
            ? "bg-gray-50 border-gray-100 opacity-60"
            : isOverdue
              ? "bg-red-50/50 border-red-200"
              : "bg-white border-gray-200/80 hover:shadow-sm"
          }`}
      >
        {/* Toggle button */}
        <button
          onClick={() => handleToggle(r.id, r.isCompleted)}
          disabled={isToggling}
          className="mt-0.5 flex-shrink-0"
        >
          {r.isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          ) : (
            <Circle className="w-5 h-5 text-gray-300 hover:text-[#C9A84C] transition-colors" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${cfg.color} ${cfg.bgColor}`}>
              <TypeIcon className="w-3 h-3" />
              {cfg.label}
            </span>
            {isOverdue && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold text-red-700 bg-red-100">
                <AlertCircle className="w-3 h-3" />
                Gecikmiş
              </span>
            )}
          </div>
          <h3 className={`text-sm font-semibold ${r.isCompleted ? "line-through text-gray-400" : "text-gray-800"}`}>
            {r.title}
          </h3>
          {r.description && (
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{r.description}</p>
          )}
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {dueDate.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
              {" "}
              {dueDate.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
            </span>
            {r.clientFirstName && (
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {r.clientFirstName} {r.clientLastName}
              </span>
            )}
          </div>
        </div>

        {/* Delete */}
        <button
          onClick={() => handleDelete(r.id)}
          disabled={deletingId === r.id}
          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-gray-400 hover:text-red-500
            hover:bg-red-50 transition-all flex-shrink-0"
        >
          {deletingId === r.id ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>
      </div>
    );
  };

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex gap-2">
          <Link
            href={`/${ADMIN_PREFIX}/hatirlatmalar`}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors
              ${!showCompleted ? "bg-[#0A1628] text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
          >
            Aktif ({overdue.length + upcoming.length})
          </Link>
          <Link
            href={`/${ADMIN_PREFIX}/hatirlatmalar?show=completed`}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors
              ${showCompleted ? "bg-[#0A1628] text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
          >
            Tamamlanan ({completed.length})
          </Link>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-[#0A1628] hover:bg-[#1B2A4A] text-white 
            px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yeni Hatırlatma
        </button>
      </div>

      {/* Reminders List */}
      {reminders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-200/80">
          <Bell className="w-12 h-12 text-gray-200 mb-4" />
          <p className="text-gray-500 font-medium">
            {showCompleted ? "Tamamlanmış hatırlatma yok" : "Henüz hatırlatma yok"}
          </p>
          <p className="text-sm text-gray-400 mt-1">Yeni hatırlatma ekleyerek başlayın.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Overdue */}
          {!showCompleted && overdue.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5" />
                Gecikmiş ({overdue.length})
              </h2>
              <div className="space-y-2">{overdue.map(renderReminder)}</div>
            </div>
          )}

          {/* Upcoming */}
          {!showCompleted && upcoming.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                Yaklaşan ({upcoming.length})
              </h2>
              <div className="space-y-2">{upcoming.map(renderReminder)}</div>
            </div>
          )}

          {/* Completed */}
          {showCompleted && completed.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Tamamlanan ({completed.length})
              </h2>
              <div className="space-y-2">{completed.map(renderReminder)}</div>
            </div>
          )}
        </div>
      )}

      {/* New Reminder Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">Yeni Hatırlatma</h3>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form action={formAction} className="space-y-4">
              {formState && !formState.success && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
                  {formState.message}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Başlık <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                    focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                  placeholder="Hatırlatma başlığı"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Açıklama</label>
                <textarea
                  name="description"
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 resize-none
                    focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                  placeholder="Detaylar (isteğe bağlı)"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Tarih <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="dueDate"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                      focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Tür <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="type"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                      focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                  >
                    <option value="mahkeme">Mahkeme</option>
                    <option value="odeme">Ödeme</option>
                    <option value="devlet_islemi">Devlet İşlemi</option>
                    <option value="vergi">Vergi</option>
                    <option value="deadline">Son Tarih</option>
                    <option value="ozel">Özel</option>
                  </select>
                </div>
              </div>

              <input type="hidden" name="clientId" value="" />

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
                  Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

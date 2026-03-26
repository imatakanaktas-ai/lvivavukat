"use client";

import { useState, useMemo, useActionState, useEffect, useTransition } from "react";
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
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  CalendarDays,
  Filter,
  LayoutGrid,
} from "lucide-react";
import {
  createReminder,
  toggleReminderComplete,
  deleteReminder,
  type ReminderActionState,
  type UnifiedItem,
} from "./actions";

const ADMIN_PREFIX = process.env.NEXT_PUBLIC_ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

/* ───────────── Config Maps ───────────── */

const itemTypeConfig: Record<string, { label: string; color: string; bgColor: string; icon: typeof Bell }> = {
  reminder: { label: "Hatırlatma", color: "text-purple-700", bgColor: "bg-purple-50", icon: Bell },
  payment: { label: "Ödeme", color: "text-amber-700", bgColor: "bg-amber-50", icon: DollarSign },
  courtDate: { label: "Mahkeme", color: "text-red-700", bgColor: "bg-red-50", icon: Gavel },
};

const typeConfig: Record<string, { label: string; color: string; bgColor: string; icon: typeof Gavel }> = {
  mahkeme: { label: "Mahkeme", color: "text-red-700", bgColor: "bg-red-50", icon: Gavel },
  odeme: { label: "Ödeme", color: "text-amber-700", bgColor: "bg-amber-50", icon: DollarSign },
  devlet_islemi: { label: "Devlet İşlemi", color: "text-blue-700", bgColor: "bg-blue-50", icon: FileText },
  vergi: { label: "Vergi", color: "text-emerald-700", bgColor: "bg-emerald-50", icon: Receipt },
  deadline: { label: "Son Tarih", color: "text-orange-700", bgColor: "bg-orange-50", icon: Clock },
  ozel: { label: "Özel", color: "text-purple-700", bgColor: "bg-purple-50", icon: Star },
  avukat_ucreti: { label: "Avukat Ücreti", color: "text-indigo-700", bgColor: "bg-indigo-50", icon: DollarSign },
  devlet_harci: { label: "Devlet Harcı", color: "text-teal-700", bgColor: "bg-teal-50", icon: Receipt },
  noter: { label: "Noter", color: "text-cyan-700", bgColor: "bg-cyan-50", icon: FileText },
  diger: { label: "Diğer", color: "text-gray-600", bgColor: "bg-gray-100", icon: Clock },
};

const statusLabels: Record<string, { label: string; color: string }> = {
  active: { label: "Aktif", color: "bg-blue-50 text-blue-700" },
  completed: { label: "Tamamlandı", color: "bg-emerald-50 text-emerald-700" },
  pending: { label: "Bekliyor", color: "bg-amber-50 text-amber-700" },
  paid: { label: "Ödendi", color: "bg-emerald-50 text-emerald-700" },
  overdue: { label: "Gecikmiş", color: "bg-red-50 text-red-700" },
  cancelled: { label: "İptal", color: "bg-gray-100 text-gray-500" },
  scheduled: { label: "Planlandı", color: "bg-blue-50 text-blue-700" },
  postponed: { label: "Ertelendi", color: "bg-orange-50 text-orange-700" },
};

type SortField = "date" | "amount" | "title" | "client";
type SortDir = "asc" | "desc";

export default function EventsDashboard({
  initialItems,
  clientList,
}: {
  initialItems: UnifiedItem[];
  clientList: { id: string; name: string }[];
}) {
  // Filters
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "reminder" | "payment" | "courtDate">("all");
  const [filterClient, setFilterClient] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  // Sort
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  // UI
  const [showFilters, setShowFilters] = useState(false);
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
      await toggleReminderComplete(id, !current);
      window.location.reload();
    });
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await deleteReminder(id);
    window.location.reload();
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  /* ───────── Filtered + Sorted ───────── */

  const filtered = useMemo(() => {
    let result = [...initialItems];

    // Type filter
    if (filterType !== "all") {
      result = result.filter((i) => i.itemType === filterType);
    }

    // Client filter
    if (filterClient !== "all") {
      result = result.filter((i) => i.clientId === filterClient);
    }

    // Status filter
    if (filterStatus !== "all") {
      result = result.filter((i) => i.status === filterStatus);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          (i.description && i.description.toLowerCase().includes(q)) ||
          (i.clientFirstName && `${i.clientFirstName} ${i.clientLastName}`.toLowerCase().includes(q))
      );
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "date":
          cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "amount": {
          const aa = Number(a.amount) || 0;
          const bb = Number(b.amount) || 0;
          cmp = aa - bb;
          break;
        }
        case "title":
          cmp = a.title.localeCompare(b.title, "tr");
          break;
        case "client": {
          const na = a.clientFirstName || "";
          const nb = b.clientFirstName || "";
          cmp = na.localeCompare(nb, "tr");
          break;
        }
      }
      return sortDir === "desc" ? -cmp : cmp;
    });

    return result;
  }, [initialItems, filterType, filterClient, filterStatus, search, sortField, sortDir]);

  /* ───────── Stats ───────── */

  const stats = useMemo(() => {
    const now = new Date();
    const totalReminders = initialItems.filter((i) => i.itemType === "reminder" && i.status !== "completed").length;
    const totalPayments = initialItems.filter((i) => i.itemType === "payment").length;
    const totalCourtDates = initialItems.filter((i) => i.itemType === "courtDate").length;
    const overdueCount = initialItems.filter(
      (i) => new Date(i.date) < now && i.status !== "completed" && i.status !== "paid" && i.status !== "cancelled"
    ).length;
    const pendingPaymentTotal = initialItems
      .filter((i) => i.itemType === "payment" && i.status === "pending")
      .reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
    return { totalReminders, totalPayments, totalCourtDates, overdueCount, pendingPaymentTotal };
  }, [initialItems]);

  /* ───────── Unique statuses for filter ───────── */

  const uniqueStatuses = useMemo(() => {
    const set = new Set<string>();
    initialItems.forEach((i) => set.add(i.status));
    return Array.from(set);
  }, [initialItems]);

  const now = new Date();

  /* ───────── Sort Button Component ───────── */

  const SortBtn = ({ field, label }: { field: SortField; label: string }) => {
    const active = sortField === field;
    return (
      <button
        onClick={() => toggleSort(field)}
        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors
          ${active ? "bg-[#0A1628] text-white" : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"}`}
      >
        {label}
        {active ? (
          sortDir === "asc" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
        ) : (
          <ArrowUpDown className="w-3 h-3 opacity-40" />
        )}
      </button>
    );
  };

  /* ───────── Render Item ───────── */

  const renderItem = (item: UnifiedItem) => {
    const itCfg = itemTypeConfig[item.itemType];
    const tCfg = typeConfig[item.type] || typeConfig.diger;
    const ItIcon = itCfg.icon;
    const TIcon = tCfg.icon;
    const stCfg = statusLabels[item.status] || statusLabels.active;
    const isOverdue = new Date(item.date) < now && item.status !== "completed" && item.status !== "paid" && item.status !== "cancelled";
    const isReminder = item.itemType === "reminder";
    const isCompleted = item.status === "completed";
    const d = new Date(item.date);

    return (
      <div
        key={`${item.itemType}-${item.id}`}
        className={`group flex items-start gap-3 p-4 rounded-xl border transition-all
          ${isCompleted
            ? "bg-gray-50 border-gray-100 opacity-60"
            : isOverdue
              ? "bg-red-50/40 border-red-200"
              : "bg-white border-gray-200/80 hover:shadow-sm"
          }`}
      >
        {/* Toggle for reminders */}
        {isReminder ? (
          <button
            onClick={() => handleToggle(item.id, isCompleted)}
            disabled={isToggling}
            className="mt-0.5 flex-shrink-0"
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-300 hover:text-[#C9A84C] transition-colors" />
            )}
          </button>
        ) : (
          <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${itCfg.bgColor}`}>
            <ItIcon className={`w-3 h-3 ${itCfg.color}`} />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${itCfg.color} ${itCfg.bgColor}`}>
              <ItIcon className="w-3 h-3" />
              {itCfg.label}
            </span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${tCfg.color} ${tCfg.bgColor}`}>
              <TIcon className="w-2.5 h-2.5" />
              {tCfg.label}
            </span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold ${stCfg.color}`}>
              {stCfg.label}
            </span>
            {isOverdue && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold text-red-700 bg-red-100">
                <AlertCircle className="w-3 h-3" />
                Gecikmiş
              </span>
            )}
          </div>

          <h3 className={`text-sm font-semibold ${isCompleted ? "line-through text-gray-400" : "text-gray-800"}`}>
            {item.title}
          </h3>
          {item.description && (
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{item.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              {d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            {item.amount && (
              <span className="flex items-center gap-1 font-bold text-gray-700">
                <DollarSign className="w-3 h-3" />
                {Number(item.amount).toLocaleString("tr-TR", { minimumFractionDigits: 2 })} {item.currency}
              </span>
            )}
            {item.clientFirstName && (
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {item.clientFirstName} {item.clientLastName}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        {isReminder && (
          <button
            onClick={() => handleDelete(item.id)}
            disabled={deletingId === item.id}
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-gray-400 hover:text-red-500
              hover:bg-red-50 transition-all flex-shrink-0"
          >
            {deletingId === item.id ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Hatırlatma", value: stats.totalReminders, icon: Bell, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Ödeme", value: stats.totalPayments, icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Mahkeme", value: stats.totalCourtDates, icon: Gavel, color: "text-red-600", bg: "bg-red-50" },
          { label: "Gecikmiş", value: stats.overdueCount, icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200/80 p-4">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-800">{s.value}</p>
                  <p className="text-[11px] text-gray-400">{s.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search + Filter bar */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ara... (başlık, açıklama, müvekkil)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
            />
          </div>

          {/* Toggle filters */}
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors
              ${showFilters
                ? "bg-[#0A1628] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtre & Sırala
          </button>

          {/* New Reminder */}
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-[#0A1628] hover:bg-[#1B2A4A] text-white
              px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" />
            Yeni Hatırlatma
          </button>
        </div>

        {/* Type tabs */}
        <div className="flex flex-wrap gap-2">
          {(["all", "reminder", "payment", "courtDate"] as const).map((t) => {
            const labels: Record<string, string> = {
              all: `Tümü (${initialItems.length})`,
              reminder: `Hatırlatmalar (${initialItems.filter((i) => i.itemType === "reminder").length})`,
              payment: `Ödemeler (${initialItems.filter((i) => i.itemType === "payment").length})`,
              courtDate: `Mahkeme (${initialItems.filter((i) => i.itemType === "courtDate").length})`,
            };
            return (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors
                  ${filterType === t
                    ? "bg-[#0A1628] text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                  }`}
              >
                {labels[t]}
              </button>
            );
          })}
        </div>

        {/* Extended filters panel */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-gray-200/80 p-4 space-y-4">
            <div className="grid sm:grid-cols-3 gap-3">
              {/* Client filter */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  <Users className="w-3 h-3 inline mr-1" />
                  Müvekkil
                </label>
                <select
                  value={filterClient}
                  onChange={(e) => setFilterClient(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-800
                    focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                >
                  <option value="all">Tüm Müvekkiller</option>
                  {clientList.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Status filter */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  <Filter className="w-3 h-3 inline mr-1" />
                  Durum
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-800
                    focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                >
                  <option value="all">Tüm Durumlar</option>
                  {uniqueStatuses.map((s) => (
                    <option key={s} value={s}>{statusLabels[s]?.label || s}</option>
                  ))}
                </select>
              </div>

              {/* Clear filters */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFilterClient("all");
                    setFilterStatus("all");
                    setSearch("");
                    setFilterType("all");
                    setSortField("date");
                    setSortDir("asc");
                  }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Filtreleri Temizle
                </button>
              </div>
            </div>

            {/* Sort buttons */}
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3" />
                Sıralama
              </p>
              <div className="flex flex-wrap gap-2">
                <SortBtn field="date" label="Tarih" />
                <SortBtn field="amount" label="Tutar" />
                <SortBtn field="title" label="Başlık" />
                <SortBtn field="client" label="Müvekkil" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active filters summary */}
      {(filterClient !== "all" || filterStatus !== "all" || search) && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-gray-400 font-medium">Aktif filtreler:</span>
          {filterClient !== "all" && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold">
              Müvekkil: {clientList.find((c) => c.id === filterClient)?.name}
              <button onClick={() => setFilterClient("all")}><X className="w-3 h-3" /></button>
            </span>
          )}
          {filterStatus !== "all" && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 text-amber-700 font-semibold">
              Durum: {statusLabels[filterStatus]?.label || filterStatus}
              <button onClick={() => setFilterStatus("all")}><X className="w-3 h-3" /></button>
            </span>
          )}
          {search && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 text-gray-600 font-semibold">
              &quot;{search}&quot;
              <button onClick={() => setSearch("")}><X className="w-3 h-3" /></button>
            </span>
          )}
        </div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400 font-medium">
          {filtered.length} kayıt gösteriliyor
          {filtered.length !== initialItems.length && ` (toplam ${initialItems.length})`}
        </p>
        {stats.pendingPaymentTotal > 0 && filterType !== "courtDate" && filterType !== "reminder" && (
          <p className="text-xs font-bold text-amber-600">
            Bekleyen toplam: {stats.pendingPaymentTotal.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} UAH
          </p>
        )}
      </div>

      {/* Items List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-200/80">
          <LayoutGrid className="w-12 h-12 text-gray-200 mb-4" />
          <p className="text-gray-500 font-medium">Kayıt bulunamadı</p>
          <p className="text-sm text-gray-400 mt-1">Filtreleri değiştirin veya yeni kayıt ekleyin.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(renderItem)}
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

              {/* Client Selection */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  <Users className="w-3 h-3 inline mr-1" />
                  Müvekkil
                </label>
                <select
                  name="clientId"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                    focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                >
                  <option value="">Müvekkil Seçin (isteğe bağlı)</option>
                  {clientList.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

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

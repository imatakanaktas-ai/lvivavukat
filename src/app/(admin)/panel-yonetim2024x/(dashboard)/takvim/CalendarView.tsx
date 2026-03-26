"use client";

import { useState, useActionState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Calendar as CalendarIcon,
  Gavel,
  DollarSign,
  Users,
  Star,
  MoreHorizontal,
  Clock,
  Trash2,
  Loader2,
} from "lucide-react";
import { createCalendarEvent, deleteCalendarEvent, type CalendarActionState } from "./actions";

const eventTypeConfig: Record<
  string,
  { label: string; color: string; bgColor: string; borderColor: string; icon: typeof Gavel }
> = {
  toplanti: {
    label: "Toplantı",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-l-blue-500",
    icon: Users,
  },
  mahkeme: {
    label: "Mahkeme",
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-l-red-500",
    icon: Gavel,
  },
  odeme: {
    label: "Ödeme",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-l-amber-500",
    icon: DollarSign,
  },
  kisisel: {
    label: "Kişisel",
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-l-purple-500",
    icon: Star,
  },
  diger: {
    label: "Diğer",
    color: "text-gray-700",
    bgColor: "bg-gray-50",
    borderColor: "border-l-gray-400",
    icon: MoreHorizontal,
  },
};

type CalendarEvent = {
  id: string;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date | null;
  eventType: string;
  color: string | null;
  isAllDay: boolean | null;
  clientId: string | null;
  clientFirstName: string | null;
  clientLastName: string | null;
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  // Monday = 0, Sunday = 6
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

const MONTHS_TR = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

const DAYS_TR = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

export default function CalendarView({
  initialEvents,
}: {
  initialEvents: CalendarEvent[];
}) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [events, setEvents] = useState(initialEvents);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formState, formAction, isPending] = useActionState<CalendarActionState, FormData>(
    createCalendarEvent,
    null
  );

  useEffect(() => {
    if (formState?.success) {
      setShowModal(false);
      // Reload to get updated events
      window.location.reload();
    }
  }, [formState]);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const openNewEvent = (dateStr?: string) => {
    setSelectedEvent(null);
    setSelectedDate(dateStr || new Date().toISOString().slice(0, 16));
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const result = await deleteCalendarEvent(id);
    if (result?.success) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
      setSelectedEvent(null);
    }
    setDeletingId(null);
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  // Build calendar grid
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);
  while (calendarDays.length % 7 !== 0) calendarDays.push(null);

  // Group events by date
  const eventsByDate: Record<string, CalendarEvent[]> = {};
  events.forEach((ev) => {
    const d = new Date(ev.startDate);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (!eventsByDate[key]) eventsByDate[key] = [];
    eventsByDate[key].push(ev);
  });

  const isToday = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              className="p-2 rounded-xl hover:bg-white border border-transparent hover:border-gray-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded-xl hover:bg-white border border-transparent hover:border-gray-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <h2 className="text-lg font-bold text-gray-800">
            {MONTHS_TR[currentMonth]} {currentYear}
          </h2>
          <button
            onClick={goToday}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-gray-200 
              text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Bugün
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Event type legend */}
          <div className="hidden lg:flex items-center gap-3">
            {Object.entries(eventTypeConfig).map(([key, cfg]) => (
              <span key={key} className={`flex items-center gap-1 text-[11px] font-medium ${cfg.color}`}>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: key === "toplanti" ? "#3B82F6" : key === "mahkeme" ? "#EF4444" : key === "odeme" ? "#F59E0B" : key === "kisisel" ? "#8B5CF6" : "#6B7280" }}
                />
                {cfg.label}
              </span>
            ))}
          </div>
          <button
            onClick={() => openNewEvent()}
            className="inline-flex items-center gap-2 bg-[#0A1628] hover:bg-[#1B2A4A] text-white 
              px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" />
            Yeni Etkinlik
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden">
        {/* Days header */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {DAYS_TR.map((d) => (
            <div
              key={d}
              className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, i) => {
            const dateKey = day ? `${currentYear}-${currentMonth}-${day}` : "";
            const dayEvents = day ? eventsByDate[dateKey] || [] : [];

            return (
              <div
                key={i}
                onClick={() => {
                  if (day) {
                    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}T09:00`;
                    openNewEvent(dateStr);
                  }
                }}
                className={`min-h-[100px] md:min-h-[120px] p-1.5 border-b border-r border-gray-100 cursor-pointer
                  transition-colors hover:bg-gray-50/50
                  ${!day ? "bg-gray-50/30" : ""}
                  ${i % 7 === 6 ? "border-r-0" : ""}
                `}
              >
                {day && (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 text-xs font-semibold rounded-full
                          ${isToday(day) ? "bg-[#0A1628] text-white" : "text-gray-600"}`}
                      >
                        {day}
                      </span>
                      {dayEvents.length > 0 && (
                        <span className="text-[10px] text-gray-400 font-medium">{dayEvents.length}</span>
                      )}
                    </div>
                    <div className="space-y-0.5">
                      {dayEvents.slice(0, 3).map((ev) => {
                        const cfg = eventTypeConfig[ev.eventType] || eventTypeConfig.diger;
                        return (
                          <button
                            key={ev.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEvent(ev);
                            }}
                            className={`w-full text-left px-1.5 py-0.5 rounded text-[11px] font-medium truncate
                              border-l-2 ${cfg.borderColor} ${cfg.bgColor} ${cfg.color} hover:opacity-80 transition-opacity`}
                          >
                            {ev.title}
                          </button>
                        );
                      })}
                      {dayEvents.length > 3 && (
                        <p className="text-[10px] text-gray-400 pl-1.5">+{dayEvents.length - 3} daha</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Detail Panel */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-xs font-semibold ${(eventTypeConfig[selectedEvent.eventType] || eventTypeConfig.diger).color}`}>
                  {(eventTypeConfig[selectedEvent.eventType] || eventTypeConfig.diger).label}
                </p>
                <h3 className="text-lg font-bold text-gray-900 mt-1">{selectedEvent.title}</h3>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            {selectedEvent.description && (
              <p className="text-sm text-gray-600">{selectedEvent.description}</p>
            )}
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {new Date(selectedEvent.startDate).toLocaleString("tr-TR", {
                    day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
                  })}
                </span>
              </div>
              {selectedEvent.clientFirstName && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{selectedEvent.clientFirstName} {selectedEvent.clientLastName}</span>
                </div>
              )}
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => handleDelete(selectedEvent.id)}
                disabled={deletingId === selectedEvent.id}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                  text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                {deletingId === selectedEvent.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Sil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Event Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">Yeni Etkinlik</h3>
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
                  placeholder="Etkinlik başlığı"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Açıklama</label>
                <textarea
                  name="description"
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 resize-none
                    focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                  placeholder="Etkinlik açıklaması (isteğe bağlı)"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Başlangıç <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    required
                    defaultValue={selectedDate || ""}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                      focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Bitiş</label>
                  <input
                    type="datetime-local"
                    name="endDate"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                      focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Etkinlik Türü <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="eventType"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                      focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                  >
                    <option value="toplanti">Toplantı</option>
                    <option value="mahkeme">Mahkeme</option>
                    <option value="odeme">Ödeme</option>
                    <option value="kisisel">Kişisel</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Tüm Gün</label>
                  <div className="flex items-center h-[42px]">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="isAllDay" value="true" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer 
                        peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
                        after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
                        after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                        peer-checked:bg-[#0A1628]" />
                    </label>
                  </div>
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

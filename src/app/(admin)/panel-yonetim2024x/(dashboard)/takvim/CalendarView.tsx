"use client";

import { useState, useActionState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Gavel,
  DollarSign,
  Users,
  Star,
  MoreHorizontal,
  Clock,
  Trash2,
  Loader2,
} from "lucide-react";
import { createCalendarEvent, deleteCalendarEvent, type CalendarActionState, type CalendarEvent } from "./actions";

const eventTypeConfig: Record<
  string,
  { label: string; color: string; bgColor: string; borderColor: string; icon: typeof Gavel }
> = {
  toplanti: {
    label: "Зустріч",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-l-blue-500",
    icon: Users,
  },
  mahkeme: {
    label: "Суд",
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-l-red-500",
    icon: Gavel,
  },
  odeme: {
    label: "Оплата",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-l-amber-500",
    icon: DollarSign,
  },
  kisisel: {
    label: "Особисте",
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-l-purple-500",
    icon: Star,
  },
  diger: {
    label: "Інше",
    color: "text-gray-700",
    bgColor: "bg-gray-50",
    borderColor: "border-l-gray-400",
    icon: MoreHorizontal,
  },
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const MONTHS_TR = [
  "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
  "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень",
];

const DAYS_TR = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
const DAYS_FULL_TR = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота", "Неділя"];

const HOURS = Array.from({ length: 17 }, (_, i) => i + 6); // 06:00 - 22:00

type ViewMode = "month" | "week";

export default function CalendarView({
  initialEvents,
}: {
  initialEvents: CalendarEvent[];
}) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [weekStart, setWeekStart] = useState(() => getWeekStart(today));
  const [viewMode, setViewMode] = useState<ViewMode>("month");
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
      window.location.reload();
    }
  }, [formState]);

  // ================== Navigation ==================

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

  const prevWeek = () => {
    setWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  };

  const nextWeek = () => {
    setWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  };

  const goToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setWeekStart(getWeekStart(today));
  };

  const openNewEvent = (dateStr?: string) => {
    setSelectedEvent(null);
    setSelectedDate(dateStr || new Date().toISOString().slice(0, 16));
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!id.startsWith("rem-") && !id.startsWith("court-")) {
      setDeletingId(id);
      const result = await deleteCalendarEvent(id);
      if (result?.success) {
        setEvents((prev) => prev.filter((e) => e.id !== id));
        setSelectedEvent(null);
      }
      setDeletingId(null);
    } else {
      setSelectedEvent(null);
    }
  };

  // ================== Month view helpers ==================

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);
  while (calendarDays.length % 7 !== 0) calendarDays.push(null);

  const eventsByDate: Record<string, CalendarEvent[]> = {};
  events.forEach((ev) => {
    const d = new Date(ev.startDate);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (!eventsByDate[key]) eventsByDate[key] = [];
    eventsByDate[key].push(ev);
  });

  const isTodayDate = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  // ================== Week view helpers ==================

  const weekDays: Date[] = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const weekLabel = (() => {
    const start = weekDays[0];
    const end = weekDays[6];
    if (start.getMonth() === end.getMonth()) {
      return `${start.getDate()} - ${end.getDate()} ${MONTHS_TR[start.getMonth()]} ${start.getFullYear()}`;
    }
    return `${start.getDate()} ${MONTHS_TR[start.getMonth()]} - ${end.getDate()} ${MONTHS_TR[end.getMonth()]} ${end.getFullYear()}`;
  })();

  function getWeekDayEvents(date: Date) {
    return events.filter((ev) => isSameDay(new Date(ev.startDate), date));
  }

  function formatTime(ev: CalendarEvent): string {
    return new Date(ev.startDate).toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
  }

  // ================== Render ==================

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={viewMode === "month" ? prevMonth : prevWeek}
              className="p-2 rounded-xl hover:bg-white border border-transparent hover:border-gray-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={viewMode === "month" ? nextMonth : nextWeek}
              className="p-2 rounded-xl hover:bg-white border border-transparent hover:border-gray-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <h2 className="text-lg font-bold text-gray-800">
            {viewMode === "month" ? `${MONTHS_TR[currentMonth]} ${currentYear}` : weekLabel}
          </h2>
          <button
            onClick={goToday}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-gray-200
              text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Сьогодні
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* View mode toggle */}
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setViewMode("month")}
              className={`px-3 py-1.5 text-xs font-semibold transition-colors
                ${viewMode === "month" ? "bg-[#0A1628] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              Місяць
            </button>
            <button
              onClick={() => {
                setViewMode("week");
                // Sync week start to current month context
                setWeekStart(getWeekStart(new Date(currentYear, currentMonth, today.getMonth() === currentMonth && today.getFullYear() === currentYear ? today.getDate() : 1)));
              }}
              className={`px-3 py-1.5 text-xs font-semibold transition-colors
                ${viewMode === "week" ? "bg-[#0A1628] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              Тиждень
            </button>
          </div>

          {/* Legend (desktop) */}
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
            Нова подія
          </button>
        </div>
      </div>

      {/* ==================== MONTH VIEW ==================== */}
      {viewMode === "month" && (
        <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden">
          <div className="grid grid-cols-7 border-b border-gray-100">
            {DAYS_TR.map((d) => (
              <div key={d} className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {d}
              </div>
            ))}
          </div>

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
                    ${i % 7 === 6 ? "border-r-0" : ""}`}
                >
                  {day && (
                    <>
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 text-xs font-semibold rounded-full
                            ${isTodayDate(day) ? "bg-[#0A1628] text-white" : "text-gray-600"}`}
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
                          <p className="text-[10px] text-gray-400 pl-1.5">+{dayEvents.length - 3} ще</p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================== WEEK VIEW ==================== */}
      {viewMode === "week" && (
        <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden">
          {/* Day column headers */}
          <div className="grid grid-cols-[56px_repeat(7,1fr)] border-b border-gray-100">
            <div className="py-3 border-r border-gray-100" />
            {weekDays.map((d, i) => {
              const isCurrentDay = isSameDay(d, today);
              return (
                <div
                  key={i}
                  className={`py-2.5 text-center border-r border-gray-100 last:border-r-0
                    ${isCurrentDay ? "bg-blue-50/50" : ""}`}
                >
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                    {DAYS_FULL_TR[i]}
                  </p>
                  <p className={`text-lg font-bold mt-0.5 ${isCurrentDay ? "text-[#0A1628]" : "text-gray-700"}`}>
                    {d.getDate()}
                  </p>
                </div>
              );
            })}
          </div>

          {/* All-day events row */}
          {(() => {
            const hasAllDay = weekDays.some((d) =>
              getWeekDayEvents(d).some((ev) => ev.isAllDay)
            );
            if (!hasAllDay) return null;
            return (
              <div className="grid grid-cols-[56px_repeat(7,1fr)] border-b border-gray-200 bg-gray-50/30">
                <div className="px-1 py-2 border-r border-gray-100 flex items-start justify-end">
                  <span className="text-[9px] text-gray-400 font-medium leading-tight text-right">Весь<br />день</span>
                </div>
                {weekDays.map((d, i) => {
                  const allDayEvs = getWeekDayEvents(d).filter((ev) => ev.isAllDay);
                  const isCurrentDay = isSameDay(d, today);
                  return (
                    <div
                      key={i}
                      className={`p-1 border-r border-gray-100 last:border-r-0 min-h-[32px] space-y-0.5
                        ${isCurrentDay ? "bg-blue-50/30" : ""}`}
                    >
                      {allDayEvs.map((ev) => {
                        const cfg = eventTypeConfig[ev.eventType] || eventTypeConfig.diger;
                        return (
                          <button
                            key={ev.id}
                            onClick={() => setSelectedEvent(ev)}
                            className={`w-full text-left px-1.5 py-0.5 rounded text-[10px] font-medium truncate
                              border-l-2 ${cfg.borderColor} ${cfg.bgColor} ${cfg.color} hover:opacity-80`}
                          >
                            {ev.title}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {/* Hourly time grid */}
          <div className="overflow-y-auto max-h-[640px]">
            {HOURS.map((hour) => (
              <div key={hour} className="grid grid-cols-[56px_repeat(7,1fr)] border-b border-gray-50 min-h-[52px]">
                {/* Time label */}
                <div className="px-1.5 py-0.5 border-r border-gray-100 flex items-start justify-end">
                  <span className="text-[10px] text-gray-400 font-medium -mt-1.5 tabular-nums">
                    {String(hour).padStart(2, "0")}:00
                  </span>
                </div>
                {/* Day columns */}
                {weekDays.map((d, i) => {
                  const hourEvs = getWeekDayEvents(d).filter(
                    (ev) => !ev.isAllDay && new Date(ev.startDate).getHours() === hour
                  );
                  const isCurrentDay = isSameDay(d, today);
                  const isCurrentHour = isCurrentDay && today.getHours() === hour;
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}T${String(hour).padStart(2, "0")}:00`;
                        openNewEvent(dateStr);
                      }}
                      className={`p-0.5 border-r border-gray-50 last:border-r-0 cursor-pointer
                        hover:bg-gray-50/80 transition-colors relative
                        ${isCurrentDay ? "bg-blue-50/20" : ""}
                        ${isCurrentHour ? "bg-blue-100/30" : ""}`}
                    >
                      {/* Current time indicator */}
                      {isCurrentHour && (
                        <div
                          className="absolute left-0 right-0 h-0.5 bg-red-400 z-10 pointer-events-none"
                          style={{ top: `${Math.round((today.getMinutes() / 60) * 100)}%` }}
                        >
                          <div className="w-2 h-2 rounded-full bg-red-400 -mt-[3px] -ml-1" />
                        </div>
                      )}
                      {hourEvs.map((ev) => {
                        const cfg = eventTypeConfig[ev.eventType] || eventTypeConfig.diger;
                        return (
                          <button
                            key={ev.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEvent(ev);
                            }}
                            className={`w-full text-left px-1.5 py-1 rounded text-[10px] font-medium
                              border-l-2 ${cfg.borderColor} ${cfg.bgColor} ${cfg.color} hover:opacity-80 mb-0.5`}
                          >
                            <span className="font-semibold tabular-nums">{formatTime(ev)}</span>{" "}
                            <span className="truncate">{ev.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== EVENT DETAIL MODAL ==================== */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-xs font-semibold ${(eventTypeConfig[selectedEvent.eventType] || eventTypeConfig.diger).color}`}>
                  {(eventTypeConfig[selectedEvent.eventType] || eventTypeConfig.diger).label}
                  {selectedEvent.source === "reminder" && (
                    <span className="ml-1.5 text-gray-400 font-normal">· Нагадування</span>
                  )}
                  {selectedEvent.source === "courtDate" && (
                    <span className="ml-1.5 text-gray-400 font-normal">· Судова справа</span>
                  )}
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
                  {selectedEvent.isAllDay
                    ? new Date(selectedEvent.startDate).toLocaleDateString("uk-UA", {
                        day: "numeric", month: "long", year: "numeric",
                      }) + " · Весь день"
                    : new Date(selectedEvent.startDate).toLocaleString("uk-UA", {
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
              {selectedEvent.source === "calendar" ? (
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
                  Видалити
                </button>
              ) : (
                <p className="text-xs text-gray-400 italic">
                  Можна керувати зі сторінки {selectedEvent.source === "reminder" ? "Нагадування" : "Клієнт"}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================== NEW EVENT MODAL ==================== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">Нова подія</h3>
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
                  Назва <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                    focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                  placeholder="Назва події"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Опис</label>
                <textarea
                  name="description"
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 resize-none
                    focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                  placeholder="Опис події (необов'язково)"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Початок <span className="text-red-400">*</span>
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
                  <label className="block text-xs font-medium text-gray-600 mb-1">Кінець</label>
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
                    Тип події <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="eventType"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                      focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                  >
                    <option value="toplanti">Зустріч</option>
                    <option value="mahkeme">Суд</option>
                    <option value="odeme">Оплата</option>
                    <option value="kisisel">Особисте</option>
                    <option value="diger">Інше</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Весь день</label>
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
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                    bg-[#0A1628] hover:bg-[#1B2A4A] text-white transition-colors disabled:opacity-50"
                >
                  {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Додати
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

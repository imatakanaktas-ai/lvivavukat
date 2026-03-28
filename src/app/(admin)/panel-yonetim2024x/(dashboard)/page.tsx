import {
  Users,
  CalendarDays,
  MessageSquare,
  FileText,
  TrendingUp,
  Clock,
  DollarSign,
  PenTool,
  Bell,
  ArrowUpRight,
  Gavel,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import {
  clients,
  payments,
  reminders,
  calendarEvents,
  contactSubmissions,
  courtDates,
} from "@/lib/db/schema";
import { count, eq, gte, and, asc, desc, sql } from "drizzle-orm";

const ADMIN_PREFIX = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

async function getDashboardData() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [
    [totalClients],
    [newClientsThisMonth],
    [totalContactForms],
    [unreadContactForms],
    monthlyPaidPayments,
    [pendingPaymentsCount],
    activeReminders,
    upcomingEvents,
    upcomingCourtDates,
    recentContacts,
    recentClients,
    recentPayments,
  ] = await Promise.all([
    db.select({ count: count() }).from(clients),
    db.select({ count: count() }).from(clients).where(gte(clients.createdAt, startOfMonth)),
    db.select({ count: count() }).from(contactSubmissions),
    db.select({ count: count() }).from(contactSubmissions).where(eq(contactSubmissions.isRead, false)),
    db
      .select({ amount: payments.amount, currency: payments.currency })
      .from(payments)
      .where(and(eq(payments.status, "paid"), gte(payments.createdAt, startOfMonth))),
    db.select({ count: count() }).from(payments).where(eq(payments.status, "pending")),
    db
      .select({
        id: reminders.id,
        title: reminders.title,
        dueDate: reminders.dueDate,
        type: reminders.type,
        clientId: reminders.clientId,
        clientFirstName: clients.firstName,
        clientLastName: clients.lastName,
      })
      .from(reminders)
      .leftJoin(clients, eq(reminders.clientId, clients.id))
      .where(eq(reminders.isCompleted, false))
      .orderBy(asc(reminders.dueDate))
      .limit(5),
    db
      .select({
        id: calendarEvents.id,
        title: calendarEvents.title,
        startDate: calendarEvents.startDate,
        eventType: calendarEvents.eventType,
        color: calendarEvents.color,
      })
      .from(calendarEvents)
      .where(gte(calendarEvents.startDate, today))
      .orderBy(asc(calendarEvents.startDate))
      .limit(5),
    db
      .select({
        id: courtDates.id,
        courtName: courtDates.courtName,
        hearingDate: courtDates.hearingDate,
        hearingTime: courtDates.hearingTime,
        clientFirstName: clients.firstName,
        clientLastName: clients.lastName,
      })
      .from(courtDates)
      .leftJoin(clients, eq(courtDates.clientId, clients.id))
      .where(and(gte(courtDates.hearingDate, today.toISOString().split("T")[0]), eq(courtDates.status, "scheduled")))
      .orderBy(asc(courtDates.hearingDate))
      .limit(5),
    db
      .select({
        id: contactSubmissions.id,
        name: contactSubmissions.name,
        subject: contactSubmissions.subject,
        isRead: contactSubmissions.isRead,
        createdAt: contactSubmissions.createdAt,
      })
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt))
      .limit(5),
    db
      .select({
        id: clients.id,
        firstName: clients.firstName,
        lastName: clients.lastName,
        status: clients.status,
        createdAt: clients.createdAt,
      })
      .from(clients)
      .orderBy(desc(clients.createdAt))
      .limit(5),
    db
      .select({
        id: payments.id,
        title: payments.title,
        amount: payments.amount,
        currency: payments.currency,
        status: payments.status,
        createdAt: payments.createdAt,
        clientFirstName: clients.firstName,
        clientLastName: clients.lastName,
      })
      .from(payments)
      .leftJoin(clients, eq(payments.clientId, clients.id))
      .orderBy(desc(payments.createdAt))
      .limit(5),
  ]);

  // Calculate monthly revenue in UAH
  const monthlyRevenue = monthlyPaidPayments.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  return {
    totalClients: totalClients?.count || 0,
    newClientsThisMonth: newClientsThisMonth?.count || 0,
    totalContactForms: totalContactForms?.count || 0,
    unreadContactForms: unreadContactForms?.count || 0,
    monthlyRevenue,
    pendingPayments: pendingPaymentsCount?.count || 0,
    activeReminders,
    upcomingEvents,
    upcomingCourtDates,
    recentContacts,
    recentClients,
    recentPayments,
  };
}

const quickActions = [
  { label: "Новий клієнт", href: `/${ADMIN_PREFIX}/muvekiller/yeni`, icon: Users },
  { label: "Блог стаття", href: `/${ADMIN_PREFIX}/blog/yeni`, icon: PenTool },
  { label: "Календар", href: `/${ADMIN_PREFIX}/takvim`, icon: CalendarDays },
  { label: "AI Асистент", href: `/${ADMIN_PREFIX}/ai-asistan`, icon: TrendingUp },
];

const eventTypeColors: Record<string, string> = {
  toplanti: "bg-blue-50 text-blue-600",
  mahkeme: "bg-red-50 text-red-600",
  odeme: "bg-amber-50 text-amber-600",
  kisisel: "bg-purple-50 text-purple-600",
  diger: "bg-gray-100 text-gray-600",
};

const reminderTypeConfig: Record<string, { label: string; color: string }> = {
  mahkeme: { label: "Суд", color: "bg-red-50 text-red-700" },
  odeme: { label: "Оплата", color: "bg-amber-50 text-amber-700" },
  devlet_islemi: { label: "Державна", color: "bg-blue-50 text-blue-700" },
  vergi: { label: "Податок", color: "bg-emerald-50 text-emerald-700" },
  deadline: { label: "Дедлайн", color: "bg-orange-50 text-orange-700" },
  ozel: { label: "Особисте", color: "bg-purple-50 text-purple-700" },
};

export default async function AdminDashboardPage() {
  let data: Awaited<ReturnType<typeof getDashboardData>> | null = null;
  try {
    data = await getDashboardData();
  } catch {
    // DB not connected
  }

  const stats = [
    {
      label: "Всього клієнтів",
      value: String(data?.totalClients ?? 0),
      change: `+${data?.newClientsThisMonth ?? 0} цей місяць`,
      icon: Users,
      color: "bg-blue-500/10 text-blue-600",
      href: `/${ADMIN_PREFIX}/muvekiller`,
    },
    {
      label: "Очікує оплату",
      value: String(data?.pendingPayments ?? 0),
      change: "очікують операції",
      icon: FileText,
      color: "bg-emerald-500/10 text-emerald-600",
      href: `/${ADMIN_PREFIX}/hatirlatmalar`,
    },
    {
      label: "Дохід за місяць",
      value: `₴${(data?.monthlyRevenue ?? 0).toLocaleString("uk-UA")}`,
      change: "оплачено загалом",
      icon: DollarSign,
      color: "bg-amber-500/10 text-amber-600",
      href: `/${ADMIN_PREFIX}/hatirlatmalar`,
    },
    {
      label: "Контактні форми",
      value: String(data?.totalContactForms ?? 0),
      change: `${data?.unreadContactForms ?? 0} непрочитаних`,
      icon: MessageSquare,
      color: "bg-purple-500/10 text-purple-600",
      href: `/${ADMIN_PREFIX}/iletisim`,
    },
  ];

  const now = new Date();

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">Огляд</h1>
        <p className="text-sm text-gray-500 mt-1">
          Ласкаво просимо! Ось загальний стан вашого офісу.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group p-5 rounded-2xl bg-white border border-gray-200/80 
                hover:border-gray-300 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-xs text-gray-400 mt-1">{card.label}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{card.change}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick actions + Upcoming events + Reminders */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Hızlı İşlemler</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 
                    hover:bg-[#0A1628] hover:text-white text-gray-600 transition-all duration-300 group"
                >
                  <Icon className="w-5 h-5 group-hover:text-[#C9A84C] transition-colors" />
                  <span className="text-xs font-medium text-center">{action.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Upcoming events + court dates */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Ближчі події</h2>
            <Link href={`/${ADMIN_PREFIX}/takvim`} className="text-xs text-[#C9A84C] hover:underline">
              Переглянути всі
            </Link>
          </div>
          {(data?.upcomingEvents?.length || 0) + (data?.upcomingCourtDates?.length || 0) === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CalendarDays className="w-10 h-10 text-gray-200 mb-3" />
              <p className="text-sm text-gray-400">Поки немає ближчих подій</p>
              <p className="text-xs text-gray-300 mt-1">Додайте нову подію з календаря</p>
            </div>
          ) : (
            <div className="space-y-2">
              {data?.upcomingCourtDates?.map((c) => (
                <div key={`court-${c.id}`} className="flex items-center gap-3 p-2.5 rounded-xl bg-red-50/50">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                    <Gavel className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{c.courtName}</p>
                    <p className="text-[10px] text-gray-400">
                      {new Date(c.hearingDate).toLocaleDateString("uk-UA", { day: "numeric", month: "short" })}
                      {c.hearingTime && ` · ${c.hearingTime}`}
                      {c.clientFirstName && ` · ${c.clientFirstName} ${c.clientLastName}`}
                    </p>
                  </div>
                </div>
              ))}
              {data?.upcomingEvents?.map((e) => {
                const colorCls = eventTypeColors[e.eventType] || eventTypeColors.diger;
                return (
                  <div key={`evt-${e.id}`} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colorCls}`}>
                      <CalendarDays className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">{e.title}</p>
                      <p className="text-[10px] text-gray-400">
                        {new Date(e.startDate).toLocaleDateString("uk-UA", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Reminders */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Нагадування</h2>
            <Link href={`/${ADMIN_PREFIX}/hatirlatmalar`} className="text-xs text-[#C9A84C] hover:underline">
              Переглянути всі
            </Link>
          </div>
          {!data?.activeReminders?.length ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="w-10 h-10 text-gray-200 mb-3" />
              <p className="text-sm text-gray-400">Немає активних нагадувань</p>
              <p className="text-xs text-gray-300 mt-1">Натисніть, щоб додати нагадування</p>
            </div>
          ) : (
            <div className="space-y-2">
              {data.activeReminders.map((r) => {
                const isOverdue = new Date(r.dueDate) < now;
                const cfg = reminderTypeConfig[r.type] || reminderTypeConfig.ozel;
                return (
                  <div
                    key={r.id}
                    className={`p-2.5 rounded-xl ${isOverdue ? "bg-red-50/60 border border-red-100" : "bg-gray-50"}`}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${cfg.color}`}>{cfg.label}</span>
                      {isOverdue && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-100 text-red-700">Прострочено</span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-gray-800 truncate">{r.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {new Date(r.dueDate).toLocaleDateString("uk-UA", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      {r.clientFirstName && ` · ${r.clientFirstName} ${r.clientLastName}`}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent contacts + Recent activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent contact submissions */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Останні контактні форми</h2>
            <Link href={`/${ADMIN_PREFIX}/iletisim`} className="text-xs text-[#C9A84C] hover:underline">
              Переглянути всі
            </Link>
          </div>
          {!data?.recentContacts?.length ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <MessageSquare className="w-10 h-10 text-gray-200 mb-3" />
              <p className="text-sm text-gray-400">Поки не надійшло контактних форм</p>
              <p className="text-xs text-gray-300 mt-1">Нові форми з'являться тут</p>
            </div>
          ) : (
            <div className="space-y-2">
              {data.recentContacts.map((c) => (
                <Link
                  key={c.id}
                  href={`/${ADMIN_PREFIX}/iletisim`}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${c.isRead ? "bg-gray-300" : "bg-blue-500"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{c.name} — {c.subject}</p>
                    <p className="text-[10px] text-gray-400">
                      {new Date(c.createdAt).toLocaleDateString("uk-UA", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent activity */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Останні операції</h2>
          </div>
          {(data?.recentClients?.length || 0) + (data?.recentPayments?.length || 0) === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Clock className="w-10 h-10 text-gray-200 mb-3" />
              <p className="text-sm text-gray-400">Поки немає записів операцій</p>
              <p className="text-xs text-gray-300 mt-1">Операції з клієнтами та справами будуть тут</p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Merge and sort by createdAt */}
              {[
                ...(data?.recentClients?.map((c) => ({
                  id: c.id,
                  type: "client" as const,
                  text: `${c.firstName} ${c.lastName}`,
                  sub: c.status === "active" ? "Новий клієнт додано" : "Клієнта оновлено",
                  date: new Date(c.createdAt),
                  icon: Users,
                  color: "bg-blue-50 text-blue-600",
                })) || []),
                ...(data?.recentPayments?.map((p) => ({
                  id: p.id,
                  type: "payment" as const,
                  text: `${p.title} — ${Number(p.amount).toLocaleString("uk-UA")} ${p.currency}`,
                  sub: p.clientFirstName
                    ? `${p.clientFirstName} ${p.clientLastName} · ${p.status === "paid" ? "Оплачено" : p.status === "pending" ? "Очікує" : p.status}`
                    : p.status === "paid" ? "Оплачено" : "Очікує",
                  date: new Date(p.createdAt),
                  icon: DollarSign,
                  color: p.status === "paid" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600",
                })) || []),
              ]
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .slice(0, 8)
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={`${item.type}-${item.id}`} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 truncate">{item.text}</p>
                        <p className="text-[10px] text-gray-400">
                          {item.sub} · {item.date.toLocaleDateString("uk-UA", { day: "numeric", month: "short" })}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import {
  Users,
  Plus,
  Search,
  Phone,
  Mail,
  MoreHorizontal,
  UserCheck,
  UserX,
  Clock,
} from "lucide-react";
import { getClients } from "./actions";

const ADMIN_PREFIX = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

const statusConfig: Record<string, { label: string; color: string; icon: typeof UserCheck }> = {
  active: { label: "Активний", color: "bg-emerald-100 text-emerald-700", icon: UserCheck },
  inactive: { label: "Неактивний", color: "bg-gray-100 text-gray-600", icon: UserX },
  pending: { label: "Очікує", color: "bg-amber-100 text-amber-700", icon: Clock },
};

export default async function ClientsListPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string; page?: string }>;
}) {
  const params = await searchParams;
  let data;
  try {
    data = await getClients({
      search: params.search,
      status: params.status,
      page: params.page ? parseInt(params.page) : 1,
    });
  } catch {
    // DB not connected yet — show empty state
    data = { clients: [], total: 0, page: 1, totalPages: 0 };
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Клієнти</h1>
          <p className="text-sm text-gray-500 mt-1">
            Всього {data.total} клієнтів зареєстровано
          </p>
        </div>
        <Link
          href={`/${ADMIN_PREFIX}/muvekiller/yeni`}
          className="inline-flex items-center gap-2 bg-[#0A1628] hover:bg-[#1B2A4A] text-white 
            px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Новий клієнт
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form className="flex-1 relative" action={`/${ADMIN_PREFIX}/muvekiller`}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            name="search"
            defaultValue={params.search}
            placeholder="Ім'я, ел. пошта або телефон..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm 
              text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
          />
          {params.status && <input type="hidden" name="status" value={params.status} />}
        </form>
        <div className="flex gap-2">
          {["all", "active", "pending", "inactive"].map((s) => (
            <Link
              key={s}
              href={`/${ADMIN_PREFIX}/muvekiller?status=${s}${params.search ? `&search=${params.search}` : ""}`}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors
                ${(params.status || "all") === s
                  ? "bg-[#0A1628] text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
            >
              {s === "all" ? "Всі" : s === "active" ? "Активні" : s === "pending" ? "Очікують" : "Неактивні"}
            </Link>
          ))}
        </div>
      </div>

      {/* Table / Cards */}
      {data.clients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-200/80">
          <Users className="w-12 h-12 text-gray-200 mb-4" />
          <p className="text-gray-500 font-medium">Клієнтів поки немає</p>
          <p className="text-sm text-gray-400 mt-1">
            {params.search ? "Не знайдено результатів за вашим запитом." : "Почніть з додавання нового клієнта."}
          </p>
          <Link
            href={`/${ADMIN_PREFIX}/muvekiller/yeni`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#C9A84C] hover:underline"
          >
            <Plus className="w-4 h-4" />
            Додати нового клієнта
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-2xl border border-gray-200/80 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Клієнт</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Контакти</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Статус</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Дата реєстрації</th>
                  <th className="text-right text-xs font-semibold text-gray-500 px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {data.clients.map((client) => {
                  const st = statusConfig[client.status] || statusConfig.active;
                  const StatusIcon = st.icon;
                  return (
                    <tr key={client.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <Link href={`/${ADMIN_PREFIX}/muvekiller/${client.id}`} className="group">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0A1628] to-[#1B2A4A] 
                              flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {client.firstName[0]}{client.lastName[0]}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-800 group-hover:text-[#0A1628]">
                                {client.firstName} {client.lastName}
                              </p>
                              {client.nationality && (
                                <p className="text-[11px] text-gray-400">{client.nationality}</p>
                              )}
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          {client.phone && (
                            <p className="flex items-center gap-1.5 text-xs text-gray-500">
                              <Phone className="w-3 h-3" />{client.phone}
                            </p>
                          )}
                          {client.email && (
                            <p className="flex items-center gap-1.5 text-xs text-gray-500">
                              <Mail className="w-3 h-3" />{client.email}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${st.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {st.label}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-xs text-gray-400">
                          {new Date(client.createdAt).toLocaleDateString("uk-UA")}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/${ADMIN_PREFIX}/muvekiller/${client.id}`}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg 
                            text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {data.clients.map((client) => {
              const st = statusConfig[client.status] || statusConfig.active;
              const StatusIcon = st.icon;
              return (
                <Link
                  key={client.id}
                  href={`/${ADMIN_PREFIX}/muvekiller/${client.id}`}
                  className="block p-4 rounded-2xl bg-white border border-gray-200/80 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0A1628] to-[#1B2A4A] 
                        flex items-center justify-center text-white text-sm font-bold">
                        {client.firstName[0]}{client.lastName[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {client.firstName} {client.lastName}
                        </p>
                        <p className="text-[11px] text-gray-400">{client.nationality}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium ${st.color}`}>
                      <StatusIcon className="w-2.5 h-2.5" />
                      {st.label}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs text-gray-500">
                    {client.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />{client.phone}
                      </span>
                    )}
                    {client.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />{client.email}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Pagination */}
          {data.totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/${ADMIN_PREFIX}/muvekiller?page=${p}${params.status ? `&status=${params.status}` : ""}${params.search ? `&search=${params.search}` : ""}`}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
                    ${p === data.page
                      ? "bg-[#0A1628] text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

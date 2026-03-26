import {
  Users,
  CalendarDays,
  MessageSquare,
  FileText,
  TrendingUp,
  Clock,
  AlertCircle,
  DollarSign,
  PenTool,
  Bell,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const ADMIN_PREFIX = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

const statCards = [
  {
    label: "Toplam Müvekkil",
    value: "0",
    change: "+0 bu ay",
    icon: Users,
    color: "bg-blue-500/10 text-blue-600",
    href: `/${ADMIN_PREFIX}/muvekiller`,
  },
  {
    label: "Aktif Dosyalar",
    value: "0",
    change: "0 bekleyen",
    icon: FileText,
    color: "bg-emerald-500/10 text-emerald-600",
    href: `/${ADMIN_PREFIX}/muvekiller`,
  },
  {
    label: "Bu Ay Gelir",
    value: "₴0",
    change: "+0% önceki ay",
    icon: DollarSign,
    color: "bg-amber-500/10 text-amber-600",
    href: `/${ADMIN_PREFIX}/muvekiller`,
  },
  {
    label: "İletişim Formları",
    value: "0",
    change: "0 okunmamış",
    icon: MessageSquare,
    color: "bg-purple-500/10 text-purple-600",
    href: `/${ADMIN_PREFIX}/iletisim`,
  },
];

const quickActions = [
  { label: "Yeni Müvekkil", href: `/${ADMIN_PREFIX}/muvekiller/yeni`, icon: Users },
  { label: "Blog Yazısı", href: `/${ADMIN_PREFIX}/blog/yeni`, icon: PenTool },
  { label: "Takvim", href: `/${ADMIN_PREFIX}/takvim`, icon: CalendarDays },
  { label: "AI Asistan", href: `/${ADMIN_PREFIX}/ai-asistan`, icon: TrendingUp },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Hoş geldiniz! İşte ofisinizin genel durumu.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => {
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

      {/* Quick actions + Recent activity */}
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

        {/* Upcoming events */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Yaklaşan Etkinlikler</h2>
            <Link href={`/${ADMIN_PREFIX}/takvim`} className="text-xs text-[#C9A84C] hover:underline">
              Tümünü Gör
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CalendarDays className="w-10 h-10 text-gray-200 mb-3" />
            <p className="text-sm text-gray-400">Henüz yaklaşan etkinlik yok</p>
            <p className="text-xs text-gray-300 mt-1">Takvimden yeni etkinlik ekleyin</p>
          </div>
        </div>

        {/* Reminders */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Hatırlatmalar</h2>
            <Link href={`/${ADMIN_PREFIX}/hatirlatmalar`} className="text-xs text-[#C9A84C] hover:underline">
              Tümünü Gör
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Bell className="w-10 h-10 text-gray-200 mb-3" />
            <p className="text-sm text-gray-400">Aktif hatırlatma yok</p>
            <p className="text-xs text-gray-300 mt-1">Hatırlatma eklemek için tıklayın</p>
          </div>
        </div>
      </div>

      {/* Recent contacts + Recent clients */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent contact submissions */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Son İletişim Formları</h2>
            <Link href={`/${ADMIN_PREFIX}/iletisim`} className="text-xs text-[#C9A84C] hover:underline">
              Tümünü Gör
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <MessageSquare className="w-10 h-10 text-gray-200 mb-3" />
            <p className="text-sm text-gray-400">Henüz iletişim formu gelmedi</p>
            <p className="text-xs text-gray-300 mt-1">Yeni formlar burada görünecek</p>
          </div>
        </div>

        {/* Activity log */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Son İşlemler</h2>
          </div>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Clock className="w-10 h-10 text-gray-200 mb-3" />
            <p className="text-sm text-gray-400">Henüz işlem kaydı yok</p>
            <p className="text-xs text-gray-300 mt-1">Müvekkil ve dosya işlemleri burada listenecek</p>
          </div>
        </div>
      </div>

      {/* System status */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/60 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-800">Veritabanı bağlantısı bekliyor</p>
          <p className="text-xs text-amber-600 mt-0.5">
            Dashboard verileri veritabanı bağlantısı sağlandıktan sonra otomatik güncellenecektir. 
            Şu anda statik veri gösterilmektedir.
          </p>
        </div>
      </div>
    </div>
  );
}

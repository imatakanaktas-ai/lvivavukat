import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Phone,
  Mail,
  Globe,
  FileText,
  MapPin,
  CalendarDays,
  DollarSign,
  Bell,
  Gavel,
  StickyNote,
  UserCheck,
  UserX,
  Clock,
  Trash2,
} from "lucide-react";
import { getClientWithRelations } from "../actions";
import ClientNotesSection from "./ClientNotesSection";
import DeleteClientButton from "./DeleteClientButton";

const ADMIN_PREFIX = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

const statusConfig: Record<string, { label: string; color: string; icon: typeof UserCheck }> = {
  active: { label: "Aktif", color: "bg-emerald-100 text-emerald-700", icon: UserCheck },
  inactive: { label: "Pasif", color: "bg-gray-100 text-gray-600", icon: UserX },
  pending: { label: "Bekliyor", color: "bg-amber-100 text-amber-700", icon: Clock },
};

const paymentStatusColors: Record<string, string> = {
  paid: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  overdue: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-500",
};

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let client;
  try {
    client = await getClientWithRelations(id);
  } catch {
    client = null;
  }

  if (!client) notFound();

  const st = statusConfig[client.status] || statusConfig.active;
  const StatusIcon = st.icon;

  return (
    <div className="max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href={`/${ADMIN_PREFIX}/muvekiller`}
            className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center 
              text-gray-500 hover:text-gray-800 hover:border-gray-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A1628] to-[#1B2A4A] 
              flex items-center justify-center text-white text-base font-bold">
              {client.firstName[0]}{client.lastName[0]}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
                {client.firstName} {client.lastName}
              </h1>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium ${st.color}`}>
                <StatusIcon className="w-2.5 h-2.5" />
                {st.label}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/${ADMIN_PREFIX}/muvekiller/${client.id}/duzenle`}
            className="inline-flex items-center gap-2 bg-[#0A1628] hover:bg-[#1B2A4A] text-white 
              px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            <Edit className="w-4 h-4" />
            Düzenle
          </Link>
          <DeleteClientButton clientId={client.id} clientName={`${client.firstName} ${client.lastName}`} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Info card */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Kişisel Bilgiler</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Globe, label: "Uyruk", value: client.nationality },
                { icon: FileText, label: "Pasaport No", value: client.passportNo },
                { icon: Phone, label: "Telefon", value: client.phone },
                { icon: Mail, label: "E-posta", value: client.email },
                { icon: MapPin, label: "Adres", value: client.address },
                { icon: CalendarDays, label: "Kayıt Tarihi", value: new Date(client.createdAt).toLocaleDateString("tr-TR") },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400">{item.label}</p>
                      <p className="text-sm text-gray-800 font-medium">{item.value || "—"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {client.notes && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-[11px] text-gray-400 mb-1">Genel Notlar</p>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{client.notes}</p>
              </div>
            )}
          </div>

          {/* Payments */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                Ödemeler
              </h2>
            </div>
            {client.payments.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">Henüz ödeme kaydı yok</p>
            ) : (
              <div className="space-y-3">
                {client.payments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{payment.title}</p>
                      <p className="text-[11px] text-gray-400">{payment.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-800">
                        {payment.amount} {payment.currency}
                      </p>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium 
                        ${paymentStatusColors[payment.status] || "bg-gray-100 text-gray-500"}`}>
                        {payment.status === "paid" ? "Ödendi" : payment.status === "pending" ? "Bekliyor" : payment.status === "overdue" ? "Gecikmiş" : "İptal"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Court dates */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
            <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <Gavel className="w-4 h-4 text-gray-400" />
              Mahkeme Tarihleri
            </h2>
            {client.courtDates.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">Henüz mahkeme tarihi yok</p>
            ) : (
              <div className="space-y-3">
                {client.courtDates.map((court) => (
                  <div key={court.id} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                    <div className="w-12 h-12 rounded-lg bg-red-50 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-[10px] text-red-400 font-medium">
                        {new Date(court.hearingDate).toLocaleDateString("tr-TR", { month: "short" })}
                      </span>
                      <span className="text-sm font-bold text-red-600">
                        {new Date(court.hearingDate).getDate()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{court.courtName}</p>
                      {court.caseNumber && (
                        <p className="text-[11px] text-gray-400">Dosya: {court.caseNumber}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Reminders */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
            <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 text-gray-400" />
              Hatırlatmalar
            </h2>
            {client.reminders.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">Hatırlatma yok</p>
            ) : (
              <div className="space-y-2">
                {client.reminders.map((reminder) => (
                  <div key={reminder.id} className={`p-3 rounded-xl text-sm ${reminder.isCompleted ? "bg-gray-50 line-through text-gray-400" : "bg-amber-50 text-gray-700"}`}>
                    <p className="font-medium">{reminder.title}</p>
                    <p className="text-[11px] mt-0.5 text-gray-400">
                      {new Date(reminder.dueDate).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <ClientNotesSection
            clientId={client.id}
            notes={client.clientNotes}
          />
        </div>
      </div>
    </div>
  );
}

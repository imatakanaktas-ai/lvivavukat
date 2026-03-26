"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Save,
  Loader2,
  AlertCircle,
  User,
  Phone,
  Mail,
  Globe,
  FileText,
  MapPin,
  StickyNote,
} from "lucide-react";
import { createClient, updateClient, type ClientActionState } from "../actions";

const ADMIN_PREFIX = process.env.NEXT_PUBLIC_ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

interface ClientFormProps {
  client?: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    email: string | null;
    nationality: string | null;
    passportNo: string | null;
    address: string | null;
    notes: string | null;
    status: string;
  };
}

export default function ClientForm({ client }: ClientFormProps) {
  const isEdit = !!client;
  const router = useRouter();

  const action = isEdit
    ? updateClient.bind(null, client.id)
    : createClient;

  const [state, formAction, isPending] = useActionState<ClientActionState, FormData>(action, null);

  useEffect(() => {
    if (state?.success && state.id && !isEdit) {
      router.push(`/${ADMIN_PREFIX}/muvekiller/${state.id}`);
    }
  }, [state, isEdit, router]);

  return (
    <form action={formAction} className="space-y-6">
      {state && !state.success && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-600">{state.message}</p>
        </div>
      )}

      {state?.success && isEdit && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
          <p className="text-sm text-emerald-600">{state.message}</p>
        </div>
      )}

      {/* Personal info */}
      <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
        <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          Kişisel Bilgiler
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-xs font-medium text-gray-600 mb-1">
              Ad <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              defaultValue={client?.firstName}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm
                focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]/30"
              placeholder="Müvekkil adı"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-xs font-medium text-gray-600 mb-1">
              Soyad <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              defaultValue={client?.lastName}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm
                focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]/30"
              placeholder="Müvekkil soyadı"
            />
          </div>
          <div>
            <label htmlFor="nationality" className="block text-xs font-medium text-gray-600 mb-1">
              <Globe className="w-3 h-3 inline mr-1" />Uyruk
            </label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              defaultValue={client?.nationality || "Türk"}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm
                focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]/30"
            />
          </div>
          <div>
            <label htmlFor="passportNo" className="block text-xs font-medium text-gray-600 mb-1">
              <FileText className="w-3 h-3 inline mr-1" />Pasaport No
            </label>
            <input
              type="text"
              id="passportNo"
              name="passportNo"
              defaultValue={client?.passportNo || ""}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm
                focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]/30"
              placeholder="U12345678"
            />
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
        <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-400" />
          İletişim Bilgileri
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-xs font-medium text-gray-600 mb-1">
              <Phone className="w-3 h-3 inline mr-1" />Telefon
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              defaultValue={client?.phone || ""}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm
                focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]/30"
              placeholder="+90 5XX XXX XX XX"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1">
              <Mail className="w-3 h-3 inline mr-1" />E-posta
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={client?.email || ""}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm
                focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]/30"
              placeholder="ornek@email.com"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="address" className="block text-xs font-medium text-gray-600 mb-1">
              <MapPin className="w-3 h-3 inline mr-1" />Adres
            </label>
            <input
              type="text"
              id="address"
              name="address"
              defaultValue={client?.address || ""}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm
                focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]/30"
              placeholder="Adres bilgisi"
            />
          </div>
        </div>
      </div>

      {/* Status & Notes */}
      <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
        <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <StickyNote className="w-4 h-4 text-gray-400" />
          Durum ve Notlar
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="status" className="block text-xs font-medium text-gray-600 mb-1">
              Durum
            </label>
            <select
              id="status"
              name="status"
              defaultValue={client?.status || "active"}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm
                focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]/30"
            >
              <option value="active">Aktif</option>
              <option value="pending">Bekliyor</option>
              <option value="inactive">Pasif</option>
            </select>
          </div>
          <div>
            <label htmlFor="notes" className="block text-xs font-medium text-gray-600 mb-1">
              Genel Notlar
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              defaultValue={client?.notes || ""}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm resize-y
                focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]/30"
              placeholder="Müvekkil hakkında genel notlar..."
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 bg-[#0A1628] hover:bg-[#1B2A4A] text-white 
            px-6 py-3 rounded-xl text-sm font-semibold transition-colors 
            disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Kaydediliyor...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {isEdit ? "Güncelle" : "Kaydet"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

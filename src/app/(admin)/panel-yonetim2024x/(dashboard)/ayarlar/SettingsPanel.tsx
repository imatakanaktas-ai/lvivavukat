"use client";

import { useState, useTransition } from "react";
import {
  Settings,
  Globe,
  Phone,
  Lock,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import { updateSiteSetting, changePassword } from "./actions";

export default function SettingsPanel({
  initialSettings,
}: {
  initialSettings: Record<string, string>;
}) {
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, startSave] = useTransition();
  const [saveMsg, setSaveMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Password
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPwSaving, startPwSave] = useTransition();

  const handleSettingSave = (key: string, value: string) => {
    setSaveMsg(null);
    startSave(async () => {
      const result = await updateSiteSetting(key, value);
      if (result?.success) {
        setSettings((prev) => ({ ...prev, [key]: value }));
        setSaveMsg({ type: "success", text: `"${key}" оновлено.` });
      } else {
        setSaveMsg({ type: "error", text: result?.message || "Помилка." });
      }
      setTimeout(() => setSaveMsg(null), 3000);
    });
  };

  const handlePasswordChange = () => {
    setPwMsg(null);
    if (newPw !== confirmPw) {
      setPwMsg({ type: "error", text: "Паролі не збігаються." });
      return;
    }
    if (newPw.length < 8) {
      setPwMsg({ type: "error", text: "Новий пароль повинен містити щонайменше 8 символів." });
      return;
    }
    startPwSave(async () => {
      const result = await changePassword(currentPw, newPw);
      if (result?.success) {
        setPwMsg({ type: "success", text: result.message });
        setCurrentPw("");
        setNewPw("");
        setConfirmPw("");
      } else {
        setPwMsg({ type: "error", text: result?.message || "Помилка." });
      }
    });
  };

  const settingsFields = [
    { key: "site_title", label: "Назва сайту", placeholder: "Lviv Avukat", icon: Globe },
    { key: "site_description", label: "Опис сайту", placeholder: "Юридичні послуги для турків в Україні", icon: Globe },
    { key: "whatsapp_number", label: "Номер WhatsApp", placeholder: "+380XXXXXXXXX", icon: Phone },
    { key: "contact_email", label: "Контактна ел. пошта", placeholder: "info@lvivavukat.com", icon: Globe },
    { key: "contact_phone", label: "Телефон", placeholder: "+380 XX XXX XXXX", icon: Phone },
    { key: "office_address", label: "Адреса офісу", placeholder: "Львів, Україна", icon: Globe },
  ];

  return (
    <div className="space-y-6">
      {/* Status message */}
      {saveMsg && (
        <div className={`flex items-center gap-2 p-3 rounded-xl border ${
          saveMsg.type === "success" ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
        }`}>
          {saveMsg.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-500" />
          )}
          <p className={`text-sm ${saveMsg.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
            {saveMsg.text}
          </p>
        </div>
      )}

      {/* Site Settings */}
      <div className="p-6 rounded-2xl bg-white border border-gray-200/80 space-y-5">
        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <Settings className="w-4 h-4 text-gray-400" />
          Налаштування сайту
        </h2>
        <div className="space-y-4">
          {settingsFields.map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.key} className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1">
                    <Icon className="w-3 h-3" />
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={settings[field.key] || ""}
                    onChange={(e) => setSettings((prev) => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                      focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                    placeholder={field.placeholder}
                  />
                </div>
                <button
                  onClick={() => handleSettingSave(field.key, settings[field.key] || "")}
                  disabled={isSaving}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#0A1628] hover:bg-[#1B2A4A] 
                    text-white transition-colors disabled:opacity-50 flex-shrink-0"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Password Change */}
      <div className="p-6 rounded-2xl bg-white border border-gray-200/80 space-y-5">
        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <Shield className="w-4 h-4 text-gray-400" />
          Змінити пароль
        </h2>

        {pwMsg && (
          <div className={`flex items-center gap-2 p-3 rounded-xl border ${
            pwMsg.type === "success" ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
          }`}>
            {pwMsg.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-500" />
            )}
            <p className={`text-sm ${pwMsg.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
              {pwMsg.text}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Поточний пароль</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 text-sm text-gray-800
                  focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Новий пароль</label>
            <input
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
              placeholder="Щонайменше 8 символів"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Новий пароль (повтор)</label>
            <input
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
            />
          </div>
          <button
            onClick={handlePasswordChange}
            disabled={isPwSaving || !currentPw || !newPw || !confirmPw}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold 
              bg-[#0A1628] hover:bg-[#1B2A4A] text-white transition-colors disabled:opacity-50"
          >
            {isPwSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            Змінити пароль
          </button>
        </div>
      </div>

      {/* SEO Info */}
      <div className="p-6 rounded-2xl bg-white border border-gray-200/80 space-y-3">
        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <Globe className="w-4 h-4 text-gray-400" />
          Статус SEO
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: "robots.txt", status: "Активно", ok: true },
            { label: "sitemap.xml", status: "Автоматично", ok: true },
            { label: "JSON-LD Schema", status: "На всіх сторінках", ok: true },
            { label: "Open Graph", status: "Активно", ok: true },
            { label: "Canonical URL", status: "Активно", ok: true },
            { label: "Мета описи", status: "На всіх сторінках", ok: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-medium text-gray-700">{item.label}</span>
              <span className="text-[10px] text-emerald-600 ml-auto">{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

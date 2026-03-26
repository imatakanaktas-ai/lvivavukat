import { getSiteSettings } from "./actions";
import SettingsPanel from "./SettingsPanel";

export default async function SettingsPage() {
  let settings: Record<string, string> = {};
  try {
    settings = await getSiteSettings();
  } catch {
    // DB not connected
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">Ayarlar</h1>
        <p className="text-sm text-gray-500 mt-1">Site ayarları ve güvenlik</p>
      </div>
      <SettingsPanel initialSettings={settings} />
    </div>
  );
}

import { auth } from "@/lib/auth/config";

export default async function AdminHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-20 h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200/80 
      flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-semibold text-gray-800 hidden sm:block">
          Yönetim Paneli
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">
            {session?.user?.name || "Admin"}
          </p>
          <p className="text-[11px] text-gray-400">
            {session?.user?.email}
          </p>
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0A1628] to-[#1B2A4A] 
          flex items-center justify-center text-white text-xs font-bold">
          {(session?.user?.name || "A").charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

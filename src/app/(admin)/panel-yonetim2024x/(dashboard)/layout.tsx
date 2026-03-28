import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/config";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: {
    default: "Панель управління | Lviv Avukat",
    template: "%s | Панель — Lviv Avukat",
  },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    const adminPrefix = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";
    redirect(`/${adminPrefix}/login`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="lg:ml-64 transition-all duration-300">
        <AdminHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

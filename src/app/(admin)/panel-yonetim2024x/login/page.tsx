import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/config";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Вхід | Панель управління",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) {
    const adminPrefix = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";
    redirect(`/${adminPrefix}`);
  }

  return <LoginForm />;
}

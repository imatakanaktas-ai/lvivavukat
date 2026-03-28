"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  PenTool,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  Scale,
  FolderOpen,
  Bell,
  Bot,
  Menu,
} from "lucide-react";
import { handleSignOut } from "@/lib/auth/client";

const ADMIN_PREFIX = process.env.NEXT_PUBLIC_ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

const navItems = [
  {
    label: "Огляд",
    href: `/${ADMIN_PREFIX}`,
    icon: LayoutDashboard,
  },
  {
    label: "Клієнти",
    href: `/${ADMIN_PREFIX}/muvekiller`,
    icon: Users,
  },
  {
    label: "Календар",
    href: `/${ADMIN_PREFIX}/takvim`,
    icon: CalendarDays,
  },
  {
    label: "Нагадування",
    href: `/${ADMIN_PREFIX}/hatirlatmalar`,
    icon: Bell,
  },
  {
    label: "Блог",
    href: `/${ADMIN_PREFIX}/blog`,
    icon: PenTool,
  },
  {
    label: "Документи",
    href: `/${ADMIN_PREFIX}/belgeler`,
    icon: FolderOpen,
  },
  {
    label: "Контактні форми",
    href: `/${ADMIN_PREFIX}/iletisim`,
    icon: MessageSquare,
  },
  {
    label: "AI Асистент",
    href: `/${ADMIN_PREFIX}/ai-asistan`,
    icon: Bot,
  },
  {
    label: "Налаштування",
    href: `/${ADMIN_PREFIX}/ayarlar`,
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === `/${ADMIN_PREFIX}`) return pathname === href;
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-lg bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
          <Scale className="w-5 h-5 text-[#C9A84C]" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">Lviv Avukat</p>
            <p className="text-[10px] text-white/40">Панель управління</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200
                ${active
                  ? "bg-[#C9A84C]/15 text-[#C9A84C] font-semibold"
                  : "text-white/60 hover:text-white hover:bg-white/5"
                }
                ${collapsed ? "justify-center" : ""}
              `}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${active ? "text-[#C9A84C]" : ""}`} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3 space-y-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 
            hover:text-white hover:bg-white/5 transition-colors w-full"
        >
          <ChevronLeft className={`w-[18px] h-[18px] transition-transform ${collapsed ? "rotate-180" : ""}`} />
          {!collapsed && <span>Згорнути</span>}
        </button>
        <button
          onClick={handleSignOut}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 
            hover:text-red-400 hover:bg-red-500/10 transition-colors w-full
            ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut className="w-[18px] h-[18px]" />
          {!collapsed && <span>Вийти</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-[#0A1628] border border-white/10 
          flex items-center justify-center text-white/70 hover:text-white transition-colors"
        aria-label="Відкрити меню"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-[#0A1628] border-r border-white/10 
          transform transition-transform duration-300 
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:block fixed inset-y-0 left-0 z-30 bg-[#0A1628] border-r border-white/10 
          transition-all duration-300 ${collapsed ? "w-[68px]" : "w-64"}`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}

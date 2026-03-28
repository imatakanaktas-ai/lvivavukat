"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

function getNavItems(dict: Dictionary, prefix: string) {
  return [
    { label: dict.nav.home, href: `${prefix}/` },
    { label: dict.nav.services, href: `${prefix}/hizmetler`, hasMegaMenu: true },
    { label: dict.nav.about, href: `${prefix}/hakkimizda` },
    { label: dict.nav.blog, href: `${prefix}/blog` },
    { label: dict.nav.contact, href: `${prefix}/iletisim` },
  ];
}

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const prefix = locale === "uk" ? "/ua" : "";
  const navItems = getNavItems(dict, prefix);
  const switchLocale = locale === "uk" ? "tr" : "uk";
  const switchPath = locale === "uk" ? "/" : "/ua";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleLanguageSwitch = () => {
    document.cookie = `NEXT_LOCALE=${switchLocale};path=/;max-age=${365 * 24 * 60 * 60};samesite=lax`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-primary/95 backdrop-blur-md shadow-xl py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`${prefix}/`} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-primary font-serif font-bold text-lg sm:text-xl">
                  LC
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent/60 rounded-full group-hover:scale-150 transition-transform" />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-serif text-lg font-bold leading-tight tracking-wide">
                LYUDMYLA CHUBAI
              </p>
              <p className="text-accent text-[11px] tracking-[0.2em] uppercase">
                {locale === "uk" ? "Юридичні послуги" : "Hukuk & Danışmanlık"}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() =>
                  item.hasMegaMenu && setIsMegaMenuOpen(true)
                }
                onMouseLeave={() =>
                  item.hasMegaMenu && setIsMegaMenuOpen(false)
                }
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/80 
                    hover:text-accent transition-colors rounded-lg hover:bg-white/5"
                >
                  {item.label}
                  {item.hasMegaMenu && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isMegaMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* Mega Menu */}
                {item.hasMegaMenu && (
                  <AnimatePresence>
                    {isMegaMenuOpen && (
                      <MegaMenu onClose={() => setIsMegaMenuOpen(false)} locale={locale} dict={dict} />
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            {/* Language Switcher */}
            <Link
              href={switchPath}
              onClick={handleLanguageSwitch}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white/80 
                hover:text-accent transition-colors rounded-lg hover:bg-white/5 ml-1"
            >
              <Globe className="w-4 h-4" />
              <span>{dict.common.switchLanguage}</span>
            </Link>
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Language Switcher (mobile-visible) */}
            <Link
              href={switchPath}
              onClick={handleLanguageSwitch}
              className="lg:hidden flex items-center gap-1 text-white/80 hover:text-accent transition-colors text-sm"
            >
              <Globe className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/380000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary 
                px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 
                hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              {dict.nav.freeConsultation}
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            >
              {isMobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <MobileMenu onClose={() => setIsMobileOpen(false)} locale={locale} dict={dict} />
        )}
      </AnimatePresence>
    </header>
  );
}

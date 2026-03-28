"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { serviceCategories } from "@/data/services";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

interface MegaMenuProps {
  onClose: () => void;
  locale: Locale;
  dict: Dictionary;
}

export default function MegaMenu({ onClose, locale, dict }: MegaMenuProps) {
  const prefix = locale === "uk" ? "/ua" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[780px] bg-white rounded-2xl shadow-2xl 
        border border-border/50 overflow-hidden"
    >
      <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {serviceCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-xs font-bold text-accent uppercase tracking-widest mb-3 pb-2 border-b border-accent/20">
                {category.title}
              </h3>
              <ul className="space-y-1">
                {category.services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <li key={service.slug}>
                      <Link
                        href={`${prefix}/hizmetler/${service.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg text-sm text-foreground/80 
                          hover:bg-secondary hover:text-primary transition-all group"
                      >
                        <Icon className="w-4 h-4 text-muted group-hover:text-accent transition-colors flex-shrink-0" />
                        <span className="truncate">{service.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-border">
          <Link
            href={`${prefix}/hizmetler`}
            onClick={onClose}
            className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary hover:bg-primary-light 
              text-primary-foreground text-sm font-semibold transition-colors"
          >
            {dict.nav.viewAllServices} →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

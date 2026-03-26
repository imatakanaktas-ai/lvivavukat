"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ChevronRight } from "lucide-react";
import { serviceCategories } from "@/data/services";
import { useState } from "react";

interface MobileMenuProps {
  onClose: () => void;
}

const navItems = [
  { label: "Anasayfa", href: "/" },
  { label: "Hizmetlerimiz", href: "/hizmetler", hasSubmenu: true },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 top-[60px] bg-primary z-40 overflow-y-auto"
    >
      <div className="flex flex-col min-h-full p-6">
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <div key={item.href}>
              {item.hasSubmenu ? (
                <>
                  <button
                    onClick={() =>
                      setOpenCategory(
                        openCategory === "services" ? null : "services"
                      )
                    }
                    className="flex items-center justify-between w-full py-3 px-4 text-lg font-medium 
                      text-white/90 hover:text-accent transition-colors rounded-lg hover:bg-white/5"
                  >
                    {item.label}
                    <ChevronRight
                      className={`w-5 h-5 transition-transform duration-300 ${
                        openCategory === "services" ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  {openCategory === "services" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-4 space-y-4 mt-2 mb-2"
                    >
                      {serviceCategories.map((cat) => (
                        <div key={cat.title}>
                          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2 px-4">
                            {cat.title}
                          </p>
                          <div className="space-y-0.5">
                            {cat.services.map((service) => (
                              <Link
                                key={service.slug}
                                href={`/hizmetler/${service.slug}`}
                                onClick={onClose}
                                className="block py-2 px-4 text-sm text-white/70 hover:text-accent 
                                  transition-colors rounded-lg hover:bg-white/5"
                              >
                                {service.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-3 px-4 text-lg font-medium text-white/90 
                    hover:text-accent transition-colors rounded-lg hover:bg-white/5"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <a
            href="https://wa.me/380000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-hover 
              text-primary py-3.5 rounded-xl font-bold text-base transition-colors"
          >
            <Phone className="w-5 h-5" />
            Ücretsiz Danışma Al
          </a>
        </div>
      </div>
    </motion.div>
  );
}

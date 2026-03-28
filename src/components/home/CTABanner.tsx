"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { localizedHref } from "@/i18n/locale-utils";

export default function CTABanner({ dict, locale }: { dict: Dictionary; locale: Locale }) {

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-primary" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
            {dict.cta.title}
          </h2>
          <p className="mt-5 text-lg text-white/60 max-w-2xl mx-auto">
            {dict.cta.description}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/380000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover 
                text-primary px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 
                hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5"
            >
              <Phone className="w-5 h-5" />
              {dict.cta.whatsapp}
            </a>
            <Link
              href={localizedHref("/iletisim", locale)}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 
                text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 
                border border-white/10 hover:border-white/20"
            >
              {dict.cta.button}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

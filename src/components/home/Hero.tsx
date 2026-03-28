"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, Shield, Award, Globe } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { localizedHref } from "@/i18n/locale-utils";

export default function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-primary" />
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/3 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
            >
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium">
                {dict.hero.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight"
            >
              {dict.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-white/60 leading-relaxed max-w-xl"
            >
              {dict.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <a
                href="https://wa.me/380000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover 
                  text-primary px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 
                  hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                {dict.hero.ctaPrimary}
              </a>
              <Link
                href={localizedHref("/hizmetler", locale)}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 
                  text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 
                  border border-white/10 hover:border-white/20"
              >
                {dict.hero.ctaSecondary}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex items-center gap-8"
            >
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                <span className="text-sm text-white/50">{dict.hero.trustLicensed}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-accent" />
                <span className="text-sm text-white/50">{dict.hero.trustTurkish}</span>
              </div>
            </motion.div>
          </div>

          {/* Right - Floating card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Background shape */}
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 to-accent/5 rounded-3xl blur-2xl" />
              
              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl font-serif font-bold text-accent">LC</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white">{dict.hero.profileTitle}</h3>
                  <p className="text-accent text-sm mt-1">{dict.hero.profileSubtitle}</p>
                </div>

                <div className="space-y-4">
                  {[
                    { label: dict.hero.serviceResidence, count: "5" },
                    { label: dict.hero.serviceWork, count: "5" },
                    { label: dict.hero.serviceCompany, count: "9" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5"
                    >
                      <span className="text-sm text-white/70">{item.label}</span>
                      <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <p className="text-sm text-white/40">
                    {locale === "uk" ? "Всього" : "Toplam"}{" "}
                    <span className="text-accent font-bold">19</span>{" "}
                    {locale === "uk" ? "різних послуг" : "farklı hizmet alanı"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-accent rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceCategories } from "@/data/services";

export default function ServicesGrid() {
  const allServices = serviceCategories.flatMap((c) => c.services).slice(0, 9);

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-accent text-sm font-bold uppercase tracking-widest mb-3">
            Hizmetlerimiz
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground">
            Kapsamlı Hukuki Çözümler
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            Ukrayna&apos;da Türk vatandaşlarının ihtiyaç duyabileceği tüm hukuki hizmetleri 
            tek çatı altında sunuyoruz.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  href={`/hizmetler/${service.slug}`}
                  className="group block p-6 rounded-2xl bg-card border border-border/50 
                    hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 
                    transition-all duration-500 h-full hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/5 group-hover:bg-accent/10 
                    flex items-center justify-center transition-colors duration-500 mb-5">
                    <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-500" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
                    {service.shortDescription}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-accent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Detaylı Bilgi
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-primary-foreground 
              px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
          >
            Tüm Hizmetlerimizi Görün
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

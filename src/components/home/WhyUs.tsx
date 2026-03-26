"use client";

import { motion } from "framer-motion";
import { Check, Shield, Globe, Clock, HeartHandshake } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Lisanslı ve Deneyimli",
    description: "Ukrayna Barolar Birliği'ne kayıtlı, uluslararası hukuk alanında deneyimli avukat.",
  },
  {
    icon: Globe,
    title: "Türkçe Hizmet",
    description: "Tüm süreçlerde Türkçe iletişim imkânı ile dil engeli olmadan profesyonel destek.",
  },
  {
    icon: Clock,
    title: "Hızlı Süreç Yönetimi",
    description: "Bürokratik süreçlerin hızlı ve etkin yönetimi ile zaman ve maliyet tasarrufu.",
  },
  {
    icon: HeartHandshake,
    title: "Kişiye Özel Çözümler",
    description: "Her müvekkilin durumuna özel strateji geliştirerek en uygun çözümü sunuyoruz.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent text-sm font-bold uppercase tracking-widest">
              Neden Biz?
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-foreground leading-tight">
              Ukrayna&apos;da Türklere Özel{" "}
              <span className="text-accent">Hukuki Güvence</span>
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              Yıllardır Ukrayna&apos;da yaşayan ve iş yapan Türk vatandaşlarına hukuki danışmanlık 
              sunuyoruz. Yerel mevzuata hâkimiyetimiz ve Türk kültürünü anlamamız bizi 
              farklı kılıyor.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Oturum izni süreçlerinde %98 başarı oranı",
                "Türk-Ukrayna hukuki ilişkilerine tam hâkimiyet",
                "Şeffaf ücretlendirme, sürpriz yok",
                "İlk danışma tamamen ücretsiz",
                "WhatsApp ile 7/24 erişilebilirlik",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-sm text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right */}
          <div className="grid sm:grid-cols-2 gap-5">
            {reasons.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border/50 hover:border-accent/20 
                    hover:shadow-lg transition-all duration-500"
                >
                  <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-serif font-bold text-foreground mb-2">{reason.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{reason.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

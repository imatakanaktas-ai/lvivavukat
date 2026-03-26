"use client";

import { motion } from "framer-motion";
import { MessageSquare, FileText, Settings, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "İletişim & Danışma",
    description: "WhatsApp veya telefon ile bize ulaşın. İlk danışma tamamen ücretsizdir. Durumunuzu dinler, seçeneklerinizi belirleriz.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Belge Hazırlığı",
    description: "Gerekli tüm belgelerin hazırlanması, tercümesi ve noter onay süreçlerini sizin için yönetiyoruz.",
  },
  {
    icon: Settings,
    step: "03",
    title: "Süreç Yönetimi",
    description: "Başvurularınızı takip ediyor, resmi kurumlarla olan tüm iletişimi ve süreci profesyonelce yönetiyoruz.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Başarılı Sonuç",
    description: "İşlemleriniz tamamlandıktan sonra da yanınızdayız. Gelecek süreçleriniz için danışmanlık desteğimiz devam eder.",
  },
];

export default function Process() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-accent text-sm font-bold uppercase tracking-widest">
            Nasıl Çalışırız?
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-foreground">
            4 Adımda Hukuki Çözüm
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            Sürecin her aşamasında yanınızdayız. Sizin için en doğru yolu belirler ve yönetiriz.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group"
              >
                {/* Connector line (not on last item) */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+30px)] w-[calc(100%-60px)] h-[2px] bg-border">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent" />
                  </div>
                )}

                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl 
                    bg-primary/5 group-hover:bg-accent/10 transition-colors duration-500 mb-5">
                    <Icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-500" />
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-lg bg-accent text-primary 
                      text-xs font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

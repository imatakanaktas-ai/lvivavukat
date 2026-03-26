"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Ukrayna'da Türk vatandaşları vize olmadan ne kadar kalabilir?",
    answer: "Türk vatandaşları Ukrayna'ya vizesiz olarak giriş yapabilir ve 90 gün süreyle kalabilir. Bu süre 180 günlük dönem içinde geçerlidir. Sürenizi uzatmak veya kalıcı çözüm için oturum izni başvurusu yapmanız gerekmektedir.",
  },
  {
    question: "Oturum izni başvurusu ne kadar sürer?",
    answer: "Geçici oturum izni başvurusu genellikle 15-30 iş günü içinde sonuçlanır. Başvuru gerekçesine, belgelerin eksiksizliğine ve mevsimsel yoğunluğa göre bu süre değişebilir.",
  },
  {
    question: "Ukrayna'da evlilik Türkiye'de geçerli midir?",
    answer: "Evet, Ukrayna'da usulüne uygun yapılan evlilik, Türk Konsolosluğuna tescil ettirildikten sonra Türkiye'de de tam geçerliliğe sahiptir. Tescil işlemleri için de destek sunuyoruz.",
  },
  {
    question: "Danışmanlık ücreti ne kadardır?",
    answer: "İlk danışma görüşmemiz tamamen ücretsizdir. Durumunuzu değerlendirdikten sonra hizmet kapsamı ve ücretlendirme hakkında şeffaf bilgi veriyoruz. Sürpriz masraf yoktur.",
  },
  {
    question: "Hizmetleriniz sadece Lviv ile mi sınırlı?",
    answer: "Ofisimiz Lviv'de bulunmakla birlikte, Ukrayna genelinde hukuki destek sunuyoruz. Kyiv, Odessa, Kharkiv gibi diğer şehirlerdeki işlemleriniz için de yardımcı oluyoruz.",
  },
  {
    question: "Şirket kurmak için Ukrayna'da bulunmam gerekiyor mu?",
    answer: "Şirket kuruluş sürecinin belirli aşamalarında Ukrayna'da bulunmanız gerekebilir. Ancak vekâletname ile birçok işlem sizin adınıza gerçekleştirilebilir.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-accent text-sm font-bold uppercase tracking-widest">
            Sıkça Sorulan Sorular
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-foreground">
            Merak Ettikleriniz
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="border border-border/50 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/50 transition-colors"
              >
                <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="px-5 pb-5"
                >
                  <p className="text-muted leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

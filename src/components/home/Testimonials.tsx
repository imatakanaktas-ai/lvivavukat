"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Ahmet Y.",
    role: "İş İnsanı",
    content: "Ukrayna'da şirket kurma sürecimde bana büyük destek oldular. Tüm bürokratik işlemler sorunsuz ve hızlı bir şekilde tamamlandı. Kesinlikle tavsiye ederim.",
    rating: 5,
  },
  {
    name: "Mehmet K.",
    role: "Mühendis",
    content: "Çalışma izni sürecim çok hızlı ve profesyonel şekilde yönetildi. Türkçe iletişim kurabilmek büyük avantaj. Her şeyi çok net açıkladılar.",
    rating: 5,
  },
  {
    name: "Fatma S.",
    role: "Öğrenci Velisi",
    content: "Oğlumun üniversite kayıt ve öğrenci oturum izni işlemlerinde çok yardımcı oldular. Güler yüzlü ve profesyonel yaklaşımları için çok teşekkür ederim.",
    rating: 5,
  },
  {
    name: "Ali D.",
    role: "Gayrimenkul Yatırımcısı",
    content: "Lviv'de gayrimenkul almak istediğimde tüm hukuki süreçleri eksiksiz yönettiler. Tapu devir işlemleri sorunsuz tamamlandı. Güvenilir bir ekip.",
    rating: 5,
  },
  {
    name: "Ayşe T.",
    role: "Ev Hanımı",
    content: "Eşimle evlilik işlemlerimizde her adımda yanımızda oldular. Belge hazırlığından nikaha kadar her şey çok düzgün ilerledi.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-accent text-sm font-bold uppercase tracking-widest">
            Müvekkil Yorumları
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-foreground">
            Müvekkillerimiz Ne Diyor?
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Active testimonial */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative bg-card rounded-2xl border border-border/50 p-8 sm:p-10 mb-8"
          >
            <Quote className="absolute top-6 right-6 w-10 h-10 text-accent/10" />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-lg text-foreground/80 leading-relaxed italic mb-6">
              &ldquo;{testimonials[active].content}&rdquo;
            </p>
            <div>
              <p className="font-serif font-bold text-foreground">{testimonials[active].name}</p>
              <p className="text-sm text-muted">{testimonials[active].role}</p>
            </div>
          </motion.div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === active
                    ? "bg-accent w-8"
                    : "bg-border hover:bg-muted"
                }`}
                aria-label={`Yorum ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

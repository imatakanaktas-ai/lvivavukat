"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";

export default function Testimonials({ dict }: { dict: Dictionary }) {
  const [active, setActive] = useState(0);
  const items = dict.testimonials.items;

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
            {dict.testimonials.title}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-foreground">
            {dict.testimonials.title}
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
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-lg text-foreground/80 leading-relaxed italic mb-6">
              &ldquo;{items[active].text}&rdquo;
            </p>
            <div>
              <p className="font-serif font-bold text-foreground">{items[active].name}</p>
              <p className="text-sm text-muted">{items[active].role}</p>
            </div>
          </motion.div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === active
                    ? "bg-accent w-8"
                    : "bg-border hover:bg-muted"
                }`}
                aria-label={`${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

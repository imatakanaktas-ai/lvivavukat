"use client";

import { motion } from "framer-motion";
import { Check, Shield, Globe, Clock, HeartHandshake } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";

const icons = [Shield, Globe, Clock, HeartHandshake];

export default function WhyUs({ dict }: { dict: Dictionary }) {
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
              {dict.whyUs.title}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-foreground leading-tight">
              {dict.whyUs.title}
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              {dict.whyUs.subtitle}
            </p>
          </motion.div>

          {/* Right */}
          <div className="grid sm:grid-cols-2 gap-5">
            {dict.whyUs.items.map((item, i) => {
              const Icon = icons[i] || Shield;
              return (
                <motion.div
                  key={i}
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
                  <h3 className="font-serif font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

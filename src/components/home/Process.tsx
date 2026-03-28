"use client";

import { motion } from "framer-motion";
import { MessageSquare, FileText, Settings, CheckCircle } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";

const stepIcons = [MessageSquare, FileText, Settings, CheckCircle];

export default function Process({ dict }: { dict: Dictionary }) {
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
            {dict.process.title}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-foreground">
            {dict.process.title}
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            {dict.process.subtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {dict.process.steps.map((step, i) => {
            const Icon = stepIcons[i] || CheckCircle;
            const stepNum = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={i}
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
                      {stepNum}
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

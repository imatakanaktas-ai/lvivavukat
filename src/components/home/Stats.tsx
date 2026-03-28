"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Clock, TrendingUp, Briefcase } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-serif font-bold text-white">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats({ dict }: { dict: Dictionary }) {
  const stats = [
    { icon: Users, value: 500, suffix: "+", label: dict.stats.clients },
    { icon: Clock, value: 10, suffix: "+", label: dict.stats.experience },
    { icon: TrendingUp, value: 98, suffix: "%", label: dict.stats.cases },
    { icon: Briefcase, value: 19, suffix: "", label: dict.stats.services },
  ];

  return (
    <section className="relative py-16 bg-primary-light overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-light to-primary opacity-80" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-4">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm text-white/50 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

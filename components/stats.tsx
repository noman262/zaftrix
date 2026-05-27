"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 2400, suffix: "+", label: "Global Clients", decimals: 0 },
  { value: 98.7, suffix: "%", label: "Client Satisfaction", decimals: 1 },
  { value: 847, suffix: "", label: "AI Agents Deployed", decimals: 0 },
  { value: 4.2, suffix: "B+", label: "Revenue Generated", decimals: 1, prefix: "$" },
];

function AnimatedCounter({
  value,
  suffix,
  prefix = "",
  decimals,
  active,
}: {
  value: number;
  suffix: string;
  prefix?: string;
  decimals: number;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    const duration = 2000;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(value * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [active, value]);

  const display =
    decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString();

  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stats" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-600/[0.04] to-transparent" />
      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
            Real-Time Impact
          </p>
          <h2
            className="mt-4 text-4xl font-bold text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Numbers That Define Excellence
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass group relative overflow-hidden rounded-2xl p-8 text-center transition-all hover:border-violet-500/35"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/15 blur-2xl transition-all group-hover:bg-violet-500/25" />
              <p
                className="relative text-4xl font-bold text-white sm:text-5xl"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  decimals={stat.decimals}
                  active={isInView}
                />
              </p>
              <p className="relative mt-2 text-sm text-muted">{stat.label}</p>
              <div className="relative mt-4 flex items-center justify-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
                <span className="text-xs text-violet-400">Live</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function HeroPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="preview" className="relative -mt-8 pb-24 pt-8">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950/10 to-black" />
      <div ref={ref} className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-violet-600/25 via-purple-600/20 to-violet-800/25 blur-3xl" />
          <div className="glass-strong relative overflow-hidden rounded-3xl">
            <div className="flex items-center gap-2 border-b border-violet-500/15 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/70" />
                <div className="h-3 w-3 rounded-full bg-amber-500/70" />
                <div className="h-3 w-3 rounded-full bg-violet-500/70" />
              </div>
              <span className="flex-1 text-center text-xs text-muted">
                zaftrix.ai — command center
              </span>
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-3">
              {[
                {
                  label: "Active AI Agents",
                  value: "847",
                  change: "+12%",
                  accent: "text-violet-400",
                },
                {
                  label: "Automations Today",
                  value: "24.8K",
                  change: "+34%",
                  accent: "text-purple-400",
                },
                {
                  label: "Revenue Impact",
                  value: "$2.1M",
                  change: "+89%",
                  accent: "text-violet-300",
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="glass-card rounded-2xl p-5"
                >
                  <p className="text-xs text-muted">{card.label}</p>
                  <p
                    className="mt-2 text-3xl font-bold text-white"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {card.value}
                  </p>
                  <p className={`mt-1 text-xs font-medium ${card.accent}`}>
                    {card.change} this week
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-violet-500/10 p-4">
              <div className="flex h-28 items-end gap-1.5">
                {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map(
                  (h, i) => (
                    <div
                      key={`chart-bar-${i}`}
                      className="flex-1 rounded-t bg-gradient-to-t from-violet-600/50 to-purple-400/70 transition-all hover:from-violet-500/70 hover:to-purple-300/90"
                      style={{ height: `${h}%` }}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

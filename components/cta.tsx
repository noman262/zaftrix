"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Calendar } from "lucide-react";

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="work" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 via-purple-700/20 to-violet-900/30" />
          <div className="absolute inset-0 grid-pattern opacity-50" />
          <div className="glass-strong relative px-8 py-16 text-center sm:px-16 sm:py-24">
            <p className="text-sm font-medium uppercase tracking-widest text-violet-300">
              Ready to Lead?
            </p>
            <h2
              className="mx-auto mt-4 max-w-3xl text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Let&apos;s Build Something{" "}
              <span className="gradient-text">Extraordinary</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
              Join 2,400+ brands already scaling with Zaftrix. Your competitors
              are already using AI — don&apos;t get left behind.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#"
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-black transition-all hover:bg-violet-50 sm:w-auto"
              >
                <Calendar className="h-5 w-5" />
                Book Strategy Call
              </a>
              <a
                href="#tools"
                className="glass flex w-full items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-semibold text-white transition-all hover:border-violet-500/35 hover:bg-violet-500/10 sm:w-auto"
              >
                Try Free AI Tools
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

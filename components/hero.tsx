"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Globe2, Zap, Shield, ChevronDown } from "lucide-react";
import { ParticleField } from "./particle-field";

const badges = [
  { icon: Globe2, text: "120+ Countries" },
  { icon: Zap, text: "AI-First Stack" },
  { icon: Shield, text: "Enterprise Grade" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="glow-orb -top-40 left-1/4 h-[600px] w-[600px] bg-violet-600/25" />
      <div className="glow-orb top-1/4 -right-40 h-[500px] w-[500px] bg-purple-600/20" />
      <div className="glow-orb bottom-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 bg-violet-800/15" />

      <div className="absolute inset-0 grid-pattern" />
      <ParticleField />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 pb-24 pt-32 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
            </span>
            <span className="text-muted">
              Now serving{" "}
              <span className="font-semibold text-violet-300">2,400+</span> global
              clients
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="max-w-6xl text-6xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          <span className="block text-white">The World&apos;s Most</span>
          <span className="gradient-text mt-2 block">Advanced AI Agency</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl md:text-2xl"
        >
          Zaftrix engineers premium digital experiences — autonomous AI agents,
          intelligent automation, and data-driven growth for brands that refuse
          to settle.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 flex w-full max-w-lg flex-col items-center justify-center gap-4 sm:max-w-none sm:flex-row"
        >
          <a
            href="#services"
            className="btn-primary group flex w-full items-center justify-center gap-2 rounded-2xl px-10 py-5 text-lg font-bold text-white transition-all hover:scale-[1.02] sm:w-auto"
          >
            Explore Services
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <button
            type="button"
            className="glass group flex w-full items-center justify-center gap-3 rounded-2xl px-10 py-5 text-lg font-semibold text-white transition-all hover:border-violet-500/40 hover:bg-violet-500/10 sm:w-auto"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/20 transition-colors group-hover:bg-violet-500/30">
              <Play className="h-5 w-5 fill-white text-white" />
            </span>
            Watch Showreel
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.text}
                className="flex items-center gap-2.5 text-sm text-muted"
              >
                <Icon className="h-4 w-4 text-violet-400" />
                <span className="font-medium text-zinc-300">{badge.text}</span>
              </div>
            );
          })}
        </motion.div>
      </div>

      <motion.a
        href="#preview"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-violet-400/70 transition-colors hover:text-violet-300"
        aria-label="Scroll to preview"
      >
        <span className="text-xs font-medium uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </motion.a>
    </section>
  );
}

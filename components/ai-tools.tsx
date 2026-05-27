"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Wand2,
  FileText,
  ImageIcon,
  Code2,
  Mic,
  BarChart3,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const tools = [
  {
    icon: Wand2,
    name: "CopyForge AI",
    desc: "Generate high-converting copy in 40+ languages",
    free: true,
    uses: "12.4K",
  },
  {
    icon: ImageIcon,
    name: "Vision Studio",
    desc: "AI image generation & brand asset creation",
    free: true,
    uses: "8.7K",
  },
  {
    icon: FileText,
    name: "SEO Analyzer",
    desc: "Instant technical SEO audits & recommendations",
    free: true,
    uses: "15.2K",
  },
  {
    icon: Code2,
    name: "CodePilot",
    desc: "AI pair programming & code review assistant",
    free: true,
    uses: "6.1K",
  },
  {
    icon: Mic,
    name: "VoiceSynth",
    desc: "Text-to-speech & voice cloning for content",
    free: false,
    uses: "3.8K",
  },
  {
    icon: BarChart3,
    name: "Insight Engine",
    desc: "Upload data, get AI-powered business insights",
    free: true,
    uses: "9.3K",
  },
];

export function AiTools() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="tools" className="relative py-24">
      <div className="glow-orb left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 bg-violet-600/15" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center"
        >
          <div className="glass mb-4 inline-flex items-center gap-2 rounded-full border-violet-500/25 px-4 py-1.5 text-sm text-violet-300">
            <Sparkles className="h-4 w-4" />
            100% Free to Start
          </div>
          <h2
            className="text-4xl font-bold text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Free AI Tools Suite
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Professional-grade AI utilities — no credit card, no limits on
            essentials. Built by Zaftrix, trusted by creators worldwide.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => {
            const ToolIcon = tool.icon;
            return (
              <motion.a
                key={tool.name}
                href="#"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="glass group flex items-start gap-4 rounded-2xl p-6 transition-all hover:border-violet-500/35 hover:bg-violet-500/5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/25 to-purple-600/15 text-violet-300 transition-colors group-hover:from-violet-500/35 group-hover:to-purple-600/25">
                  <ToolIcon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{tool.name}</h3>
                    {tool.free && (
                      <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-300">
                        Free
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted">{tool.desc}</p>
                  <p className="mt-2 text-xs text-zinc-600">
                    {tool.uses} uses today
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-violet-400 group-hover:opacity-100" />
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="#"
            className="glass inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold text-white transition-all hover:border-violet-500/35 hover:bg-violet-500/10"
          >
            Access All 24+ Tools
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

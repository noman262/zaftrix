"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Palette,
  Bot,
  Workflow,
  Search,
  LayoutDashboard,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Web Design",
    description:
      "Award-winning interfaces with conversion-optimized UX, motion design, and brand systems that captivate and convert.",
    tags: ["UI/UX", "Brand", "Motion"],
    gradient: "from-violet-500/15 to-purple-900/5",
    accent: "text-violet-300",
    border: "group-hover:border-violet-500/35",
  },
  {
    icon: Bot,
    title: "AI Agents",
    description:
      "Autonomous agents that handle support, sales, research, and operations — trained on your data, deployed in days.",
    tags: ["LLM", "RAG", "Voice"],
    gradient: "from-purple-500/20 to-violet-900/5",
    accent: "text-purple-400",
    border: "group-hover:border-purple-500/35",
  },
  {
    icon: Workflow,
    title: "Automation",
    description:
      "End-to-end workflow automation connecting your entire stack — eliminate manual work and scale infinitely.",
    tags: ["n8n", "APIs", "Integrations"],
    gradient: "from-violet-600/15 to-black/20",
    accent: "text-violet-400",
    border: "group-hover:border-violet-500/35",
  },
  {
    icon: Search,
    title: "SEO",
    description:
      "AI-powered SEO strategies that dominate search — technical audits, content engines, and authority building at scale.",
    tags: ["Technical", "Content", "Links"],
    gradient: "from-purple-600/15 to-violet-950/5",
    accent: "text-purple-300",
    border: "group-hover:border-purple-500/35",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard Services",
    description:
      "Real-time analytics dashboards, custom admin panels, and business intelligence that turns data into decisions.",
    tags: ["Analytics", "BI", "Custom"],
    gradient: "from-violet-500/20 to-purple-800/10",
    accent: "text-violet-300",
    border: "group-hover:border-violet-400/35",
    featured: true,
  },
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
              Our Expertise
            </p>
            <h2
              className="mt-4 text-4xl font-bold text-white sm:text-5xl"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Full-Stack Digital
              <span className="gradient-text"> Dominance</span>
            </h2>
            <p className="mt-4 text-lg text-muted">
              From pixel-perfect design to autonomous AI — we deliver the
              complete arsenal modern enterprises need to win.
            </p>
          </div>
          <a
            href="#"
            className="glass flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white transition-all hover:border-violet-500/30 hover:bg-violet-500/10"
          >
            View all capabilities
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const ServiceIcon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`glass-card group relative overflow-hidden rounded-2xl bg-gradient-to-br ${service.gradient} p-8 transition-all duration-500 ${service.border} ${
                  service.featured
                    ? "md:col-span-2 lg:col-span-1 lg:row-span-1"
                    : ""
                }`}
              >
                <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className={`h-5 w-5 ${service.accent}`} />
                </div>
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 ${service.accent}`}
                >
                  <ServiceIcon className="h-7 w-7" />
                </div>
                <h3
                  className="mt-6 text-2xl font-bold text-white"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {service.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-violet-500/15 bg-violet-500/5 px-3 py-1 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

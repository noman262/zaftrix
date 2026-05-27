"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sparkles,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "AI Tools", href: "#tools" },
  { label: "Results", href: "#stats" },
  { label: "Work", href: "#work" },
];

const megaItems = [
  { title: "AI Agents", desc: "Autonomous workforce" },
  { title: "Automation", desc: "End-to-end workflows" },
  { title: "Enterprise", desc: "Scale without limits" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
              scrolled ? "glass-strong shadow-2xl shadow-violet-500/10" : "glass"
            }`}
          >
            <a href="#" className="group flex items-center gap-2.5">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-lg shadow-violet-500/30">
                <Sparkles className="h-5 w-5 text-white" />
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <span
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Zaftrix
              </span>
            </a>

            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) =>
                link.label === "Services" ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                  >
                    <button className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm text-muted transition-colors hover:text-white">
                      {link.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${
                          megaOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          key="services-mega-menu"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full pt-3"
                        >
                          <div className="glass-strong w-72 rounded-2xl p-4 shadow-2xl">
                            {megaItems.map((item) => (
                              <a
                                key={item.title}
                                href="#services"
                                className="block rounded-xl px-4 py-3 transition-colors hover:bg-violet-500/10"
                              >
                                <p className="text-sm font-medium text-white">
                                  {item.title}
                                </p>
                                <p className="text-xs text-muted">{item.desc}</p>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="rounded-lg px-4 py-2 text-sm text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href="#"
                className="rounded-lg px-4 py-2 text-sm text-muted transition-colors hover:text-white"
              >
                Sign in
              </a>
              <a
                href="#tools"
                className="btn-primary group relative flex items-center gap-2 overflow-hidden rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
              >
                <span className="relative z-10">Start Free</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <motion.div
              key="mobile-menu-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="flex h-full flex-col justify-center gap-2 px-8 pt-20"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="py-4 text-3xl font-bold text-white"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                key="start-free"
                href="#tools"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="btn-primary mt-8 flex items-center justify-center gap-2 rounded-2xl py-4 text-lg font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                Start Free <ArrowRight className="h-5 w-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

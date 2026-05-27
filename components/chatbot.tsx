"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Sparkles,
  Minimize2,
} from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const quickReplies = [
  "What services do you offer?",
  "Pricing for AI agents?",
  "Book a strategy call",
];

const botResponses: Record<string, string> = {
  default:
    "I'm Zaftrix AI — your intelligent guide to our global agency platform. I can help with services, pricing, timelines, or connecting you with our team. What would you like to explore?",
  services:
    "We offer five core pillars: **Web Design**, **AI Agents**, **Automation**, **SEO**, and **Dashboard Services**. Each is engineered for enterprise scale with AI at the core. Which interests you most?",
  pricing:
    "Our AI agent packages start from $2,400/month for SMBs, with custom enterprise tiers available. Free AI tools have no credit card required. Want me to schedule a personalized quote call?",
  call:
    "Excellent choice! I can connect you with a senior strategist within 24 hours. Share your email in chat or click 'Start Free' — our team operates across 120+ countries with 24/7 coverage.",
  agents:
    "Our AI agents handle customer support, sales outreach, research, and internal ops — deployed in days, trained on your data with full RAG pipelines. Average ROI: 340% in year one.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("service") || lower.includes("offer"))
    return botResponses.services;
  if (lower.includes("pric") || lower.includes("cost"))
    return botResponses.pricing;
  if (lower.includes("call") || lower.includes("book") || lower.includes("meet"))
    return botResponses.call;
  if (lower.includes("agent") || lower.includes("ai"))
    return botResponses.agents;
  return botResponses.default;
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content:
        "Welcome to Zaftrix! I'm your AI concierge. Ask me anything about our services, free tools, or how we can transform your business.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getResponse(text),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  };

  return (
    <>
      <AnimatePresence>
        {open && !minimized && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="glass-strong fixed bottom-24 right-4 z-50 flex h-[min(520px,80vh)] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl shadow-2xl shadow-violet-500/20 sm:right-6"
          >
            <div
              key="chat-header"
              className="flex items-center justify-between border-b border-violet-500/15 bg-gradient-to-r from-violet-600/15 to-purple-900/10 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-700">
                  <Bot className="h-5 w-5 text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-black bg-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Zaftrix AI
                  </p>
                  <p className="flex items-center gap-1 text-xs text-violet-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    Online · Responds instantly
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setMinimized(true)}
                  className="rounded-lg p-2 text-muted transition-colors hover:bg-violet-500/10 hover:text-white"
                  aria-label="Minimize"
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2 text-muted transition-colors hover:bg-violet-500/10 hover:text-white"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              key="chat-messages"
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                        : "glass-card text-zinc-300"
                    }`}
                  >
                    {msg.content.split("**").map((part, i) =>
                      i % 2 === 1 ? (
                        <strong
                          key={`${msg.id}-strong-${i}`}
                          className="font-semibold text-white"
                        >
                          {part}
                        </strong>
                      ) : (
                        <span key={`${msg.id}-text-${i}`}>{part}</span>
                      )
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div key="typing-indicator" className="flex justify-start">
                  <div className="glass flex gap-1 rounded-2xl px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-2 w-2 rounded-full bg-violet-400"
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div key="messages-end" ref={messagesEndRef} />
            </div>

            {messages.length <= 2 && (
              <div
                key="chat-quick-replies"
                className="flex flex-wrap gap-2 border-t border-violet-500/10 px-4 py-2"
              >
                {quickReplies.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => sendMessage(q)}
                    className="rounded-full border border-violet-500/20 bg-violet-500/5 px-3 py-1.5 text-xs text-muted transition-colors hover:border-violet-500/40 hover:text-white"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <form
              key="chat-form"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="border-t border-violet-500/15 p-3"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Zaftrix AI anything..."
                  className="flex-1 rounded-xl border border-violet-500/20 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-violet-500/50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  className="btn-primary flex h-10 w-10 items-center justify-center rounded-xl text-white transition-opacity disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 flex items-center justify-center gap-1 text-[10px] text-zinc-600">
                <Sparkles className="h-3 w-3" />
                Powered by Zaftrix Intelligence
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => {
          if (minimized) {
            setMinimized(false);
            setOpen(true);
          } else {
            setOpen(!open);
          }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn-primary fixed bottom-6 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-2xl text-white sm:right-6"
        aria-label="Open AI chat"
      >
        <AnimatePresence mode="wait">
          {open && !minimized ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span
            key="notification-badge"
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-400 text-[10px] font-bold text-black"
          >
            1
          </span>
        )}
      </motion.button>
    </>
  );
}

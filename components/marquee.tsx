"use client";

const brands = [
  "NVIDIA",
  "Stripe",
  "Shopify",
  "Notion",
  "Linear",
  "Vercel",
  "OpenAI",
  "Figma",
  "NVIDIA",
  "Stripe",
  "Shopify",
  "Notion",
  "Linear",
  "Vercel",
  "OpenAI",
  "Figma",
];

export function Marquee() {
  return (
    <section className="relative overflow-hidden border-y border-violet-500/10 py-12">
      <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-black to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-black to-transparent" />
      <div className="marquee-track flex w-max gap-16">
        {brands.map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="shrink-0 text-2xl font-bold tracking-wider text-white/15 transition-colors hover:text-violet-400/40"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}

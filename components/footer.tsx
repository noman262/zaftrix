import { Sparkles, X, Link2, Clapperboard } from "lucide-react";
import { Github } from "@/components/icons/github";

const footerLinks = {
  Services: ["Web Design", "AI Agents", "Automation", "SEO", "Dashboards"],
  Company: ["About", "Careers", "Blog", "Press", "Contact"],
  Resources: ["Free AI Tools", "Documentation", "Case Studies", "API"],
  Legal: ["Privacy", "Terms", "Security", "GDPR"],
};

const social = [
  { icon: X, href: "#", label: "X (Twitter)" },
  { icon: Link2, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Clapperboard, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-violet-500/10 bg-black pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-700">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Zaftrix
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              The global AI-powered digital agency platform. Engineering the
              future of business, one intelligent system at a time.
            </p>
            <div className="mt-6 flex gap-3">
              {social.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="glass flex h-10 w-10 items-center justify-center rounded-xl text-muted transition-all hover:border-violet-500/35 hover:text-violet-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white">{title}</h4>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={`${title}-${link}`}>
                    <a
                      href="#"
                      className="text-sm text-muted transition-colors hover:text-violet-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-violet-500/10 pt-8 sm:flex-row">
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} Zaftrix. All rights reserved.
          </p>
          <p className="text-sm text-zinc-600">
            Crafted with AI · Serving 120+ countries
          </p>
        </div>
      </div>
    </footer>
  );
}

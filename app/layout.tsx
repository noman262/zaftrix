import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zaftrix — Global AI-Powered Digital Agency",
  description:
    "Zaftrix builds world-class web experiences, autonomous AI agents, automation systems, SEO dominance, and intelligent dashboards for enterprises worldwide.",
  keywords: [
    "AI agency",
    "digital agency",
    "AI agents",
    "automation",
    "web design",
    "SEO",
  ],
  openGraph: {
    title: "Zaftrix — AI-Powered Digital Agency",
    description: "The future of digital excellence, powered by AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${dmSans.variable} min-h-screen bg-black text-zinc-50 antialiased`}
      >
        <div className="noise-overlay relative">{children}</div>
      </body>
    </html>
  );
}

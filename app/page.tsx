import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { HeroPreview } from "@/components/hero-preview";
import { Marquee } from "@/components/marquee";
import { Stats } from "@/components/stats";
import { Services } from "@/components/services";
import { AiTools } from "@/components/ai-tools";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { Chatbot } from "@/components/chatbot";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <HeroPreview />
        <Marquee />
        <Stats />
        <Services />
        <AiTools />
        <CTA />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

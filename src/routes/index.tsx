import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Ticker } from "@/components/layout/Ticker";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LiveRanking } from "@/components/landing/LiveRanking";
import { Metrics } from "@/components/landing/Metrics";
import { Pricing } from "@/components/landing/Pricing";
import { Builders } from "@/components/landing/Builders";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PainRadar — Inteligência de mercado em tempo real" },
      {
        name: "description",
        content:
          "Ranking semanal das melhores oportunidades de produto. Dados reais de Reddit, App Store e fóruns — com score, concorrência e stack sugerida.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Ticker />
      <main>
        <Hero />
        <HowItWorks />
        <LiveRanking />
        <Metrics />
        <Pricing />
        <Builders />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

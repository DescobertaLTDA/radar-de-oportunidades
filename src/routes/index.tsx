import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Ticker } from "@/components/layout/Ticker";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { Pain } from "@/components/landing/Pain";
import { Solution } from "@/components/landing/Solution";
import { SearchBar } from "@/components/landing/SearchBar";
import { AppGrid } from "@/components/landing/AppGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Metrics } from "@/components/landing/Metrics";
import { Pricing } from "@/components/landing/Pricing";
import { FinalCTA } from "@/components/landing/FinalCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PainRadar — Descubra oportunidades reais na Play Store" },
      {
        name: "description",
        content:
          "Analise reviews, ratings e reclamações reais para descobrir nichos com alta oportunidade — antes de escrever uma linha de código.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F0C]">
      <Navbar />
      <Ticker />
      <main>
        <Hero />
        <Pain />
        <Solution />
        <SearchBar />
        <AppGrid />
        <HowItWorks />
        <Metrics />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

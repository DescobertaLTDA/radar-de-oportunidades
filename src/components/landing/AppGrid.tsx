import { motion } from "framer-motion";
import { Star, Users, TrendingUp } from "lucide-react";
import { useState } from "react";
import { SCRAPED_APPS, type AppEntry } from "@/data/apps";

const ALL_CATS = ["Todos", ...Array.from(new Set(SCRAPED_APPS.map(a => a.category)))];

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

function OpTag({ pain }: { pain: number }) {
  if (pain >= 50) return (
    <span className="rounded-full bg-[#00FF88]/10 px-2 py-0.5 text-[10px] font-bold text-[#00FF88]">
      Alta oportunidade
    </span>
  );
  if (pain >= 38) return (
    <span className="rounded-full bg-[#FFAA00]/10 px-2 py-0.5 text-[10px] font-bold text-[#FFAA00]">
      Média oportunidade
    </span>
  );
  return (
    <span className="rounded-full bg-[#FF4444]/10 px-2 py-0.5 text-[10px] font-bold text-[#FF6666]">
      Saturado
    </span>
  );
}

function AppCard({ app, i }: { app: AppEntry; i: number }) {
  const [err, setErr] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: (i % 12) * 0.03 }}
      className="card-hover group cursor-pointer rounded-2xl border border-[#1F2A27]
                 bg-[#111615] p-4 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-start gap-3">
        {/* icon */}
        {!err ? (
          <img
            src={app.icon}
            alt={app.name}
            className="h-12 w-12 flex-shrink-0 rounded-2xl object-cover"
            onError={() => setErr(true)}
          />
        ) : (
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center
                          rounded-2xl bg-[#1F2A27] text-xl font-bold text-[#00FF88]">
            {app.name[0]}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <p className="truncate text-sm font-semibold text-[#E6F1EC]">{app.name}</p>
          </div>
          <p className="mt-0.5 text-[11px] text-[#5A7A6A]">{app.category}</p>

          <div className="mt-2 flex items-center gap-3 text-[11px] text-[#3A5A4A]">
            <span className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
              {app.rating}
            </span>
            <span className="flex items-center gap-0.5">
              <Users className="h-3 w-3" />
              {fmt(app.reviews)}
            </span>
            <span>{app.downloads}</span>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="mt-3 flex items-center justify-between border-t border-[#1F2A27] pt-3">
        <OpTag pain={app.pain} />
        <div className="flex items-center gap-1 text-xs font-bold text-[#00FF88]">
          <TrendingUp className="h-3 w-3" />
          {app.pain}
        </div>
      </div>
    </motion.div>
  );
}

const PAGE_SIZE = 12;

export function AppGrid() {
  const [cat, setCat] = useState("Todos");
  const [showAll, setShowAll] = useState(false);

  const filtered = cat === "Todos"
    ? SCRAPED_APPS
    : SCRAPED_APPS.filter(a => a.category === cat);

  const sorted = [...filtered].sort((a, b) => b.reviews - a.reviews);
  const visible = showAll ? sorted : sorted.slice(0, PAGE_SIZE);
  const hasMore = sorted.length > PAGE_SIZE && !showAll;

  function handleCatChange(c: string) {
    setCat(c);
    setShowAll(false);
  }

  return (
    <section id="apps" className="section-divider py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="label-caps text-[#00FF88]">Dados reais · Play Store</span>
          <h2 className="mt-3 text-3xl font-bold text-[#E6F1EC] sm:text-4xl">
            Apps reais. Dores reais.
          </h2>
          <p className="mt-3 text-[#5A7A6A]">
            Cada card mostra o score de oportunidade — calculado a partir de
            volume de reviews, rating e reclamações reais.
          </p>
        </div>

        {/* filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {ALL_CATS.map(c => (
            <button
              key={c}
              onClick={() => handleCatChange(c)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                cat === c
                  ? "bg-[#00FF88] text-[#0B0F0C] shadow-[var(--shadow-neon-btn)]"
                  : "border border-[#1F2A27] text-[#5A7A6A] hover:border-[#00FF88]/30 hover:text-[#E6F1EC]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((app, i) => <AppCard key={app.id} app={app} i={i} />)}
        </div>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="btn-ghost rounded-lg px-6 py-2.5 text-sm font-medium"
            >
              Ver todos os {sorted.length} apps
            </button>
          </div>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs text-[#3A5A4A]">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#00FF88]" />Alta oportunidade · score 50+
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FFAA00]" />Média · 35–49
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FF4444]" />Saturado · &lt;35
          </span>
        </div>
      </div>
    </section>
  );
}

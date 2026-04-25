import { motion } from "framer-motion";
import { Star, TrendingUp, TrendingDown, Minus, Users } from "lucide-react";
import { useState } from "react";
import { SCRAPED_APPS, type AppEntry } from "@/data/apps";

/* ── Helpers ─────────────────────────────────────────────────── */
const ALL_CATS = ["Todos", ...Array.from(new Set(SCRAPED_APPS.map(a => a.category)))];

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

function painColor(p: number) {
  if (p >= 50) return "text-red-500";
  if (p >= 40) return "text-orange-500";
  if (p >= 35) return "text-amber-500";
  return "text-[#635BFF]";
}

function painBg(p: number) {
  if (p >= 50) return "bg-red-50 text-red-600";
  if (p >= 40) return "bg-orange-50 text-orange-600";
  if (p >= 35) return "bg-amber-50 text-amber-600";
  return "bg-[#635BFF]/8 text-[#635BFF]";
}

function TrendChip({ value }: { value: string }) {
  const up   = value.startsWith("+");
  const none = value === "—";
  return (
    <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5
                      text-[10px] font-semibold ${
                        none ? "bg-gray-100 text-gray-400"
                      : up   ? "bg-green-50 text-green-700"
                             : "bg-red-50 text-red-600"}`}>
      {none ? <Minus className="h-2.5 w-2.5" /> :
       up   ? <TrendingUp className="h-2.5 w-2.5" /> :
              <TrendingDown className="h-2.5 w-2.5" />}
      {value}
    </span>
  );
}

function AppCard({ app, i }: { app: AppEntry; i: number }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: (i % 12) * 0.03 }}
      className="group flex items-start gap-3 rounded-2xl border border-border bg-card
                 p-4 shadow-[var(--shadow-card)] transition-all
                 hover:border-[#635BFF]/30 hover:shadow-[var(--shadow-glow)]"
    >
      {/* icon */}
      {!imgErr ? (
        <img
          src={app.icon}
          alt={app.name}
          className="h-12 w-12 flex-shrink-0 rounded-2xl object-cover shadow-sm"
          onError={() => setImgErr(true)}
        />
      ) : (
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center
                        rounded-2xl bg-[#635BFF]/10 text-lg font-bold text-[#635BFF]">
          {app.name[0]}
        </div>
      )}

      <div className="flex-1 min-w-0">
        {/* name + trend */}
        <div className="flex items-start justify-between gap-1">
          <p className="truncate text-sm font-semibold text-foreground leading-tight">
            {app.name}
          </p>
          <TrendChip value={app.trend} />
        </div>

        {/* category */}
        <p className="mt-0.5 text-[11px] text-muted-foreground">{app.category}</p>

        {/* stats */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              {app.rating}
            </span>
            <span className="inline-flex items-center gap-0.5">
              <Users className="h-3 w-3" />
              {fmt(app.reviews)} reviews
            </span>
          </div>
          <span className={`rounded-lg px-2 py-0.5 text-sm font-extrabold tabular-nums ${painBg(app.pain)}`}>
            {app.pain}
          </span>
        </div>

        {/* downloads bar */}
        <div className="mt-2 text-[10px] text-muted-foreground">
          {app.downloads} downloads
        </div>
      </div>
    </motion.div>
  );
}

export function AppGrid() {
  const [cat, setCat] = useState("Todos");

  const filtered = cat === "Todos"
    ? SCRAPED_APPS
    : SCRAPED_APPS.filter(a => a.category === cat);

  const sorted = [...filtered].sort((a, b) => b.reviews - a.reviews);

  return (
    <section id="apps" className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="label-caps text-primary">Radar ao vivo</span>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
            Apps reais. Dores reais.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Dados coletados direto do Google Play. O{" "}
            <strong className="text-foreground">Score Dor</strong> combina
            volume de reviews, rating e reclamações — quanto maior, maior a brecha.
          </p>
        </div>

        {/* category filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {ALL_CATS.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                cat === c
                  ? "bg-primary text-white shadow-[var(--shadow-glow)]"
                  : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((app, i) => (
            <AppCard key={app.id} app={app} i={i} />
          ))}
        </div>

        {/* legend */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500" />Score 50+ · Oportunidade crítica
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" />Score 35–49 · Alta insatisfação
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#635BFF]" />Score &lt;35 · Em observação
          </span>
        </div>
      </div>
    </section>
  );
}

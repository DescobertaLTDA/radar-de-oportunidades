import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Star, TrendingUp, AlertCircle } from "lucide-react";
import { SCRAPED_APPS } from "@/data/apps";

/* top 3 apps by reviews (most-complained) */
const TOP = [...SCRAPED_APPS]
  .sort((a, b) => b.reviews - a.reviews)
  .slice(0, 3);

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-bg">
      {/* grid + glow */}
      <div className="pointer-events-none absolute inset-0 hero-grid" />
      <div className="pointer-events-none absolute inset-0 hero-glow" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16
                      px-5 py-24 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:py-32">

        {/* ── LEFT: copy ─────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11 } } }}
        >
          {/* badge */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10
                       bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#635BFF] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#635BFF]" />
            </span>
            {fmt(SCRAPED_APPS.reduce((s, a) => s + a.reviews, 0))} reviews analisadas essa semana
          </motion.div>

          {/* headline */}
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white
                       sm:text-5xl lg:text-[3.6rem]"
          >
            Seu próximo produto já
            <br />
            existe.
            <span className="block mt-1 bg-gradient-to-r from-[#635BFF] to-[#A78BFA]
                             bg-clip-text text-transparent">
              Nas reviews de 1 estrela.
            </span>
          </motion.h1>

          {/* sub */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg"
          >
            O PainRadar varre milhões de avaliações do Google Play e App Store,
            calcula onde os usuários estão mais frustrados e entrega um ranking
            semanal de brechas de mercado — com score, downloads e stack sugerida.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/register"
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#635BFF] px-6
                         text-base font-semibold text-white shadow-[0_0_32px_-4px_#635BFF88]
                         transition-all hover:bg-[#4B44E0] hover:shadow-[0_0_40px_-4px_#635BFFAA]"
            >
              Ver ranking gratuito
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#apps"
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/15
                         px-5 text-base font-medium text-white/80 backdrop-blur-sm
                         transition-colors hover:border-white/30 hover:text-white"
            >
              Explorar apps
            </a>
          </motion.div>

          {/* trust */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            className="mt-8 flex flex-wrap items-center gap-5 text-xs text-white/40"
          >
            <span>✓ Sem cartão de crédito</span>
            <span>·</span>
            <span>✓ {SCRAPED_APPS.length}+ apps monitorados</span>
            <span>·</span>
            <span>✓ Atualizado toda semana</span>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: live dashboard card ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md
                       shadow-[var(--shadow-navy)]"
          >
            {/* card header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-[#635BFF]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  Maiores oportunidades · Ao vivo
                </span>
              </div>
              <span className="rounded-full bg-[#635BFF]/20 px-2 py-0.5 text-[10px]
                               font-bold text-[#A78BFA]">
                TOP PAIN
              </span>
            </div>

            {/* app rows */}
            <div className="space-y-2.5">
              {TOP.map((app, i) => (
                <div
                  key={app.id}
                  className="flex items-center gap-3 rounded-xl border border-white/8
                             bg-white/5 p-3 backdrop-blur-sm"
                >
                  <span className="w-5 text-center text-xs font-bold text-white/30">
                    #{i + 1}
                  </span>
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="h-9 w-9 flex-shrink-0 rounded-xl object-cover"
                    onError={(e) => {
                      const el = e.currentTarget;
                      el.style.display = "none";
                      const next = el.nextElementSibling as HTMLElement | null;
                      if (next) next.style.display = "flex";
                    }}
                  />
                  <div
                    className="hidden h-9 w-9 flex-shrink-0 items-center justify-center
                               rounded-xl bg-[#635BFF]/30 text-sm font-bold text-white"
                  >
                    {app.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{app.name}</p>
                    <div className="flex items-center gap-2 text-[11px] text-white/40">
                      <span className="inline-flex items-center gap-0.5">
                        <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                        {app.rating}
                      </span>
                      <span>·</span>
                      <span>{app.downloads} downloads</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="text-lg font-extrabold tabular-nums text-[#635BFF]">
                      {fmt(app.reviews)}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-white/30">reviews</span>
                  </div>
                </div>
              ))}
            </div>

            {/* card footer */}
            <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-3">
              <span className="text-[11px] text-white/35">
                {SCRAPED_APPS.length} apps · 12 nichos
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                <TrendingUp className="h-3 w-3" />
                Ranking atualizado hoje
              </span>
            </div>
          </motion.div>

          {/* floating pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="absolute -bottom-4 -left-4 rounded-xl border border-white/10
                       bg-[#0d2d4a] px-4 py-2.5 shadow-[var(--shadow-navy)]"
          >
            <p className="text-xs font-semibold text-white">
              📱 Google Play + App Store
            </p>
            <p className="text-[10px] text-white/45">2 lojas · dados em tempo real</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

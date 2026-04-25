import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Check, Play, Shield, Users, Zap, Star, TrendingUp, Download } from "lucide-react";

/* ── App icon placeholder ─────────────────────────────────────── */
function AppIcon({
  name,
  color,
  size = "md",
}: {
  name: string;
  color: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-12 w-12 text-base" };
  return (
    <div
      className={`${sizes[size]} flex flex-shrink-0 items-center justify-center rounded-xl font-bold text-white shadow-sm`}
      style={{ background: color }}
    >
      {name[0]}
    </div>
  );
}

/* ── Star rating ──────────────────────────────────────────────── */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
      <span className="text-xs font-medium text-foreground">{rating.toFixed(1)}</span>
    </span>
  );
}

const APPS = [
  { name: "Notion", category: "Produtividade", color: "#000000", rating: 3.8, downloads: "12M", pain: 91, trend: "+18%" },
  { name: "Robinhood", category: "Finanças", color: "#00C805", rating: 3.2, downloads: "8.4M", pain: 87, trend: "+9%" },
  { name: "Headspace", category: "Bem-estar", color: "#FF6B35", rating: 4.1, downloads: "5.1M", pain: 79, trend: "+6%" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute inset-0 radial-glow" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-28">
        {/* ── Left: copy ─────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-primary-muted px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]"
          >
            <Zap className="h-3.5 w-3.5 text-primary" />
            Inteligência de App Store em tempo real
          </motion.span>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Descubra onde os apps
            <br />
            <span className="bg-gradient-to-r from-primary to-[#0A2540] bg-clip-text text-transparent">
              estão falhando.
            </span>
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            O PainRadar monitora avaliações, reclamações e pedidos de milhões de usuários
            da App Store e Google Play — e entrega um ranking semanal das maiores brechas
            de mercado, prontas para você construir.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/register"
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-base font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-colors hover:bg-[var(--primary-hover)]"
            >
              Acessar grátis
            </Link>
            <a
              href="#features"
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-border bg-transparent px-5 text-base font-medium text-foreground transition-colors hover:bg-card"
            >
              <Play className="h-4 w-4" />
              Ver como funciona
            </a>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[var(--success)]" />
              Sem cartão de crédito
            </span>
            <span className="text-border">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
              2.400 founders
            </span>
            <span className="text-border">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
              Garantia 7 dias
            </span>
          </motion.div>
        </motion.div>

        {/* ── Right: App Store Intelligence mockup ───────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="label-caps text-[var(--text-secondary)]">App Store · Oportunidades ao vivo</span>
              </div>
            </div>

            {/* Column labels */}
            <div className="mb-2 grid grid-cols-[1fr_auto_auto_auto] gap-2 px-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              <span>App</span>
              <span className="text-right">Downloads</span>
              <span className="text-right">Rating</span>
              <span className="text-right">Score dor</span>
            </div>

            {/* App rows */}
            <div className="space-y-2">
              {APPS.map((app, i) => (
                <div
                  key={app.name}
                  className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-2 rounded-xl border border-border bg-[var(--bg-secondary)] px-3 py-2.5"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <AppIcon name={app.name} color={app.color} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{app.name}</p>
                      <p className="text-[11px] text-muted-foreground">{app.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Download className="h-3 w-3" />
                    {app.downloads}
                  </div>
                  <Stars rating={app.rating} />
                  <div className="text-right">
                    <span className="rounded-md bg-primary-muted px-2 py-0.5 text-sm font-bold text-primary">
                      {app.pain}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="text-xs text-muted-foreground">Atualizado há 2h · 48.320 reviews analisadas</span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--success)]">
                <TrendingUp className="h-3 w-3" />
                +12% esta semana
              </span>
            </div>
          </motion.div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="absolute -right-4 -top-4 rounded-xl border border-border bg-card px-3 py-2 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">📱</span>
              <div>
                <p className="text-[11px] font-semibold text-foreground">Google Play + App Store</p>
                <p className="text-[10px] text-muted-foreground">2 lojas monitoradas</p>
              </div>
            </div>
          </motion.div>

          <div className="pointer-events-none absolute -inset-10 -z-10 bg-primary/10 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Check,
  Play,
  Shield,
  Users,
  Zap,
  Radar,
  TrendingUp,
} from "lucide-react";
import { useMemo } from "react";

export function Hero() {
  // partículas estáticas (posições determinísticas para SSR)
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        x: (i * 37) % 100,
        y: (i * 53) % 100,
        d: 6 + ((i * 7) % 10),
        delay: (i % 8) * 0.4,
      })),
    []
  );

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Backgrounds */}
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute inset-0 radial-glow" />
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-foreground/30"
            style={{ left: `${p.x}%`, top: `${p.y}%`, opacity: 0.06 }}
            animate={{ y: [0, -14, 0], opacity: [0.04, 0.12, 0.04] }}
            transition={{
              duration: p.d,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-28">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-primary-muted px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]"
          >
            <Zap className="h-3.5 w-3.5 text-primary" />
            Inteligência de mercado em tempo real
          </motion.span>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0 },
            }}
            className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Pare de adivinhar.
            <br />
            <span className="bg-gradient-to-r from-foreground via-[var(--text-secondary)] to-primary bg-clip-text text-transparent">
              Construa o que o mercado está pedindo.
            </span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0 },
            }}
            className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            O PainRadar rastreia milhares de reclamações reais toda semana e
            entrega um ranking das melhores oportunidades de produto — com
            score, concorrência e stack sugerida.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0 },
            }}
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
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}
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

        {/* Mockup flutuante */}
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
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="label-caps text-[var(--text-secondary)]">
                  Ao vivo
                </span>
              </div>
              <Radar className="h-4 w-4 text-primary" />
            </div>

            <div className="space-y-3">
              {[
                { rank: 1, title: "Onboarding · Freelancers", score: 91 },
                { rank: 2, title: "Estoque · Restaurantes", score: 84 },
                { rank: 3, title: "Agendamento · Saúde", score: 79 },
              ].map((it) => (
                <div
                  key={it.rank}
                  className="flex items-center gap-3 rounded-lg border border-border bg-[var(--bg-secondary)] p-3"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-muted text-sm font-semibold text-primary">
                    #{it.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {it.title}
                    </p>
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-card">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${it.score}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-lg font-bold tabular-nums text-primary">
                    {it.score}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs text-muted-foreground">
                Atualizado há 3h
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-[var(--success)]">
                <TrendingUp className="h-3 w-3" />
                +12% esta semana
              </span>
            </div>
          </motion.div>

          {/* Glow blob */}
          <div className="pointer-events-none absolute -inset-10 -z-10 bg-primary/10 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}

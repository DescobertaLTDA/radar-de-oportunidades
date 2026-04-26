import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Users } from "lucide-react";
import { useEffect, useState } from "react";

/* ── Animated terminal ─────────────────────────────────────────── */
const STEPS = [
  { delay: 0,    text: '$ painradar analyze "app de treino"',   type: "cmd"     },
  { delay: 800,  text: "→ conectando à Play Store...",           type: "info"    },
  { delay: 1400, text: "✔ 2.481 reviews analisadas",            type: "success" },
  { delay: 1900, text: "✔ 134 reclamações detectadas",          type: "success" },
  { delay: 2400, text: "✔ concorrência: média (score 62/100)",  type: "success" },
  { delay: 2900, text: "✔ oportunidade identificada!",          type: "highlight"},
];

function Terminal() {
  const [visible, setVisible] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    STEPS.forEach((s, i) => {
      setTimeout(() => setVisible(v => [...v, i]), s.delay + 600);
    });
    setTimeout(() => setDone(true), 3600);
  }, []);

  const typeColor: Record<string, string> = {
    cmd:       "text-[#E6F1EC]",
    info:      "text-[#5A7A6A]",
    success:   "text-[#00FF88]",
    highlight: "text-[#00FF88] font-bold",
  };

  return (
    <div className="rounded-xl border border-[#1F2A27] bg-[#080C0A] p-5 font-mono text-sm
                    shadow-[0_0_60px_-12px_rgba(0,255,136,0.15)]">
      {/* traffic lights */}
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <span className="ml-3 text-[11px] text-[#3A5A4A]">painradar — terminal</span>
      </div>

      {/* lines */}
      <div className="space-y-1.5">
        {STEPS.map((s, i) => (
          <AnimatePresence key={i}>
            {visible.includes(i) && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className={typeColor[s.type]}
              >
                {s.text}
              </motion.div>
            )}
          </AnimatePresence>
        ))}
        {!done && (
          <span className="inline-block h-4 w-2 bg-[#00FF88] animate-[blink_1s_step-end_infinite]" />
        )}
      </div>

      {/* result panel */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-5 rounded-lg border border-[#1F2A27] bg-[#0E1311] p-4 space-y-3"
          >
            {/* score */}
            <div>
              <div className="mb-1.5 flex items-center justify-between text-[11px]">
                <span className="text-[#5A7A6A]">Score de Oportunidade</span>
                <span className="font-bold text-[#00FF88]">84 / 100</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#1F2A27]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "84%" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-[#00CC6A] to-[#00FF88]"
                />
              </div>
            </div>

            {/* competition */}
            <div>
              <div className="mb-1.5 flex items-center justify-between text-[11px]">
                <span className="text-[#5A7A6A]">Concorrência</span>
                <span className="font-bold text-[#FFAA00]">Média</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#1F2A27]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "52%" }}
                  transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                  className="h-full rounded-full bg-[#FFAA00]"
                />
              </div>
            </div>

            {/* mini cards */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { label: "Reviews",     value: "2.481",  color: "text-[#00FF88]" },
                { label: "Reclamações", value: "134",    color: "text-[#FF9944]" },
                { label: "Gap Score",   value: "Alta",   color: "text-[#00FF88]" },
              ].map(m => (
                <div key={m.label}
                     className="rounded-lg border border-[#1F2A27] bg-[#111615] p-2.5 text-center">
                  <p className={`text-base font-extrabold tabular-nums ${m.color}`}>{m.value}</p>
                  <p className="text-[10px] text-[#5A7A6A]">{m.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────── */
export function Hero() {
  const navigate = useNavigate();
  const handleCTA = () => navigate({ to: "/register" });
  return (
    <section className="relative overflow-hidden border-b border-[#1F2A27]
                        min-h-[calc(100vh-6.5rem)]">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute inset-0 radial-glow" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10
                      px-5 py-14 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-16">

        {/* ── LEFT ─────────────────────────────────────────────── */}
        <motion.div
          initial="h"
          animate="s"
          variants={{ h:{}, s:{ transition:{ staggerChildren:0.10 } } }}
        >
          {/* badge */}
          <motion.div
            variants={{ h:{ opacity:0, y:8 }, s:{ opacity:1, y:0 } }}
            className="inline-flex items-center gap-2 rounded-full border border-[#1F2A27]
                       bg-[#111615] px-3.5 py-1.5 text-xs font-medium text-[#5A9E7A]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00FF88] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00FF88]" />
            </span>
            +1 milhão de reviews analisadas
          </motion.div>

          {/* headline */}
          <motion.h1
            variants={{ h:{ opacity:0, y:18 }, s:{ opacity:1, y:0 } }}
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight
                       text-[#E6F1EC] sm:text-5xl lg:text-[3.5rem]"
          >
            Pare de criar apps
            <br />
            <span className="text-[#00FF88]">no escuro.</span>
          </motion.h1>

          {/* sub */}
          <motion.p
            variants={{ h:{ opacity:0, y:16 }, s:{ opacity:1, y:0 } }}
            className="mt-5 max-w-lg text-base leading-relaxed text-[#5A7A6A] sm:text-lg"
          >
            Use dados reais da Play Store, App Store, Reddit e X para descobrir
            o que vale a pena construir — antes de escrever uma linha de código.
          </motion.p>

          {/* bullets */}
          <motion.ul
            variants={{ h:{ opacity:0, y:14 }, s:{ opacity:1, y:0 } }}
            className="mt-6 space-y-2.5"
          >
            {[
              "Descubra reclamações reais de usuários",
              "Veja quem domina o mercado (e quem não domina)",
              "Encontre oportunidades que ninguém está vendo",
            ].map(t => (
              <li key={t} className="flex items-center gap-2.5 text-sm text-[#7A9E8E]">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[#00FF88]" />
                {t}
              </li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            variants={{ h:{ opacity:0, y:14 }, s:{ opacity:1, y:0 } }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={handleCTA}
              className="btn-neon inline-flex h-12 items-center gap-2 rounded-lg px-6 text-base"
            >
              Analisar minha ideia agora
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#buscar"
              className="btn-ghost inline-flex h-12 items-center gap-2 rounded-lg px-5 text-base"
            >
              Ver exemplo real
            </a>
          </motion.div>

          {/* trust bar */}
          <motion.div
            variants={{ h:{ opacity:0 }, s:{ opacity:1 } }}
            className="mt-8 flex flex-wrap items-center gap-5 text-xs text-[#3A5A4A]"
          >
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              3.000+ founders usando
            </span>
            <span>·</span>
            <span>✓ Sem cartão de crédito</span>
            <span>·</span>
            <span>✓ Cancele quando quiser</span>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: terminal ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <Terminal />
          <div className="pointer-events-none absolute -inset-16 -z-10
                          bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.06),transparent_70%)]" />
        </motion.div>
      </div>
    </section>
  );
}

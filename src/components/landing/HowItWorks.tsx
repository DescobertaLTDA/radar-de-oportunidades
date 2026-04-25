import { motion } from "framer-motion";
import { Cpu, Search, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    n: "01",
    title: "Rastreamos",
    desc: "Monitoramos Reddit, App Store, G2, fóruns e redes sociais em busca de dores reais e reclamações frequentes.",
  },
  {
    icon: Cpu,
    n: "02",
    title: "Analisamos",
    desc: "Nossa IA agrupa, classifica e pontua cada oportunidade por volume de dor, concorrência e potencial de monetização.",
  },
  {
    icon: TrendingUp,
    n: "03",
    title: "Entregamos",
    desc: "Você recebe um ranking semanal das melhores lacunas de mercado, com tudo que precisa para começar a construir.",
  },
];

export function HowItWorks() {
  return (
    <section id="features" className="relative border-b border-border py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="label-caps text-primary">Como funciona</span>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Do ruído à oportunidade — em segundos
          </h2>
          <p className="mt-4 text-muted-foreground">
            Um motor de dados rodando 24/7 para você nunca mais construir
            no escuro.
          </p>
        </div>

        <div className="relative mt-16 grid gap-6 lg:grid-cols-3">
          {/* linha conectora */}
          <svg
            className="pointer-events-none absolute left-0 right-0 top-12 hidden lg:block"
            height="2"
            width="100%"
            preserveAspectRatio="none"
          >
            <line
              x1="15%"
              x2="85%"
              y1="1"
              y2="1"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 6"
              className="text-border"
            />
          </svg>

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-muted text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <span className="label-caps text-muted-foreground">{s.n}</span>
              <h3 className="mt-1 text-xl font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Search, Zap, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    n: "01",
    title: "Digite sua ideia",
    desc: "Escreva um nicho ou ideia de app. Pode ser vago — nosso motor entende o contexto e já sabe onde procurar.",
  },
  {
    icon: Zap,
    n: "02",
    title: "Receba os dados",
    desc: "Em segundos você vê reviews reais, score de dor, concorrência e volume de reclamações dos apps existentes.",
  },
  {
    icon: Rocket,
    n: "03",
    title: "Descubra a oportunidade",
    desc: "Nosso score mostra se o nicho está aberto, saturado ou com uma janela clara. Você decide com dados, não com achismo.",
  },
];

export function HowItWorks() {
  return (
    <section id="features" className="section-divider py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="label-caps text-[#00FF88]">Como funciona</span>
          <h2 className="mt-3 text-3xl font-bold text-[#E6F1EC] sm:text-4xl">
            Três passos. Decisão certa.
          </h2>
          <p className="mt-4 text-[#5A7A6A]">
            Do zero à clareza em menos de 60 segundos.
          </p>
        </div>

        <div className="relative grid gap-6 lg:grid-cols-3">
          {/* connector line */}
          <svg
            className="pointer-events-none absolute left-0 right-0 top-12 hidden lg:block"
            height="2"
            width="100%"
            preserveAspectRatio="none"
          >
            <line
              x1="16%" x2="84%" y1="1" y2="1"
              stroke="#1F2A27" strokeWidth="1" strokeDasharray="5 7"
            />
          </svg>

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="relative rounded-2xl border border-[#1F2A27] bg-[#111615]
                         p-6 shadow-[var(--shadow-card)]"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center
                              rounded-xl bg-[#00FF88]/10">
                <s.icon className="h-5 w-5 text-[#00FF88]" />
              </div>
              <span className="label-caps text-[#3A5A4A]">{s.n}</span>
              <h3 className="mt-1 text-lg font-bold text-[#E6F1EC]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5A7A6A]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

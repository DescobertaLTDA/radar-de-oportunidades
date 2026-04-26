import { motion } from "framer-motion";
import { MessageSquare, BarChart2, Lightbulb } from "lucide-react";

const BLOCKS = [
  {
    icon: MessageSquare,
    title: "Reclamações reais",
    desc: "Agregamos centenas de reviews negativas por app e mostramos exatamente o que os usuários odeiam — em linguagem simples, sem filtro.",
    tag: "Play Store · App Store",
  },
  {
    icon: BarChart2,
    title: "Concorrência analisada",
    desc: "Veja o volume de downloads, avaliações e score de saturação de cada player. Saiba antes de começar se o nicho está aberto ou fechado.",
    tag: "Score de saturação",
  },
  {
    icon: Lightbulb,
    title: "Oportunidades ocultas",
    desc: "Cruzamos reclamações com volume de busca e concorrência fraca para entregar os nichos onde você tem mais chance de vencer.",
    tag: "Alta oportunidade",
  },
];

export function Solution() {
  return (
    <section className="section-divider py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="label-caps text-[#00FF88]">A solução</span>
          <h2 className="mt-3 text-3xl font-bold text-[#E6F1EC] sm:text-4xl">
            Dados que apontam para onde
            <br />
            <span className="text-[#00FF88]">o dinheiro está.</span>
          </h2>
          <p className="mt-4 text-[#5A7A6A]">
            Três lentes de análise para você entrar em qualquer nicho
            com vantagem competitiva real.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {BLOCKS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card-hover rounded-2xl border border-[#1F2A27] bg-[#111615] p-6
                         shadow-[var(--shadow-card)]"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center
                              rounded-xl bg-[#00FF88]/10">
                <b.icon className="h-5 w-5 text-[#00FF88]" />
              </div>
              <span className="rounded-full border border-[#1F2A27] px-2.5 py-0.5
                               text-[10px] font-semibold text-[#5A9E7A]">
                {b.tag}
              </span>
              <h3 className="mt-3 text-lg font-bold text-[#E6F1EC]">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5A7A6A]">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Check, Lock, ShieldCheck, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";

const plans = [
  {
    id: "explorar",
    name: "Explorar",
    price: "Grátis",
    priceNote: "para sempre",
    desc: "Valide a ideia antes de investir.",
    features: [
      { text: "Top 5 apps por nicho",            on: true  },
      { text: "Score de oportunidade parcial",    on: true  },
      { text: "Filtro por categoria",             on: true  },
      { text: "1 análise por dia",                on: true  },
      { text: "Relatório completo de reviews",    on: false },
      { text: "Alertas de nicho",                 on: false },
      { text: "Exportar dados (CSV/JSON)",        on: false },
    ],
    cta: "Começar grátis",
    href: "/register",
    featured: false,
  },
  {
    id: "validar",
    name: "Validar",
    price: "R$39",
    priceNote: "/mês",
    desc: "Para founders que decidem com dados.",
    features: [
      { text: "Todos os apps e nichos",           on: true  },
      { text: "Score completo (dor + concorrência)", on: true },
      { text: "Reclamações reais por app",        on: true  },
      { text: "Análises ilimitadas",              on: true  },
      { text: "Relatório completo de reviews",    on: true  },
      { text: "3 alertas de nicho",               on: true  },
      { text: "Exportar dados (CSV/JSON)",        on: false },
    ],
    cta: "Assinar agora",
    href: "/register",
    featured: true,
  },
  {
    id: "dominar",
    name: "Dominar",
    price: "R$97",
    priceNote: "/mês",
    desc: "Para times e builders sérios.",
    features: [
      { text: "Tudo do Validar",                  on: true  },
      { text: "Alertas ilimitados",               on: true  },
      { text: "Exportar dados (CSV/JSON)",         on: true  },
      { text: "API de acesso aos dados",          on: true  },
      { text: "Histórico 12 meses",               on: true  },
      { text: "5 usuários por conta",             on: true  },
      { text: "Suporte via WhatsApp",             on: true  },
    ],
    cta: "Falar com a equipe",
    href: "/register",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="section-divider py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="label-caps text-[#00FF88]">Preços</span>
          <h2 className="mt-3 text-3xl font-bold text-[#E6F1EC] sm:text-4xl">
            Simples. Sem surpresa.
          </h2>
          <p className="mt-3 text-[#5A7A6A]">
            Comece grátis. Escale quando precisar. Cancele quando quiser.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 lg:items-start">
          {plans.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl border p-6
                shadow-[var(--shadow-card)] ${
                p.featured
                  ? "border-[#00FF88]/50 bg-[#111615] shadow-[var(--shadow-glow)] lg:scale-[1.04]"
                  : "border-[#1F2A27] bg-[#111615]"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2
                                 rounded-full bg-[#00FF88] px-3.5 py-1
                                 text-[11px] font-bold text-[#0B0F0C]">
                  Mais popular
                </span>
              )}

              <h3 className="text-lg font-bold text-[#E6F1EC]">{p.name}</h3>
              <p className="mt-0.5 text-xs text-[#5A7A6A]">{p.desc}</p>

              <div className="mt-5 flex items-baseline gap-1.5">
                <span className={`text-4xl font-extrabold ${
                  p.featured ? "text-[#00FF88]" : "text-[#E6F1EC]"
                }`}>
                  {p.price}
                </span>
                <span className="text-sm text-[#5A7A6A]">{p.priceNote}</span>
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {p.features.map(f => (
                  <li key={f.text} className="flex items-start gap-2 text-sm">
                    {f.on ? (
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#00FF88]" />
                    ) : (
                      <Lock className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#3A5A4A]" />
                    )}
                    <span className={f.on ? "text-[#B0C8BC]" : "text-[#3A5A4A]"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to={p.href as "/register"}
                className={`mt-7 inline-flex h-11 items-center justify-center gap-2
                            rounded-lg px-5 text-sm font-bold transition-all ${
                  p.featured
                    ? "btn-neon"
                    : "border border-[#1F2A27] text-[#7A9E8E] hover:border-[#00FF88]/30 hover:text-[#E6F1EC]"
                }`}
              >
                {p.featured && <Zap className="h-3.5 w-3.5" />}
                {p.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2.5 rounded-xl
                        border border-[#1F2A27] bg-[#0E1311] p-4 text-sm text-[#5A7A6A]">
          <ShieldCheck className="h-5 w-5 flex-shrink-0 text-[#00FF88]" />
          <p>
            <span className="font-semibold text-[#E6F1EC]">Garantia de 7 dias.</span>{" "}
            Se não encontrar pelo menos uma oportunidade útil, devolvemos 100%.
          </p>
        </div>
      </div>
    </section>
  );
}

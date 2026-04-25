import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Lock, ShieldCheck, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    desc: "Para validar a ideia.",
    features: [
      { text: "Top 2 oportunidades da semana", on: true },
      { text: "Score parcial", on: true },
      { text: "Comunidade pública", on: true },
      { text: "Relatório mensal", on: true },
      { text: "Stack técnica sugerida", on: false },
      { text: "Estimativa de receita", on: false },
      { text: "Alertas de nicho", on: false },
    ],
    cta: "Começar grátis",
    featured: false,
  },
  {
    name: "Pro",
    price: { monthly: 97, yearly: 67 },
    desc: "Para founders sérios.",
    features: [
      { text: "Ranking completo (40+/sem)", on: true },
      { text: "Score completo: dor + concorrência + monetização", on: true },
      { text: "Stack técnica sugerida", on: true },
      { text: "Estimativa de receita mensal", on: true },
      { text: "3 alertas de nicho personalizados", on: true },
      { text: "Co-founder matching", on: true },
      { text: "Histórico 90 dias", on: true },
    ],
    cta: "Assinar Pro",
    featured: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 497, yearly: 347 },
    desc: "Para times e investidores.",
    features: [
      { text: "Tudo do Pro", on: true },
      { text: "Relatórios customizados por segmento", on: true },
      { text: "API de acesso aos dados", on: true },
      { text: "Alertas ilimitados", on: true },
      { text: "Histórico 12 meses", on: true },
      { text: "5 usuários por conta", on: true },
      { text: "Suporte via WhatsApp", on: true },
    ],
    cta: "Falar com a equipe",
    featured: false,
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="border-b border-border py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="label-caps text-primary">Preços</span>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Simples. Sem surpresa.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Escolha mensal ou anual. Cancele quando quiser.
          </p>

          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-border bg-card p-1">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                !yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              Anual
              <span className="ml-2 rounded-full bg-[var(--success)]/20 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--success)]">
                -30%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => {
            const price = yearly ? p.price.yearly : p.price.monthly;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative flex flex-col rounded-xl border bg-card p-6 ${
                  p.featured
                    ? "border-primary shadow-[var(--shadow-glow)] lg:scale-[1.03]"
                    : "border-border"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Mais popular
                  </span>
                )}
                <h3 className="text-xl font-semibold text-foreground">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    R${price}
                  </span>
                  <span className="text-sm text-muted-foreground">/mês</span>
                </div>
                {yearly && p.price.monthly > 0 && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    cobrado anualmente
                  </p>
                )}

                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {p.features.map((f) => (
                    <li
                      key={f.text}
                      className="flex items-start gap-2 text-sm"
                    >
                      {f.on ? (
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--success)]" />
                      ) : (
                        <Lock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      )}
                      <span
                        className={
                          f.on ? "text-foreground" : "text-muted-foreground"
                        }
                      >
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-7 inline-flex h-11 items-center justify-center gap-1.5 rounded-md px-5 text-sm font-medium transition-colors ${
                    p.featured
                      ? "bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]"
                      : "border border-border bg-transparent text-foreground hover:bg-[var(--bg-secondary)]"
                  }`}
                >
                  {p.featured && <Sparkles className="h-3.5 w-3.5" />}
                  {p.cta}
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 rounded-xl border border-border bg-[var(--bg-secondary)] p-4 text-sm text-muted-foreground">
          <ShieldCheck className="h-5 w-5 shrink-0 text-[var(--success)]" />
          <p>
            <span className="text-foreground font-medium">Garantia de 7 dias.</span>{" "}
            Se não encontrar pelo menos uma ideia que valha seu tempo, devolvemos 100%.
          </p>
        </div>
      </div>
    </section>
  );
}

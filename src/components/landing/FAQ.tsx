import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Como o PainRadar encontra as dores?",
    a: "Monitoramos continuamente Reddit, App Store, G2, fóruns de nicho e redes sociais. Nossa IA agrupa e classifica reclamações reais, identificando padrões e dores recorrentes que você não veria sozinho.",
  },
  {
    q: "Os dados são em tempo real?",
    a: "Sim. Nosso motor processa novas menções a cada poucas horas. O ranking é atualizado várias vezes por semana e você vê o número de menções em tempo real em cada oportunidade.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Claro. Não há contrato de fidelidade. Cancele em um clique, do próprio dashboard, e ainda tem 7 dias de garantia incondicional no plano Pro.",
  },
  {
    q: "O plano Free tem limite de uso?",
    a: "O Free libera as 2 melhores oportunidades da semana, com score parcial. Para acessar o ranking completo, stack sugerida e estimativa de receita, é necessário assinar o Pro.",
  },
  {
    q: "O PainRadar funciona para qualquer nicho?",
    a: "Hoje temos cobertura forte em SaaS, B2B, ferramentas para autônomos, saúde, educação, finanças e PME. Você pode filtrar por nicho e configurar alertas personalizados nos planos pagos.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-b border-border py-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="mb-10 text-center">
          <span className="label-caps text-primary">FAQ</span>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
            Perguntas frequentes
          </h2>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-xl border border-border bg-card px-5 last:border-b"
            >
              <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

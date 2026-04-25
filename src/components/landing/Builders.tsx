import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { builders } from "@/data/mockOpportunities";

export function Builders() {
  return (
    <section id="builders" className="border-b border-border bg-[var(--bg-secondary)] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="label-caps text-primary">Builders</span>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
            Produtos reais lançados com ideias do PainRadar
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {builders.map((b, i) => (
            <motion.article
              key={b.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <Quote className="h-5 w-5 text-primary" />
              <p className="mt-4 flex-1 text-foreground leading-relaxed">
                {b.quote}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {b.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{b.name}</p>
                  <p className="text-xs text-muted-foreground">{b.role}</p>
                </div>
              </div>
              <span className="mt-4 inline-flex w-fit rounded-full border border-border bg-[var(--bg-secondary)] px-2.5 py-1 text-xs text-[var(--text-secondary)]">
                {b.opportunity}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

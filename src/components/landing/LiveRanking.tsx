import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { OpportunityCard } from "@/components/dashboard/OpportunityCard";
import { opportunities } from "@/data/mockOpportunities";

export function LiveRanking() {
  const visible = opportunities.slice(0, 2);
  const locked = opportunities[3];

  return (
    <section className="relative border-b border-border bg-[var(--bg-secondary)] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span className="label-caps text-[var(--text-secondary)]">Ao vivo</span>
            </div>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              O que está em alta esta semana
            </h2>
          </div>
          <Link
            to="/register"
            className="hidden h-10 items-center rounded-md border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-background sm:inline-flex"
          >
            Ver ranking completo
          </Link>
        </div>

        <div className="grid gap-5">
          {visible.map((o, i) => (
            <motion.div
              key={o.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <OpportunityCard opportunity={o} featured={i === 0} />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <OpportunityCard opportunity={locked} />
          </motion.div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/register"
            className="inline-flex h-12 items-center rounded-lg bg-primary px-7 text-base font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-colors hover:bg-[var(--primary-hover)]"
          >
            Ver ranking completo — grátis
          </Link>
        </div>
      </div>
    </section>
  );
}

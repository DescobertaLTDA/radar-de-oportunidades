import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="section-divider relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="pointer-events-none absolute inset-0 radial-glow" />

      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="label-caps text-[#00FF88]">Comece agora</span>
          <h2 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight
                         text-[#E6F1EC] sm:text-5xl lg:text-6xl">
            Sua próxima ideia já existe.
            <br />
            <span className="text-[#00FF88]">Só falta você encontrá-la.</span>
          </h2>
          <p className="mt-5 text-base text-[#5A7A6A] sm:text-lg">
            Founders que validam antes de construir chegam ao mercado
            3× mais rápido e com 2× mais chance de tração.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/register"
              className="btn-neon inline-flex h-14 w-full items-center justify-center
                         gap-2 rounded-xl px-8 text-base sm:w-auto"
            >
              Analisar minha ideia agora
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#apps"
              className="btn-ghost inline-flex h-14 w-full items-center justify-center
                         gap-2 rounded-xl px-6 text-base sm:w-auto"
            >
              Ver apps analisados
            </a>
          </div>

          <p className="mt-5 text-xs text-[#3A5A4A]">
            Sem cartão de crédito · Resultado em segundos · Cancele quando quiser
          </p>
        </motion.div>
      </div>
    </section>
  );
}

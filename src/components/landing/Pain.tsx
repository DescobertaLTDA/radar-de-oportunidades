import { motion } from "framer-motion";
import { XCircle, CheckCircle2 } from "lucide-react";

const WITHOUT = [
  "Meses desenvolvendo algo que ninguém quer",
  "Ideia boa que já existe com 50k avaliações",
  "Nicho saturado que parece oportunidade",
  "Feedback real chegando tarde demais",
];

const WITH = [
  "Você valida a ideia antes de escrever código",
  "Vê quem já domina o mercado e quem não domina",
  "Descobre reclamações reais de usuários ativos",
  "Age antes da janela de oportunidade fechar",
];

export function Pain() {
  return (
    <section className="section-divider py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="label-caps text-[#00FF88]">O problema</span>
          <h2 className="mt-3 text-3xl font-bold text-[#E6F1EC] sm:text-4xl">
            A maioria dos apps falha
            <br />
            <span className="text-[#FF4444]">antes mesmo de nascer.</span>
          </h2>
          <p className="mt-4 text-[#5A7A6A]">
            9 em cada 10 apps são abandonados nos primeiros 6 meses. O motivo
            quase sempre é o mesmo — decisões tomadas sem dados.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Sem dados */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-[#FF4444]/20 bg-[#FF4444]/5 p-6"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#FF6666]">
              Sem validação
            </p>
            <ul className="space-y-3">
              {WITHOUT.map(t => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-[#7A9E8E]">
                  <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FF4444]" />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Com PainRadar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-[#00FF88]/20 bg-[#00FF88]/5 p-6"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#00FF88]">
              Com PainRadar
            </p>
            <ul className="space-y-3">
              {WITH.map(t => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-[#7A9E8E]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#00FF88]" />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

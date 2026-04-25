import { Link } from "@tanstack/react-router";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-secondary)] py-24">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute inset-0 radial-glow" />
      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h2 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
          Sua próxima ideia já existe.
          <br />
          <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Só falta você encontrá-la.
          </span>
        </h2>
        <div className="mt-10 flex justify-center">
          <Link
            to="/register"
            className="inline-flex h-14 items-center rounded-lg bg-primary px-8 text-lg font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-colors hover:bg-[var(--primary-hover)]"
          >
            Acessar grátis agora
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Sem cartão de crédito · Cancela quando quiser
        </p>
      </div>
    </section>
  );
}

import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[var(--bg-secondary)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Inteligência de mercado em tempo real. Encontre a próxima
            oportunidade — antes da concorrência.
          </p>
        </div>

        <div>
          <h4 className="label-caps mb-4 text-foreground">Produto</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#features" className="hover:text-foreground">Como funciona</a></li>
            <li><a href="#pricing" className="hover:text-foreground">Preços</a></li>
            <li><a href="#builders" className="hover:text-foreground">Builders</a></li>
            <li><Link to="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="label-caps mb-4 text-foreground">Empresa</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Sobre</a></li>
            <li><a href="#" className="hover:text-foreground">Blog</a></li>
            <li><a href="#" className="hover:text-foreground">Privacidade</a></li>
            <li><a href="#" className="hover:text-foreground">Termos</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row lg:px-8">
          <p>© 2025 PainRadar. Todos os direitos reservados.</p>
          <p>Feito para founders que constroem com dados.</p>
        </div>
      </div>
    </footer>
  );
}

import { Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useAuth } from "@/lib/auth";
import { LogOut, Sparkles } from "lucide-react";

export function AppNavbar({ plan = "Free" }: { plan?: "Free" | "Pro" }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const initials = (user?.email ?? "?")
    .split("@")[0]
    .slice(0, 2)
    .toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              to="/dashboard"
              className="text-sm font-medium text-foreground"
              activeProps={{ className: "text-primary" }}
            >
              Descobrir
            </Link>
            <a className="text-sm text-muted-foreground hover:text-foreground" href="#">
              Meus alertas
            </a>
            <a className="text-sm text-muted-foreground hover:text-foreground" href="#">
              Builders
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`label-caps hidden rounded-full px-2.5 py-1 sm:inline-flex ${
              plan === "Pro"
                ? "bg-primary-muted text-primary"
                : "bg-card text-muted-foreground border border-border"
            }`}
          >
            {plan}
          </span>
          {plan === "Free" && (
            <button className="hidden h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-[var(--primary-hover)] sm:inline-flex">
              <Sparkles className="h-3.5 w-3.5" />
              Upgrade
            </button>
          )}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-muted text-sm font-semibold text-primary">
            {initials}
          </div>
          <button
            aria-label="Sair"
            onClick={handleSignOut}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

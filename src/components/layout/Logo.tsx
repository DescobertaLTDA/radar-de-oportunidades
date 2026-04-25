import { Link } from "@tanstack/react-router";
import { Radar } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2 font-bold text-lg tracking-tight ${className}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-muted text-primary">
        <Radar className="h-4 w-4" strokeWidth={2.5} />
      </span>
      <span className="text-foreground">
        Pain<span className="text-primary">Radar</span>
      </span>
    </Link>
  );
}

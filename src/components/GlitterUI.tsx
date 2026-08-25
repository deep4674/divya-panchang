import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlitterCard({
  title,
  icon,
  children,
  className,
}: {
  title?: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("glitter-panel sparkle rounded-2xl p-4 sm:p-5", className)}>
      {title ? (
        <h2 className="mb-3 flex items-center gap-2 text-lg sm:text-xl">
          {icon}
          <span className="glitter-text font-bold">{title}</span>
        </h2>
      ) : null}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

export function InfoRow({
  label,
  value,
  hint,
}: {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-primary/25 py-2 last:border-b-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-right text-sm font-semibold text-primary sm:text-base">
        {value}
        {hint ? <span className="block text-xs font-normal text-foreground/80">{hint}</span> : null}
      </span>
    </div>
  );
}

export function Pill({
  children,
  tone = "gold",
}: {
  children: ReactNode;
  tone?: "gold" | "magenta" | "emerald" | "saffron";
}) {
  const tones = {
    gold: "bg-primary/25 text-primary border-primary/60",
    magenta: "bg-magenta/25 text-foreground border-magenta/70",
    emerald: "bg-emerald/25 text-foreground border-emerald/70",
    saffron: "bg-saffron/25 text-foreground border-saffron/70",
  } as const;
  return (
    <span
      className={cn(
        "inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h1 className="glitter-text text-2xl font-bold sm:text-4xl">{children}</h1>;
}

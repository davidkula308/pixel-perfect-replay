import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/services";

export function ServiceCard({ s }: { s: Service }) {
  const Icon = s.icon;
  return (
    <article className="group flex flex-col rounded-lg border border-border bg-card p-6 shadow-card transition-transform hover:-translate-y-1">
      <span className="grid size-11 place-items-center rounded-md bg-secondary text-primary"><Icon className="size-5" /></span>
      <h3 className="mt-5 text-xl font-semibold text-primary">{s.name}</h3>
      {s.packageLabel && <p className="mt-2 text-xs font-semibold uppercase text-accent">{s.packageLabel}</p>}
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
      {s.category === "Career Packages" && <><ul className="mt-4 space-y-2 text-sm text-foreground">{s.deliverables.map((item) => <li key={item} className="border-t border-border pt-2">{item}</li>)}</ul><p className="mt-5 font-semibold text-primary">{s.price}</p></>}
      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild size="sm" className="h-auto min-h-9 whitespace-normal text-center"><Link to="/order" search={{ service: s.slug }}>{s.orderLabel ?? "Order Service Now"}</Link></Button>
        <Button asChild size="sm" variant="ghost">
          <Link to="/services/$slug" params={{ slug: s.slug }}>Learn More <ArrowRight /></Link>
        </Button>
      </div>
    </article>
  );
}

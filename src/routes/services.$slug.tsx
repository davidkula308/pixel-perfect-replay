import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHero, WaButton } from "@/components/site/Layout";
import { ServiceCard } from "@/components/site/ServiceCard";
import { activeServices, getService } from "@/lib/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = getService(params.slug);
    if (!s) throw notFound();
    return { slug: s.slug, name: s.name, short: s.short };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
          { title: `${loaderData.name} | HR Services` },
          { name: "description", content: loaderData.short },
          { property: "og:title", content: loaderData.name },
          { property: "og:description", content: loaderData.short },
        ]
      : [{ title: "Service unavailable" }, { name: "robots", content: "noindex" }],
  }),
  component: Detail,
});

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary">{title}</h2>
      <ul className="mt-4 space-y-2">
        {items.map((i) => <li key={i} className="flex gap-3 text-foreground"><Check className="mt-0.5 size-4 shrink-0 text-accent" />{i}</li>)}
      </ul>
    </div>
  );
}

function Detail() {
  const { slug } = Route.useLoaderData();
  const s = getService(slug);
  if (!s) throw notFound();
  const related = activeServices.filter((r) => r.slug !== s.slug && r.category === s.category).slice(0, 3);
  return (
    <>
      <PageHero eyebrow={s.category} title={s.name} intro={s.short}>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="gold" size="lg" className="h-auto min-h-11 whitespace-normal"><Link to="/order" search={{ service: s.slug }}>{s.orderLabel ?? "Order Service Now"}</Link></Button>
          <WaButton message={s.whatsapp} />
        </div>
      </PageHero>
      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-12">
          <List title="Challenges this addresses" items={s.problems} />
          <List title="What's included" items={s.deliverables} />
          <List title="What you may need to provide" items={s.provide} />
          <div>
            <h2 className="text-2xl font-semibold text-primary">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="mt-4">
              {s.faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q}><AccordionTrigger>{f.q}</AccordionTrigger><AccordionContent>{f.a}</AccordionContent></AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <aside className="h-fit rounded-lg border border-border bg-card p-6 shadow-card lg:sticky lg:top-24">
          <p className="eyebrow">Pricing</p>
          <p className="mt-2 font-display text-2xl font-semibold text-primary">{s.price}</p>
          <p className="mt-2 text-sm text-muted-foreground">For: {s.audience.join(" & ")}</p>
          <p className="mt-1 text-sm text-muted-foreground">Timeframe agreed during consultation.</p>
          <Button asChild className="mt-6 h-auto min-h-10 w-full whitespace-normal text-center"><Link to="/order" search={{ service: s.slug }}>{s.orderLabel ?? "Order Service Now"}</Link></Button>
        </aside>
      </section>
      {related.length > 0 && (
        <section className="bg-secondary py-16">
          <div className="container-page">
            <h2 className="text-3xl font-semibold text-primary">Related services</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">{related.map((r) => <ServiceCard key={r.slug} s={r} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}

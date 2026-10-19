import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHero } from "@/components/site/Layout";
import { ServiceCard } from "@/components/site/ServiceCard";
import { activeServices, serviceCategories } from "@/lib/services";

export const Route = createFileRoute("/services/")({
  validateSearch: z.object({ category: z.enum(serviceCategories).optional() }),
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "HR Services Directory | Recruitment, Consultancy & More" },
      { name: "description", content: "Browse our HR services: recruitment, staffing, consultancy, payroll, training, performance and career support." },
      { property: "og:title", content: "HR Services Directory" },
      { property: "og:description", content: "Find the HR service that fits your organization or career." },
    ],
  }),
  component: ServicesPage,
});

const cats = ["All", ...serviceCategories] as const;

function ServicesPage() {
  const [q, setQ] = useState("");
  const { category } = Route.useSearch();
  const cat = category ?? "All";
  const navigate = Route.useNavigate();
  const list = activeServices.filter(
    (s) => (cat === "All" || s.category === cat) &&
      (s.name + s.short + s.deliverables.join(" ")).toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <>
      <PageHero eyebrow="Services" title="HR services for organizations and individuals" intro="Prices are shared after we understand your scope. Every service starts with a free inquiry." />
      <section className="container-page py-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Service categories">
            {cats.map((c) => (
              <Button key={c} onClick={() => navigate({ search: { category: c === "All" ? undefined : c } })} aria-pressed={cat === c}
                variant={cat === c ? "default" : "outline"} size="sm" className="h-auto min-h-9 whitespace-normal text-left">{c}</Button>
            ))}
          </div>
          <div className="relative shrink-0 md:w-64">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services" className="pl-9" aria-label="Search services" />
          </div>
        </div>
        {list.length ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((s) => <ServiceCard key={s.slug} s={s} />)}</div>
        ) : (
          <p className="mt-16 text-center text-muted-foreground">No services match your search. Try another keyword or contact us.</p>
        )}
      </section>
    </>
  );
}

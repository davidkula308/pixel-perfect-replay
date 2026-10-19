import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHero, WaButton } from "@/components/site/Layout";
import { ServiceCard } from "@/components/site/ServiceCard";
import { activeServices } from "@/lib/services";
import { waMessages } from "@/lib/site";

export const Route = createFileRoute("/employers")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "HR Services for Employers | Recruitment & Workforce" },
      { name: "description", content: "Recruitment, staffing, HR consultancy and workforce solutions for organizations." },
      { property: "og:title", content: "HR Services for Employers" },
      { property: "og:description", content: "Find talent and strengthen your HR function." },
    ],
  }),
  component: Employers,
});

const faqs = [
  { q: "How do we start?", a: "Submit a request or message us on WhatsApp. We'll schedule a short discussion to understand your needs." },
  { q: "Can you handle a single vacancy?", a: "Yes. You can engage us for one role or for ongoing recruitment." },
  { q: "How is candidate information handled?", a: "Information is used only for the recruitment purpose it was shared for." },
];

function Employers() {
  const biz = activeServices.filter((s) => s.audience.includes("Business"));
  return (
    <>
      <PageHero eyebrow="Employers" title="HR support that lets you focus on your business" intro="From a single hire to a full HR review, scoped to your organization.">
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="gold" size="lg"><Link to="/order">Request HR Services</Link></Button>
          <WaButton message={waMessages.employers} label="Discuss Your Requirements on WhatsApp" />
        </div>
      </PageHero>
      <section className="container-page py-16">
        <h2 className="text-3xl font-semibold text-primary">Services for organizations</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{biz.map((s) => <ServiceCard key={s.slug} s={s} />)}</div>
      </section>
      <section className="bg-secondary py-16">
        <div className="container-page max-w-3xl">
          <h2 className="text-3xl font-semibold text-primary">Employer FAQs</h2>
          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((f) => <AccordionItem key={f.q} value={f.q}><AccordionTrigger>{f.q}</AccordionTrigger><AccordionContent>{f.a}</AccordionContent></AccordionItem>)}
          </Accordion>
        </div>
      </section>
    </>
  );
}

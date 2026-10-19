import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Layout";
import interview from "@/assets/interview.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "About Us | HR Solutions Partner" },
      { name: "description", content: "Our mission, vision, values and the clients we serve." },
      { property: "og:title", content: "About Us" },
      { property: "og:description", content: "An HR partner for organizations and job seekers." },
    ],
  }),
  component: About,
});

const values = ["Integrity", "Confidentiality", "Professionalism", "Responsiveness", "Respect for people"];
const clients = ["Small and growing businesses", "Established companies", "Non-profit organizations", "Individual job seekers"];

function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="An HR partner built around people" intro="Company introduction to be supplied by the firm. This text is a placeholder." />
      <section className="container-page grid items-center gap-12 py-16 md:grid-cols-2">
        <img src={interview} alt="HR consultant in conversation with a candidate" loading="lazy" width={1200} height={912} className="rounded-lg shadow-card" />
        <div className="space-y-8">
          <div><p className="eyebrow">Mission</p><p className="mt-2 text-xl text-primary">To help organizations find, develop and retain the right people through practical HR support.</p></div>
          <div><p className="eyebrow">Vision</p><p className="mt-2 text-xl text-primary">Workplaces where people and businesses grow together.</p></div>
          <div><p className="eyebrow">HR philosophy</p><p className="mt-2 text-muted-foreground">Good HR is clear, fair and human. We listen first, then recommend solutions that fit your context.</p></div>
        </div>
      </section>
      <section className="bg-secondary py-16">
        <div className="container-page grid gap-12 md:grid-cols-2">
          <div><h2 className="text-3xl font-semibold text-primary">Core values</h2>
            <ul className="mt-6 flex flex-wrap gap-2">{values.map((v) => <li key={v} className="rounded-full border border-primary/20 bg-card px-4 py-2 text-sm font-medium">{v}</li>)}</ul></div>
          <div><h2 className="text-3xl font-semibold text-primary">Who we serve</h2>
            <ul className="mt-6 space-y-2 text-foreground">{clients.map((c) => <li key={c} className="border-b border-border pb-2">{c}</li>)}</ul></div>
        </div>
      </section>
      <section className="container-page py-16 text-center">
        <h2 className="text-3xl font-semibold text-primary">Ready to talk about your HR needs?</h2>
        <Button asChild variant="gold" size="lg" className="mt-6"><Link to="/order">Request a Service</Link></Button>
      </section>
    </>
  );
}

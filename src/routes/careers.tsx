import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, WaButton } from "@/components/site/Layout";
import { waMessages } from "@/lib/site";
import { activeServices, serviceCategories } from "@/lib/services";
import { ServiceCard } from "@/components/site/ServiceCard";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Career & Professional Development | HR Solutions" },
      { name: "description", content: "Explore CV writing, cover letters, LinkedIn optimization, interview preparation and career planning." },
      { property: "og:title", content: "Career & Professional Development" },
      { property: "og:description", content: "Career services and packages for students, graduates and experienced professionals." },
    ],
  }),
  component: Careers,
});

// Vacancies will be managed by the firm once listings are provided.
const jobs: { title: string; location: string; type: string }[] = [];

function Careers() {
  return (
    <>
      <PageHero eyebrow="Careers" title="Career & professional development" intro="Professional documents, interview preparation and career guidance for your next opportunity.">
        <div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="gold" size="lg"><Link to="/career-packages">Explore Career Packages</Link></Button><WaButton message={waMessages.careers} label="Discuss Your Career" /></div>
      </PageHero>
      <section className="container-page py-16">
        <div className="flex flex-wrap gap-3">{serviceCategories.slice(1).map((category) => <Button key={category} asChild variant="outline" className="h-auto min-h-10 whitespace-normal"><Link to="/services" search={{ category }}>{category}</Link></Button>)}</div>
        <h2 className="mt-10 text-3xl font-semibold text-primary">Support for your next step</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{activeServices.filter((s) => ["cv-writing", "cover-letter", "linkedin-optimization", "interview-preparation", "job-search-assistance", "career-planning"].includes(s.slug)).map((s) => <ServiceCard key={s.slug} s={s} />)}</div>
        <p className="mt-8 max-w-3xl text-sm text-muted-foreground">All documents reflect your actual qualifications and experience. We do not fabricate credentials, employment history, references or achievements.</p>
      </section>
      <section className="container-page py-16">
        {jobs.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-card p-12 text-center">
            <Briefcase className="mx-auto size-8 text-accent" />
            <h2 className="mt-4 text-2xl font-semibold text-primary">No open vacancies right now</h2>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">New roles are posted regularly. Ask us about upcoming opportunities, or get your CV ready in the meantime.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <WaButton message={waMessages.careers} label="Ask About Vacancies" />
              <Button asChild variant="outline" size="lg"><Link to="/services/$slug" params={{ slug: "cv-writing" }}>CV & Career Support</Link></Button>
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}

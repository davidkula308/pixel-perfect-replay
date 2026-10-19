import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";
import { ServiceCard } from "@/components/site/ServiceCard";
import { activeServices } from "@/lib/services";

export const Route = createFileRoute("/career-packages")({
  head: () => ({ meta: [
    { title: "Career Packages | CV, Graduate & Executive Support" },
    { name: "description", content: "Compare CV Essentials, Job Application, Career Boost, Graduate Launch and Executive Career packages. Request a quote for tailored career support." },
    { property: "og:title", content: "Career Packages | HR Solutions" },
    { property: "og:description", content: "Career document and coaching packages for students, graduates, job seekers and executives." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: CareerPackages,
});

function CareerPackages() {
  return <>
    <PageHero eyebrow="Career Packages" title="Career support, brought together" intro="From a first CV to your next leadership role. Request a quote for the package that fits your goals." />
    <section className="container-page py-14">
      <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">{activeServices.filter((s) => s.category === "Career Packages").map((s) => <ServiceCard key={s.slug} s={s} />)}</div>
      <p className="mt-8 text-sm text-muted-foreground">Scope and pricing are confirmed before engagement. No payment is collected on this website.</p>
    </section>
  </>;
}
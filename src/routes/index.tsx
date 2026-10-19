import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Sparkles, MessagesSquare, Layers, HeartHandshake, UserSearch, Building2, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/site/ServiceCard";
import { WaButton } from "@/components/site/Layout";
import { activeServices } from "@/lib/services";
import { waMessages, waLink } from "@/lib/site";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "People First. Business Forward. | HR Solutions" },
      { name: "description", content: "Recruitment, staffing, HR consultancy, payroll support and career services for organizations and job seekers." },
      { property: "og:title", content: "People First. Business Forward." },
      { property: "og:description", content: "Practical HR solutions to find talent, build stronger teams and manage your workforce." },
    ],
  }),
  component: Home,
});

const commitments = [
  { icon: UserSearch, t: "Professional recruitment support", d: "A structured process from vacancy to shortlist." },
  { icon: Sparkles, t: "Tailored HR solutions", d: "Scoped to your organization, not one-size-fits-all." },
  { icon: MessagesSquare, t: "Efficient communication", d: "Clear updates through the channel you prefer." },
  { icon: ShieldCheck, t: "Confidential handling", d: "Candidate and employer information treated with care." },
  { icon: Layers, t: "Flexible service options", d: "Engage us for a single task or ongoing support." },
  { icon: HeartHandshake, t: "Client-focused support", d: "We start by understanding what you actually need." },
];
const steps = [
  "Choose the HR service you need.",
  "Review the service details and submit an inquiry.",
  "Discuss requirements, scope, and pricing with the HR team.",
  "Confirm the engagement and proceed with service delivery.",
];

function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img src={hero} alt="HR consultant welcoming a new client in a modern office" width={1600} height={1008}
          className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/30" />
        <div className="container-page relative py-24 md:py-36 fade-up">
          <p className="eyebrow">Human Resources Partner</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] md:text-7xl">People First.<br />Business Forward.</h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
            Practical human resource solutions that help organizations find the right talent, build stronger teams, and manage their workforce effectively.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="lg"><Link to="/services">Explore Our Services</Link></Button>
            <Button asChild variant="onDark" size="lg"><a href={waLink(waMessages.general)} target="_blank" rel="noopener noreferrer">Talk to Our Team</a></Button>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow">What we do</p><h2 className="mt-2 text-4xl font-semibold text-primary">Our services</h2></div>
          <Button asChild variant="outline"><Link to="/services">View all services</Link></Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeServices.slice(0, 6).map((s) => <ServiceCard key={s.slug} s={s} />)}
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="container-page">
          <p className="eyebrow">Our commitments</p>
          <h2 className="mt-2 max-w-xl text-4xl font-semibold text-primary">How we intend to work with you</h2>
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {commitments.map(({ icon: I, t, d }) => (
              <div key={t} className="border-t border-primary/15 pt-5">
                <I className="size-5 text-accent" />
                <h3 className="mt-3 text-lg font-semibold text-primary">{t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <p className="eyebrow">How it works</p>
        <h2 className="mt-2 text-4xl font-semibold text-primary">Four simple steps</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s} className="rounded-lg border border-border bg-card p-6">
              <span className="font-display text-4xl font-semibold text-accent">0{i + 1}</span>
              <p className="mt-3 text-sm font-medium text-foreground">{s}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page grid gap-6 pb-20 md:grid-cols-2">
        <div className="rounded-lg bg-primary p-10 text-primary-foreground">
          <Building2 className="size-7 text-accent" />
          <h3 className="mt-4 text-3xl font-semibold">For employers</h3>
          <p className="mt-2 text-primary-foreground/75">Recruitment, staffing, consultancy and HR administration for your organization.</p>
          <Button asChild variant="gold" className="mt-6"><Link to="/employers">I Need HR Services</Link></Button>
        </div>
        <div className="rounded-lg border border-border bg-card p-10">
          <UserRound className="size-7 text-accent" />
          <h3 className="mt-4 text-3xl font-semibold text-primary">For job seekers</h3>
          <p className="mt-2 text-muted-foreground">Browse vacancies, get CV support and prepare for your next role.</p>
          <Button asChild className="mt-6"><Link to="/careers">I'm Looking for a Job</Link></Button>
          <Button asChild variant="outline" className="ml-2 mt-6"><Link to="/career-packages">Career Packages</Link></Button>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-page py-20 text-center">
          <h2 className="mx-auto max-w-2xl text-4xl font-semibold md:text-5xl">Let's Find the Right HR Solution for You.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="gold" size="lg"><Link to="/order">Order a Service Now</Link></Button>
            <WaButton message={waMessages.general} />
          </div>
        </div>
      </section>
    </>
  );
}

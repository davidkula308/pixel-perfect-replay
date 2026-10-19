import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "HR Resources & Insights" },
      { name: "description", content: "Practical guidance on recruitment, CVs, interviews and managing people." },
      { property: "og:title", content: "HR Resources & Insights" },
      { property: "og:description", content: "Practical HR guidance for employers and job seekers." },
    ],
  }),
  component: Resources,
});

const tips = [
  { tag: "CV writing", t: "Lead with results", d: "Under each role, list two or three achievements with numbers where possible, not just duties." },
  { tag: "Interviews", t: "Prepare three stories", d: "Have short examples ready of a challenge, a success and a time you worked in a team." },
  { tag: "Recruitment", t: "Write clear job descriptions", d: "State must-have requirements separately from nice-to-haves to attract the right applicants." },
  { tag: "Employee management", t: "Hold regular check-ins", d: "Short, frequent conversations catch issues earlier than annual reviews." },
  { tag: "Workplace policy", t: "Put policies in writing", d: "Documented leave, conduct and grievance policies reduce misunderstandings." },
  { tag: "Employer guide", t: "Plan onboarding", d: "A structured first week helps new hires become productive faster." },
];

function Resources() {
  return (
    <>
      <PageHero eyebrow="Insights" title="Resources for employers and job seekers" intro="Quick, practical guidance. Full articles coming soon." />
      <section className="container-page grid gap-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((x) => (
          <article key={x.t} className="rounded-lg border border-border bg-card p-6 shadow-card">
            <p className="eyebrow">{x.tag}</p>
            <h2 className="mt-3 text-xl font-semibold text-primary">{x.t}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
          </article>
        ))}
      </section>
    </>
  );
}

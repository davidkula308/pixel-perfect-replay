import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Terms and Conditions | HR Solutions" },
      { name: "description", content: "Terms for using this website and submitting service requests." },
      { property: "og:title", content: "Terms and Conditions" },
      { property: "og:description", content: "Website and service request terms." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Terms and Conditions" intro="Draft terms — to be reviewed by the firm before publishing." />
      <section className="container-page max-w-3xl space-y-4 py-14 text-foreground">
        <p>Submitting a request on this website is an inquiry only and does not create a binding engagement.</p>
        <p>Scope, pricing and timelines are agreed in writing before any service begins.</p>
        <p>Content on this website is general information and not legal advice.</p>
      </section>
    </>
  ),
});

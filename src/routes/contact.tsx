import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHero, WaButton } from "@/components/site/Layout";
import { site, waLink, waMessages } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Contact Us | Talk to Our HR Team" },
      { name: "description", content: "Reach our HR team on WhatsApp or phone at +254 722 493288." },
      { property: "og:title", content: "Contact Our HR Team" },
      { property: "og:description", content: "Chat with us on WhatsApp or send a message." },
    ],
  }),
  component: Contact,
});

const categories = ["Recruitment", "Staffing", "HR consultancy", "Payroll and HR administration", "Employee training", "CV writing and career support", "Job opportunities", "General inquiry", "Other"];
const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  phone: z.string().trim().regex(/^\+?[0-9\s-]{7,20}$/, "Enter a valid phone number"),
  category: z.string(),
  message: z.string().trim().min(5, "Enter a message").max(1000),
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as string] ??= i.message));
      return setErrors(errs);
    }
    setErrors({});
    const msg = `Hello, I am contacting you through your website.\nName: ${r.data.name}\nPhone: ${r.data.phone}\nTopic: ${r.data.category}\n${r.data.message}`;
    window.open(waLink(msg), "_blank", "noopener");
  }
  const err = (k: string) => errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>;
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk">
        <div className="mt-8"><WaButton message={waMessages.contact} label="Chat With Us on WhatsApp" /></div>
      </PageHero>
      <section className="container-page grid gap-12 py-16 md:grid-cols-[1fr_1.4fr]">
        <ul className="space-y-6">
          <li className="flex gap-4"><Phone className="size-5 text-accent" /><div><p className="font-semibold text-primary">Phone & WhatsApp</p><a href={`tel:+${site.whatsapp}`} className="text-muted-foreground">{site.phoneDisplay}</a></div></li>
          <li className="flex gap-4"><Mail className="size-5 text-accent" /><div><p className="font-semibold text-primary">Email</p><p className="text-muted-foreground">{site.email}</p></div></li>
          <li className="flex gap-4"><MapPin className="size-5 text-accent" /><div><p className="font-semibold text-primary">Office</p><p className="text-muted-foreground">{site.address}</p></div></li>
        </ul>
        <form onSubmit={submit} noValidate className="grid gap-4 rounded-lg border border-border bg-card p-6 shadow-card">
          <div><Label htmlFor="name">Name</Label><Input id="name" name="name" maxLength={100} />{err("name")}</div>
          <div><Label htmlFor="phone">Phone number</Label><Input id="phone" name="phone" type="tel" />{err("phone")}</div>
          <div><Label htmlFor="category">Inquiry category</Label>
            <select id="category" name="category" className="flex h-10 w-full rounded-md border border-input bg-card px-3 text-sm">{categories.map((c) => <option key={c}>{c}</option>)}</select></div>
          <div><Label htmlFor="message">Message</Label><Textarea id="message" name="message" rows={5} maxLength={1000} />{err("message")}</div>
          <Button type="submit" size="lg">Send via WhatsApp</Button>
          <p className="text-xs text-muted-foreground">Your message opens in WhatsApp so you can review it before sending.</p>
        </form>
      </section>
    </>
  );
}

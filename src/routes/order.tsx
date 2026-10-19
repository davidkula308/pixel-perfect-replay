import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHero, WaButton } from "@/components/site/Layout";
import { activeServices, getService } from "@/lib/services";
import { orderSchema, orderMessage, type OrderInput } from "@/lib/order";
import { makeReference } from "@/lib/site";

export const Route = createFileRoute("/order")({
  validateSearch: z.object({ service: z.string().optional() }),
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Order an HR Service | Request a Quote" },
      { name: "description", content: "Submit a free request for any of our HR services. We'll review it and confirm next steps." },
      { property: "og:title", content: "Order an HR Service" },
      { property: "og:description", content: "Free, no-obligation service request." },
    ],
  }),
  component: OrderPage,
});

const fieldCls = "flex h-10 w-full rounded-md border border-input bg-card px-3 text-sm";

function OrderPage() {
  const { service } = Route.useSearch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<{ ref: string; date: string; data: OrderInput; name: string } | null>(null);
  const [type, setType] = useState<"Individual" | "Business">(getService(service ?? "")?.audience[0] ?? "Business");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = orderSchema.safeParse({ ...f, consent: f["consent"] === "on" });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] ??= i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    const name = getService(parsed.data.service)?.name ?? parsed.data.service;
    setDone({ ref: makeReference(), date: new Date().toLocaleDateString(), data: parsed.data, name });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (done) {
    return (
      <section className="container-page max-w-2xl py-20">
        <div className="rounded-lg border border-border bg-card p-8 shadow-card fade-up">
          <CheckCircle2 className="size-10 text-whatsapp" />
          <h1 className="mt-4 text-3xl font-semibold text-primary">Request ready</h1>
          <p className="mt-2 text-muted-foreground">Send it to our team on WhatsApp to complete your request. We'll review it and confirm the next steps, scope and pricing. No payment is taken.</p>
          <dl className="mt-6 grid grid-cols-[9rem_1fr] gap-y-2 text-sm">
            <dt className="text-muted-foreground">Reference</dt><dd className="font-semibold">{done.ref}</dd>
            <dt className="text-muted-foreground">Service</dt><dd>{done.name}</dd>
            <dt className="text-muted-foreground">Date</dt><dd>{done.date}</dd>
            <dt className="text-muted-foreground">Name</dt><dd>{done.data.fullName}</dd>
            <dt className="text-muted-foreground">Contact by</dt><dd>{done.data.contactMethod}</dd>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <WaButton message={orderMessage(done.name, done.ref, done.data)} label="Send Request on WhatsApp" />
            <Button asChild variant="outline" size="lg"><Link to="/services">Back to services</Link></Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">If WhatsApp doesn't open, call us on +254 722 493288 and quote your reference.</p>
        </div>
      </section>
    );
  }

  const err = (k: string) => errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>;
  return (
    <>
      <PageHero eyebrow="Order a service" title="Tell us what you need" intro="Submitting a request is free and doesn't commit you to anything." />
      <section className="container-page max-w-3xl py-14">
        <form onSubmit={submit} noValidate className="grid gap-5 rounded-lg border border-border bg-card p-6 shadow-card md:grid-cols-2 md:p-8">
          <div className="md:col-span-2">
            <Label htmlFor="service">Service</Label>
            <select id="service" name="service" defaultValue={service ?? ""} className={fieldCls}>
              <option value="" disabled>Select a service</option>
              {activeServices.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
            </select>{err("service")}
          </div>
          <fieldset className="md:col-span-2">
            <legend className="text-sm font-medium">I am</legend>
            <div className="mt-2 flex gap-3">
              {(["Business", "Individual"] as const).map((t) => (
                <label key={t} className={`flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-sm ${type === t ? "border-primary bg-secondary" : "border-input"}`}>
                  <input type="radio" name="customerType" value={t} checked={type === t} onChange={() => setType(t)} className="accent-primary" />
                  {t === "Business" ? "A business / organization" : "An individual"}
                </label>
              ))}
            </div>
          </fieldset>
          <div><Label htmlFor="fullName">Full name</Label><Input id="fullName" name="fullName" maxLength={100} />{err("fullName")}</div>
          {type === "Business" && <div><Label htmlFor="company">Organization</Label><Input id="company" name="company" maxLength={150} />{err("company")}</div>}
          <div><Label htmlFor="phone">Phone number</Label><Input id="phone" name="phone" type="tel" placeholder="+254 ..." />{err("phone")}</div>
          <div><Label htmlFor="email">Email (optional)</Label><Input id="email" name="email" type="email" />{err("email")}</div>
          <div>
            <Label htmlFor="contactMethod">Preferred contact</Label>
            <select id="contactMethod" name="contactMethod" className={fieldCls}><option>WhatsApp</option><option>Phone call</option><option>Email</option></select>
          </div>
          <div><Label htmlFor="startDate">Preferred start date</Label><Input id="startDate" name="startDate" type="date" /></div>
          <div><Label htmlFor="budget">Budget range (optional)</Label><Input id="budget" name="budget" maxLength={60} /></div>
          <div className="md:col-span-2"><Label htmlFor="requirements">Your requirements</Label><Textarea id="requirements" name="requirements" rows={5} maxLength={1500} />{err("requirements")}</div>
          <div className="md:col-span-2">
            <label className="flex items-start gap-2 text-sm"><input type="checkbox" name="consent" className="mt-1 accent-primary" />
              <span>I agree to the <Link to="/privacy" className="underline">privacy notice</Link> and consent to being contacted about this request.</span></label>
            {err("consent")}
          </div>
          <Button type="submit" size="lg" className="md:col-span-2">Submit Request</Button>
        </form>
      </section>
    </>
  );
}

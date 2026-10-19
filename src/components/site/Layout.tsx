import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, MessageCircle, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site, waLink, waMessages } from "@/lib/site";
import { activeServices, serviceCategories } from "@/lib/services";
import logo from "@/assets/logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/employers", label: "Employers" },
  { to: "/careers", label: "Careers" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
] as const;

function Logo({ light }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className={`grid size-10 place-items-center rounded-md ${light ? "bg-primary-foreground p-1" : ""}`}>
        <img src={logo} alt="" width={40} height={40} className="h-full w-full object-contain" />
      </span>
      <span className={`font-display text-lg font-semibold ${light ? "text-primary-foreground" : "text-primary"}`}>{site.name}</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((n) => (
            n.to === "/services" ? <details key={n.to} className="relative"><summary className="flex cursor-pointer list-none items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground">Services<ChevronDown className="size-3" /></summary><div className="absolute left-0 top-full w-72 rounded-md border border-border bg-background p-2 shadow-card"><Link to="/services" className="block rounded-md px-3 py-2 text-sm text-primary">All Services</Link>{serviceCategories.map((category) => <Link key={category} to="/services" search={{ category }} onClick={(e) => e.currentTarget.closest("details")?.removeAttribute("open")} className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-primary">{category}</Link>)}</div></details> :
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
              activeProps={{ className: "text-primary" }}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="gold" className="hidden sm:inline-flex"><Link to="/order">Order a Service</Link></Button>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background lg:hidden" aria-label="Mobile">
          <div className="container-page flex flex-col py-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2.5 font-medium text-foreground">{n.label}</Link>
            ))}
            {serviceCategories.map((category) => <Link key={category} to="/services" search={{ category }} onClick={() => setOpen(false)} className="py-2 pl-3 text-sm text-muted-foreground">{category}</Link>)}
            <Button asChild variant="gold" className="mt-2"><Link to="/order" onClick={() => setOpen(false)}>Order a Service</Link></Button>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm text-primary-foreground/70">Practical HR solutions for organizations and job seekers.</p>
        </div>
        <div>
          <h3 className="eyebrow mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {nav.slice(1).map((n) => <li key={n.to}><Link to={n.to} className="hover:text-accent">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="eyebrow mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {activeServices.slice(0, 6).map((s) => (
              <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-accent">{s.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="eyebrow mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex gap-2"><Phone className="size-4 text-accent" /><a href={`tel:+${site.whatsapp}`}>{site.phoneDisplay}</a></li>
            <li className="flex gap-2"><MessageCircle className="size-4 text-accent" /><a href={waLink(waMessages.general)} target="_blank" rel="noopener noreferrer">WhatsApp us</a></li>
            <li className="flex gap-2"><Mail className="size-4 text-accent" />{site.email}</li>
            <li className="flex gap-2"><MapPin className="size-4 text-accent" />{site.address}</li>
            {site.hours && <li>{site.hours}</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-accent">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a href={waLink(waMessages.general)} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-card transition-transform hover:scale-105">
      <MessageCircle className="size-7" />
    </a>
  );
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: ReactNode }) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-page py-16 md:py-20 fade-up">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold md:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-primary-foreground/75">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function WaButton({ message, label = "Contact Us on WhatsApp", size = "lg" as const }: { message: string; label?: string; size?: "lg" | "default" | "sm" }) {
  return (
    <Button asChild variant="whatsapp" size={size}>
      <a href={waLink(message)} target="_blank" rel="noopener noreferrer"><MessageCircle />{label}</a>
    </Button>
  );
}

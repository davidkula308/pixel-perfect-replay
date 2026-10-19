// Configurable company settings. Replace placeholders once the client confirms them.
export const site = {
  name: "Your HR Firm",
  tagline: "People First. Business Forward.",
  phoneDisplay: "+254 722 493288",
  whatsapp: "254722493288",
  email: "info@yourhrfirm.example", // placeholder
  address: "Office address to be confirmed", // placeholder
  hours: "", // shown only when provided
  socials: [] as { label: string; href: string }[],
};

export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const waMessages = {
  general: "Hello, I visited your website and would like to learn more about your HR services.",
  contact: "Hello, I am contacting you through your website and would like assistance with your HR services.",
  careers: "Hello, I am contacting you regarding career opportunities and available job vacancies.",
  employers: "Hello, I represent an organization and would like to discuss your HR services for employers.",
};

export function makeReference(date = new Date()) {
  const d = date.toISOString().slice(0, 10).replace(/-/g, "");
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `HR-${d}-${r}`;
}

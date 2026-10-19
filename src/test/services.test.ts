import { describe, expect, it } from "vitest";
import { activeServices, getService, serviceCategories } from "@/lib/services";
import { orderMessage, orderSchema } from "@/lib/order";
import { waLink } from "@/lib/site";

describe("career catalogue rules", () => {
  it("keeps all five requested packages quote-only", () => {
    const packages = activeServices.filter((s) => s.category === "Career Packages");
    expect(packages.map((s) => s.slug)).toEqual(["cv-essentials", "job-application-package", "career-boost", "graduate-launch", "executive-career"]);
    for (const s of packages) expect(s.price).toBe("Request a Quote");
  });
  it("uses the five requested categories", () => {
    expect(serviceCategories).toEqual(["Corporate HR Solutions", "Career & Professional Development", "Graduate & Student Services", "Professional Documents", "Career Packages"]);
    expect(activeServices.every((s) => serviceCategories.includes(s.category))).toBe(true);
  });
  it("makes every addition individually orderable with its own WhatsApp inquiry", () => {
    expect(new Set(activeServices.map((s) => s.slug)).size).toBe(activeServices.length);
    expect(activeServices).toHaveLength(36);
    for (const s of activeServices.filter((s) => s.audience.includes("Individual"))) {
      expect(getService(s.slug)?.name).toBe(s.name);
      const link = new URL(waLink(s.whatsapp));
      expect(link.pathname).toBe("/254722493288");
      if (s.slug !== "custom") expect(link.searchParams.get("text")).toContain(s.name);
    }
  });
  it("accepts a package request and preserves its selection in the outgoing message", () => {
    const data = orderSchema.parse({ service: "career-boost", customerType: "Individual", fullName: "Jane Doe", phone: "+254 700 000000", contactMethod: "WhatsApp", requirements: "Prepare for my next career move", consent: true });
    const s = getService(data.service);
    expect(s?.name).toBe("Career Boost Package");
    expect(orderMessage(s?.name ?? "", "HR-123", data)).toContain("Career Boost Package");
  });
});
import { describe, expect, it } from "vitest";
import { orderSchema } from "@/lib/order";
import { waLink } from "@/lib/site";

const base = { service: "recruitment", customerType: "Individual", fullName: "Jane Doe", phone: "+254 700 000000", contactMethod: "WhatsApp", requirements: "Need help hiring two staff", consent: true };

describe("order rules", () => {
  it("requires organization name for businesses", () => {
    expect(orderSchema.safeParse({ ...base, customerType: "Business" }).success).toBe(false);
  });
  it("requires privacy consent", () => {
    expect(orderSchema.safeParse({ ...base, consent: false }).success).toBe(false);
  });
  it("sends WhatsApp to +254 722 493288", () => {
    expect(waLink("hi")).toBe("https://wa.me/254722493288?text=hi");
  });
});

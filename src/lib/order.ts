import { z } from "zod";

export const orderSchema = z.object({
  service: z.string().min(1, "Choose a service"),
  customerType: z.enum(["Individual", "Business"]),
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  phone: z.string().trim().regex(/^\+?[0-9\s-]{7,20}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(255).optional().or(z.literal("")),
  contactMethod: z.enum(["WhatsApp", "Phone call", "Email"]),
  requirements: z.string().trim().min(10, "Describe your needs in a few words").max(1500),
  startDate: z.string().optional(),
  budget: z.string().max(60).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept the privacy notice" }) }),
}).refine((d) => d.customerType === "Individual" || (d.company && d.company.length > 1), {
  message: "Enter your organization name", path: ["company"],
});

export type OrderInput = z.infer<typeof orderSchema>;

export function orderMessage(serviceName: string, ref: string, d: OrderInput) {
  return [
    `Hello, I would like to order your ${serviceName} service.`,
    `Reference: ${ref}`,
    `Name: ${d.fullName}`,
    d.company ? `Organization: ${d.company}` : "",
    `Client type: ${d.customerType}`,
    `Preferred contact: ${d.contactMethod}`,
    `Requirements: ${d.requirements}`,
    d.startDate ? `Preferred start: ${d.startDate}` : "",
    d.budget ? `Budget: ${d.budget}` : "",
  ].filter(Boolean).join("\n");
}

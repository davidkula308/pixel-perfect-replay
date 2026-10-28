import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ADMIN_EMAIL = "pakymacpaps@gmail.com";
const ADMIN_ENTRY_CODE = "ADMIN2026";
const OTP_TTL_MS = 10 * 60 * 1000;
const RESEND_WAIT_MS = 60 * 1000;

type Challenge = {
  otp: string;
  expiresAt: number;
  sentAt: number;
};

const challenges = new Map<string, Challenge>();

function createOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function adminCodeEmail(otp: string) {
  const digits = otp
    .split("")
    .map(
      (digit) =>
        `<td style="width:42px;height:54px;background:#fff7ec;border:1px solid #ecd3b5;border-radius:10px;text-align:center;font-family:Georgia,serif;font-size:28px;font-weight:700;color:#c2522d">${digit}</td><td style="width:6px"></td>`,
    )
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#faf3ea;padding:32px 12px;font-family:Arial,sans-serif;color:#4a2e22"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center"><table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;background:#fff;border-radius:18px;overflow:hidden"><tr><td style="background:#c2522d;padding:26px 32px;color:#fffaf3"><div style="font-family:Georgia,serif;font-size:24px;font-weight:700">HR Solutions</div><div style="font-size:13px;opacity:.9;margin-top:6px">Secure administrator access</div></td></tr><tr><td style="padding:32px"><h1 style="margin:0 0 10px;font-family:Georgia,serif;font-size:22px;color:#4a2e22">Your verification code</h1><p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#7a5a48">Enter this code on the HR Solutions admin sign-in page. It expires in 10 minutes.</p><table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px"><tr>${digits}</tr></table><p style="margin:0;font-size:13px;line-height:1.6;color:#9a7a66">Never share this code. If you did not request it, you can safely ignore this email.</p></td></tr><tr><td style="background:#f3e6d6;padding:16px 32px;font-size:12px;color:#8a6a56;text-align:center">HR Solutions · Administrator verification</td></tr></table></td></tr></table></body></html>`;
}

export const sendAdminOtp = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ email: z.string().trim().email() }).parse(input),
  )
  .handler(async ({ data }) => {
    const email = data.email.toLowerCase();
    if (email !== ADMIN_EMAIL) return { rejected: true as const };

    const existing = challenges.get(email);
    if (existing && Date.now() - existing.sentAt < RESEND_WAIT_MS) {
      throw new Error("Please wait a minute before requesting a new code.");
    }

    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("Email delivery is not configured on the server.");

    const otp = createOtp();
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: "HR Solutions <onboarding@resend.dev>",
        to: [email],
        subject: `${otp} is your HR Solutions admin code`,
        html: adminCodeEmail(otp),
        text: `Your HR Solutions admin verification code is ${otp}. It expires in 10 minutes.`,
        headers: { "X-Entity-Ref-ID": crypto.randomUUID() },
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("[v0] Resend request failed:", response.status, detail);
      throw new Error("Email delivery failed. Check the server Resend configuration.");
    }

    challenges.set(email, { otp, sentAt: Date.now(), expiresAt: Date.now() + OTP_TTL_MS });
    return { rejected: false as const };
  });

export const verifyAdminOtp = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ email: z.string().trim().email(), otp: z.string().regex(/^\d{6}$/) }).parse(input),
  )
  .handler(({ data }) => {
    const email = data.email.toLowerCase();
    const challenge = challenges.get(email);
    if (!challenge || challenge.expiresAt < Date.now() || challenge.otp !== data.otp) {
      throw new Error("That verification code is incorrect or expired.");
    }
    challenges.delete(email);
    return { verified: true as const };
  });

export const validateAdminEntryCode = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ code: z.string().max(100) }).parse(input))
  .handler(({ data }) => {
    if (data.code.trim().toUpperCase() !== ADMIN_ENTRY_CODE) {
      throw new Error("That admin code is not recognised.");
    }
    return { valid: true as const };
  });

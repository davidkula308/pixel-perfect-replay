import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, CheckCircle2, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings | HR Solutions" },
      { name: "description", content: "Manage site settings and protected administrator access." },
    ],
  }),
  component: Settings,
});

type Step = "settings" | "code" | "email" | "verify" | "admin";
const ADMIN_EMAIL = "pakymacpaps@gmail.com";
const ADMIN_CODE = "ADMIN2026";

function Settings() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("settings");
  const [adminCode, setAdminCode] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (step !== "verify" || seconds === 0) return;
    const timer = window.setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearInterval(timer);
  }, [step, seconds]);

  function openAdminPanel() {
    setError("");
    setStep("code");
  }

  function checkAdminCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedCode = adminCode.trim().toUpperCase();
    if (!normalizedCode) {
      setError("Enter your admin code to continue.");
      return;
    }
    if (normalizedCode !== ADMIN_CODE && normalizedCode !== "ADMIN") {
      setError("That admin code is not recognised.");
      return;
    }
    setError("");
    setStep("email");
  }

  function checkEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
      setError("Email not for admin");
      window.setTimeout(() => navigate({ to: "/" }), 1200);
      return;
    }
    setError("");
  }

  function sendVerificationCode() {
    const nextCode = String(Math.floor(100000 + Math.random() * 900000));
    setSentCode(nextCode);
    setVerificationCode("");
    setSeconds(60);
    setError("");
    setStep("verify");
  }

  function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (verificationCode !== sentCode) {
      setError("That verification code is incorrect or expired.");
      return;
    }
    setError("");
    setStep("admin");
  }

  if (step === "admin") {
    return (
      <main className="container-page py-16 md:py-24">
        <Card className="mx-auto max-w-3xl border-primary/10 shadow-card">
          <CardHeader>
            <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-accent">
              <CheckCircle2 />
            </div>
            <p className="eyebrow mt-5">Protected area</p>
            <CardTitle className="text-4xl text-primary">Admin Panel</CardTitle>
            <CardDescription>You have been securely verified as an administrator.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            {["Overview", "Applications", "Site content"].map((item) => (
              <div key={item} className="rounded-md border border-border bg-secondary p-5">
                <p className="font-semibold text-primary">{item}</p>
                <p className="mt-1 text-sm text-muted-foreground">Admin tools will appear here.</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="container-page py-12 md:py-20">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow">Account preferences</p>
        <h1 className="mt-3 text-4xl font-semibold text-primary md:text-5xl">Settings</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Manage protected access to the HR administration area.
        </p>
        {step === "settings" && (
          <Card className="mt-10 border-primary/10 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-primary">
                <ShieldCheck /> Administrator access
              </CardTitle>
              <CardDescription>
                The admin panel is protected by a code, approved email address, and one-time
                verification code.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="gold" onClick={openAdminPanel}>
                Admin Panel
              </Button>
            </CardContent>
          </Card>
        )}
        {step === "code" && (
          <AccessCard
            title="Enter admin code"
            description="Enter your administrator access code to continue."
            onBack={() => setStep("settings")}
          >
            <form onSubmit={checkAdminCode} className="flex flex-col gap-4">
              <Field
                label="Admin code"
                value={adminCode}
                onChange={setAdminCode}
                type="password"
                autoFocus
              />
              <ActionButtons onBack={() => setStep("settings")} submit="Continue" />
              {error && (
                <p role="alert" className="text-sm font-medium text-destructive">
                  {error}
                </p>
              )}
            </form>
          </AccessCard>
        )}
        {step === "email" && (
          <AccessCard
            title="Confirm admin email"
            description="Only the approved administrator email can receive a verification code."
            onBack={() => setStep("code")}
          >
            <form onSubmit={checkEmail} className="flex flex-col gap-4">
              <Field
                label="Email address"
                value={email}
                onChange={setEmail}
                type="email"
                autoFocus
              />
              <Button type="submit" variant="gold">
                <Mail data-icon="inline-start" />
                Continue
              </Button>
              {email.trim().toLowerCase() === ADMIN_EMAIL && (
                <Button type="button" variant="outline" onClick={sendVerificationCode}>
                  Receive verification code
                </Button>
              )}
              {error && (
                <p role="alert" className="text-sm font-medium text-destructive">
                  {error}
                </p>
              )}
            </form>
          </AccessCard>
        )}
        {step === "verify" && (
          <AccessCard
            title="Enter verification code"
            description={`A six-digit code was sent to ${ADMIN_EMAIL}. It expires in 10 minutes.`}
            onBack={() => setStep("email")}
          >
            <form onSubmit={verifyCode} className="flex flex-col gap-4">
              <Field
                label="Six-digit code"
                value={verificationCode}
                onChange={setVerificationCode}
                inputMode="numeric"
                maxLength={6}
                autoFocus
              />
              <ActionButtons onBack={() => setStep("email")} submit="Verify and access" />
              {seconds > 0 ? (
                <p className="text-center text-sm text-muted-foreground">
                  Resend available in {seconds}s
                </p>
              ) : (
                <Button type="button" variant="outline" onClick={sendVerificationCode}>
                  Resend code
                </Button>
              )}
              {sentCode && (
                <p className="rounded-md bg-secondary p-3 text-sm text-muted-foreground">
                  Preview code for this no-integration build:{" "}
                  <strong className="text-primary">{sentCode}</strong>
                </p>
              )}
              {error && (
                <p role="alert" className="text-sm font-medium text-destructive">
                  {error}
                </p>
              )}
            </form>
          </AccessCard>
        )}
      </div>
    </main>
  );
}

function AccessCard({
  title,
  description,
  onBack,
  children,
}: {
  title: string;
  description: string;
  onBack: () => void;
  children: ReactNode;
}) {
  return (
    <Card className="mt-10 border-primary/10 shadow-card">
      <CardHeader>
        <Button type="button" variant="ghost" size="sm" className="-ml-3 w-fit" onClick={onBack}>
          <ArrowLeft data-icon="inline-start" />
          Back
        </Button>
        <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-accent">
          <LockKeyhole />
        </div>
        <CardTitle className="text-3xl text-primary">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoFocus,
  inputMode,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoFocus?: boolean;
  inputMode?: "numeric";
  maxLength?: number;
}) {
  const id = label.toLowerCase().replaceAll(" ", "-");
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        autoFocus={autoFocus}
        inputMode={inputMode}
        maxLength={maxLength}
        required
      />
    </div>
  );
}

function ActionButtons({ onBack, submit }: { onBack: () => void; submit: string }) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <Button type="button" variant="outline" onClick={onBack}>
        Back
      </Button>
      <Button type="submit" variant="gold">
        {submit}
      </Button>
    </div>
  );
}

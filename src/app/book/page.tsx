"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  CarFront,
  Tv,
  Hammer,
  Cpu,
  Calendar,
  User,
  FileCheck,
} from "lucide-react";
import { BackToHome } from "@/components/back-to-home";

const STEPS = [
  { id: 1, title: "Select service", icon: FileCheck },
  { id: 2, title: "Review estimate", icon: FileCheck },
  { id: 3, title: "Date & time", icon: Calendar },
  { id: 4, title: "Contact info", icon: User },
  { id: 5, title: "Confirm", icon: Check },
];

const SERVICE_OPTIONS = [
  { id: "automotive", label: "Automotive Service", icon: CarFront, href: "/auto" },
  { id: "handyman", label: "Handyman Services", icon: Tv, href: "/handyman" },
  { id: "diy", label: "DIY Garage", icon: Hammer, href: "/diy-garage" },
  { id: "it", label: "I.T Consultant", icon: Cpu, href: "/it" },
];

type FormState = {
  serviceType: "automotive" | "handyman" | "diy" | "it" | null;
  estimatedTotal: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  vehicle: string;
  issue: string;
  notes: string;
};

const defaultForm: FormState = {
  serviceType: null,
  estimatedTotal: "",
  date: "",
  time: "",
  name: "",
  phone: "",
  vehicle: "",
  issue: "",
  notes: "",
};

function BookPageFallback() {
  return (
    <main className="relative min-h-[90vh] overflow-x-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="noise-overlay" aria-hidden />
      <div className="relative mx-auto max-w-2xl">
        <BackToHome />
        <div className="mt-6 h-10 w-64 animate-pulse rounded-lg bg-white/10" />
        <div className="mt-4 h-5 w-full max-w-md animate-pulse rounded bg-white/5" />
        <div className="mt-12 h-64 animate-pulse rounded-2xl bg-white/5" />
      </div>
    </main>
  );
}

function BookPageContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateForm = useCallback((updates: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  }, []);

  useEffect(() => {
    const service = searchParams.get("service") as FormState["serviceType"] | null;
    const estimate = searchParams.get("estimate");
    if (service && ["automotive", "handyman", "diy", "it"].includes(service)) {
      updateForm({ serviceType: service, estimatedTotal: estimate ?? "" });
      setStep(2); // Skip to Review price estimate when arriving from a service page
    }
  }, [searchParams, updateForm]);

  const canProceed = () => {
    if (step === 1) return form.serviceType != null;
    if (step === 2) return true;
    if (step === 3) return form.date.trim() !== "" && form.time.trim() !== "";
    if (step === 4) {
      const nameOk = form.name.trim().length >= 2;
      const phoneOk = form.phone.replace(/\D/g, "").length >= 10;
      if (form.serviceType === "automotive") {
        return nameOk && phoneOk && form.vehicle.trim().length >= 3 && form.issue.trim().length >= 10;
      }
      return nameOk && phoneOk;
    }
    return true;
  };

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const preferredDate = `${form.date}T${form.time}:00`;
      const body = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        vehicle: form.serviceType === "automotive" ? form.vehicle.trim() : undefined,
        issue: form.serviceType === "automotive" ? form.issue.trim() : `${form.serviceType} booking`,
        preferredDate,
        serviceType: form.serviceType ?? undefined,
        estimatedTotal: form.estimatedTotal || undefined,
        notes: form.notes.trim() || undefined,
      };
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Something went wrong.");
        setSubmitting(false);
        return;
      }
      setConfirmed(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmed) {
    return (
      <main className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-14 sm:py-20">
        <div className="noise-overlay" aria-hidden />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 max-w-lg w-full rounded-2xl border border-white/[0.08] bg-black/40 p-8 shadow-xl shadow-black/20 backdrop-blur-sm text-center sm:p-10"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-green-500/20 text-green-400 ring-2 ring-green-400/30">
            <Check className="h-8 w-8 sm:h-10 sm:w-10" />
          </div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Booking Confirmed
          </h1>
          <p className="mt-4 text-sm text-zinc-400 sm:text-base">
            Your request has been received. Manny&apos;s Garage will be notified and will follow up shortly to confirm your appointment.
          </p>
          <p className="mt-2 text-xs text-zinc-500 sm:text-sm">
            You may receive a text or call to confirm date and time.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/" className="btn-primary group min-h-[44px] justify-center">
              Back to Home
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1" />
            </Link>
            <Link href="/book" className="btn-outline min-h-[44px] justify-center">
              Book Another
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative min-h-[90vh] overflow-x-hidden pt-6 sm:pt-10 px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
      <div className="noise-overlay" aria-hidden />
      <div className="relative mx-auto max-w-2xl">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <BackToHome />
          <span className="premium-badge badge-orange orbitron text-[10px] tracking-[0.15em]">
            BOOK A SERVICE
          </span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-3 sm:mt-4"
        >
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Book Your <span className="orange-glow-text">Service</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Follow the steps below. We&apos;ll confirm your appointment with you.
          </p>
        </motion.div>

        {/* Step indicator */}
        <div className="mt-6 sm:mt-8 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-[520px] sm:min-w-0">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex flex-1 items-center">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors min-h-[44px] min-w-[44px] ${
                    step >= s.id
                      ? "bg-orange-500 text-black"
                      : "border border-white/[0.2] text-zinc-500"
                  }`}
                >
                  {step > s.id ? <Check className="h-4 w-4" /> : s.id}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-1 rounded ${
                      step > s.id ? "bg-orange-500/50" : "bg-white/[0.08]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="mt-8 sm:mt-10 min-h-[300px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold text-white sm:text-xl">Select service</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {SERVICE_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = form.serviceType === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          updateForm({ serviceType: opt.id as FormState["serviceType"] });
                          setStep(2);
                        }}
                        className={`group relative flex min-h-[44px] flex-col items-center gap-3 rounded-2xl border p-5 sm:p-6 text-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
                          isSelected
                            ? "border-orange-500 bg-orange-500/15 text-white shadow-xl shadow-orange-950/20"
                            : "border-white/[0.08] bg-black/40 text-zinc-400 shadow-xl shadow-black/20 hover:border-orange-500/25 hover:bg-white/5 hover:text-white hover:shadow-orange-950/10"
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white" aria-hidden>
                            <Check className="h-3.5 w-3.5" />
                          </span>
                        )}
                        <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${isSelected ? "text-orange-400" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                        <span className="font-medium text-sm sm:text-base">{opt.label}</span>
                        <Link
                          href={opt.href}
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-orange-400 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-[var(--background)] rounded min-h-[24px]"
                        >
                          Learn more →
                        </Link>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold text-white sm:text-xl">Review price estimate</h2>
                {form.estimatedTotal ? (
                  <div className="rounded-2xl border border-white/[0.08] border-orange-500/30 bg-orange-500/10 p-6 shadow-xl shadow-black/20">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Estimated total</p>
                    <p className="text-2xl font-bold text-white mt-2 sm:text-3xl">${form.estimatedTotal}</p>
                    <p className="mt-2 text-xs text-zinc-500">
                      Final price may be confirmed when we contact you.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {(form.serviceType === "handyman" || form.serviceType === "diy") && (
                      <Link
                        href={form.serviceType === "handyman" ? "/handyman#calculator" : "/diy-garage#calculator"}
                        className="flex items-center justify-between gap-4 rounded-xl border border-orange-500/30 bg-orange-500/10 p-4 sm:p-5 text-left transition-colors hover:border-orange-500/50 hover:bg-orange-500/15 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-[var(--background)]"
                      >
                        <span>
                          <span className="block font-semibold text-white">Quote Calculator</span>
                          <span className="mt-0.5 block text-sm text-zinc-400">
                            {form.serviceType === "handyman" ? "Get a fixed-price estimate for TV, cameras, furniture." : "Select hours and optional mechanic assistance."}
                          </span>
                        </span>
                        <ArrowRight className="h-5 w-5 shrink-0 text-orange-400" />
                      </Link>
                    )}
                    <div className="rounded-2xl border border-white/[0.08] bg-black/40 p-6 shadow-xl shadow-black/20 backdrop-blur-sm">
                      <p className="text-sm text-zinc-400 sm:text-base">
                        {form.serviceType === "handyman" && (
                          <>No estimate in this session. Use the Quote Calculator above, then return to book with your total.</>
                        )}
                        {form.serviceType === "diy" && (
                          <>No estimate in this session. Use the Quote Calculator above, then return to book with your total.</>
                        )}
                        {form.serviceType === "automotive" && (
                          <>Automotive estimates are provided after we assess your vehicle. Proceed to choose date and contact info.</>
                        )}
                        {form.serviceType === "it" && (
                          <>No estimate was provided. Get a quote on the <Link href="/it/services" className="text-orange-400 hover:underline">I.T Services</Link> page, then return to book.</>
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold text-white sm:text-xl">Choose date and time</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <label htmlFor="date" className="block text-sm font-medium text-zinc-300 mb-2">
                      Preferred date
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={form.date}
                      onChange={(e) => updateForm({ date: e.target.value })}
                      min={new Date().toISOString().slice(0, 10)}
                      className="focus-ring w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white min-h-[44px]"
                    />
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <label htmlFor="time" className="block text-sm font-medium text-zinc-300 mb-2">
                      Preferred time
                    </label>
                    <input
                      id="time"
                      type="time"
                      value={form.time}
                      onChange={(e) => updateForm({ time: e.target.value })}
                      className="focus-ring w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white min-h-[44px]"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold text-white sm:text-xl">Contact information</h2>
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                      Full name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => updateForm({ name: e.target.value })}
                      placeholder="Your name"
                      className="focus-ring w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 min-h-[44px]"
                    />
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-zinc-300 mb-2">
                      Phone number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateForm({ phone: e.target.value })}
                      placeholder="(701) 555-0142"
                      className="focus-ring w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 min-h-[44px]"
                    />
                  </div>
                  {form.serviceType === "automotive" && (
                    <>
                      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                        <label htmlFor="vehicle" className="block text-sm font-medium text-zinc-300 mb-2">
                          Vehicle (make & model)
                        </label>
                        <input
                          id="vehicle"
                          type="text"
                          value={form.vehicle}
                          onChange={(e) => updateForm({ vehicle: e.target.value })}
                          placeholder="e.g. 2018 Ford F-150"
                          className="focus-ring w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 min-h-[44px]"
                        />
                      </div>
                      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                        <label htmlFor="issue" className="block text-sm font-medium text-zinc-300 mb-2">
                          Describe the issue
                        </label>
                        <textarea
                          id="issue"
                          value={form.issue}
                          onChange={(e) => updateForm({ issue: e.target.value })}
                          placeholder="What needs to be repaired?"
                          rows={3}
                          className="focus-ring w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 resize-none min-h-[88px]"
                        />
                      </div>
                    </>
                  )}
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <label htmlFor="notes" className="block text-sm font-medium text-zinc-300 mb-2">
                      Additional notes
                    </label>
                    <textarea
                      id="notes"
                      value={form.notes}
                      onChange={(e) => updateForm({ notes: e.target.value })}
                      placeholder="Anything else we should know?"
                      rows={2}
                      className="focus-ring w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 resize-none min-h-[72px]"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold text-white sm:text-xl">Confirm booking</h2>
                <div className="rounded-2xl border border-white/[0.08] bg-black/40 p-6 shadow-xl shadow-black/20 backdrop-blur-sm space-y-3 text-sm">
                  <p><span className="text-zinc-500">Service:</span> <span className="text-white">{SERVICE_OPTIONS.find((o) => o.id === form.serviceType)?.label ?? form.serviceType}</span></p>
                  {form.estimatedTotal && (
                    <p><span className="text-zinc-500">Est. total:</span> <span className="text-white">${form.estimatedTotal}</span></p>
                  )}
                  <p><span className="text-zinc-500">Date & time:</span> <span className="text-white">{form.date} at {form.time || "—"}</span></p>
                  <p><span className="text-zinc-500">Name:</span> <span className="text-white">{form.name}</span></p>
                  <p><span className="text-zinc-500">Phone:</span> <span className="text-white">{form.phone}</span></p>
                  {form.serviceType === "automotive" && form.vehicle && (
                    <p><span className="text-zinc-500">Vehicle:</span> <span className="text-white">{form.vehicle}</span></p>
                  )}
                </div>
                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation — step 1 advances on service select */}
        {step > 1 && (
        <div className="mt-10 sm:mt-12 flex justify-end">
          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="btn-primary group min-h-[44px] justify-center sm:justify-end disabled:opacity-50 disabled:pointer-events-none"
            >
              Continue
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || !form.name.trim() || form.phone.replace(/\D/g, "").length < 10}
              className="btn-primary group min-h-[44px] justify-center sm:justify-end disabled:opacity-50 disabled:pointer-events-none"
            >
              {submitting ? "Sending…" : "Confirm booking"}
              <Check className="h-4 w-4" />
            </button>
          )}
        </div>
        )}
      </div>
    </main>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<BookPageFallback />}>
      <BookPageContent />
    </Suspense>
  );
}

"use client";

import { useState, useEffect, useCallback, Suspense, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, CarFront, Check, Cpu, Hammer, MapPin, Warehouse } from "lucide-react";
import { BackToHome } from "@/components/back-to-home";
import { setPreferredService, isBookingServiceId, type BookingServiceId } from "@/lib/booking-preference";
import {
  AUTO_FIXED_PACKAGES,
  DIY_PACKAGES,
  HANDYMAN_BUNK_BED,
  HANDYMAN_CAMERA_EACH,
  HANDYMAN_FURNITURE_EACH,
  HANDYMAN_TV_PACKAGES,
  HANDYMAN_WINDOW_TREATMENT,
} from "@/lib/fixed-quote-options";

const SERVICE_OPTIONS: {
  id: BookingServiceId;
  label: string;
  sub: string;
  Icon: typeof CarFront;
}[] = [
  { id: "automotive", label: "Auto", sub: "Repairs, maintenance, diagnostics", Icon: CarFront },
  { id: "handyman", label: "Handyman", sub: "TV mount, cameras, assembly & more", Icon: Hammer },
  { id: "diy", label: "DIY bay", sub: "Lift, tools & workspace by the hour", Icon: Warehouse },
  { id: "it", label: "I.T", sub: "Tech help & setup", Icon: Cpu },
];

type FormState = {
  serviceType: BookingServiceId | null;
  estimatedTotal: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  details: string;
};

type QuoteOption = {
  id: string;
  label: string;
  amount: string;
  note: string;
};

const defaultForm: FormState = {
  serviceType: null,
  estimatedTotal: "",
  date: "",
  time: "",
  name: "",
  phone: "",
  details: "",
};

function BookPageFallback() {
  return (
    <main className="relative min-h-[60vh] overflow-x-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="noise-overlay" aria-hidden />
      <div className="relative mx-auto max-w-lg">
        <BackToHome />
        <div className="mt-6 h-10 w-48 animate-pulse rounded-lg bg-white/10" />
        <div className="mt-8 h-64 animate-pulse rounded-2xl bg-white/5" />
      </div>
    </main>
  );
}

function BookPageContent() {
  const searchParams = useSearchParams();
  const dateFieldRef = useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateForm = useCallback((updates: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  }, []);

  useEffect(() => {
    const fromUrl = searchParams.get("service");
    const estimate = searchParams.get("estimate");
    const notes = searchParams.get("notes");

    if (fromUrl && isBookingServiceId(fromUrl)) {
      setPreferredService(fromUrl);
      setShowBookingForm(true);
      setForm((prev) => ({
        ...prev,
        serviceType: fromUrl,
        estimatedTotal: estimate?.replace(/[^\d.]/g, "") ?? "",
        ...(notes ? { details: notes } : {}),
      }));
      return;
    }

    setShowBookingForm(false);
    setSelectedQuoteId(null);
    setForm(defaultForm);
  }, [searchParams]);

  const chooseService = (id: BookingServiceId) => {
    setPreferredService(id);
    setSelectedQuoteId(null);
    updateForm({
      serviceType: id,
      estimatedTotal: "",
      details: "",
    });
    setShowBookingForm(true);
  };

  const goBackToServicePick = () => {
    setShowBookingForm(false);
    setSelectedQuoteId(null);
    updateForm({
      serviceType: null,
      estimatedTotal: "",
      details: "",
    });
  };

  const canSubmit = () => {
    if (form.serviceType == null) return false;
    if (form.date.trim() === "") return false;
    return form.name.trim().length >= 2 && form.phone.replace(/\D/g, "").length >= 10;
  };

  const quoteOptions: QuoteOption[] = (() => {
    if (form.serviceType === "automotive") {
      return AUTO_FIXED_PACKAGES.map((pkg) => ({
        id: `auto-${pkg.id}`,
        label: pkg.label,
        amount: pkg.price.toString(),
        note: `Auto: ${pkg.label}`,
      }));
    }
    if (form.serviceType === "diy") {
      return DIY_PACKAGES.map((pkg) => ({
        id: `diy-${pkg.id}`,
        label: pkg.label,
        amount: pkg.total.toString(),
        note: `DIY bay ${pkg.hours}h${pkg.mechanicHours ? ` + mechanic ${pkg.mechanicHours}h` : ""}`,
      }));
    }
    if (form.serviceType === "handyman") {
      const tv = HANDYMAN_TV_PACKAGES.map((p) => ({
        id: `handyman-tv-${p.label}`,
        label: p.label,
        amount: p.price.toFixed(2),
        note: `TV mount ${p.label}`,
      }));
      const cams = [1, 2, 3, 4].map((n) => ({
        id: `handyman-cam-${n}`,
        label: `${n} camera${n > 1 ? "s" : ""}`,
        amount: String(n * HANDYMAN_CAMERA_EACH),
        note: `Security cameras x${n}`,
      }));
      const furniture = [1, 2, 3, 4].map((n) => ({
        id: `handyman-furn-${n}`,
        label: `${n} furniture item${n > 1 ? "s" : ""}`,
        amount: String(n * HANDYMAN_FURNITURE_EACH),
        note: `Furniture assembly x${n}`,
      }));
      const windowTreatment = {
        id: "handyman-window-treatment",
        label: "Window treatment installation (blinds & curtains)",
        amount: String(HANDYMAN_WINDOW_TREATMENT),
        note: "Window treatment installation",
      };
      const bunkBed = {
        id: "handyman-bunk-bed",
        label: "Bunk bed assembly",
        amount: String(HANDYMAN_BUNK_BED),
        note: "Bunk bed assembly",
      };
      return [...tv, ...cams, ...furniture, windowTreatment, bunkBed];
    }
    return [];
  })();

  const selectQuote = (opt: QuoteOption) => {
    setSelectedQuoteId(opt.id);
    updateForm({
      estimatedTotal: opt.amount,
      details: form.details.trim() ? form.details : opt.note,
    });
    requestAnimationFrame(() => {
      dateFieldRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      dateFieldRef.current?.focus();
    });
  };

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const timeRaw = form.time.trim();
      const timePart = timeRaw.length >= 4 ? timeRaw : "09:00";
      const preferredDate = `${form.date}T${timePart}:00`;
      const details = form.details.trim();
      const body = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        issue: details || undefined,
        preferredDate,
        serviceType: form.serviceType ?? undefined,
        estimatedTotal: form.estimatedTotal || undefined,
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
      <main className="relative flex min-h-[80vh] flex-col items-center justify-center px-4 py-14 sm:py-20">
        <div className="noise-overlay" aria-hidden />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-full max-w-lg rounded-2xl border border-white/[0.08] bg-black/40 p-8 text-center shadow-xl shadow-black/20 backdrop-blur-sm sm:p-10"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-400 ring-2 ring-green-400/30 sm:h-20 sm:w-20">
            <Check className="h-8 w-8 sm:h-10 sm:w-10" />
          </div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">Request sent</h1>
          <p className="mt-4 text-sm text-zinc-400 sm:text-base">
            We&apos;ll text or call you soon to confirm your time.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="btn-primary group inline-flex items-center justify-center gap-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Home
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/book"
              className="btn-outline inline-flex items-center justify-center gap-1.5 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Send another
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden pb-16">
      <div className="noise-overlay" aria-hidden />

      <div className="relative z-10 mx-auto max-w-lg px-4 pt-6 sm:px-6 sm:pt-8">
        <div className="flex flex-wrap items-center gap-2">
          <BackToHome />
          <span className="premium-badge badge-orange flex items-center gap-1.5 text-[11px]">
            <MapPin className="h-3 w-3" aria-hidden />
            Fargo
          </span>
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {showBookingForm ? "Book" : "Book a visit"}
        </h1>
        <p className="mt-2 text-sm text-zinc-400 sm:text-base">
          {showBookingForm
            ? "Service, day, name &amp; phone—add time or details if you want. We confirm the rest."
            : "Start by choosing what you need. Then add your preferred time and contact info."}
        </p>

        {!showBookingForm ? (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 rounded-2xl border border-white/[0.08] bg-black/40 p-5 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-6"
            aria-labelledby="pick-service-heading"
          >
            <h2 id="pick-service-heading" className="text-sm font-medium text-zinc-300">
              Select a service
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {SERVICE_OPTIONS.map((opt) => {
                const Icon = opt.Icon;
                return (
                  <li key={opt.id}>
                    <button
                      type="button"
                      onClick={() => chooseService(opt.id)}
                      className="flex min-h-[4.5rem] w-full items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-left transition-colors hover:border-orange-500/40 hover:bg-orange-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/30">
                        <Icon className="h-5 w-5 text-orange-400" aria-hidden />
                      </span>
                      <span className="min-w-0 pt-0.5">
                        <span className="block font-semibold text-white">{opt.label}</span>
                        <span className="mt-0.5 block text-xs leading-snug text-zinc-500">{opt.sub}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-center text-sm text-zinc-500">
              <Link href="/quote" className="text-orange-400 hover:underline">
                See fixed pricing for common jobs →
              </Link>
            </p>
            <p className="mt-2 text-center text-xs text-zinc-600">
              <Link href="/#services" className="text-zinc-400 hover:text-orange-400/90 hover:underline">
                Browse all services
              </Link>
            </p>
          </motion.section>
        ) : null}

        {showBookingForm ? (
          <motion.section
            id="booking"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 scroll-mt-28 rounded-2xl border border-white/[0.08] bg-black/40 p-5 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-zinc-300">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 shrink-0 text-orange-400" aria-hidden />
                <span className="text-sm font-medium">Your request</span>
              </div>
              <button
                type="button"
                onClick={goBackToServicePick}
                className="text-xs font-medium text-zinc-500 underline-offset-2 hover:text-orange-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Change service
              </button>
            </div>

            <div className="mt-5 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-500">Service</label>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_OPTIONS.map((opt) => {
                    const on = form.serviceType === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setPreferredService(opt.id);
                          setSelectedQuoteId(null);
                          updateForm({ serviceType: opt.id });
                        }}
                        className={`min-h-[44px] rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
                          on
                            ? "border-orange-500 bg-orange-500 text-black"
                            : "border-white/15 bg-white/[0.04] text-zinc-300 hover:border-white/25 hover:bg-white/[0.08]"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-zinc-600">
                  <Link href="/#services" className="text-orange-400/90 hover:underline">
                    Not sure? See what we offer
                  </Link>
                </p>
              </div>

            {form.estimatedTotal ? (
              <p className="rounded-lg border border-orange-500/25 bg-orange-500/10 px-3 py-2 text-sm text-zinc-200">
                Quote on file: <span className="font-semibold text-white">${form.estimatedTotal}</span>
              </p>
            ) : null}

            {quoteOptions.length > 0 ? (
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Quote options
                </label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {quoteOptions.map((opt) => {
                    const on = selectedQuoteId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => selectQuote(opt)}
                        className={`min-h-[46px] rounded-xl border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
                          on
                            ? "border-orange-500 bg-orange-500/15"
                            : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                        }`}
                      >
                        <span className="block text-sm font-medium text-zinc-200">{opt.label}</span>
                        <span className="block text-sm font-semibold text-orange-400">
                          {opt.amount === "0" ? "Free" : `$${opt.amount}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-1 text-xs text-zinc-600">
                  Picking an option pre-fills estimate and details. You can still edit both.
                </p>
              </div>
            ) : null}

            <div>
              <label htmlFor="date" className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-500">
                Preferred day
              </label>
              <input
                id="date"
                ref={dateFieldRef}
                type="date"
                value={form.date}
                onChange={(e) => updateForm({ date: e.target.value })}
                min={new Date().toISOString().slice(0, 10)}
                className="focus-ring min-h-[48px] w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white"
              />
            </div>

            <div>
              <label htmlFor="time" className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-500">
                Time <span className="font-normal normal-case text-zinc-600">(optional)</span>
              </label>
              <input
                id="time"
                type="time"
                value={form.time}
                onChange={(e) => updateForm({ time: e.target.value })}
                className="focus-ring min-h-[48px] w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white"
              />
              <p className="mt-1 text-xs text-zinc-600">Leave blank and we&apos;ll use morning as a starting point.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                  placeholder="Your name"
                  autoComplete="name"
                  className="focus-ring min-h-[48px] w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-zinc-600"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateForm({ phone: e.target.value })}
                  placeholder="(701) 555-0142"
                  autoComplete="tel"
                  className="focus-ring min-h-[48px] w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div>
              <label htmlFor="details" className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-500">
                Details <span className="font-normal normal-case text-zinc-600">(optional)</span>
              </label>
              <textarea
                id="details"
                value={form.details}
                onChange={(e) => updateForm({ details: e.target.value })}
                placeholder="Car & problem, TV size, project idea…"
                rows={3}
                className="focus-ring min-h-[5.5rem] w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-600"
              />
            </div>
          </div>

          {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || !canSubmit()}
            className="btn-primary mt-6 flex w-full items-center justify-center gap-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-40"
          >
            {submitting ? "Sending…" : "Send"}
            {!submitting ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
          </button>
        </motion.section>
        ) : null}
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

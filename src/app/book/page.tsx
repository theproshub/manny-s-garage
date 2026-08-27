"use client";

import { useState, useEffect, useCallback, Suspense, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, CarFront, Check, Cpu, Hammer, MapPin, Warehouse } from "lucide-react";
import { setPreferredService, isBookingServiceId, type BookingServiceId } from "@/lib/booking-preference";
import { BOOK_SCHEDULE_FRAGMENT, BOOK_SCHEDULE_HASH } from "@/lib/booking-nav";
import { SITE_PHONE_PLACEHOLDER } from "@/lib/contact";
import {
  AUTO_FIXED_PACKAGES,
  AUTO_PRICING_PARTS_DISCLAIMER,
  DIY_PACKAGES,
  HANDYMAN_BUNK_BED,
  HANDYMAN_CAMERA_EACH,
  HANDYMAN_FURNITURE_EACH,
  HANDYMAN_TV_PACKAGES,
  HANDYMAN_WINDOW_TREATMENT,
} from "@/lib/fixed-quote-options";
import { toTitleCase } from "@/lib/utils";

const SERVICE_OPTIONS: {
  id: BookingServiceId;
  label: string;
  sub: string;
  Icon: typeof CarFront;
}[] = [
  { id: "automotive", label: "Auto", sub: "Repairs, maintenance, and diagnostics", Icon: CarFront },
  { id: "handyman", label: "Handyman", sub: "TV mounting, cameras, assembly, and more", Icon: Hammer },
  { id: "diy", label: "DIY Bay", sub: "Lift, tools, and workspace by the hour", Icon: Warehouse },
  { id: "it", label: "I.T.", sub: "Tech help and setup", Icon: Cpu },
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
  /** Extra line under the label (e.g. automotive package details). */
  sub?: string;
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
      <div className="relative mx-auto max-w-lg">
        <div className="mt-6 h-10 w-48 animate-pulse rounded-none bg-transparent" />
        <div className="mt-8 h-64 animate-pulse rounded-none bg-transparent" />
      </div>
    </main>
  );
}

function scrollToScheduleSection(
  scheduleEl: HTMLElement | null,
  dateInput: HTMLInputElement | null,
) {
  scheduleEl?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => {
    dateInput?.focus({ preventScroll: true });
  }, 380);
}

function BookPageContent() {
  const searchParams = useSearchParams();
  const dateFieldRef = useRef<HTMLInputElement | null>(null);
  const bookingScheduleRef = useRef<HTMLDivElement | null>(null);
  const didScrollForUrlEstimateRef = useRef(false);
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

  useEffect(() => {
    if (!showBookingForm) {
      didScrollForUrlEstimateRef.current = false;
      return;
    }
    const hasEstimate = Boolean(searchParams.get("estimate")?.trim());
    const hasScheduleHash =
      typeof window !== "undefined" && window.location.hash === BOOK_SCHEDULE_HASH;
    if (!hasEstimate && !hasScheduleHash) return;
    if (didScrollForUrlEstimateRef.current) return;
    didScrollForUrlEstimateRef.current = true;
    const t = window.setTimeout(() => {
      scrollToScheduleSection(bookingScheduleRef.current, dateFieldRef.current);
    }, 200);
    return () => clearTimeout(t);
  }, [showBookingForm, searchParams]);

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
        sub: pkg.sub,
        note: `Auto: ${pkg.label} · ${pkg.sub}`,
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
        label: toTitleCase(`${n} camera${n > 1 ? "s" : ""}`),
        amount: String(n * HANDYMAN_CAMERA_EACH),
        note: `Security cameras x${n}`,
      }));
      const furniture = [1, 2, 3, 4].map((n) => ({
        id: `handyman-furn-${n}`,
        label: toTitleCase(`${n} furniture item${n > 1 ? "s" : ""}`),
        amount: String(n * HANDYMAN_FURNITURE_EACH),
        note: `Furniture assembly x${n}`,
      }));
      const windowTreatment = {
        id: "handyman-window-treatment",
        label: toTitleCase("Window treatment installation (blinds & curtains)"),
        amount: String(HANDYMAN_WINDOW_TREATMENT),
        note: "Window treatment installation",
      };
      const bunkBed = {
        id: "handyman-bunk-bed",
        label: toTitleCase("Bunk bed assembly"),
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
      scrollToScheduleSection(bookingScheduleRef.current, dateFieldRef.current);
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
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-full max-w-lg rounded-none border border-[var(--rule)]] bg-transparent p-8 text-center shadow-xl shadow-black/20 backdrop-blur-sm sm:p-10"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-400 ring-2 ring-green-400/30 sm:h-20 sm:w-20">
            <Check className="h-8 w-8 sm:h-10 sm:w-10" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl md:text-4xl">Request Sent</h1>
          <p className="mt-4 text-sm text-[var(--ink-muted)] sm:text-base">
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
              className="btn-outline inline-flex items-center justify-center gap-1.5 rounded-full border-[var(--rule)]] bg-transparent] text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Send Another
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden pb-16">

      <div className="relative z-10 mx-auto max-w-lg px-4 pt-6 sm:px-6 sm:pt-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="field-label flex items-center gap-1.5 text-[11px]">
            <MapPin className="h-3 w-3" aria-hidden />
            Fargo
          </span>
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
          {showBookingForm ? "Book" : "Book a Visit"}
        </h1>
        <p className="mt-2 text-sm text-[var(--ink-muted)] sm:text-base">
          {showBookingForm
            ? "Service, day, name, and phone—add time or details if you want. We confirm the rest."
            : "Start by choosing what you need. Then add your preferred time and contact info."}
        </p>

        {!showBookingForm ? (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 rounded-none border border-[var(--rule)]] bg-transparent p-5 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-6"
            aria-labelledby="pick-service-heading"
          >
            <h2 id="pick-service-heading" className="text-sm font-medium text-[var(--ink)]">
              Select a Service
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {SERVICE_OPTIONS.map((opt) => {
                const Icon = opt.Icon;
                return (
                  <li key={opt.id}>
                    <button
                      type="button"
                      onClick={() => chooseService(opt.id)}
                      className="flex min-h-[4.5rem] w-full items-start gap-3 rounded-none border border-[var(--rule)]] bg-transparent] px-4 py-3 text-left transition-colors hover:border-[var(--stamp)] hover:bg-[var(--canary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-[var(--rule)] bg-transparent">
                        <Icon className="h-5 w-5 text-[var(--stamp)]" aria-hidden />
                      </span>
                      <span className="min-w-0 pt-0.5">
                        <span className="block font-semibold text-[var(--ink)]">{opt.label}</span>
                        <span className="mt-0.5 block text-xs leading-snug text-[var(--ink-muted)]">{opt.sub}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-center text-sm text-[var(--ink-muted)]">
              <Link href="/quote" className="text-[var(--stamp)] hover:underline">
                See fixed pricing for common jobs →
              </Link>
            </p>
            <p className="mt-2 text-center text-xs text-[var(--ink-muted)]">
              <Link href="/#services" className="text-[var(--ink-muted)] hover:text-[var(--stamp)]/90 hover:underline">
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
            className="mt-8 scroll-mt-28 rounded-none border border-[var(--rule)]] bg-transparent p-5 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-[var(--ink)]">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 shrink-0 text-[var(--stamp)]" aria-hidden />
                <span className="text-sm font-medium">Your Request</span>
              </div>
              <button
                type="button"
                onClick={goBackToServicePick}
                className="text-xs font-medium text-[var(--ink-muted)] underline-offset-2 hover:text-[var(--stamp)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Change Service
              </button>
            </div>

            <div className="mt-5 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-[var(--ink-muted)]">Service</label>
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
                            ? "border-[var(--stamp)] bg-[var(--stamp)] text-white"
                            : "border-[var(--rule)] bg-transparent] text-[var(--ink)] hover:border-[var(--rule)] hover:bg-transparent]"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-[var(--ink-muted)]">
                  <Link href="/#services" className="text-[var(--stamp)]/90 hover:underline">
                    Not sure? See what we offer
                  </Link>
                </p>
              </div>

            {form.estimatedTotal ? (
              <p className="rounded-none border border-[var(--stamp)] bg-[var(--canary)] px-3 py-2 text-sm text-[var(--ink)]">
                Quote on file: <span className="font-semibold text-[var(--ink)]">${form.estimatedTotal}</span>
              </p>
            ) : null}

            {quoteOptions.length > 0 ? (
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-[var(--ink-muted)]">
                  Quote Options
                </label>
                {form.serviceType === "automotive" ? (
                  <p className="mb-2 text-xs text-[var(--ink-muted)]">{AUTO_PRICING_PARTS_DISCLAIMER}</p>
                ) : null}
                <div className="grid gap-2 sm:grid-cols-2">
                  {quoteOptions.map((opt) => {
                    const on = selectedQuoteId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => selectQuote(opt)}
                        className={`min-h-[46px] rounded-none border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
                          on
                            ? "border-[var(--stamp)] bg-[var(--canary)]"
                            : "border-[var(--rule)] bg-transparent] hover:border-[var(--rule)] hover:bg-transparent]"
                        }`}
                      >
                        <span className="block text-sm font-medium text-[var(--ink)]">{opt.label}</span>
                        {opt.sub ? (
                          <span className="mt-0.5 block text-[11px] leading-snug text-[var(--ink-muted)]">{opt.sub}</span>
                        ) : null}
                        <span className="block text-sm font-semibold text-[var(--stamp)]">
                          {opt.amount === "0" ? "Free" : `$${opt.amount}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-1 text-xs text-[var(--ink-muted)]">
                  Picking an option pre-fills estimate and details—scrolls to schedule below. You can still edit both.
                </p>
              </div>
            ) : null}

            <div
              ref={bookingScheduleRef}
              id={BOOK_SCHEDULE_FRAGMENT}
              className="scroll-mt-28 space-y-5 border-t border-[var(--rule)]] pt-5"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--ink-muted)]">Schedule &amp; Contact</p>

              <div>
                <label htmlFor="date" className="mb-2 block text-xs font-medium uppercase tracking-wide text-[var(--ink-muted)]">
                  Preferred Day
                </label>
                <input
                  id="date"
                  ref={dateFieldRef}
                  type="date"
                  value={form.date}
                  onChange={(e) => updateForm({ date: e.target.value })}
                  min={new Date().toISOString().slice(0, 10)}
                  className="focus-ring min-h-[48px] w-full rounded-none border border-[var(--rule)] bg-transparent px-4 text-[var(--ink)]"
                />
              </div>

              <div>
                <label htmlFor="time" className="mb-2 block text-xs font-medium uppercase tracking-wide text-[var(--ink-muted)]">
                  Time <span className="font-normal normal-case text-[var(--ink-muted)]">(optional)</span>
                </label>
                <input
                  id="time"
                  type="time"
                  value={form.time}
                  onChange={(e) => updateForm({ time: e.target.value })}
                  className="focus-ring min-h-[48px] w-full rounded-none border border-[var(--rule)] bg-transparent px-4 text-[var(--ink)]"
                />
                <p className="mt-1 text-xs text-[var(--ink-muted)]">Leave blank and we&apos;ll use morning as a starting point.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-wide text-[var(--ink-muted)]">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                    placeholder="Your name"
                    autoComplete="name"
                    className="focus-ring min-h-[48px] w-full rounded-none border border-[var(--rule)] bg-transparent px-4 text-[var(--ink)] placeholder:text-[var(--ink-muted)]"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-xs font-medium uppercase tracking-wide text-[var(--ink-muted)]">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateForm({ phone: e.target.value })}
                    placeholder={SITE_PHONE_PLACEHOLDER}
                    autoComplete="tel"
                    className="focus-ring min-h-[48px] w-full rounded-none border border-[var(--rule)] bg-transparent px-4 text-[var(--ink)] placeholder:text-[var(--ink-muted)]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="details" className="mb-2 block text-xs font-medium uppercase tracking-wide text-[var(--ink-muted)]">
                  Details <span className="font-normal normal-case text-[var(--ink-muted)]">(optional)</span>
                </label>
                <textarea
                  id="details"
                  value={form.details}
                  onChange={(e) => updateForm({ details: e.target.value })}
                  placeholder="Car & problem, TV size, project idea…"
                  rows={3}
                  className="focus-ring min-h-[5.5rem] w-full resize-y rounded-none border border-[var(--rule)] bg-transparent px-4 py-3 text-[var(--ink)] placeholder:text-[var(--ink-muted)]"
                />
              </div>
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

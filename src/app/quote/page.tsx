"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin, Tag } from "lucide-react";
import { BackToHome } from "@/components/back-to-home";
import { bookUrlWithSchedule } from "@/lib/booking-nav";
import { AutoFixedPricingGrid } from "@/components/auto-fixed-pricing-grid";
import {
  AUTO_PRICING_PARTS_DISCLAIMER,
  HANDYMAN_BUNK_BED,
  DIY_HOURLY,
  DIY_MECHANIC_HOURLY,
  DIY_PACKAGES,
  HANDYMAN_CAMERA_EACH,
  HANDYMAN_FURNITURE_EACH,
  HANDYMAN_TV_PACKAGES,
  HANDYMAN_WINDOW_TREATMENT,
  bookDiyHref,
  bookHandymanHref,
} from "@/lib/fixed-quote-options";
import { toTitleCase } from "@/lib/utils";

type QuoteTab = "handyman" | "diy" | "auto";

function QuotePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("for");
  const tab: QuoteTab = tabParam === "diy" || tabParam === "auto" || tabParam === "handyman" ? tabParam : "handyman";

  const setTabAndUrl = (next: QuoteTab) => {
    router.replace(`/quote?for=${next}`, { scroll: false });
  };

  const cameraOptions = [1, 2, 3, 4, 5, 6].map((n) => ({
    n,
    price: n * HANDYMAN_CAMERA_EACH,
    label: toTitleCase(`${n} camera${n > 1 ? "s" : ""}`),
  }));

  const furnitureOptions = [1, 2, 3, 4, 5, 6].map((n) => ({
    n,
    price: n * HANDYMAN_FURNITURE_EACH,
    label: toTitleCase(`${n} item${n > 1 ? "s" : ""}`),
  }));

  return (
    <main className="relative min-h-screen overflow-x-hidden pb-20">
      <div className="noise-overlay" aria-hidden />
      <div className="relative z-10 mx-auto max-w-4xl px-4 pt-6 sm:px-6 sm:pt-8">
        <div className="flex flex-wrap items-center gap-2">
          <BackToHome />
          <span className="premium-badge badge-orange flex items-center gap-1.5 text-[11px]">
            <MapPin className="h-3 w-3" aria-hidden />
            Fargo
          </span>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Tag className="h-6 w-6 text-orange-400" aria-hidden />
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">See Fixed Pricing</h1>
        </div>
        <p className="mt-2 max-w-xl text-sm text-zinc-400 sm:text-base">
          Tap a fixed price for the service you want. You&apos;ll go straight to booking with that total already filled in.
        </p>

        <div
          className="mt-8 grid grid-cols-3 gap-1 rounded-full border border-white/[0.1] bg-white/[0.04] p-1 sm:mt-10"
          role="tablist"
          aria-label="Quote category"
        >
          {(
            [
              { id: "handyman" as const, label: "Handyman" },
              { id: "diy" as const, label: "DIY" },
              { id: "auto" as const, label: "Auto" },
            ] satisfies { id: QuoteTab; label: string }[]
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTabAndUrl(t.id)}
              className={`min-h-9 rounded-full px-2 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:px-3 sm:text-sm ${
                tab === t.id ? "bg-orange-500 text-black" : "text-zinc-400 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "handyman" && (
          <motion.div
            key="handyman"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-10 space-y-12"
          >
            <section aria-labelledby="tv-heading">
              <h2 id="tv-heading" className="text-lg font-semibold text-white sm:text-xl">
                TV Wall Mount
              </h2>
              <p className="mt-1 text-sm text-zinc-500">Fixed price by screen size · parts extra if we supply</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {HANDYMAN_TV_PACKAGES.map((p) => (
                  <li key={p.label}>
                    <Link
                      href={bookHandymanHref(p.price, `TV mount ${p.label}`)}
                      className="flex min-h-[3rem] flex-col justify-center rounded-xl border border-white/[0.08] bg-black/40 px-3 py-2.5 transition-colors hover:border-orange-500/40 hover:bg-orange-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                    >
                      <span className="text-sm font-medium text-zinc-200">{p.label}</span>
                      <span className="text-xl font-bold text-orange-400">${p.price.toFixed(2)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="cam-heading">
              <h2 id="cam-heading" className="text-lg font-semibold text-white sm:text-xl">
                Security Cameras
              </h2>
              <p className="mt-1 text-sm text-zinc-500">${HANDYMAN_CAMERA_EACH} · installation</p>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {cameraOptions.map((o) => (
                  <li key={o.n}>
                    <Link
                      href={bookHandymanHref(o.price, `Security cameras x${o.n}`)}
                      className="flex min-h-[3.5rem] flex-col items-center justify-center rounded-xl border border-white/[0.08] bg-black/40 px-2 py-2.5 text-center transition-colors hover:border-orange-500/40 hover:bg-orange-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                    >
                      <span className="text-xs text-zinc-400">{o.label}</span>
                      <span className="text-lg font-bold text-white">${o.price}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="fur-heading">
              <h2 id="fur-heading" className="text-lg font-semibold text-white sm:text-xl">
                Furniture Assembly
              </h2>
              <p className="mt-1 text-sm text-zinc-500">${HANDYMAN_FURNITURE_EACH} per item · same visit</p>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {furnitureOptions.map((o) => (
                  <li key={o.n}>
                    <Link
                      href={bookHandymanHref(o.price, `Furniture assembly x${o.n}`)}
                      className="flex min-h-[3.5rem] flex-col items-center justify-center rounded-xl border border-white/[0.08] bg-black/40 px-2 py-2.5 text-center transition-colors hover:border-orange-500/40 hover:bg-orange-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                    >
                      <span className="text-xs text-zinc-400">{o.label}</span>
                      <span className="text-lg font-bold text-white">${o.price}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="window-heading">
              <h2 id="window-heading" className="text-lg font-semibold text-white sm:text-xl">
                Window Treatment Installation (Blinds &amp; Curtains)
              </h2>
              <p className="mt-1 text-sm text-zinc-500">Flat-rate installation</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                <li>
                  <Link
                    href={bookHandymanHref(HANDYMAN_WINDOW_TREATMENT, "Window treatment installation")}
                    className="flex min-h-[3.5rem] flex-col justify-center rounded-xl border border-white/[0.08] bg-black/40 px-3 py-2.5 transition-colors hover:border-orange-500/40 hover:bg-orange-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                  >
                    <span className="text-sm font-medium text-zinc-200">Blinds or Curtains Install</span>
                    <span className="text-xl font-bold text-orange-400">${HANDYMAN_WINDOW_TREATMENT}</span>
                  </Link>
                </li>
              </ul>
            </section>

            <section aria-labelledby="bunk-bed-heading">
              <h2 id="bunk-bed-heading" className="text-lg font-semibold text-white sm:text-xl">
                Bunk Bed Assembly
              </h2>
              <p className="mt-1 text-sm text-zinc-500">Flat-rate assembly service</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                <li>
                  <Link
                    href={bookHandymanHref(HANDYMAN_BUNK_BED, "Bunk bed assembly")}
                    className="flex min-h-[3.5rem] flex-col justify-center rounded-xl border border-white/[0.08] bg-black/40 px-3 py-2.5 transition-colors hover:border-orange-500/40 hover:bg-orange-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                  >
                    <span className="text-sm font-medium text-zinc-200">Bunk Bed Assembly</span>
                    <span className="text-xl font-bold text-orange-400">${HANDYMAN_BUNK_BED}</span>
                  </Link>
                </li>
              </ul>
            </section>

            <p className="text-center text-sm text-zinc-500">
              <Link href="/handyman/services" className="text-orange-400 hover:underline">
                What&apos;s included on each service →
              </Link>
            </p>
          </motion.div>
        )}

        {tab === "diy" && (
          <motion.div
            key="diy"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-10"
          >
            <p className="text-sm text-zinc-500">
              {`Bay $${DIY_HOURLY}/hr · mechanic add-on $${DIY_MECHANIC_HOURLY}/hr. Pick the block that fits your job.`}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {DIY_PACKAGES.map((pkg) => (
                <li key={pkg.id}>
                  <Link
                    href={bookDiyHref(pkg)}
                    className="flex min-h-[4.5rem] flex-col justify-center rounded-xl border border-white/[0.08] bg-black/40 px-4 py-3 transition-colors hover:border-orange-500/40 hover:bg-orange-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-semibold text-white">{pkg.label}</span>
                        <p className="mt-0.5 text-xs text-zinc-500">{pkg.sub}</p>
                      </div>
                      <span className="text-2xl font-bold text-orange-400">${pkg.total}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center text-sm text-zinc-500">
              <Link href="/diy-garage/services" className="text-orange-400 hover:underline">
                Equipment &amp; bay details →
              </Link>
            </p>
          </motion.div>
        )}

        {tab === "auto" && (
          <motion.div
            key="auto"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-10"
          >
            <p className="text-sm text-zinc-500">
              Starting prices for common jobs. We&apos;ll confirm your vehicle and any parts before work—no surprises.{" "}
              {AUTO_PRICING_PARTS_DISCLAIMER}
            </p>
            <AutoFixedPricingGrid className="mt-6" />
            <p className="mt-6 text-center text-sm text-zinc-500">
              <Link href="/auto/services" className="text-orange-400 hover:underline">
                Full auto services list →
              </Link>
            </p>
          </motion.div>
        )}

        <div className="mt-14 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6">
          <div className="flex gap-3">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-zinc-500" aria-hidden />
            <div>
              <p className="text-sm font-medium text-zinc-300">Something else?</p>
              <p className="mt-1 text-sm text-zinc-500">
                Custom auto work or I.T. projects—book and describe what you need; we&apos;ll quote before starting.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href={bookUrlWithSchedule("/book?service=automotive")}
                  className="inline-flex min-h-8 items-center gap-1 rounded-full border border-white/15 px-3 text-xs font-medium text-white hover:border-orange-500/40 hover:bg-orange-500/10 sm:text-sm"
                >
                  Book Auto (Open)
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
                <Link
                  href={bookUrlWithSchedule("/book?service=it")}
                  className="inline-flex min-h-8 items-center gap-1 rounded-full border border-white/15 px-3 text-xs font-medium text-white hover:border-cyan-500/40 hover:bg-cyan-500/10 sm:text-sm"
                >
                  Book I.T.
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function QuoteFallback() {
  return (
    <main className="relative min-h-[50vh] px-4 py-12">
      <div className="noise-overlay" aria-hidden />
      <div className="mx-auto max-w-4xl">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-white/10" />
        <div className="mt-8 h-64 animate-pulse rounded-2xl bg-white/5" />
      </div>
    </main>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={<QuoteFallback />}>
      <QuotePageInner />
    </Suspense>
  );
}

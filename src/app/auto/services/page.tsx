"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { BackToHome } from "@/components/back-to-home";
import { AutoFixedPricingGrid } from "@/components/auto-fixed-pricing-grid";
import { AUTO_PRICING_PARTS_DISCLAIMER } from "@/lib/fixed-quote-options";
import { siteImages } from "@/lib/site-images";

/* Four of the shop's own photographs. Was seven stock slides, two of them
   repeats — see the note on AUTO_HERO_IMAGES in ../page.tsx. */
const AUTO_SERVICES_HERO_IMAGES = [
  siteImages.shopBays,
  siteImages.shopParts,
  siteImages.shopTires,
  siteImages.shopBayDoor,
];
const HERO_SLIDE_DURATION_MS = 4500;
const autoServicesHeroLabels = [
  "Cars up on the lifts",
  "Parts on the shelf",
  "Tire stock",
  "The bay door, open",
];

const diagnosticsIncludes = [
  "We read every code, including the ones only your make stores",
  "We watch the live readings with the engine running",
  "You get the results the same day, before anyone touches anything",
  "We tell you what we found in plain English, and what we’d do next",
];

const brakeIncludes = [
  "Pads and rotors checked, and replaced if they need it",
  "Calipers serviced and the brake fluid flushed",
  "Bushings, struts and ball joints, while we’re under there",
  "Your choice of factory parts or good aftermarket ones",
];

const engineIncludes = [
  "Oil and filter changed",
  "Tune-ups — plugs, coils, air and fuel filters",
  "Timing and serpentine belts",
  "Whatever your manual says is due next",
];

const batteryIncludes = [
  "Battery tested and the charging system checked",
  "A new battery installed, and registered if your car needs that",
  "Starter and alternator looked at while we’re there",
  "About 90 minutes, if we have the part on the shelf",
];

const sections = [
  {
    id: "diagnostics",
    title: "Diagnostics & Check-Engine Lights",
    description: "Light on, or the car just feels off? We’ll scan it and find out what’s really going on.",
    includes: diagnosticsIncludes,
    stat: "Same-day results",
  },
  {
    id: "brake-suspension",
    title: "Brake & Suspension Repair",
    description: "Squeaking, grinding, pulling to one side, riding rough. We check everything that stops the car and fix what needs it.",
    includes: brakeIncludes,
    stat: "Factory-quality parts",
  },
  {
    id: "engine-maintenance",
    title: "Engine, Tune-Ups & Maintenance",
    description: "Oil, filters, plugs, belts. We keep you on the schedule your car was built around.",
    includes: engineIncludes,
    stat: "Kept on schedule",
  },
  {
    id: "battery-charging",
    title: "Battery, Starter & Charging",
    description: "Won’t start, or turns over slow? We test the whole system and fix what’s actually causing it.",
    includes: batteryIncludes,
    stat: "90-min turnaround",
  },
];

export default function AutoServicesPage() {
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  useEffect(() => {
    if (carouselPaused) return;
    const t = setInterval(() => {
      setHeroSlideIndex((i) => (i + 1) % AUTO_SERVICES_HERO_IMAGES.length);
    }, HERO_SLIDE_DURATION_MS);
    return () => clearInterval(t);
  }, [carouselPaused]);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="noise-overlay" aria-hidden />

      {/* ─── HERO (same layout as homepage) ─── */}
      <section className="relative flex min-h-[85vh] flex-col pb-14 sm:min-h-[88vh] sm:pb-16 lg:min-h-[88vh] lg:pb-8">
        <div className="hero-bg-gradient" aria-hidden />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pt-0 pb-10 sm:px-6 sm:pt-2 sm:pb-16 lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14 lg:px-8 lg:pt-4 lg:pb-20 xl:gap-20">
          {/* Left: Copy */}
          <div className="order-2 mt-8 lg:order-1 lg:mt-0 lg:max-w-[36rem]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 flex flex-wrap items-center gap-2 sm:mb-6"
            >
              <BackToHome />
              <span className="premium-badge badge-orange flex items-center gap-1.5">
                Fargo, ND
              </span>
              <span className="premium-badge badge-orange orbitron text-[10px] tracking-[0.15em]">
                AUTO · SERVICES & PRICING
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-[2rem] font-bold leading-[1.2] tracking-tight min-[375px]:text-[2.5rem] sm:text-4xl sm:leading-[1.18] lg:text-[3rem] lg:leading-[1.15] xl:text-5xl"
            >
              <span className="metal-text block">Automotive Service pricing</span>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="mt-4 flex items-center gap-3 sm:mt-5 sm:gap-4"
              >
                <span
                  className="h-px w-8 shrink-0 bg-gradient-to-r from-orange-400/60 to-transparent sm:w-10"
                  aria-hidden
                />
                <span className="text-base font-medium tracking-wide text-[var(--ink)]/95 sm:text-lg sm:tracking-normal lg:text-xl">
                  <span className="text-[var(--accent-strong)]">Priced before we start</span>
                  <span className="text-[var(--ink)]/90">—you’ll have the estimate in writing before we touch your car.</span>
                </span>
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-6 border-l-2 border-[var(--accent)] pl-4 text-[15px] leading-[1.6] text-[var(--ink-muted)] sm:mt-7 sm:text-base sm:leading-[1.65]"
            >
              Pick whatever sounds closest below. Not sure? Just book it and we’ll figure out what you actually need when you get here.{" "}
              {AUTO_PRICING_PARTS_DISCLAIMER}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7"
            >
              <Link
                href="/quote?for=auto"
 className="btn-primary inline-flex items-center justify-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                All Automotive Prices
              </Link>
              <Link
                href="/book/automotive"
 className="btn-outline inline-flex items-center gap-2 rounded-full border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)] shadow-sm backdrop-blur-sm transition-colors hover:border-[var(--rule)] hover:bg-[var(--surface)] hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Book a Repair
              </Link>
            </motion.div>
          </div>

          {/* Right: Image carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="hero-image-wrap order-1 lg:order-2"
          >
            <div className="hero-glow" aria-hidden />
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--surface)] ring-1 ring-[var(--rule)] lg:aspect-[16/10]"
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => setCarouselPaused(false)}
              onFocus={() => setCarouselPaused(true)}
              onBlur={() => setCarouselPaused(false)}
            >
              <div
                aria-live="polite"
                aria-label={`Slide ${heroSlideIndex + 1}: ${autoServicesHeroLabels[heroSlideIndex] ?? "Auto services"}`}
                className="sr-only"
              />
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={heroSlideIndex}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={AUTO_SERVICES_HERO_IMAGES[heroSlideIndex]}
                    alt={`Auto services in Fargo, ND — ${autoServicesHeroLabels[heroSlideIndex] ?? "Auto services"}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={heroSlideIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="img-side-overlay z-10" />
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center sm:bottom-5 sm:left-5 sm:right-5">
                <div className="flex gap-2">
                  {AUTO_SERVICES_HERO_IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setHeroSlideIndex(idx)}
                      className={`rounded-full transition-all duration-300 ${
                        idx === heroSlideIndex ? "h-2 w-8 bg-orange-400" : "h-2 w-2 bg-[var(--surface)] hover:bg-[var(--surface)]"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                      aria-current={idx === heroSlideIndex ? "true" : undefined}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {sections.map((section, idx) => {
            return (
              <motion.section
                key={section.id}
                id={section.id}
                className="rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-5 backdrop-blur-sm sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <h2 className="text-base font-bold text-[var(--ink)]">{section.title}</h2>
                      <p className="mt-0.5 text-xs font-semibold text-[var(--accent-strong)]">{section.stat}</p>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">{section.description}</p>

                <ul className="mt-4 space-y-2 text-sm text-[var(--ink-muted)]">
                  {section.includes.slice(0, 4).map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-col gap-2">
                  <Link
                    href="/book/automotive"
 className="btn-outline group inline-flex items-center justify-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                  >
                    Book a Repair
                  </Link>
                </div>
              </motion.section>
            );
          })}
        </div>
      </section>

      <section
        id="fixed-pricing"
        className="relative mx-auto max-w-7xl scroll-mt-28 px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8"
      >
        <h2 className="text-center text-xl font-bold text-[var(--ink)] sm:text-2xl">
          Common <span className="orange-glow-text">fixed starting prices</span>
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-[var(--ink-muted)]">
          These are starting prices for the usual jobs. We’ll match it to your car and go over it with you first. {AUTO_PRICING_PARTS_DISCLAIMER}
        </p>
        <AutoFixedPricingGrid className="mx-auto mt-8 max-w-5xl" />
        <p className="mt-6 text-center text-sm text-[var(--ink-muted)]">
          <Link href="/quote?for=auto" className="text-[var(--accent-strong)] hover:underline">
            All Automotive Prices →
          </Link>
        </p>
      </section>


      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-[var(--rule)] bg-[var(--surface)] backdrop-blur-sm p-6 sm:p-8">
          <div>
            <h2 className="text-xl font-bold text-[var(--ink)]">Book a time</h2>
            <p className="mt-1 text-[var(--ink-muted)]">Pick a time that works for you. We’ll confirm it and tell you exactly what happens next.</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/book/automotive"
 className="btn-primary group inline-flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Book a Repair
            </Link>
            <Link
              href="/auto"
 className="btn-outline inline-flex items-center gap-2 rounded-full border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)] shadow-sm backdrop-blur-sm transition-colors hover:border-[var(--rule)] hover:bg-[var(--surface)] hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Back to Automotive Service
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

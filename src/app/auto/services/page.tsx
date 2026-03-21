"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BatteryCharging, Check, ChevronDown, Gauge, MapPin, ShieldCheck, Wrench } from "lucide-react";
import { BackToHome } from "@/components/back-to-home";
import { ServiceStandardsSection } from "@/components/service-standards-section";
import { AutoFixedPricingGrid } from "@/components/auto-fixed-pricing-grid";
import { bookUrlWithSchedule } from "@/lib/booking-nav";
import { AUTO_PRICING_PARTS_DISCLAIMER } from "@/lib/fixed-quote-options";

const AUTO_SERVICES_HERO_IMAGES = [
  "/hero/hero-bays.png",
  "/hero/hero-auto-slide-services.png",
  "/images/AUTO/brice-cooper-a3W_62jM0kg-unsplash.jpg",
  "/images/AUTO/michael-lock-xEPZKFzGrVw-unsplash.jpg",
  "/images/AUTO/WhatsApp Image 2026-03-18 at 11.29.17.jpeg",
  "/images/AUTO/WhatsApp Image 2026-03-18 at 11.29.17 (1).jpeg",
  "/images/AUTO/WhatsApp Image 2026-03-18 at 10.55.57 (3).jpeg",
];
const HERO_SLIDE_DURATION_MS = 4500;
const autoServicesHeroLabels = [
  "Service Bays",
  "Services Overview",
  "Auto Diagnostics",
  "Auto Repair",
  "Audio and Trunk Setup",
  "Engine Detail Close-Up",
  "Oil Service",
];

const diagnosticsIncludes = [
  "OBD2 / manufacturer-level fault code scan",
  "Live data and readiness checks",
  "Same-day results; report sent before any work",
  "Clear explanation of findings and recommended next steps",
];

const brakeIncludes = [
  "Brake pad and rotor inspection and replacement",
  "Caliper service and brake fluid flush",
  "Suspension bushings, struts, and ball joints",
  "OEM or quality aftermarket parts",
];

const engineIncludes = [
  "Oil changes and filter replacement",
  "Tune-ups: plugs, coils, air/fuel filters",
  "Timing belts and serpentine belts",
  "Scheduled maintenance per your manual",
];

const batteryIncludes = [
  "Battery test and charging system check",
  "Battery replacement and registration when required",
  "Starter and alternator diagnostics",
  "~90-minute turnaround when parts in stock",
];

const sections = [
  {
    id: "diagnostics",
    title: "Diagnostics & Check Engine",
    description: "If a light is on or something feels off, we’ll scan and verify what’s actually happening.",
    includes: diagnosticsIncludes,
    icon: Gauge,
    stat: "Same-day results",
  },
  {
    id: "brake-suspension",
    title: "Brake & Suspension Repair",
    description: "Squeaks, grinding, pulling, or rough ride—get safety-critical items checked and fixed.",
    includes: brakeIncludes,
    icon: ShieldCheck,
    stat: "OEM-quality parts",
  },
  {
    id: "engine-maintenance",
    title: "Engine, Tune-Ups & Maintenance",
    description: "Stay on schedule with oil, filters, plugs, belts, and manufacturer-recommended maintenance.",
    includes: engineIncludes,
    icon: Wrench,
    stat: "Full-spectrum care",
  },
  {
    id: "battery-charging",
    title: "Battery, Starter & Charging",
    description: "No-start, slow crank, or dead battery. We test the system and fix the root cause.",
    includes: batteryIncludes,
    icon: BatteryCharging,
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
                <MapPin className="h-3.5 w-3.5" aria-hidden />
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
              <span className="metal-text block">Auto Services</span>
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
                <span className="text-base font-medium tracking-wide text-white/95 sm:text-lg sm:tracking-normal lg:text-xl">
                  <span className="text-orange-300">Choose fast</span>
                  <span className="text-white/90">—we’ll confirm your written estimate before any work.</span>
                </span>
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-6 border-l-2 border-orange-500/50 pl-4 text-[15px] leading-[1.6] text-zinc-400 sm:mt-7 sm:text-base sm:leading-[1.65]"
            >
              Pick what sounds closest below. If you’re not sure, book and we’ll route you correctly—no surprises, no pressure.{" "}
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
 className="btn-primary inline-flex items-center justify-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Fixed auto prices
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
              <Link
                href={bookUrlWithSchedule("/book?service=automotive")}
 className="btn-outline inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Book (any job)
              </Link>
              <Link
                href="/auto"
 className="btn-outline inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Auto overview
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
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/[0.09] bg-black shadow-2xl shadow-black/40 ring-1 ring-white/[0.06] lg:aspect-[16/10]"
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
                        idx === heroSlideIndex ? "h-2 w-8 bg-orange-400" : "h-2 w-2 bg-white/35 hover:bg-white/55"
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 sm:bottom-6 lg:bottom-8"
        >
          <a
            href="#diagnostics"
            className="hero-scroll-hint flex flex-col items-center gap-1.5 text-zinc-500 transition-colors hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-md"
            aria-label="Scroll to services"
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest">See Services</span>
            <ChevronDown className="h-5 w-5 shrink-0 animate-bounce" aria-hidden />
          </a>
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="rounded-2xl border border-white/[0.10] bg-black/35 p-5 backdrop-blur-sm sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-orange-500/20 p-2.5 text-orange-300 ring-1 ring-orange-400/30">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white">{section.title}</h2>
                      <p className="mt-0.5 text-xs font-semibold text-orange-300">{section.stat}</p>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{section.description}</p>

                <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                  {section.includes.slice(0, 4).map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-col gap-2">
                  <Link
                    href={bookUrlWithSchedule(
                    `/book?service=automotive&notes=${encodeURIComponent(section.title)}`,
                  )}
 className="btn-primary group inline-flex items-center justify-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                  >
                    See Pricing / Book
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                  <Link
                    href="/auto"
 className="btn-outline inline-flex items-center justify-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                  >
                    Start intake
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
        <h2 className="text-center text-xl font-bold text-white sm:text-2xl">
          Common <span className="orange-glow-text">Fixed Starting Prices</span>
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-zinc-500">
          Starting prices for common jobs—we&apos;ll confirm your vehicle and any parts before work. {AUTO_PRICING_PARTS_DISCLAIMER}
        </p>
        <AutoFixedPricingGrid className="mx-auto mt-8 max-w-5xl" />
        <p className="mt-6 text-center text-sm text-zinc-500">
          <Link href="/quote?for=auto" className="text-orange-400 hover:underline">
            Open full pricing page →
          </Link>
        </p>
      </section>

      <ServiceStandardsSection variant="auto" />

      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/[0.08] bg-black/40 shadow-xl shadow-black/20 backdrop-blur-sm p-6 sm:p-8">
          <div>
            <h2 className="text-xl font-bold text-white">Ready to schedule?</h2>
            <p className="mt-1 text-zinc-400">Book automotive service and we’ll confirm your appointment and next steps.</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              href={bookUrlWithSchedule("/book?service=automotive")}
 className="btn-primary group inline-flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Book Automotive Service
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link
              href="/auto"
 className="btn-outline inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Back to Automotive
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { itServiceSchema } from "@/lib/schema";
import { AnimatePresence, motion } from "framer-motion";
import { BUSINESS } from "@/lib/business";
import { SectionHeading } from "@/components/section-heading";
import { BackToHome } from "@/components/back-to-home";
import { siteImages } from "@/lib/site-images";

const IT_SERVICES_BASE = "/it/services";
const HERO_SLIDE_DURATION_MS = 4500;
const IT_HERO_IMAGES = [
  "/hero/hero-bays.webp",
  "/hero/diy-garage-bay.webp",
  "/hero/hero-auto-slide-services.webp",
  "/hero/hero-handyman-grid.webp",
] as const;
const itHeroSlideLabels = ["Service bays", "DIY bay", "Auto services", "Home installs"] as const;

const itServices = [
  {
    id: "web-dev",
    title: "Website & App Building",
    navLabel: "Websites",
    short: "Need a website or online store? We build it for you—fast, mobile-friendly, and easy to manage.",
    href: `${IT_SERVICES_BASE}#web-dev`,
  },
  {
    id: "database",
    title: "Data & Reporting",
    navLabel: "Data",
    short: "We organize your business data so you can look things up, run reports, and stop using spreadsheets.",
    href: `${IT_SERVICES_BASE}#database`,
  },
  {
    id: "network",
    title: "Wi-Fi & Internet Setup",
    navLabel: "Wi-Fi",
    short: "Bad signal? Slow connection? We get your internet working everywhere in your home or shop.",
    href: `${IT_SERVICES_BASE}#network`,
  },
  {
    id: "pc-builds",
    title: "Computer Help & Repair",
    navLabel: "Computers",
    short: "Slow PC, broken laptop, or need a new computer built? We fix it or build one that fits your budget.",
    href: `${IT_SERVICES_BASE}#pc-builds`,
  },
];

const techNames = ["Websites", "Online Stores", "Business Apps", "Wi-Fi Setup", "PC Repair", "Data Reports"];

export default function ITPages() {
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  useEffect(() => {
    if (carouselPaused) return;
    const t = setInterval(() => {
      setHeroSlideIndex((i) => (i + 1) % IT_HERO_IMAGES.length);
    }, HERO_SLIDE_DURATION_MS);
    return () => clearInterval(t);
  }, [carouselPaused]);

  return (
    <main className="relative overflow-x-hidden">
      <JsonLd data={itServiceSchema()} />
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
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-[2rem] font-bold leading-[1.2] tracking-tight min-[375px]:text-[2.5rem] sm:text-4xl sm:leading-[1.18] lg:text-[3rem] lg:leading-[1.15] xl:text-5xl"
            >
              <span className="metal-text block">Tech Help</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-5 text-[15px] leading-[1.6] text-[var(--ink)] sm:mt-6 sm:text-base sm:leading-[1.7]"
            >
              Wi-Fi setup, computer repair, websites, and anything tech. Tell us what’s not working and we’ll sort it out.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7"
            >
              <a
                href={BUSINESS.phone.tel}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--cool)] px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-[var(--cool)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
              >
                Call {BUSINESS.phone.display}
              </a>
              <Link
                href="/quote"
 className="btn-outline inline-flex items-center gap-2 rounded-full border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)] shadow-sm backdrop-blur-sm transition-colors hover:border-[var(--cool)] hover:bg-[var(--cool-soft)] hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Get a Price
              </Link>
            </motion.div>
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="hero-image-wrap order-1 lg:order-2"
          >
            <div className="hero-glow" aria-hidden />
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[var(--cool)] bg-[var(--surface)] ring-1 ring-[var(--rule)] lg:aspect-[16/10]"
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => setCarouselPaused(false)}
              onFocus={() => setCarouselPaused(true)}
              onBlur={() => setCarouselPaused(false)}
            >
              <div
                aria-live="polite"
                aria-label={`Slide ${heroSlideIndex + 1}: ${itHeroSlideLabels[heroSlideIndex] ?? "Tech help"}`}
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
                    src={IT_HERO_IMAGES[heroSlideIndex]}
                    alt={`Tech help in Fargo, ND — ${itHeroSlideLabels[heroSlideIndex] ?? "Tech help"}`}
                    fill
                    className="object-cover opacity-90"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={heroSlideIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--cool)]/15 to-transparent" aria-hidden />
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
            href="#services"
            className="hero-scroll-hint flex flex-col items-center gap-1.5 text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-md"
            aria-label="Scroll to services"
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest">See Services</span>
          </a>
        </motion.div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="relative mx-auto max-w-7xl scroll-mt-28 px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <SectionHeading
          title="I.T. and support"
          description="Websites, data, Wi-Fi, computers. Every job is different, so we look first and then give you a fixed price."
        />

        <nav aria-label="Jump to service" className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {itServices.map((s) => (
            <Link
              key={s.id}
              href={s.href}
              className="rounded-full border border-[var(--rule)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--cool)] hover:bg-[var(--cool)] hover:brightness-110/10 hover:text-[var(--cool)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              {s.navLabel}
            </Link>
          ))}
        </nav>

        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
          {itServices.map((service, i) => {
            return (
              <motion.div
                key={service.id}
              >
                <Link
                  href={service.href}
                  className="group flex items-start gap-4 rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 sm:p-5 text-left transition-all duration-200 hover:border-[var(--cool)] hover:bg-[var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                >
                  <span className="flex-1 min-w-0">
                    <span className="font-semibold text-[var(--ink)] block group-hover:text-[var(--cool)] transition-colors">{service.title}</span>
                    <span className="text-sm text-[var(--ink-muted)] mt-1 block leading-snug">{service.short}</span>
                    <span className="mt-2 inline-flex items-center text-sm font-medium text-[var(--cool)] opacity-0 transition-opacity group-hover:opacity-100">
                      View Details
                    </span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-[var(--ink-muted)]">
          We work with: {techNames.join(", ")}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href={BUSINESS.phone.tel}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--cool)] px-4 py-2 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-[var(--cool)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:h-11 sm:px-5 sm:py-2.5"
          >
            Call {BUSINESS.phone.display}
          </a>
          <Link
                href="/quote"
            className="text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--cool)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded"
          >
            Get a Price →
          </Link>
        </div>
      </section>

    </main>
  );
}

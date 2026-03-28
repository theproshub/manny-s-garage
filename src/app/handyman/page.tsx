"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { handymanServiceSchema } from "@/lib/schema";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, MapPin, Tag } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { ServiceStandardsSection } from "@/components/service-standards-section";
import { BackToHome } from "@/components/back-to-home";
import { bookUrlWithSchedule } from "@/lib/booking-nav";

/** Handyman hero slides (new portfolio + stock), shuffled order */
const HANDYMAN_HERO_IMAGES = [
  "/images/AUTO/HANDYMAN/handyman-hero-1.webp",
  "/images/AUTO/HANDYMAN/thom-milkovic-uV1weWrJnRM-unsplash.webp",
  "/images/AUTO/HANDYMAN/handyman-hero-2.webp",
  "/images/AUTO/HANDYMAN/alexis-dreher-MfnLwbch9_o-unsplash.webp",
  "/images/AUTO/HANDYMAN/handyman-hero-3.webp",
  "/images/AUTO/HANDYMAN/boliviainteligente-8KJymJAC9sA-unsplash.webp",
  "/images/AUTO/HANDYMAN/handyman-hero-4.webp",
  "/images/AUTO/HANDYMAN/handyman-hero-5.webp",
  "/images/AUTO/HANDYMAN/thibault-penin-SwKf1x2_hRo-unsplash.webp",
  "/images/AUTO/HANDYMAN/handyman-hero-6.webp",
  "/hero/hero-handyman.webp",
  "/hero/hero-handyman-service-list.webp",
];
const HERO_SLIDE_DURATION_MS = 4500;

const SERVICES_LIST = [
  { title: "Furniture Assembly", price: "$50 per item", href: "/handyman/services#furniture" },
  { title: "TV Mounting", price: "$1.50 per inch", href: "/handyman/services#tv-mounting" },
  { title: "Security Camera Installation", price: "$120", href: "/handyman/services#security-cameras" },
  { title: "Window Treatment Installation", price: "$50", href: "/quote?for=handyman" },
  { title: "Bunk Bed Assembly", price: "$100", href: "/quote?for=handyman" },
] as const;

const handymanHeroSlideLabels = [
  "TV & Media",
  "TV Mounting",
  "Smart Lighting",
  "Home Installs",
  "Projector & Screen",
  "Security & Cameras",
  "Home Theater",
  "Bedroom Setup",
  "Professional Install",
  "LED & Mood Lighting",
  "Handyman Service",
  "Fargo Handyman",
  "Handyman Service List",
];

export default function HandymanPage() {
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  useEffect(() => {
    if (carouselPaused) return;
    const t = setInterval(() => {
      setHeroSlideIndex((i) => (i + 1) % HANDYMAN_HERO_IMAGES.length);
    }, HERO_SLIDE_DURATION_MS);
    return () => clearInterval(t);
  }, [carouselPaused]);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <JsonLd data={handymanServiceSchema()} />
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
                HANDYMAN
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-[2rem] font-bold leading-[1.2] tracking-tight min-[375px]:text-[2.5rem] sm:text-4xl sm:leading-[1.18] lg:text-[3rem] lg:leading-[1.15] xl:text-5xl"
            >
              <span className="metal-text block">Handyman</span>
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
                  <span className="text-orange-300">TV Mounting</span>
                  <span className="text-white/90">—Security Cameras & Furniture Assembly with fixed pricing.</span>
                </span>
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-6 border-l-2 border-orange-500/50 pl-4 text-[15px] leading-[1.6] text-zinc-400 sm:mt-7 sm:text-base sm:leading-[1.65]"
            >
              Fixed prices for TV mounting, cameras, and furniture—pick yours on the pricing page and book in one tap.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7"
            >
              <Link
                href="/quote?for=handyman"
 className="btn-primary inline-flex items-center justify-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                <Tag className="h-4 w-4 shrink-0" aria-hidden />
                See Pricing
              </Link>
              <Link
                href={bookUrlWithSchedule("/book?service=handyman")}
 className="btn-outline inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Book Directly
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
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
                aria-label={`Slide ${heroSlideIndex + 1}: ${handymanHeroSlideLabels[heroSlideIndex] ?? "Handyman Service"}`}
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
                    src={HANDYMAN_HERO_IMAGES[heroSlideIndex]}
                    alt={`Handyman services in Fargo, ND — ${handymanHeroSlideLabels[heroSlideIndex] ?? "Handyman Service"}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={70}
                    priority={heroSlideIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="img-side-overlay z-10" />
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center sm:bottom-5 sm:left-5 sm:right-5">
                <div className="flex gap-2">
                  {HANDYMAN_HERO_IMAGES.map((_, idx) => (
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
          <Link
            href="/quote?for=handyman"
            className="hero-scroll-hint flex flex-col items-center gap-1.5 text-zinc-500 transition-colors hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-md"
            aria-label="Get a fixed price quote"
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest">See Pricing</span>
            <ChevronDown className="h-5 w-5 shrink-0 animate-bounce" aria-hidden />
          </Link>
        </motion.div>
      </section>

      {/* Services & Pricing — simple list */}
      <section className="relative mx-auto max-w-7xl scroll-mt-28 px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <SectionHeading
          badge="Services & Pricing"
          title="What We Offer"
          description="Fixed prices below. Tap a package on the pricing page to book with that total."
          align="center"
        />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-10 rounded-2xl border border-white/[0.08] bg-black/40 overflow-hidden"
        >
          <ul className="divide-y divide-white/[0.06]">
            {SERVICES_LIST.map((service) => (
              <li key={service.title}>
                <Link
                  href={service.href}
                  className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5 text-left transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-inset"
                >
                  <span className="font-medium text-white">{service.title}</span>
                  <span className="font-semibold text-orange-400">{service.price}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Fixed pricing — one page, tap a price */}
      <section id="calculator" className="relative border-y border-white/[0.06] bg-black/30 py-16 sm:py-20 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            badge="Fixed Prices"
            title="Pick Your Package—Then Book"
            description="No dropdowns or math. Choose the price that matches your job; booking opens with that total ready to go."
            align="center"
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/quote?for=handyman"
              className="btn-primary group inline-flex w-full max-w-xs items-center justify-center gap-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:w-auto"
            >
              <Tag className="h-4 w-4 shrink-0" aria-hidden />
              Open Pricing Page
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link
              href={bookUrlWithSchedule("/book?service=handyman")}
              className="btn-outline inline-flex w-full max-w-xs items-center justify-center gap-1.5 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:w-auto"
            >
              Book Without a Set Price
            </Link>
          </motion.div>
        </div>
      </section>

      <ServiceStandardsSection variant="handyman" />
    </main>
  );
}

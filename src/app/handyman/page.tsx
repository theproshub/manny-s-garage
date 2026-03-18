"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calculator, ChevronDown, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { BackToHome } from "@/components/back-to-home";

/** Handyman hero slides (new portfolio + stock), shuffled order */
const HANDYMAN_HERO_IMAGES = [
  "/images/AUTO/HANDYMAN/handyman-hero-1.jpeg",
  "/images/AUTO/HANDYMAN/thom-milkovic-uV1weWrJnRM-unsplash.jpg",
  "/images/AUTO/HANDYMAN/handyman-hero-2.jpeg",
  "/images/AUTO/HANDYMAN/alexis-dreher-MfnLwbch9_o-unsplash.jpg",
  "/images/AUTO/HANDYMAN/handyman-hero-3.jpeg",
  "/images/AUTO/HANDYMAN/boliviainteligente-8KJymJAC9sA-unsplash.jpg",
  "/images/AUTO/HANDYMAN/handyman-hero-4.jpeg",
  "/images/AUTO/HANDYMAN/francesca-tosolini-DmOhItSo49k-unsplash.jpg",
  "/images/AUTO/HANDYMAN/handyman-hero-5.jpeg",
  "/images/AUTO/HANDYMAN/thibault-penin-SwKf1x2_hRo-unsplash.jpg",
  "/images/AUTO/HANDYMAN/handyman-hero-6.jpeg",
  "/hero/hero-handyman.png",
];
const HERO_SLIDE_DURATION_MS = 4500;

const CAMERA_PRICE = 120;
const FURNITURE_PRICE_PER_ITEM = 50;

/** Fixed TV sizes and their price ($1.75 per inch) */
const TV_OPTIONS = [
  { value: 0, label: "None", price: 0 },
  { value: 32, label: '32"', price: 56 },
  { value: 43, label: '43"', price: 75.25 },
  { value: 55, label: '55"', price: 96.25 },
  { value: 65, label: '65"', price: 113.75 },
  { value: 75, label: '75"', price: 131.25 },
  { value: 85, label: '85"', price: 148.75 },
] as const;

const SERVICES_LIST = [
  { title: "Furniture Assembly", price: "$50 per item", href: "/handyman/services#furniture" },
  { title: "TV Mounting", price: "$1.75 per inch", href: "/handyman/services#tv-mounting" },
  { title: "Security Camera Installation", price: "$120 per camera", href: "/handyman/services#security-cameras" },
] as const;

const handymanHeroSlideLabels = [
  "TV & media",
  "TV Mounting",
  "Smart lighting",
  "Home installs",
  "Projector & screen",
  "Security & cameras",
  "Home theater",
  "Furniture Assembly",
  "Bedroom setup",
  "Professional install",
  "LED & mood lighting",
  "Handyman service",
  "Fargo handyman",
];

export default function HandymanPage() {
  const [tvOption, setTvOption] = useState(0); // inch value; 0 = None
  const [cameras, setCameras] = useState(0);
  const [furnitureItems, setFurnitureItems] = useState(0);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  useEffect(() => {
    if (carouselPaused) return;
    const t = setInterval(() => {
      setHeroSlideIndex((i) => (i + 1) % HANDYMAN_HERO_IMAGES.length);
    }, HERO_SLIDE_DURATION_MS);
    return () => clearInterval(t);
  }, [carouselPaused]);

  const estimate = useMemo(() => {
    const tvEntry = TV_OPTIONS.find((o) => o.value === tvOption);
    const tvTotal = tvEntry?.price ?? 0;
    const cameraTotal = cameras * CAMERA_PRICE;
    const furnitureTotal = furnitureItems * FURNITURE_PRICE_PER_ITEM;
    const total = tvTotal + cameraTotal + furnitureTotal;
    return {
      tvTotal,
      cameraTotal,
      furnitureTotal,
      total,
    };
  }, [tvOption, cameras, furnitureItems]);

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
              Get a fast estimate with the quote calculator, then book your install. Transparent pricing, clean work, and quick scheduling.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7"
            >
              <Link
                href="#calculator"
                className="btn-primary inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
              >
                <Calculator className="h-4 w-4 shrink-0" aria-hidden />
                Get quote
              </Link>
              <Link
                href="/book?service=handyman"
                className="btn-outline min-h-[44px] inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] px-6 py-3 text-sm font-semibold text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
              >
                Book directly
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
                aria-label={`Slide ${heroSlideIndex + 1}: ${handymanHeroSlideLabels[heroSlideIndex] ?? "Handyman service"}`}
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
                    alt={`Handyman services in Fargo, ND — ${handymanHeroSlideLabels[heroSlideIndex] ?? "Handyman service"}`}
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
          <a
            href="#calculator"
            className="hero-scroll-hint flex flex-col items-center gap-1.5 text-zinc-500 transition-colors hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-md"
            aria-label="Scroll to quote calculator"
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest">Get quote</span>
            <ChevronDown className="h-5 w-5 shrink-0 animate-bounce" aria-hidden />
          </a>
        </motion.div>
      </section>

      {/* Services & Pricing — simple list */}
      <section className="relative mx-auto max-w-7xl scroll-mt-28 px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <SectionHeading
          badge="Services & Pricing"
          title="What We Offer"
          description="Fixed prices below. Use the calculator to get your estimate."
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

      {/* Quote Calculator — fixed options only */}
      <section id="calculator" className="relative border-y border-white/[0.06] bg-black/30 py-16 sm:py-20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
            <div>
              <SectionHeading
                badge="Quote Calculator"
                title="Get Your Price Estimate"
                description="Select your options below. Prices are fixed."
              />
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 space-y-5 sm:space-y-6"
              >
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
                  <label htmlFor="tv-select" className="block text-sm font-medium text-zinc-300 mb-2">
                    TV Mounting (size)
                  </label>
                  <select
                    id="tv-select"
                    value={tvOption}
                    onChange={(e) => setTvOption(Number(e.target.value))}
                    className="focus-ring w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white transition-colors focus:border-orange-400/50 min-h-[44px]"
                  >
                    {TV_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#0c1118] text-white">
                        {opt.label} {opt.price > 0 ? `— $${opt.price.toFixed(2)}` : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
                  <label htmlFor="cameras-select" className="block text-sm font-medium text-zinc-300 mb-2">
                    Security Cameras ($120 each)
                  </label>
                  <select
                    id="cameras-select"
                    value={cameras}
                    onChange={(e) => setCameras(Number(e.target.value))}
                    className="focus-ring w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white transition-colors focus:border-orange-400/50 min-h-[44px]"
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n} className="bg-[#0c1118] text-white">
                        {n} {n === 1 ? "camera" : "cameras"} {n > 0 ? `— $${n * CAMERA_PRICE}` : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
                  <label htmlFor="furniture-select" className="block text-sm font-medium text-zinc-300 mb-2">
                    Furniture Assembly ($50 per item)
                  </label>
                  <select
                    id="furniture-select"
                    value={furnitureItems}
                    onChange={(e) => setFurnitureItems(Number(e.target.value))}
                    className="focus-ring w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white transition-colors focus:border-orange-400/50 min-h-[44px]"
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n} className="bg-[#0c1118] text-white">
                        {n} {n === 1 ? "item" : "items"} {n > 0 ? `— $${n * FURNITURE_PRICE_PER_ITEM}` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            </div>

            <div className="lg:pt-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="panel-strong sticky top-28 rounded-2xl border border-white/[0.08] p-6 sm:p-8 shadow-xl shadow-black/30"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400 ring-1 ring-orange-400/30">
                  <Calculator className="h-6 w-6" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Estimated Total</p>
                <p className="mt-2 text-3xl font-black text-white sm:text-4xl">${estimate.total.toFixed(2)}</p>
                <div className="mt-5 space-y-1.5 border-t border-white/10 pt-4 text-sm text-zinc-400">
                  {estimate.tvTotal > 0 && (
                    <p className="flex justify-between"><span>TV Mounting</span> <span>${estimate.tvTotal.toFixed(2)}</span></p>
                  )}
                  {estimate.cameraTotal > 0 && (
                    <p className="flex justify-between"><span>Cameras</span> <span>${estimate.cameraTotal}</span></p>
                  )}
                  {estimate.furnitureTotal > 0 && (
                    <p className="flex justify-between"><span>Furniture</span> <span>${estimate.furnitureTotal}</span></p>
                  )}
                </div>
                <p className="mt-4 text-xs text-zinc-500">
                  Final quote may vary. Parts not included unless specified.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href={`/book?service=handyman&estimate=${encodeURIComponent(estimate.total.toFixed(2))}`}
                    className="btn-primary group w-full min-h-[44px] justify-center inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
                  >
                    Book Service
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                  </Link>
                  <Link
                    href="/"
                    className="btn-outline w-full min-h-[44px] justify-center inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
                  >
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

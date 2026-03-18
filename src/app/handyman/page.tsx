"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { BackToHome } from "@/components/back-to-home";

const HANDYMAN_HERO_IMAGES = [
  "/hero/hero-handyman.png",
  "/images/AUTO/HANDYMAN/alexis-dreher-MfnLwbch9_o-unsplash.jpg",
  "/images/AUTO/HANDYMAN/benjamin-lehman-EJU7A__krX0-unsplash.jpg",
  "/images/AUTO/HANDYMAN/bermix-studio-iwz5tmhjl7o-unsplash.jpg",
  "/images/AUTO/HANDYMAN/boliviainteligente-8KJymJAC9sA-unsplash.jpg",
  "/images/AUTO/HANDYMAN/brett-jordan-9s7lHNieFyU-unsplash.jpg",
  "/images/AUTO/HANDYMAN/clay-banks-Cf1G7WuutC8-unsplash.jpg",
  "/images/AUTO/HANDYMAN/francesca-tosolini-DmOhItSo49k-unsplash.jpg",
  "/images/AUTO/HANDYMAN/simone-impei-eZaKj3xAzTE-unsplash.jpg",
  "/images/AUTO/HANDYMAN/thibault-penin-SwKf1x2_hRo-unsplash.jpg",
  "/images/AUTO/HANDYMAN/thom-milkovic-uV1weWrJnRM-unsplash.jpg",
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

export default function HandymanPage() {
  const [tvOption, setTvOption] = useState(0); // inch value; 0 = None
  const [cameras, setCameras] = useState(0);
  const [furnitureItems, setFurnitureItems] = useState(0);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setHeroSlideIndex((i) => (i + 1) % HANDYMAN_HERO_IMAGES.length);
    }, HERO_SLIDE_DURATION_MS);
    return () => clearInterval(t);
  }, []);

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
    <main className="relative min-h-screen overflow-x-hidden pt-6 sm:pt-10">
      <div className="noise-overlay" aria-hidden />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 lg:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <BackToHome />
            <span className="premium-badge badge-orange orbitron text-[10px] tracking-[0.15em]">
              HANDYMAN
            </span>
          </div>
          <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                TV, Cameras & <span className="orange-glow-text">Assembly</span>
              </h1>
              <p className="mt-2 text-sm text-zinc-400 max-w-md sm:text-base">
                Handyman services: TV mounting, security cameras, furniture assembly. Fixed prices—get a quote below.
              </p>
              <Link
                href="#calculator"
                className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:h-11 sm:px-5 sm:py-2.5"
              >
                <Calculator className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                Get quote
              </Link>
            </div>
            <div className="relative w-full sm:w-72 lg:w-80 aspect-video sm:aspect-[4/3] overflow-hidden rounded-xl border border-white/[0.08] bg-black/40 shrink-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={heroSlideIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={HANDYMAN_HERO_IMAGES[heroSlideIndex]}
                    alt="Handyman services: TV mounting, security cameras, furniture assembly"
                    fill
                    className="object-cover"
                    priority={heroSlideIndex === 0}
                    sizes="(max-width: 640px) 100vw, 320px"
                  />
                </motion.div>
              </AnimatePresence>
              {/* Slide indicators */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                {HANDYMAN_HERO_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setHeroSlideIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === heroSlideIndex ? "w-5 bg-orange-400" : "w-1.5 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
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
                    TV mounting (size)
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
                    Security cameras ($120 each)
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
                    Furniture assembly ($50 per item)
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
                    <p className="flex justify-between"><span>TV mounting</span> <span>${estimate.tvTotal.toFixed(2)}</span></p>
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

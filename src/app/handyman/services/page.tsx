"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Cctv, Check, Sofa, Tv } from "lucide-react";
import { BackToHome } from "@/components/back-to-home";
import { RecalculateCalculatorLink } from "@/components/recalculate-calculator-link";
import { siteImages } from "@/lib/site-images";

const FURNITURE_PRICE = 50;
const TV_PRICE_PER_INCH = 1.75;
const CAMERA_PRICE = 120;

const furnitureIncludes = [
  "Beds, bed frames, and headboards",
  "Dressers, nightstands, and chests",
  "Bookshelves and storage cabinets",
  "Desks and office furniture",
  "Wardrobes and closet systems",
  "Assembly of flat-pack (e.g. IKEA-style) items",
  "Basic leveling and hardware tightening",
  "Removal of packaging and debris",
];

const tvIncludes = [
  "Full-motion, tilting, or fixed mount (you supply or we can quote)",
  "Stud finder and secure wall anchoring",
  "Wire concealment and cable management",
  "Connection to existing HDMI/AV equipment",
  "Leveling and final positioning",
  "Up to 85\" screen size; larger by quote",
];

const cameraIncludes = [
  "Indoor or outdoor camera placement",
  "Drilling and mounting (brick, siding, soffit)",
  "Power and network cable run (within 30 ft of outlet/router)",
  "App setup and device pairing",
  "Basic recording and motion settings",
  "Per-camera pricing; multi-camera discounts on request",
];

export default function HandymanServicesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pt-10">
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
              HANDYMAN · SERVICES & PRICING
            </span>
          </div>
          <h1 className="mt-3 sm:mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Handyman <span className="orange-glow-text">Services & Pricing</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-400 max-w-xl sm:text-base">
            Furniture, TV mounting, security cameras. Fixed prices—get a quote and book below.
          </p>
        </motion.div>
      </section>

      {/* Furniture Assembly */}
      <section id="furniture" className="relative mx-auto max-w-7xl scroll-mt-28 px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black/40"
          >
            <Image
              src={siteImages.handymanFurniture}
              alt="Furniture assembly service"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <div className="rounded-xl bg-orange-500/20 p-2.5 text-orange-400 ring-1 ring-orange-400/30">
                <Sofa className="h-6 w-6" />
              </div>
              <span className="font-bold text-white text-lg">Furniture Assembly</span>
            </div>
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Furniture Assembly</h2>
            <p className="mt-3 text-zinc-400 leading-relaxed">
              We assemble beds, dressers, nightstands, cabinets, bookshelves, and more—so you don&apos;t have to. Professional assembly with proper tools and cleanup.
            </p>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Pricing</p>
              <p className="mt-2 text-3xl font-bold text-orange-400">${FURNITURE_PRICE} <span className="text-lg font-normal text-zinc-400">per item</span></p>
              <p className="mt-2 text-sm text-zinc-400">Multiple items in one visit: same rate per piece. Large or complex items may be quoted separately.</p>
              <RecalculateCalculatorLink href="/handyman#calculator" className="mt-4" />
            </div>
            <ul className="mt-6 space-y-2 text-sm text-zinc-400">
              {furnitureIncludes.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 text-orange-400 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/book?service=handyman&estimate=${FURNITURE_PRICE}&notes=furniture+assembly`}
              className="btn-primary group mt-8 min-h-[44px] inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
            >
              Get quote / Book
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* TV Mounting */}
      <section id="tv-mounting" className="relative border-y border-white/10 bg-black/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">TV Mounting</h2>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Professional TV mounting with wire management so your setup looks clean. We handle full-motion, tilting, and fixed mounts on drywall or studs.
              </p>
              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Pricing</p>
                <p className="mt-2 text-3xl font-bold text-orange-400">${TV_PRICE_PER_INCH.toFixed(2)} <span className="text-lg font-normal text-zinc-400">per inch (diagonal)</span></p>
                <p className="mt-2 text-sm text-zinc-400">Based on your TV&apos;s screen size. Example: 55&quot; = ${(55 * TV_PRICE_PER_INCH).toFixed(2)}. Mount hardware not included unless specified.</p>
                <RecalculateCalculatorLink href="/handyman#calculator" className="mt-4" />
              </div>
              <ul className="mt-6 space-y-2 text-sm text-zinc-400">
              {tvIncludes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-4 w-4 shrink-0 text-orange-400 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/book?service=handyman&estimate=${(55 * TV_PRICE_PER_INCH).toFixed(2)}&notes=TV+mounting`}
                className="btn-primary group mt-8 min-h-[44px] inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
              >
                Get quote / Book
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-1 lg:order-2 aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black/40"
            >
              <Image
                src={siteImages.handymanTv}
                alt="TV mounting service"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <div className="rounded-xl bg-orange-500/20 p-2.5 text-orange-400 ring-1 ring-orange-400/30">
                  <Tv className="h-6 w-6" />
                </div>
                <span className="font-bold text-white text-lg">TV Mounting</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Cameras */}
      <section id="security-cameras" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black/40"
          >
            <Image
              src={siteImages.handymanCameras}
              alt="Security camera installation"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <div className="rounded-xl bg-orange-500/20 p-2.5 text-orange-400 ring-1 ring-orange-400/30">
                <Cctv className="h-6 w-6" />
              </div>
              <span className="font-bold text-white text-lg">Security Camera Installation</span>
            </div>
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Security Camera Installation</h2>
            <p className="mt-3 text-zinc-400 leading-relaxed">
              We install and configure indoor and outdoor security cameras, run cables where needed, and get your app and recording set up.
            </p>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Pricing</p>
              <p className="mt-2 text-3xl font-bold text-orange-400">${CAMERA_PRICE} <span className="text-lg font-normal text-zinc-400">per camera</span></p>
              <p className="mt-2 text-sm text-zinc-400">Includes mounting, basic cable run, and app setup. Cameras and NVR/DVR supplied by you or quoted separately.</p>
              <RecalculateCalculatorLink href="/handyman#calculator" className="mt-4" />
            </div>
            <ul className="mt-6 space-y-2 text-sm text-zinc-400">
              {cameraIncludes.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 text-orange-400 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/book?service=handyman&estimate=${CAMERA_PRICE}&notes=security+camera+installation`}
              className="btn-primary group mt-8 min-h-[44px] inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
            >
              Get quote / Book
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/[0.08] bg-black/40 shadow-xl shadow-black/20 backdrop-blur-sm p-6 sm:p-8">
          <div>
            <h2 className="text-xl font-bold text-white">Need a custom quote?</h2>
            <p className="mt-1 text-zinc-400">Combine services or ask about items not listed. Book handyman and add details in the notes.</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/book?service=handyman"
              className="btn-primary group min-h-[44px] inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
            >
              Book Handyman Service
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link
              href="/handyman"
              className="btn-outline min-h-[44px] inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
            >
              Back to Handyman
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

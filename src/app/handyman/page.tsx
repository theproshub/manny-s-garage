"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, Cctv, Sofa, Tv } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { BackToHome } from "@/components/back-to-home";
import { siteImages } from "@/lib/site-images";

const TV_PRICE_PER_INCH = 1.75;
const CAMERA_PRICE = 120;
const FURNITURE_PRICE_PER_ITEM = 50;

const services = [
  {
    title: "Furniture Assembly",
    description: "Includes beds, dressers, nightstands, and cabinets.",
    price: "$50 per item",
    icon: Sofa,
    image: siteImages.handymanFurniture,
  },
  {
    title: "TV Mounting",
    description: "Professional mounting with wire management.",
    price: "$1.75 per inch",
    icon: Tv,
    image: siteImages.handymanTv,
  },
  {
    title: "Security Camera Installation",
    description: "Install and configure your security cameras.",
    price: "$120 per camera",
    icon: Cctv,
    image: siteImages.handymanCameras,
  },
];

const SERVICE_DETAIL_LINKS = ["/handyman/services#furniture", "/handyman/services#tv-mounting", "/handyman/services#security-cameras"] as const;

export default function HandymanPage() {
  const [tvInches, setTvInches] = useState(55);
  const [cameras, setCameras] = useState(0);
  const [furnitureItems, setFurnitureItems] = useState(0);

  const estimate = useMemo(() => {
    const tvTotal = tvInches > 0 ? tvInches * TV_PRICE_PER_INCH : 0;
    const cameraTotal = cameras * CAMERA_PRICE;
    const furnitureTotal = furnitureItems * FURNITURE_PRICE_PER_ITEM;
    const total = tvTotal + cameraTotal + furnitureTotal;
    return {
      tvTotal: Math.round(tvTotal * 100) / 100,
      cameraTotal,
      furnitureTotal,
      total,
    };
  }, [tvInches, cameras, furnitureItems]);

  return (
    <main className="relative min-h-screen overflow-x-hidden pt-6 sm:pt-10">
      <div className="noise-overlay" aria-hidden />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-14 sm:mb-20 lg:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <BackToHome />
            <span className="premium-badge badge-orange orbitron inline-flex text-[10px] tracking-[0.2em]">
              HANDYMAN SERVICES
            </span>
          </div>
          <h1 className="mt-5 sm:mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Home Installation <span className="orange-glow-text">Done Right.</span>
          </h1>
          <p className="mt-4 text-base text-zinc-400 leading-relaxed max-w-2xl sm:text-lg">
            TV mounting, security cameras, and furniture assembly—with clear pricing and professional results.
          </p>
        </motion.div>
      </section>

      {/* Service cards with pricing */}
      <section className="relative mx-auto max-w-7xl scroll-mt-28 px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <SectionHeading
          badge="Services & Pricing"
          title="What We Offer"
          description="Click a service for full details and pricing, or use the calculator below."
          align="center"
        />
        <div className="mt-10 sm:mt-12 grid gap-5 sm:gap-6 sm:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            const detailHref = SERVICE_DETAIL_LINKS[i];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/25 hover:shadow-orange-950/10 sm:rounded-[var(--radius-card)]"
              >
                <Link
                  href={detailHref}
                  className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-2xl sm:rounded-[var(--radius-card)] min-h-[44px]"
                >
                  <div className="relative h-44 sm:h-48 w-full pointer-events-none">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="rounded-xl bg-orange-500/20 p-2.5 text-orange-400 ring-1 ring-orange-400/30 shrink-0">
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <span className="font-bold text-white text-sm sm:text-base truncate">{service.title}</span>
                      </div>
                      <span className="text-xs font-semibold text-orange-300 shrink-0 group-hover:text-orange-400 transition-colors">
                        Get quote →
                      </span>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 border-t border-white/[0.06]">
                    <p className="text-zinc-400 text-sm leading-relaxed">{service.description}</p>
                    <p className="mt-3 font-semibold text-orange-400">{service.price}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Quote Calculator */}
      <section id="calculator" className="relative border-y border-white/[0.06] bg-black/30 py-16 sm:py-20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
            <div>
              <SectionHeading
                badge="Quote Calculator"
                title="Get Your Price Estimate"
                description="Enter your needs below. The total updates automatically."
              />
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 space-y-5 sm:space-y-6"
              >
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
                  <label htmlFor="tv-inches" className="block text-sm font-medium text-zinc-300 mb-2">
                    TV size (inches)
                  </label>
                  <input
                    id="tv-inches"
                    type="number"
                    min={0}
                    max={120}
                    value={tvInches}
                    onChange={(e) =>
                      setTvInches(Math.max(0, Math.min(120, parseInt(e.target.value, 10) || 0)))
                    }
                    className="focus-ring w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white transition-colors focus:border-orange-400/50 min-h-[44px]"
                  />
                  <p className="mt-2 text-xs text-zinc-500">$1.75 × {tvInches} in = ${(tvInches * TV_PRICE_PER_INCH).toFixed(2)}</p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
                  <label htmlFor="cameras" className="block text-sm font-medium text-zinc-300 mb-2">
                    Number of security cameras
                  </label>
                  <input
                    id="cameras"
                    type="number"
                    min={0}
                    max={20}
                    value={cameras}
                    onChange={(e) =>
                      setCameras(Math.max(0, Math.min(20, parseInt(e.target.value, 10) || 0)))
                    }
                    className="focus-ring w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white transition-colors focus:border-orange-400/50 min-h-[44px]"
                  />
                  <p className="mt-2 text-xs text-zinc-500">$120 × {cameras} = ${cameras * CAMERA_PRICE}</p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
                  <label htmlFor="furniture" className="block text-sm font-medium text-zinc-300 mb-2">
                    Number of furniture items
                  </label>
                  <input
                    id="furniture"
                    type="number"
                    min={0}
                    max={20}
                    value={furnitureItems}
                    onChange={(e) =>
                      setFurnitureItems(Math.max(0, Math.min(20, parseInt(e.target.value, 10) || 0)))
                    }
                    className="focus-ring w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white transition-colors focus:border-orange-400/50 min-h-[44px]"
                  />
                  <p className="mt-2 text-xs text-zinc-500">$50 × {furnitureItems} = ${furnitureItems * FURNITURE_PRICE_PER_ITEM}</p>
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

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/[0.08] bg-black/40 shadow-xl shadow-black/20 p-6 sm:p-8 backdrop-blur-sm">
          <div>
            <h2 className="text-lg font-bold text-white sm:text-xl">Ready to schedule?</h2>
            <p className="mt-1 text-sm text-zinc-400 sm:text-base">Use the calculator above, then book your service.</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/book?service=handyman"
              className="btn-primary group min-h-[44px] inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
            >
              Book Service
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link
              href="/"
              className="btn-outline min-h-[44px] inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

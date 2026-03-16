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
    <main className="relative min-h-screen overflow-x-hidden pt-10">
      <div className="noise-overlay" />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 lg:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BackToHome />
          <span className="premium-badge badge-orange mt-6 mb-5 inline-flex">
            Handyman Services
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-6 sm:text-5xl lg:text-6xl">
            Home Installation <span className="metal-text">Done Right.</span>
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
            TV mounting, security cameras, and furniture assembly—with clear pricing and professional results.
          </p>
        </motion.div>
      </section>

      {/* Service cards with pricing */}
      <section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Services & Pricing"
          title="What We Offer"
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-black/40 backdrop-blur-sm transition-all hover:border-orange-500/20"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="rounded-xl bg-orange-500/20 p-2.5 text-orange-400 ring-1 ring-orange-400/30">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-bold text-white">{service.title}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-zinc-400 text-sm leading-relaxed">{service.description}</p>
                  <p className="mt-3 font-semibold text-orange-400">{service.price}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* AI Price Quote Calculator */}
      <section id="calculator" className="relative border-y border-white/10 bg-black/40 py-20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
            <div>
              <SectionHeading
                badge="Quote Calculator"
                title="Get Your Price Estimate"
                description="Enter your needs below. The total updates automatically."
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 space-y-6"
              >
                <div>
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
                    className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-colors focus:border-orange-400/50"
                  />
                  <p className="mt-1 text-xs text-zinc-500">$1.75 × {tvInches} in = ${(tvInches * TV_PRICE_PER_INCH).toFixed(2)}</p>
                </div>
                <div>
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
                    className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-colors focus:border-orange-400/50"
                  />
                  <p className="mt-1 text-xs text-zinc-500">$120 × {cameras} = ${cameras * CAMERA_PRICE}</p>
                </div>
                <div>
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
                    className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-colors focus:border-orange-400/50"
                  />
                  <p className="mt-1 text-xs text-zinc-500">$50 × {furnitureItems} = ${furnitureItems * FURNITURE_PRICE_PER_ITEM}</p>
                </div>
              </motion.div>
            </div>

            <div className="lg:pt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="panel-cyber sticky top-28 rounded-[var(--radius-card)] p-8"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/20 text-orange-400 ring-1 ring-orange-400/30">
                  <Calculator className="h-7 w-7" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Estimated Total</p>
                <p className="mt-2 text-4xl font-black text-white">${estimate.total.toFixed(2)}</p>
                <div className="mt-6 space-y-2 border-t border-white/10 pt-4 text-sm text-zinc-400">
                  {estimate.tvTotal > 0 && (
                    <p>TV mounting: ${estimate.tvTotal.toFixed(2)}</p>
                  )}
                  {estimate.cameraTotal > 0 && (
                    <p>Cameras: ${estimate.cameraTotal}</p>
                  )}
                  {estimate.furnitureTotal > 0 && (
                    <p>Furniture: ${estimate.furnitureTotal}</p>
                  )}
                </div>
                <p className="mt-4 text-xs text-zinc-500">
                  Final quote may vary. Parts not included unless specified.
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  <Link
                    href={`/book?service=handyman&estimate=${encodeURIComponent(estimate.total.toFixed(2))}`}
                    className="btn-primary group w-full justify-center"
                  >
                    Book Service
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <Link href="/" className="btn-outline w-full justify-center">
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/10 bg-black/40 p-8">
          <div>
            <h2 className="text-xl font-bold text-white">Ready to schedule?</h2>
            <p className="mt-1 text-zinc-400">Use the calculator above, then book your service.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/book?service=handyman" className="btn-primary group">
              Book Service
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link href="/" className="btn-outline">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

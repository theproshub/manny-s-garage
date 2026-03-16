"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  CarFront,
  Wrench,
  Gauge,
  Droplets,
  Wind,
  Zap,
  Layout,
  UserCog,
  ArrowUpFromLine,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { BackToHome } from "@/components/back-to-home";
import { siteImages } from "@/lib/site-images";

const HOURLY_RATE = 20;
const MAX_HOURS = 8;
const MECHANIC_RATE_PER_HOUR = 40;

const equipment = [
  { name: "Car lift", icon: ArrowUpFromLine },
  { name: "Diagnostic scanner", icon: Gauge },
  { name: "Oil change tools", icon: Droplets },
  { name: "Tire tools", icon: CarFront },
  { name: "Air compressor", icon: Wind },
  { name: "Power tools", icon: Zap },
  { name: "Workbench and lighting", icon: Layout },
];

export default function DIYGaragePage() {
  const [hours, setHours] = useState(2);
  const [mechanicHours, setMechanicHours] = useState(0);

  const estimate = useMemo(() => {
    const validHours = Math.max(1, Math.min(MAX_HOURS, hours));
    const garageTotal = validHours * HOURLY_RATE;
    const mechanicTotal = mechanicHours * MECHANIC_RATE_PER_HOUR;
    return {
      garageTotal,
      mechanicTotal,
      total: garageTotal + mechanicTotal,
      validHours,
    };
  }, [hours, mechanicHours]);

  return (
    <main className="relative min-h-screen overflow-x-hidden pt-10">
      <div className="noise-overlay" aria-hidden />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 lg:mb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <BackToHome />
              <span className="premium-badge badge-orange orbitron inline-flex text-[10px] tracking-[0.2em]">
                DIY BAY RENTAL
              </span>
            </div>
            <h1 className="mt-5 sm:mt-6 text-4xl font-bold tracking-tight text-white mb-6 sm:text-5xl lg:text-6xl">
              Your Space. <span className="metal-text">Your Tools.</span>
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-xl">
              Manny&apos;s Garage offers a fully equipped DIY repair space where customers can work on their own vehicles using professional tools and equipment.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#calculator" className="btn-primary group">
                <Calculator className="h-4 w-4" />
                Price Quote
              </a>
              <Link href="/" className="btn-outline">
                Back to Home
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-white/10 hidden sm:block"
          >
            <Image
              src={siteImages.diyGarage}
              alt="DIY garage bay with lift and equipment"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Description & Equipment */}
      <section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="panel-cyber rounded-[var(--radius-card)] p-8 sm:p-12">
          <div className="flex items-start gap-6">
            <div className="rounded-2xl bg-orange-500/15 p-4 text-orange-300 shrink-0">
              <Wrench className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Fully Equipped DIY Space
              </h2>
              <p className="mt-4 text-zinc-400 leading-7 max-w-2xl">
                Manny&apos;s Garage offers a fully equipped DIY repair space where customers can work on their own vehicles using professional tools and equipment.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading
            badge="Included"
            title="Available Equipment"
            description="Everything you need to work on your vehicle safely."
          />
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-5 transition-colors hover:border-orange-500/20"
              >
                <div className="rounded-xl bg-orange-500/15 p-3 text-orange-400">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-semibold text-white">{item.name}</span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="panel-strong rounded-[var(--radius-card)] border border-orange-500/10 p-8 sm:p-10">
          <h2 className="text-xl font-bold text-white sm:text-2xl">Pricing</h2>
          <p className="mt-3 text-zinc-400">
            Garage rental is <strong className="text-orange-400">$20 per hour</strong> with a maximum booking time of <strong className="text-white">8 hours</strong> per session.
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            Optional professional mechanic assistance is available at $40 per hour when you need an extra set of hands or expert advice.
          </p>
        </div>
      </section>

      {/* AI DIY Garage Price Calculator */}
      <section id="calculator" className="relative border-y border-white/10 bg-black/40 py-20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Quote Calculator"
            title="Estimate Your Cost"
            description="Select hours and optional mechanic assistance. Total updates automatically."
            align="center"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mt-12 max-w-md"
          >
            <div className="panel-cyber rounded-[var(--radius-card)] p-8 space-y-6">
              <div>
                <label htmlFor="hours" className="block text-sm font-medium text-zinc-300 mb-2">
                  Number of hours (1–{MAX_HOURS})
                </label>
                <input
                  id="hours"
                  type="number"
                  min={1}
                  max={MAX_HOURS}
                  value={hours}
                  onChange={(e) =>
                    setHours(
                      Math.max(1, Math.min(MAX_HOURS, parseInt(e.target.value, 10) || 1))
                    )
                  }
                  className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
                />
                <p className="mt-1 text-xs text-zinc-500">
                  ${HOURLY_RATE}/hr × {estimate.validHours} hr = ${estimate.garageTotal}
                </p>
              </div>
              <div>
                <label htmlFor="mechanic" className="block text-sm font-medium text-zinc-300 mb-2">
                  Optional: Mechanic assistance (hours)
                </label>
                <input
                  id="mechanic"
                  type="number"
                  min={0}
                  max={MAX_HOURS}
                  value={mechanicHours}
                  onChange={(e) =>
                    setMechanicHours(
                      Math.max(0, Math.min(MAX_HOURS, parseInt(e.target.value, 10) || 0))
                    )
                  }
                  className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
                />
                <p className="mt-1 text-xs text-zinc-500">
                  $40/hr × {mechanicHours} hr = ${estimate.mechanicTotal}
                </p>
              </div>
              <div className="rounded-2xl border border-orange-400/30 bg-orange-500/10 px-6 py-4">
                <p className="text-xs uppercase tracking-wider text-orange-200 font-medium">
                  Estimated total
                </p>
                <p className="text-3xl font-bold text-white mt-1">${estimate.total}</p>
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <Link
                  href={`/book?service=diy&estimate=${encodeURIComponent(estimate.total.toString())}&hours=${estimate.validHours}&mechanicHours=${mechanicHours}`}
                  className="btn-primary group w-full justify-center"
                >
                  Book Garage Time
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link href="/" className="btn-outline w-full justify-center">
                  Back to Home
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/10 bg-black/40 p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-orange-500/15 p-3 text-orange-400">
              <UserCog className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Need a hand?</h2>
              <p className="mt-1 text-zinc-400">Add mechanic assistance in the calculator when you book.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link href="/book?service=diy" className="btn-primary group">
              Book Garage Time
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

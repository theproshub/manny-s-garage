"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpFromLine,
  Calculator,
  CarFront,
  Droplets,
  Gauge,
  Layout,
  Wind,
  Zap,
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

const DIY_SERVICES_LINK = "/diy-garage/services";

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
    <main className="relative min-h-screen overflow-x-hidden pt-6 sm:pt-10">
      <div className="noise-overlay" aria-hidden />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 lg:mb-16">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <BackToHome />
              <span className="premium-badge badge-orange orbitron text-[10px] tracking-[0.15em]">
                DIY BAY
              </span>
            </div>
            <h1 className="mt-3 sm:mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Your Space. <span className="orange-glow-text">Your Tools.</span>
            </h1>
            <p className="mt-2 text-sm text-zinc-400 max-w-md sm:text-base">
              Rent a fully equipped bay by the hour. Lift, scanner, tools included. Get a quote below.
            </p>
            <a
              href="#calculator"
              className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:h-11 sm:px-5 sm:py-2.5"
            >
              <Calculator className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
              Get quote
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/[0.09] bg-black shadow-xl shadow-black/30 sm:rounded-2xl hidden sm:block"
          >
            <Image
              src={siteImages.diyGarage}
              alt="DIY garage bay with lift and equipment"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Equipment */}
      <section className="relative mx-auto max-w-7xl scroll-mt-28 px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mt-0">
          <SectionHeading
            badge="Included"
            title="Available Equipment"
            description="Everything you need to work on your vehicle safely."
          />
        </div>
        <div className="mt-10 sm:mt-12 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 shadow-xl shadow-black/20 transition-all duration-300 hover:border-orange-500/25 hover:shadow-orange-950/10"
              >
                <Link
                  href={`${DIY_SERVICES_LINK}#equipment`}
                  className="group flex w-full min-h-[44px] items-center gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-2xl"
                >
                  <div className="rounded-xl bg-orange-500/15 p-3 text-orange-400 shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-semibold text-white flex-1">{item.name}</span>
                  <span className="text-xs font-medium text-zinc-400 group-hover:text-orange-400 transition-colors shrink-0">
                    Get quote →
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="panel-strong rounded-2xl border border-white/[0.08] border-orange-500/10 shadow-xl shadow-black/20 p-8 sm:p-10">
          <h2 className="text-xl font-bold text-white sm:text-2xl">Pricing</h2>
          <p className="mt-3 text-zinc-400">
            Garage rental is <strong className="text-orange-400">$20 per hour</strong> with a maximum booking time of <strong className="text-white">8 hours</strong> per session.
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            Optional professional mechanic assistance is available at $40 per hour when you need an extra set of hands or expert advice.
          </p>
        </div>
      </section>

      {/* Quote Calculator */}
      <section id="calculator" className="relative border-y border-white/[0.06] bg-black/30 py-16 sm:py-20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Quote Calculator"
            title="Estimate Your Cost"
            description="Select hours and optional mechanic assistance. Total updates automatically."
            align="center"
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mt-10 sm:mt-12 max-w-md"
          >
            <div className="panel-strong rounded-2xl border border-white/[0.08] shadow-xl shadow-black/30 p-6 sm:p-8 space-y-5 sm:space-y-6">
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
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
                  className="focus-ring w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white min-h-[44px]"
                />
                <p className="mt-2 text-xs text-zinc-500">
                  ${HOURLY_RATE}/hr × {estimate.validHours} hr = ${estimate.garageTotal}
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
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
                  className="focus-ring w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white min-h-[44px]"
                />
                <p className="mt-2 text-xs text-zinc-500">
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
                  className="btn-primary group w-full min-h-[44px] justify-center inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
                >
                  Book Garage Time
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

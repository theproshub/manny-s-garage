"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpFromLine,
  Check,
  Droplets,
  Gauge,
  Layout,
  UserCog,
  Wind,
  Wrench,
  Zap,
  CarFront,
} from "lucide-react";
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

const bayIncludes = [
  "Full access to the bay for the duration of your booking",
  "Car lift, diagnostic scanner, oil change and tire equipment",
  "Air compressor, power tools, workbench, and lighting",
  "Up to 8 hours per session; multi-session bookings available",
];

const mechanicIncludes = [
  "Professional mechanic on hand for guidance or hands-on help",
  "Diagnostics, repairs, or supervision at your pace",
  "Billed in addition to bay rental; book in 1-hour increments",
  "Ideal for complex jobs or when you want an expert alongside",
];

export default function DIYGarageServicesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pt-10">
      <div className="noise-overlay" aria-hidden />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 lg:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <BackToHome />
            <span className="premium-badge badge-orange orbitron inline-flex text-[10px] tracking-[0.2em]">
              SERVICES & PRICING
            </span>
          </div>
          <h1 className="mt-5 sm:mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            DIY Bay <span className="orange-glow-text">Services & Pricing</span>
          </h1>
          <p className="mt-4 text-lg text-zinc-400 leading-relaxed max-w-2xl">
            Rent a fully equipped bay by the hour. Add optional mechanic assistance when you need an extra set of hands. Clear pricing below.
          </p>
        </motion.div>
      </section>

      {/* Bay Rental */}
      <section id="bay-rental" className="relative mx-auto max-w-7xl scroll-mt-28 px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black/40"
          >
            <Image
              src={siteImages.diyGarage}
              alt="DIY garage bay with lift and equipment"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <div className="rounded-xl bg-orange-500/20 p-2.5 text-orange-400 ring-1 ring-orange-400/30">
                <Wrench className="h-6 w-6" />
              </div>
              <span className="font-bold text-white text-lg">Bay Rental</span>
            </div>
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Bay Rental</h2>
            <p className="mt-3 text-zinc-400 leading-relaxed">
              Work on your own vehicle in a fully equipped bay with professional tools and a car lift. Perfect for oil changes, brakes, diagnostics, and more.
            </p>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Pricing</p>
              <p className="mt-2 text-3xl font-bold text-orange-400">${HOURLY_RATE} <span className="text-lg font-normal text-zinc-400">per hour</span></p>
              <p className="mt-2 text-sm text-zinc-400">Minimum 1 hour. Max {MAX_HOURS} hours per session. All equipment included.</p>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-zinc-400">
              {bayIncludes.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 text-orange-400 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/book?service=diy&estimate=${HOURLY_RATE}&notes=bay+rental+1hr`}
              className="btn-primary group mt-8 min-h-[44px] inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
            >
              Book bay time
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Mechanic assistance */}
      <section id="mechanic-assistance" className="relative border-y border-white/10 bg-black/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Mechanic Assistance</h2>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Add a professional mechanic to your bay session for guidance, hands-on help, or full repair assistance. Billed per hour in addition to bay rental.
              </p>
              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Pricing</p>
                <p className="mt-2 text-3xl font-bold text-orange-400">${MECHANIC_RATE_PER_HOUR} <span className="text-lg font-normal text-zinc-400">per hour</span></p>
                <p className="mt-2 text-sm text-zinc-400">Optional. Book your bay first, then add mechanic hours when you schedule or at the shop.</p>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-zinc-400">
                {mechanicIncludes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-4 w-4 shrink-0 text-orange-400 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/book?service=diy&estimate=${HOURLY_RATE + MECHANIC_RATE_PER_HOUR}&notes=bay+1hr+mechanic+1hr`}
                className="btn-primary group mt-8 min-h-[44px] inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
              >
                Book bay + mechanic
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-12"
            >
              <div className="rounded-2xl bg-orange-500/15 p-8 text-orange-400 ring-1 ring-orange-400/30">
                <UserCog className="h-16 w-16" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section id="equipment" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl mb-6">Included Equipment</h2>
        <p className="text-zinc-400 max-w-2xl mb-10">
          Every bay rental includes access to the following. No extra fees for tool use.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/40 px-5 py-4"
              >
                <div className="rounded-lg bg-orange-500/15 p-2.5 text-orange-400">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-white">{item.name}</span>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-10">
          <Link
            href="/book?service=diy"
            className="btn-outline min-h-[44px] inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
          >
            Book DIY Bay
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/[0.08] bg-black/40 shadow-xl shadow-black/20 backdrop-blur-sm p-6 sm:p-8">
          <div>
            <h2 className="text-xl font-bold text-white">Need a custom session?</h2>
            <p className="mt-1 text-zinc-400">Book DIY and add your preferred hours and mechanic time in the notes.</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/book?service=diy"
              className="btn-primary group min-h-[44px] inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
            >
              Book DIY Garage
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link
              href="/diy-garage"
              className="btn-outline min-h-[44px] inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
            >
              Back to DIY Garage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

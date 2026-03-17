"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BatteryCharging, Check, Gauge, ShieldCheck, Wrench } from "lucide-react";
import { BackToHome } from "@/components/back-to-home";
import { siteImages } from "@/lib/site-images";

const diagnosticsIncludes = [
  "OBD2 / manufacturer-level fault code scan",
  "Live data and readiness checks",
  "Same-day results; report sent before any work",
  "Clear explanation of findings and recommended next steps",
];

const brakeIncludes = [
  "Brake pad and rotor inspection and replacement",
  "Caliper service and brake fluid flush",
  "Suspension bushings, struts, and ball joints",
  "OEM or quality aftermarket parts",
];

const engineIncludes = [
  "Oil changes and filter replacement",
  "Tune-ups: plugs, coils, air/fuel filters",
  "Timing belts and serpentine belts",
  "Scheduled maintenance per your manual",
];

const batteryIncludes = [
  "Battery test and charging system check",
  "Battery replacement and registration when required",
  "Starter and alternator diagnostics",
  "~90-minute turnaround when parts in stock",
];

const sections = [
  {
    id: "diagnostics",
    title: "Diagnostics & Check Engine",
    description: "Fast fault scanning and real answers on what’s wrong before you spend money on parts. We use professional scan tools and send you the results so you can decide how to proceed.",
    includes: diagnosticsIncludes,
    img: siteImages.diagnostics,
    icon: Gauge,
    stat: "Same-day results",
  },
  {
    id: "brake-suspension",
    title: "Brake & Suspension Repair",
    description: "Confident stopping power, smoother steering, and dependable handling for Fargo roads. We use OEM or quality aftermarket parts and stand behind our work.",
    includes: brakeIncludes,
    img: siteImages.brakeSuspension,
    icon: ShieldCheck,
    stat: "OEM-quality parts",
  },
  {
    id: "engine-maintenance",
    title: "Engine, Tune-Ups & Maintenance",
    description: "Oil changes, tune-ups, belts, filters, and long-term care that keeps your car on schedule. We follow manufacturer intervals and document everything.",
    includes: engineIncludes,
    img: siteImages.engineMaintenance,
    icon: Wrench,
    stat: "Full-spectrum care",
  },
  {
    id: "battery-charging",
    title: "Battery, Starter & Charging",
    description: "No-start problems solved quickly with battery testing and electrical system service. We test alternator and starter and get you back on the road fast.",
    includes: batteryIncludes,
    img: siteImages.batteryCharging,
    icon: BatteryCharging,
    stat: "90-min turnaround",
  },
];

export default function AutoServicesPage() {
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
            Auto <span className="orange-glow-text">Services & Pricing</span>
          </h1>
          <p className="mt-4 text-lg text-zinc-400 leading-relaxed max-w-2xl">
            Full-spectrum auto care from diagnostics to maintenance. We provide a written estimate after assessing your vehicle—book below to get started.
          </p>
        </motion.div>
      </section>

      {sections.map((section, idx) => {
        const Icon = section.icon;
        const isEven = idx % 2 === 0;
        return (
          <section
            key={section.id}
            id={section.id}
            className={`relative mx-auto max-w-7xl scroll-mt-28 px-4 pb-20 sm:px-6 lg:px-8 ${!isEven ? "border-t border-white/10" : ""}`}
          >
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              <motion.div
                initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black/40 ${!isEven ? "lg:order-2" : ""}`}
              >
                <Image
                  src={section.img}
                  alt={section.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="rounded-xl bg-orange-500/20 p-2.5 text-orange-400 ring-1 ring-orange-400/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-bold text-white text-lg">{section.title}</span>
                </div>
                <div className="absolute top-4 right-4 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium text-orange-300">
                  {section.stat}
                </div>
              </motion.div>
              <div className={!isEven ? "lg:order-1" : ""}>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">{section.title}</h2>
                <p className="mt-3 text-zinc-400 leading-relaxed">{section.description}</p>
                <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Pricing</p>
                  <p className="mt-2 text-xl font-bold text-orange-400">Quote after assessment</p>
                  <p className="mt-2 text-sm text-zinc-400">
                    We inspect your vehicle and provide a written estimate before any work. No surprises—you approve the quote first.
                  </p>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-zinc-400">
                  {section.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 text-orange-400 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/book?service=automotive&notes=${encodeURIComponent(section.title)}`}
                  className="btn-primary group mt-8 min-h-[44px] inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
                >
                  Book / Get quote
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/[0.08] bg-black/40 shadow-xl shadow-black/20 backdrop-blur-sm p-6 sm:p-8">
          <div>
            <h2 className="text-xl font-bold text-white">Ready to schedule?</h2>
            <p className="mt-1 text-zinc-400">Book automotive service and we’ll confirm your appointment and next steps.</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/book?service=automotive"
              className="btn-primary group min-h-[44px] inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
            >
              Book Automotive Service
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link
              href="/auto"
              className="btn-outline min-h-[44px] inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
            >
              Back to Automotive
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BatteryCharging, Check, Gauge, ShieldCheck, Wrench } from "lucide-react";
import { BackToHome } from "@/components/back-to-home";

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
    description: "If a light is on or something feels off, we’ll scan and verify what’s actually happening.",
    includes: diagnosticsIncludes,
    icon: Gauge,
    stat: "Same-day results",
  },
  {
    id: "brake-suspension",
    title: "Brake & Suspension Repair",
    description: "Squeaks, grinding, pulling, or rough ride—get safety-critical items checked and fixed.",
    includes: brakeIncludes,
    icon: ShieldCheck,
    stat: "OEM-quality parts",
  },
  {
    id: "engine-maintenance",
    title: "Engine, Tune-Ups & Maintenance",
    description: "Stay on schedule with oil, filters, plugs, belts, and manufacturer-recommended maintenance.",
    includes: engineIncludes,
    icon: Wrench,
    stat: "Full-spectrum care",
  },
  {
    id: "battery-charging",
    title: "Battery, Starter & Charging",
    description: "No-start, slow crank, or dead battery. We test the system and fix the root cause.",
    includes: batteryIncludes,
    icon: BatteryCharging,
    stat: "90-min turnaround",
  },
];

export default function AutoServicesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pt-10">
      <div className="noise-overlay" aria-hidden />

      {/* Hero */}
      <section className="relative mx-auto mb-8 max-w-7xl px-4 sm:mb-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <BackToHome />
            <span className="premium-badge badge-orange orbitron text-[10px] tracking-[0.15em]">
              AUTO · SERVICES & PRICING
            </span>
          </div>
          <h1 className="mt-3 sm:mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Choose a service <span className="orange-glow-text">fast</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400 sm:text-base">
            Pick what sounds closest. You’ll get a written estimate after we assess your vehicle—no work starts without approval.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/book?service=automotive"
              className="btn-primary group min-h-[44px] inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
            >
              Book automotive service
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link
              href="/auto"
              className="btn-outline min-h-[44px] inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
            >
              Not sure? Start intake
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="rounded-2xl border border-white/[0.10] bg-black/35 p-5 backdrop-blur-sm sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-orange-500/20 p-2.5 text-orange-300 ring-1 ring-orange-400/30">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white">{section.title}</h2>
                      <p className="mt-0.5 text-xs font-semibold text-orange-300">{section.stat}</p>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{section.description}</p>

                <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                  {section.includes.slice(0, 4).map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-col gap-2">
                  <Link
                    href={`/book?service=automotive&notes=${encodeURIComponent(section.title)}`}
                    className="btn-primary group min-h-[44px] inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                  >
                    Book / Get quote
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                  <Link
                    href="/auto"
                    className="btn-outline min-h-[44px] inline-flex items-center justify-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                  >
                    Start intake
                  </Link>
                </div>
              </motion.section>
            );
          })}
        </div>
      </section>

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

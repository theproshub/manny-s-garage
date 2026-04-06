"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Cpu,
  Database,
  Globe,
  MapPin,
  Server,
  Wifi,
} from "lucide-react";
import { BackToHome } from "@/components/back-to-home";
import { ServiceStandardsSection } from "@/components/service-standards-section";
import { SQUARE_BOOKING_URL } from "@/lib/fixed-quote-options";
import { siteImages } from "@/lib/site-images";

const networkIncludes = [
  "Wi-Fi site survey and access point placement",
  "Ethernet drops and cable runs",
  "Router and switch configuration",
  "Gigabit-ready and mesh support",
];

const pcIncludes = [
  "Custom builds: gaming, workstation, and general use",
  "Hardware diagnostics and repair",
  "OS installs, driver updates, and tuning",
  "Same-day diagnostics when possible",
];

const dataIncludes = [
  "Data recovery from failing or failed drives",
  "NAS setup with automated backups",
  "Local and cloud backup strategy",
  "Zero-knowledge / encrypted options where applicable",
];

const smartHomeIncludes = [
  "Smart home hub and device integration",
  "Lights, locks, thermostats, cameras on one network",
  "Local control and privacy-first where possible",
  "Routine maintenance and troubleshooting",
];

const sections = [
  {
    id: "network",
    title: "Network Infrastructure",
    description: "Enterprise-grade Wi-Fi setups, ethernet drops, and router configurations for fast, reliable coverage at home or in your small business.",
    includes: networkIncludes,
    icon: Wifi,
    stat: "Gigabit Ready",
  },
  {
    id: "pc-builds",
    title: "Custom PC Builds & Repair",
    description: "From high-end gaming rigs and workstations to diagnosing hardware failures and blue screens. We build, repair, and optimize.",
    includes: pcIncludes,
    icon: Cpu,
    stat: "Same-Day Diagnostics",
  },
  {
    id: "data-recovery",
    title: "Data Recovery & Backup",
    description: "Secure retrieval from failing drives and implementation of automated, encrypted NAS and cloud backups so you don’t lose data.",
    includes: dataIncludes,
    icon: Database,
    stat: "Zero-Knowledge Options",
  },
  {
    id: "smart-home",
    title: "Smart Home & Automation",
    description: "Unify lights, locks, cameras, thermostats, and more into a single, cohesive system with local control and minimal cloud dependency.",
    includes: smartHomeIncludes,
    icon: Globe,
    stat: "Local Control",
  },
];

export default function ITServicesPage() {
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
              <span className="premium-badge orbitron text-[10px] tracking-[0.15em] border-cyan-500/50 bg-cyan-500/10 text-cyan-300">
                I.T · SERVICES & PRICING
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-[2rem] font-bold leading-[1.2] tracking-tight min-[375px]:text-[2.5rem] sm:text-4xl sm:leading-[1.18] lg:text-[3rem] lg:leading-[1.15] xl:text-5xl"
            >
              <span className="metal-text block">I.T. Services</span>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="mt-4 flex items-center gap-3 sm:mt-5 sm:gap-4"
              >
                <span
                  className="h-px w-8 shrink-0 bg-gradient-to-r from-cyan-400/60 to-transparent sm:w-10"
                  aria-hidden
                />
                <span className="text-base font-medium tracking-wide text-white/95 sm:text-lg sm:tracking-normal lg:text-xl">
                  <span className="text-cyan-300">Quote on request</span>
                  <span className="text-white/90">—book a consult to confirm scope and pricing.</span>
                </span>
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-6 border-l-2 border-cyan-500/40 pl-4 text-[15px] leading-[1.6] text-zinc-400 sm:mt-7 sm:text-base sm:leading-[1.65]"
            >
              Networks, PC builds, data recovery, and smart home. Pick a category below and we&apos;ll quote before starting any work.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7"
            >
              <Link
                href={SQUARE_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-bold text-black shadow-lg shadow-cyan-950/25 transition-transform hover:-translate-y-0.5 hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
              >
                Book I.T. Consult
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
              <Link
                href="/it"
 className="btn-outline inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Back to I.T.
              </Link>
            </motion.div>
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="hero-image-wrap order-1 lg:order-2"
          >
            <div className="hero-glow" aria-hidden />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-cyan-400/20 bg-black shadow-2xl shadow-black/40 ring-1 ring-white/[0.06] lg:aspect-[16/10]">
              <Image
                src={siteImages.itConsultant}
                alt="I.T and networking services"
                fill
                className="object-cover opacity-90"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-cyan-950/25" aria-hidden />
              <div className="img-side-overlay z-10" />
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
            href="#network"
            className="hero-scroll-hint flex flex-col items-center gap-1.5 text-zinc-500 transition-colors hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-md"
            aria-label="Scroll to services"
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest">See Services</span>
            <ChevronDown className="h-5 w-5 shrink-0 animate-bounce" aria-hidden />
          </a>
        </motion.div>
      </section>

      {sections.map((section, idx) => {
        const Icon = section.icon;
        const isEven = idx % 2 === 0;
        return (
          <section
            key={section.id}
            id={section.id}
            className={`relative mx-auto max-w-7xl scroll-mt-28 px-4 pb-20 sm:px-6 lg:px-8 ${!isEven ? "border-t border-white/10 bg-black/20" : ""}`}
          >
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div className={!isEven ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-xl bg-cyan-500/20 p-2.5 text-cyan-400 ring-1 ring-cyan-400/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400/90">{section.stat}</span>
                </div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">{section.title}</h2>
                <p className="mt-3 text-zinc-400 leading-relaxed">{section.description}</p>
                <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Pricing</p>
                  <p className="mt-2 text-xl font-bold text-cyan-400">Quote on request</p>
                  <p className="mt-2 text-sm text-zinc-400">
                    Scope and price depend on your setup. Book I.T service and describe your needs—we’ll confirm a quote before starting.
                  </p>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-zinc-400">
                  {section.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={SQUARE_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-cyan-400/50 bg-cyan-500/10 px-6 py-3 font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/20 hover:border-cyan-400 group"
                >
                  See Pricing or Book
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <div className={`rounded-2xl border border-white/10 bg-white/[0.03] p-8 ${!isEven ? "lg:order-1" : ""}`}>
                <Server className="h-12 w-12 text-cyan-400/50 mb-4" />
                <p className="text-sm text-zinc-500">
                  We use and support technologies like Ubiquiti UniFi, TrueNAS, Home Assistant, pfSense, and Proxmox where they fit your needs.
                </p>
              </div>
            </div>
          </section>
        );
      })}

      <ServiceStandardsSection variant="it" />

      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/[0.08] border-cyan-400/20 bg-black/40 shadow-xl shadow-black/20 backdrop-blur-sm p-6 sm:p-8">
          <div>
            <h2 className="text-xl font-bold text-white">Need I.T. Support?</h2>
            <p className="mt-1 text-zinc-400">Book a consult and we’ll get back to you with a quote and next steps.</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              href={SQUARE_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 text-sm font-bold text-black shadow-lg shadow-cyan-950/25 transition-transform hover:-translate-y-0.5 hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base group"
            >
              Book I.T. Service
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link
              href="/it"
 className="btn-outline inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Back to I.T.
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

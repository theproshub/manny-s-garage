"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Cpu,
  Database,
  Globe,
  Server,
  Terminal,
  Wifi,
} from "lucide-react";
import { BackToHome } from "@/components/back-to-home";
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
            <span className="premium-badge orbitron text-[10px] tracking-[0.15em] border-cyan-500/50 bg-cyan-500/10 text-cyan-300">
              I.T · SERVICES & PRICING
            </span>
          </div>
          <h1 className="mt-3 sm:mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            I.T <span className="text-cyan-400">Services & Pricing</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-400 max-w-xl sm:text-base">
            Networks, PC builds, data recovery, smart home. We quote per project—book a consult to confirm scope and pricing.
          </p>
        </motion.div>
      </section>

      {/* Single hero image then sections */}
      <section className="relative mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative aspect-[21/9] max-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-black/40"
        >
          <Image
            src={siteImages.itConsultant}
            alt="I.T and networking services"
            fill
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            <div className="rounded-xl bg-cyan-500/20 p-2.5 text-cyan-400 ring-1 ring-cyan-400/30">
              <Terminal className="h-6 w-6" />
            </div>
            <span className="font-bold text-white text-lg">Infrastructure & Support</span>
          </div>
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
                  href={`/book?service=it&notes=${encodeURIComponent(section.title)}`}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-cyan-400/50 bg-cyan-500/10 px-6 py-3 font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/20 hover:border-cyan-400 group"
                >
                  Get quote / Book
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

      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/[0.08] border-cyan-400/20 bg-black/40 shadow-xl shadow-black/20 backdrop-blur-sm p-6 sm:p-8">
          <div>
            <h2 className="text-xl font-bold text-white">Need I.T support?</h2>
            <p className="mt-1 text-zinc-400">Book a consult and we’ll get back to you with a quote and next steps.</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/book?service=it"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 text-sm font-bold text-black shadow-lg shadow-cyan-950/25 transition-transform hover:-translate-y-0.5 hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base group"
            >
              Book I.T Service
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link
              href="/it"
              className="btn-outline min-h-[44px] inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
            >
              Back to I.T
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

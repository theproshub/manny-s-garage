"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Cpu,
  Database,
  Globe,
  Terminal,
  Wifi,
} from "lucide-react";
import { ChatAssistant } from "@/components/chat-assistant";
import { SectionHeading } from "@/components/section-heading";
import { BackToHome } from "@/components/back-to-home";
import { siteImages } from "@/lib/site-images";

const IT_SERVICES_BASE = "/it/services";

const itServices = [
  {
    id: "network",
    title: "Network Infrastructure",
    navLabel: "Networks",
    short: "Wi‑Fi, ethernet, router setup. Fast, reliable coverage.",
    icon: Wifi,
    href: `${IT_SERVICES_BASE}#network`,
  },
  {
    id: "pc-builds",
    title: "PC Builds & Repair",
    navLabel: "PC Builds",
    short: "Custom builds, gaming rigs, diagnostics and repair.",
    icon: Cpu,
    href: `${IT_SERVICES_BASE}#pc-builds`,
  },
  {
    id: "data-recovery",
    title: "Data Recovery & Backup",
    navLabel: "Data & Backup",
    short: "Drive recovery, NAS and encrypted backups.",
    icon: Database,
    href: `${IT_SERVICES_BASE}#data-recovery`,
  },
  {
    id: "smart-home",
    title: "Smart Home & Automation",
    navLabel: "Smart Home",
    short: "Lights, locks, cameras—unified local control.",
    icon: Globe,
    href: `${IT_SERVICES_BASE}#smart-home`,
  },
];

const techNames = ["UniFi", "TrueNAS", "Home Assistant", "pfSense", "Proxmox"];

export default function ITPages() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <main className="relative overflow-x-hidden pt-6 sm:pt-10">
      <div className="noise-overlay" aria-hidden />

      {/* ─── HERO ─── */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 lg:mb-16">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] border-cyan-400/20 bg-black shadow-xl shadow-black/30 sm:rounded-[1.5rem]">
          <div className="absolute inset-0 hidden sm:block">
            <Image src={siteImages.itConsultant} alt="" fill className="object-cover opacity-20 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/90 to-cyan-950/40" />
          </div>
          <div className="absolute inset-0 bg-black/90 sm:hidden" aria-hidden />

          <div className="relative z-10 px-4 py-5 sm:px-8 sm:py-7 lg:px-10 lg:py-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-xl"
            >
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <BackToHome />
                <span className="premium-badge orbitron text-[10px] tracking-[0.15em] border-cyan-500/50 bg-cyan-500/10 text-cyan-300">
                  I.T & NETWORKING
                </span>
              </div>
              <h1 className="mt-3 sm:mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Smart Solutions for <span className="text-cyan-400">Home & Business</span>
              </h1>
              <p className="mt-2 text-sm text-zinc-400 max-w-md sm:text-base">
                Networks, PC builds, data recovery, smart home. Book a consult below.
              </p>
              <button
                type="button"
                onClick={() => setAssistantOpen(true)}
                className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-bold text-black shadow-lg shadow-cyan-950/25 transition-transform hover:-translate-y-0.5 hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:h-11 sm:px-5 sm:py-2.5"
              >
                <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                Consult
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="relative mx-auto max-w-7xl scroll-mt-28 px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <SectionHeading
          badge="What we do"
          title={<>I.T & <span className="text-cyan-400">Support</span></>}
          description="Networks, PC builds, data recovery, smart home. Select a service for details and pricing."
          align="center"
        />

        <nav aria-label="Jump to service" className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {itServices.map((s) => (
            <Link
              key={s.id}
              href={s.href}
              className="rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              {s.navLabel}
            </Link>
          ))}
        </nav>

        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
          {itServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-24px" }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <Link
                  href={service.href}
                  className="group flex items-start gap-4 rounded-xl border border-white/[0.08] bg-black/40 p-4 sm:p-5 text-left transition-all duration-200 hover:border-cyan-500/25 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 transition-colors group-hover:bg-cyan-500/25">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="font-semibold text-white block group-hover:text-cyan-400 transition-colors">{service.title}</span>
                    <span className="text-sm text-zinc-500 mt-1 block leading-snug">{service.short}</span>
                    <span className="mt-2 inline-flex items-center text-sm font-medium text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100">
                      View details
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-zinc-500">
          We work with: {techNames.join(", ")}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setAssistantOpen(true)}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-bold text-black shadow-lg shadow-cyan-950/25 transition-transform hover:-translate-y-0.5 hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:h-11 sm:px-5 sm:py-2.5"
          >
            Get support
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
          </button>
          <Link
            href="/book?service=it"
            className="text-sm font-medium text-zinc-400 hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded"
          >
            Book directly →
          </Link>
        </div>
      </section>

      <ChatAssistant open={assistantOpen} onOpenChange={setAssistantOpen} />
    </main>
  );
}

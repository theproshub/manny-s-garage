"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { itServiceSchema } from "@/lib/schema";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Code2,
  Cpu,
  Database,
  Globe,
  MapPin,
  Terminal,
  Wifi,
} from "lucide-react";
import { ChatAssistant } from "@/components/chat-assistant";
import { SectionHeading } from "@/components/section-heading";
import { ServiceStandardsSection } from "@/components/service-standards-section";
import { BackToHome } from "@/components/back-to-home";
import { bookUrlWithSchedule } from "@/lib/booking-nav";
import { siteImages } from "@/lib/site-images";

const IT_SERVICES_BASE = "/it/services";

const itServices = [
  {
    id: "web-dev",
    title: "Website & App Building",
    navLabel: "Websites",
    short: "Need a website or online store? We build it for you—fast, mobile-friendly, and easy to manage.",
    icon: Code2,
    href: `${IT_SERVICES_BASE}#web-dev`,
  },
  {
    id: "database",
    title: "Data & Reporting",
    navLabel: "Data",
    short: "We organize your business data so you can look things up, run reports, and stop using spreadsheets.",
    icon: Database,
    href: `${IT_SERVICES_BASE}#database`,
  },
  {
    id: "network",
    title: "Wi-Fi & Internet Setup",
    navLabel: "Wi-Fi",
    short: "Bad signal? Slow connection? We get your internet working everywhere in your home or shop.",
    icon: Wifi,
    href: `${IT_SERVICES_BASE}#network`,
  },
  {
    id: "pc-builds",
    title: "Computer Help & Repair",
    navLabel: "Computers",
    short: "Slow PC, broken laptop, or need a new computer built? We fix it or build one that fits your budget.",
    icon: Cpu,
    href: `${IT_SERVICES_BASE}#pc-builds`,
  },
];

const techNames = ["Websites", "Online Stores", "Business Apps", "Wi-Fi Setup", "PC Repair", "Data Reports"];

export default function ITPages() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <main className="relative overflow-x-hidden">
      <JsonLd data={itServiceSchema()} />
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
                I.T & NETWORKING
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-[2rem] font-bold leading-[1.2] tracking-tight min-[375px]:text-[2.5rem] sm:text-4xl sm:leading-[1.18] lg:text-[3rem] lg:leading-[1.15] xl:text-5xl"
            >
              <span className="metal-text block">I.T. Support</span>
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
                  <span className="text-cyan-300">Tech help</span>
                  <span className="text-white/90">—websites, computers, Wi-Fi, and more.</span>
                </span>
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-6 border-l-2 border-cyan-500/40 pl-4 text-[15px] leading-[1.6] text-zinc-400 sm:mt-7 sm:text-base sm:leading-[1.65]"
            >
              Not sure where to start? Just tell us what’s not working or what you’re trying to do. We’ll figure out the rest and give you a clear price before anything begins.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7"
            >
              <button
                type="button"
                onClick={() => setAssistantOpen(true)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-bold text-black shadow-lg shadow-cyan-950/25 transition-transform hover:-translate-y-0.5 hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
              >
                <Terminal className="h-4 w-4 shrink-0" aria-hidden />
                Consult
              </button>
              <Link
                href={bookUrlWithSchedule("/book?service=it")}
 className="btn-outline inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Book Directly
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
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
                alt="I.T. and networking consulting services"
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
            href="#services"
            className="hero-scroll-hint flex flex-col items-center gap-1.5 text-zinc-500 transition-colors hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-md"
            aria-label="Scroll to services"
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest">See Services</span>
            <ChevronDown className="h-5 w-5 shrink-0 animate-bounce" aria-hidden />
          </a>
        </motion.div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="relative mx-auto max-w-7xl scroll-mt-28 px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <SectionHeading
          badge="What We Do"
          title={<>I.T. & <span className="text-cyan-400">Support</span></>}
          description="Websites, data, Wi-Fi, computers. Pick what you need and we'll walk you through it."
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
                      View Details
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
            Get Support
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
          </button>
          <Link
            href={bookUrlWithSchedule("/book?service=it")}
            className="text-sm font-medium text-zinc-400 hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded"
          >
            Book Directly →
          </Link>
        </div>
      </section>

      <ServiceStandardsSection variant="it" />

      <ChatAssistant open={assistantOpen} onOpenChange={setAssistantOpen} />
    </main>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Gauge,
  MessageSquare,
  ShieldCheck,
  Wrench,
  BatteryCharging,
  Star,
} from "lucide-react";
import { ChatAssistant } from "@/components/chat-assistant";
import { SectionHeading } from "@/components/section-heading";
import { BackToHome } from "@/components/back-to-home";
import { siteImages } from "@/lib/site-images";

const AUTO_SERVICES_BASE = "/auto/services";

/** Most essential & common first: oil/maintenance, brakes, diagnostics, battery */
const autoServices = [
  {
    id: "engine-maintenance",
    title: "Oil Changes & Maintenance",
    navLabel: "Oil & Maintenance",
    short: "Oil changes, filters, tune-ups, belts. Keep your car on schedule.",
    icon: Wrench,
    href: `${AUTO_SERVICES_BASE}#engine-maintenance`,
    popular: true,
  },
  {
    id: "brake-suspension",
    title: "Brake & Suspension",
    navLabel: "Brakes",
    short: "Pads, rotors, fluid flush. Safe stopping and smooth handling.",
    icon: ShieldCheck,
    href: `${AUTO_SERVICES_BASE}#brake-suspension`,
    popular: true,
  },
  {
    id: "diagnostics",
    title: "Check Engine & Diagnostics",
    navLabel: "Diagnostics",
    short: "Fault codes and real answers before you spend on parts.",
    icon: Gauge,
    href: `${AUTO_SERVICES_BASE}#diagnostics`,
    popular: false,
  },
  {
    id: "battery-charging",
    title: "Battery & Charging",
    navLabel: "Battery",
    short: "No-start fixes, battery test, alternator and starter service.",
    icon: BatteryCharging,
    href: `${AUTO_SERVICES_BASE}#battery-charging`,
    popular: false,
  },
];

const testimonials = [
  { text: "They found the electrical issue my dealer couldn't. Fast, honest, and the booking system is insanely easy.", author: "Mark R.", vehicle: "2019 F-150" },
  { text: "Best shop in Fargo. The diagnostic scan results were sent right to my phone before they did any work.", author: "Sarah T.", vehicle: "2021 Civic" },
];

const autoFaqs = [
  { q: "Do I need an appointment for automotive service?", a: "Yes. Book online or chat with Manny to schedule. We offer same-day and next-day slots when available." },
  { q: "Do you work on my make and model?", a: "We work on most cars and light trucks. If you're unsure, use the diagnostic chat or call us—we'll confirm before you book." },
];


export default function AutoPage() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="relative overflow-x-hidden pt-6 sm:pt-10">
      <div className="noise-overlay" aria-hidden />

      {/* ─── HERO ─── */}
      <section id="auto-hero" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 lg:mb-16">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-black shadow-xl shadow-black/30 ring-1 ring-white/[0.06] sm:rounded-[1.5rem]">
          <div className="absolute inset-0 hidden sm:block">
            <Image
              src={siteImages.garageHero}
              alt="Manny's Garage — automotive service"
              fill
              className="object-cover opacity-50"
              priority
              sizes="(max-width: 1024px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          </div>
          <div className="absolute inset-0 bg-black/85 sm:hidden" aria-hidden />

          <div className="relative z-10 px-4 py-5 sm:px-8 sm:py-7 lg:px-10 lg:py-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-col max-w-xl"
            >
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <BackToHome />
                <span className="premium-badge badge-orange orbitron text-[10px] tracking-[0.15em]">
                  AUTOMOTIVE
                </span>
              </div>
              <h1 className="mt-3 sm:mt-4 text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Expert <span className="orange-glow-text">Auto Care</span>
              </h1>
              <p className="mt-2 text-sm text-zinc-400 max-w-md sm:text-base">
                Maintenance, diagnostics, and repairs. Book online or chat for a quick quote.
              </p>
              <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
                <Link
                  href="/book?service=automotive"
                  className="btn-primary group inline-flex h-10 min-w-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:h-11 sm:px-5 sm:py-2.5"
                >
                  Book
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
                </Link>
                <button
                  type="button"
                  onClick={() => setAssistantOpen(true)}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:h-11 sm:px-5 sm:py-2.5"
                >
                  <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                  Chat to book
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        <a
          href="#services"
          className="mt-4 flex justify-center lg:justify-start hero-scroll-hint text-zinc-500 transition-colors hover:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded"
          aria-label="Scroll to services"
        >
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </section>

      {/* ─── ESSENTIAL SERVICES ─── */}
      <section id="services" className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8 scroll-mt-28">
        <SectionHeading
          badge="What we do"
          title={<>Essential <span className="orange-glow-text">Auto Care</span></>}
          description="Oil changes, brakes, check-engine light, and more. Select a service for details and pricing."
          align="center"
        />

        <nav aria-label="Jump to service" className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {autoServices.map((s) => (
            <Link
              key={s.id}
              href={s.href}
              className="rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-orange-400/40 hover:bg-orange-400/10 hover:text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              {s.navLabel}
            </Link>
          ))}
        </nav>

        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
          {autoServices.map((service, i) => {
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
                  className="group flex items-start gap-4 rounded-xl border border-white/[0.08] bg-black/40 p-4 sm:p-5 text-left transition-all duration-200 hover:border-orange-500/25 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400 transition-colors group-hover:bg-orange-500/25">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="font-semibold text-white group-hover:text-orange-400 transition-colors">{service.title}</span>
                      {service.popular && (
                        <span className="rounded bg-orange-500/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-orange-300 ring-1 ring-orange-400/30">
                          Popular
                        </span>
                      )}
                    </span>
                    <span className="text-sm text-zinc-500 mt-1 block leading-snug">{service.short}</span>
                    <span className="mt-2 inline-flex items-center text-sm font-medium text-orange-400 opacity-0 transition-opacity group-hover:opacity-100">
                      View details
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/book?service=automotive"
            className="btn-primary group min-h-[44px] inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
          >
            Book Automotive Service
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <Link
            href={AUTO_SERVICES_BASE}
            className="text-sm font-medium text-zinc-400 hover:text-orange-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded"
          >
            Full services & pricing →
          </Link>
        </div>
      </section>

      {/* ─── REVIEWS / TRUST ─── */}
      <section className="relative border-y border-white/[0.06] bg-black/30 py-16 sm:py-24 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            badge="Client Trust"
            title="What Drivers Say"
            description="Real feedback from Fargo drivers who trust us with their vehicles."
            align="center"
          />
          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                className="panel-cyber rounded-2xl p-6 text-left sm:rounded-[2rem] sm:p-8"
              >
                <div className="flex gap-0.5 mb-3 sm:mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-base sm:text-lg text-zinc-300 italic mb-4 sm:mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500/80 to-amber-600/80 flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-orange-900/30">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{t.author}</p>
                    <p className="orbitron text-[10px] text-cyan-400 tracking-widest">{t.vehicle}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading badge="FAQ" title="Auto Service Questions" align="center" />
        <div className="mt-8 space-y-2 sm:mt-10 sm:space-y-3">
          {autoFaqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full min-h-[44px] items-center justify-between p-4 text-left sm:p-5"
              >
                <span className="font-semibold text-white pr-4 text-sm sm:text-base">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-orange-400 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-zinc-400 text-sm sm:px-5 sm:pb-5 sm:text-base">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section id="auto-cta" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 shadow-xl shadow-black/20 backdrop-blur-sm px-6 py-12 sm:rounded-[2rem] sm:px-10 sm:py-16 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-white mb-3 sm:mb-4 sm:text-2xl md:text-4xl">Ready to fix your car?</h2>
            <p className="text-zinc-400 mb-6 sm:mb-8 text-base sm:text-lg max-w-xl mx-auto">
              Chat with Manny to describe your symptoms. We&apos;ll match you with the right service and get you scheduled.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setAssistantOpen(true)}
                className="btn-primary min-h-[44px] inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
              >
                Start Diagnostic Intake
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </button>
              <Link
                href="/book?service=automotive"
                className="btn-outline min-h-[44px] inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
              >
                Book directly
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <ChatAssistant open={assistantOpen} onOpenChange={setAssistantOpen} />
    </main>
  );
}

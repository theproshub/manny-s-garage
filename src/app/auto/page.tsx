"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Gauge,
  ShieldCheck,
  Wrench,
  BatteryCharging,
  CalendarCheck2,
  MapPin,
  Sparkles,
  Star,
} from "lucide-react";
import { ChatAssistant } from "@/components/chat-assistant";
import { AnimatedCard } from "@/components/animated-card";
import { SectionHeading } from "@/components/section-heading";

/** 4 main categories—short labels so users can scan and choose */
const autoServices = [
  {
    title: "Maintenance",
    icon: Wrench,
    short: "Oil, filters, tune-ups",
    tag: undefined,
    detailsHref: "/auto/services#engine-maintenance",
    slides: [
      "/images/AUTO/compagnons-TnEe6BdBC2M-unsplash.jpg",
      "/images/AUTO/kishor-bidxPYPVdP0-unsplash.jpg",
      "/images/AUTO/michael-lock-xEPZKFzGrVw-unsplash.jpg",
    ],
  },
  {
    title: "Brakes",
    icon: ShieldCheck,
    short: "Pads, rotors, fluid",
    tag: undefined,
    detailsHref: "/auto/services#brake-suspension",
    slides: [
      "/images/AUTO/brice-cooper-a3W_62jM0kg-unsplash.jpg",
      "/images/AUTO/dextar-vision-gW34cv-Ojjs-unsplash.jpg",
      "/images/AUTO/toby-hall-ii4XEyJEm_I-unsplash.jpg",
    ],
  },
  {
    title: "Diagnostics",
    icon: Gauge,
    short: "Check engine & codes",
    tag: undefined,
    detailsHref: "/auto/services#diagnostics",
    slides: [
      "/images/AUTO/arteum-ro-SkKTh9ZyTxU-unsplash.jpg",
      "/images/AUTO/rktw-extend-y9Ij5HEzXI0-unsplash.jpg",
      "/images/AUTO/makayla-rainville-TExf4Ru5BOk-unsplash.jpg",
    ],
  },
  {
    title: "Battery",
    icon: BatteryCharging,
    short: "Battery & charging",
    tag: undefined,
    detailsHref: "/auto/services#battery-charging",
    slides: [
      "/images/AUTO/michael-lock-xEPZKFzGrVw-unsplash.jpg",
      "/images/AUTO/compagnons-TnEe6BdBC2M-unsplash.jpg",
      "/images/AUTO/dextar-vision-gW34cv-Ojjs-unsplash.jpg",
    ],
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

const heroSlides = [
  "/images/AUTO/arteum-ro-SkKTh9ZyTxU-unsplash.jpg",
  "/images/AUTO/brice-cooper-a3W_62jM0kg-unsplash.jpg",
  "/images/AUTO/compagnons-TnEe6BdBC2M-unsplash.jpg",
  "/images/AUTO/dextar-vision-gW34cv-Ojjs-unsplash.jpg",
  "/images/AUTO/kishor-bidxPYPVdP0-unsplash.jpg",
];


export default function AutoPage() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="relative overflow-x-hidden">
      <div className="noise-overlay" aria-hidden />

      {/* ─── STICKY PAGE NAV ─── */}
      <div className="sticky top-0 z-30 border-b border-white/[0.06] bg-black/35 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <a
            href="#services"
            className="orbitron hidden text-[10px] font-bold uppercase tracking-[0.3em] text-orange-300 sm:inline"
          >
            AUTO
          </a>
          <nav className="flex flex-1 items-center justify-center gap-2 sm:justify-start sm:gap-3">
            {[
              { href: "#services", label: "Services" },
              { href: "#reviews", label: "Reviews" },
              { href: "#faq", label: "FAQ" },
              { href: "#auto-cta", label: "Book" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/[0.10] bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:border-white/[0.18] hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setAssistantOpen(true)}
            className="btn-primary inline-flex min-h-[36px] items-center justify-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            Intake
            <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
          </button>
        </div>
      </div>

      {/* ─── HERO ─── */}
      <section className="relative pt-10 sm:pt-14 lg:pt-16">
        <div className="hero-bg-gradient" aria-hidden />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-14 sm:px-6 sm:pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:pb-20">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 flex flex-wrap items-center gap-2 sm:mb-6"
            >
              <span className="premium-badge badge-orange flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                Automotive Service
              </span>
              <span className="premium-badge flex items-center gap-1.5 text-cyan-200/90">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                Fargo, ND
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="text-[2rem] font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[3rem] xl:text-5xl"
            >
              <span className="metal-text block">Fast, honest repairs.</span>
              <span className="mt-3 block text-white/95">
                Diagnostics you can <span className="orange-glow-text">trust</span>.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="mt-6 border-l-2 border-orange-500/50 pl-4 text-[15px] leading-[1.6] text-zinc-400 sm:text-base sm:leading-[1.65]"
            >
              Choose what sounds closest—or start the intake if you’re not sure. We’ll route you to the right service and get you scheduled.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center"
            >
              <Link
                href="/book?service=automotive"
                className="btn-primary group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Book now
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <button
                type="button"
                onClick={() => setAssistantOpen(true)}
                className="btn-outline inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] px-6 py-3 text-base font-semibold text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Start diagnostic intake
                <CalendarCheck2 className="h-4 w-4 shrink-0" aria-hidden />
              </button>
            </motion.div>

            <div className="mt-7 grid gap-3 sm:mt-8 sm:grid-cols-3">
              {[
                { k: "Same/next‑day", v: "Slots when available" },
                { k: "Clear estimates", v: "No surprises" },
                { k: "Scan + verify", v: "Fix the right issue" },
              ].map((item) => (
                <div
                  key={item.k}
                  className="rounded-2xl border border-white/[0.08] bg-black/35 px-4 py-3 text-sm backdrop-blur-sm"
                >
                  <p className="font-semibold text-white">{item.k}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{item.v}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="hero-image-wrap"
          >
            <div className="hero-glow" aria-hidden />
            <div className="rounded-2xl border border-white/[0.09] bg-black/40 shadow-2xl shadow-black/40 ring-1 ring-white/[0.06]">
              <AnimatedCard
                title="Shop-ready diagnostics"
                description="A quick intake gets you scheduled with the right service."
                imageSlides={heroSlides}
                icon={<Gauge className="h-6 w-6" />}
                tag="AUTO"
                href="#services"
                delay={0.0}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="relative scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 sm:pb-24 sm:pt-10 lg:px-8">
          <SectionHeading
            badge="What We Fix"
            title={<>Auto <span className="orange-glow-text">Repair Services</span></>}
            description="Pick what sounds closest. If you’re not sure, start the intake and we’ll route you to the right service."
            align="center"
          />

          <div className="mx-auto mt-6 flex max-w-5xl flex-col items-stretch justify-between gap-3 rounded-2xl border border-white/[0.08] bg-black/30 p-4 backdrop-blur-sm sm:mt-8 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
            <div className="min-w-0">
              <p className="text-sm font-bold text-white">Not sure what to pick?</p>
              <p className="mt-0.5 text-sm text-zinc-500">
                Start the diagnostic intake. Manny will ask a few quick questions and route you to the right service.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAssistantOpen(true)}
              className="btn-primary inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Start intake
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </button>
          </div>

          <div className="mx-auto mt-6 max-w-5xl">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Quick picks
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {[
                "Check engine light on",
                "Car won’t start",
                "Brakes squeaking/grinding",
                "Oil change needed",
                "Battery/alternator issues",
                "Weird noise/vibration",
              ].map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setAssistantOpen(true)}
                  className="rounded-full border border-white/[0.10] bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-zinc-300 backdrop-blur-sm transition-colors hover:border-white/[0.18] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {autoServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <AnimatedCard
                  key={service.title}
                  title={service.title}
                  description={service.short}
                  imageSlides={service.slides}
                  icon={<Icon className="h-6 w-6" />}
                  tag={service.tag}
                  href={service.detailsHref}
                  delay={0.08 + i * 0.08}
                />
              );
            })}
          </div>

          <p className="mt-6 text-center text-sm text-zinc-500">
            We also do tires, A/C, transmission, electrical, and more.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/auto/services"
              className="btn-outline min-h-[48px] w-full max-w-xs inline-flex items-center justify-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] px-6 py-3 text-base font-semibold text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              See services & details
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
            <Link
              href="/book?service=automotive"
              className="btn-primary group inline-flex min-h-[48px] w-full max-w-xs items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Book automotive service
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS / TRUST ─── */}
      <section id="reviews" className="relative border-y border-white/[0.06] bg-black/30 py-16 sm:py-24 backdrop-blur-md scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32">
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
      <section id="faq" className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32">
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
                className="flex w-full min-h-[44px] items-center justify-between p-4 text-left sm:p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                aria-expanded={openFaq === i}
                aria-controls={`auto-faq-answer-${i}`}
                id={`auto-faq-question-${i}`}
              >
                <span className="font-semibold text-white pr-4 text-sm sm:text-base">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-orange-400 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    id={`auto-faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`auto-faq-question-${i}`}
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

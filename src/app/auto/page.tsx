"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Gauge,
  ShieldCheck,
  Wrench,
  BatteryCharging,
  Star,
} from "lucide-react";
import { BackToHome } from "@/components/back-to-home";
import { ChatAssistant } from "@/components/chat-assistant";
import { SectionHeading } from "@/components/section-heading";

const AUTO_HERO_IMAGES = [
  "/hero/hero-bays.png",
  "/images/AUTO/arteum-ro-SkKTh9ZyTxU-unsplash.jpg",
  "/images/AUTO/brice-cooper-a3W_62jM0kg-unsplash.jpg",
  "/images/AUTO/compagnons-TnEe6BdBC2M-unsplash.jpg",
  "/images/AUTO/dextar-vision-gW34cv-Ojjs-unsplash.jpg",
  "/images/AUTO/kishor-bidxPYPVdP0-unsplash.jpg",
  "/images/AUTO/makayla-rainville-TExf4Ru5BOk-unsplash.jpg",
  "/images/AUTO/michael-lock-xEPZKFzGrVw-unsplash.jpg",
  "/images/AUTO/rktw-extend-y9Ij5HEzXI0-unsplash.jpg",
  "/images/AUTO/toby-hall-ii4XEyJEm_I-unsplash.jpg",
];
const HERO_SLIDE_DURATION_MS = 4500;

/** Simple list: 4 main categories so users can quickly choose and book */
const autoServices = [
  { title: "Oil & maintenance", icon: Wrench, short: "Oil changes, filters, tune-ups." },
  { title: "Brakes & suspension", icon: ShieldCheck, short: "Pads, rotors, fluid, safe stopping." },
  { title: "Check engine & diagnostics", icon: Gauge, short: "Fault codes and clear answers." },
  { title: "Battery & charging", icon: BatteryCharging, short: "No-start, battery test, alternator." },
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
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setHeroSlideIndex((i) => (i + 1) % AUTO_HERO_IMAGES.length);
    }, HERO_SLIDE_DURATION_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden pt-6 sm:pt-10">
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
            <span className="premium-badge badge-orange orbitron text-[10px] tracking-[0.15em]">
              AUTO
            </span>
          </div>
          <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Repair, <span className="orange-glow-text">Diagnostics</span> & Maintenance
              </h1>
              <p className="mt-2 text-sm text-zinc-400 max-w-md sm:text-base">
                Oil changes, brakes, check engine light, battery, and more. Book online or get a quote—we work on most cars and light trucks.
              </p>
              <Link
                href="#services"
                className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:h-11 sm:px-5 sm:py-2.5"
              >
                Get quote
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
              </Link>
            </div>
            <div className="relative w-full sm:w-72 lg:w-80 aspect-video sm:aspect-[4/3] overflow-hidden rounded-xl border border-white/[0.08] bg-black/40 shrink-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={heroSlideIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={AUTO_HERO_IMAGES[heroSlideIndex]}
                    alt="Auto repair: diagnostics, maintenance, brakes, and service"
                    fill
                    className="object-cover"
                    priority={heroSlideIndex === 0}
                    sizes="(max-width: 640px) 100vw, 320px"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                {AUTO_HERO_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setHeroSlideIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === heroSlideIndex ? "w-5 bg-orange-400" : "w-1.5 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── AUTO REPAIR SERVICES (simple) ─── */}
      <section id="services" className="relative mx-auto max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8 scroll-mt-28">
        <h2 className="text-center text-xl font-bold text-white sm:text-2xl">
          Auto <span className="orange-glow-text">Repair Services</span>
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-500">
          Choose a service below or book and we’ll help you decide.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-black/35 backdrop-blur-sm"
        >
          <div className="border-b border-white/[0.06] p-5 sm:p-6">
            <p className="text-sm font-bold text-white">Common services</p>
            <p className="mt-1 text-sm text-zinc-500">
              Pick what sounds closest. If you’re not sure, book and we’ll route you correctly.
            </p>
          </div>

          <div className="grid gap-0 sm:grid-cols-2">
            <div className="p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Maintenance</p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-400">
                <li>Oil changes, filters, and fluids</li>
                <li>Tune-ups (spark plugs, coils, air filters)</li>
                <li>Belts, hoses, and scheduled maintenance</li>
                <li>Pre-trip and seasonal inspections</li>
              </ul>
            </div>
            <div className="border-t border-white/[0.06] p-5 sm:border-t-0 sm:border-l sm:border-white/[0.06] sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Diagnostics & repair</p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-400">
                <li>Check engine light & fault code scanning</li>
                <li>Brakes (pads, rotors, fluid)</li>
                <li>Battery / alternator / no-start issues</li>
                <li>A/C, electrical, tires, and more</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/[0.06] p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-zinc-500">
                Want details? Here are the four main categories:
                <span className="text-zinc-300"> </span>
              </p>
              <Link
                href="/book?service=automotive"
                className="btn-primary group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Get quote / Book
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {autoServices.map((service) => {
                const Icon = service.icon;
                return (
                  <span
                    key={service.title}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.04] px-3 py-2 text-xs font-semibold text-zinc-300"
                  >
                    <Icon className="h-3.5 w-3.5 text-orange-300" aria-hidden />
                    {service.title}
                  </span>
                );
              })}
            </div>
          </div>
        </motion.div>

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

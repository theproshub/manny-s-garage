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
  MapPin,
} from "lucide-react";
import { BackToHome } from "@/components/back-to-home";
import { ChatAssistant } from "@/components/chat-assistant";
import { SectionHeading } from "@/components/section-heading";

const AUTO_HERO_IMAGES = [
  "/hero/hero-bays.png",
  "/hero/hero-auto-slide-services.png",
  "/hero/hero-auto-slide-diy.png",
  "/images/AUTO/brice-cooper-a3W_62jM0kg-unsplash.jpg",
  "/images/AUTO/compagnons-TnEe6BdBC2M-unsplash.jpg",
  "/images/AUTO/michael-lock-xEPZKFzGrVw-unsplash.jpg",
  "/images/AUTO/toby-hall-ii4XEyJEm_I-unsplash.jpg",
  "/images/AUTO/WhatsApp Image 2026-03-18 at 11.29.17.jpeg",
  "/images/AUTO/WhatsApp Image 2026-03-18 at 11.29.17 (1).jpeg",
  "/images/AUTO/WhatsApp Image 2026-03-18 at 10.55.57 (3).jpeg",
];
const HERO_SLIDE_DURATION_MS = 4500;

const autoHeroSlideLabels = [
  "Service bays",
  "Repair & maintenance",
  "DIY bay option",
  "Diagnostics & repair",
  "Professional service",
  "Trusted mechanics",
  "Fargo auto service",
  "Audio and trunk setup",
  "Engine detail close-up",
  "Oil service",
];

/** Simple list: 4 main categories so users can quickly choose and book */
const autoServices = [
  { title: "Oil & maintenance", icon: Wrench, short: "Oil changes, filters, tune-ups." },
  { title: "Brakes & suspension", icon: ShieldCheck, short: "Pads, rotors, fluid, safe stopping." },
  { title: "Check engine & diagnostics", icon: Gauge, short: "Fault codes and clear answers." },
  { title: "Battery & charging", icon: BatteryCharging, short: "No-start, battery test, alternator." },
];

const testimonials = [
  { text: "Manny found the electrical issue my dealer missed. He explained it straight, fixed it quick, and never tried to add extra stuff.", author: "Mark R.", vehicle: "2019 F-150" },
  { text: "Manny is well known in Fargo, especially in the Liberian community. He sent diagnostics first, got my go-ahead, and the price stayed just how he quoted it.", author: "Sarah T.", vehicle: "2021 Civic" },
];

const autoFaqs = [
  { q: "Do I need an appointment for automotive service?", a: "Yes. Book online or call us and we will lock in a time that works for you. Same-day and next-day slots are often available." },
  { q: "Do you work on my make and model?", a: "We service most cars and light trucks. If you are not sure, give us a quick call and we will confirm before you book." },
];


export default function AutoPage() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  useEffect(() => {
    if (carouselPaused) return;
    const t = setInterval(() => {
      setHeroSlideIndex((i) => (i + 1) % AUTO_HERO_IMAGES.length);
    }, HERO_SLIDE_DURATION_MS);
    return () => clearInterval(t);
  }, [carouselPaused]);

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
              <span className="premium-badge badge-orange orbitron text-[10px] tracking-[0.15em]">
                AUTO
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-[2rem] font-bold leading-[1.2] tracking-tight min-[375px]:text-[2.5rem] sm:text-4xl sm:leading-[1.18] lg:text-[3rem] lg:leading-[1.15] xl:text-5xl"
            >
              <span className="metal-text block">Auto Repair</span>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="mt-4 flex items-center gap-3 sm:mt-5 sm:gap-4"
              >
                <span
                  className="h-px w-8 shrink-0 bg-gradient-to-r from-orange-400/60 to-transparent sm:w-10"
                  aria-hidden
                />
                <span className="text-base font-medium tracking-wide text-white/95 sm:text-lg sm:tracking-normal lg:text-xl">
                  <span className="text-orange-300">Diagnostics</span>
                  <span className="text-white/90">—repair & maintenance for cars and light trucks.</span>
                </span>
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-6 border-l-2 border-orange-500/50 pl-4 text-[15px] leading-[1.6] text-zinc-400 sm:mt-7 sm:text-base sm:leading-[1.65]"
            >
              Oil changes, brakes, check engine light, battery/charging, A/C, and more. Book online or start a quick intake and
              we’ll route you to the right service.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7"
            >
              <Link
                href="/quote?for=auto"
                className="btn-primary inline-flex items-center justify-center gap-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Fixed prices
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
              <Link
                href="/book?service=automotive"
                className="btn-outline inline-flex items-center gap-1.5 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Book any job
              </Link>
              <button
                type="button"
                onClick={() => setAssistantOpen(true)}
                className="btn-outline inline-flex items-center gap-1.5 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Start diagnostic intake
              </button>
            </motion.div>
          </div>

          {/* Right: Image carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="hero-image-wrap order-1 lg:order-2"
          >
            <div className="hero-glow" aria-hidden />
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/[0.09] bg-black shadow-2xl shadow-black/40 ring-1 ring-white/[0.06] lg:aspect-[16/10]"
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => setCarouselPaused(false)}
              onFocus={() => setCarouselPaused(true)}
              onBlur={() => setCarouselPaused(false)}
            >
              <div
                aria-live="polite"
                aria-label={`Slide ${heroSlideIndex + 1}: ${autoHeroSlideLabels[heroSlideIndex] ?? "Auto service"}`}
                className="sr-only"
              />
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={heroSlideIndex}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={AUTO_HERO_IMAGES[heroSlideIndex]}
                    alt={`Auto repair in Fargo, ND — ${autoHeroSlideLabels[heroSlideIndex] ?? "Auto service"}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={heroSlideIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="img-side-overlay z-10" />
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center sm:bottom-5 sm:left-5 sm:right-5">
                <div className="flex gap-2">
                  {AUTO_HERO_IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setHeroSlideIndex(idx)}
                      className={`rounded-full transition-all duration-300 ${
                        idx === heroSlideIndex ? "h-2 w-8 bg-orange-400" : "h-2 w-2 bg-white/35 hover:bg-white/55"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                      aria-current={idx === heroSlideIndex ? "true" : undefined}
                    />
                  ))}
                </div>
              </div>
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
            className="hero-scroll-hint flex flex-col items-center gap-1.5 text-zinc-500 transition-colors hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-md"
            aria-label="Scroll to services"
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest">See services</span>
            <ChevronDown className="h-5 w-5 shrink-0 animate-bounce" aria-hidden />
          </a>
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
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Link
                  href="/quote?for=auto"
                  className="btn-primary group inline-flex items-center justify-center gap-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                >
                  Fixed prices
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
                <Link
                  href="/book?service=automotive"
                  className="btn-outline inline-flex items-center justify-center gap-1.5 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                >
                  Book any job
                </Link>
              </div>
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
                className="btn-primary inline-flex items-center justify-center gap-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Start Diagnostic Intake
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </button>
              <Link
                href="/book?service=automotive"
                className="btn-outline inline-flex items-center gap-1.5 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
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

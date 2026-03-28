"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { autoServiceSchema } from "@/lib/schema";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Gauge, ShieldCheck, Wrench, BatteryCharging, MapPin } from "lucide-react";
import { BackToHome } from "@/components/back-to-home";
import { ChatAssistant } from "@/components/chat-assistant";
import { SectionHeading } from "@/components/section-heading";
import { AutoFixedPricingGrid } from "@/components/auto-fixed-pricing-grid";
import { ServiceStandardsSection } from "@/components/service-standards-section";
import { AUTO_PRICING_PARTS_DISCLAIMER, ARI_AUTOMOTIVE_BOOKING_URL } from "@/lib/fixed-quote-options";

const AUTO_HERO_IMAGES = [
  "/hero/hero-bays.webp",
  "/hero/hero-auto-slide-services.webp",
  "/hero/hero-auto-slide-diy.webp",
  "/images/AUTO/brice-cooper-a3W_62jM0kg-unsplash.webp",
  "/images/AUTO/compagnons-TnEe6BdBC2M-unsplash.webp",
  "/images/AUTO/michael-lock-xEPZKFzGrVw-unsplash.webp",
  "/images/AUTO/toby-hall-ii4XEyJEm_I-unsplash.webp",
  "/images/AUTO/WhatsApp Image 2026-03-18 at 11.29.17.webp",
  "/images/AUTO/WhatsApp Image 2026-03-18 at 11.29.17 (1).webp",
  "/images/AUTO/WhatsApp Image 2026-03-18 at 10.55.57 (3).webp",
];
const HERO_SLIDE_DURATION_MS = 4500;

const autoHeroSlideLabels = [
  "Service Bays",
  "Repair & Maintenance",
  "DIY Bay Option",
  "Diagnostics & Repair",
  "Professional Service",
  "Trusted Mechanics",
  "Fargo Auto Service",
  "Audio and Trunk Setup",
  "Engine Detail Close-Up",
  "Oil Service",
];

/** Simple list: 4 main categories so users can quickly choose and book */
const autoServices = [
  { title: "Oil & Maintenance", icon: Wrench, short: "Oil changes, filters, and tune-ups." },
  { title: "Brakes & Suspension", icon: ShieldCheck, short: "Pads, rotors, fluid, and safe stopping." },
  { title: "Check Engine & Diagnostics", icon: Gauge, short: "Fault codes and clear answers." },
  { title: "Battery & Charging", icon: BatteryCharging, short: "No-start help, battery test, and alternator work." },
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
      <JsonLd data={autoServiceSchema()} />
      <div className="noise-overlay" aria-hidden />

      {/* ─── HERO (same layout as homepage) ─── */}
      <section className="relative flex min-h-0 flex-col pb-4 sm:min-h-[70vh] sm:pb-10 lg:min-h-[78vh] lg:pb-8">
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
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-[2rem] font-bold leading-[1.2] tracking-tight min-[375px]:text-[2.5rem] sm:text-4xl sm:leading-[1.18] lg:text-[3rem] lg:leading-[1.15] xl:text-5xl"
            >
              <span className="metal-text block">Auto Repair</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-5 text-[15px] leading-[1.6] text-zinc-300 sm:mt-6 sm:text-base sm:leading-[1.7]"
            >
              Oil changes, brakes, check engine light, A/C, battery, and more. Prices are listed — parts are not included unless we say so.
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
                Fixed Prices
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
              <Link
                href={ARI_AUTOMOTIVE_BOOKING_URL}
                className="btn-outline inline-flex items-center gap-1.5 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Book Any Job
              </Link>
              <button
                type="button"
                onClick={() => setAssistantOpen(true)}
                className="btn-outline inline-flex items-center gap-1.5 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Start Diagnostic Intake
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
                aria-label={`Slide ${heroSlideIndex + 1}: ${autoHeroSlideLabels[heroSlideIndex] ?? "Auto Service"}`}
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
                    alt={`Auto repair in Fargo, ND — ${autoHeroSlideLabels[heroSlideIndex] ?? "Auto Service"}`}
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

      </section>

      {/* ─── AUTO REPAIR SERVICES ─── */}
      <section id="services" className="relative mx-auto max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8 scroll-mt-28">
        <section
          id="fixed-pricing"
          className="scroll-mt-28 pt-6 sm:pt-10"
          aria-labelledby="auto-fixed-pricing-heading"
        >
          <h2 id="auto-fixed-pricing-heading" className="text-center text-xl font-bold text-white sm:text-2xl">
            Common <span className="orange-glow-text">Fixed Starting Prices</span>
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-zinc-500">
            Starting prices for common jobs—we&apos;ll confirm your vehicle and any parts before work. {AUTO_PRICING_PARTS_DISCLAIMER}
          </p>
          <AutoFixedPricingGrid className="mx-auto mt-8 max-w-5xl" />
          <p className="mt-6 text-center text-sm text-zinc-500">
            <Link href="/quote?for=auto" className="text-orange-400 hover:underline">
              Open full pricing page →
            </Link>
          </p>
        </section>
      </section>

      <ServiceStandardsSection variant="auto" />

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
                href={ARI_AUTOMOTIVE_BOOKING_URL}
                className="btn-outline inline-flex items-center gap-1.5 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Book Directly
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <ChatAssistant open={assistantOpen} onOpenChange={setAssistantOpen} />
    </main>
  );
}

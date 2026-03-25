"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CalendarPlus,
  CarFront,
  ChevronDown,
  Cpu,
  Hammer,
  MapPin,
  PhoneCall,
  Tag,
  Tv,
} from "lucide-react";
import { AnimatedCard } from "@/components/animated-card";
import { SectionHeading } from "@/components/section-heading";
import { ServiceStandardsSection } from "@/components/service-standards-section";
import { siteImages } from "@/lib/site-images";
import { AUTO_PRICING_PARTS_DISCLAIMER } from "@/lib/fixed-quote-options";

const heroImages = [
  "/hero/hero-handyman.png",
  "/hero/hero-handyman-grid.png",
  "/hero/hero-handyman-services.png",
  "/hero/hero-auto-slide-services.png",
  "/hero/hero-bays.png",
];

/** Service cards use same slides as their hero pages */
const autoCardSlides = [
  "/hero/hero-bays.png",
  "/hero/hero-auto-slide-services.png",
  "/hero/hero-auto-slide-diy.png",
  "/images/AUTO/brice-cooper-a3W_62jM0kg-unsplash.jpg",
  "/images/AUTO/compagnons-TnEe6BdBC2M-unsplash.jpg",
  "/images/AUTO/michael-lock-xEPZKFzGrVw-unsplash.jpg",
  "/images/AUTO/toby-hall-ii4XEyJEm_I-unsplash.jpg",
];

const handymanCardSlides = [
  "/images/AUTO/HANDYMAN/handyman-hero-1.jpeg",
  "/images/AUTO/HANDYMAN/thom-milkovic-uV1weWrJnRM-unsplash.jpg",
  "/images/AUTO/HANDYMAN/handyman-hero-2.jpeg",
  "/images/AUTO/HANDYMAN/alexis-dreher-MfnLwbch9_o-unsplash.jpg",
  "/images/AUTO/HANDYMAN/handyman-hero-3.jpeg",
  "/images/AUTO/HANDYMAN/boliviainteligente-8KJymJAC9sA-unsplash.jpg",
  "/images/AUTO/HANDYMAN/handyman-hero-4.jpeg",
  "/images/AUTO/HANDYMAN/handyman-hero-5.jpeg",
  "/images/AUTO/HANDYMAN/thibault-penin-SwKf1x2_hRo-unsplash.jpg",
  "/images/AUTO/HANDYMAN/handyman-hero-6.jpeg",
  "/hero/hero-handyman.png",
];

const diyCardSlides = [siteImages.diyGarage];

const itCardSlides = [siteImages.itConsultant];

const faqs = [
  {
    q: "Do I need an appointment for automotive service?",
    a: "Yes. Book online or call us to schedule a time that works for you. Same-day and next-day openings are often available.",
  },
  {
    q: "What's included in the DIY garage rental?",
    a: "You get full access to the bay, car lift, diagnostic scanner, oil and tire tools, air compressor, power tools, workbench, and lighting. It is $20/hour for up to 8 hours per session.",
  },
  {
    q: "How does handyman pricing work?",
    a: "Furniture assembly is $50 per item. TV mounting is $1.75 per inch. Security camera installation is $120 per camera. Open the pricing page, pick your price, and book right away.",
  },
];

const heroSlideLabels = [
  "Handyman Services",
  "Handyman — Assembly, TV, Cameras & More",
  "Handyman & I.T. Services",
  "Automotive, Handyman, and DIY Storefront",
  "Our Service Bays",
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  useEffect(() => {
    if (carouselPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselPaused]);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="relative w-full min-w-0 overflow-x-hidden">
      <div className="noise-overlay" aria-hidden />

      {/* ─── HERO ─── */}
      <section className="relative flex min-h-[min(60dvh,36rem)] flex-col pb-8 sm:min-h-[65vh] sm:pb-8 lg:min-h-[75vh] lg:pb-8">
        <div className="hero-bg-gradient" aria-hidden />
        <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-7xl flex-1 flex-col justify-center px-[max(1rem,env(safe-area-inset-left))] pt-0 pb-4 pr-[max(1rem,env(safe-area-inset-right))] sm:px-6 sm:pb-6 sm:pt-2 md:pb-8 lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14 lg:px-8 lg:pt-4 lg:pb-12 xl:gap-20">
          {/* Left: Copy */}
          <div className="order-2 mt-6 min-w-0 max-w-full sm:mt-8 lg:order-1 lg:mt-0 lg:max-w-[36rem]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 flex flex-wrap items-center gap-2 sm:mb-6"
            >
              <span className="premium-badge badge-orange orbitron text-[10px] tracking-[0.16em]">
                SAME-DAY SLOTS
              </span>
              <span className="premium-badge badge-orange flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                Fargo, ND
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="break-words text-[1.65rem] font-bold leading-[1.18] tracking-tight min-[360px]:text-[2rem] min-[400px]:text-[2.25rem] sm:text-4xl sm:leading-[1.18] lg:text-[3rem] lg:leading-[1.15] xl:text-5xl"
            >
              <span className="metal-text block">Manny&apos;s Garage</span>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="mt-3 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:items-center sm:gap-4"
              >
                <span className="hidden h-px w-8 shrink-0 bg-gradient-to-r from-orange-400/60 to-transparent sm:block sm:w-10" aria-hidden />
                <span className="text-[0.95rem] font-medium leading-snug tracking-wide text-white/95 sm:text-lg sm:tracking-normal lg:text-xl">
                  <span className="text-orange-300">Welcome in</span>
                  <span className="text-white/90"> — Fargo One Stop Garage.</span>
                </span>
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-5 max-w-full border-l-2 border-orange-500/50 pl-3 text-[14px] leading-[1.55] text-zinc-400 sm:mt-7 sm:pl-4 sm:text-base sm:leading-[1.65]"
            >
              Fargo&apos;s go-to spot for car repairs, handyman work, and equipped DIY bays—everything you need under one roof.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="mt-4 flex flex-wrap gap-2"
            >
              <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-[11px] font-semibold text-orange-200">
                Fast Booking
              </span>
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-[11px] font-semibold text-cyan-200">
                Fixed Pricing
              </span>
              <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-zinc-200">
                One-Stop Service
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="mt-7 flex flex-col gap-4 sm:mt-8"
            >
              <div className="flex w-full min-w-0 flex-col gap-2.5 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-3">
                <div className="grid w-full min-w-0 grid-cols-2 gap-2.5 sm:flex sm:w-auto sm:gap-3">
                  <Link
                    href="/book"
                    className="btn-primary inline-flex w-full min-w-0 items-center justify-center gap-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:w-auto sm:min-w-[9rem]"
                  >
                    <CalendarPlus className="h-4 w-4 shrink-0" aria-hidden />
                    Book Now
                    <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  </Link>
                  <Link
                    href="/quote"
                    className="btn-outline inline-flex w-full min-w-0 items-center justify-center gap-1.5 rounded-full border-orange-500/35 bg-orange-500/10 text-orange-200 backdrop-blur-sm transition-colors hover:border-orange-400/50 hover:bg-orange-500/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:w-auto sm:min-w-[8.5rem]"
                  >
                    <Tag className="h-4 w-4 shrink-0" aria-hidden />
                    See Pricing
                  </Link>
                </div>
                <a
                  href="#services"
                  className="btn-outline inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:w-auto sm:min-w-[9rem]"
                >
                  Browse Services
                  <ChevronDown className="h-3.5 w-3.5 shrink-0" aria-hidden />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right: Image carousel — below service links on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="hero-image-wrap order-1 w-full min-w-0 max-w-full lg:order-2"
          >
            <div className="hero-glow" aria-hidden />
            <div
              className="relative aspect-[16/11] w-full max-w-full min-w-0 overflow-hidden rounded-2xl border border-white/[0.09] bg-black shadow-2xl shadow-black/40 ring-1 ring-white/[0.06] min-[400px]:aspect-[4/3] lg:aspect-[16/10]"
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => setCarouselPaused(false)}
              onFocus={() => setCarouselPaused(true)}
              onBlur={() => setCarouselPaused(false)}
            >
              <div aria-live="polite" aria-label={`Slide ${currentSlide + 1}: ${heroSlideLabels[currentSlide]}`} className="sr-only" />
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={heroImages[currentSlide]}
                    alt={`Manny's Garage in Fargo, ND — handyman and I.T. services and more (${heroSlideLabels[currentSlide]})`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    quality={70}
                    priority={currentSlide === 0}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="img-side-overlay z-10" />
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center sm:bottom-5 sm:left-5 sm:right-5">
                <div className="flex gap-2">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`rounded-full transition-all duration-300 ${
                        idx === currentSlide
                          ? "h-2 w-8 bg-orange-400"
                          : "h-2 w-2 bg-white/35 hover:bg-white/55"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                      aria-current={idx === currentSlide ? "true" : undefined}
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
          className="absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-10 -translate-x-1/2 pb-safe sm:bottom-6 lg:bottom-8"
        >
          <a
            href="#services"
            className="hero-scroll-hint flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 text-zinc-500 transition-colors hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-md"
            aria-label="Scroll to services"
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest">See Services</span>
            <ChevronDown className="h-5 w-5 shrink-0 animate-bounce" aria-hidden />
          </a>
        </motion.div>
      </section>

      {/* ─── SERVICE CARDS ─── */}
      <section id="services" className="relative scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32">
        <div className="mx-auto max-w-7xl px-[max(1rem,env(safe-area-inset-left))] pb-16 pt-6 pr-[max(1rem,env(safe-area-inset-right))] sm:px-6 sm:pb-24 sm:pt-10 lg:px-8">
          <SectionHeading
            badge="What We Offer"
            title={<>Choose Your <span className="orange-glow-text">Service</span></>}
            description="From full-service auto repair to handyman installations, I.T. and networking, and DIY bay rental—all under one roof."
            align="center"
          />

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 md:gap-4 lg:gap-5">
            <AnimatedCard
              title="Automotive Services"
              description={`Maintenance for cars and light trucks. ${AUTO_PRICING_PARTS_DISCLAIMER}`}
              imageSlides={autoCardSlides}
              icon={<CarFront className="h-6 w-6" />}
              tag="AUTO"
              href="/auto"
              delay={0.1}
            />
            <AnimatedCard
              title="Handyman Services"
              description="TV Mounting, Security Cameras, and Furniture Assembly—fast home installs."
              imageSlides={handymanCardSlides}
              icon={<Tv className="h-6 w-6" />}
              tag="HOME"
              href="/handyman"
              delay={0.2}
            />
            <AnimatedCard
              title="DIY Garage"
              description="Rent a fully equipped garage space and work on your own vehicle."
              imageSlides={diyCardSlides}
              icon={<Hammer className="h-6 w-6" />}
              tag="RENTAL"
              href="/diy-garage"
              delay={0.3}
            />
            <AnimatedCard
              title="I.T. Consultant"
              description="Network setup, PC builds, data recovery, and smart home integration."
              imageSlides={itCardSlides}
              icon={<Cpu className="h-6 w-6" />}
              tag="I.T"
              href="/it"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      <ServiceStandardsSection variant="home" />

      {/* ─── FAQ ─── */}
      <section id="faq" className="relative mx-auto max-w-3xl scroll-mt-24 px-[max(1rem,env(safe-area-inset-left))] py-14 pr-[max(1rem,env(safe-area-inset-right))] sm:px-6 sm:py-24 sm:scroll-mt-28 lg:px-8 lg:scroll-mt-32">
        <SectionHeading badge="FAQ" title="Frequently Asked Questions" align="center" />
        <div className="mt-8 space-y-2 sm:mt-12 sm:space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full min-h-[44px] items-center justify-between p-4 text-left sm:p-5 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                aria-expanded={openFaq === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span className="font-semibold text-white pr-4 text-sm sm:text-base">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-orange-400 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
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

      {/* ─── CONTACT ─── */}
      <section id="contact" className="relative mx-auto max-w-7xl scroll-mt-24 px-[max(1rem,env(safe-area-inset-left))] pb-[max(6rem,env(safe-area-inset-bottom))] pt-14 pr-[max(1rem,env(safe-area-inset-right))] sm:px-6 sm:pb-32 sm:pt-24 sm:scroll-mt-28 lg:px-8 lg:scroll-mt-32">
        <SectionHeading
          badge="Contact"
          title="Visit or Get in Touch"
          description="We&apos;re here to help. Call, email, or stop by our facility."
          align="center"
        />
        <div className="mt-8 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm sm:p-8"
          >
            <p className="text-base font-semibold leading-snug text-white sm:text-lg md:text-xl">
              One tap to <span className="orange-glow-text">call</span>, <span className="text-cyan-400">email</span>, or <span className="text-orange-400">get directions</span>.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <a
                href="tel:+17015550142"
                className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-sm font-semibold text-cyan-300 transition-all hover:border-cyan-400/50 hover:bg-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:min-h-[44px] sm:flex-none sm:justify-start"
              >
                <PhoneCall className="h-4 w-4" />
                Call
              </a>
              <a
                href="mailto:service@mannysgarage.com"
                className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/90 transition-all hover:border-white/35 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:min-h-[44px] sm:flex-none sm:justify-start"
              >
                Email
              </a>
              <a
                href="https://maps.apple.com/maps?q=1335+Main+Ave+S+Fargo+ND+58103"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-2.5 text-sm font-semibold text-orange-300 transition-all hover:border-orange-400/50 hover:bg-orange-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:min-h-[44px] sm:w-auto sm:justify-start"
              >
                <MapPin className="h-4 w-4" />
                Directions
              </a>
            </div>
            <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm text-zinc-400">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                1335 Main Ave S, Fargo, ND 58103
              </p>
              <p>(701) 555-0142 · Mon–Fri 8am–6pm, Sat 9am–3pm</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] min-h-[220px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 sm:min-h-0"
          >
            <iframe
              title="Manny's Garage location"
              src="https://www.google.com/maps?q=1335+Main+Ave+S+Fargo+ND+58103&output=embed"
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 pointer-events-none rounded-2xl border border-white/5" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}

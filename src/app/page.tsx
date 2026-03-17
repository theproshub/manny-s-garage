"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CarFront,
  ChevronDown,
  Cpu,
  Hammer,
  MapPin,
  PhoneCall,
  Tv,
} from "lucide-react";
import { AnimatedCard } from "@/components/animated-card";
import { SectionHeading } from "@/components/section-heading";
import { siteImages } from "@/lib/site-images";

const heroImages = [
  "/hero/hero-handyman.png",
  "/hero/hero-handyman-grid.png",
  "/hero/hero-handyman-services.png",
  "/hero/hero-bays.png",
];

const testimonials = [
  {
    text: "They found the electrical issue my dealer couldn't. Fast, honest, and the booking system is insanely easy.",
    author: "Mark R.",
    context: "2019 F-150",
  },
  {
    text: "Best shop in Fargo. The diagnostic scan results were sent right to my phone before they did any work.",
    author: "Sarah T.",
    context: "2021 Civic",
  },
  {
    text: "Had my TV mounted and a security camera installed in one visit. Professional and left everything spotless.",
    author: "James K.",
    context: "Handyman Services",
  },
];

const faqs = [
  {
    q: "Do I need an appointment for automotive service?",
    a: "Yes. Book online or call us to schedule. We offer same-day and next-day slots when available.",
  },
  {
    q: "What's included in the DIY garage rental?",
    a: "Full access to our bay with car lift, diagnostic scanner, oil change and tire tools, air compressor, power tools, workbench, and lighting. $20/hour, up to 8 hours per session.",
  },
  {
    q: "How does handyman pricing work?",
    a: "Furniture assembly is $50 per item. TV mounting is $1.75 per inch of screen size. Security camera installation is $120 per camera. Use our quote calculator on the Handyman page for an estimate.",
  },
];

const heroSlideLabels = [
  "Handyman Services",
  "Handyman — assembly, TV, cameras & more",
  "Handyman & I.T services",
  "Our service bays",
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
    <main className="relative overflow-x-hidden">
      <div className="noise-overlay" aria-hidden />

      {/* ─── HERO ─── */}
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
              <span className="metal-text block">Manny&apos;s Garage</span>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="mt-4 flex items-center gap-3 sm:mt-5 sm:gap-4"
              >
                <span className="h-px w-8 shrink-0 bg-gradient-to-r from-orange-400/60 to-transparent sm:w-10" aria-hidden />
                <span className="text-base font-medium tracking-wide text-white/95 sm:text-lg sm:tracking-normal lg:text-xl">
                  <span className="text-orange-300">Welcome in</span>
                  <span className="text-white/90">—we&apos;re here to help.</span>
                </span>
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-6 border-l-2 border-orange-500/50 pl-4 text-[15px] leading-[1.6] text-zinc-400 sm:mt-7 sm:text-base sm:leading-[1.65]"
            >
              Fargo&apos;s go-to spot for car repairs, handyman work, equipped DIY bays—everything you need under one roof.
            </motion.p>

          </div>

          {/* Right: Image carousel — below service links on mobile */}
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
                    alt={`Manny's Garage in Fargo, ND — ${heroSlideLabels[currentSlide]}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
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

      {/* ─── SERVICE CARDS ─── */}
      <section id="services" className="relative scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-14 lg:px-8">
          <SectionHeading
            badge="What We Offer"
            title={<>Choose Your <span className="orange-glow-text">Service</span></>}
            description="From full-service auto repair to handyman installations, I.T & networking, and DIY bay rental—all under one roof."
            align="center"
          />

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:gap-6">
            <AnimatedCard
              title="Automotive Service"
              description="Professional repair and maintenance for cars and light trucks."
              imageSlides={[
                siteImages.diagnostics,
                siteImages.brakeSuspension,
                siteImages.engineMaintenance,
                siteImages.batteryCharging,
              ]}
              icon={<CarFront className="h-6 w-6" />}
              tag="AUTO"
              href="/auto"
              delay={0.1}
            />
            <AnimatedCard
              title="Handyman Services"
              description="Home installation services including TV mounting, security cameras, and furniture assembly."
              imageSlides={[
                siteImages.handymanTv,
                siteImages.handymanFurniture,
                siteImages.handymanCameras,
              ]}
              icon={<Tv className="h-6 w-6" />}
              tag="HOME"
              href="/handyman"
              delay={0.2}
            />
            <AnimatedCard
              title="DIY Garage"
              description="Rent a fully equipped garage space and work on your own vehicle."
              imageSlides={[siteImages.diyGarage]}
              icon={<Hammer className="h-6 w-6" />}
              tag="RENTAL"
              href="/diy-garage"
              delay={0.3}
            />
            <AnimatedCard
              title="I.T Consultant"
              description="Network setup, PC builds, data recovery, and smart home integration."
              imageSlides={[siteImages.itConsultant]}
              icon={<Cpu className="h-6 w-6" />}
              tag="I.T"
              href="/it"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          badge="Testimonials"
          title="What Our Customers Say"
          align="center"
        />
        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm"
            >
              <p className="text-zinc-300 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <footer className="mt-4 flex items-center gap-2">
                <span className="font-semibold text-white">{t.author}</span>
                <span className="text-zinc-500">·</span>
                <span className="text-sm text-zinc-500">{t.context}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="relative mx-auto max-w-3xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24 sm:scroll-mt-28 lg:px-8 lg:scroll-mt-32">
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
      <section id="contact" className="relative mx-auto max-w-7xl scroll-mt-24 px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24 sm:scroll-mt-28 lg:px-8 lg:scroll-mt-32">
        <SectionHeading
          badge="Contact"
          title="Visit or Get in Touch"
          description="We're here to help. Call, email, or stop by our facility."
          align="center"
        />
        <div className="mt-8 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm sm:p-8"
          >
            <p className="text-lg font-semibold text-white sm:text-xl">
              One tap to <span className="orange-glow-text">call</span>, <span className="text-cyan-400">email</span>, or <span className="text-orange-400">get directions</span>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="tel:+17015550142"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-sm font-semibold text-cyan-300 transition-all hover:border-cyan-400/50 hover:bg-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                <PhoneCall className="h-4 w-4" />
                Call
              </a>
              <a
                href="mailto:service@mannysgarage.com"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/90 transition-all hover:border-white/35 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Email
              </a>
              <a
                href="https://maps.apple.com/maps?q=1335+Main+Ave+S+Fargo+ND+58103"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-2.5 text-sm font-semibold text-orange-300 transition-all hover:border-orange-400/50 hover:bg-orange-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
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

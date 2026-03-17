"use client";

import { useState } from "react";
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
import { ChatAssistant } from "@/components/chat-assistant";
import { SectionHeading } from "@/components/section-heading";
import { BackToHome } from "@/components/back-to-home";
import { siteImages } from "@/lib/site-images";

const autoServices = [
  {
    title: "Diagnostics & Check Engine",
    description: "Fast fault scanning and real answers on what is wrong before you spend money on parts.",
    icon: Gauge,
    img: siteImages.diagnostics,
    stat: "Same-day results",
  },
  {
    title: "Brake & Suspension Repair",
    description: "Confident stopping power, smoother steering, and dependable handling for Fargo roads.",
    icon: ShieldCheck,
    img: siteImages.brakeSuspension,
    stat: "OEM-quality parts",
  },
  {
    title: "Engine, Tune-Ups & Maintenance",
    description: "Oil changes, tune-ups, belts, filters, and long-term care that keeps your car on schedule.",
    icon: Wrench,
    img: siteImages.engineMaintenance,
    stat: "Full-spectrum care",
  },
  {
    title: "Battery, Starter & Charging",
    description: "No-start problems solved quickly with battery testing and electrical system service.",
    icon: BatteryCharging,
    img: siteImages.batteryCharging,
    stat: "90-min turnaround",
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

function scrollToAutoCta() {
  document.getElementById("auto-cta")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function AutoPage() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="relative overflow-x-hidden pt-6 sm:pt-10">
      <div className="noise-overlay" aria-hidden />

      {/* ─── HERO ─── */}
      <section id="auto-hero" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 sm:mb-20 lg:mb-28">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-black shadow-2xl shadow-black/40 ring-1 ring-white/[0.06] sm:rounded-[2rem] lg:rounded-[3rem]">
          <div className="absolute inset-0 hidden sm:block">
            <Image
              src={siteImages.garageHero}
              alt="Manny's Garage — automotive service"
              fill
              className="object-cover opacity-55"
              priority
              sizes="(max-width: 1024px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent lg:from-black/75 lg:via-black/40" />
          </div>
          <div className="absolute inset-0 bg-black/90 sm:hidden" aria-hidden />

          <div className="relative z-10 p-5 sm:p-12 lg:p-20 grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14">
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="flex flex-col h-full"
              >
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <BackToHome />
                  <span className="premium-badge badge-orange orbitron inline-flex text-[10px] tracking-[0.2em]">
                    AUTOMOTIVE SERVICES
                  </span>
                </div>
                <h1 className="mt-5 sm:mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                  Expert <span className="metal-text">Auto Care.</span>
                </h1>
                <p className="mt-3 sm:mt-4 text-base text-zinc-400 leading-relaxed max-w-lg sm:text-lg">
                  From routine maintenance to complex engine diagnostics. We combine decades of hands-on experience with modern diagnostic tools to get you back on the road safely.
                </p>
                <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
                  <Link href="/book?service=automotive" className="btn-primary group min-touch inline-flex items-center gap-2">
                    Book Automotive Service
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <button onClick={() => setAssistantOpen(true)} className="btn-outline min-touch">
                    Quick chat booking
                  </button>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
              className="relative flex flex-col justify-center"
            >
              <div className="relative h-[240px] sm:h-[320px] lg:h-[380px] w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl sm:rounded-2xl bg-black/40">
                <Image src={siteImages.diagnostics} alt="Diagnostics and auto care" fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
                <div className="img-overlay" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="text-xs font-medium uppercase tracking-wider text-white/90">Diagnostics & check engine</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-6 flex justify-center lg:justify-start"
          aria-hidden
        >
          <a href="#services" className="hero-scroll-hint flex flex-col items-center gap-1 text-zinc-500 transition-colors hover:text-zinc-400">
            <span className="text-[10px] font-medium uppercase tracking-widest">See services</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </a>
        </motion.div>
      </section>

      {/* ─── SERVICES GRID ─── */}
      <section id="services" className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8 scroll-mt-20">
        <SectionHeading
          badge="Our Capabilities"
          title={<>Full-Spectrum <span className="orange-glow-text">Auto Care</span></>}
          description="From complex electrical diagnostics to routine maintenance, our facility is equipped to handle modern automotive challenges."
        />

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
          {autoServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="panel-strong group relative overflow-hidden rounded-2xl border border-white/[0.08] transition-all duration-300 hover:border-orange-500/25 hover:shadow-xl hover:shadow-orange-900/10 sm:rounded-[2rem]"
              >
                <button
                  type="button"
                  onClick={scrollToAutoCta}
                  className="w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-2xl sm:rounded-[2rem]"
                  aria-describedby="auto-cta"
                >
                  <div className="relative h-36 sm:h-44 w-full overflow-hidden pointer-events-none">
                    <Image src={service.img} alt={service.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 50vw" />
                    <div className="img-overlay" />
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 cyber-badge text-[10px] sm:text-xs">{service.stat}</div>
                    <span className="absolute bottom-3 right-3 text-xs font-medium text-white/80 group-hover:text-orange-400 transition-colors">
                      Get quote →
                    </span>
                  </div>
                  <div className="relative p-5 sm:p-7 z-10 -mt-6 sm:-mt-8">
                    <div className="mb-3 inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-orange-500/20 ring-1 ring-orange-500/40 backdrop-blur-xl text-orange-400">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mt-2 group-hover:text-orange-400 transition-colors">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{service.description}</p>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── REVIEWS / TRUST ─── */}
      <section className="relative border-y border-white/10 bg-black/40 py-16 sm:py-24 backdrop-blur-md">
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
              className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm"
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
      <section id="auto-cta" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm px-6 py-12 sm:rounded-[2rem] sm:px-10 sm:py-16 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-3 sm:mb-4 sm:text-4xl">Ready to fix your car?</h2>
            <p className="text-zinc-400 mb-6 sm:mb-8 text-base sm:text-lg max-w-xl mx-auto">
              Chat with Manny to describe your symptoms. We&apos;ll match you with the right service and get you scheduled.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button onClick={() => setAssistantOpen(true)} className="btn-primary min-touch inline-flex items-center gap-2">
                Start Diagnostic Intake <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/book?service=automotive" className="btn-outline min-touch inline-flex items-center gap-2">
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

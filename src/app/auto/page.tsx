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
  Star,
  ThermometerSnowflake,
  Cog,
  Zap,
  CircleDot,
  Droplets,
  Fuel,
  ClipboardCheck,
  Flame,
  Wind,
  Car,
  Lightbulb,
  RotateCw,
  Filter,
  Package,
  CloudRain,
} from "lucide-react";
import { ChatAssistant } from "@/components/chat-assistant";
import { SectionHeading } from "@/components/section-heading";

const AUTO_SERVICES_BASE = "/auto/services";

/** Core services with detail pages; most essential first */
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

/** Additional repair services we offer */
const moreRepairServices = [
  { title: "Tires & alignment", icon: CircleDot, short: "Rotation, balance, alignment, tire replacement." },
  { title: "A/C & heating", icon: ThermometerSnowflake, short: "Recharge, leaks, cabin heat and defrost." },
  { title: "Transmission", icon: Cog, short: "Fluid service, diagnostics, and repair." },
  { title: "Electrical", icon: Zap, short: "Lighting, fuses, wiring, and accessory issues." },
  { title: "Cooling system", icon: Droplets, short: "Radiator, hoses, thermostat, coolant flush." },
  { title: "Exhaust & muffler", icon: Flame, short: "Exhaust repair, muffler, catalytic converter." },
  { title: "Fuel system", icon: Fuel, short: "Fuel pump, injectors, tank, fuel lines." },
  { title: "Fluid flushes", icon: Droplets, short: "Coolant, power steering, brake, transmission flush." },
  { title: "Pre-purchase & state inspection", icon: ClipboardCheck, short: "Used car inspection, state safety/emissions." },
  { title: "Engine repair", icon: Car, short: "Overheating, noise, performance, major repairs." },
  { title: "Belts & hoses", icon: Wind, short: "Serpentine belt, timing belt, hose replacement." },
  { title: "Steering & power steering", icon: RotateCw, short: "Power steering fluid, pump, tie rods, steering rack." },
  { title: "Headlights & bulbs", icon: Lightbulb, short: "Headlight restoration, bulb replacement, LED upgrades." },
  { title: "Wipers & blades", icon: CloudRain, short: "Wiper blade replacement, arm repair, fluid." },
  { title: "Cabin & engine air filters", icon: Filter, short: "Replace cabin and engine air filters for clean air and performance." },
  { title: "Differential & transfer case", icon: Package, short: "Fluid service and repair for differential and 4WD transfer case." },
  { title: "Tire repair & flat fix", icon: CircleDot, short: "Puncture repair, plug, patch, and tire R&R." },
  { title: "Oil leak diagnosis", icon: Droplets, short: "Find and fix oil leaks—gaskets, seals, and worn parts." },
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

      {/* ─── AUTO REPAIR SERVICES LIST ─── */}
      <section id="services" className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8 scroll-mt-28">
        <SectionHeading
          badge="What we offer"
          title={<>Auto <span className="orange-glow-text">Repair Services</span></>}
          description="Full list of automotive repair services we offer."
          align="center"
        />

        {/* All repair services: two columns side by side */}
        {(() => {
          const allServices = [
            ...autoServices.map((s) => ({ ...s, key: s.id, popular: s.popular })),
            ...moreRepairServices.map((s) => ({ ...s, key: s.title, popular: false })),
          ];
          const mid = Math.ceil(allServices.length / 2);
          const leftCol = allServices.slice(0, mid);
          const rightCol = allServices.slice(mid);
          const renderItem = (
            item: typeof allServices[0],
            i: number
          ) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-24px" }}
                transition={{ delay: i * 0.03, duration: 0.35 }}
                className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-black/30 py-4 px-4 sm:py-4 sm:px-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/15 text-orange-400">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-white">{item.title}</span>
                    {item.popular && (
                      <span className="rounded-full bg-orange-500/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-orange-300 ring-1 ring-orange-400/30">
                        Popular
                      </span>
                    )}
                  </span>
                  <p className="text-sm text-zinc-500 mt-1 leading-snug">{item.short}</p>
                </div>
              </motion.div>
            );
          };
          return (
            <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:gap-x-12 lg:gap-y-6">
              <div className="flex flex-col gap-5 lg:gap-6">
                {leftCol.map((item, i) => renderItem(item, i))}
              </div>
              <div className="flex flex-col gap-5 lg:gap-6">
                {rightCol.map((item, i) => renderItem(item, i + leftCol.length))}
              </div>
            </div>
          );
        })()}

        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link
            href="/book?service=automotive"
            className="btn-primary group inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 py-3 text-base font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            Book now
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
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

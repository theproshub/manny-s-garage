"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpFromLine,
  Check,
  ChevronDown,
  Droplets,
  Gauge,
  Layout,
  MapPin,
  UserCog,
  Wind,
  Wrench,
  Zap,
  CarFront,
} from "lucide-react";
import { BackToHome } from "@/components/back-to-home";
import { ServiceStandardsSection } from "@/components/service-standards-section";
import { SQUARE_BOOKING_URL } from "@/lib/fixed-quote-options";
import { siteImages } from "@/lib/site-images";

const HOURLY_RATE = 20;
const MAX_HOURS = 8;
const MECHANIC_RATE_PER_HOUR = 40;

const equipment = [
  { name: "Car lift", icon: ArrowUpFromLine },
  { name: "Diagnostic scanner", icon: Gauge },
  { name: "Oil change tools", icon: Droplets },
  { name: "Tire tools", icon: CarFront },
  { name: "Air compressor", icon: Wind },
  { name: "Power tools", icon: Zap },
  { name: "Workbench and lighting", icon: Layout },
];

const bayIncludes = [
  "Full access to the bay for the duration of your booking",
  "Car lift, diagnostic scanner, oil change and tire equipment",
  "Air compressor, power tools, workbench, and lighting",
  "Up to 8 hours per session; multi-session bookings available",
];

const mechanicIncludes = [
  "Professional mechanic on hand for guidance or hands-on help",
  "Diagnostics, repairs, or supervision at your pace",
  "Billed in addition to bay rental; book in 1-hour increments",
  "Ideal for complex jobs or when you want an expert alongside",
];

export default function DIYGarageServicesPage() {
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
                DIY BAY · SERVICES & PRICING
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-[2rem] font-bold leading-[1.2] tracking-tight min-[375px]:text-[2.5rem] sm:text-4xl sm:leading-[1.18] lg:text-[3rem] lg:leading-[1.15] xl:text-5xl"
            >
              <span className="metal-text block">DIY Bay Pricing</span>
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
                  <span className="text-orange-300">$20/hr bay rental</span>
                  <span className="text-white/90">—optional mechanic assistance.</span>
                </span>
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-6 border-l-2 border-orange-500/50 pl-4 text-[15px] leading-[1.6] text-zinc-400 sm:mt-7 sm:text-base sm:leading-[1.65]"
            >
              Clear pricing for bay rental and mechanic add-on. See what’s included, then book your time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7"
            >
              <Link
                href={SQUARE_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
 className="btn-primary inline-flex items-center justify-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Book DIY bay
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
              <Link
                href="/quote?for=diy"
 className="btn-outline inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Fixed pricing
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
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/[0.09] bg-black shadow-2xl shadow-black/40 ring-1 ring-white/[0.06] lg:aspect-[16/10]">
              <Image
                src={siteImages.diyGarage}
                alt="DIY garage bay with lift and equipment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
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
            href="#bay-rental"
            className="hero-scroll-hint flex flex-col items-center gap-1.5 text-zinc-500 transition-colors hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-md"
            aria-label="Scroll to services"
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest">See details</span>
            <ChevronDown className="h-5 w-5 shrink-0 animate-bounce" aria-hidden />
          </a>
        </motion.div>
      </section>

      {/* Bay Rental */}
      <section id="bay-rental" className="relative mx-auto max-w-7xl scroll-mt-28 px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black/40"
          >
            <Image
              src={siteImages.diyGarage}
              alt="DIY garage bay with lift and equipment"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <div className="rounded-xl bg-orange-500/20 p-2.5 text-orange-400 ring-1 ring-orange-400/30">
                <Wrench className="h-6 w-6" />
              </div>
              <span className="font-bold text-white text-lg">Bay Rental</span>
            </div>
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Bay Rental</h2>
            <p className="mt-3 text-zinc-400 leading-relaxed">
              Work on your own vehicle in a fully equipped bay with professional tools and a car lift. Perfect for oil changes, brakes, diagnostics, and more.
            </p>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Pricing</p>
              <p className="mt-2 text-3xl font-bold text-orange-400">${HOURLY_RATE} <span className="text-lg font-normal text-zinc-400">per hour</span></p>
              <p className="mt-2 text-sm text-zinc-400">Minimum 1 hour. Max {MAX_HOURS} hours per session. All equipment included.</p>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-zinc-400">
              {bayIncludes.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 text-orange-400 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={SQUARE_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
 className="btn-primary group mt-8 inline-flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Book bay time
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Mechanic assistance */}
      <section id="mechanic-assistance" className="relative border-y border-white/10 bg-black/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Mechanic Assistance</h2>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Add a professional mechanic to your bay session for guidance, hands-on help, or full repair assistance. Billed per hour in addition to bay rental.
              </p>
              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Pricing</p>
                <p className="mt-2 text-3xl font-bold text-orange-400">${MECHANIC_RATE_PER_HOUR} <span className="text-lg font-normal text-zinc-400">per hour</span></p>
                <p className="mt-2 text-sm text-zinc-400">Optional. Book your bay first, then add mechanic hours when you schedule or at the shop.</p>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-zinc-400">
                {mechanicIncludes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-4 w-4 shrink-0 text-orange-400 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={SQUARE_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
 className="btn-primary group mt-8 inline-flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Book bay + mechanic
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-12"
            >
              <div className="rounded-2xl bg-orange-500/15 p-8 text-orange-400 ring-1 ring-orange-400/30">
                <UserCog className="h-16 w-16" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section id="equipment" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl mb-6">Included Equipment</h2>
        <p className="text-zinc-400 max-w-2xl mb-10">
          Every bay rental includes access to the following. No extra fees for tool use.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/40 px-5 py-4"
              >
                <div className="rounded-lg bg-orange-500/15 p-2.5 text-orange-400">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-white">{item.name}</span>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-10">
          <Link
            href={SQUARE_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
 className="btn-outline inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            Book DIY Bay
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </section>

      <ServiceStandardsSection variant="diy" />

      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/[0.08] bg-black/40 shadow-xl shadow-black/20 backdrop-blur-sm p-6 sm:p-8">
          <div>
            <h2 className="text-xl font-bold text-white">Need a custom session?</h2>
            <p className="mt-1 text-zinc-400">Book DIY and add your preferred hours and mechanic time in the notes.</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              href={SQUARE_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
 className="btn-primary group inline-flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Book DIY Garage
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link
              href="/diy-garage"
 className="btn-outline inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Back to DIY Garage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

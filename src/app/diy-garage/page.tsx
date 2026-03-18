"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, MapPin } from "lucide-react";
import { BackToHome } from "@/components/back-to-home";
import { siteImages } from "@/lib/site-images";

const HOURLY_RATE = 20;
const MAX_HOURS = 8;
const MECHANIC_RATE_PER_HOUR = 40;

export default function DIYGaragePage() {
  const [hours, setHours] = useState(2);
  const [mechanicHours, setMechanicHours] = useState(0);

  const estimate = useMemo(() => {
    const validHours = Math.max(1, Math.min(MAX_HOURS, hours));
    const garageTotal = validHours * HOURLY_RATE;
    const mechanicTotal = mechanicHours * MECHANIC_RATE_PER_HOUR;
    return {
      garageTotal,
      mechanicTotal,
      total: garageTotal + mechanicTotal,
      validHours,
    };
  }, [hours, mechanicHours]);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="noise-overlay" aria-hidden />

      {/* Hero */}
      <section className="relative flex min-h-[85vh] flex-col pb-14 sm:min-h-[88vh] sm:pb-16 lg:min-h-[88vh] lg:pb-8">
        <div className="hero-bg-gradient" aria-hidden />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pt-0 pb-10 sm:px-6 sm:pt-2 sm:pb-16 lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14 lg:px-8 lg:pt-4 lg:pb-20 xl:gap-20">
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
                DIY BAY
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-[2rem] font-bold leading-[1.2] tracking-tight min-[375px]:text-[2.5rem] sm:text-4xl sm:leading-[1.18] lg:text-[3rem] lg:leading-[1.15] xl:text-5xl"
            >
              <span className="metal-text block">DIY Garage</span>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="mt-4 flex items-center gap-3 sm:mt-5 sm:gap-4"
              >
                <span className="h-px w-8 shrink-0 bg-gradient-to-r from-orange-400/60 to-transparent sm:w-10" aria-hidden />
                <span className="text-base font-medium tracking-wide text-white/95 sm:text-lg sm:tracking-normal lg:text-xl">
                  <span className="text-orange-300">$20/hr</span>
                  <span className="text-white/90">—lift, tools, and bay. Optional mechanic add-on.</span>
                </span>
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-6 border-l-2 border-orange-500/50 pl-4 text-[15px] leading-[1.6] text-zinc-400 sm:mt-7 sm:text-base sm:leading-[1.65]"
            >
              Rent a fully equipped bay by the hour. Lift, scanner, oil/tire tools, compressor, workbench included. Optional mechanic help: $40/hr.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7"
            >
              <a
                href="#quote"
                className="btn-primary inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
              >
                <Calculator className="h-4 w-4 shrink-0" aria-hidden />
                Get quote
              </a>
              <Link
                href="/book?service=diy"
                className="btn-outline min-h-[44px] inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] px-6 py-3 text-sm font-semibold text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
              >
                Book directly
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
            </motion.div>
          </div>

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
            href="#quote"
            className="hero-scroll-hint flex flex-col items-center gap-1.5 text-zinc-500 transition-colors hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-md"
            aria-label="Scroll to quote"
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest">Get quote</span>
          </a>
        </motion.div>
      </section>

      {/* Pricing + Quote — single section */}
      <section id="quote" className="relative scroll-mt-28 border-t border-white/[0.06] bg-black/30 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-bold text-white sm:text-2xl">
            Pricing &amp; estimate
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-500">
            $20/hr bay · up to 8 hours. Optional mechanic: $40/hr.
          </p>

          <div className="mt-8 rounded-2xl border border-white/[0.08] bg-black/40 p-6 shadow-xl shadow-black/20 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="hours" className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Hours (1–{MAX_HOURS})
                </label>
                <input
                  id="hours"
                  type="number"
                  min={1}
                  max={MAX_HOURS}
                  value={hours}
                  onChange={(e) =>
                    setHours(Math.max(1, Math.min(MAX_HOURS, parseInt(e.target.value, 10) || 1)))
                  }
                  className="focus-ring w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white min-h-[44px]"
                />
              </div>
              <div>
                <label htmlFor="mechanic" className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Mechanic add-on (hrs)
                </label>
                <input
                  id="mechanic"
                  type="number"
                  min={0}
                  max={MAX_HOURS}
                  value={mechanicHours}
                  onChange={(e) =>
                    setMechanicHours(Math.max(0, Math.min(MAX_HOURS, parseInt(e.target.value, 10) || 0)))
                  }
                  className="focus-ring w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white min-h-[44px]"
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between rounded-xl border border-orange-400/30 bg-orange-500/10 px-5 py-4">
              <span className="text-sm font-medium text-orange-200">Estimated total</span>
              <span className="text-2xl font-bold text-white">${estimate.total}</span>
            </div>
            <Link
              href={`/book?service=diy&estimate=${encodeURIComponent(estimate.total.toString())}&hours=${estimate.validHours}&mechanicHours=${mechanicHours}`}
              className="btn-primary group mt-6 w-full min-h-[44px] justify-center inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg shadow-orange-950/25 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
            >
              Book garage time
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>

          <p className="mt-6 text-center text-xs text-zinc-500">
            <Link href="/diy-garage/services" className="text-orange-400 hover:underline">
              Full equipment list &amp; details
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

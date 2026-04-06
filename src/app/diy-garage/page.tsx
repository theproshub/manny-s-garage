"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { JsonLd } from "@/components/json-ld";
import { diyGarageSchema } from "@/lib/schema";
import { ArrowRight, MapPin, Tag } from "lucide-react";
import { BackToHome } from "@/components/back-to-home";
import { ServiceStandardsSection } from "@/components/service-standards-section";
import { siteImages } from "@/lib/site-images";
import { DIY_HOURLY, DIY_MECHANIC_HOURLY, DIY_MAX_HOURS, SQUARE_BOOKING_URL } from "@/lib/fixed-quote-options";

export default function DIYGaragePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <JsonLd data={diyGarageSchema()} />
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
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-[2rem] font-bold leading-[1.2] tracking-tight min-[375px]:text-[2.5rem] sm:text-4xl sm:leading-[1.18] lg:text-[3rem] lg:leading-[1.15] xl:text-5xl"
            >
              <span className="metal-text block">DIY Garage</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-5 text-[15px] leading-[1.6] text-zinc-300 sm:mt-6 sm:text-base sm:leading-[1.7]"
            >
              {`Rent a bay with a lift, tools, and air — $${DIY_HOURLY}/hr. Add a mechanic for $${DIY_MECHANIC_HOURLY}/hr if you want help. Up to ${DIY_MAX_HOURS} hours per session.`}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7"
            >
              <Link
                href="/quote?for=diy"
 className="btn-primary inline-flex items-center justify-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                <Tag className="h-4 w-4 shrink-0" aria-hidden />
                See Pricing
              </Link>
              <Link
                href={SQUARE_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
 className="btn-outline inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Book Directly
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
      </section>

      <section id="quote" className="relative scroll-mt-28 border-t border-white/[0.06] bg-black/30 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-white sm:text-2xl">Fixed Bay Packages</h2>
          <p className="mt-2 text-sm text-zinc-500">
            {`$${DIY_HOURLY}/hr bay · $${DIY_MECHANIC_HOURLY}/hr mechanic · tap a total, then complete booking.`}
          </p>
          <Link
            href="/quote?for=diy"
            className="btn-primary group mt-8 inline-flex items-center justify-center gap-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            Choose Your Price
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <p className="mt-6 text-xs text-zinc-500">
            <Link href="/diy-garage/services" className="text-orange-400 hover:underline">
              Full equipment list &amp; details
            </Link>
          </p>
        </div>
      </section>

      <ServiceStandardsSection variant="diy" />
    </main>
  );
}

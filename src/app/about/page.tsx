"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, PhoneCall, Clock, ArrowRight, ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import Link from "next/link";
import { BackToHome } from "@/components/back-to-home";
import { siteImages } from "@/lib/site-images";

export default function AboutPage() {
  return (
    <main className="relative overflow-x-hidden">
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
                ABOUT US
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-[2rem] font-bold leading-[1.2] tracking-tight min-[375px]:text-[2.5rem] sm:text-4xl sm:leading-[1.18] lg:text-[3rem] lg:leading-[1.15] xl:text-5xl"
            >
              <span className="metal-text block">Built Around People</span>
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
                  <span className="text-orange-300">Clear communication</span>
                  <span className="text-white/90">—real answers, quality work, and fair pricing.</span>
                </span>
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-6 border-l-2 border-orange-500/50 pl-4 text-[15px] leading-[1.6] text-zinc-400 sm:mt-7 sm:text-base sm:leading-[1.65]"
            >
              Car and home service should feel simple and honest. We built Manny&apos;s Garage so you always know what&apos;s happening, what it costs, and what comes next.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7"
            >
              <Link
                href="/book"
 className="btn-primary inline-flex items-center justify-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Schedule Appointment
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
              <a
                href="#facility"
 className="btn-outline inline-flex items-center gap-2 rounded-full border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Our Story
              </a>
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
                src={siteImages.teamAbout}
                alt="Team at Manny's Garage"
                fill
                className="object-cover opacity-90"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" aria-hidden />
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
            href="#facility"
            className="hero-scroll-hint flex flex-col items-center gap-1.5 text-zinc-500 transition-colors hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-md"
            aria-label="Scroll to our story"
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest">Learn more</span>
            <ChevronDown className="h-5 w-5 shrink-0 animate-bounce" aria-hidden />
          </a>
        </motion.div>
      </section>

      {/* ─── STORY & VALUES ─── */}
      <section id="facility" className="relative mx-auto max-w-7xl scroll-mt-28 px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
             <SectionHeading badge="Our Story" title="Built on Trust" />
             <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
               Too many shops leave people in the dark. You drop something off, wait, and hope the final bill makes sense. We started Manny&apos;s Garage to do it differently.
             </p>
             <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
               Every service we do, from network work to full engine diagnostics, is explained in plain language with clear pricing. You can book quickly online, then talk to a real person who makes sure the job is done right.
             </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
             {[
               { title: "Skilled Team", text: "Experienced pros who treat your car and home with care and respect." },
               { title: "Clear Pricing", text: "Straightforward quotes and updates before work begins." },
               { title: "Dependable Process", text: "Fast booking, organized service, and quality work you can count on." },
               { title: "Real Communication", text: "Direct contact with our team when you need answers." }
             ].map((v, i) => (
               <motion.div
                 key={v.title}
                 initial={{ opacity: 0, y: 12 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.06 }}
                 className="rounded-xl border border-white/[0.08] bg-black/40 p-4 sm:p-5"
               >
                 <h3 className="orbitron text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">{v.title}</h3>
                 <p className="text-sm text-zinc-400 leading-relaxed">{v.text}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT INFO ─── */}
      <section id="contact" className="relative scroll-mt-28 border-y border-white/[0.06] bg-black/30 py-14 sm:py-20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <SectionHeading badge="Contact" title="Location & Hours" align="center" />
           <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 max-w-4xl mx-auto">
             <div className="flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-black/40">
                <MapPin className="h-6 w-6 text-orange-400 mb-3" />
                <h3 className="text-base font-bold text-white mb-1">Address</h3>
                <p className="text-sm text-zinc-400">1335 Main Ave S<br/>Fargo, ND 58103</p>
             </div>
             <div className="flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-black/40">
                <Clock className="h-6 w-6 text-orange-400 mb-3" />
                <h3 className="text-base font-bold text-white mb-1">Hours</h3>
                <p className="text-sm text-zinc-400">Mon–Fri: 8am–6pm<br/>Sat: 9am–3pm</p>
             </div>
             <div className="flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-black/40">
                <PhoneCall className="h-6 w-6 text-orange-400 mb-3" />
                <h3 className="text-base font-bold text-white mb-1">Contact</h3>
                <p className="text-sm text-zinc-400">(701) 555-0142<br/><a href="mailto:service@mannysgarage.com" className="text-orange-400 hover:underline">service@mannysgarage.com</a></p>
             </div>
           </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 text-center">
        <h2 className="mb-4 text-xl font-bold text-white sm:text-2xl">We&apos;re ready when you are.</h2>
        <Link
          href="/book"
          className="btn-primary inline-flex items-center justify-center gap-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          Schedule Appointment <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

    </main>
  );
}

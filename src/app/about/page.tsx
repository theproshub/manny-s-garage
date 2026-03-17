"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, PhoneCall, Mail, Clock, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import Link from "next/link";
import { BackToHome } from "@/components/back-to-home";
import { siteImages } from "@/lib/site-images";

export default function AboutPage() {
  return (
    <main className="relative overflow-x-hidden pt-6 sm:pt-10">
      <div className="noise-overlay" aria-hidden />

      {/* ─── HERO ─── */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 lg:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <BackToHome />
            <span className="premium-badge badge-orange orbitron text-[10px] tracking-[0.15em]">
              ABOUT US
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            A New Standard of <span className="metal-text">Care.</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-400 sm:text-base">
            Service shouldn&apos;t be a black box. We combine expertise with total transparency.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative w-full mt-6 sm:mt-8 rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.08] hidden sm:block sm:h-[320px] lg:h-[380px]"
        >
          <Image src={siteImages.teamAbout} alt="Team at Manny's Garage" fill className="object-cover opacity-85" sizes="(max-width: 1280px) 100vw, 1280px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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
               For years, the service industry—whether it's auto repair or home I.T—has relied on information asymmetry. You break it, they fix it, and you get a bill with no context. We designed Manny&apos;s Garage to be different.
             </p>
             <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
               Every service we perform, from a localized network drop to a full engine diagnostic, is documented, explained, and transparently priced. We leverage an AI intake system to speed up routing so our elite technicians spend their time working, not answering phones.
             </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
             {[
               { title: "Elite Talent", text: "Vetted professionals who master their domain before they touch your property." },
               { title: "Total Transparency", text: "Detailed reports and guaranteed quotes before work begins." },
               { title: "Next-Gen Tech", text: "Booking engine to in-bay diagnostics—we invest in speed and accuracy." },
               { title: "Direct Contact", text: "Automated updates and an open line to the owners." }
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
         <h2 className="text-xl font-bold text-white sm:text-2xl mb-4">Experience the difference.</h2>
         <Link href="/book" className="btn-primary inline-flex items-center gap-2 min-h-[44px] px-5 py-3 rounded-full text-sm font-bold">
            Schedule Appointment <ArrowRight className="h-4 w-4" />
         </Link>
      </section>

    </main>
  );
}

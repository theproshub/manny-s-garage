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
    <main className="relative overflow-x-hidden pt-10">
      <div className="noise-overlay" aria-hidden />

      {/* ─── HERO ─── */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20 lg:mb-32">
        <div className="text-center max-w-3xl mx-auto pt-12 pb-8">
           <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
           >
             <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-5">
               <BackToHome />
               <span className="premium-badge badge-orange orbitron inline-flex text-[10px] tracking-[0.2em]">
                 COMPANY OVERVIEW
               </span>
             </div>
             <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl pb-4">
               A New Standard of <span className="metal-text">Care.</span>
             </h1>
             <p className="text-lg text-zinc-400 leading-relaxed">
               Manny&apos;s Garage was built on a simple premise: service shouldn&apos;t be a black box. We combine elite technical expertise with total transparency.
             </p>
           </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full rounded-[2rem] overflow-hidden border border-white/10 hidden sm:block sm:h-[500px]"
        >
          <Image src={siteImages.teamAbout} alt="Friendly team at Manny's Garage" fill className="object-cover opacity-80" sizes="(max-width: 1280px) 100vw, 1280px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </motion.div>
      </section>

      {/* ─── STORY & VALUES ─── */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
             <SectionHeading badge="Our Story" title="Built on Trust" />
             <p className="text-zinc-400 text-lg leading-relaxed">
               For years, the service industry—whether it's auto repair or home IT—has relied on information asymmetry. You break it, they fix it, and you get a bill with no context. We designed Manny&apos;s Garage to be different.
             </p>
             <p className="text-zinc-400 text-lg leading-relaxed">
               Every service we perform, from a localized network drop to a full engine diagnostic, is documented, explained, and transparently priced. We leverage an AI intake system to speed up routing so our elite technicians spend their time working, not answering phones.
             </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
             {[
               { title: "Elite Talent", text: "Vetted professionals who master their specific domain before they ever touch your property." },
               { title: "Total Transparency", text: "Detailed diagnostic reports and guaranteed quotes before the work begins." },
               { title: "Next-Gen Tech", text: "From our booking engine to our in-bay diagnostic tools, we invest in speed and accuracy." },
               { title: "Direct Contact", text: "You get automated text updates, and an open line directly to the owners." }
             ].map((v, i) => (
               <motion.div
                 key={v.title}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="panel-cyber rounded-2xl p-6"
               >
                 <h3 className="orbitron text-sm font-bold uppercase tracking-widest text-orange-400 mb-3">{v.title}</h3>
                 <p className="text-sm text-zinc-400">{v.text}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT INFO ─── */}
      <section id="contact" className="relative border-y border-white/5 bg-black/40 py-24 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <SectionHeading badge="Operations" title="Contact & Location" align="center" />
           
           <div className="grid lg:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
             <div className="flex flex-col items-center text-center p-8 rounded-3xl border border-white/5 bg-white/5">
                <MapPin className="h-8 w-8 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Headquarters</h3>
                <p className="text-zinc-400">1335 Main Ave S<br/>Fargo, ND 58103</p>
             </div>

             <div className="flex flex-col items-center text-center p-8 rounded-3xl border border-white/5 bg-white/5">
                <Clock className="h-8 w-8 text-orange-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Operating Hours</h3>
                <p className="text-zinc-400">Monday - Friday: 8am - 6pm<br/>Saturday: 9am - 3pm</p>
             </div>

             <div className="flex flex-col items-center text-center p-8 rounded-3xl border border-white/5 bg-white/5">
                <PhoneCall className="h-8 w-8 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Direct Line</h3>
                <p className="text-zinc-400">(701) 555-0142<br/>service@mannysgarage.com</p>
             </div>
           </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8 text-center">
         <h2 className="text-3xl font-bold text-white mb-6">Experience the difference.</h2>
         <Link href="/book" className="btn-primary">
            Schedule Appointment <ArrowRight className="ml-2 h-4 w-4" />
         </Link>
      </section>

    </main>
  );
}

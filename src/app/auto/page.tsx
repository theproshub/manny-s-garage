"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CarFront,
  CheckCircle2,
  Gauge,
  PhoneCall,
  ShieldCheck,
  Wrench,
  BatteryCharging,
  Star
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
    img: siteImages.garageHero,
    stat: "OEM-quality parts",
  },
  {
    title: "Engine, Tune-Ups & Maintenance",
    description: "Oil changes, tune-ups, belts, filters, and long-term care that keeps your car on schedule.",
    icon: Wrench,
    img: siteImages.garageHero,
    stat: "Full-spectrum care",
  },
  {
    title: "Battery, Starter & Charging",
    description: "No-start problems solved quickly with battery testing and electrical system service.",
    icon: BatteryCharging,
    img: siteImages.diagnostics,
    stat: "90-min turnaround",
  },
];

const testimonials = [
  { text: "They found the electrical issue my dealer couldn't. Fast, honest, and the booking system is insanely easy.", author: "Mark R.", vehicle: "2019 F-150" },
  { text: "Best shop in Fargo. The diagnostic scan results were sent right to my phone before they did any work.", author: "Sarah T.", vehicle: "2021 Civic" }
];

export default function AutoPage() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <main className="relative overflow-x-hidden pt-10">
      
      {/* ─── HERO ─── */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20 lg:mb-32">
        <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-black shadow-2xl shadow-cyan-900/20 lg:rounded-[3rem]">
          <div className="absolute inset-0">
            <Image
              src={siteImages.garageHero}
              alt="Manny's Garage — automotive service"
              fill
              className="object-cover opacity-60"
            />
          </div>

          <div className="relative z-10 p-8 sm:p-14 lg:p-20 grid lg:grid-cols-2 gap-10">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <BackToHome />
                <span className="premium-badge badge-orange mt-6 mb-5 inline-flex">
              AUTOMOTIVE SERVICES
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-6 sm:text-5xl lg:text-7xl">
              Expert <span className="metal-text">Auto Care.</span>
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-lg mb-8">
              From routine maintenance to complex engine diagnostics. We combine decades of hands-on experience with modern diagnostic tools to get you back on the road safely.
            </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/book?service=automotive" className="btn-primary group">
                    Book Automotive Service <ArrowRight className="h-4 w-4 group-hover:translate-x-1" />
                  </Link>
                  <button onClick={() => setAssistantOpen(true)} className="btn-outline">
                    Quick chat booking
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Hero Image Parallax */}
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
             className="relative h-[500px] sm:h-[600px] w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
          >
             <Image src={siteImages.diagnostics} alt="Diagnostics and auto care" fill className="object-cover" />
             <div className="img-overlay" />
          </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES GRID ─── */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Capabilities"
          title={<>Full-Spectrum <span className="orange-glow-text">Auto Care</span></>}
          description="From complex electrical diagnostics to routine maintenance, our facility is equipped to handle modern automotive challenges."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {autoServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="panel-strong group relative overflow-hidden rounded-[2rem] border border-white/5 transition-colors hover:border-orange-500/30"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={service.img} alt={service.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="img-overlay" />
                  <div className="absolute top-4 right-4 cyber-badge">{service.stat}</div>
                </div>
                <div className="relative p-6 sm:p-8 z-10 -mt-10">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/20 ring-1 ring-orange-500/50 backdrop-blur-xl text-orange-400 shadow-xl shadow-orange-900/50">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mt-2 group-hover:text-orange-400 transition-colors">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{service.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ─── REVIEWS / TRUST ─── */}
      <section className="relative border-y border-white/10 bg-black/40 py-24 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
           <SectionHeading
            badge="Client Trust"
            title="What Drivers Say"
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className="panel-cyber rounded-[2rem] p-8 text-left"
              >
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-orange-400 text-orange-400" />)}
                </div>
                <p className="text-lg text-zinc-300 italic mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white">
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

      {/* ─── CTA ─── */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4 sm:text-4xl">Ready to fix your car?</h2>
        <p className="text-zinc-400 mb-8 text-lg">Use our AI assistant to tell us the symptoms. We'll instantly match you with the right service and get you scheduled.</p>
        <button onClick={() => setAssistantOpen(true)} className="btn-primary">
          Start Diagnostic Intake <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </section>

      <ChatAssistant open={assistantOpen} onOpenChange={setAssistantOpen} />
    </main>
  );
}

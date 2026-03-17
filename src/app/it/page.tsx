"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Database,
  Globe,
  Lock,
  MessageSquareMore,
  MonitorSmartphone,
  Server,
  Terminal,
  Wifi,
} from "lucide-react";
import { ChatAssistant } from "@/components/chat-assistant";
import { SectionHeading } from "@/components/section-heading";
import { BackToHome } from "@/components/back-to-home";
import { siteImages } from "@/lib/site-images";

const itServices = [
  {
    title: "Network Infrastructure",
    description: "Enterprise-grade Wi-Fi setups, ethernet drops, and router configurations for blazing fast, dead-zone-free coverage.",
    icon: <Wifi className="h-6 w-6" />,
    stats: "Gigabit Ready",
  },
  {
    title: "Custom PC Builds & Repair",
    description: "From high-end gaming rigs and workstations to diagnosing hardware failures and blue screens.",
    icon: <Cpu className="h-6 w-6" />,
    stats: "Same-Day Diagnostics",
  },
  {
    title: "Data Recovery & Backup",
    description: "Secure retrieval from failing drives and implementation of automated, encrypted NAS local/cloud backups.",
    icon: <Database className="h-6 w-6" />,
    stats: "Zero-Knowledge Encryption",
  },
  {
    title: "Smart Home & Automation",
    description: "Unifying your disparate IoT devices (lights, locks, cameras, thermostats) into a single, cohesive local network.",
    icon: <Globe className="h-6 w-6" />,
    stats: "Local Control (No Cloud Reliance)",
  },
];

const techStack = [
  { name: "Ubiquiti UniFi", icon: Server },
  { name: "TrueNAS", icon: Database },
  { name: "Home Assistant", icon: MonitorSmartphone },
  { name: "pfSense", icon: Lock },
  { name: "Proxmox", icon: Terminal }
];

function scrollToItCta() {
  document.getElementById("it-cta")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ITPages() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <main className="relative overflow-x-hidden pt-10">
      <div className="noise-overlay" aria-hidden />

      {/* ─── HERO ─── */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20 lg:mb-32">
        <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-black shadow-2xl shadow-cyan-900/20 lg:rounded-[3rem] min-h-[600px] flex items-center">
          <div className="absolute inset-0 hidden sm:block">
            <Image src={siteImages.itConsultant} alt="" fill className="object-cover opacity-25 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-cyan-950/50" />
          </div>
          <div className="absolute inset-0 bg-black/95 sm:hidden" aria-hidden />

          <div className="relative z-10 p-8 sm:p-14 lg:p-20 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <BackToHome />
                <span className="premium-badge orbitron inline-flex text-[10px] tracking-[0.2em] border-cyan-500/50 bg-cyan-500/10 text-cyan-300">
                  IT & NETWORKING
                </span>
              </div>
              <h1 className="mt-5 sm:mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl pb-2">
                Smart Solutions for<br/>
                <span className="text-cyan-400">Home & Business.</span>
              </h1>
              <p className="mt-6 text-lg text-zinc-300 max-w-lg leading-relaxed border-l-2 border-cyan-500/50 pl-4 bg-black/40 backdrop-blur-sm py-2">
                From simple network drops to complex server racks and data recovery, we bring fast, friendly, and reliable IT support directly to your door.
              </p>
              <div className="mt-8 flex gap-4">
                <button 
                  onClick={() => setAssistantOpen(true)} 
                  className="inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all bg-cyan-500 text-black px-6 py-3.5 hover:bg-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                >
                  Consult an Expert <Terminal className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative Right side elements intentionally removed for a cleaner, human focus */}
        </div>
      </section>

      {/* ─── SERVICES GRID ─── */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Core Services"
          title={<>Infrastructure & <span className="text-cyan-400">Support</span></>}
          description="We don't just fix electronics; we engineer resilient systems designed for privacy, speed, and longevity."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {itServices.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-black/40 backdrop-blur-sm transition-colors hover:border-cyan-500/30 hover:bg-black/80"
            >
              <button
                type="button"
                onClick={scrollToItCta}
                className="w-full p-8 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-[2rem]"
                aria-describedby="it-cta"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/30 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
                    {service.icon}
                  </div>
                  <span className="orbitron text-xs font-bold text-zinc-500 uppercase tracking-wider">{service.stats}</span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                <p className="mt-4 text-zinc-400 leading-relaxed">{service.description}</p>
                <span className="mt-4 inline-block text-xs font-medium text-zinc-500 group-hover:text-cyan-400 transition-colors">
                  Get quote & support →
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── TECH STACK MARQUEE / BADGES ─── */}
      <section className="relative border-y border-white/5 bg-black/40 py-16 backdrop-blur-md overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
           <p className="orbitron text-xs text-zinc-500 mb-8 uppercase tracking-[0.2em] font-bold">Technologies We Deploy & Support</p>
           
           <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
             {techStack.map((tech, i) => {
               const Icon = tech.icon;
               return (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 transition-colors hover:border-cyan-400/50 hover:bg-white/10"
                 >
                   <Icon className="h-4 w-4 text-cyan-400" />
                   <span className="font-semibold text-white">{tech.name}</span>
                 </motion.div>
               );
             })}
           </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
       <section id="it-cta" className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8 text-center scroll-mt-24">
         <div className="panel-cyber rounded-[3rem] p-12">
            <h2 className="text-3xl font-bold text-white mb-4 sm:text-4xl">System Offline? Network Slow?</h2>
            <p className="text-zinc-400 mb-8 text-lg">Don't wait. Chat with Manny to log your issue and get routed to a tech immediately.</p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button 
                onClick={() => setAssistantOpen(true)} 
                className="inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all bg-cyan-500 text-black px-8 py-4 text-lg hover:bg-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.4)]"
              >
                Get IT Support <ArrowRight className="h-5 w-5" />
              </button>
              <Link 
                href="/book?service=it" 
                className="inline-flex items-center justify-center gap-2 rounded-full font-bold border-2 border-cyan-400/50 bg-transparent text-cyan-300 px-8 py-4 text-lg hover:bg-cyan-500/10 hover:border-cyan-400 transition-all"
              >
                Book directly
              </Link>
            </div>
         </div>
      </section>

      <ChatAssistant open={assistantOpen} onOpenChange={setAssistantOpen} />
    </main>
  );
}

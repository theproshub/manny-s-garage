"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CircleDollarSign,
  Clock,
  FileCheck2,
  FileText,
  MapPin,
  MessageSquare,
  ScanSearch,
  ShieldCheck,
  Tag,
  UserPlus,
  Wrench,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

export type ServiceStandardsVariant = "auto" | "home" | "handyman" | "it" | "diy";

type Accent = "orange" | "cyan";

type StandardItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const VARIANT_CONFIG: Record<
  ServiceStandardsVariant,
  {
    title: string;
    description: string;
    accent: Accent;
    items: StandardItem[];
  }
> = {
  auto: {
    title: "How We Treat Every Vehicle",
    description:
      "A simple standard: figure it out properly, explain it plainly, and only do work you’ve agreed to—right here in Fargo.",
    accent: "orange",
    items: [
      {
        icon: ScanSearch,
        title: "Diagnose First",
        description:
          "We confirm what’s wrong before we order parts or dive into major labor—no guessing on your dime.",
      },
      {
        icon: FileCheck2,
        title: "You Approve the Plan",
        description:
          "You get a clear explanation of the fix and your go-ahead before we start the work we quoted.",
      },
      {
        icon: CircleDollarSign,
        title: "Pricing You Can Trust",
        description:
          "Estimates are upfront—listed fixed prices are starting points and do not include parts unless we say so. If something truly changes, we talk it through before adding anything.",
      },
      {
        icon: MapPin,
        title: "Fargo, Face to Face",
        description:
          "A local shop where you know who’s on your car—not a rotating counter and a script.",
      },
    ],
  },
  home: {
    title: "What to Expect",
    description: "We keep it simple. No surprises, no runaround.",
    accent: "orange",
    items: [
      {
        icon: CircleDollarSign,
        title: "Price first",
        description:
          "You get the cost before anything starts. If something changes mid-job, we tell you before we do it.",
      },
      {
        icon: MessageSquare,
        title: "Plain updates",
        description:
          "We call or text when there’s something to know. No jargon, no guessing on your end.",
      },
      {
        icon: Building2,
        title: "All in one place",
        description:
          "Cars, home repairs, tech, and bay rentals. No need to call three different shops.",
      },
      {
        icon: MapPin,
        title: "We’re in Fargo",
        description:
          "Local shop, same faces. You can walk in, call us, or book online.",
      },
    ],
  },
  handyman: {
    title: "How We Handle Home Jobs",
    description:
      "Fixed packages where we list them, straight scope on everything else, and respect for your space—same honesty standard as the garage.",
    accent: "orange",
    items: [
      {
        icon: Tag,
        title: "Prices You Can See",
        description:
          "Listed jobs show fixed pricing; custom work gets a clear estimate before we start.",
      },
      {
        icon: FileCheck2,
        title: "Scope You Approve",
        description:
          "We agree on what “done” looks like up front so there’s no mystery add-ons mid-project.",
      },
      {
        icon: CircleDollarSign,
        title: "No Invoice Surprises",
        description:
          "If something has to change, we talk it through before the bill grows.",
      },
      {
        icon: MapPin,
        title: "Fargo Installs",
        description:
          "On-site work from someone local—you know who’s in your home.",
      },
    ],
  },
  it: {
    title: "How We Approach I.T. Work",
    description:
      "Networks, PCs, and smart-home gear deserve the same discipline as a repair bay: understand first, quote second, then execute with your approval.",
    accent: "cyan",
    items: [
      {
        icon: ScanSearch,
        title: "Assess Before We Change Things",
        description:
          "We map the problem and impact before reconfiguring gear or touching your data paths.",
      },
      {
        icon: FileCheck2,
        title: "Quote Before Hands-On Work",
        description:
          "You get scope and pricing to approve before we bill for labor or major changes.",
      },
      {
        icon: ShieldCheck,
        title: "Security-Minded Setups",
        description:
          "Wi‑Fi, backups, and smart devices configured with sensible defaults—not open doors.",
      },
      {
        icon: MapPin,
        title: "On-Site in Fargo",
        description:
          "Local visits when it matters, with clear communication from the same team.",
      },
    ],
  },
  diy: {
    title: "How DIY Bay Rental Works",
    description:
      "Rent professional space and tools by the hour—with optional mechanic help—without guessing what’s included.",
    accent: "orange",
    items: [
      {
        icon: Wrench,
        title: "Equipped Bay, Real Tools",
        description:
          "Lift, air, and shop-grade gear so you’re not fighting the job in a driveway.",
      },
      {
        icon: Clock,
        title: "Time You Book",
        description:
          "Hourly blocks you control; bundle pricing on the quote page when you want a fixed total.",
      },
      {
        icon: UserPlus,
        title: "Mechanic Optional",
        description:
          "Bring your own skills or add hourly help when you want a second pair of hands.",
      },
      {
        icon: FileText,
        title: "What’s Included Is Clear",
        description:
          "Equipment and rules are spelled out up front—no vague “shop fee” surprises.",
      },
    ],
  },
};

const accentBox: Record<Accent, string> = {
  orange: "border-orange-500/25 bg-orange-500/10 text-orange-300",
  cyan: "border-cyan-500/25 bg-cyan-500/10 text-cyan-400",
};

export function ServiceStandardsSection({ variant }: { variant: ServiceStandardsVariant }) {
  const config = VARIANT_CONFIG[variant];
  const box = accentBox[config.accent];

  return (
    <section className="relative border-y border-white/[0.06] bg-black/30 py-16 sm:py-24 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <SectionHeading title={config.title} description={config.description} align="center" />
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 text-left sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {config.items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                className="panel-cyber flex flex-col rounded-2xl p-6 sm:rounded-[1.75rem] sm:p-7"
              >
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl border ${box}`}>
                  <Icon className="h-5 w-5 shrink-0" aria-hidden />
                </div>
                <h3 className="text-base font-bold text-white sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

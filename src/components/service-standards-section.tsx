"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";

export type ServiceStandardsVariant = "auto" | "home" | "handyman" | "it" | "diy";

type Accent = "orange" | "cyan";

type StandardItem = {
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
        title: "Diagnose First",
        description:
          "We confirm what’s wrong before we order parts or dive into major labor—no guessing on your dime.",
      },
      {
        title: "You Approve the Plan",
        description:
          "You get a clear explanation of the fix and your go-ahead before we start the work we quoted.",
      },
      {
        title: "Pricing You Can Trust",
        description:
          "Estimates are upfront—listed fixed prices are starting points and do not include parts unless we say so. If something truly changes, we talk it through before adding anything.",
      },
      {
        title: "Fargo, Face to Face",
        description:
          "A local shop where you know who’s on your car—not a rotating counter and a script.",
      },
    ],
  },
  home: {
    title: "How We Work With You",
    description:
      "Same approach whether it’s auto, a home install, a bay rental, or I.T.—clear numbers, clear communication, and your OK before we move forward.",
    accent: "orange",
    items: [
      {
        title: "You Know the Cost Up Front",
        description:
          "We go over pricing before work starts, and nothing moves forward until you say yes.",
      },
      {
        title: "Updates That Make Sense",
        description:
          "If we find something new, we explain it in plain language—and share photos when it helps.",
      },
      {
        title: "One Place, Many Jobs",
        description:
          "Auto repair, handyman installs, DIY bays, and I.T. support under one roof so you’re not juggling shops.",
      },
      {
        title: "Local and Accountable",
        description:
          "Fargo-based service with people you can come back to—not a distant call center.",
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
        title: "Prices You Can See",
        description:
          "Listed jobs show fixed pricing; custom work gets a clear estimate before we start.",
      },
      {
        title: "Scope You Approve",
        description:
          "We agree on what “done” looks like up front so there’s no mystery add-ons mid-project.",
      },
      {
        title: "No Invoice Surprises",
        description:
          "If something has to change, we talk it through before the bill grows.",
      },
      {
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
        title: "Assess Before We Change Things",
        description:
          "We map the problem and impact before reconfiguring gear or touching your data paths.",
      },
      {
        title: "Quote Before Hands-On Work",
        description:
          "You get scope and pricing to approve before we bill for labor or major changes.",
      },
      {
        title: "Security-Minded Setups",
        description:
          "Wi‑Fi, backups, and smart devices configured with sensible defaults—not open doors.",
      },
      {
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
        title: "Equipped Bay, Real Tools",
        description:
          "Lift, air, and shop-grade gear so you’re not fighting the job in a driveway.",
      },
      {
        title: "Time You Book",
        description:
          "Hourly blocks you control; bundle pricing on the quote page when you want a fixed total.",
      },
      {
        title: "Mechanic Optional",
        description:
          "Bring your own skills or add hourly help when you want a second pair of hands.",
      },
      {
        title: "What’s Included Is Clear",
        description:
          "Equipment and rules are spelled out up front—no vague “shop fee” surprises.",
      },
    ],
  },
};


export function ServiceStandardsSection({ variant }: { variant: ServiceStandardsVariant }) {
  const config = VARIANT_CONFIG[variant];

  return (
    <section className="relative border-y border-[var(--rule)] bg-[var(--surface)] py-16 sm:py-24 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <SectionHeading title={config.title} description={config.description} align="center" />
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 text-left sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {config.items.map((item, i) => {
            return (
              <motion.div
                key={item.title}
                className="panel-cyber flex flex-col rounded-2xl p-6 sm:rounded-[1.75rem] sm:p-7"
              >
                <h3 className="text-base font-bold text-[var(--ink)] sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

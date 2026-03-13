"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpFromLine,
  CarFront,
  Calculator,
  Wrench,
  Gauge,
  Droplets,
  MessageSquare,
  UserCog,
} from "lucide-react";

const hourlyRate = 20;
const maxHours = 8;

const equipment = [
  {
    title: "Car lift",
    description: "Full-height lift so you can work safely underneath your vehicle.",
    icon: ArrowUpFromLine,
  },
  {
    title: "Diagnostic scanner",
    description: "Read codes and live data so you know what’s really going on.",
    icon: Gauge,
  },
  {
    title: "Oil change & fluids",
    description: "Pits, drain pans, and space to do oil changes and fluid swaps.",
    icon: Droplets,
  },
  {
    title: "Full tool set",
    description: "Hand tools, sockets, jack stands, and shop equipment you need.",
    icon: Wrench,
  },
];

export default function DIYGaragePage() {
  const [hours, setHours] = useState(2);

  const total = Math.min(hours, maxHours) * hourlyRate;

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="grid-overlay" />
      <div className="noise-overlay" />

      <header className="panel sticky top-2 z-20 mx-3 mt-3 flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 sm:top-4 sm:mx-6 sm:px-6 sm:py-3">
        <Link
          href="/"
          className="focus-ring min-touch inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Main menu
        </Link>
        <p className="truncate text-xs font-semibold uppercase tracking-widest text-orange-300">DIY Garage</p>
      </header>

      <div className="mx-auto max-w-4xl px-4 pb-safe-fab pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <div className="mb-8 sm:mb-12">
          <p className="text-sm uppercase tracking-[0.28em] text-orange-300">
            Work on your own car
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            DIY Garage — full garage with equipment and tools
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-400 sm:text-base">
            Rent bay time and work on your car at Manny&apos;s Garage. Full shop: car lift, diagnostic
            scanner, oil change equipment, and more. $20 an hour, booking available for up to 8 hours.
            Professional help options available when your DIY repair gets stuck.
          </p>
        </div>

        <section className="panel-strong mb-10 rounded-2xl p-5 sm:mb-12 sm:rounded-[1.75rem] sm:p-6 lg:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-orange-500/15 p-3 text-orange-300">
              <CarFront className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                What you get
              </h2>
              <p className="mt-3 text-zinc-400 leading-7">
                A full garage with equipment and tools so you can work on your own car: car lift,
                diagnostic scanner, oil change and fluids, full tool set, and more. Book by the hour.
                Professional help is available when you get stuck so you can finish the job.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-white">Equipment & tools</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {equipment.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="panel-strong rounded-2xl p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-orange-500/12 p-2 text-orange-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-zinc-400">{item.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mb-12">
          <div className="panel-strong rounded-2xl border border-orange-400/15 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-orange-500/15 p-2 text-orange-300">
                <UserCog className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Professional help when you’re stuck</h3>
                <p className="mt-1 text-sm text-zinc-400">
                  DIY repairs don’t always go as planned. Professional help is available for an extra fee
                  when you get stuck—a second set of hands or advice so you can finish the job.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-orange-500/15 p-2 text-orange-300">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">AI price quote</h2>
              <p className="text-sm text-zinc-400">
                $20/hour. Book up to 8 hours. Get an instant estimate below.
              </p>
            </div>
          </div>

          <div className="panel-strong rounded-2xl p-5 sm:rounded-[1.75rem] sm:p-6 lg:p-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300">
                Hours (max {maxHours})
              </label>
              <input
                type="number"
                min={1}
                max={maxHours}
                value={hours}
                onChange={(e) =>
                  setHours(
                    Math.max(1, Math.min(maxHours, parseInt(e.target.value, 10) || 1))
                  )
                }
                className="focus-ring min-touch mt-2 w-full max-w-xs rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white transition-colors focus:border-orange-400/50 focus:bg-white/[0.07] sm:text-sm"
              />
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <div className="rounded-2xl border border-orange-400/30 bg-orange-500/10 px-6 py-4">
                <p className="text-xs uppercase tracking-wider text-orange-200">
                  Estimated total
                </p>
                <p className="text-3xl font-semibold text-white">${total}</p>
                <p className="mt-1 text-sm text-zinc-400">
                  ${hourlyRate}/hr × {Math.min(hours, maxHours)} hr
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-orange-400/20 bg-orange-500/10 p-5 sm:rounded-[1.75rem] sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Book your bay time</h2>
              <p className="mt-2 text-zinc-300">
                Use the booking assistant on the main page to request your preferred date and
                number of hours. We’ll confirm availability and get you on the schedule.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="accent-ring focus-ring inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-zinc-950 hover:-translate-y-0.5 hover:bg-orange-400 active:translate-y-0"
              >
                <MessageSquare className="h-4 w-4" />
                Go to main page & book
              </Link>
              <Link
                href="/"
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3.5 text-sm font-medium text-zinc-300 hover:border-white/20 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to main menu
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

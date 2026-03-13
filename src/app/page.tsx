"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpFromLine,
  BatteryCharging,
  CarFront,
  CheckCircle2,
  Gauge,
  Hammer,
  Menu,
  MessageSquareMore,
  MapPin,
  PhoneCall,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Tv,
  Video,
  Wrench,
  X,
} from "lucide-react";
import { ChatAssistant } from "@/components/chat-assistant";

const services = [
  {
    title: "Diagnostics & Check Engine",
    description:
      "Fast fault scanning and real answers on what is wrong before you spend money on parts.",
    icon: Gauge,
  },
  {
    title: "Brake & Suspension Repair",
    description:
      "Confident stopping power, smoother steering, and dependable handling for Fargo roads.",
    icon: ShieldCheck,
  },
  {
    title: "Engine, Tune-Ups & Maintenance",
    description:
      "Oil changes, tune-ups, belts, filters, and long-term care that keeps your car on schedule.",
    icon: Wrench,
  },
  {
    title: "Battery, Starter & Charging",
    description:
      "No-start problems solved quickly with battery testing and electrical system service.",
    icon: BatteryCharging,
  },
];

const advantages = [
  "Built mobile-first for local drivers searching on the go.",
  "AI booking assistant captures the job before the first callback.",
  "Twilio SMS alerts push every booking to the owner instantly.",
  "Supabase-ready lead storage keeps intake organized and searchable.",
];

const process = [
  "Tell the assistant about your car, issue, and preferred day.",
  "The booking API validates the request and stores it in Supabase when configured.",
  "Twilio sends an SMS summary to the owner's phone for immediate follow-up.",
];

const handymanOffers = [
  {
    title: "TV mounting",
    description: "Secure, level mounts for any screen size. We handle the drill and the cables.",
    icon: Tv,
    imageLabel: "TV Mounting",
  },
  {
    title: "Security cameras",
    description: "Indoor and outdoor camera installs so you can monitor what matters.",
    icon: Video,
    imageLabel: "Security Cameras",
  },
  {
    title: "Furniture assembly",
    description: "Beds, dressers, nightstands, and more—assembled right so it lasts.",
    icon: Hammer,
    imageLabel: "Furniture Assembly",
  },
];

export default function Home() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="relative overflow-x-hidden">
      <div className="grid-overlay" />
      <div className="noise-overlay" />

      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-safe-fab pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-6">
        <div className="relative">
        <header className="panel sticky top-2 z-20 flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 sm:top-4 sm:px-6 sm:py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold uppercase tracking-[0.2em] text-orange-300 sm:tracking-[0.28em]">Manny&apos;s Garage</p>
            <p className="hidden truncate text-sm text-zinc-400 sm:block">Auto repair booking for Fargo drivers</p>
          </div>

          <nav className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Link
              href="#services"
              className="focus-ring hidden rounded-full border border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:border-white/20 hover:text-white sm:inline-flex"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/handyman"
              className="focus-ring hidden rounded-full border border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:border-orange-400/40 hover:text-white sm:inline-flex"
              onClick={() => setMobileMenuOpen(false)}
            >
              Handyman
            </Link>
            <Link
              href="/diy-garage"
              className="focus-ring hidden rounded-full border border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:border-orange-400/40 hover:text-white sm:inline-flex"
              onClick={() => setMobileMenuOpen(false)}
            >
              DIY Garage
            </Link>
            <a
              href="tel:+17015550142"
              aria-label="Call shop"
              className="focus-ring min-touch inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2.5 text-sm font-medium text-zinc-200 hover:border-orange-400/40 hover:text-white sm:px-4"
            >
              <PhoneCall className="h-4 w-4 shrink-0 text-orange-300" />
              <span className="hidden sm:inline">Call shop</span>
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="focus-ring min-touch panel inline-flex items-center justify-center rounded-full border border-white/10 p-2.5 sm:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>
        </header>

        {mobileMenuOpen && (
          <div
            className="panel-strong absolute left-0 right-0 top-full z-20 mt-2 flex flex-col gap-1 rounded-2xl border border-white/10 p-2 sm:hidden"
            role="dialog"
            aria-label="Navigation menu"
          >
            <Link
              href="#services"
              className="focus-ring min-touch rounded-xl px-4 py-3 text-sm font-medium text-zinc-200 hover:bg-white/5 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/handyman"
              className="focus-ring min-touch rounded-xl px-4 py-3 text-sm font-medium text-zinc-200 hover:bg-white/5 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Handyman
            </Link>
            <Link
              href="/diy-garage"
              className="focus-ring min-touch rounded-xl px-4 py-3 text-sm font-medium text-zinc-200 hover:bg-white/5 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              DIY Garage
            </Link>
          </div>
        )}
        </div>

        <div className="grid flex-1 items-center gap-10 py-10 sm:gap-14 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
          <div className="min-w-0 max-w-2xl">
            <div className="soft-label mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium sm:mb-6 sm:text-sm">
              <Sparkles className="h-4 w-4 text-orange-300" />
              One-stop service
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl font-semibold leading-[1.08] tracking-tight sm:text-5xl sm:tracking-normal lg:text-6xl xl:text-7xl">
                <span className="metal-text block">Manny&apos;s Garage</span>
                <span className="mt-2 block text-white sm:mt-3">auto repair, handyman &amp; DIY garage.</span>
              </h1>
              <div className="h-px w-16 bg-gradient-to-r from-orange-500/60 to-transparent sm:w-20" aria-hidden />
            </div>

            <p className="mt-6 max-w-xl border-l-2 border-orange-500/40 bg-white/[0.02] py-1 pl-4 text-[15px] leading-7 text-zinc-400 sm:mt-7 sm:text-base sm:leading-8 sm:text-lg sm:text-zinc-300">
              One stop for auto repair booking, handyman services (TV mounting, security cameras,
              furniture assembly), and DIY garage bay rental.{" "}
              <span className="font-medium text-zinc-200 sm:text-white">Get a price quote or book with the assistant.</span>
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={() => setAssistantOpen(true)}
                className="accent-ring focus-ring min-touch inline-flex items-center justify-center gap-2.5 rounded-full bg-orange-500 px-8 py-4 text-base font-semibold text-zinc-950 shadow-lg shadow-orange-950/35 transition hover:-translate-y-0.5 hover:bg-orange-400 hover:shadow-orange-500/25 active:translate-y-0"
              >
                Book a repair
                <ArrowRight className="h-4 w-4 shrink-0" />
              </button>

              <a
                href="#services"
                className="focus-ring min-touch inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                Explore services
              </a>
            </div>

            <div className="mt-9 grid gap-3 sm:mt-11 sm:grid-cols-3 sm:gap-4">
              <div className="panel-strong group rounded-2xl p-5 transition-colors hover:border-orange-400/20 hover:bg-white/[0.02] sm:rounded-3xl">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 text-orange-300 transition-colors group-hover:bg-orange-500/20">
                  <CarFront className="h-5 w-5" />
                </div>
                <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">Auto</p>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">Repair booking with the AI assistant</p>
              </div>
              <div className="panel-strong group rounded-2xl p-5 transition-colors hover:border-orange-400/20 hover:bg-white/[0.02] sm:rounded-3xl">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 text-orange-300 transition-colors group-hover:bg-orange-500/20">
                  <Hammer className="h-5 w-5" />
                </div>
                <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">Handyman</p>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">TV mounting, cameras, furniture assembly</p>
              </div>
              <div className="panel-strong group rounded-2xl p-5 transition-colors hover:border-orange-400/20 hover:bg-white/[0.02] sm:rounded-3xl">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 text-orange-300 transition-colors group-hover:bg-orange-500/20">
                  <ArrowUpFromLine className="h-5 w-5" />
                </div>
                <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">DIY Garage</p>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">Full shop by the hour, $20/hr up to 8 hours</p>
              </div>
            </div>
          </div>

          <div className="panel-strong accent-ring relative min-w-0 overflow-hidden rounded-2xl border border-white/10 p-5 sm:rounded-[2rem] sm:p-6 lg:p-8">
            <div className="absolute inset-0 bg-linear-to-br from-orange-500/12 via-transparent to-transparent" />
            <div className="section-glow" />
            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="shrink-0 rounded-xl bg-orange-500/20 p-2.5 ring-1 ring-orange-400/20 sm:rounded-2xl sm:p-3 text-orange-300">
                    <CarFront className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">One-stop at a glance</p>
                    <p className="text-xs text-zinc-400 sm:text-sm">What we offer and how booking works</p>
                  </div>
                </div>
                <div className="hidden shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-400 sm:block">
                  Fargo, ND
                </div>
              </div>

              <div className="orange-divider my-6 sm:my-7" />

              <div className="grid gap-3">
                {advantages.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/25 px-4 py-4 text-sm leading-6 text-zinc-200"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/8 bg-black/25 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Best For</p>
                  <p className="mt-3 text-lg font-semibold text-white">Brake, battery, diagnostics, maintenance</p>
                </div>
                <div className="rounded-3xl border border-white/8 bg-black/25 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Booking Flow</p>
                  <p className="mt-3 text-lg font-semibold text-white">Chat-first intake with owner SMS alerts</p>
                </div>
              </div>

              <div className="mt-7 flex items-center gap-2 text-sm text-zinc-400">
                <MapPin className="h-4 w-4 text-orange-300" />
                Serving Fargo and nearby communities with a modern garage brand
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="handyman" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.28em] text-orange-300">Handyman</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            TV mounting, security cameras &amp; furniture assembly.
          </h2>
          <p className="mt-4 text-zinc-400">
            One-stop handyman help: mount your TV, install security cameras, and assemble furniture.
            Get details and an AI price quote on the handyman page.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {handymanOffers.map((offer) => {
            const Icon = offer.icon;
            return (
              <article
                key={offer.title}
                className="panel-strong group overflow-hidden rounded-[1.75rem] hover:-translate-y-1 hover:border-orange-400/25 hover:shadow-xl hover:shadow-orange-950/10"
              >
                <div className="flex h-36 items-center justify-center bg-gradient-to-br from-orange-500/15 to-zinc-900/80 text-orange-300/90">
                  <Icon className="h-14 w-14" strokeWidth={1.25} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white">{offer.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{offer.description}</p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href="/handyman"
            className="accent-ring focus-ring inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-zinc-950 hover:-translate-y-0.5 hover:bg-orange-400 active:translate-y-0"
          >
            Handyman details, pricing &amp; book
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.28em] text-orange-300">Auto repair</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Repair services presented like a premium local shop.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="panel-strong group rounded-[1.75rem] p-6 hover:-translate-y-1 hover:border-orange-400/25 hover:shadow-xl hover:shadow-orange-950/10"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="inline-flex rounded-2xl bg-orange-500/12 p-3 text-orange-300 transition group-hover:bg-orange-500/18">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">Service</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{service.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="panel-strong rounded-[2rem] p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-orange-300">How It Works</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Built for faster booking and follow-up.</h2>
            <div className="mt-8 space-y-4">
              {process.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-2xl border border-white/8 bg-black/25 p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-zinc-950">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-7 text-zinc-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-strong rounded-[2rem] p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-orange-300">Why Drivers Choose Us</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/8 bg-black/25 p-5">
                <div className="mb-3 inline-flex rounded-2xl bg-white/5 p-2 text-orange-300">
                  <MessageSquareMore className="h-5 w-5" />
                </div>
                <p className="text-2xl font-semibold text-white">Clear communication</p>
                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  The assistant captures vehicle details before the first callback, so every lead is warmer.
                </p>
              </div>
              <div className="rounded-3xl border border-white/8 bg-black/25 p-5">
                <div className="mb-3 inline-flex rounded-2xl bg-white/5 p-2 text-orange-300">
                  <Shield className="h-5 w-5" />
                </div>
                <p className="text-2xl font-semibold text-white">Mechanic-style branding</p>
                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Dark steel tones, orange highlights, and bold layout choices create an automotive feel.
                </p>
              </div>
              <div className="rounded-3xl border border-white/8 bg-black/25 p-5">
                <div className="mb-3 inline-flex rounded-2xl bg-white/5 p-2 text-orange-300">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <p className="text-2xl font-semibold text-white">Responsive by default</p>
                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Every section is tuned for phones first, so local traffic can convert quickly from mobile search.
                </p>
              </div>
              <div className="rounded-3xl border border-white/8 bg-black/25 p-5">
                <div className="mb-3 inline-flex rounded-2xl bg-white/5 p-2 text-orange-300">
                  <Star className="h-5 w-5" />
                </div>
                <p className="text-2xl font-semibold text-white">Ready for growth</p>
                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Supabase and Twilio are already wired in, making lead storage and owner alerts easy to expand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="diy-garage" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="panel-strong overflow-hidden rounded-2xl border border-orange-400/15 p-5 sm:rounded-[2rem] sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-orange-300">Work on your own car</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                DIY Garage — full garage, equipment &amp; tools.
              </h2>
              <p className="mt-4 max-w-xl text-zinc-400">
                Car lift, diagnostic scanner, oil change and more. $20/hour, up to 8 hours. Work on your
                car yourself; professional help available when you get stuck.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <span className="rounded-full bg-orange-500/15 px-4 py-2 text-sm font-medium text-orange-200">
                  $20/hour
                </span>
                <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300">
                  Up to 8 hours
                </span>
              </div>
            </div>
            <Link
              href="/diy-garage"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-orange-400/50 bg-orange-500/10 px-6 py-4 text-sm font-semibold text-orange-200 transition hover:border-orange-400 hover:bg-orange-500/20 sm:w-auto"
            >
              DIY Garage details & booking
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-safe-fab sm:px-6 sm:pb-28 lg:px-8">
        <div className="accent-ring relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-orange-400/20 bg-linear-to-r from-orange-500/18 via-zinc-950 to-zinc-950 p-5 sm:p-8 lg:p-10">
          <div className="section-glow" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-orange-200">Ready To Book</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
                Need repair help now? Open the assistant and send Manny the details.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
                Share your name, phone number, vehicle, issue, and preferred date. The request can be saved to
                Supabase and texted to the owner through Twilio in one step.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Chat intake</p>
                <p className="mt-2 text-lg font-semibold text-white">5 simple prompts</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Owner alert</p>
                <p className="mt-2 text-lg font-semibold text-white">Twilio SMS delivery</p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button
              type="button"
              onClick={() => setAssistantOpen(true)}
              className="accent-ring focus-ring inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-zinc-950 hover:-translate-y-0.5 hover:bg-orange-400 active:translate-y-0"
            >
              Start assistant
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/8 bg-black/20 px-4 py-8 text-sm text-zinc-500 pb-safe sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="font-medium text-zinc-400">Manny&apos;s Garage, Fargo ND</p>
            <Link href="/" className="text-zinc-400 hover:text-orange-300">Home</Link>
            <Link href="/handyman" className="text-zinc-400 hover:text-orange-300">Handyman</Link>
            <Link href="/diy-garage" className="text-zinc-400 hover:text-orange-300">DIY Garage</Link>
          </div>
          <p className="max-w-md text-zinc-500">One-stop service: auto repair, handyman, DIY garage.</p>
        </div>
      </footer>

      <ChatAssistant open={assistantOpen} onOpenChange={setAssistantOpen} />
    </main>
  );
}

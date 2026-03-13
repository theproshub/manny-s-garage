"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  Calculator,
  Hammer,
  Tv,
  MessageSquare,
} from "lucide-react";

const handymanServices = [
  {
    id: "furniture",
    title: "Furniture assembly",
    description:
      "We assemble beds, dressers, nightstands, bookshelves, and more. Flat-pack or pre-built delivery—we get it done so you don't have to.",
    price: "$50 per item",
    icon: Hammer,
    quoteType: "items" as const,
    unitLabel: "Number of items",
    rate: 50,
  },
  {
    id: "tv",
    title: "TV mounting",
    description:
      "Secure, level wall mounts for any TV size. We handle drilling, anchoring, and cable management so your setup looks clean.",
    price: "$1.75 per inch (screen diagonal)",
    icon: Tv,
    quoteType: "inches" as const,
    unitLabel: "TV size (inches diagonal)",
    rate: 1.75,
  },
  {
    id: "cameras",
    title: "Security cameras",
    description:
      "Indoor and outdoor camera installation. We run cables, mount units, and help with app setup so you can monitor from anywhere.",
    price: "$120 per camera",
    icon: Camera,
    quoteType: "cameras" as const,
    unitLabel: "Number of cameras",
    rate: 120,
  },
];

const furnitureItems = [
  { label: "Bed", price: 50 },
  { label: "Dresser", price: 50 },
  { label: "Night stand", price: 50 },
];

export default function HandymanPage() {
  const [quoteService, setQuoteService] = useState<string>("furniture");
  const [quoteQty, setQuoteQty] = useState<number>(2);
  const [quoteInches, setQuoteInches] = useState<number>(55);
  const [furnitureCounts, setFurnitureCounts] = useState<Record<string, number>>({
    bed: 0,
    dresser: 0,
    "night stand": 0,
  });

  const currentService = handymanServices.find((s) => s.id === quoteService);

  function getQuoteTotal(): number {
    if (quoteService === "furniture") {
      return (
        (furnitureCounts.bed || 0) * 50 +
        (furnitureCounts.dresser || 0) * 50 +
        (furnitureCounts["night stand"] || 0) * 50
      );
    }
    if (quoteService === "tv") return quoteInches * 1.75;
    if (quoteService === "cameras") return quoteQty * 120;
    return 0;
  }

  const quoteTotal = getQuoteTotal();

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
        <p className="truncate text-xs font-semibold uppercase tracking-widest text-orange-300">Handyman services</p>
      </header>

      <div className="mx-auto max-w-4xl px-4 pb-safe-fab pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <div className="mb-8 sm:mb-12">
          <p className="text-sm uppercase tracking-[0.28em] text-orange-300">Handyman</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Handyman services at Manny&apos;s Garage
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-400 sm:text-base">
            Full details on every service we offer: TV mounting, security cameras, and furniture assembly.
            Use the AI price quote below for an instant estimate, then use the link to book on the main page.
          </p>
        </div>

        <section className="space-y-8">
          {handymanServices.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.id}
                className="panel-strong rounded-2xl p-5 sm:rounded-[1.75rem] sm:p-6 lg:p-8"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl bg-orange-500/15 p-3 text-orange-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white sm:text-2xl">
                        {service.title}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-orange-200">{service.price}</p>
                    </div>
                  </div>
                </div>
                <p className="text-zinc-400 leading-7">{service.description}</p>
              </article>
            );
          })}
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-orange-500/15 p-2 text-orange-300">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">AI price quote</h2>
              <p className="text-sm text-zinc-400">
                Get an instant estimate. Final price may vary by job complexity.
              </p>
            </div>
          </div>

          <div className="panel-strong rounded-2xl p-5 sm:rounded-[1.75rem] sm:p-6 lg:p-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300">Service type</label>
              <select
                value={quoteService}
                onChange={(e) => setQuoteService(e.target.value)}
                className="focus-ring min-touch mt-2 w-full max-w-xs rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white transition-colors focus:border-orange-400/50 focus:bg-white/[0.07] sm:text-sm"
              >
                <option value="furniture">Furniture assembly — $50 per item</option>
                <option value="tv">TV mounting — $1.75 per inch</option>
                <option value="cameras">Security cameras — $120 per camera</option>
              </select>
            </div>

            {quoteService === "furniture" && (
              <div className="space-y-4">
                <p className="text-sm text-zinc-400">
                  Bed, dresser, and night stand are $50 each. Add quantities:
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {furnitureItems.map((item) => (
                    <div key={item.label}>
                      <label className="block text-sm text-zinc-400">{item.label}</label>
                      <input
                        type="number"
                        min={0}
                        max={20}
                        value={furnitureCounts[item.label.toLowerCase()] ?? 0}
                        onChange={(e) =>
                          setFurnitureCounts((prev) => ({
                            ...prev,
                            [item.label.toLowerCase()]: Math.max(
                              0,
                              parseInt(e.target.value, 10) || 0
                            ),
                          }))
                        }
                        className="focus-ring min-touch mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white transition-colors focus:border-orange-400/50 focus:bg-white/[0.07] sm:text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {quoteService === "tv" && (
              <div>
                <label className="block text-sm text-zinc-400">
                  TV size (diagonal inches)
                </label>
                <input
                  type="number"
                  min={20}
                  max={120}
                  value={quoteInches}
                  onChange={(e) =>
                    setQuoteInches(Math.max(20, Math.min(120, parseInt(e.target.value, 10) || 20)))
                  }
                  className="focus-ring min-touch mt-2 w-full max-w-xs rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white transition-colors focus:border-orange-400/50 focus:bg-white/[0.07] sm:text-sm"
                />
              </div>
            )}

            {quoteService === "cameras" && (
              <div>
                <label className="block text-sm text-zinc-400">Number of cameras</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={quoteQty}
                  onChange={(e) =>
                    setQuoteQty(Math.max(1, Math.min(20, parseInt(e.target.value, 10) || 1)))
                  }
                  className="focus-ring min-touch mt-2 w-full max-w-xs rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white transition-colors focus:border-orange-400/50 focus:bg-white/[0.07] sm:text-sm"
                />
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="rounded-2xl border border-orange-400/30 bg-orange-500/10 px-6 py-4">
                <p className="text-xs uppercase tracking-wider text-orange-200">
                  Estimated total
                </p>
                <p className="text-3xl font-semibold text-white">
                  ${quoteTotal.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-orange-400/20 bg-orange-500/10 p-5 sm:mt-14 sm:rounded-[1.75rem] sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Ready to book?</h2>
              <p className="mt-2 text-zinc-300">
                Use the link below to go to the main page and book with the assistant, or head back to the main menu.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="accent-ring focus-ring inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-zinc-950 hover:-translate-y-0.5 hover:bg-orange-400 active:translate-y-0"
              >
                <MessageSquare className="h-4 w-4" />
                Link to book (main page)
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

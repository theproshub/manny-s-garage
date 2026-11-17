"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BackToHome } from "@/components/back-to-home";
import { siteImages } from "@/lib/site-images";

const networkIncludes = [
  "We walk the building and figure out where the signal needs help",
  "Cable runs and jacks where you want them",
  "Router and switches set up properly, not left on defaults",
  "Gigabit-ready, and mesh if the building needs it",
];

const webDevIncludes = [
  "Loads fast and looks right on a phone",
  "One page or a whole site, whichever you need",
  "A contact form, and the basics so people can find you on Google",
  "Help with hosting and your domain if you want it",
];

const pcIncludes = [
  "Built to order — gaming, work, or the family computer",
  "We find the broken part and replace it",
  "Windows reinstalled, drivers updated, the machine running fast again",
  "Same-day answer whenever we can manage it",
];

const dataIncludes = [
  "Files pulled off drives that are failing, or already gone",
  "A drive at home that backs itself up so you don’t have to remember",
  "One copy here, one copy somewhere else",
  "Encrypted, so nobody but you can read it",
];

const smartHomeIncludes = [
  "One hub, with your devices actually talking to it",
  "Lights, locks, thermostat and cameras on one network",
  "Still works in your house when the internet is out",
  "We stay on call when something stops working",
];

const sections = [
  {
    id: "web-dev",
    title: "Website & App Building",
    description: "A simple, modern site for your business — quick to load, easy to update, and yours to keep.",
    includes: webDevIncludes,
    stat: "Website pricing",
  },
  {
    id: "network",
    title: "Network Infrastructure",
    description: "Dead spots, slow corners, a router you restart every week. We get the signal into every room and leave it working.",
    includes: networkIncludes,
    stat: "Gigabit Ready",
  },
  {
    id: "pc-builds",
    title: "Custom PC Builds & Repair",
    description: "A machine that’s slow, won’t start, or a new one built to your budget. Gaming rigs and work machines both.",
    includes: pcIncludes,
    stat: "Same-Day Diagnostics",
  },
  {
    id: "data-recovery",
    title: "Data Recovery & Backup",
    description: "If a drive is failing we’ll try to get your files off it, then set up backups so it doesn’t happen again.",
    includes: dataIncludes,
    stat: "Private and encrypted",
  },
  {
    id: "smart-home",
    title: "Smart Home & Automation",
    description: "Lights, locks, cameras and the thermostat on one system you actually control, without it all going through someone else’s cloud.",
    includes: smartHomeIncludes,
    stat: "Works without internet",
  },
];

export default function ITServicesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
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
                Fargo, ND
              </span>
              <span className="premium-badge orbitron text-[10px] tracking-[0.15em] border-[var(--cool)] bg-[var(--cool-soft)] text-[var(--cool)]">
                I.T · SERVICES & PRICING
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-[2rem] font-bold leading-[1.2] tracking-tight min-[375px]:text-[2.5rem] sm:text-4xl sm:leading-[1.18] lg:text-[3rem] lg:leading-[1.15] xl:text-5xl"
            >
              <span className="metal-text block">I.T. services</span>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="mt-4 flex items-center gap-3 sm:mt-5 sm:gap-4"
              >
                <span
                  className="h-px w-8 shrink-0 bg-gradient-to-r from-cyan-400/60 to-transparent sm:w-10"
                  aria-hidden
                />
                <span className="text-base font-medium tracking-wide text-[var(--ink)]/95 sm:text-lg sm:tracking-normal lg:text-xl">
                  <span className="text-[var(--cool)]">Quote on request</span>
                  <span className="text-[var(--ink)]/90">—every tech job is different, so we’d rather look first than guess.</span>
                </span>
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-6 border-l-2 border-[var(--cool)] pl-4 text-[15px] leading-[1.6] text-[var(--ink-muted)] sm:mt-7 sm:text-base sm:leading-[1.65]"
            >
              Networks, computers, lost files, smart home. Find the one that sounds like your problem. You’ll have a price before any work starts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7"
            >
              <Link
                href="/quote?for=it"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--cool)] px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-[var(--cool)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base"
              >
                Get a Price
              </Link>
              <Link
                href="/it"
 className="btn-outline inline-flex items-center gap-2 rounded-full border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)] shadow-sm backdrop-blur-sm transition-colors hover:border-[var(--cool)] hover:bg-[var(--cool-soft)] hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Back to I.T.
              </Link>
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
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[var(--cool)] bg-[var(--surface)] ring-1 ring-[var(--rule)] lg:aspect-[16/10]">
              <Image
                src={siteImages.shopFront}
                alt="Manny's Garage on Main Ave S, Fargo ND — where the I.T. work is booked"
                fill
                className="object-cover opacity-90"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--cool)]/15 to-transparent" aria-hidden />
            </div>
          </motion.div>
        </div>

      </section>

      {sections.map((section, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <section
            key={section.id}
            id={section.id}
            className={`relative mx-auto max-w-7xl scroll-mt-28 px-4 pb-20 sm:px-6 lg:px-8 ${!isEven ? "border-t border-[var(--rule)] bg-[var(--surface)]" : ""}`}
          >
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div className={!isEven ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--cool)]/90">{section.stat}</span>
                </div>
                <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">{section.title}</h2>
                <p className="mt-3 text-[var(--ink-muted)] leading-relaxed">{section.description}</p>
                {section.id === "web-dev" ? (
                  <div className="mt-6 rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-6">
                    <p className="text-sm font-semibold uppercase tracking-wider text-[var(--ink-muted)]">Website pricing</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4">
                        <p className="text-sm font-semibold text-[var(--ink)]">Starter Site</p>
                        <p className="mt-1 text-2xl font-bold text-[var(--cool)]">$299</p>
                        <p className="mt-1 text-xs text-[var(--ink-muted)]">Single page · contact form</p>
                        <ul className="mt-3 space-y-1.5 text-xs text-[var(--ink-muted)]">
                          <li>Mobile-friendly layout</li>
                          <li>Click-to-call + map + hours</li>
                          <li>Basic SEO setup (title/description)</li>
                          <li>1 round of edits</li>
                        </ul>
                      </div>
                      <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4">
                        <p className="text-sm font-semibold text-[var(--ink)]">Business Site</p>
                        <p className="mt-1 text-2xl font-bold text-[var(--cool)]">$599</p>
                        <p className="mt-1 text-xs text-[var(--ink-muted)]">Up to 5 pages · basic SEO</p>
                        <ul className="mt-3 space-y-1.5 text-xs text-[var(--ink-muted)]">
                          <li>Starter site features included</li>
                          <li>Services + pricing pages</li>
                          <li>Photo gallery section</li>
                          <li>Google Analytics (optional)</li>
                        </ul>
                      </div>
                      <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4">
                        <p className="text-sm font-semibold text-[var(--ink)]">Online Store</p>
                        <p className="mt-1 text-2xl font-bold text-[var(--cool)]">$999+</p>
                        <p className="mt-1 text-xs text-[var(--ink-muted)]">Products · payments · setup</p>
                        <ul className="mt-3 space-y-1.5 text-xs text-[var(--ink-muted)]">
                          <li>Store setup + checkout</li>
                          <li>Shipping/tax configuration</li>
                          <li>Product categories + collections</li>
                          <li>Training on updates</li>
                        </ul>
                      </div>
                      <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4">
                        <p className="text-sm font-semibold text-[var(--ink)]">Care Plan</p>
                        <p className="mt-1 text-2xl font-bold text-[var(--cool)]">$49/mo</p>
                        <p className="mt-1 text-xs text-[var(--ink-muted)]">Updates · small changes</p>
                        <ul className="mt-3 space-y-1.5 text-xs text-[var(--ink-muted)]">
                          <li>Content updates (text/photos)</li>
                          <li>Minor layout changes</li>
                          <li>Broken link + form checks</li>
                          <li>Priority help</li>
                        </ul>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-[var(--ink-muted)]">
                      Hosting, your domain and any paid tools aren’t in these prices unless we say so. We’ll go over the full total with you before we start.
                    </p>
                  </div>
                ) : (
                  <div className="mt-6 rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-6">
                    <p className="text-sm font-semibold uppercase tracking-wider text-[var(--ink-muted)]">Pricing</p>
                    <p className="mt-2 text-xl font-bold text-[var(--cool)]">Quote on request</p>
                    <p className="mt-2 text-sm text-[var(--ink-muted)]">
                      What it costs depends on your setup. Tell us what you’ve got and we’ll price it, and you get that number before we start.
                    </p>
                  </div>
                )}
                <Link
                  href="/quote?for=it"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-[var(--cool)] bg-[var(--cool-soft)] px-6 py-3 font-semibold text-[var(--cool)] transition-colors hover:bg-[var(--cool-soft)] hover:border-cyan-400 group"
                >
                  Get a Price
                </Link>
              </div>
              <div className={`rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-8 ${!isEven ? "lg:order-1" : ""}`}>
                <p className="text-sm font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
                  What&apos;s included
                </p>
                <ul className="mt-4 text-sm text-[var(--ink-muted)]">
                  {section.includes.map((item, i) => (
                    <li key={i} className="rule-item py-2.5 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}


      <section className="relative mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <p className="measure text-sm text-[var(--ink-muted)]">
          We work with gear like Ubiquiti UniFi, TrueNAS, Home Assistant,
          pfSense and Proxmox when it’s the right fit. If none of those names
          mean anything to you, no worries. That part’s our job.
        </p>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-[var(--rule)] border-[var(--cool)] bg-[var(--surface)] backdrop-blur-sm p-6 sm:p-8">
          <div>
            <h2 className="text-xl font-bold text-[var(--ink)]">Not sure where to start?</h2>
            <p className="mt-1 text-[var(--ink-muted)]">Tell us what’s going on and we’ll come back with a price and a plan.</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/quote?for=it"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--cool)] px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-[var(--cool)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:text-base group"
            >
              Get a Price
            </Link>
            <Link
              href="/it"
 className="btn-outline inline-flex items-center gap-2 rounded-full border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)] shadow-sm backdrop-blur-sm transition-colors hover:border-[var(--cool)] hover:bg-[var(--cool-soft)] hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Back to I.T.
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

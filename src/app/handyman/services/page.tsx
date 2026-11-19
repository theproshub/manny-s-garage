"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BackToHome } from "@/components/back-to-home";

const FURNITURE_PRICE = 50;
const TV_PRICE_PER_INCH = 1.5;
const CAMERA_PRICE = 120;
const TV_MOUNTING_OPTIONS = [32, 43, 55, 65, 75, 85] as const;
const FURNITURE_ITEM_OPTIONS = [1, 2, 3, 4, 5, 6] as const;
const CAMERA_COUNT_OPTIONS = [1, 2, 3, 4, 5, 6] as const;

/* Furniture Assembly has no picture any more, and that is deliberate.

   Every photograph this section ran — the living room, the tool flat-lay,
   the man drilling a frame — was pulled at the client's request. What was
   left in the library were the `hero-*` banners, which are marketing
   collages with a cartoon mascot and a service list baked into the pixels
   (see docs/service-photography.md), and a photograph of a mounted TV,
   which is the section below's job and not this one's.

   So the section runs as one column of text and pricing rather than
   captioning a wrong picture "Furniture Assembly". Put the panel back when
   a real photograph of an assembled piece exists. */

const TV_SLIDES = ["/services/tv.webp"];
const TV_SLIDE_DURATION_MS = 4500;

const CAMERA_SLIDES = [
  "/services/cameras.webp",
  "/hero/handyman-security-camera.webp",
  "/services/cameras.webp",
];
const CAMERA_SLIDE_DURATION_MS = 4500;

const furnitureIncludes = [
  "Beds, bed frames and headboards",
  "Dressers, nightstands and chests of drawers",
  "Bookshelves and storage cabinets",
  "Desks and anything for the office",
  "Closet systems and armoires",
  "Boxed furniture from any store, IKEA included",
  "Leveled up, with every bolt tightened",
  "We take the boxes and packaging away with us",
];

const tvIncludes = [
  "Full-motion, tilting or fixed mounts — bring your own or ask us to price one",
  "We find the studs and anchor it properly",
  "Cables tucked away out of sight",
  "Hooked up to whatever you already have",
  "Leveled, and set exactly where you want it",
  "Up to 85 inches; anything bigger, just ask",
];

const cameraIncludes = [
  "Indoors or out, wherever you want the view",
  "Mounted into brick, siding or soffit",
  "Power and network cable run, up to 30 ft from an outlet or your router",
  "Set up on your phone before we leave",
  "Recording and motion alerts switched on for you",
  "Priced per camera. Ask us if you want several",
];

const HANDYMAN_SERVICES_HERO_IMAGES = [
  "/services/cameras.webp",
  "/hero/hero-handyman-services.webp",
];
const HERO_SLIDE_DURATION_MS = 4500;
const handymanServicesHeroLabels = [
  "Security cameras",
  "Handyman services",
];

export default function HandymanServicesPage() {
  const [tvSlideIndex, setTvSlideIndex] = useState(0);
  const [cameraSlideIndex, setCameraSlideIndex] = useState(0);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  useEffect(() => {
    if (carouselPaused) return;
    const t = setInterval(() => {
      setHeroSlideIndex((i) => (i + 1) % HANDYMAN_SERVICES_HERO_IMAGES.length);
    }, HERO_SLIDE_DURATION_MS);
    return () => clearInterval(t);
  }, [carouselPaused]);

  useEffect(() => {
    const t = setInterval(() => {
      setTvSlideIndex((i) => (i + 1) % TV_SLIDES.length);
    }, TV_SLIDE_DURATION_MS);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setCameraSlideIndex((i) => (i + 1) % CAMERA_SLIDES.length);
    }, CAMERA_SLIDE_DURATION_MS);
    return () => clearInterval(t);
  }, []);

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
              <span className="premium-badge badge-orange orbitron text-[10px] tracking-[0.15em]">
                HANDYMAN · SERVICES & PRICING
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-[2rem] font-bold leading-[1.2] tracking-tight min-[375px]:text-[2.5rem] sm:text-4xl sm:leading-[1.18] lg:text-[3rem] lg:leading-[1.15] xl:text-5xl"
            >
              <span className="metal-text block">Handyman pricing</span>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="mt-4 flex items-center gap-3 sm:mt-5 sm:gap-4"
              >
                <span
                  className="h-px w-8 shrink-0 bg-gradient-to-r from-orange-400/60 to-transparent sm:w-10"
                  aria-hidden
                />
                <span className="text-base font-medium tracking-wide text-[var(--ink)]/95 sm:text-lg sm:tracking-normal lg:text-xl">
                  <span className="text-[var(--accent-strong)]">Fixed rates</span>
                  <span className="text-[var(--ink)]/90">—furniture, TV mounting and security cameras. The price you see is the price you pay.</span>
                </span>
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-6 border-l-2 border-[var(--accent)] pl-4 text-[15px] leading-[1.6] text-[var(--ink-muted)] sm:mt-7 sm:text-base sm:leading-[1.65]"
            >
              Here’s what comes with each job. Take a look, then pick a time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7"
            >
              <Link
                href="/book/handyman"
                className="btn-primary inline-flex items-center justify-center gap-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Book Online
              </Link>
              <Link
                href="/quote?for=handyman"
                className="btn-outline inline-flex items-center gap-1.5 rounded-full border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)] shadow-sm backdrop-blur-sm transition-colors hover:border-[var(--rule)] hover:bg-[var(--surface)] hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                All Prices
              </Link>
            </motion.div>
          </div>

          {/* Right: Image carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="hero-image-wrap order-1 lg:order-2"
          >
            <div className="hero-glow" aria-hidden />
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--surface)] ring-1 ring-[var(--rule)] lg:aspect-[16/10]"
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => setCarouselPaused(false)}
              onFocus={() => setCarouselPaused(true)}
              onBlur={() => setCarouselPaused(false)}
            >
              <div
                aria-live="polite"
                aria-label={`Slide ${heroSlideIndex + 1}: ${handymanServicesHeroLabels[heroSlideIndex] ?? "Handyman pricing"}`}
                className="sr-only"
              />
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={heroSlideIndex}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={HANDYMAN_SERVICES_HERO_IMAGES[heroSlideIndex]}
                    alt={`Handyman services & pricing — ${handymanServicesHeroLabels[heroSlideIndex] ?? "Handyman pricing"}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={heroSlideIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="img-side-overlay z-10" />
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center sm:bottom-5 sm:left-5 sm:right-5">
                <div className="flex gap-2">
                  {HANDYMAN_SERVICES_HERO_IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setHeroSlideIndex(idx)}
                      className={`rounded-full transition-all duration-300 ${
                        idx === heroSlideIndex ? "h-2 w-8 bg-orange-400" : "h-2 w-2 bg-[var(--surface)] hover:bg-[var(--surface)]"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                      aria-current={idx === heroSlideIndex ? "true" : undefined}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </section>

      {/* Furniture Assembly */}
      <section id="furniture" className="relative mx-auto max-w-7xl scroll-mt-28 px-4 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div>
            <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">Furniture Assembly</h2>
            <p className="mt-3 text-[var(--ink-muted)] leading-relaxed">
              Beds, dressers, nightstands, cabinets, bookshelves. We&apos;ll put it together so you don&apos;t have to, and the boxes leave with us.
            </p>
            <div className="mt-6 rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-[var(--ink-muted)]">Pricing</p>
              <p className="mt-2 text-3xl font-bold text-[var(--accent-strong)]">${FURNITURE_PRICE} <span className="text-lg font-normal text-[var(--ink-muted)]">per item</span></p>
              <p className="mt-2 text-sm text-[var(--ink-muted)]">More than one piece in the same visit? Same rate each. If something’s really big, we’ll price it with you first.</p>
              <div className="mt-4">
                <p className="text-sm font-medium text-[var(--ink)] mb-2">Select item count</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {FURNITURE_ITEM_OPTIONS.map((count) => {
                    const price = (count * FURNITURE_PRICE).toFixed(2);
                    return (
                      <div
                        key={count}
                        className="min-h-[44px] rounded-xl border border-[var(--rule)] bg-[var(--surface)] px-4 py-3 text-left"
                      >
                        <p className="text-sm font-bold text-[var(--ink)]">{count} {count === 1 ? "item" : "items"}</p>
                        <p className="text-xs font-semibold text-[var(--accent-strong)]">${price}</p>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs text-[var(--ink-muted)]">
                  More than six? Book anyway and tell us in the notes — we&apos;ll confirm your total before we start.
                </p>
              </div>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-[var(--ink-muted)]">
              {furnitureIncludes.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/book/handyman"
 className="btn-primary group mt-8 inline-flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Book Online
            </Link>
          </div>
        </div>
      </section>

      {/* TV Mounting */}
      <section id="tv-mounting" className="relative border-y border-[var(--rule)] bg-[var(--surface)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">TV Mounting</h2>
              <p className="mt-3 text-[var(--ink-muted)] leading-relaxed">
                We find the studs, hang it straight, and hide the cables. Full-motion, tilting or fixed, on drywall or studs.
              </p>
              <div className="mt-6 rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-[var(--ink-muted)]">Pricing</p>
                <p className="mt-2 text-3xl font-bold text-[var(--accent-strong)]">${TV_PRICE_PER_INCH.toFixed(2)} <span className="text-lg font-normal text-[var(--ink-muted)]">per inch (diagonal)</span></p>
                <p className="mt-2 text-sm text-[var(--ink-muted)]">Price goes by screen size, so a 55&quot; runs ${(55 * TV_PRICE_PER_INCH).toFixed(2)}. The bracket isn’t included unless we say so.</p>
                <div className="mt-4">
                  <p className="text-sm font-medium text-[var(--ink)] mb-2">Select your TV size</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {TV_MOUNTING_OPTIONS.map((size) => {
                      const price = (size * TV_PRICE_PER_INCH).toFixed(2);
                      return (
                        <div
                          key={size}
                          className="min-h-[44px] rounded-xl border border-[var(--rule)] bg-[var(--surface)] px-4 py-3 text-left"
                        >
                          <p className="text-sm font-bold text-[var(--ink)]">{size}&quot;</p>
                          <p className="text-xs font-semibold text-[var(--accent-strong)]">${price}</p>
                        </div>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-xs text-[var(--ink-muted)]">
                    Don&apos;t see your size? Book anyway and tell us in the notes — we&apos;ll confirm your total before we start.
                  </p>
                </div>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-[var(--ink-muted)]">
              {tvIncludes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/book/handyman"
 className="btn-primary group mt-8 inline-flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Book Online
              </Link>
            </div>
            <motion.div
              className="relative order-1 lg:order-2 aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--surface)]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={tvSlideIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={TV_SLIDES[tvSlideIndex]}
                    alt="TV mounting service"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <span className="font-bold text-white text-lg">TV Mounting</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Cameras */}
      <section id="security-cameras" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <motion.div
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--surface)]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={cameraSlideIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={CAMERA_SLIDES[cameraSlideIndex]}
                  alt="Security camera installation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <span className="font-bold text-white text-lg">Security Camera Installation</span>
            </div>
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">Security Camera Installation</h2>
            <p className="mt-3 text-[var(--ink-muted)] leading-relaxed">
              We put the cameras where they see what you need, run the cable, and set the app up before we go.
            </p>
            <div className="mt-6 rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-[var(--ink-muted)]">Pricing</p>
              <p className="mt-2 text-3xl font-bold text-[var(--accent-strong)]">${CAMERA_PRICE}</p>
              <p className="mt-2 text-sm text-[var(--ink-muted)]">That covers mounting, the cable run, and getting the app working. You buy the cameras and recorder, or we can price them for you.</p>
              <div className="mt-4">
                <p className="text-sm font-medium text-[var(--ink)] mb-2">Select camera count</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {CAMERA_COUNT_OPTIONS.map((count) => {
                    const price = (count * CAMERA_PRICE).toFixed(2);
                    return (
                      <div
                        key={count}
                        className="min-h-[44px] rounded-xl border border-[var(--rule)] bg-[var(--surface)] px-4 py-3 text-left"
                      >
                        <p className="text-sm font-bold text-[var(--ink)]">{count} {count === 1 ? "camera" : "cameras"}</p>
                        <p className="text-xs font-semibold text-[var(--accent-strong)]">${price}</p>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs text-[var(--ink-muted)]">
                  More than six cameras? Book anyway and tell us in the notes — we&apos;ll confirm your total before we start.
                </p>
              </div>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-[var(--ink-muted)]">
              {cameraIncludes.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/book/handyman"
 className="btn-primary group mt-8 inline-flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Book Online
            </Link>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-[var(--rule)] bg-[var(--surface)] backdrop-blur-sm p-6 sm:p-8">
          <div>
            <h2 className="text-xl font-bold text-[var(--ink)]">Something not on the list?</h2>
            <p className="mt-1 text-[var(--ink-muted)]">Stack a few jobs together, or ask about something you don’t see here. Just tell us in the notes when you book.</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/book/handyman"
 className="btn-primary group inline-flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Book Online
            </Link>
            <Link
              href="/handyman"
 className="btn-outline inline-flex items-center gap-2 rounded-full border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)] shadow-sm backdrop-blur-sm transition-colors hover:border-[var(--rule)] hover:bg-[var(--surface)] hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Back to Handyman
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

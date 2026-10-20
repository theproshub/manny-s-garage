"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { handymanServiceSchema } from "@/lib/schema";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { ServiceStandardsSection } from "@/components/service-standards-section";
import { BackToHome } from "@/components/back-to-home";

/** Handyman hero slides (new portfolio + stock), shuffled order */
const HANDYMAN_HERO_IMAGES = [
  "/services/tv.webp",
  "/services/assembly.webp",
  "/services/cameras.webp",
  "/hero/handyman-security-camera.webp",
  "/services/furniture.webp",
  "/services/furniture.webp",
  "/services/assembly.webp",
  "/hero/handyman-furniture.webp",
  "/services/tv.webp",
  "/hero/handyman-security-camera.webp",
  "/hero/hero-handyman.webp",
  "/hero/hero-handyman-service-list.webp",
];
const HERO_SLIDE_DURATION_MS = 4500;

type HandymanServiceItem = {
  title: string;
  /** Price and duration shown on the right (e.g. "$50 ・ 1 hr 30 min+"). */
  details: string;
  href: string;
  subtitle?: string;
};

const SERVICES_LIST: HandymanServiceItem[] = [
  {
    title: "Furniture Assembly",
    details: "$50 ・ 1 hr 30 min+",
    href: "https://book.squareup.com/appointments/oes899qrhoj8mt/location/L6S9GY1Z49K39/services/PG7XPCFE4CPARQ6FUDEJW6RS",
  },
  {
    title: "TV Mounting",
    subtitle: "Full Motion, Fixed, Swivel, Tilting Mounts",
    details: "$50 ・ 1 hr",
    href: "https://book.squareup.com/appointments/oes899qrhoj8mt/location/L6S9GY1Z49K39/services/M2YUQDN2RI423A5BOIZ5ETNE",
  },
  {
    title: "General Assembly",
    subtitle: "Vanity Mirror, Shoe Rack, Computer Desk, TV Stand.",
    details: "$65 ・ 45 min+",
    href: "https://book.squareup.com/appointments/oes899qrhoj8mt/location/L6S9GY1Z49K39/services/LCVWYFYVCL6JMM3PJYKN5OOY",
  },
  {
    title: "General Mounting",
    subtitle: "Fire Place, Floating TV Stand, Shelves, Window Curtain, Picture Frames",
    details: "$30 ・ 30 min+",
    href: "https://book.squareup.com/appointments/oes899qrhoj8mt/location/L6S9GY1Z49K39/services/DFOYDSFKCJIUCFO55X6KPQT2",
  },
  {
    title: "Security Camera Installation",
    subtitle: "POE, Analog & Wired Cameras",
    details: "$120 ・ 1 hr 30 min+",
    href: "https://book.squareup.com/appointments/oes899qrhoj8mt/location/L6S9GY1Z49K39/services/HBHVTO4FFIR72Z7TXFQ35Y5Q",
  },
  {
    title: "Office, Home & Entertainment",
    subtitle: "Gaming Room, Home Office, LED Lights, & Home Entertainment",
    details: "$80 ・ 45 min+",
    href: "https://book.squareup.com/appointments/oes899qrhoj8mt/location/L6S9GY1Z49K39/services/KRXFADU6JYBDCUM5ZS6PJ3CC",
  },
];

const handymanHeroSlideLabels = [
  "TV & Media",
  "TV Mounting",
  "Smart Lighting",
  "Home Installs",
  "Projector & Screen",
  "Security & Cameras",
  "Home Theater",
  "Bedroom Setup",
  "Professional Install",
  "LED & Mood Lighting",
  "Handyman Service",
  "Fargo Handyman",
  "Handyman Service List",
];

export default function HandymanPage() {
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  useEffect(() => {
    if (carouselPaused) return;
    const t = setInterval(() => {
      setHeroSlideIndex((i) => (i + 1) % HANDYMAN_HERO_IMAGES.length);
    }, HERO_SLIDE_DURATION_MS);
    return () => clearInterval(t);
  }, [carouselPaused]);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <JsonLd data={handymanServiceSchema()} />
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
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-[2rem] font-bold leading-[1.2] tracking-tight min-[375px]:text-[2.5rem] sm:text-4xl sm:leading-[1.18] lg:text-[3rem] lg:leading-[1.15] xl:text-5xl"
            >
              <span className="metal-text block">Handyman</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-5 text-[15px] leading-[1.6] text-[var(--ink)] sm:mt-6 sm:text-base sm:leading-[1.7]"
            >
              TV mounting, security cameras, furniture assembly, and more. Browse handyman services and book right here on our site.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7"
            >
              <Link
                href="/book/handyman"
 className="btn-outline inline-flex items-center justify-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                View Services
              </Link>
              <Link
                href="/book/handyman"
 className="btn-primary inline-flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Book online
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
                aria-label={`Slide ${heroSlideIndex + 1}: ${handymanHeroSlideLabels[heroSlideIndex] ?? "Handyman Service"}`}
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
                    src={HANDYMAN_HERO_IMAGES[heroSlideIndex]}
                    alt={`Handyman services in Fargo, ND — ${handymanHeroSlideLabels[heroSlideIndex] ?? "Handyman Service"}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={70}
                    priority={heroSlideIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="img-side-overlay z-10" />
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center sm:bottom-5 sm:left-5 sm:right-5">
                <div className="flex gap-2">
                  {HANDYMAN_HERO_IMAGES.map((_, idx) => (
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 sm:bottom-6 lg:bottom-8"
        >
          <Link
            href="/book/handyman"
            className="hero-scroll-hint flex flex-col items-center gap-1.5 text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-md"
            aria-label="See handyman services and book"
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest">See Services</span>
          </Link>
        </motion.div>
      </section>

      {/* Services & Pricing — simple list */}
      <section className="relative mx-auto max-w-7xl scroll-mt-28 px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <SectionHeading
          title="Handyman services and prices"
          description="Our handyman menu with starting prices below. Book on our site."
        />
        <motion.div
          className="mt-8 sm:mt-10 rounded-2xl border border-[var(--rule)] bg-[var(--surface)] overflow-hidden"
        >
          <ul className="divide-y divide-[var(--rule)]">
            {SERVICES_LIST.map((service) => (
              <li key={service.title}>
                <Link
                  href={service.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5 text-left transition-colors hover:bg-[var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-inset"
                >
                  <span className="max-w-2xl">
                    <span className="block font-medium text-[var(--ink)]">{service.title}</span>
                    {service.subtitle ? <span className="mt-0.5 block text-sm text-[var(--ink-muted)]">{service.subtitle}</span> : null}
                  </span>
                  <span className="font-semibold text-[var(--accent-strong)]">{service.details}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Fixed pricing — one page, tap a price */}
      <section id="calculator" className="relative border-y border-[var(--rule)] bg-[var(--surface)] py-16 sm:py-20 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            title="Book handyman work"
            description="Pick the service and the appointment time, without leaving our site."
          />
          <motion.div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/book/handyman"
              className="btn-outline group inline-flex w-full max-w-xs items-center justify-center gap-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:w-auto"
            >
              See All Services
            </Link>
            <Link
              href="/book/handyman"
              className="btn-primary inline-flex w-full max-w-xs items-center justify-center gap-1.5 rounded-full border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)] shadow-sm backdrop-blur-sm transition-colors hover:border-[var(--rule)] hover:bg-[var(--surface)] hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:w-auto"
            >
              Book online
            </Link>
          </motion.div>
        </div>
      </section>

      <ServiceStandardsSection variant="handyman" />
    </main>
  );
}

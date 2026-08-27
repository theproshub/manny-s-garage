"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { RotorMark, LevelMark, LiftMark, RouterMark } from "./service-marks";

/**
 * Every service the shop offers, one at a time, led by what you can get done
 * rather than by a price. Prices live in the picker further down.
 *
 * `image` is optional on purpose. Photography is being added service by
 * service; a slide without one still reads as a finished slide rather than a
 * broken one, because the ground is the same either way and the picture is
 * texture behind it, never the thing carrying the message.
 *
 * No visible controls, by request. Advancing stops on hover, on keyboard focus
 * anywhere inside the region, and entirely under prefers-reduced-motion.
 */
type Slide = {
  id: string;
  mark: typeof RotorMark;
  headline: string;
  body: string;
  where: string;
  href: string;
  image?: string;
  alt?: string;
};

const SHOP = "At our shop on Main Ave S";
const YOURS = "We come to your address";

const SLIDES: Slide[] = [
  {
    id: "oil", mark: RotorMark, href: "/auto", where: SHOP,
    headline: "Get your oil changed today.",
    body: "Full synthetic, a new filter, and we check your fluid levels while we are in there.",
    image: "/services/oil-change.webp",
    alt: "A mechanic draining engine oil from a car raised on a two-post lift",
  },
  {
    id: "brakes", mark: RotorMark, href: "/auto", where: SHOP,
    headline: "Get your brakes done today.",
    body: "New pads on one axle, fitted and road tested, with the whole system checked over.",
  },
  {
    id: "battery", mark: RotorMark, href: "/auto", where: SHOP,
    headline: "Get a new battery today.",
    body: "We test yours first. If it is still good, we say so and you keep it.",
  },
  {
    id: "diag", mark: RotorMark, href: "/auto", where: SHOP,
    headline: "Find out what that light means.",
    body: "We read the fault and explain it in plain words. Free if we do the repair.",
    image: "/services/check-engine.webp",
    alt: "A technician reading a diagnostic scanner plugged into a car dashboard",
  },
  {
    id: "roadside", mark: RotorMark, href: "/auto", where: YOURS,
    headline: "Broken down? We will come out.",
    body: "Jump start, tire change, or a tow back to the shop, anywhere in Fargo.",
  },
  {
    id: "tv", mark: LevelMark, href: "/handyman", where: YOURS,
    headline: "Get your TV on the wall today.",
    body: "Measured, mounted and levelled, using the bracket that came with it.",
  },
  {
    id: "furniture", mark: LevelMark, href: "/handyman", where: YOURS,
    headline: "Get it built today.",
    body: "Flat-pack furniture and bunk beds put together, squared up, and put where you want them.",
  },
  {
    id: "blinds", mark: LevelMark, href: "/handyman", where: YOURS,
    headline: "Get your blinds up today.",
    body: "Measured, drilled and hung straight, on as many windows as you need.",
  },
  {
    id: "cameras", mark: LevelMark, href: "/handyman", where: YOURS,
    headline: "Get your cameras up today.",
    body: "Mounted, wired, and set up on your phone before we leave.",
    image: "/services/cameras.webp",
    alt: "A technician on a ladder fitting a security camera under the eaves of a house",
  },
  {
    id: "bay", mark: LiftMark, href: "/diy-garage", where: SHOP,
    headline: "Work on it yourself today.",
    body: "Rent the bay, the lift and the tools by the hour. Add a mechanic if you get stuck.",
  },
  {
    id: "wifi", mark: RouterMark, href: "/it", where: YOURS,
    headline: "Get your Wi-Fi working today.",
    body: "Routers, extenders and mesh — a signal in the rooms that never had one.",
  },
  {
    id: "computer", mark: RouterMark, href: "/it", where: YOURS,
    headline: "Get your computer fixed.",
    body: "Slow machines, ones that will not start, files recovered, or a move to a new device.",
  },
  {
    id: "website", mark: RouterMark, href: "/it", where: YOURS,
    headline: "Get your website built.",
    body: "We agree the price first, build it, and hand it over to you.",
  },
  {
    id: "reports", mark: RouterMark, href: "/it", where: YOURS,
    headline: "Get your numbers in order.",
    body: "Spreadsheets, dashboards and reports for a small business that needs them in one place.",
  },
];

const INTERVAL = 6000;
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getReduced = () => window.matchMedia(REDUCED_QUERY).matches;
const getReducedOnServer = () => false;

export function ServiceSlides() {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, getReducedOnServer);
  const running = !held && !reduced;

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [running, next]);

  const slide = SLIDES[index];
  const Mark = slide.mark;

  return (
    <section
      className="slides"
      aria-roledescription="carousel"
      aria-label="What we can do for you"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <div className="slides-stage" aria-live="polite">
        {slide.image ? (
          <Image
            key={`${slide.id}-img`}
            src={slide.image}
            alt={slide.alt ?? ""}
            fill
            sizes="(max-width: 62rem) 100vw, 50vw"
            className="slide-photo"
            priority={index === 0}
          />
        ) : null}
        <div className="slide-scrim" aria-hidden />

        <div className="slide" key={slide.id}>
          <Mark className="slide-icon" />
          <h2 className="slide-headline">{slide.headline}</h2>
          <p className="slide-body">{slide.body}</p>
          <p className="slide-where">{slide.where}</p>
          <Link href={slide.href} className="btn-primary slide-cta">
            See what it costs
          </Link>
        </div>
      </div>
    </section>
  );
}

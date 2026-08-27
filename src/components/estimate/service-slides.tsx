"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { RotorMark, LevelMark, LiftMark, RouterMark } from "./service-marks";

/**
 * The four services, one at a time, led by what you can actually get done
 * rather than by a price. Prices live in the picker further down; the hero's
 * job is to make it obvious there is something here for you.
 *
 * There are no visible controls, by request. Advancing still stops on hover,
 * on keyboard focus anywhere inside the region, and entirely when the visitor
 * has asked for reduced motion — so it never pulls content away from someone
 * mid-read or mid-tab.
 */
const SLIDES = [
  {
    id: "car",
    mark: RotorMark,
    headline: "Get your car fixed today.",
    body: "Oil changes, brakes, batteries, and finding out what that warning light means.",
    where: "At our shop on Main Ave S",
    href: "/auto",
  },
  {
    id: "house",
    mark: LevelMark,
    headline: "Get your TV on the wall today.",
    body: "TVs mounted, furniture built, blinds hung, security cameras set up.",
    where: "We come to your address",
    href: "/handyman",
  },
  {
    id: "bay",
    mark: LiftMark,
    headline: "Work on it yourself today.",
    body: "Rent the bay, the lift and the tools by the hour. Add a mechanic if you get stuck.",
    where: "At our shop on Main Ave S",
    href: "/diy-garage",
  },
  {
    id: "tech",
    mark: RouterMark,
    headline: "Get your Wi-Fi working today.",
    body: "Routers and dead spots, computers that will not start, websites and reports.",
    where: "We come to your address",
    href: "/it",
  },
];

const INTERVAL = 6000;

/* Reduced-motion is an external store, so it is read with the primitive meant
   for one. Setting state from an effect on mount triggers a cascading render. */
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

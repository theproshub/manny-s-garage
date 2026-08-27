"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { CarFront, Hammer, Warehouse, Wifi, Pause, Play } from "lucide-react";

/**
 * The four services, one at a time, led by what you can actually get done
 * rather than by a price. Prices live in the picker further down; the hero's
 * job is to make it obvious there is something here for you.
 *
 * Auto-advance stops on hover, on keyboard focus, and entirely when the
 * visitor has asked for reduced motion. The controls are named rather than
 * anonymous dots, so they double as navigation and read properly aloud.
 */
const SLIDES = [
  {
    id: "car",
    icon: CarFront,
    tab: "Car repair",
    headline: "Get your car fixed today.",
    body: "Oil changes, brakes, batteries, and finding out what that warning light means.",
    where: "At our shop on Main Ave S",
    href: "/auto",
  },
  {
    id: "house",
    icon: Hammer,
    tab: "House jobs",
    headline: "Get your TV on the wall today.",
    body: "TVs mounted, furniture built, blinds hung, security cameras set up.",
    where: "We come to your address",
    href: "/handyman",
  },
  {
    id: "bay",
    icon: Warehouse,
    tab: "Rent a bay",
    headline: "Work on it yourself today.",
    body: "Rent the bay, the lift and the tools by the hour. Add a mechanic if you get stuck.",
    where: "At our shop on Main Ave S",
    href: "/diy-garage",
  },
  {
    id: "tech",
    icon: Wifi,
    tab: "Tech help",
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
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, getReducedOnServer);
  const running = playing && !held && !reduced;

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [running, next]);

  const slide = SLIDES[index];
  const Icon = slide.icon;

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
          <Icon className="slide-icon" strokeWidth={1.5} aria-hidden />
          <h2 className="slide-headline">{slide.headline}</h2>
          <p className="slide-body">{slide.body}</p>
          <p className="slide-where">{slide.where}</p>
          <Link href={slide.href} className="btn-primary slide-cta">
            See what it costs
          </Link>
        </div>
      </div>

      <div className="slides-controls">
        <div role="tablist" aria-label="Choose a service" className="slides-tabs">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === index}
              onClick={() => {
                setIndex(i);
                setPlaying(false);
              }}
              className={`slides-tab ${i === index ? "is-on" : ""}`}
            >
              {s.tab}
            </button>
          ))}
        </div>

        <button
          onClick={() => setPlaying((p) => !p)}
          className="slides-play"
          disabled={reduced}
          aria-label={running ? "Stop changing automatically" : "Change automatically"}
        >
          {running ? <Pause className="slides-play-icon" aria-hidden /> : <Play className="slides-play-icon" aria-hidden />}
        </button>
      </div>
    </section>
  );
}

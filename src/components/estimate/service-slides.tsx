"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Image from "next/image";

/**
 * The work, one photograph at a time. Pictures only, by request: each slide
 * used to carry a headline, a sentence, a location and a button, and that copy
 * was removed rather than restyled. The opening beside it already names all
 * four trades and prices them, so the panel was saying it a second time.
 *
 * The pictures therefore have to carry themselves, which is why `alt` is the
 * one piece of text left: it is the only description a screen reader gets.
 *
 * **These are real photographs.** The set was fourteen generated images until
 * a close look found invented text on them — a bottle label reading "ZΠOUZ", a
 * diagnostic screen of gibberish under a keypad of nonsense glyphs. Anything
 * that betrays itself as generated costs the site the exact thing this design
 * exists to buy, so the whole set came out and these five Unsplash photographs
 * went in. Credits are recorded in `docs/service-photography.md`.
 *
 * Two consequences, both real and both worth knowing before extending this:
 * these frames are objects and rooms rather than people at work, and **I.T.
 * has no photograph at all** — the library had nothing for it. Four slides for
 * four equal trades is the shape to get back to.
 *
 * One control, forward only. There is no progress rail and no counter: the
 * order is shuffled per visit, so "03/05" would be counting a sequence the
 * reader has no way to navigate back through and no reason to complete.
 *
 * Advancing stops on hover, on keyboard focus anywhere inside the region, and
 * entirely under prefers-reduced-motion.
 */
type Slide = {
  id: string;
  image?: string;
  alt?: string;
};

const SLIDES: Slide[] = [
  {
    id: "brakes",
    image: "/hero/auto-brake-suspension.webp",
    alt: "A brake disc, caliper and hub assembly",
  },
  {
    id: "diag",
    image: "/hero/auto-engine-bay.webp",
    alt: "The engine bay of a car with the hood raised",
  },
  {
    id: "bay",
    image: "/hero/diy-garage-bay.webp",
    alt: "A car raised on lifts in a workshop bay",
  },
  {
    id: "furniture",
    image: "/hero/handyman-furniture.webp",
    alt: "A living room with an assembled sofa, coffee table and dining set",
  },
  {
    id: "cameras",
    image: "/hero/handyman-security-camera.webp",
    alt: "A security camera mounted high on a brick wall",
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

/** Hydration probe: false while server-rendering, true once the client owns it. */
const subscribeNever = () => () => {};
const getTrue = () => true;
const getFalse = () => false;

const CATALOG_ORDER = SLIDES.map((_, i) => i);

/** Fisher-Yates. Returns a new array; never mutates the module-level catalog. */
function shuffled(length: number): number[] {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

export function ServiceSlides() {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, getReducedOnServer);
  const running = !held && !reduced;

  /**
   * Catalog order while server-rendering and through hydration, shuffled once
   * the client owns the tree. Shuffling during the first render would make the
   * server and client disagree on which photograph is first — a hydration
   * mismatch — and shuffling in an effect would set state synchronously on
   * mount and cascade a second render. `useSyncExternalStore` reports
   * hydration instead, and the memo keeps the order stable across every
   * subsequent render rather than reshuffling under the reader.
   */
  const hydrated = useSyncExternalStore(subscribeNever, getTrue, getFalse);
  const order = useMemo(
    () => (hydrated ? shuffled(SLIDES.length) : CATALOG_ORDER),
    [hydrated],
  );

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [running, next]);

  const slide = SLIDES[order[index]];

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
      <div
        className="slides-stage"
        aria-live="polite"
      >
        {/*
          `sizes` is measured, not guessed. The panel is the 1.05fr half of a
          1fr/1.05fr grid inside `.ledger` (max 74rem, 1.5rem padding a side,
          3rem gap): (min(1184, vw) - 96) x 0.512. That is 473px at a 1024
          viewport, where the old `34vw` claimed 348 — so the browser chose the
          750w candidate for a slot needing 947 device px on a 2x screen and
          upscaled it 1.26x. 48vw covers the 62-74rem band; past 74rem the
          column stops growing at 557px.
        */}
        {slide.image ? (
          <figure className="slide-figure" key={`${slide.id}-img`}>
            <Image
              src={slide.image}
              alt={slide.alt ?? ""}
              fill
              sizes="(max-width: 62rem) 100vw, (max-width: 74rem) 48vw, 560px"
              className="slide-photo"
              priority={index === 0}
            />
          </figure>
        ) : null}
      </div>

      <button type="button" className="slide-next" onClick={next}>
        <span className="sr-only">Next photograph</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M4 12h15M13 6l6 6-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
          />
        </svg>
      </button>
    </section>
  );
}

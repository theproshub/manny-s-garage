"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
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
 * exists to buy, so the whole set came out and nine Unsplash photographs went
 * in, cut from their full-resolution masters. Credits are recorded in
 * `docs/service-photography.md`.
 *
 * **I.T. still has no photograph.** The four trades are equal peers everywhere
 * else on this site; here it is three Automotive, five Handyman, one DIY and
 * nothing for Tech help, because the library holds nothing for it that is not
 * stamped with someone else's brand. That imbalance is a known debt, not a
 * decision — see `docs/service-photography.md`.
 *
 * No progress rail and no counter: the order is shuffled per visit, so "03/05"
 * would be counting a sequence the reader has no reason to complete.
 *
 * **The arrow is gone; the photograph is dragged instead.** Removing the only
 * button would have left anyone not on a touchscreen with no control at all,
 * so this is Pointer Events rather than touch handlers — one code path that
 * covers finger, mouse drag and pen — with Left/Right arrow keys for the
 * keyboard. `touch-action: pan-y` keeps the page scrolling vertically while
 * the horizontal axis belongs to the slideshow.
 *
 * Advancing stops on hover, on keyboard focus anywhere inside the region,
 * while a drag is in progress, and entirely under prefers-reduced-motion.
 */
type Slide = {
  id: string;
  image?: string;
  alt?: string;
};

const SLIDES: Slide[] = [
  {
    id: "brakes",
    image: "/services/brakes.webp",
    alt: "A brake disc, caliper and hub assembly",
  },
  {
    id: "engine",
    image: "/services/engine.webp",
    alt: "The engine bay of a car with the hood raised",
  },
  {
    id: "diag",
    image: "/services/diag.webp",
    alt: "A check engine light lit on a car's instrument panel",
  },
  {
    id: "bay",
    image: "/services/bay.webp",
    alt: "A car raised on lifts in a workshop bay",
  },
  {
    id: "assembly",
    image: "/services/assembly.webp",
    alt: "A handyman drilling into a white timber frame",
  },
  {
    id: "tools",
    image: "/services/tools.webp",
    alt: "A cordless drill, hammer, bits and screws laid out on a workbench",
  },
  {
    id: "tv",
    image: "/services/tv.webp",
    alt: "A living room with a television mounted on the wall above a sideboard",
  },
  {
    id: "furniture",
    image: "/services/furniture.webp",
    alt: "A living room with an assembled sofa, coffee table and dining set",
  },
  {
    id: "cameras",
    image: "/services/cameras.webp",
    alt: "A security camera mounted high on a brick wall",
  },
];

const INTERVAL = 6000;

/** How far a drag must travel to count as a swipe rather than a stray tap. */
const SWIPE_THRESHOLD = 44;
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
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState(0);
  const startX = useRef<number | null>(null);
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, getReducedOnServer);
  const running = !held && !dragging && !reduced;

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

  const go = useCallback(
    (step: number) => setIndex((i) => (i + step + SLIDES.length) % SLIDES.length),
    [],
  );
  const next = useCallback(() => go(1), [go]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [running, next]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    /* Ignore secondary mouse buttons; a right-click is not a swipe. */
    if (e.pointerType === "mouse" && e.button !== 0) return;
    startX.current = e.clientX;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    setOffset(e.clientX - startX.current);
  };

  /**
   * Also bound to pointercancel: the browser takes the pointer away when it
   * decides the gesture is a page scroll, and without this the photograph
   * would stay parked wherever the finger left it.
   */
  const onPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const travelled = e.clientX - startX.current;
    startX.current = null;
    setOffset(0);
    setDragging(false);
    if (Math.abs(travelled) >= SWIPE_THRESHOLD) go(travelled < 0 ? 1 : -1);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  const slide = SLIDES[order[index]];

  return (
    <section
      className="slides"
      aria-roledescription="carousel"
      aria-label="What we can do for you"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <div
        className={`slides-stage${dragging ? " is-dragging" : ""}`}
        aria-live="polite"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
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
          <figure
            className="slide-figure"
            key={`${slide.id}-img`}
            style={offset ? { transform: `translateX(${offset}px)` } : undefined}
          >
            <Image
              src={slide.image}
              alt={slide.alt ?? ""}
              fill
              sizes="(max-width: 62rem) 100vw, (max-width: 74rem) 48vw, 560px"
              className="slide-photo"
              priority={index === 0}
              draggable={false}
            />
          </figure>
        ) : null}
      </div>
    </section>
  );
}

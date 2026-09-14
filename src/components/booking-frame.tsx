"use client";

import { useEffect, useState } from "react";
import type { BookingDestination } from "@/lib/booking-destinations";

/**
 * The scheduler, embedded as the attached sheet of the work order.
 *
 * The placeholder sits *behind* the frame rather than over it, and that is
 * load-bearing. The iframe is in the server-rendered markup, so it can finish
 * loading before React hydrates and attaches `onLoad` — a placeholder layered
 * on top would then never come down, and a cross-origin frame gives us no way
 * to ask whether it already loaded (`contentWindow` is truthy from the moment
 * the element exists, and `contentDocument` is walled off). Underneath, it
 * shows through the transparent frame while the provider's page is in flight
 * and is covered the moment that page paints, with or without the handler.
 *
 * The escape hatch below is permanent, not an error state. A frame that loads
 * cleanly in Chrome can still be starved of its cookies by Safari's
 * cross-site tracking prevention, and that failure is silent: the customer
 * sees a scheduler that will not take the last step. Anyone in that position
 * needs the direct link already sitting there, not produced by an error
 * branch that cannot detect its own error.
 */
export function BookingFrame({ dest }: { dest: BookingDestination }) {
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSlow(true), 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      <div className="book-frame">
        {!loaded ? (
          <p className="book-frame-wait">
            {slow
              ? `The ${dest.provider} calendar is taking a while.`
              : `Loading the ${dest.provider} calendar…`}
          </p>
        ) : null}
        <iframe
          src={dest.url}
          title={`${dest.name} booking calendar, run by ${dest.provider}`}
          className="book-frame-sheet"
          onLoad={() => setLoaded(true)}
          // `payment` is scoped to the frame's own origin by default, which is
          // what Square's card step needs; it is inert for ARI.
          allow="payment; clipboard-write"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <p className="measure mt-3 text-sm text-[var(--ink-muted)]">
        {dest.provider} runs this calendar
        {dest.takesPayment ? " and takes the payment" : ""}, so what you type
        goes to them. If it will not load here,{" "}
        <a
          href={dest.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          open it on {dest.provider}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import type { BookingCalendar } from "@/lib/booking-destinations";
import { BUSINESS } from "@/lib/business";

/**
 * The scheduler, embedded as the attached sheet of the work order.
 *
 * Takes a `BookingCalendar` rather than a whole destination, so a trade that
 * books by phone cannot reach this component at all — the DIY bay used to
 * frame Square here and no longer does, and the type is what keeps that from
 * silently regressing into an empty frame.
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
 *
 * The chrome around the frame carries the shop's name, not the provider's.
 * `provider` stays on the type because it is true and it picks the URL, but
 * it is not rendered and not handed to this component — see the prop type.
 * Note what the rename does and does not cover: the frame itself paints the
 * provider's own interface, and a card statement carries their descriptor, so
 * a customer still meets the name at the point of payment — just not from our
 * copy first.
 */
export function BookingFrame({
  name,
  calendar,
}: {
  name: string;
  /* Deliberately not the whole `BookingCalendar`: this is a client component,
     so every field handed to it is serialised into the page payload, and
     `provider` would put the vendor's name in the HTML of a page that no
     longer says it anywhere. Only the two fields the markup actually uses
     cross the boundary. */
  calendar: Pick<BookingCalendar, "url" | "takesPayment">;
}) {
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
              ? `The ${BUSINESS.name} calendar is taking a while.`
              : `Loading the ${BUSINESS.name} calendar…`}
          </p>
        ) : null}
        <iframe
          src={calendar.url}
          title={`${name} booking calendar — ${BUSINESS.name}`}
          className="book-frame-sheet"
          onLoad={() => setLoaded(true)}
          // `payment` is scoped to the frame's own origin by default, which is
          // what Square's card step needs; it is inert for ARI.
          allow="payment; clipboard-write"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <p className="measure mt-3 text-sm text-[var(--ink-muted)]">
        {BUSINESS.name} runs this calendar
        {calendar.takesPayment ? " and takes the payment" : ""}. If it will
        not load here,{" "}
        <a
          href={calendar.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          open it in a new tab
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </p>
    </div>
  );
}

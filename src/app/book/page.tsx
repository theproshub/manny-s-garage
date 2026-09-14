import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/lib/business";
import { TRADE_LOCATION } from "@/lib/trade-location";
import { BOOKING_DESTINATIONS, bookingPath } from "@/lib/booking-destinations";

export const metadata: Metadata = {
  title: "Book online — Manny's Garage, Fargo ND",
  description:
    "Book auto repair, handyman work or a DIY bay at Manny's Garage in Fargo, ND. The ARI and Square calendars, both on our page.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book online — Manny's Garage",
    description: "Pick the work and the right calendar opens on this site.",
    url: "https://mannygarage.com/book",
  },
};

/**
 * The handoff.
 *
 * This page was a 570-line form that collected a service, a date, a name and a
 * phone number and posted them to `/api/book`. On Vercel that route had
 * nowhere to put them: Supabase was unconfigured, so it fell through to
 * writing `data/bookings.json` on a read-only filesystem, the write threw, the
 * error was swallowed, and the route answered `ok: true`. The customer read
 * "we received your request" and nothing existed. Every booking through this
 * page was lost.
 *
 * The shop already runs two real booking systems, and `/quote` has been
 * sending people to them all along. This page now does the same thing rather
 * than competing with them: pick the work, land on the calendar that actually
 * holds the slot and takes the payment. Each row goes to `/book/<trade>`,
 * where that calendar is framed on our own URL — see
 * `lib/booking-destinations.ts`.
 *
 * I.T. is the exception and cannot be otherwise. Tech jobs are priced after
 * someone looks at them, so there is no fixed service for Square to sell and
 * nothing to put in a calendar — that line is a phone call, which is honest
 * and works today. Do not "fix" it by pointing it at Square: the visitor would
 * land on a service list with no I.T. entry on it.
 */
type Destination = {
  name: string;
  mark: keyof typeof TRADE_LOCATION;
  href: string;
  /** Named in the row so nobody meets an unfamiliar brand by surprise. The
   *  calendar no longer takes them off the site, but it is still not ours. */
  via: string;
  /** I.T. is the one line that leaves the page, and it leaves to a phone. */
  leaves: boolean;
};

const DESTINATIONS: Destination[] = [
  {
    name: BOOKING_DESTINATIONS.automotive.name,
    mark: "A",
    href: bookingPath("automotive"),
    via: BOOKING_DESTINATIONS.automotive.provider,
    leaves: false,
  },
  {
    name: BOOKING_DESTINATIONS.handyman.name,
    mark: "H",
    href: bookingPath("handyman"),
    via: BOOKING_DESTINATIONS.handyman.provider,
    leaves: false,
  },
  {
    name: BOOKING_DESTINATIONS.diy.name,
    mark: "D",
    href: bookingPath("diy"),
    via: BOOKING_DESTINATIONS.diy.provider,
    leaves: false,
  },
  {
    name: "I.T.",
    mark: "I",
    href: BUSINESS.phone.tel,
    via: "Call",
    leaves: true,
  },
];

export default function BookPage() {
  return (
    <main>
      <section className="ledger px-4 pb-2 sm:px-6">
        <div className="tier-prose">
          <p className="field-label">Book online</p>
          <h1 className="press press-lg mt-2">Pick the work</h1>
          <p className="hero-said">
            Each one opens the calendar that holds the slot, right here on this
            page. You pick the time, and that is the booking — nothing waits on
            us to read a form.
          </p>

          <ul className="trade-lines mt-6">
            {DESTINATIONS.map((d) => {
              const inside = (
                <>
                  <span className="trade-line-name">
                    {d.name}
                    <span className="trade-line-where">
                      {d.mark === "I"
                        ? "We look at the job first, then price it"
                        : TRADE_LOCATION[d.mark].detail}
                    </span>
                  </span>
                  <span className="trade-line-price figure">{d.via}</span>
                </>
              );
              return (
                <li key={d.name}>
                  {d.leaves ? (
                    <a href={d.href} className="trade-line">
                      {inside}
                    </a>
                  ) : (
                    <Link href={d.href} className="trade-line">
                      {inside}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="measure mt-6 text-sm text-[var(--ink-muted)]">
            Automotive books through ARI. House jobs and the DIY bay book
            through Square, which also takes the payment. Both calendars run on
            our pages, so you never leave the site to book. Tech help is quoted
            after we look at it, so that one is a call or a text to{" "}
            <a
              href={BUSINESS.phone.tel}
              className="figure underline underline-offset-4"
            >
              {BUSINESS.phone.display}
            </a>
            .
          </p>
        </div>
      </section>

      <section
        className="ledger tier-prose px-4 sm:px-6"
        aria-labelledby="booking-works"
      >
        <p className="field-label">What happens next</p>
        <h2 id="booking-works" className="form-header mt-1 text-2xl">
          How booking works
        </h2>
        {/* Numbered because the order genuinely matters; it is a sequence. */}
        <ol className="measure mt-4">
          {[
            "Pick your time on the calendar that opens on this page.",
            "We tell you the price before we start any work.",
            "You say yes, then we get it done.",
          ].map((step, i) => (
            <li key={step} className="rule-item flex gap-4 py-3">
              <span className="figure shrink-0 text-[var(--stamp)]">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-[var(--ink-muted)]">
          Not sure which one you need?{" "}
          <a
            href={BUSINESS.phone.tel}
            className="figure underline underline-offset-4"
          >
            {BUSINESS.phone.display}
          </a>
        </p>
      </section>
    </main>
  );
}

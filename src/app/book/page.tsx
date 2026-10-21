import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/lib/business";
import { TRADE_LOCATION } from "@/lib/trade-location";
import { BOOKING_DESTINATIONS, bookingPath } from "@/lib/booking-destinations";

export const metadata: Metadata = {
  title: "Book online — Manny's Garage, Fargo ND",
  description:
    "Book auto repair or handyman work at Manny's Garage in Fargo, ND — the Manny's Garage calendars, both on our page. DIY bay time and tech help are booked by phone.",
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
 * holds the slot and takes the payment. Automotive and handyman go to
 * `/book/<trade>`, where that calendar is framed on our own URL — see
 * `lib/booking-destinations.ts`.
 *
 * Two lines do not open a calendar, and both are honest about it rather than
 * dressed up as one. I.T. cannot be otherwise: tech jobs are priced after
 * someone looks at them, so there is no fixed service for Square to sell and
 * nothing to put in a calendar. Do not "fix" it by pointing it at Square —
 * the visitor would land on a service list with no I.T. entry on it. The DIY
 * bay joined it when its Square embed was removed; bay time is taken on the
 * phone now, so the row dials instead of pretending to schedule.
 */
type Destination = {
  name: string;
  mark: keyof typeof TRADE_LOCATION;
  href: string;
  /** The action word at the end of the row. It reads "Book" on every line by
   *  the owner's call: the column used to name the provider — ARI, Square,
   *  Call — and no longer does. Who runs the calendar is still stated on the
   *  destination page's "Scheduled through" field and in the paragraph under
   *  this list, so the disclosure survives; it just is not the first thing a
   *  customer reads. */
  via: string;
  /** The rows that leave the page, and both leave to a phone. */
  leaves: boolean;
};

const DESTINATIONS: Destination[] = [
  {
    name: BOOKING_DESTINATIONS.automotive.name,
    mark: "A",
    href: bookingPath("automotive"),
    via: "Book",
    leaves: false,
  },
  {
    name: BOOKING_DESTINATIONS.handyman.name,
    mark: "H",
    href: bookingPath("handyman"),
    via: "Book",
    leaves: false,
  },
  {
    name: BOOKING_DESTINATIONS.diy.name,
    mark: "D",
    href: BUSINESS.phone.tel,
    via: "Book",
    leaves: true,
  },
  {
    name: "I.T.",
    mark: "I",
    href: BUSINESS.phone.tel,
    via: "Book",
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
            The top two open the calendar that holds the slot, right here on
            this page — you pick the time, and that is the booking. The bottom
            two are a phone call, because nothing on the other end can sell
            them.
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
            Automotive and house jobs both book through Manny&apos;s Garage,
            and house jobs take the payment at the same time. Both calendars
            run on our pages, so you never leave the site to book either one.
            Bay time and tech help are not on a calendar — those are a call or
            a text to{" "}
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
            "Pick your time on the calendar that opens on this page, or call us for the bay.",
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

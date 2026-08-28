import type { Metadata } from "next";
import { BUSINESS } from "@/lib/business";
import { TRADE_LOCATION } from "@/lib/trade-location";
import {
  SQUARE_BOOKING_URL,
  ARI_AUTOMOTIVE_BOOKING_URL,
} from "@/lib/fixed-quote-options";

export const metadata: Metadata = {
  title: "Book online — Manny's Garage, Fargo ND",
  description:
    "Book auto repair, handyman work or a DIY bay at Manny's Garage in Fargo, ND. Automotive books through ARI, house jobs and bay rental through Square.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book online — Manny's Garage",
    description: "Pick the work and we'll take you to the right calendar.",
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
 * holds the slot and takes the payment.
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
  /** Named in the row so nobody arrives on an unfamiliar site by surprise. */
  via: string;
  external: boolean;
};

const DESTINATIONS: Destination[] = [
  {
    name: "Automotive",
    mark: "A",
    href: ARI_AUTOMOTIVE_BOOKING_URL,
    via: "ARI",
    external: true,
  },
  {
    name: "Handyman",
    mark: "H",
    href: SQUARE_BOOKING_URL,
    via: "Square",
    external: true,
  },
  {
    name: "DIY Bay",
    mark: "D",
    href: SQUARE_BOOKING_URL,
    via: "Square",
    external: true,
  },
  {
    name: "I.T.",
    mark: "I",
    href: BUSINESS.phone.tel,
    via: "Call",
    external: false,
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
            Each one opens the calendar that holds the slot. You pick the time
            there, and that is the booking — nothing waits on us to read a form.
          </p>

          <ul className="trade-lines mt-6">
            {DESTINATIONS.map((d) => (
              <li key={d.name}>
                <a
                  href={d.href}
                  className="trade-line"
                  {...(d.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="trade-line-name">
                    {d.name}
                    <span className="trade-line-where">
                      {d.mark === "I"
                        ? "We look at the job first, then price it"
                        : TRADE_LOCATION[d.mark].detail}
                    </span>
                  </span>
                  <span className="trade-line-price figure">
                    {d.via}
                    {d.external ? (
                      <span className="sr-only"> (opens in a new tab)</span>
                    ) : null}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="measure mt-6 text-sm text-[var(--ink-muted)]">
            Automotive books through ARI. House jobs and the DIY bay book
            through Square, which also takes the payment. Tech help is quoted
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
            "Pick your time on the calendar that opens.",
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

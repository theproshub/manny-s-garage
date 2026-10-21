import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingFrame } from "@/components/booking-frame";
import { BUSINESS } from "@/lib/business";
import { TRADE_LOCATION } from "@/lib/trade-location";
import {
  BOOKING_DESTINATIONS,
  BOOKING_TRADE_IDS,
  type BookingTradeId,
} from "@/lib/booking-destinations";

type Params = { params: Promise<{ trade: string }> };

export function generateStaticParams() {
  return BOOKING_TRADE_IDS.map((trade) => ({ trade }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { trade } = await params;
  const dest = BOOKING_DESTINATIONS[trade as BookingTradeId];
  if (!dest) return {};

  const title = `Book ${dest.name.toLowerCase()} — Manny's Garage, Fargo ND`;
  const description =
    dest.method.kind === "calendar"
      ? `Pick ${dest.picking} at Manny's Garage in Fargo, ND. The ${dest.method.provider} calendar, on our page.`
      : `Call Manny's Garage in Fargo, ND to book ${dest.picking}. We take bay time by phone.`;

  return {
    title,
    description,
    alternates: { canonical: `/book/${dest.id}` },
    openGraph: {
      title,
      description,
      url: `https://mannygarage.com/book/${dest.id}`,
    },
  };
}

export default async function BookTradePage({ params }: Params) {
  const { trade } = await params;
  const dest = BOOKING_DESTINATIONS[trade as BookingTradeId];
  if (!dest) notFound();

  const where = TRADE_LOCATION[dest.mark];
  const { method } = dest;

  return (
    <main>
      <section className="ledger px-4 pb-2 sm:px-6">
        <div className="tier-prose">
          <Link href="/book" className="book-back figure">
            ← All booking
          </Link>

          <h1 className="press press-lg mt-3">Book {dest.name}</h1>

          {/* The header fields of the sheet. Each one answers a question the
              visitor has before they touch a calendar — or pick up a phone:
              what am I picking, who is handling it, and where does the work
              happen. */}
          <dl className="form-box book-fields mt-5">
            <div className="form-cell">
              <dt className="field-label">
                {method.kind === "calendar" ? "You are picking" : "You are asking for"}
              </dt>
              <dd className="mt-1 text-sm">{dest.picking}</dd>
            </div>
            <div className="form-cell">
              <dt className="field-label">
                {method.kind === "calendar" ? "Scheduled through" : "Booked by"}
              </dt>
              <dd className="figure mt-1 text-sm">
                {method.kind === "calendar"
                  ? `${method.provider}${method.takesPayment ? " · payment too" : ""}`
                  : "Phone · the shop"}
              </dd>
            </div>
            <div className="form-cell">
              <dt className="field-label">{where.label}</dt>
              <dd className="mt-1 text-sm">{where.detail}</dd>
            </div>
          </dl>

          {method.kind === "calendar" ? (
            <>
              <div className="mt-6">
                <BookingFrame name={dest.name} calendar={method} />
              </div>

              <p className="measure mt-6 text-sm text-[var(--ink-muted)]">
                Pick your time and that is the booking — nothing waits on us to
                read a form. Stuck, or not sure this is the right one?{" "}
                <a
                  href={BUSINESS.phone.tel}
                  className="figure underline underline-offset-4"
                >
                  {BUSINESS.phone.display}
                </a>
              </p>
            </>
          ) : (
            /* No calendar to frame, so the page does not pretend to be one.
               The number is the action, not a footnote under a dead embed. */
            <div className="mt-6">
              <p className="measure">
                Bay time is booked over the phone. Tell us the hours you want
                and whether you want a mechanic on it, and we will put you in
                the book while you are on the call.
              </p>

              <a href={BUSINESS.phone.tel} className="btn-primary mt-5">
                Call {BUSINESS.phone.display}
              </a>

              <p className="measure mt-4 text-sm text-[var(--ink-muted)]">
                Texting the same number works too. If you would rather see what
                a session costs before you call,{" "}
                <Link
                  href="/quote?for=diy"
                  className="underline underline-offset-4"
                >
                  the bay rates are here
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

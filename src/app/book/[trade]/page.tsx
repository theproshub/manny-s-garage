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
  const description = `Pick ${dest.picking} at Manny's Garage in Fargo, ND. The ${dest.provider} calendar, on our page.`;

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

  return (
    <main>
      <section className="ledger px-4 pb-2 sm:px-6">
        <div className="tier-prose">
          <Link href="/book" className="book-back figure">
            ← All booking
          </Link>

          <h1 className="press press-lg mt-3">Book {dest.name}</h1>

          {/* The header fields of the sheet. Each one answers a question the
              visitor has before they touch a calendar: what am I picking,
              who is handling it, and where does the work happen. */}
          <dl className="form-box book-fields mt-5">
            <div className="form-cell">
              <dt className="field-label">You are picking</dt>
              <dd className="mt-1 text-sm">{dest.picking}</dd>
            </div>
            <div className="form-cell">
              <dt className="field-label">Scheduled through</dt>
              <dd className="figure mt-1 text-sm">
                {dest.provider}
                {dest.takesPayment ? " · payment too" : ""}
              </dd>
            </div>
            <div className="form-cell">
              <dt className="field-label">{where.label}</dt>
              <dd className="mt-1 text-sm">{where.detail}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <BookingFrame dest={dest} />
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
        </div>
      </section>
    </main>
  );
}

import {
  SQUARE_BOOKING_URL,
  ARI_AUTOMOTIVE_BOOKING_URL,
} from "@/lib/fixed-quote-options";

/**
 * The three real schedulers, framed on our own pages.
 *
 * The shop does not own a booking system — ARI holds the automotive calendar,
 * Square holds the house-job and bay calendar and takes the payment. Those
 * calendars are the booking, so they stay. What changed is where the visitor
 * stands while using one: `/book` used to throw people onto `portal.ari.app`
 * and `book.squareup.com`, which is the moment a small shop with no reviews
 * and no Google profile looks least real — an unfamiliar domain, mid-decision.
 *
 * Now the scheduler is embedded as the attached sheet of the work order and
 * the address bar still reads mannygarage.com. Both hosts allow it: neither
 * sends `X-Frame-Options` nor a `frame-ancestors` policy.
 *
 * The provider is still named on every surface — on the picker row, on the
 * header field, and under the frame. Keeping the customer on our URL is not
 * the same as hiding who is handling their card, and the second one would
 * cost exactly the trust the first one buys.
 */
export type BookingTradeId = "automotive" | "handyman" | "diy";

export type BookingDestination = {
  id: BookingTradeId;
  /** Trade key on the estimate — matches `ServiceOption.mark`. */
  mark: string;
  name: string;
  /** Who runs the calendar. Rendered, never implied. */
  provider: "ARI" | "Square";
  /** What the visitor is actually picking in the frame. */
  picking: string;
  /** The scheduler itself: framed here, and the escape hatch if framing fails. */
  url: string;
  /** Does the provider take the money as well as the slot? */
  takesPayment: boolean;
};

export const BOOKING_DESTINATIONS: Record<BookingTradeId, BookingDestination> = {
  automotive: {
    id: "automotive",
    mark: "A",
    name: "Automotive",
    provider: "ARI",
    picking: "a time to bring the car in",
    url: ARI_AUTOMOTIVE_BOOKING_URL,
    takesPayment: false,
  },
  handyman: {
    id: "handyman",
    mark: "H",
    name: "Handyman",
    provider: "Square",
    picking: "the job and a time we come to you",
    url: SQUARE_BOOKING_URL,
    takesPayment: true,
  },
  diy: {
    id: "diy",
    mark: "D",
    name: "DIY Bay",
    provider: "Square",
    picking: "the hours you want the bay",
    url: SQUARE_BOOKING_URL,
    takesPayment: true,
  },
};

export const BOOKING_TRADE_IDS = Object.keys(
  BOOKING_DESTINATIONS,
) as BookingTradeId[];

export function bookingPath(id: BookingTradeId): string {
  return `/book/${id}`;
}

/** Reverse of {@link bookingPath} — lets a `bookHref` name its own provider. */
export function destinationForPath(href: string): BookingDestination | null {
  const id = href.startsWith("/book/") ? href.slice("/book/".length) : "";
  return (BOOKING_DESTINATIONS as Record<string, BookingDestination>)[id] ?? null;
}

import {
  SQUARE_BOOKING_URL,
  ARI_AUTOMOTIVE_BOOKING_URL,
} from "@/lib/fixed-quote-options";

/**
 * The three bookable trades, and how a slot is actually taken for each.
 *
 * The shop does not own a booking system — ARI holds the automotive calendar
 * and Square holds the house-job calendar and takes the payment. Those
 * calendars are the booking, so they stay. What changed earlier is where the
 * visitor stands while using one: `/book` used to throw people onto
 * `portal.ari.app` and `book.squareup.com`, which is the moment a small shop
 * with no reviews and no Google profile looks least real — an unfamiliar
 * domain, mid-decision. Now the scheduler is embedded as the attached sheet
 * of the work order and the address bar still reads mannygarage.com. Both
 * hosts allow it: neither sends `X-Frame-Options` nor a `frame-ancestors`
 * policy.
 *
 * The DIY bay is no longer one of them. Its Square calendar came out, and bay
 * time is now taken by phone — the same way I.T. already works on `/book`.
 * That is why `method` is a union rather than a nullable URL: a trade with no
 * calendar is a real state of this business, not a gap waiting to be filled,
 * and the type should make a caller handle it instead of rendering an empty
 * frame. Two trades frame a scheduler, two take a call.
 *
 * The provider is still named on every surface that has one — on the picker
 * row, on the header field, and under the frame. Keeping the customer on our
 * URL is not the same as hiding who is handling their card, and the second
 * one would cost exactly the trust the first one buys.
 */
export type BookingTradeId = "automotive" | "handyman" | "diy";

/** A real scheduler, framed on our own page. */
export type BookingCalendar = {
  kind: "calendar";
  /** Who runs it. Rendered, never implied. */
  provider: "ARI" | "Square";
  /** Framed here, and the escape hatch if framing fails. */
  url: string;
  /** Does the provider take the money as well as the slot? */
  takesPayment: boolean;
};

/** No scheduler: the shop writes the slot down itself. */
export type BookingByPhone = {
  kind: "phone";
};

export type BookingMethod = BookingCalendar | BookingByPhone;

export type BookingDestination = {
  id: BookingTradeId;
  /** Trade key on the estimate — matches `ServiceOption.mark`. */
  mark: string;
  name: string;
  /** What the visitor is actually choosing, calendar or call. */
  picking: string;
  method: BookingMethod;
};

export const BOOKING_DESTINATIONS: Record<BookingTradeId, BookingDestination> = {
  automotive: {
    id: "automotive",
    mark: "A",
    name: "Automotive",
    picking: "a time to bring the car in",
    method: {
      kind: "calendar",
      provider: "ARI",
      url: ARI_AUTOMOTIVE_BOOKING_URL,
      takesPayment: false,
    },
  },
  handyman: {
    id: "handyman",
    mark: "H",
    name: "Handyman",
    picking: "the job and a time we come to you",
    method: {
      kind: "calendar",
      provider: "Square",
      url: SQUARE_BOOKING_URL,
      takesPayment: true,
    },
  },
  diy: {
    id: "diy",
    mark: "D",
    name: "DIY Bay",
    picking: "the hours you want the bay",
    method: { kind: "phone" },
  },
};

export const BOOKING_TRADE_IDS = Object.keys(
  BOOKING_DESTINATIONS,
) as BookingTradeId[];

export function bookingPath(id: BookingTradeId): string {
  return `/book/${id}`;
}

/** Reverse of {@link bookingPath} — lets a `bookHref` name its own method. */
export function destinationForPath(href: string): BookingDestination | null {
  const id = href.startsWith("/book/") ? href.slice("/book/".length) : "";
  return (BOOKING_DESTINATIONS as Record<string, BookingDestination>)[id] ?? null;
}

/**
 * Where each trade actually happens.
 *
 * This is the shop-floor layer of the design and it carries real
 * information: two trades run out of numbered bays at 1341 Main Ave, and two
 * come to your address instead. A customer wondering "do I bring it to you or
 * do you come to me?" gets the answer from the marker, not from prose.
 *
 * Bay numbers are wayfinding, not decoration — do not invent one for a trade
 * that has no bay.
 */
export type TradeLocation = {
  /** Painted marker: a bay numeral, or the mobile stencil. */
  marker: string;
  kind: "bay" | "mobile";
  note: string;
};

export const TRADE_LOCATION: Record<string, TradeLocation> = {
  A: { marker: "01", kind: "bay", note: "Bay 01 · at the shop" },
  D: { marker: "02", kind: "bay", note: "Bay 02 · at the shop" },
  H: { marker: "MOB", kind: "mobile", note: "Mobile · we come to you" },
  I: { marker: "MOB", kind: "mobile", note: "Mobile · we come to you" },
};

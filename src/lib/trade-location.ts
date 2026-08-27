import { BUSINESS } from "@/lib/business";

/**
 * Where each kind of work happens.
 *
 * This used to render as painted markers — "01", "02", "MOB". Those were bay
 * numbers: they meant something to the shop and nothing to the customer, and
 * MOB is an abbreviation no one parses on sight. The fact underneath is worth
 * keeping — "do I bring it to you, or do you come to me?" is a real question —
 * so it is now simply stated in words.
 */
export type TradeLocation = {
  label: string;
  detail: string;
  kind: "shop" | "mobile";
};

export const TRADE_LOCATION: Record<string, TradeLocation> = {
  A: { label: "At our shop", detail: `Bring it to ${BUSINESS.address.street}`, kind: "shop" },
  D: { label: "At our shop", detail: `Bring it to ${BUSINESS.address.street}`, kind: "shop" },
  H: { label: "We come to you", detail: "We work at your address", kind: "mobile" },
  I: { label: "We come to you", detail: "We work at your address", kind: "mobile" },
};

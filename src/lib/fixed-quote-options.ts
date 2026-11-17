/** Shared fixed prices for the /quote picker (keep in sync with service pages). */

export const DIY_HOURLY = 20;
export const DIY_MECHANIC_HOURLY = 40;
export const DIY_MAX_HOURS = 8;

export const HANDYMAN_CAMERA_EACH = 120;
export const HANDYMAN_FURNITURE_EACH = 50;
export const HANDYMAN_WINDOW_TREATMENT = 50;
export const HANDYMAN_BUNK_BED = 100;
export const SQUARE_BOOKING_URL =
  "https://book.squareup.com/appointments/oes899qrhoj8mt/location/L6S9GY1Z49K39/services";
export const HANDYMAN_SQUARE_BOOKING_URL =
  SQUARE_BOOKING_URL;

/**
 * The DIY bay's own Square service, rather than the service picker the
 * handyman link opens. Same merchant and location; the trailing id is the bay
 * itself, so the visitor lands on that service with nothing to choose first.
 *
 * The `savt` query parameter the shop copied out of the browser is a Square
 * visitor token tied to one session. It is deliberately not kept: it would
 * pin every visitor to a stale session and it is not part of the address.
 */
export const DIY_SQUARE_BOOKING_URL =
  `${SQUARE_BOOKING_URL}/QEJNSDBZREXOAJLZ4SKTRCKP`;

/** TV wall mount — $1.50/inch at listed sizes */
export const HANDYMAN_TV_PACKAGES: { label: string; price: number }[] = [
  { label: "32″ TV Mount", price: 48 },
  { label: "43″ TV Mount", price: 64.5 },
  { label: "55″ TV Mount", price: 82.5 },
  { label: "65″ TV Mount", price: 97.5 },
  { label: "75″ TV Mount", price: 112.5 },
  { label: "85″ TV Mount", price: 127.5 },
];

export type DiyPackage = {
  id: string;
  label: string;
  sub: string;
  total: number;
  hours: number;
  mechanicHours: number;
};

function diyTotal(hours: number, mechanicHours: number): number {
  const h = Math.max(1, Math.min(DIY_MAX_HOURS, hours));
  const m = Math.max(0, Math.min(DIY_MAX_HOURS, mechanicHours));
  return h * DIY_HOURLY + m * DIY_MECHANIC_HOURLY;
}

/** Preset DIY bay bundles — tap to book at that total */
export const DIY_PACKAGES: DiyPackage[] = [
  {
    id: "b1",
    label: "1 Hour",
    sub: "Bay only",
    hours: 1,
    mechanicHours: 0,
    total: diyTotal(1, 0),
  },
  {
    id: "b2",
    label: "2 Hours",
    sub: "Bay only",
    hours: 2,
    mechanicHours: 0,
    total: diyTotal(2, 0),
  },
  {
    id: "b4",
    label: "4 Hours",
    sub: "Bay only",
    hours: 4,
    mechanicHours: 0,
    total: diyTotal(4, 0),
  },
  {
    id: "b8",
    label: "8 Hours",
    sub: "Bay only · max session",
    hours: 8,
    mechanicHours: 0,
    total: diyTotal(8, 0),
  },
  {
    id: "b2m1",
    label: "2 Hr Bay + 1 Hr Mechanic",
    sub: "Help when you need it",
    hours: 2,
    mechanicHours: 1,
    total: diyTotal(2, 1),
  },
  {
    id: "b4m1",
    label: "4 Hr Bay + 1 Hr Mechanic",
    sub: "Popular combo",
    hours: 4,
    mechanicHours: 1,
    total: diyTotal(4, 1),
  },
  {
    id: "b4m2",
    label: "4 Hr Bay + 2 Hr Mechanic",
    sub: "Extra hands on deck",
    hours: 4,
    mechanicHours: 2,
    total: diyTotal(4, 2),
  },
];

export function bookHandymanHref(price: number, note: string): string {
  void price;
  void note;
  return HANDYMAN_SQUARE_BOOKING_URL;
}

export function bookDiyHref(pkg: DiyPackage): string {
  void pkg;
  return SQUARE_BOOKING_URL;
}

/** Common starting prices — shop confirms for your vehicle at check-in */
export type AutoFixedPackage = {
  id: string;
  label: string;
  sub: string;
  price: number;
};

/** Shown next to automotive fixed-price lists (quote, book, auto pages). */
export const AUTO_PRICING_PARTS_DISCLAIMER =
  "These prices cover the labor, not the parts, unless a line says otherwise. We’ll tell you what the parts run before anything starts.";

export const AUTO_FIXED_PACKAGES: AutoFixedPackage[] = [
  {
    id: "diag",
    label: "Diagnostic for a Check-Engine Light",
    sub: "We read the codes and explain them",
    price: 0,
  },
  {
    id: "oil-conv",
    label: "Conventional Oil Change",
    sub: "Up to 5 qts · standard filter",
    price: 40,
  },
  {
    id: "oil-syn",
    label: "Full Synthetic Oil Change",
    sub: "Up to 5 qts · premium filter",
    price: 65,
  },
  {
    id: "engine-tuneup",
    label: "Engine Tune-Up",
    sub: "Starts here, depending on the engine",
    price: 180,
  },
  {
    id: "brake-pads-pair",
    label: "Brake Pads, Replaced (Pair)",
    sub: "Pads, one pair",
    price: 180,
  },
  {
    id: "brake-pads-rotors-pair",
    label: "Brake Pads & Rotors, Replaced (Pair)",
    sub: "Pads and rotors, one pair",
    price: 200,
  },
  {
    id: "brake-complete-set",
    label: "Complete Brake Set (Pads & Rotors)",
    sub: "Front and rear, the whole set",
    price: 350,
  },
  {
    id: "battery",
    label: "Battery Replacement",
    sub: "Installed and tested",
    price: 40,
  },
  {
    id: "roadside",
    label: "Emergency Roadside Assistance",
    sub: "Locked out, flat tire, or a jump start",
    price: 60,
  },
];

export const ARI_AUTOMOTIVE_BOOKING_URL =
  "https://portal.ari.app/booking?FBProject=ARI&shopID=M0daA5VhFdf3dfayarNPWG3OIT43&version=v.15.8.20";

export function bookAutomotiveHref(_price: number, _note: string): string {
  return ARI_AUTOMOTIVE_BOOKING_URL;
}

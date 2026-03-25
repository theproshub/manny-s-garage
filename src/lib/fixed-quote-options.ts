/** Shared fixed prices for the /quote picker (keep in sync with service pages). */
import { bookUrlWithSchedule } from "@/lib/booking-nav";

export const DIY_HOURLY = 20;
export const DIY_MECHANIC_HOURLY = 40;
export const DIY_MAX_HOURS = 8;

export const HANDYMAN_CAMERA_EACH = 120;
export const HANDYMAN_FURNITURE_EACH = 50;
export const HANDYMAN_WINDOW_TREATMENT = 50;
export const HANDYMAN_BUNK_BED = 100;

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
  return bookUrlWithSchedule(
    `/book?service=handyman&estimate=${encodeURIComponent(price.toFixed(2))}&notes=${encodeURIComponent(note)}`,
  );
}

export function bookDiyHref(pkg: DiyPackage): string {
  const note = `DIY bay ${pkg.hours}h${pkg.mechanicHours ? ` + mechanic ${pkg.mechanicHours}h` : ''}`;
  return bookUrlWithSchedule(
    `/book?service=diy&estimate=${encodeURIComponent(pkg.total.toString())}&hours=${pkg.hours}&mechanicHours=${pkg.mechanicHours}&notes=${encodeURIComponent(note)}`,
  );
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
  "Listed price does not include parts unless otherwise noted—we confirm parts cost before work.";

export const AUTO_FIXED_PACKAGES: AutoFixedPackage[] = [
  {
    id: "diag",
    label: "Automotive Diagnostic (Check Engine Light)",
    sub: "Code scan and basic report",
    price: 0,
  },
  {
    id: "oil-conv",
    label: "Conventional Oil Change",
    sub: "Up to 5 qts · standard filter · parts not included",
    price: 40,
  },
  {
    id: "oil-syn",
    label: "Full Synthetic Oil Change",
    sub: "Up to 5 qts · premium filter · parts not included",
    price: 65,
  },
  {
    id: "engine-tuneup",
    label: "Engine Tuneup",
    sub: "Starting at · parts not included",
    price: 180,
  },
  {
    id: "brake-pads-pair",
    label: "Brake Pads Replacement (Pair)",
    sub: "Pads · parts not included",
    price: 180,
  },
  {
    id: "brake-pads-rotors-pair",
    label: "Brake Pads & Rotors Replacement (Pair)",
    sub: "Pads & rotors · parts not included",
    price: 200,
  },
  {
    id: "brake-complete-set",
    label: "Complete Brake Set (Pads & Rotors)",
    sub: "Front and rear set · parts not included",
    price: 350,
  },
  {
    id: "battery",
    label: "Battery Replacement",
    sub: "Installation · parts not included",
    price: 40,
  },
  {
    id: "roadside",
    label: "Emergency Roadside Assistance",
    sub: "Lockout, flat tire, or jumpstart",
    price: 60,
  },
];

export const ARI_AUTOMOTIVE_BOOKING_URL =
  "https://portal.ari.app/booking?FBProject=ARI&shopID=M0daA5VhFdf3dfayarNPWG3OIT43&version=v.15.8.20";

export function bookAutomotiveHref(_price: number, _note: string): string {
  return ARI_AUTOMOTIVE_BOOKING_URL;
}

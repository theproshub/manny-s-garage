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
  { label: '32″ TV mount', price: 48 },
  { label: '43″ TV mount', price: 64.5 },
  { label: '55″ TV mount', price: 82.5 },
  { label: '65″ TV mount', price: 97.5 },
  { label: '75″ TV mount', price: 112.5 },
  { label: '85″ TV mount', price: 127.5 },
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
    id: 'b1',
    label: '1 hour',
    sub: 'Bay only',
    hours: 1,
    mechanicHours: 0,
    total: diyTotal(1, 0),
  },
  {
    id: 'b2',
    label: '2 hours',
    sub: 'Bay only',
    hours: 2,
    mechanicHours: 0,
    total: diyTotal(2, 0),
  },
  {
    id: 'b4',
    label: '4 hours',
    sub: 'Bay only',
    hours: 4,
    mechanicHours: 0,
    total: diyTotal(4, 0),
  },
  {
    id: 'b8',
    label: '8 hours',
    sub: 'Bay only · max session',
    hours: 8,
    mechanicHours: 0,
    total: diyTotal(8, 0),
  },
  {
    id: 'b2m1',
    label: '2 hr bay + 1 hr mechanic',
    sub: 'Help when you need it',
    hours: 2,
    mechanicHours: 1,
    total: diyTotal(2, 1),
  },
  {
    id: 'b4m1',
    label: '4 hr bay + 1 hr mechanic',
    sub: 'Popular combo',
    hours: 4,
    mechanicHours: 1,
    total: diyTotal(4, 1),
  },
  {
    id: 'b4m2',
    label: '4 hr bay + 2 hr mechanic',
    sub: 'Extra hands on deck',
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
    sub: "Code Scan and Basic Report · Listed Price Excludes Parts",
    price: 0,
  },
  {
    id: "oil-conv",
    label: "Conventional Oil Change",
    sub: "Up to 5 Qts · Standard Filter · Listed Price Excludes Parts",
    price: 40,
  },
  {
    id: "oil-syn",
    label: "Full Synthetic Oil Change",
    sub: "Up to 5 Qts · Premium Filter · Listed Price Excludes Parts",
    price: 65,
  },
  {
    id: "engine-tuneup",
    label: "Engine Tuneup",
    sub: "Starting At · Listed Price Excludes Parts",
    price: 180,
  },
  {
    id: "brake-pads-pair",
    label: "Brake Pads Replacement (Pair)",
    sub: "Pads and Labor · Listed Price Excludes Parts",
    price: 180,
  },
  {
    id: "brake-pads-rotors-pair",
    label: "Brakes & Rotors Replacement (Pair)",
    sub: "Pads and Rotors with Labor · Listed Price Excludes Parts",
    price: 200,
  },
  {
    id: "brake-complete-set",
    label: "Complete Brake Set (Pads & Rotors)",
    sub: "Front and Rear Set · Listed Price Excludes Parts",
    price: 350,
  },
  {
    id: "battery",
    label: "Battery Replacement",
    sub: "Installation Labor · Listed Price Excludes Parts",
    price: 40,
  },
  {
    id: "roadside",
    label: "Emergency Roadside Assistance",
    sub: "Lockout, Flat Tire, Jumpstart, or Towing · Listed Price Excludes Parts",
    price: 60,
  },
];

export function bookAutomotiveHref(price: number, note: string): string {
  return bookUrlWithSchedule(
    `/book?service=automotive&estimate=${encodeURIComponent(String(price))}&notes=${encodeURIComponent(note)}`,
  );
}

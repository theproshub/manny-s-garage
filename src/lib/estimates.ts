import { RATES } from "@/lib/business";

/**
 * Worked cost breakdowns for the jobs people most often ask about.
 *
 * The site had a rate list — a menu of unit prices — which never answered the
 * only question a visitor actually has: "what will MY job cost?" These take a
 * common job all the way to a total.
 *
 * No parts price is invented anywhere. Where a part's cost genuinely varies we
 * say "confirmed before work" and mark the total as an estimate, which is the
 * shop's real policy. That is why the ESTIMATE/FIXED badge means something:
 * some of these are exact, and some honestly cannot be.
 */

export type LineKind = "labor" | "part" | "fee" | "included";

export type EstimateLine = {
  label: string;
  detail: string;
  /** null = genuinely not knowable up front; renders as "confirmed first". */
  amount: number | null;
  kind: LineKind;
};

export type WorkedEstimate = {
  slug: string;
  /** Trade key — drives the bay marker. */
  mark: string;
  category: string;
  service: string;
  summary: string;
  lines: EstimateLine[];
  /** fixed = this is the price. estimate = parts still to confirm. */
  status: "fixed" | "estimate";
  bookHref: string;
};

export const WORKED_ESTIMATES: readonly WorkedEstimate[] = [
  {
    slug: "front-brakes",
    mark: "A",
    category: "Car repair",
    service: "Front brake service",
    summary: "New pads on the front axle, fitted and checked.",
    status: "estimate",
    bookHref: "/quote?for=auto",
    lines: [
      { label: "Labor", detail: "Fit new brake pads, front axle (2 wheels)", amount: 180, kind: "labor" },
      { label: "Brake check", detail: "We look over the whole brake system", amount: 0, kind: "included" },
      { label: "Parts", detail: "Brake pads for your car", amount: null, kind: "part" },
    ],
  },
  {
    slug: "tv-55",
    mark: "H",
    category: "House job",
    service: "55-inch TV on the wall",
    summary: "Measured, mounted and levelled on your wall.",
    status: "fixed",
    bookHref: "/quote?for=handyman",
    lines: [
      { label: "Mounting", detail: `55 inches at $${RATES.tvMountPerInch.toFixed(2)} an inch`, amount: 55 * RATES.tvMountPerInch, kind: "labor" },
      { label: "Bracket", detail: "Using the bracket that came with your TV", amount: 0, kind: "included" },
    ],
  },
  {
    slug: "diy-half-day",
    mark: "D",
    category: "Bay rental",
    service: "Half day in the bay",
    summary: "Four hours with the lift and tools, plus an hour of help.",
    status: "fixed",
    bookHref: "/quote?for=diy",
    lines: [
      { label: "Bay", detail: `4 hours at $${RATES.diyBayHourly.toFixed(2)} an hour`, amount: 4 * RATES.diyBayHourly, kind: "labor" },
      { label: "Mechanic", detail: `1 hour at $${RATES.diyMechanicHourly.toFixed(2)} an hour`, amount: RATES.diyMechanicHourly, kind: "labor" },
      { label: "Old oil", detail: "We get rid of it for you", amount: 0, kind: "included" },
    ],
  },
];

export function estimateSubtotal(e: WorkedEstimate): number {
  return e.lines.reduce((sum, l) => sum + (l.amount ?? 0), 0);
}

export function hasUnknownParts(e: WorkedEstimate): boolean {
  return e.lines.some((l) => l.amount === null);
}

export function estimateBySlug(slug: string): WorkedEstimate | undefined {
  return WORKED_ESTIMATES.find((e) => e.slug === slug);
}

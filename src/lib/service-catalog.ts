import { RATES } from "@/lib/business";
import type { LineItem } from "@/components/estimate/line-item";

/**
 * `code` is an internal stable key only — it is NOT rendered.
 *
 * It used to head the leftmost column of every price table, which spent the
 * most-scanned position in the layout on shop-internal data no customer has a
 * use for. The tables now lead with the service itself.
 *
 * Prefixes (A- automotive, H- handyman, D- DIY bay, I- I.T.) are kept as
 * readable keys with gaps in the numbering so services can be added without
 * renumbering.
 */

export const AUTO_ITEMS: readonly LineItem[] = [
  { code: "A-110", description: "Oil change (full synthetic)", spec: "per service", price: 40 },
  { code: "A-120", description: "New battery put in", spec: "per service", price: 40 },
  { code: "A-210", description: "New brake pads", spec: "per axle (2 wheels)", price: 180 },
  {
    code: "A-310",
    description: "Check engine light — find the fault",
    spec: "per visit",
    price: 0,
    note: "Free if we do the repair.",
  },
  { code: "A-410", description: "Broken down — we come to you", spec: "per visit", price: 60 },
];

export const HANDYMAN_ITEMS: readonly LineItem[] = [
  { code: "H-110", description: "TV put up on the wall", spec: "per inch of screen", price: RATES.tvMountPerInch },
  { code: "H-210", description: "Furniture put together", spec: "per item", price: RATES.furniturePerItem },
  { code: "H-220", description: "Bunk bed put together", spec: "per item", price: RATES.bunkBed },
  { code: "H-230", description: "Blinds or curtains hung", spec: "per item", price: RATES.windowTreatment },
  { code: "H-310", description: "Security cameras installed", spec: "per camera", price: RATES.cameraPerUnit },
];

export const DIY_ITEMS: readonly LineItem[] = [
  {
    code: "D-110",
    description: "The bay, the lift and the tools",
    spec: "per hour",
    price: RATES.diyBayHourly,
    note: `Book up to ${RATES.diyMaxHours} hours at a time.`,
  },
  { code: "D-210", description: "A mechanic to help you", spec: "per hour", price: RATES.diyMechanicHourly },
];

export const IT_ITEMS: readonly LineItem[] = [
  { code: "I-110", description: "Wi-Fi and internet set up", spec: "per visit", price: null },
  { code: "I-210", description: "Computer fixed", spec: "per visit", price: null },
  { code: "I-310", description: "A website or app built", spec: "per project", price: null },
  { code: "I-410", description: "Spreadsheets and reports", spec: "per project", price: null },
];

/** What the bay actually contains. Specificity is the evidence. */
export const DIY_INVENTORY: readonly string[] = [
  "Vehicle lift",
  "Diagnostic scanner",
  "Oil and tire tools",
  "Air compressor",
  "Power tools",
  "Workbench",
  "Good lighting",
];

export const PARTS_DISCLAIMER =
  "Prices are for the work, not the parts. We tell you what the parts cost before we start.";

export function tvMountPrice(inches: number): number {
  return inches * RATES.tvMountPerInch;
}

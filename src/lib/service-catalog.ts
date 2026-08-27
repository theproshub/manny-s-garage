import { RATES } from "@/lib/business";
import type { LineItem } from "@/components/estimate/line-item";

/**
 * Job codes: A- automotive, H- handyman, D- DIY bay, I- I.T.
 * Numbering leaves gaps so services can be added without renumbering.
 * These appear to customers — keep them stable once published.
 */

export const AUTO_ITEMS: readonly LineItem[] = [
  { code: "A-110", description: "Oil change, full synthetic", spec: "per service", price: 40 },
  { code: "A-120", description: "Battery replacement", spec: "per service", price: 40 },
  { code: "A-210", description: "Brake pad replacement", spec: "per axle", price: 180 },
  {
    code: "A-310",
    description: "Diagnostic scan",
    spec: "per visit",
    price: 0,
    note: "No charge when we do the repair.",
  },
  { code: "A-410", description: "Emergency roadside assistance", spec: "per call-out", price: 60 },
];

export const HANDYMAN_ITEMS: readonly LineItem[] = [
  { code: "H-110", description: "TV wall mount", spec: "per inch (diagonal)", price: RATES.tvMountPerInch },
  { code: "H-210", description: "Furniture assembly", spec: "per item", price: RATES.furniturePerItem },
  { code: "H-220", description: "Bunk bed assembly", spec: "per item", price: RATES.bunkBed },
  { code: "H-230", description: "Window treatment", spec: "per item", price: RATES.windowTreatment },
  { code: "H-310", description: "Security camera installation", spec: "per camera", price: RATES.cameraPerUnit },
];

export const DIY_ITEMS: readonly LineItem[] = [
  {
    code: "D-110",
    description: "Bay with lift and tools",
    spec: "per hour",
    price: RATES.diyBayHourly,
    note: `Sessions up to ${RATES.diyMaxHours} hours.`,
  },
  { code: "D-210", description: "Mechanic assistance", spec: "per hour", price: RATES.diyMechanicHourly },
];

export const IT_ITEMS: readonly LineItem[] = [
  { code: "I-110", description: "Wi-Fi and internet setup", spec: "per visit", price: null },
  { code: "I-210", description: "Computer help and repair", spec: "per visit", price: null },
  { code: "I-310", description: "Website and app building", spec: "per project", price: null },
  { code: "I-410", description: "Data and reporting", spec: "per project", price: null },
];

/** What the bay actually contains. Specificity is the evidence. */
export const DIY_INVENTORY: readonly string[] = [
  "Vehicle lift",
  "Diagnostic scanner",
  "Oil and tire tools",
  "Air compressor",
  "Power tools",
  "Workbench",
  "Task lighting",
];

export const PARTS_DISCLAIMER =
  "Listed price does not include parts unless otherwise noted—we confirm parts cost before work.";

export function tvMountPrice(inches: number): number {
  return inches * RATES.tvMountPerInch;
}

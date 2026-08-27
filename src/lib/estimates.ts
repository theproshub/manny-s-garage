import { RATES } from "@/lib/business";

/**
 * Every service Manny's Garage offers, each costed to a total.
 *
 * This replaced three hand-picked example jobs, which left anyone whose job
 * was not one of the three with no answer. The list is complete: a visitor
 * finds their own job and sees its total, rather than inferring it.
 *
 * Per-unit work (TV mounting by the inch, the bay by the hour) is expanded
 * into concrete choices, so every entry ends in a real number instead of an
 * arithmetic problem.
 *
 * No parts price is invented anywhere. Where a part genuinely varies the line
 * reads "confirmed first" and the job is marked an estimate — the shop's
 * actual policy, which is why the badge means something.
 */

export type EstimateLine = {
  label: string;
  detail: string;
  /** null = genuinely not knowable up front; renders as "confirmed first". */
  amount: number | null;
};

export type ServiceOption = {
  id: string;
  /** Trade key — drives the bay marker. */
  mark: string;
  group: string;
  service: string;
  summary: string;
  lines: EstimateLine[];
  status: "fixed" | "estimate" | "quoted";
  bookHref: string;
};

const partsLine = (what: string): EstimateLine => ({
  label: "Parts",
  detail: what,
  amount: null,
});

const AUTO_HREF = "/quote?for=auto";
const HAND_HREF = "/quote?for=handyman";
const DIY_HREF = "/quote?for=diy";

/* ── Car repair ── */
const AUTO: ServiceOption[] = [
  {
    id: "oil-change", mark: "A", group: "Car repair",
    service: "Oil change", summary: "Full synthetic, new filter, fluid levels checked.",
    status: "estimate", bookHref: AUTO_HREF,
    lines: [
      { label: "Labor", detail: "Drain, refill and new filter", amount: 40 },
      { label: "Fluid check", detail: "We top up what needs it", amount: 0 },
      partsLine("Oil and filter for your car"),
    ],
  },
  {
    id: "brakes", mark: "A", group: "Car repair",
    service: "Front or rear brake pads", summary: "New pads on one axle, fitted and checked.",
    status: "estimate", bookHref: AUTO_HREF,
    lines: [
      { label: "Labor", detail: "Fit new pads, one axle (2 wheels)", amount: 180 },
      { label: "Brake check", detail: "We look over the whole system", amount: 0 },
      partsLine("Brake pads for your car"),
    ],
  },
  {
    id: "battery", mark: "A", group: "Car repair",
    service: "New battery", summary: "Tested first — if yours is fine, you keep it.",
    status: "estimate", bookHref: AUTO_HREF,
    lines: [
      { label: "Labor", detail: "Test, remove and fit", amount: 40 },
      partsLine("Battery for your car"),
    ],
  },
  {
    id: "check-engine", mark: "A", group: "Car repair",
    service: "Check engine light", summary: "We read the fault and explain it in plain words.",
    status: "fixed", bookHref: AUTO_HREF,
    lines: [
      { label: "Fault reading", detail: "Free if we go on to do the repair", amount: 0 },
    ],
  },
  {
    id: "roadside", mark: "A", group: "Car repair",
    service: "Broken down in Fargo", summary: "Jump start, tire change, or a tow back to the shop.",
    status: "fixed", bookHref: AUTO_HREF,
    lines: [
      { label: "Call-out", detail: "Anywhere in Fargo", amount: 60 },
    ],
  },
];

/* ── House jobs ── */
const TV_SIZES = [32, 43, 55, 65, 75, 85] as const;

const TV: ServiceOption[] = TV_SIZES.map((size) => ({
  id: `tv-${size}`, mark: "H", group: "House job",
  service: `${size}-inch TV on the wall`,
  summary: "Measured, mounted and levelled.",
  status: "fixed" as const, bookHref: HAND_HREF,
  lines: [
    {
      label: "Mounting",
      detail: `${size} inches at $${RATES.tvMountPerInch.toFixed(2)} an inch`,
      amount: size * RATES.tvMountPerInch,
    },
    { label: "Bracket", detail: "Using the one that came with your TV", amount: 0 },
  ],
}));

const HOUSE: ServiceOption[] = [
  ...TV,
  {
    id: "furniture", mark: "H", group: "House job",
    service: "Furniture put together", summary: "Flat-pack built and put where you want it.",
    status: "fixed", bookHref: HAND_HREF,
    lines: [{ label: "Assembly", detail: "Per item", amount: RATES.furniturePerItem }],
  },
  {
    id: "bunk", mark: "H", group: "House job",
    service: "Bunk bed put together", summary: "Built, squared up and checked for safety.",
    status: "fixed", bookHref: HAND_HREF,
    lines: [{ label: "Assembly", detail: "Per bunk bed", amount: RATES.bunkBed }],
  },
  {
    id: "blinds", mark: "H", group: "House job",
    service: "Blinds or curtains hung", summary: "Measured, drilled and hung straight.",
    status: "fixed", bookHref: HAND_HREF,
    lines: [{ label: "Fitting", detail: "Per window", amount: RATES.windowTreatment }],
  },
  ...[1, 2, 3, 4].map((n) => ({
    id: `cameras-${n}`, mark: "H", group: "House job",
    service: `${n} security camera${n > 1 ? "s" : ""} installed`,
    summary: "Mounted, wired and set up on your phone.",
    status: "fixed" as const, bookHref: HAND_HREF,
    lines: [
      {
        label: "Installation",
        detail: `${n} camera${n > 1 ? "s" : ""} at $${RATES.cameraPerUnit.toFixed(2)} each`,
        amount: n * RATES.cameraPerUnit,
      },
    ],
  })),
];

/* ── Bay rental ── */
const BAY: ServiceOption[] = [
  ...[1, 2, 4, RATES.diyMaxHours].map((h) => ({
    id: `bay-${h}`, mark: "D", group: "Bay rental",
    service: `${h} hour${h > 1 ? "s" : ""} in the bay`,
    summary: "The lift, the tools and the space. You do the work.",
    status: "fixed" as const, bookHref: DIY_HREF,
    lines: [
      { label: "Bay", detail: `${h} hour${h > 1 ? "s" : ""} at $${RATES.diyBayHourly.toFixed(2)} an hour`, amount: h * RATES.diyBayHourly },
      { label: "Old oil", detail: "We get rid of it for you", amount: 0 },
    ],
  })),
  ...[1, 2].map((m) => ({
    id: `bay-4-mech-${m}`, mark: "D", group: "Bay rental",
    service: `4 hours in the bay + ${m} hour${m > 1 ? "s" : ""} of help`,
    summary: "Do it yourself, with a mechanic on hand for the tricky part.",
    status: "fixed" as const, bookHref: DIY_HREF,
    lines: [
      { label: "Bay", detail: `4 hours at $${RATES.diyBayHourly.toFixed(2)} an hour`, amount: 4 * RATES.diyBayHourly },
      { label: "Mechanic", detail: `${m} hour${m > 1 ? "s" : ""} at $${RATES.diyMechanicHourly.toFixed(2)} an hour`, amount: m * RATES.diyMechanicHourly },
      { label: "Old oil", detail: "We get rid of it for you", amount: 0 },
    ],
  })),
];

/* ── Tech help ── */
const TECH: ServiceOption[] = [
  { id: "wifi", service: "Wi-Fi and internet set up", summary: "Routers, extenders and mesh — signal in every room." },
  { id: "computer", service: "Computer fixed", summary: "Slow machines, ones that will not start, files recovered." },
  { id: "website", service: "A website or app built", summary: "We agree the price first, build it and hand it over." },
  { id: "reports", service: "Spreadsheets and reports", summary: "Your numbers in one place, for a small business." },
].map((t) => ({
  ...t, mark: "I", group: "Tech help",
  status: "quoted" as const, bookHref: "/quote",
  lines: [{ label: "Price", detail: "We look at the job first, then tell you", amount: null }],
}));

export const SERVICE_OPTIONS: readonly ServiceOption[] = [...AUTO, ...HOUSE, ...BAY, ...TECH];

export const SERVICE_GROUPS = ["Car repair", "House job", "Bay rental", "Tech help"] as const;

export function optionsInGroup(group: string): ServiceOption[] {
  return SERVICE_OPTIONS.filter((o) => o.group === group);
}

export function optionTotal(o: ServiceOption): number {
  return o.lines.reduce((sum, l) => sum + (l.amount ?? 0), 0);
}

export function hasPending(o: ServiceOption): boolean {
  return o.lines.some((l) => l.amount === null);
}

import { RATES } from "@/lib/business";
import { bookingPath } from "@/lib/booking-destinations";

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

/* Each trade books on our own page, where the provider's calendar is
 * framed. See `booking-destinations.ts` for why the handoff stopped being
 * a redirect. */
const AUTO_HREF = bookingPath("automotive");
const HAND_HREF = bookingPath("handyman");
const DIY_HREF = bookingPath("diy");

/* ── Automotive ── */
const AUTO: ServiceOption[] = [
  {
    id: "oil-change", mark: "A", group: "Automotive Service",
    service: "Oil Change", summary: "Full synthetic, new filter, fluid levels checked.",
    status: "estimate", bookHref: AUTO_HREF,
    lines: [
      { label: "Labor", detail: "Drain, refill and new filter", amount: 40 },
      { label: "Fluid check", detail: "We top off what needs it", amount: 0 },
      partsLine("Oil and filter for your car"),
    ],
  },
  {
    id: "brakes", mark: "A", group: "Automotive Service",
    service: "Front or Rear Brake Pads", summary: "New pads on one axle, installed and checked.",
    status: "estimate", bookHref: AUTO_HREF,
    lines: [
      { label: "Labor", detail: "New pads on one axle (2 wheels)", amount: 180 },
      { label: "Brake check", detail: "We look over the whole system", amount: 0 },
      partsLine("Brake pads for your car"),
    ],
  },
  {
    id: "battery", mark: "A", group: "Automotive Service",
    service: "New Battery", summary: "Tested first — if yours is fine, you keep it.",
    status: "estimate", bookHref: AUTO_HREF,
    lines: [
      { label: "Labor", detail: "Test, remove and install", amount: 40 },
      partsLine("Battery for your car"),
    ],
  },
  {
    id: "check-engine", mark: "A", group: "Automotive Service",
    service: "Check Engine Light", summary: "We read the code and explain it in plain words.",
    status: "fixed", bookHref: AUTO_HREF,
    lines: [
      { label: "Code reading", detail: "Free if we go on to do the repair", amount: 0 },
    ],
  },
  {
    id: "roadside", mark: "A", group: "Automotive Service",
    service: "Broken Down in Fargo", summary: "Jump start, tire change, or a tow back to the shop.",
    status: "fixed", bookHref: AUTO_HREF,
    lines: [
      { label: "Service call", detail: "Anywhere in Fargo", amount: 60 },
    ],
  },
];

/* ── House jobs ── */
const TV_SIZES = [32, 43, 55, 65, 75, 85] as const;

const TV: ServiceOption[] = TV_SIZES.map((size) => ({
  id: `tv-${size}`, mark: "H", group: "Handyman",
  service: `${size}-inch TV on the Wall`,
  summary: "Measured, mounted and leveled.",
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
    id: "furniture", mark: "H", group: "Handyman",
    service: "Furniture Put Together", summary: "Boxed furniture built and put where you want it.",
    status: "fixed", bookHref: HAND_HREF,
    lines: [{ label: "Assembly", detail: "Per item", amount: RATES.furniturePerItem }],
  },
  {
    id: "bunk", mark: "H", group: "Handyman",
    service: "Bunk Bed Put Together", summary: "Built, squared up and checked for safety.",
    status: "fixed", bookHref: HAND_HREF,
    lines: [{ label: "Assembly", detail: "Per bunk bed", amount: RATES.bunkBed }],
  },
  {
    id: "blinds", mark: "H", group: "Handyman",
    service: "Blinds or Curtains Hung", summary: "Measured, drilled and hung straight.",
    status: "fixed", bookHref: HAND_HREF,
    lines: [{ label: "Installation", detail: "Per window", amount: RATES.windowTreatment }],
  },
  ...[1, 2, 3, 4].map((n) => ({
    id: `cameras-${n}`, mark: "H", group: "Handyman",
    service: `${n} Security Camera${n > 1 ? "s" : ""} Installed`,
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

/* ── DIY Bay ── */
const BAY: ServiceOption[] = [
  ...[1, 2, 4, RATES.diyMaxHours].map((h) => ({
    id: `bay-${h}`, mark: "D", group: "DIY Bay",
    service: `${h} Hour${h > 1 ? "s" : ""} in the Bay`,
    summary: "The lift, the tools and the space. You do the work.",
    status: "fixed" as const, bookHref: DIY_HREF,
    lines: [
      { label: "Bay", detail: `${h} hour${h > 1 ? "s" : ""} at $${RATES.diyBayHourly.toFixed(2)} an hour`, amount: h * RATES.diyBayHourly },
      { label: "Old oil", detail: "We get rid of it for you", amount: 0 },
    ],
  })),
  ...[1, 2].map((m) => ({
    id: `bay-4-mech-${m}`, mark: "D", group: "DIY Bay",
    service: `4 Hours in the Bay + ${m} Hour${m > 1 ? "s" : ""} of Help`,
    summary: "Do it yourself, with a mechanic on hand for the tricky part.",
    status: "fixed" as const, bookHref: DIY_HREF,
    lines: [
      { label: "Bay", detail: `4 hours at $${RATES.diyBayHourly.toFixed(2)} an hour`, amount: 4 * RATES.diyBayHourly },
      { label: "Mechanic", detail: `${m} hour${m > 1 ? "s" : ""} at $${RATES.diyMechanicHourly.toFixed(2)} an hour`, amount: m * RATES.diyMechanicHourly },
      { label: "Old oil", detail: "We get rid of it for you", amount: 0 },
    ],
  })),
];

/* ── I.T. ── */
const TECH: ServiceOption[] = [
  { id: "wifi", service: "Wi-Fi and Internet Set Up", summary: "Routers, extenders and mesh — signal in every room." },
  { id: "computer", service: "Computer Fixed", summary: "Slow machines, ones that won’t start, files recovered." },
  { id: "website", service: "A Website or App Built", summary: "We agree on the price first, build it, and hand it over." },
  { id: "reports", service: "Spreadsheets and Reports", summary: "All your numbers in one place, built for a small business." },
].map((t) => ({
  ...t, mark: "I", group: "I.T. Service",
  status: "quoted" as const, bookHref: "/book",
  lines: [{ label: "Price", detail: "We look at the job first, then tell you", amount: null }],
}));

export const SERVICE_OPTIONS: readonly ServiceOption[] = [...AUTO, ...HOUSE, ...BAY, ...TECH];

export const SERVICE_GROUPS = ["Automotive Service", "Handyman", "DIY Bay", "I.T. Service"] as const;

/**
 * `/quote?for=<slug>` -> the tab that link should open.
 *
 * Keyed on the trade mark rather than the group label. The labels have been
 * renamed twice ("Car repair" -> "Auto Repair" -> "Automotive Service") and a
 * table written against them goes stale without failing: the link still
 * resolves, it just opens the wrong trade. The marks are the estimate's own
 * join key and do not move.
 *
 * Both the route word and the trade word are accepted, because the links in
 * the wild use the route (`for=diy`, `/diy-garage`) while a person writing one
 * by hand reaches for the trade.
 */
const MARK_BY_SLUG: Record<string, string> = {
  auto: "A",
  automotive: "A",
  handyman: "H",
  house: "H",
  diy: "D",
  bay: "D",
  it: "I",
  tech: "I",
};

/** The group a `for=` slug names, or null if it names nothing we have. */
export function groupForSlug(slug: string | null | undefined): string | null {
  if (!slug) return null;
  const mark = MARK_BY_SLUG[slug.trim().toLowerCase()];
  if (!mark) return null;
  return SERVICE_OPTIONS.find((o) => o.mark === mark)?.group ?? null;
}

export function optionsInGroup(group: string): ServiceOption[] {
  return SERVICE_OPTIONS.filter((o) => o.group === group);
}

export function optionTotal(o: ServiceOption): number {
  return o.lines.reduce((sum, l) => sum + (l.amount ?? 0), 0);
}

export function hasPending(o: ServiceOption): boolean {
  return o.lines.some((l) => l.amount === null);
}

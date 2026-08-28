import type { LineItem } from "@/components/estimate/line-item";

/**
 * What a schedule starts at, or null when nothing in it carries a fixed price.
 *
 * Three exclusions, each of which produced a wrong answer when it was missing:
 * free items (0) and quoted-on-inspection items (null) are not a starting
 * price; and neither is a measured rate. Handyman's cheapest entry is TV
 * mounting at $1.50 *per inch of screen*, so a naive minimum advertised this
 * shop as doing house jobs for a dollar fifty. I.T. is priced entirely on
 * inspection, so a naive minimum returned Infinity.
 *
 * Derived from the same catalog the schedules render, so the opening cannot
 * drift out of step with them. It lives here rather than in the page because
 * the Open Graph cards quote these same figures: a share preview promising a
 * price the page no longer charges is worse than no share preview.
 */
const RATE_SPEC = /\bper (inch|foot|ft|sq)\b/i;

export function startsAt(items: readonly LineItem[]): number | null {
  const fixed = items
    .filter((item) => !RATE_SPEC.test(item.spec ?? ""))
    .map((item) => item.price)
    .filter((price): price is number => typeof price === "number" && price > 0);

  return fixed.length > 0 ? Math.min(...fixed) : null;
}

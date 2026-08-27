/**
 * The estimate number and date shown on the letterhead.
 *
 * Derived from the date, never random: the value must be identical on the
 * server and the client or React reports a hydration mismatch, and a number
 * that reshuffles on every reload would read as fake — the opposite of what
 * this design is for.
 *
 * Format: MG-YYDDD (two-digit year, day of year). Sequential-looking,
 * honest, and stable for a whole day.
 */
function dayOfYear(d: Date): number {
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  return Math.floor((Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - start) / 86400000);
}

export function estimateNo(now: Date = new Date()): string {
  const yy = String(now.getUTCFullYear() % 100).padStart(2, "0");
  const ddd = String(dayOfYear(now)).padStart(3, "0");
  return `MG-${yy}${ddd}`;
}

export function todayLong(now: Date = new Date()): string {
  return now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

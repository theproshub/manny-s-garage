import Link from "next/link";
import { RATES } from "@/lib/business";
import { BayMarker, BayNote } from "./bay-marker";

/**
 * The rate schedule that opens a multi-part estimate: the headline figure for
 * each trade before any detail. This is the orientation moment — a visitor
 * knows within a second what this shop does and roughly what it costs.
 *
 * Ruled cells of one table, not cards in a grid: they share rules, they do
 * not round, and each carries a real figure rather than a blurb.
 */
const RATES_SUMMARY = [
  { mark: "A", trade: "Automotive", lead: "from", figure: "$40", unit: "oil change", href: "/auto" },
  { mark: "H", trade: "Handyman", lead: "from", figure: `$${RATES.tvMountPerInch.toFixed(2)}`, unit: "per inch, TV mount", href: "/handyman" },
  { mark: "D", trade: "DIY bay", lead: "", figure: `$${RATES.diyBayHourly}`, unit: "per hour, lift + tools", href: "/diy-garage" },
  { mark: "I", trade: "I.T.", lead: "", figure: "Quoted", unit: "per job, scoped first", href: "/it" },
];

export function RateSummary() {
  return (
    <section className="ledger px-4 sm:px-6" aria-labelledby="rates-heading">
      <h2 id="rates-heading" className="sr-only">Rate summary</h2>
      <div className="rate-grid">
        {RATES_SUMMARY.map((r) => (
          <Link key={r.mark} href={r.href} className="rate-cell">
            <span className="mb-2"><BayMarker mark={r.mark} /></span>
            <span className="field-label">{r.trade}</span>
            {r.lead ? <span className="rate-lead">{r.lead}</span> : null}
            <span className="rate-figure figure">{r.figure}</span>
            <span className="rate-unit">{r.unit}</span>
            <span className="mt-1.5"><BayNote mark={r.mark} /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}

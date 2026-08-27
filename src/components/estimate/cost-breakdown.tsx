import Link from "next/link";
import { formatUsd } from "./line-item";
import { BayMarker } from "./bay-marker";
import {
  estimateSubtotal,
  hasUnknownParts,
  type EstimateLine,
  type WorkedEstimate,
} from "@/lib/estimates";

/**
 * One job, broken down to a total.
 *
 * Reads in the order a receipt does — service, what you are paying for, each
 * amount, then the total — so a first-time visitor answers "what is this and
 * what will it cost" in a few seconds without opening anything.
 *
 * The receipt is the information structure, not the styling: no paper texture,
 * no dot leaders, no barcode. Amounts are right-aligned tabular figures so
 * they can be compared down the column at a glance.
 */

function Amount({ line }: { line: EstimateLine }) {
  if (line.amount === null) {
    return <span className="bd-pending">Confirmed first</span>;
  }
  if (line.amount === 0) {
    return <span className="bd-included">Included</span>;
  }
  return <span className="bd-amount">{formatUsd(line.amount)}</span>;
}

export function CostBreakdown({ estimate: e }: { estimate: WorkedEstimate }) {
  const subtotal = estimateSubtotal(e);
  const pending = hasUnknownParts(e);
  const isEstimate = e.status === "estimate";

  return (
    <article className="bd" aria-labelledby={`bd-${e.slug}`}>
      <header className="bd-head">
        <div className="flex items-start gap-3">
          <BayMarker mark={e.mark} />
          <div className="min-w-0">
            <p className="field-label">{e.category}</p>
            <h3 id={`bd-${e.slug}`} className="bd-service">{e.service}</h3>
          </div>
        </div>
        <p className="bd-summary">{e.summary}</p>
      </header>

      <dl className="bd-lines">
        {e.lines.map((line) => (
          <div key={line.label} className="bd-row">
            <dt className="min-w-0">
              <span className="bd-label">{line.label}</span>
              <span className="bd-detail">{line.detail}</span>
            </dt>
            <dd className="bd-value">
              <Amount line={line} />
            </dd>
          </div>
        ))}
      </dl>

      <div className="bd-sum">
        <div className="bd-row bd-subtotal">
          <dt className="bd-label">{pending ? "Work subtotal" : "Subtotal"}</dt>
          <dd className="bd-value bd-amount">{formatUsd(subtotal)}</dd>
        </div>
        {pending ? (
          <div className="bd-row bd-subtotal">
            <dt className="bd-label">Parts</dt>
            <dd className="bd-value bd-pending">Confirmed before work</dd>
          </div>
        ) : null}
      </div>

      <div className={`bd-total ${isEstimate ? "is-estimate" : ""}`}>
        <div>
          <p className="bd-total-label">
            {isEstimate ? "Estimated total" : "Total price"}
          </p>
          <p className="bd-total-note">
            {isEstimate
              ? "Parts still to add — we tell you before we start."
              : "This is the price. Nothing gets added."}
          </p>
        </div>
        <p className="bd-total-figure">
          {isEstimate ? <span className="bd-from">from </span> : null}
          {formatUsd(subtotal)}
        </p>
      </div>

      <div className="bd-foot">
        <Link href={e.bookHref} className="btn-primary">Book this</Link>
        <span className={`bd-badge ${isEstimate ? "is-estimate" : "is-fixed"}`}>
          {isEstimate ? "Estimate" : "Fixed price"}
        </span>
      </div>
    </article>
  );
}

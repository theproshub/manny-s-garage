import Link from "next/link";
import { BUSINESS } from "@/lib/business";

/**
 * What the end of the document is actually for.
 *
 * This replaced a "Authorized by / Signature / Date" block, which was form
 * furniture copied literally: there is nothing to sign on a webpage. The slot
 * belongs to the visitor's real next move, so it now answers "what happens if
 * I go ahead?" — the question people actually have before booking a trade.
 *
 * Numbered because the order genuinely matters; it is a sequence, not a list.
 */
const STEPS = [
  "Book online or call and pick a time that suits you.",
  "We confirm the price with you before any work starts.",
  "You approve the figure, then we do the job.",
];

export function NextStep({
  href,
  label = "Book online",
}: {
  href: string;
  label?: string;
}) {
  return (
    <section className="ledger tier-prose px-4 sm:px-6" aria-labelledby="next-step">
      <p className="field-label">Next step</p>
      <h2 id="next-step" className="form-header mt-1 text-2xl">What happens if you go ahead</h2>

      <ol className="measure mt-4">
        {STEPS.map((step, i) => (
          <li key={step} className="rule-item flex gap-4 py-3">
            <span className="figure shrink-0 text-[var(--stamp)]">{i + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link href={href} className="btn-primary">{label}</Link>
        <a href={BUSINESS.phone.tel} className="btn-outline">
          Call {BUSINESS.phone.display}
        </a>
      </div>

      <p className="mt-3 text-sm text-[var(--ink-muted)]">
        Booking and payment are handled by Square.
      </p>
    </section>
  );
}

import Link from "next/link";
import { formatUsd, type LineItem } from "./line-item";
import { WhereBadge } from "./where-badge";

type ScheduleProps = {
  /** Trade key — selects the bay marker. */
  mark: string;
  heading: string;
  caption?: string;
  items: readonly LineItem[];
  total?: number;
  footnote?: string;
};

export function Schedule({ mark, heading, caption, items, total, footnote }: ScheduleProps) {
  /**
   * A schedule where nothing carries a fixed price is a different document,
   * not the same one with a column of repeated words. I.T. is priced entirely
   * on inspection, so a Price column rendered "quoted" four times down the
   * signature band — a column holding no information in the most scanned
   * position on the page.
   *
   * Detected from the catalog rather than passed as a flag, so a schedule that
   * gains its first fixed price starts rendering the price column on its own.
   */
  const allQuoted = items.length > 0 && items.every((item) => item.price === null);

  return (
    <section className="ledger tier-ledger w-full px-4 sm:px-6">
      <div className="sched-layout">
        <div className="sched-head">
          <h2 className="press press-lg">{heading}</h2>
          <p className="mt-1"><WhereBadge mark={mark} /></p>
          {caption ? (
            <p className="mt-2 text-sm text-[var(--ink-muted)]">{caption}</p>
          ) : null}
        </div>

        <div className="min-w-0">
          {/* Real table markup: tabular data reads correctly to screen readers
              as well as looking like the document it imitates. */}
          <table
            className={`sched mt-5 w-full border-collapse text-left lg:mt-0${
              allQuoted ? " sched--quoted" : ""
            }`}
          >
            <caption className="sr-only">{heading} — itemized prices</caption>
            <thead>
              <tr>
                <th scope="col" className="field-label py-2 pr-3">Service</th>
                <th scope="col" className="field-label py-2 pr-3">Unit</th>
                {allQuoted ? null : (
                  <th scope="col" className="field-label price-cell px-3 py-2 text-right">Price</th>
                )}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.code} className="align-baseline">
                  <td data-label="Service" className="py-3 pr-3">
                    {item.href ? (
                      <Link href={item.href} className="underline underline-offset-4">
                        {item.description}
                      </Link>
                    ) : (
                      item.description
                    )}
                    {item.note ? (
                      <span className="block text-sm text-[var(--ink-muted)]">{item.note}</span>
                    ) : null}
                  </td>
                  <td data-label="Unit" className="py-3 pr-3 text-sm text-[var(--ink-muted)]">
                    {item.spec ?? "—"}
                  </td>
                  {allQuoted ? null : (
                    <td
                      data-label="Price"
                      className="figure price-cell px-3 py-3 text-right font-medium"
                    >
                      {item.price === null ? (
                        <span className="text-[var(--ink-muted)]">quoted</span>
                      ) : (
                        formatUsd(item.price)
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
            {typeof total === "number" ? (
              <tfoot>
                <tr className="rule-total">
                  <td className="field-label py-3" colSpan={2}>Subtotal</td>
                  <td className="figure price-cell px-3 py-3 text-right font-semibold">
                    {formatUsd(total)}
                  </td>
                </tr>
              </tfoot>
            ) : null}

            {/* The bottom row of an estimate is where the money statement goes.
                Here the money statement is that there is not one yet, and how
                to get one — which is the single useful thing a reader of this
                schedule wants. It sits in the total position, in the canary
                the price column would have carried, so the signature holds. */}
            {allQuoted ? (
              <tfoot>
                <tr className="rule-total">
                  {/* The flex layout lives on a child, not on the cell itself:
                      display:flex on a td drops it out of table layout and
                      colSpan silently collapses to a single column. */}
                  <td className="sched-quote-cell" colSpan={2}>
                    <div className="sched-quote">
                      <span>
                        <span className="field-label block">Priced on inspection</span>
                        <span className="sched-quote-said">
                          We look at the job first, then give you a fixed price.
                          Nothing starts until you have said yes to it.
                        </span>
                      </span>
                      <Link href="/quote" className="btn-primary shrink-0">
                        Get a price
                      </Link>
                    </div>
                  </td>
                </tr>
              </tfoot>
            ) : null}
          </table>

          {footnote ? (
            <p className="measure mt-3 text-sm text-[var(--ink-muted)]">{footnote}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

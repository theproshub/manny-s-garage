import Link from "next/link";
import { formatUsd, type LineItem } from "./line-item";
import { BayMarker, BayNote } from "./bay-marker";

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
  return (
    <section className="ledger tier-ledger w-full px-4 sm:px-6">
      <div className="sched-layout">
        <div className="sched-head">
          <div className="flex items-center gap-3">
            <BayMarker mark={mark} size="lg" />
            <div className="min-w-0">
              <h2 className="form-header text-2xl sm:text-3xl">{heading}</h2>
              <BayNote mark={mark} />
            </div>
          </div>
          {caption ? (
            <p className="mt-2 text-sm text-[var(--ink-muted)]">{caption}</p>
          ) : null}
        </div>

        <div className="min-w-0">
          {/* Real table markup: tabular data reads correctly to screen readers
              as well as looking like the document it imitates. */}
          <table className="sched mt-5 w-full border-collapse text-left lg:mt-0">
            <caption className="sr-only">{heading} — itemized prices</caption>
            <thead>
              <tr>
                <th scope="col" className="field-label py-2 pr-3">Service</th>
                <th scope="col" className="field-label py-2 pr-3">Unit</th>
                <th scope="col" className="field-label price-cell px-3 py-2 text-right">Price</th>
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
          </table>

          {footnote ? (
            <p className="measure mt-3 text-sm text-[var(--ink-muted)]">{footnote}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

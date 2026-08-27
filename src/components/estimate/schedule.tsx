import Link from "next/link";
import { formatUsd, type LineItem } from "./line-item";

type ScheduleProps = {
  heading: string;
  caption?: string;
  items: readonly LineItem[];
  total?: number;
  footnote?: string;
};

export function Schedule({ heading, caption, items, total, footnote }: ScheduleProps) {
  return (
    <section className="ledger tier-ledger w-full px-4 sm:px-6">
      <h2 className="form-header text-xl sm:text-2xl">{heading}</h2>
      {caption ? (
        <p className="measure mt-1 text-sm text-[var(--ink-muted)]">{caption}</p>
      ) : null}

      {/* Real table markup: this is tabular data, so it reads correctly to
          screen readers as well as looking like the document it imitates. */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <caption className="sr-only">{heading} — itemized prices</caption>
          <thead>
            <tr className="rule-item">
              <th scope="col" className="field-label py-2 pr-3">Code</th>
              <th scope="col" className="field-label py-2 pr-3">Description</th>
              <th scope="col" className="field-label py-2 pr-3">Unit</th>
              <th scope="col" className="field-label py-2 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.code} className="rule-item align-baseline">
                <td className="figure py-3 pr-3 text-sm text-[var(--ink-muted)]">{item.code}</td>
                <td className="py-3 pr-3">
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
                <td className="py-3 pr-3 text-sm text-[var(--ink-muted)]">{item.spec ?? "—"}</td>
                <td className="figure py-3 text-right">
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
                <td className="field-label py-3" colSpan={3}>Subtotal</td>
                <td className="figure py-3 text-right font-semibold">{formatUsd(total)}</td>
              </tr>
            </tfoot>
          ) : null}
        </table>
      </div>

      {footnote ? (
        <p className="measure mt-3 text-sm text-[var(--ink-muted)]">{footnote}</p>
      ) : null}
    </section>
  );
}

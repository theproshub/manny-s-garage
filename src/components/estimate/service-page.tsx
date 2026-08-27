import type { ReactNode } from "react";
import { Schedule } from "./schedule";
import { SignatureLine } from "./signature-line";
import { BUSINESS } from "@/lib/business";
import type { LineItem } from "./line-item";

type ServicePageProps = {
  /** Form section identifier — matches the job-code prefix on every row. */
  mark: string;
  title: string;
  intro: string;
  items: readonly LineItem[];
  footnote?: string;
  quoteHref: string;
  /** Terms specific to this trade, appended to the shared ones. */
  terms?: readonly string[];
  children?: ReactNode;
};

const SHARED_TERMS = [
  "Work is by appointment. Same-day and next-day slots are often open.",
  "Booking and payment are handled by Square.",
];

export function ServicePage({
  mark,
  title,
  intro,
  items,
  footnote,
  quoteHref,
  terms = [],
  children,
}: ServicePageProps) {
  const allTerms = [...terms, ...SHARED_TERMS];

  return (
    <main>
      <section className="ledger tier-prose px-4 sm:px-6">
        <p className="field-label">Schedule {mark}</p>
        <h1 className="form-header mt-1 text-3xl sm:text-4xl">{title}</h1>
        <p className="measure mt-3">{intro}</p>
      </section>

      <Schedule mark={mark} heading="Line items" items={items} footnote={footnote} />

      {children}

      <section className="ledger tier-prose px-4 sm:px-6">
        <h2 className="form-header text-xl">Terms</h2>
        <ul className="measure mt-2">
          {allTerms.map((t) => (
            <li key={t} className="rule-item py-2 text-sm">{t}</li>
          ))}
          <li className="py-2 text-sm">
            Questions before booking:{" "}
            <a href={BUSINESS.phone.tel} className="figure underline underline-offset-4">
              {BUSINESS.phone.display}
            </a>
          </li>
        </ul>
      </section>

      <SignatureLine href={quoteHref} />
    </main>
  );
}

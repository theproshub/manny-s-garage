import type { ReactNode } from "react";
import { Schedule } from "./schedule";
import { NextStep } from "./next-step";
import { BUSINESS } from "@/lib/business";
import type { LineItem } from "./line-item";
import { WhereBadge } from "./where-badge";

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
  "We work by appointment. There is often a slot free today or tomorrow.",
  "You book and pay through Square.",
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
        <h1 className="t-display mt-2 max-w-[18ch]">{title}</h1>
        <p className="mt-4"><WhereBadge mark={mark} detail /></p>
                <p className="measure t-lead mt-4">{intro}</p>
      </section>

      <Schedule mark={mark} heading="What it costs" items={items} footnote={footnote} />

      {children}

      <section className="ledger tier-prose px-4 sm:px-6">
        <h2 className="form-header text-xl">Good to know</h2>
        <ul className="measure mt-2">
          {allTerms.map((t) => (
            <li key={t} className="rule-item py-2 text-sm">{t}</li>
          ))}
          <li className="py-2 text-sm">
            Not sure? Give us a call:{" "}
            <a href={BUSINESS.phone.tel} className="figure underline underline-offset-4">
              {BUSINESS.phone.display}
            </a>
          </li>
        </ul>
      </section>

      <NextStep href={quoteHref} />
    </main>
  );
}

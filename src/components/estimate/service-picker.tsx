"use client";

import { useState } from "react";
import Link from "next/link";
import { formatUsd } from "./line-item";
import { WhereBadge } from "./where-badge";
import {
  SERVICE_GROUPS,
  optionsInGroup,
  optionTotal,
  hasPending,
  type ServiceOption,
} from "@/lib/estimates";
import { destinationForPath } from "@/lib/booking-destinations";

/**
 * Pick your job, see what it costs.
 *
 * Every service the shop offers is listed, so a visitor finds their own job
 * instead of inferring a price from someone else's. Choosing one shows the
 * breakdown beside it: what the work is, each amount, then the total.
 *
 * A service is always selected — there is no empty state to decode.
 */
export function ServicePicker() {
  const [group, setGroup] = useState<string>(SERVICE_GROUPS[0]);
  const [selected, setSelected] = useState<ServiceOption>(optionsInGroup(SERVICE_GROUPS[0])[0]);

  const options = optionsInGroup(group);

  function pickGroup(g: string) {
    setGroup(g);
    setSelected(optionsInGroup(g)[0]);
  }

  const total = optionTotal(selected);
  const pending = hasPending(selected);
  const isQuoted = selected.status === "quoted";
  const isEstimate = selected.status === "estimate";
  /* Non-null for anything with a booking page of its own; I.T. is quoted
     first and has none, so its button asks rather than books. Having a page
     is not the same as having a calendar — the DIY bay has the first and not
     the second, so the note below reads off `method`, not off `dest`. */
  const dest = destinationForPath(selected.bookHref);
  const calendar =
    dest?.method.kind === "calendar" ? dest.method : null;

  return (
    <div className="picker">
      <div role="tablist" aria-label="Kind of work" className="picker-groups">
        {SERVICE_GROUPS.map((g) => (
          <button
            key={g}
            role="tab"
            aria-selected={group === g}
            onClick={() => pickGroup(g)}
            className={`picker-group ${group === g ? "is-on" : ""}`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="picker-body">
        <div className="picker-list">
          <p className="field-label px-4 pt-3 pb-1">Choose your job</p>
          <ul>
            {options.map((o) => {
              const on = o.id === selected.id;
              const t = optionTotal(o);
              return (
                <li key={o.id}>
                  <button
                    onClick={() => setSelected(o)}
                    aria-current={on ? "true" : undefined}
                    className={`picker-item ${on ? "is-on" : ""}`}
                  >
                    <span className="picker-item-name">{o.service}</span>
                    <span className="picker-item-price">
                      {o.status === "quoted"
                        ? "Quoted"
                        : t === 0
                          ? "Free"
                          : `${hasPending(o) ? "from " : ""}${formatUsd(t)}`}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <article className="bd" aria-live="polite">
          <header className="bd-head">
            <p className="field-label">{selected.group}</p>
            <h3 className="bd-service">{selected.service}</h3>
            <p className="bd-summary">{selected.summary}</p>
            <p className="mt-3"><WhereBadge mark={selected.mark} detail /></p>
          </header>

          <dl className="bd-lines">
            {selected.lines.map((line) => (
              <div key={line.label} className="bd-row">
                <dt className="min-w-0">
                  <span className="bd-label">{line.label}</span>
                  <span className="bd-detail">{line.detail}</span>
                </dt>
                <dd className="bd-value">
                  {line.amount === null ? (
                    <span className="bd-pending">Confirmed first</span>
                  ) : line.amount === 0 ? (
                    <span className="bd-included">Included</span>
                  ) : (
                    <span className="bd-amount">{formatUsd(line.amount)}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          {!isQuoted ? (
            <div className="bd-sum">
              <div className="bd-row bd-subtotal">
                <dt className="bd-label">{pending ? "Work subtotal" : "Subtotal"}</dt>
                <dd className="bd-value bd-amount">{formatUsd(total)}</dd>
              </div>
              {pending ? (
                <div className="bd-row bd-subtotal">
                  <dt className="bd-label">Parts</dt>
                  <dd className="bd-value bd-pending">Confirmed before work</dd>
                </div>
              ) : null}
            </div>
          ) : null}

          <div className={`bd-total ${isEstimate || isQuoted ? "is-estimate" : ""}`}>
            <div>
              <p className="bd-total-label">
                {isQuoted
                  ? "Priced after we look"
                  : total === 0
                    ? "No charge"
                    : isEstimate
                      ? "Estimated total"
                      : "Total price"}
              </p>
              <p className="bd-total-note">
                {isQuoted
                  ? "Every tech job is different, so we will not guess at a number."
                  : total === 0
                    ? "We do not charge for this."
                    : isEstimate
                      ? "Parts still to add — we tell you before we start."
                      : "This is the price. Nothing gets added."}
              </p>
            </div>
            {!isQuoted ? (
              <p className="bd-total-figure">
                {isEstimate ? <span className="bd-from">from </span> : null}
                {total === 0 ? "Free" : formatUsd(total)}
              </p>
            ) : null}
          </div>

          <div className="bd-foot">
            <Link href={selected.bookHref} className="btn-primary">
              {dest ? "Book this" : "Ask about this"}
            </Link>
            <div className="bd-foot-meta">
              {calendar ? (
                <span className="bd-foot-note">
                  Opens the {calendar.provider} calendar here, on this site
                </span>
              ) : dest ? (
                <span className="bd-foot-note">
                  Bay time is booked by phone — the number is on the next page
                </span>
              ) : null}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

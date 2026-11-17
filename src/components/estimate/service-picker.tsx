"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatUsd } from "./line-item";
import { WhereBadge } from "./where-badge";
import {
  SERVICE_GROUPS,
  groupForSlug,
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
  /* `/quote?for=diy` opens the DIY Bay tab. Eight links across the site passed
     this and nothing read it, so "the bay rates are here" landed the reader on
     Automotive Service — the first tab — and the price they had been promised
     was two clicks away with no sign it had moved. */
  const params = useSearchParams();
  const slug = params.get("for");
  const wanted = groupForSlug(slug);

  const [group, setGroup] = useState<string>(wanted ?? SERVICE_GROUPS[0]);
  const [selected, setSelected] = useState<ServiceOption>(
    optionsInGroup(wanted ?? SERVICE_GROUPS[0])[0],
  );

  /* Reading the param into `useState` only covers the first render. Moving
     between `?for=auto` and `?for=diy` is the same route, so React keeps this
     component mounted and the initialiser never runs again. Adjusting during
     render — rather than in an effect — is React's own answer to that, and it
     repaints before the stale tab is ever shown. */
  const [lastSlug, setLastSlug] = useState<string | null>(slug);
  if (slug !== lastSlug) {
    setLastSlug(slug);
    /* An absent or unreadable `for=` falls back to the first tab rather than
       leaving whatever was open, so the address decides what is shown and
       `/quote` means the same thing however the reader arrived at it. Only a
       change of slug resets anything, so tabs the reader picks by hand stay
       picked. */
    const next = wanted ?? SERVICE_GROUPS[0];
    if (next !== group) {
      setGroup(next);
      setSelected(optionsInGroup(next)[0]);
    }
  }

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
          <p className="field-label px-4 pt-3 pb-1">Pick your job</p>
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
                    <span className="bd-pending">We’ll price it</span>
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
                <dt className="bd-label">{pending ? "Labor subtotal" : "Subtotal"}</dt>
                <dd className="bd-value bd-amount">{formatUsd(total)}</dd>
              </div>
              {pending ? (
                <div className="bd-row bd-subtotal">
                  <dt className="bd-label">Parts</dt>
                  <dd className="bd-value bd-pending">Priced before we start</dd>
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
                  ? "Every tech job is different, so we’d rather look at it than guess."
                  : total === 0
                    ? "This one’s on us."
                    : isEstimate
                      ? "Parts still go on top. We’ll tell you what they run before we start."
                      : "That’s what you pay. Nothing gets added on."}
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
              {dest ? "Book This" : "Ask About This"}
            </Link>
            <div className="bd-foot-meta">
              {calendar ? (
                <span className="bd-foot-note">
                  Opens our calendar right here on this page
                </span>
              ) : dest ? (
                <span className="bd-foot-note">
                  We price this one after we look at it
                </span>
              ) : null}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

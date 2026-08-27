"use client";

import { ServicePicker } from "@/components/estimate/service-picker";
import { BUSINESS } from "@/lib/business";
import { PARTS_DISCLAIMER } from "@/lib/service-catalog";

export default function QuotePage() {
  return (
    <main>
      <section className="ledger tier-prose px-4 sm:px-6">
        <p className="field-label">
          {BUSINESS.address.locality}, {BUSINESS.address.region} · Our prices
        </p>
        <h1 className="t-display mt-2 max-w-[18ch]">What will it cost?</h1>
        <p className="measure t-lead mt-4">
          Pick the job you need. We show you the work that goes into it, what
          each part costs, and the total — before you book anything.
        </p>
      </section>

      <div className="ledger px-4 sm:px-6">
        <ServicePicker />
      </div>

      <section className="ledger tier-prose px-4 sm:px-6">
        <h2 className="form-header text-xl">Good to know</h2>
        <ul className="measure mt-2">
          <li className="rule-item py-2 text-sm">{PARTS_DISCLAIMER}</li>
          <li className="rule-item py-2 text-sm">
            A fixed price is the price. An estimate means parts still need
            adding, and we tell you what they cost before we start.
          </li>
          <li className="rule-item py-2 text-sm">
            We work by appointment. There is often a slot free today or tomorrow.
          </li>
          <li className="py-2 text-sm">
            Not sure which one you need? Call us on{" "}
            <a href={BUSINESS.phone.tel} className="figure underline underline-offset-4">
              {BUSINESS.phone.display}
            </a>{" "}
            and we will work it out with you.
          </li>
        </ul>
      </section>
    </main>
  );
}

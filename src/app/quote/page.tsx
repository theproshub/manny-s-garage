"use client";

import { Suspense } from "react";
import Link from "next/link";
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
        <h1 className="t-display mt-2 max-w-[18ch]">What’s this going to cost?</h1>
        <p className="measure t-lead mt-4">
          Pick your job and we’ll break the whole thing down for you. The
          labor, the parts, and what it comes to. All before you book a thing.
        </p>
      </section>

      {/* The picker reads `?for=` to open the trade the link named, which is a
          search param, which means it cannot prerender without a boundary —
          the build refuses the page outright otherwise. The fallback holds the
          picker's own height so the page does not jump as it swaps in. */}
      <div className="ledger px-4 sm:px-6">
        <Suspense fallback={<div className="min-h-[32rem]" aria-hidden />}>
          <ServicePicker />
        </Suspense>
      </div>

      <section className="ledger tier-prose px-4 sm:px-6">
        <h2 className="form-header text-xl">Good to know</h2>
        <ul className="measure mt-2">
          <li className="rule-item py-2 text-sm">{PARTS_DISCLAIMER}</li>
          <li className="rule-item py-2 text-sm">
            Fixed means that’s the price, period. Estimate means parts still go
            on top, and we’ll tell you what they run before we start.
          </li>
          <li className="rule-item py-2 text-sm">
            We run on appointments, but there’s usually something open today or tomorrow.
          </li>
          <li className="rule-item py-2 text-sm">
            Want the full detail on a job? It&apos;s on that trade&apos;s own
            page:{" "}
            <Link href="/auto" className="underline underline-offset-4">Automotive Service</Link>,{" "}
            <Link href="/handyman" className="underline underline-offset-4">Handyman</Link>,{" "}
            <Link href="/diy-garage" className="underline underline-offset-4">DIY Bay</Link>, or{" "}
            <Link href="/it" className="underline underline-offset-4">I.T. Service</Link>.
          </li>
          <li className="py-2 text-sm">
            Not sure which one you need? Just call us at{" "}
            <a href={BUSINESS.phone.tel} className="figure underline underline-offset-4">
              {BUSINESS.phone.display}
            </a>{" "}
            and we’ll figure it out together.
          </li>
        </ul>
      </section>
    </main>
  );
}

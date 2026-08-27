import type { Metadata } from "next";
import { BUSINESS, RATES, mailtoUrl } from "@/lib/business";
import { PARTS_DISCLAIMER } from "@/lib/service-catalog";

export const metadata: Metadata = {
  title: `Terms of Service | ${BUSINESS.name}`,
  description: `Terms under which ${BUSINESS.name} provides work.`,
};

export default function TermsPage() {
  return (
    <main className="ledger tier-prose px-4 sm:px-6">
      <p className="field-label">Terms</p>
      <h1 className="form-header mt-1 text-3xl">Terms of Service</h1>

      <div className="measure mt-6 space-y-4">
        <h2 className="form-header text-lg">Prices</h2>
        <p>
          The prices on this site are for the job listed, at the unit listed.{" "}
          {PARTS_DISCLAIMER} If you need something that is not on the list, we
          price it first and tell you. We do not start until you say yes.
        </p>

        <h2 className="form-header text-lg">Booking and paying</h2>
        <p>
          You book and pay through Square, so Square&apos;s own terms cover the
          payment.
        </p>

        <h2 className="form-header text-lg">Renting a bay</h2>
        <p>
          The bay is charged by the hour, up to {RATES.diyMaxHours} hours at a
          time. It is your car and your work, so the job is yours. Please leave
          the tools the way you found them.
        </p>

        <h2 className="form-header text-lg">Getting hold of us</h2>
        <p>
          {BUSINESS.name}, {BUSINESS.address.oneLine}.{" "}
          <a href={mailtoUrl} className="figure underline underline-offset-4">
            {BUSINESS.email}
          </a>
        </p>
      </div>
    </main>
  );
}

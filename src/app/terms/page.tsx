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
        <h2 className="form-header text-lg">Estimates and prices</h2>
        <p>
          Published prices are for the listed service at the listed unit.{" "}
          {PARTS_DISCLAIMER} Work outside a published line item is quoted before
          it starts, and we do not begin until you approve the figure.
        </p>

        <h2 className="form-header text-lg">Booking and payment</h2>
        <p>
          Appointments are booked and paid through Square. Square&apos;s terms
          govern the payment itself.
        </p>

        <h2 className="form-header text-lg">DIY bay</h2>
        <p>
          Bay rental is charged per hour, in sessions up to {RATES.diyMaxHours}{" "}
          hours. You are responsible for your own work on your own vehicle.
          Equipment must be returned in the condition it was provided.
        </p>

        <h2 className="form-header text-lg">Contact</h2>
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

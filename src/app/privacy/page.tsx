import type { Metadata } from "next";
import { BUSINESS, mailtoUrl } from "@/lib/business";

export const metadata: Metadata = {
  title: `Privacy Policy | ${BUSINESS.name}`,
  description: `How ${BUSINESS.name} handles personal information.`,
};

export default function PrivacyPage() {
  return (
    <main className="ledger tier-prose px-4 sm:px-6">
      <p className="field-label">Policy</p>
      <h1 className="form-header mt-1 text-3xl">Privacy Policy</h1>

      <div className="measure mt-6 space-y-4">
        <p>
          {BUSINESS.name}, {BUSINESS.address.oneLine}, collects personal
          information only to schedule and carry out work you ask us to do.
        </p>

        <h2 className="form-header text-lg">What we collect</h2>
        <p>
          Your name, phone number, email address, and a description of the work
          requested. If you book through Square, Square collects and processes
          payment details under its own privacy policy; we do not store card
          numbers.
        </p>

        <h2 className="form-header text-lg">How we use it</h2>
        <p>
          To contact you about your booking, to quote and perform the work, and
          to keep a record of work done on your vehicle or property. We do not
          sell personal information, and we do not share it except with service
          providers who help us operate the business.
        </p>

        <h2 className="form-header text-lg">Retention and access</h2>
        <p>
          We keep booking and service records for as long as needed to support
          warranty and repeat work. To ask what we hold, or to have it deleted,
          contact{" "}
          <a href={mailtoUrl} className="figure underline underline-offset-4">
            {BUSINESS.email}
          </a>{" "}
          or call{" "}
          <a href={BUSINESS.phone.tel} className="figure underline underline-offset-4">
            {BUSINESS.phone.display}
          </a>
          .
        </p>
      </div>
    </main>
  );
}

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
          We only ask for your details so we can book you in and do the work
          you asked for. Nothing else.
        </p>

        <h2 className="form-header text-lg">What we ask for</h2>
        <p>
          Your name, phone number, email, and what you need doing. When you pay,
          Square handles the card details under their own privacy policy — we
          never see or keep your card number.
        </p>

        <h2 className="form-header text-lg">What we do with it</h2>
        <p>
          We use it to reach you about your booking, to price and do the work,
          and to keep a record of what we did on your car or in your home.
          <strong> We never sell your details.</strong> The only people who see
          them are the services we need to run the shop, like Square.
        </p>

        <h2 className="form-header text-lg">How long we keep it</h2>
        <p>
          We hold on to your job records so we can honour a warranty and know
          the history next time you come in. Want to know what we have, or want
          it deleted? Email{" "}
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

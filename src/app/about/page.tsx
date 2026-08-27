import { SignatureLine } from "@/components/estimate/signature-line";
import { BUSINESS, mailtoUrl } from "@/lib/business";

export default function AboutPage() {
  return (
    <main>
      <section className="ledger tier-prose px-4 sm:px-6">
        <p className="field-label">Particulars</p>
        <h1 className="form-header mt-1 text-3xl sm:text-4xl">About the shop</h1>
        <p className="measure mt-3">
          We opened Manny&apos;s Garage to make car and home work less of a
          hassle: a straight price, a straight answer, and the job done. Four
          trades under one roof, so you are not chasing three different people
          to get one afternoon&apos;s work finished.
        </p>
        <p className="measure mt-3">
          Every price we can publish, we publish. The ones we cannot — the jobs
          where the scope genuinely varies — we quote before we start, and you
          approve the figure first.
        </p>
      </section>

      <section className="ledger tier-prose px-4 sm:px-6">
        <h2 className="form-header text-xl">Details</h2>
        <dl className="measure mt-2">
          <div className="rule-item flex justify-between gap-4 py-2">
            <dt className="field-label">Address</dt>
            <dd className="figure text-right text-sm">{BUSINESS.address.oneLine}</dd>
          </div>
          <div className="rule-item flex justify-between gap-4 py-2">
            <dt className="field-label">Phone</dt>
            <dd>
              <a href={BUSINESS.phone.tel} className="figure text-sm underline underline-offset-4">
                {BUSINESS.phone.display}
              </a>
            </dd>
          </div>
          <div className="rule-item flex justify-between gap-4 py-2">
            <dt className="field-label">Email</dt>
            <dd>
              <a href={mailtoUrl} className="figure text-sm underline underline-offset-4">
                {BUSINESS.email}
              </a>
            </dd>
          </div>
          {BUSINESS.hours.map((h) => (
            <div key={h.days} className="rule-item flex justify-between gap-4 py-2">
              <dt className="field-label">{h.days}</dt>
              <dd className="figure text-sm">
                {h.opens && h.closes ? `${h.opens}–${h.closes}` : "Closed"}
              </dd>
            </div>
          ))}
          <div className="flex justify-between gap-4 py-2">
            <dt className="field-label">Booking</dt>
            <dd className="text-right text-sm">Handled by Square</dd>
          </div>
        </dl>
      </section>

      <SignatureLine href="/quote" />
    </main>
  );
}

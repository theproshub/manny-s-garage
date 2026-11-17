import { NextStep } from "@/components/estimate/next-step";
import { BUSINESS, mailtoUrl } from "@/lib/business";

export default function AboutPage() {
  return (
    <main>
      <section className="ledger tier-prose px-4 sm:px-6">
        <p className="field-label">The basics</p>
        <h1 className="form-header mt-1 text-3xl sm:text-4xl">About the shop</h1>
        <p className="measure mt-3">
          We started Manny&apos;s Garage to take the headache out of car and
          house work. You get a straight price, a straight answer, and the job
          done. Four kinds of work under one roof, so you’re not calling three
          different people to get through one afternoon.
        </p>
        <p className="measure mt-3">
          If we can put a price on it, it’s already on this site. The jobs that
          change every time, we look at first and then give you a number. You
          decide from there. Nobody here is going to talk you into anything.
        </p>
      </section>

      <section className="ledger tier-prose px-4 sm:px-6">
        <h2 className="form-header text-xl">Where to find us</h2>
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
            <dd className="text-right text-sm">Through Manny&apos;s Garage</dd>
          </div>
        </dl>
      </section>

      <NextStep href="/book" />
    </main>
  );
}

import { Schedule } from "@/components/estimate/schedule";
import { RateSummary } from "@/components/estimate/rate-summary";
import { CostBreakdown } from "@/components/estimate/cost-breakdown";
import { WORKED_ESTIMATES } from "@/lib/estimates";
import { NextStep } from "@/components/estimate/next-step";
import { BUSINESS, appleMapsUrl, mapsEmbedUrl, mailtoUrl } from "@/lib/business";
import {
  AUTO_ITEMS,
  HANDYMAN_ITEMS,
  DIY_ITEMS,
  IT_ITEMS,
  DIY_INVENTORY,
  PARTS_DISCLAIMER,
} from "@/lib/service-catalog";

export default function Home() {
  return (
    <main>
      <section className="ledger tier-prose px-4 sm:px-6">
        <p className="field-label">
          {BUSINESS.address.locality}, {BUSINESS.address.region} · Our prices
        </p>
        <h1 className="t-display mt-2 max-w-[18ch]">
          Car repairs, house jobs, a bay to rent, and tech help
        </h1>
        <p className="measure t-lead mt-4">
          The name says garage, but we do four kinds of work. Every price is
          here on the page — what you see is what you pay.
        </p>
      </section>

      <section className="ledger px-4 pb-2 sm:px-6" aria-labelledby="examples">
        <h2 id="examples" className="form-header text-xl">What a job actually costs</h2>
        <p className="measure mt-1 text-sm text-[var(--ink-muted)]">
          Three of the jobs we get asked about most, priced all the way to the total.
        </p>
        <div className="bd-grid mt-4">
          {WORKED_ESTIMATES.map((e) => (
            <CostBreakdown key={e.slug} estimate={e} />
          ))}
        </div>
      </section>

      <section className="ledger px-4 pt-8 sm:px-6" aria-labelledby="all-rates">
        <h2 id="all-rates" className="form-header text-xl">Everything else, by the unit</h2>
      </section>
      <RateSummary />

      <div className="mt-4 divide-y divide-[var(--rule)]">
        <Schedule
          mark="A"
          heading="Automotive"
          caption="Fixing and servicing cars."
          items={AUTO_ITEMS}
          footnote={PARTS_DISCLAIMER}
        />
        <Schedule
          mark="H"
          heading="Handyman"
          caption="Jobs around the house."
          items={HANDYMAN_ITEMS}
        />
        <Schedule
          mark="D"
          heading="DIY Bay"
          caption={`Rent the bay by the hour. You get: ${DIY_INVENTORY.join(", ").toLowerCase()}.`}
          items={DIY_ITEMS}
        />
        <Schedule
          mark="I"
          heading="I.T."
          caption="Every job is different, so we look first, then price it."
          items={IT_ITEMS}
        />
      </div>

      <NextStep href="/quote" />

      <section id="contact" className="ledger tier-prose px-4 sm:px-6">
        <p className="field-label">Where we are</p>
        <h2 className="form-header mt-1 text-2xl">Find us</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div>
            <dl>
              <div className="rule-item flex justify-between gap-4 py-2">
                <dt className="field-label">Address</dt>
                <dd className="figure text-right text-sm">{BUSINESS.address.oneLine}</dd>
              </div>
              <div className="rule-item flex justify-between gap-4 py-2">
                <dt className="field-label">Phone</dt>
                <dd>
                  <a
                    href={BUSINESS.phone.tel}
                    className="figure text-sm underline underline-offset-4"
                  >
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
            </dl>
            <a
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-4"
            >
              Directions
            </a>
          </div>
          <iframe
            title={`${BUSINESS.name} location`}
            src={mapsEmbedUrl}
            className="aspect-[4/3] w-full border border-[var(--rule)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}

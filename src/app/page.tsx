import { Schedule } from "@/components/estimate/schedule";
import { SignatureLine } from "@/components/estimate/signature-line";
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
        <p className="field-label">Estimate — prepared for</p>
        <h1 className="form-header mt-1 text-3xl sm:text-4xl">
          Anyone in {BUSINESS.address.locality} who needs a job done
        </h1>
        <p className="measure mt-3">
          Four kinds of work, one shop, prices published up front. Every figure
          below is what you pay.
        </p>
      </section>

      <div className="space-y-8">
        <Schedule
          mark="A"
          heading="Automotive"
          caption="Repair and maintenance."
          items={AUTO_ITEMS}
          footnote={PARTS_DISCLAIMER}
        />
        <Schedule
          mark="H"
          heading="Handyman"
          caption="Home installation and assembly."
          items={HANDYMAN_ITEMS}
        />
        <Schedule
          mark="D"
          heading="DIY Bay"
          caption={`Rent the bay by the hour. Includes: ${DIY_INVENTORY.join(", ").toLowerCase()}.`}
          items={DIY_ITEMS}
        />
        <Schedule
          mark="I"
          heading="I.T."
          caption="Priced per job after we scope it."
          items={IT_ITEMS}
        />
      </div>

      <SignatureLine href="/quote" />

      <section id="contact" className="ledger tier-prose px-4 sm:px-6">
        <h2 className="form-header text-xl">Find us</h2>
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

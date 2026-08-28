import Link from "next/link";
import { Schedule } from "@/components/estimate/schedule";
import { ServicePicker } from "@/components/estimate/service-picker";
import { ServiceSlides } from "@/components/estimate/service-slides";
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
import { formatUsd } from "@/components/estimate/line-item";
import { TRADE_LOCATION } from "@/lib/trade-location";
import { startsAt } from "@/lib/starts-at";

const OPENING_TRADES = [
  { name: "Automotive", mark: "A", href: "/auto", items: AUTO_ITEMS },
  { name: "Handyman", mark: "H", href: "/handyman", items: HANDYMAN_ITEMS },
  { name: "DIY Bay", mark: "D", href: "/diy-garage", items: DIY_ITEMS },
  { name: "I.T.", mark: "I", href: "/it", items: IT_ITEMS },
].map((trade) => ({
  name: trade.name,
  href: trade.href,
  where: TRADE_LOCATION[trade.mark].detail,
  from: startsAt(trade.items),
}));

export default function Home() {
  return (
    <main>
      <section className="ledger px-4 sm:px-6">
        <div className="hero">
          <div>
            {/* Not "what we do" — the letterhead directly above already says
                that and lists all four services. This label only has to carry
                the half that is new. */}
            <p className="field-label">What it costs</p>
            <h1 className="press press-xl mt-2">
              Four kinds of work. Every price up front.
            </h1>
            <p className="hero-said">
              See what your job costs before you call. Nothing gets added at
              the end.
            </p>

            {/* The four trades as four real estimate lines. This is the summary
                block of the form doing an actual job for the reader: what we
                do, where it happens, what it starts at — in one scan. */}
            <ul className="trade-lines is-summary mt-6">
              {OPENING_TRADES.map((trade) => (
                <li key={trade.href}>
                  <Link href={trade.href} className="trade-line">
                    <span className="trade-line-name">
                      {trade.name}
                      <span className="trade-line-where">{trade.where}</span>
                    </span>
                    <span className="trade-line-price figure">
                      {trade.from === null ? "Quoted" : `from ${formatUsd(trade.from)}`}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hero-cta">
              <Link href="/quote" className="btn-primary">See what your job costs</Link>
              <a href={BUSINESS.phone.tel} className="btn-outline">
                Call {BUSINESS.phone.display}
              </a>
            </div>
          </div>
          <ServiceSlides />
        </div>
      </section>

      <section className="ledger px-4 pb-2 sm:px-6" aria-labelledby="examples">
        <h2 id="examples" className="form-header text-xl">Pick your job, see the price</h2>
        <p className="measure mt-1 text-sm text-[var(--ink-muted)]">
          Everything we do, with the cost worked out for you. Choose a job to see what goes into the price.
        </p>
        <div className="mt-4"><ServicePicker /></div>
      </section>


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

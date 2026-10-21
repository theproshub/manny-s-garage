import Link from "next/link";
import { ServiceCard } from "@/components/animated-card";
import { SectionHeading } from "@/components/section-heading";
import { siteImages } from "@/lib/site-images";
import { ServiceSlides } from "@/components/estimate/service-slides";
import { NextStep } from "@/components/estimate/next-step";
import { BUSINESS, appleMapsUrl, mapsEmbedUrl, mailtoUrl } from "@/lib/business";
import {
  AUTO_ITEMS,
  HANDYMAN_ITEMS,
  DIY_ITEMS,
  IT_ITEMS,
} from "@/lib/service-catalog";
import { formatUsd } from "@/components/estimate/line-item";
import { TRADE_LOCATION } from "@/lib/trade-location";
import { startsAt } from "@/lib/starts-at";

/* Cover photographs for the four service cards.

   Only real photographs of work go here. Several files under /hero are
   photographs of the shop's printed signage — a board listing "Brakes and
   Rotors / Oil Change / Tune Up" — and a sign that lists services is not a
   picture of the work. Those were cycling into the Auto card, so a customer
   looking for evidence of a repair got a photo of an advert instead.

   The original lists pointed at /images/AUTO/**, which commit f8093bc removed
   from public/ as unlicensed reference photography. Every path below is
   verified present on disk. */
/* Card slideshows load every frame at once (see animated-card.tsx), so each
   extra entry is an image the homepage downloads whether or not it is ever
   shown. Three apiece, all of them this shop. */
const autoCardSlides = [
  siteImages.shopBays,
  siteImages.shopFront,
  siteImages.shopTires,
];

const handymanCardSlides = [
  "/hero/hero-handyman.webp",
  "/services/tv.webp",
  "/hero/handyman-security-camera.webp",
  "/services/cameras.webp",
  "/hero/handyman-furniture.webp",
  "/services/furniture.webp",
  "/services/assembly.webp",
];

const diyCardSlides = [
  siteImages.bayInterior,
  siteImages.bayToolWall,
  siteImages.bayToolChest,
];

/* The one gap: there is no photograph of I.T. work in public/. This is the
   shop's own storefront, which is at least a real picture of the business
   rather than a stock laptop. Replace it when a real one exists. */
const itCardSlides = [siteImages.itConsultant];

/** The cheapest job in a trade, phrased the way the shop says it out loud. */
function cardStartsAt(items: Parameters<typeof startsAt>[0]): string {
  const from = startsAt(items);
  return from === null ? "Priced after we look" : `From ${formatUsd(from)}`;
}

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
            <h1 className="press press-xl">
              Fargo&apos;s one stop shop.
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
              <Link href="/book" className="btn-primary">Book online</Link>
              <a href={BUSINESS.phone.tel} className="btn-outline">
                Call {BUSINESS.phone.display}
              </a>
              <Link href="/quote" className="hero-cta-plain">
                See all prices
              </Link>
            </div>
          </div>
          <ServiceSlides />
        </div>
      </section>

      {/* ─── SERVICES ───
          Four trades, four cards. Each carries the two things a customer opens
          this page to find — what it starts at, and a way to book it — rather
          than a category glyph and an arrow. */}
      <section id="services" className="relative scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32">
        <div className="mx-auto max-w-7xl px-[max(1rem,env(safe-area-inset-left))] pb-16 pt-2 pr-[max(1rem,env(safe-area-inset-right))] sm:px-6 sm:pb-20 lg:px-8">
          <SectionHeading
            title="What we do"
            description="Four trades, one shop. Prices below are what the job starts at — we confirm the parts cost before any work begins."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ServiceCard
              title="Auto repair"
              description="Oil changes, brakes, batteries, diagnostics, and recovery if you break down in Fargo."
              imageSlides={autoCardSlides}
              startsAt={cardStartsAt(AUTO_ITEMS)}
              href="/auto"
              bookHref="/book/automotive"
              bookLabel="Book a repair"
            />
            <ServiceCard
              title="Handyman"
              description="TV mounting, security cameras, furniture and bunk beds built, blinds and curtains hung."
              imageSlides={handymanCardSlides}
              startsAt={cardStartsAt(HANDYMAN_ITEMS)}
              href="/handyman"
              bookHref="/book/handyman"
              bookLabel="Book handyman"
              priority
            />
            <ServiceCard
              title="DIY bay"
              description="Rent the bay by the hour with the lift, the air line and the tools. Add a mechanic if you want a hand."
              imageSlides={diyCardSlides}
              startsAt={cardStartsAt(DIY_ITEMS)}
              href="/diy-garage"
              bookHref="/book/diy"
              bookLabel="Book the bay"
            />
            <ServiceCard
              title="I.T."
              description="Wi-Fi and internet set up, computers fixed, websites and spreadsheets built."
              imageSlides={itCardSlides}
              startsAt={cardStartsAt(IT_ITEMS)}
              href="/it"
            />
          </div>
        </div>
      </section>

      <NextStep href="/quote" />

      <section id="contact" className="ledger tier-prose px-4 sm:px-6">
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

import Link from "next/link";
import Image from "next/image";
import { BUSINESS } from "@/lib/business";
import { siteImages } from "@/lib/site-images";

const NAV = [
  { label: "Automotive", href: "/auto" },
  { label: "Handyman", href: "/handyman" },
  { label: "DIY Bay", href: "/diy-garage" },
  { label: "I.T.", href: "/it" },
  { label: "Pricing", href: "/quote" },
];

export function Letterhead() {
  return (
    <header className="rule-item bg-[var(--paper)]">
      <div className="ledger tier-head flex flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <Link href="/" className="shrink-0">
            <Image
              src={siteImages.logo}
              alt={BUSINESS.name}
              width={56}
              height={56}
              className="h-12 w-auto"
              priority
            />
          </Link>
          <div>
            <p className="form-header text-lg">{BUSINESS.name}</p>
            <p className="figure text-sm text-[var(--ink-muted)]">{BUSINESS.address.oneLine}</p>
            <a href={BUSINESS.phone.tel} className="figure text-sm underline underline-offset-4">
              {BUSINESS.phone.display}
            </a>
          </div>
        </div>

        <dl className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {BUSINESS.hours.map((h) => (
            <div key={h.days} className="flex gap-2">
              <dt className="field-label">{h.days}</dt>
              <dd className="figure">
                {h.opens && h.closes ? `${h.opens}–${h.closes}` : "Closed"}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <nav aria-label="Services" className="rule-item">
        <ul className="ledger flex flex-wrap gap-x-5 gap-y-1 px-4 py-1 sm:px-6">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="field-label min-touch inline-flex items-center hover:text-[var(--stamp)]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

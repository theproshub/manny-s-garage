import Link from "next/link";
import Image from "next/image";
import { BUSINESS } from "@/lib/business";
import { siteImages } from "@/lib/site-images";
import { estimateNo, todayLong } from "@/lib/estimate-no";

export function Letterhead() {
  return (
    <header className="bg-[var(--paper)]">
      <div className="ledger px-4 pt-5 sm:px-6">
        {/* A repair order opens with a ruled grid of identified fields. */}
        <div className="form-box grid-cols-1 sm:grid-cols-[1fr_auto_auto]">
          <div className="form-cell flex items-center gap-3">
            <Link href="/" className="shrink-0">
              <Image
                src={siteImages.logo}
                alt={BUSINESS.name}
                width={48}
                height={48}
                className="h-11 w-auto"
                priority
              />
            </Link>
            <div className="min-w-0">
              <p className="form-header text-lg leading-tight">{BUSINESS.name}</p>
              <p className="figure truncate text-sm text-[var(--ink-muted)]">
                {BUSINESS.address.oneLine}
              </p>
            </div>
          </div>

          <div className="form-cell">
            <p className="field-label">Estimate no.</p>
            <p className="figure text-lg">{estimateNo()}</p>
          </div>

          <div className="form-cell">
            <p className="field-label">Date</p>
            <p className="figure text-lg">{todayLong()}</p>
          </div>

          <div className="form-cell sm:col-span-3 sm:border-b-0">
            <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
              <div>
                <span className="field-label">Tel </span>
                <a
                  href={BUSINESS.phone.tel}
                  className="figure text-sm underline underline-offset-4"
                >
                  {BUSINESS.phone.display}
                </a>
              </div>
              {BUSINESS.hours.map((h) => (
                <div key={h.days}>
                  <span className="field-label">{h.days} </span>
                  <span className="figure text-sm">
                    {h.opens && h.closes ? `${h.opens}–${h.closes}` : "Closed"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </header>
  );
}

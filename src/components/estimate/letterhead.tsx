import Link from "next/link";
import Image from "next/image";
import { BUSINESS } from "@/lib/business";
import { siteImages } from "@/lib/site-images";
import { OpenStatus } from "./open-status";

export function Letterhead() {
  return (
    <header className="bg-[var(--paper)]">
      <div className="ledger px-4 pt-5 sm:px-6">
        {/* A repair order opens with a ruled grid of identified fields. */}
        <div className="form-box grid-cols-2 sm:grid-cols-[1fr_auto_auto]">
          <div className="form-cell col-span-2 flex items-center gap-3 sm:col-span-1">
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
            <OpenStatus />
          </div>

          <div className="form-cell">
            <p className="field-label">What we do</p>
            <ul className="text-sm leading-snug">
              <li>Auto repair</li>
              <li>Handyman</li>
              <li>DIY bay rental</li>
              <li>Tech help</li>
            </ul>
          </div>

          <div className="form-cell col-span-2 border-b-0 sm:col-span-3">
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

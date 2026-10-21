import type { ComponentPropsWithoutRef } from "react";
import { AUTO_FIXED_PACKAGES } from "@/lib/fixed-quote-options";
import { cn } from "@/lib/utils";

/**
 * Renders fixed automotive packages from {@link AUTO_FIXED_PACKAGES} (single source for labels/subs/prices).
 *
 * These cards are a price list, not a set of buttons. Each one used to be a
 * `Link` straight out to `ARI_AUTOMOTIVE_BOOKING_URL` — every card to the same
 * URL, since `bookAutomotiveHref` discarded the price and note it was handed.
 * Nine rows that all went to one page sold the idea that you were picking
 * *that* job, and ARI then asked you to pick a service again from scratch.
 *
 * So they do not link. The section states what things start at; booking is one
 * deliberate step below it, where the trade is named. Do not reattach an
 * `href` here without first giving it somewhere job-specific to land.
 */
export function AutoFixedPricingGrid({ className, ...props }: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul className={cn("grid gap-3 sm:grid-cols-2", className)} {...props}>
      {AUTO_FIXED_PACKAGES.map((pkg) => (
        <li key={pkg.id}>
          <div className="flex min-h-[4.5rem] flex-col justify-center rounded-xl border border-[var(--rule)] bg-[var(--surface)] px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-semibold text-[var(--ink)]">{pkg.label}</span>
                <p className="mt-0.5 text-xs text-[var(--ink-muted)]">{pkg.sub}</p>
              </div>
              <span className="text-2xl font-bold text-[var(--accent-strong)]">{pkg.price === 0 ? "Free" : `$${pkg.price}`}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

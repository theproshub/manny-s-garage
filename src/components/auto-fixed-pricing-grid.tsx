import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { AUTO_FIXED_PACKAGES, bookAutomotiveHref } from "@/lib/fixed-quote-options";
import { cn } from "@/lib/utils";

/**
 * Renders fixed automotive packages from {@link AUTO_FIXED_PACKAGES} (single source for labels/subs/prices).
 */
export function AutoFixedPricingGrid({ className, ...props }: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul className={cn("grid gap-3 sm:grid-cols-2", className)} {...props}>
      {AUTO_FIXED_PACKAGES.map((pkg) => (
        <li key={pkg.id}>
          <Link
            href={bookAutomotiveHref(pkg.price, `Auto: ${pkg.label} · ${pkg.sub}`)}
            className="flex min-h-[4.5rem] flex-col justify-center rounded-xl border border-[var(--rule)] bg-[var(--surface)] px-4 py-3 transition-colors hover:border-[var(--accent)] hover:bg-[var(--canary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--stamp)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-semibold text-[var(--ink)]">{pkg.label}</span>
                <p className="mt-0.5 text-xs text-[var(--ink-muted)]">{pkg.sub}</p>
              </div>
              <span className="text-2xl font-bold text-[var(--accent-strong)]">{pkg.price === 0 ? "Free" : `$${pkg.price}`}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

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
            className="flex min-h-[4.5rem] flex-col justify-center rounded-xl border border-white/[0.08] bg-black/40 px-4 py-3 transition-colors hover:border-orange-500/40 hover:bg-orange-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-semibold text-white">{pkg.label}</span>
                <p className="mt-0.5 text-xs text-zinc-500">{pkg.sub}</p>
              </div>
              <span className="text-2xl font-bold text-orange-400">{pkg.price === 0 ? "Free" : `$${pkg.price}`}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

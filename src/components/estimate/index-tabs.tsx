"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BUSINESS } from "@/lib/business";

/**
 * Section navigation. Sticky, because these pages are long and the letterhead
 * above scrolls away.
 *
 * Labels only — the bay numerals that used to sit here ("01", "MOB") were
 * shop-internal codes that meant nothing to a visitor.
 */
const TABS = [
  { label: "Automotive", href: "/auto" },
  { label: "Handyman", href: "/handyman" },
  { label: "DIY Bay", href: "/diy-garage" },
  { label: "I.T.", href: "/it" },
  { label: "Prices", href: "/quote" },
];

export function IndexTabs() {
  const pathname = usePathname();

  return (
    <div className="tab-rail">
      <div className="ledger flex items-end gap-3 px-4 sm:px-6">
        <nav aria-label="Services" className="min-w-0 flex-1">
          <ul className="tab-strip">
            {TABS.map((tab) => {
              const active = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
              return (
                <li key={tab.href}>
                  <Link
                    href={tab.href}
                    aria-current={active ? "page" : undefined}
                    className={`tab ${active ? "tab-active" : ""}`}
                  >
                    {tab.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 pb-1.5">
          <a href={BUSINESS.phone.tel} className="btn-outline tab-action">
            Call
          </a>
          <Link href="/book" className="btn-primary tab-action">
            Book
          </Link>
        </div>
      </div>
    </div>
  );
}

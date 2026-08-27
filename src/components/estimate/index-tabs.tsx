"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BUSINESS } from "@/lib/business";

/**
 * Index tabs — the folder tabs a shop's job-file system uses. The active tab
 * is pulled forward (canary fill, its bottom rule broken) exactly as a paper
 * tab sits proud of the file behind it.
 *
 * Sticky because a document this long needs a running header; the letterhead
 * above it scrolls away, which is correct — a letterhead prints once.
 */
const TABS = [
  { mark: "A", label: "Automotive", href: "/auto", bay: "01" },
  { mark: "H", label: "Handyman", href: "/handyman", bay: "MOB" },
  { mark: "D", label: "DIY Bay", href: "/diy-garage", bay: "02" },
  { mark: "I", label: "I.T.", href: "/it", bay: "MOB" },
  { mark: "$", label: "Pricing", href: "/quote", bay: null },
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
                    <span
                      className={`tab-mark ${tab.bay && tab.bay !== "MOB" ? "tab-bay" : ""}`}
                      aria-hidden
                    >
                      {tab.bay ?? tab.mark}
                    </span>
                    <span className="tab-label">{tab.label}</span>
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

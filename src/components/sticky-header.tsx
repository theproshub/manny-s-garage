"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteImages } from "@/lib/site-images";
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/lib/contact";
import { ShopStatus } from "@/components/shop-status";

/**
 * The header.
 *
 * What came out: the floating translucent pill that morphed on scroll, the
 * Radix dropdown that hid all four trades behind the word "Services", the
 * spring-animated pill sliding between nav items, and the chevron, calendar
 * and hamburger glyphs. Each is a thing a page does to look designed, and
 * together they put the four services and the phone number two interactions
 * away from a customer standing in a parking lot.
 *
 * What went in: a plain solid bar. The four trades are named in it. The phone
 * number is written out rather than hidden behind a handset glyph. Whether
 * the shop is open right now sits beside it, because that is the question
 * someone asks immediately before deciding to call or to book.
 *
 * The bar carries no "Book online" button any more, at either width, and the
 * nav itself has never linked `/book`. Booking is reached from the pages, from
 * the footer, and on phones from the persistent action bar — note that the
 * action bar is `lg:hidden`, so on a desktop the footer is the only chrome
 * that still offers it. Nothing in here is a filled button now, which leaves
 * the phone number as the loudest thing in the bar.
 */

const TRADES = [
  { href: "/auto", label: "Auto repair" },
  { href: "/handyman", label: "Handyman" },
  { href: "/diy-garage", label: "DIY bay" },
  { href: "/it", label: "I.T." },
] as const;

const ALSO = [
  { href: "/quote", label: "Prices" },
  { href: "/about", label: "About" },
] as const;

export function StickyHeader() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => setMenuOpen(false), [pathname]);

  // A nav panel left open behind a scrolling page is a trap on a phone.
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isOn = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const links = [...TRADES, ...ALSO];

  return (
    <header className="site-header">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center gap-4 px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src={siteImages.logo}
            alt="Manny's Garage — Fargo, ND"
            width={873}
            height={264}
            className="h-12 w-auto object-contain object-left sm:h-14"
            priority
            sizes="(max-width: 640px) 159px, 185px"
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isOn(link.href) ? "page" : undefined}
                  className={`nav-link ${isOn(link.href) ? "is-on" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:gap-5">
          <div className="hidden text-right xl:block">
            <a
              href={SITE_PHONE_TEL}
              className="figure block text-sm font-semibold text-[var(--ink)] underline-offset-4 hover:underline"
            >
              {SITE_PHONE_DISPLAY}
            </a>
            <ShopStatus className="text-[11px]" />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="nav-toggle lg:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="site-menu" className="site-menu lg:hidden">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="site-menu-link"
                  aria-current={isOn(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="site-menu-foot">
            <a href={SITE_PHONE_TEL} className="figure block text-base font-semibold text-[var(--ink)]">
              {SITE_PHONE_DISPLAY}
            </a>
            <ShopStatus className="mt-1 text-xs" />
          </div>
        </div>
      )}
    </header>
  );
}

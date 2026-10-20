import Link from "next/link";
import Image from "next/image";
import { siteImages } from "@/lib/site-images";
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/lib/contact";
import { BUSINESS, mailtoUrl } from "@/lib/business";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--rule)] bg-[var(--floor)] pt-12 pb-safe sm:pt-24">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 [padding-left:max(1rem,env(safe-area-inset-left))] [padding-right:max(1rem,env(safe-area-inset-right))]">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Brand Col — logo same position as previous wrench + text */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-flex items-center">
              <Image
                src={siteImages.logo}
                alt="Manny's Garage — Automotive, Handyman, I.T. & More"
                width={873}
                height={264}
                className="h-14 w-auto object-contain object-left sm:h-16"
                sizes="(max-width: 640px) 185px, 212px"
              />
            </Link>
            <p className="text-sm leading-6 text-[var(--ink-muted)]">
              Auto repair, handyman services, I.T. support, and DIY garage rentals in one place. Local service you can trust in Fargo.
            </p>
          </div>

          {/* Links Col 1 */}
          <div>
            <p className="orbitron mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--ink-muted)]">Services</p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Auto repair", href: "/auto" },
                { label: "Handyman", href: "/handyman" },
                { label: "DIY bay", href: "/diy-garage" },
                { label: "I.T.", href: "/it" },
                { label: "Prices", href: "/quote" },
                { label: "Book online", href: "/book" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="group inline-flex min-h-[44px] items-center gap-2 py-2 text-sm text-[var(--ink)] transition-colors hover:text-[var(--accent-strong)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="orbitron mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--ink-muted)]">Company</p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "About", href: "/about" },
                { label: "Our Facility", href: "/about" },
                { label: "Book online", href: "/book" },
                { label: "Contact", href: "/#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="group inline-flex min-h-[44px] items-center gap-2 py-2 text-sm text-[var(--ink)] transition-colors hover:text-[var(--cool)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="orbitron mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--ink-muted)]">Contact</p>
            <ul className="flex flex-col gap-4 text-sm text-[var(--ink-muted)]">
              <li className="flex items-start gap-3">
                <span>{BUSINESS.address.street}<br/>{BUSINESS.address.locality}, {BUSINESS.address.region} {BUSINESS.address.postalCode}</span>
              </li>
              <li>
                <a href={SITE_PHONE_TEL} className="flex items-center gap-3 transition-colors hover:text-[var(--ink)]">
                  {SITE_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={mailtoUrl} className="flex items-center gap-3 transition-colors hover:text-[var(--ink)]">
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--rule)] py-8 sm:flex-row">
          <p className="text-xs text-[var(--ink-muted)]">
            &copy; {new Date().getFullYear()} Manny&apos;s Garage. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-[var(--ink-muted)]">
            <Link href="/privacy" className="transition-colors hover:text-[var(--ink)]">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-[var(--ink)]">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

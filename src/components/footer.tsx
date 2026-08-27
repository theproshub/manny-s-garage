import Link from "next/link";
import { BUSINESS, mailtoUrl } from "@/lib/business";

const SERVICES = [
  { label: "Automotive", href: "/auto" },
  { label: "Handyman", href: "/handyman" },
  { label: "DIY Bay", href: "/diy-garage" },
  { label: "I.T.", href: "/it" },
  { label: "Pricing", href: "/quote" },
  { label: "Book", href: "/book" },
];

const COMPANY = [
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="rule-perforated mt-16">
      <div className="ledger grid gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="form-header">{BUSINESS.name}</p>
          <address className="figure mt-2 text-sm not-italic text-[var(--ink-muted)]">
            {BUSINESS.address.street}
            <br />
            {BUSINESS.address.locality}, {BUSINESS.address.region} {BUSINESS.address.postalCode}
          </address>
          <a
            href={BUSINESS.phone.tel}
            className="figure mt-2 block text-sm underline underline-offset-4"
          >
            {BUSINESS.phone.display}
          </a>
          <a href={mailtoUrl} className="figure block text-sm underline underline-offset-4">
            {BUSINESS.email}
          </a>
        </div>

        <div>
          <p className="field-label">Services</p>
          <ul className="mt-2">
            {SERVICES.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="min-touch inline-flex items-center text-sm underline underline-offset-4"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="field-label">Company</p>
          <ul className="mt-2">
            {COMPANY.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="min-touch inline-flex items-center text-sm underline underline-offset-4"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-[var(--ink-muted)]">
            Booking and payment handled by Square.
          </p>
        </div>
      </div>

      <div className="ledger px-4 pb-8 sm:px-6">
        <p className="figure text-sm text-[var(--ink-muted)]">
          © {new Date().getFullYear()} {BUSINESS.name}
        </p>
      </div>
    </footer>
  );
}

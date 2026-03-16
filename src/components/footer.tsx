import Link from "next/link";
import { Wrench, MapPin, PhoneCall, Mail, ChevronRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#030507] pt-16 pb-safe sm:pt-24">
      <div className="noise-overlay" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black/20" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand Col */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex items-center justify-center rounded-lg bg-orange-500/10 p-2">
                <Wrench className="h-5 w-5 text-orange-400" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="orbitron text-sm font-bold tracking-[0.2em] text-white">MANNY'S</span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-orange-400">GARAGE</span>
              </div>
            </Link>
            <p className="text-sm leading-6 text-zinc-400">
              Premium auto repair, handyman services, IT consulting, and DIY garage rentals. Fargo&apos;s most advanced service center.
            </p>
          </div>

          {/* Links Col 1 */}
          <div>
            <p className="orbitron mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">Services</p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Automotive Services", href: "/auto" },
                { label: "Handyman Services", href: "/handyman" },
                { label: "DIY Garage", href: "/diy-garage" },
                { label: "IT Consultant", href: "/it" },
                { label: "Book Service", href: "/book" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-orange-300">
                    <ChevronRight className="h-3 w-3 text-white/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-orange-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="orbitron mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">Company</p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Facility", href: "/about#facility" },
                { label: "Book a Service", href: "/book" },
                { label: "Contact", href: "/about#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-cyan-300">
                    <ChevronRight className="h-3 w-3 text-white/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-cyan-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="orbitron mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">Contact</p>
            <ul className="flex flex-col gap-4 text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                <span>123 Mechanic Ave<br/>Fargo, ND 58103</span>
              </li>
              <li>
                <a href="tel:+17015550142" className="flex items-center gap-3 transition-colors hover:text-white">
                  <PhoneCall className="h-4 w-4 shrink-0 text-cyan-400" />
                  (701) 555-0142
                </a>
              </li>
              <li>
                <a href="mailto:service@mannysgarage.com" className="flex items-center gap-3 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-zinc-500" />
                  service@mannysgarage.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-8 sm:flex-row">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} Manny&apos;s Garage. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-zinc-500">
            <Link href="#" className="transition-colors hover:text-zinc-300">Privacy Policy</Link>
            <Link href="#" className="transition-colors hover:text-zinc-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

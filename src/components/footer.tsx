import Link from "next/link";
import Image from "next/image";
import { MapPin, PhoneCall, Mail, ChevronRight } from "lucide-react";
import { siteImages } from "@/lib/site-images";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#030507] pt-12 pb-safe sm:pt-24">
      <div className="noise-overlay" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black/20" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 [padding-left:max(1rem,env(safe-area-inset-left))] [padding-right:max(1rem,env(safe-area-inset-right))]">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Brand Col — same clarity/glow as header */}
          <div className="relative flex flex-col gap-6">
            <div
              className="logo-wrap-gradient absolute -left-2 -top-2 -right-2 h-32 rounded-2xl sm:h-40 lg:h-44"
              aria-hidden
            />
            <Link
              href="/"
              className="relative z-10 inline-flex transition-transform duration-300 ease-out hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              <Image
                src={siteImages.logo}
                alt="Manny's Garage — Automotive, Handyman, IT & More"
                width={340}
                height={145}
                className="logo-brand h-[180px] w-auto object-contain object-left sm:h-[200px] md:h-[220px] lg:h-[240px] xl:h-[248px]"
                sizes="(max-width: 640px) 220px, (max-width: 768px) 260px, (max-width: 1024px) 300px, 340px"
              />
            </Link>
            <p className="text-sm leading-6 text-zinc-400">
              Premium auto repair, handyman services, IT consulting, and DIY garage rentals. Fargo, ND&apos;s most advanced service center.
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
                  <Link href={link.href} className="group inline-flex min-h-[44px] items-center gap-2 py-2 text-sm text-zinc-400 transition-colors hover:text-orange-300">
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
                  <Link href={link.href} className="group inline-flex min-h-[44px] items-center gap-2 py-2 text-sm text-zinc-400 transition-colors hover:text-cyan-300">
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
                <span>1335 Main Ave S<br/>Fargo, ND 58103</span>
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

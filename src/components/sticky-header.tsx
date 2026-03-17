"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Calendar } from "lucide-react";
import { siteImages } from "@/lib/site-images";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/auto", label: "Auto" },
  { href: "/handyman", label: "Handyman" },
  { href: "/diy-garage", label: "DIY Garage" },
  { href: "/it", label: "IT" },
];

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative lg:fixed top-0 left-0 right-0 z-50 flex justify-center px-3 pt-2 pb-0 sm:px-4 sm:pb-0 md:px-6 lg:py-2 transition-all duration-300 [padding-left:max(0.75rem,env(safe-area-inset-left))] [padding-right:max(0.75rem,env(safe-area-inset-right))]"
      >
        <div
          className={`flex w-full max-w-7xl flex-col items-center rounded-2xl transition-all duration-300 px-3 pt-3 pb-3 gap-2 sm:px-4 sm:pt-3 md:px-5 lg:min-h-[140px] lg:flex-row lg:justify-between lg:rounded-2xl lg:border lg:px-5 lg:py-2 ${
            isScrolled
              ? "lg:border-white/[0.08] lg:bg-[var(--panel)] lg:shadow-lg lg:shadow-black/30 lg:backdrop-blur-xl"
              : "lg:border-white/[0.06] lg:bg-white/[0.02] lg:backdrop-blur-sm"
          }`}
        >
          {/* Logo — centered focal point with gradient, animation; mobile: only on homepage */}
          <div
            className={`relative flex min-w-0 flex-1 flex-col items-center lg:flex-none ${
              pathname !== "/" ? "hidden lg:flex" : ""
            }`}
          >
            <div
              className="logo-wrap-gradient absolute inset-0 -mx-4 rounded-2xl min-[480px]:-mx-6 lg:-mx-5"
              aria-hidden
            />
            <Link
              href="/"
              className="group relative z-10 flex transition-transform duration-300 ease-out hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-lg"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="block logo-brand"
              >
                <Image
                  src={siteImages.logo}
                  alt="Manny's Garage — Automotive, Handyman, IT & More"
                  width={480}
                  height={145}
                  className="h-[93px] w-auto max-w-full object-contain object-center sm:h-[64px] lg:h-[84px] xl:h-[96px]"
                  priority
                  sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 320px"
                />
              </motion.span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center min-w-0" aria-label="Main">
            <div className="flex items-center rounded-xl bg-white/[0.03] p-1 border border-white/[0.06]">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative flex items-center rounded-lg px-3.5 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-inset ${
                      isActive ? "text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-white/10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </div>
            <Link
              href="/book"
              className="ml-2 flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[var(--accent-strong)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              <Calendar className="h-4 w-4" aria-hidden />
              Book
            </Link>
          </nav>

          {/* Right: Book on tablet only; empty on mobile for logo centering */}
          <div className="flex min-w-0 flex-1 items-center justify-end gap-2 lg:flex-none">
            <Link
              href="/book"
              className="hidden sm:flex lg:hidden items-center gap-2 rounded-xl bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-black hover:bg-[var(--accent-strong)]"
            >
              <Calendar className="h-4 w-4" aria-hidden />
              Book
            </Link>
          </div>
        </div>
      </motion.header>
    </>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { siteImages } from "@/lib/site-images";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/auto", label: "Automotive Services" },
  { href: "/handyman", label: "Handyman Services" },
  { href: "/diy-garage", label: "DIY Garage" },
  { href: "/it", label: "I.T Consultant" },
  { href: "/book", label: "Book Service" },
  { href: "/#contact", label: "Contact" },
];

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
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
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 py-2.5 sm:px-6 sm:py-4 transition-all duration-300 [padding-left:max(0.75rem,env(safe-area-inset-left))] [padding-right:max(0.75rem,env(safe-area-inset-right))]"
      >
        <div
          className={`flex w-full max-w-7xl items-center justify-between gap-2 rounded-full border transition-all duration-500 ${
            isScrolled
              ? "border-white/[0.08] bg-black/70 shadow-xl shadow-black/20 backdrop-blur-xl px-3 py-2.5 sm:px-6 sm:py-3"
              : "border-transparent bg-transparent px-2 py-2"
          }`}
        >
          {/* Logo — same slot and size as previous wrench + text */}
          <Link href="/" className="group flex shrink-0 items-center" onClick={() => setMobileMenuOpen(false)}>
            <Image
              src={siteImages.logo}
              alt="Manny's Garage — Automotive, Handyman, I.T & More"
              width={180}
              height={48}
              className="h-11 w-auto object-contain object-left sm:h-12"
              priority
              sizes="180px"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:block">
            <NavigationMenu.Root className="relative flex justify-center z-10 w-full">
              <NavigationMenu.List className="flex items-center justify-center gap-0.5 rounded-[2rem] bg-white/[0.04] p-1.5 backdrop-blur-sm border border-white/[0.06]">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href || (link.href === "/#contact" && pathname === "/");
                  return (
                    <NavigationMenu.Item key={link.href}>
                      <NavigationMenu.Link asChild>
                        <Link
                          href={link.href}
                          className={`group relative flex select-none items-center justify-between gap-2 overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? "text-white"
                              : "text-zinc-400 hover:text-white"
                          }`}
                        >
                          <span className="relative z-10">{link.label}</span>
                          {isActive && (
                            <motion.div
                              layoutId="nav-pill"
                              className="absolute inset-0 z-0 rounded-full bg-white/10"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                        </Link>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                  );
                })}
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </div>

          {/* CTA / Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/book"
              className={`group hidden sm:inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all overflow-hidden relative ${
                isScrolled
                  ? "bg-orange-500/10 border border-orange-500/50 text-orange-400 px-5 py-2 text-sm hover:bg-orange-500/20 hover:border-orange-500/60"
                  : "bg-white text-black px-6 py-2.5 text-sm hover:shadow-[0_0_28px_rgba(255,255,255,0.25)] hover:scale-[1.02]"
              }`}
            >
              <span className="relative z-10">Book Service</span>
              {!isScrolled && (
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex min-touch items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur transition-colors hover:bg-white/10 lg:hidden [min-width:44px] [min-height:44px]"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Backdrop + Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
              aria-hidden
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed left-4 right-4 z-40 rounded-2xl border border-white/[0.08] bg-[var(--surface-elevated)]/95 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl lg:hidden [top:max(5.5rem,calc(env(safe-area-inset-top,0px)+4.5rem))]"
            >
              <nav className="flex flex-col">
                <p className="orbitron mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Menu</p>
                <ul className="space-y-1">
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href || (link.href === "/#contact" && pathname === "/");
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex min-h-[48px] items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                            isActive ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {link.label}
                          {isActive && <ArrowRight className="h-4 w-4 text-orange-400 shrink-0" />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-4 border-t border-white/[0.06] pt-4">
                  <Link
                    href="/book"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-sm font-bold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Book Service Now
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

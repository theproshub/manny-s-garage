"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown, CalendarPlus } from "lucide-react";
import { siteImages } from "@/lib/site-images";

const SERVICE_LINKS = [
  { href: "/auto", label: "Automotive Services" },
  { href: "/handyman", label: "Handyman Services" },
  { href: "/diy-garage", label: "DIY Garage" },
  { href: "/it", label: "I.T. Consultant" },
] as const;

function pathMatchesService(pathname: string) {
  return SERVICE_LINKS.some((l) => pathname === l.href || pathname.startsWith(`${l.href}/`));
}

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  React.useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileServicesOpen(false);
    }
  }, [mobileMenuOpen]);

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
              alt="Manny's Garage — Automotive, Handyman, I.T. & More"
              width={80}
              height={80}
              className="h-12 w-auto object-contain object-left sm:h-14"
              priority
              sizes="(max-width: 640px) 48px, 56px"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:block">
            <NavigationMenu.Root className="relative z-10 flex w-full justify-center">
              <NavigationMenu.List className="flex items-center justify-center gap-0.5 rounded-[2rem] border border-white/[0.06] bg-white/[0.04] p-1.5 backdrop-blur-sm">
                <NavigationMenu.Item>
                  <NavigationMenu.Link asChild>
                    <Link
                      href="/"
                      className={`group relative flex select-none items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        pathname === "/" ? "text-white" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <span className="relative z-10">Home</span>
                      {pathname === "/" && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 z-0 rounded-full bg-white/10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                  <NavigationMenu.Trigger
                    className={`group relative flex select-none items-center gap-1 overflow-hidden rounded-full px-4 py-2 text-sm font-medium outline-none transition-colors data-[state=open]:text-white ${
                      pathMatchesService(pathname) ? "text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span className="relative z-10">Services</span>
                    <ChevronDown
                      className="relative z-10 h-3.5 w-3.5 shrink-0 opacity-70 transition-transform duration-200 group-data-[state=open]:rotate-180"
                      aria-hidden
                    />
                    {pathMatchesService(pathname) && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 z-0 rounded-full bg-white/10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="absolute left-1/2 top-full z-50 mt-3 w-[min(100vw-2rem,280px)] -translate-x-1/2 rounded-2xl border border-white/[0.08] bg-[var(--surface-elevated)]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
                    <ul className="flex flex-col gap-0.5 py-1">
                      {SERVICE_LINKS.map((link) => (
                        <li key={link.href}>
                          <NavigationMenu.Link asChild>
                            <Link
                              href={link.href}
                              className="flex min-h-[44px] items-center rounded-xl px-3 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                            >
                              {link.label}
                            </Link>
                          </NavigationMenu.Link>
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-1 border-t border-white/[0.06] p-2 pt-2">
                      <NavigationMenu.Link asChild>
                        <Link
                          href="/quote"
                          className="flex min-h-[44px] items-center justify-center rounded-xl py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                        >
                          Fixed Pricing
                        </Link>
                      </NavigationMenu.Link>
                      <NavigationMenu.Link asChild>
                        <Link
                          href="/book"
                          className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-orange-500/15 py-2.5 text-sm font-bold text-orange-300 ring-1 ring-orange-500/25 transition-colors hover:bg-orange-500/25"
                        >
                          <CalendarPlus className="h-4 w-4" aria-hidden />
                          Book a Service
                        </Link>
                      </NavigationMenu.Link>
                    </div>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                  <NavigationMenu.Link asChild>
                    <Link
                      href="/quote"
                      className={`group relative flex select-none items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        pathname === "/quote" ? "text-white" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <span className="relative z-10">Pricing</span>
                      {pathname === "/quote" && (
                        <motion.div
                          layoutId="nav-pill-quote"
                          className="absolute inset-0 z-0 rounded-full bg-white/10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                  <NavigationMenu.Link asChild>
                    <Link
                      href="/book"
                      className={`group relative flex select-none items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        pathname === "/book" ? "text-white" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <span className="relative z-10">Book</span>
                      {pathname === "/book" && (
                        <motion.div
                          layoutId="nav-pill-book"
                          className="absolute inset-0 z-0 rounded-full bg-white/10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                  <NavigationMenu.Link asChild>
                    <Link
                      href="/#contact"
                      className={`group relative flex select-none items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        pathname === "/" ? "text-white" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <span className="relative z-10">Contact</span>
                    </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              </NavigationMenu.List>
              <NavigationMenu.Viewport className="absolute left-1/2 top-full z-40 flex w-full max-w-[min(100vw,280px)] -translate-x-1/2 justify-center perspective-[2000px]" />
            </NavigationMenu.Root>
          </div>

          {/* CTA / Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/book"
              className={`group hidden sm:inline-flex items-center justify-center gap-1.5 rounded-full text-sm font-semibold transition-all overflow-hidden relative ${
                isScrolled
                  ? "border border-orange-500/50 bg-orange-500/10 px-4 py-1.5 text-orange-400 hover:border-orange-500/60 hover:bg-orange-500/20"
                  : "bg-white px-4 py-1.5 text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
              }`}
            >
              <span className="relative z-10">Book</span>
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
                  <li>
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex min-h-10 items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                        pathname === "/" ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      Home
                      {pathname === "/" && <ArrowRight className="h-4 w-4 text-orange-400 shrink-0" />}
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((o) => !o)}
                      className={`flex min-h-10 w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                        pathMatchesService(pathname) ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                      }`}
                      aria-expanded={mobileServicesOpen}
                    >
                      Services
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-orange-400 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>
                    {mobileServicesOpen && (
                      <ul className="mt-1 space-y-0.5 border-l-2 border-orange-500/25 pl-3 ml-4">
                        {SERVICE_LINKS.map((link) => {
                          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                          return (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex min-h-[44px] items-center rounded-lg px-3 py-2.5 text-sm font-medium ${
                                  active ? "text-orange-300" : "text-zinc-400 hover:text-white"
                                }`}
                              >
                                {link.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                  <li>
                    <Link
                      href="/quote"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex min-h-10 items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                        pathname === "/quote" ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      Pricing
                      {pathname === "/quote" && <ArrowRight className="h-4 w-4 text-orange-400 shrink-0" />}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/book"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex min-h-10 items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                        pathname === "/book" ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      Book
                      {pathname === "/book" && <ArrowRight className="h-4 w-4 text-orange-400 shrink-0" />}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex min-h-10 items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                        pathname === "/" ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      Contact
                      {pathname === "/" && <ArrowRight className="h-4 w-4 text-orange-400 shrink-0" />}
                    </Link>
                  </li>
                </ul>
                <div className="mt-4 flex flex-col gap-2 border-t border-white/[0.06] pt-4">
                  <Link
                    href="/quote"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.04] py-3 text-sm font-semibold text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white"
                  >
                    See Prices
                  </Link>
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

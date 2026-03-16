"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, Wrench, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/auto", label: "Automotive Services" },
  { href: "/handyman", label: "Handyman Services" },
  { href: "/diy-garage", label: "DIY Garage" },
  { href: "/it", label: "IT Consultant" },
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
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <div className={`flex items-center justify-center rounded-lg transition-all duration-500 ${isScrolled ? "bg-orange-500/10 p-2" : "bg-orange-500 p-2.5 shadow-[0_0_20px_rgba(255,122,26,0.5)] group-hover:shadow-[0_0_30px_rgba(255,122,26,0.8)]"}`}>
              <Wrench className={`shrink-0 transition-colors ${isScrolled ? "h-5 w-5 text-orange-400" : "h-5 w-5 text-black"}`} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="orbitron text-sm font-bold tracking-[0.2em] text-white">MANNY'S</span>
              <span className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-colors ${isScrolled ? "text-orange-400" : "text-white/70"}`}>GARAGE</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:block">
            <NavigationMenu.Root className="relative flex justify-center z-10 w-full">
              <NavigationMenu.List className="flex items-center justify-center space-x-0.5 rounded-[2rem] bg-white/[0.04] p-1.5 backdrop-blur-sm border border-white/[0.06]">
                
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur transition-colors hover:bg-white/10 lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
          <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-x-4 top-20 z-40 rounded-[2rem] border border-white/10 bg-black/90 p-6 backdrop-blur-2xl shadow-2xl lg:hidden"
          >
            <nav className="flex flex-col space-y-2">
              <p className="orbitron mb-2 px-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Menu</p>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-4 text-lg font-medium transition-colors ${
                      isActive ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive && <ArrowRight className="h-5 w-5 text-orange-400" />}
                  </Link>
                );
              })}
              <div className="pt-4">
                <Link
                  href="/book"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 font-bold text-black"
                >
                  Book Service Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

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
  { href: "/it", label: "IT Consultant" },
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
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 transition-all duration-300 [padding-left:max(0.5rem,env(safe-area-inset-left))] [padding-right:max(0.5rem,env(safe-area-inset-right))]"
      >
        <div
          className={`flex w-full max-w-7xl items-center justify-between gap-2 rounded-full border transition-all duration-500 min-h-[64px] sm:min-h-[80px] md:min-h-[100px] lg:min-h-[120px] xl:min-h-[140px] ${
            isScrolled
              ? "border-white/[0.08] bg-black/70 shadow-xl shadow-black/20 backdrop-blur-xl px-2 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3"
              : "border-transparent bg-transparent px-2 py-2"
          }`}
        >
          {/* Logo — scales with viewport */}
          <Link href="/" className="group flex min-h-[64px] sm:min-h-[80px] md:min-h-[100px] lg:min-h-[120px] xl:min-h-[140px] shrink-0 items-center" onClick={() => setMobileMenuOpen(false)}>
            <Image
              src={siteImages.logo}
              alt="Manny's Garage — Automotive, Handyman, IT & More"
              width={180}
              height={56}
              className="block h-16 w-auto object-contain object-left object-center sm:h-[80px] md:h-[100px] lg:h-[120px] xl:h-[140px]"
              priority
              sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, (max-width: 1024px) 220px, 260px"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:block">
            <NavigationMenu.Root className="relative flex justify-center z-10 w-full">
              <NavigationMenu.List className="flex items-center justify-center space-x-0.5 rounded-[2rem] bg-white/[0.04] p-1.5 backdrop-blur-sm border border-white/[0.06]">
                
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
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

          {/* Actions */}
          <div className="flex items-center gap-3">
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
              className="fixed left-3 right-3 z-40 rounded-2xl border border-white/10 bg-black/90 p-5 backdrop-blur-2xl shadow-2xl sm:left-4 sm:right-4 sm:rounded-[2rem] sm:p-6 lg:hidden [top:max(4.5rem,calc(env(safe-area-inset-top,0px)+3.75rem))]"
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
                    className={`flex min-h-[48px] items-center justify-between rounded-2xl px-4 py-4 text-lg font-medium transition-colors ${
                      isActive ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive && <ArrowRight className="h-5 w-5 text-orange-400" />}
                  </Link>
                );
              })}
            </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

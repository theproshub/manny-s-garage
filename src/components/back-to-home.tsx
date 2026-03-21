"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackToHome() {
  return (
    <Link
      href="/"
      aria-label="Back to home"
      className="orbitron inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-zinc-400 shadow-sm transition-colors hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
    >
      <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
      Home
    </Link>
  );
}

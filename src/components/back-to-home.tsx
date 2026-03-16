"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackToHome() {
  return (
    <Link
      href="/"
      className="inline-flex min-h-[44px] items-center gap-2 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden />
      Back to Main Menu
    </Link>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const baseClass =
  "group inline-flex items-center gap-1.5 rounded text-sm font-medium text-orange-400 transition-colors duration-200 hover:text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

type Props = {
  href: string;
  className?: string;
};

export function RecalculateCalculatorLink({ href, className = "" }: Props) {
  const isSamePage = href === "#calculator";
  const scrollToCalculator = (e: React.MouseEvent) => {
    if (!isSamePage) return;
    e.preventDefault();
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Link
      href={href}
      onClick={scrollToCalculator}
      className={`${baseClass} ${className}`.trim()}
    >
      <span>Recalculate with Quote Calculator</span>
      <ArrowRight
        className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden
      />
    </Link>
  );
}

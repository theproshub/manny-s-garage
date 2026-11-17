import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "See Fixed Pricing — Manny's Garage",
  description:
    "See what your job costs before you book — fixed prices for Handyman work, DIY Bay time and the common Automotive Service jobs. Fargo, ND.",
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}

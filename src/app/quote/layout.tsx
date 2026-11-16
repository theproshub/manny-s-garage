import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "See Fixed Pricing — Manny's Garage",
  description:
    "Pick a fixed price for Handyman, DIY Bay rental, or common Automotive Service jobs. Tap your package and book with that total—Fargo, ND.",
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}

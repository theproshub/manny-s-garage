import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Repair Fargo ND | Oil Changes, Brakes & Diagnostics — Manny's Garage",
  description:
    "Affordable auto repair in Fargo, ND. Oil changes from $40, brake jobs, check engine diagnostics, battery replacement, and emergency roadside. Same-day slots available.",
  openGraph: {
    title: "Auto Repair in Fargo, ND — Manny's Garage",
    description: "Oil changes, brakes, diagnostics, and roadside help. Fair prices, same-day slots.",
    url: "https://mannygarage.com/auto",
    images: [{ url: "https://mannygarage.com/hero/hero-bays.webp", width: 1200, height: 630, alt: "Manny's Garage auto repair bays in Fargo ND" }],
  },
};

export default function AutoLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automotive Service Fargo ND | Oil Changes, Brakes & Diagnostics — Manny's Garage",
  description:
    "Affordable automotive service in Fargo, ND. Oil changes from $40, brake jobs, check engine diagnostics, battery replacement, and emergency roadside. Same-day slots available.",
  openGraph: {
    title: "Automotive Service in Fargo, ND — Manny's Garage",
    description: "Oil changes, brakes, diagnostics, and roadside help. Fair prices, same-day slots.",
    url: "https://mannygarage.com/auto",
  },
};

export default function AutoLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Services & Pricing | Oil Change, Brakes, Diagnostics — Manny's Garage Fargo",
  description:
    "See all auto repair services and fixed prices at Manny's Garage in Fargo, ND. Conventional oil change $40, synthetic $65, brake pads $180, battery install $40.",
  openGraph: {
    title: "Auto Services & Pricing — Manny's Garage Fargo",
    description: "Fixed-price auto repair. Oil change, brakes, diagnostics, battery, roadside and more.",
    url: "https://mannygarage.com/auto/services",
    images: [{ url: "https://mannygarage.com/hero/hero-auto-slide-services.webp", width: 1200, height: 630, alt: "Auto repair services at Manny's Garage" }],
  },
};

export default function AutoServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

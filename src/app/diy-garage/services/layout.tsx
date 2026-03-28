import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DIY Bay Services & Pricing | Garage Rental Fargo ND — Manny's Garage",
  description:
    "See what's included in a DIY bay rental at Manny's Garage, Fargo ND. Lifts, tools, and workspace available by the hour. Perfect for DIY mechanics.",
  openGraph: {
    title: "DIY Bay Services & Pricing — Manny's Garage Fargo",
    description: "Hourly garage bay rental with lifts and tools. Everything a DIY mechanic needs.",
    url: "https://mannygarage.com/diy-garage/services",
    images: [{ url: "https://mannygarage.com/hero/diy-garage-bay.webp", width: 1200, height: 630, alt: "DIY garage bay services at Manny's Garage" }],
  },
};

export default function DIYServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

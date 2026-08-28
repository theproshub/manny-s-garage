import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "I.T. Services & Pricing | Websites, Wi-Fi, PC Repair Fargo — Manny's Garage",
  description:
    "Browse I.T. services and pricing at Manny's Garage, Fargo ND. Website builds, Wi-Fi installation, computer repair, and business data setup. Get a quote today.",
  openGraph: {
    title: "I.T. Services & Pricing — Manny's Garage Fargo",
    description: "Website building, Wi-Fi, computer repair, and data services. Plain-English pricing.",
    url: "https://mannygarage.com/it/services",
  },
};

export default function ITServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

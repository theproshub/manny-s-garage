import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "I.T. Services Fargo ND | Websites, Wi-Fi, Computer Repair — Manny's Garage",
  description:
    "I.T. services in Fargo, ND. Website and app building, Wi-Fi setup, computer repair, and data reporting. Plain-English tech help for homes and small businesses.",
  openGraph: {
    title: "I.T. Services in Fargo, ND — Manny's Garage",
    description: "Websites, Wi-Fi setup, computer repair, and data help. No jargon, just solutions.",
    url: "https://mannygarage.com/it",
    images: [{ url: "https://mannygarage.com/hero/hero-bays.webp", width: 1200, height: 630, alt: "I.T. services at Manny's Garage Fargo ND" }],
  },
};

export default function ITLayout({ children }: { children: React.ReactNode }) {
  return children;
}

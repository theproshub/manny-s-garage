import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Manny's Garage — Fargo's One-Stop Shop",
  description:
    "Learn about Manny's Garage in Fargo, ND. Auto repair, handyman, DIY bays, and I.T. — real people, fair prices, and quality work you can count on.",
  openGraph: {
    title: "About Manny's Garage — Fargo, ND",
    description: "Real people, fair prices, and quality work. One shop for auto, handyman, DIY, and I.T.",
    url: "https://mannygarage.com/about",
    images: [{ url: "https://mannygarage.com/hero/hero-bays.webp", width: 1200, height: 630, alt: "Manny's Garage in Fargo ND" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

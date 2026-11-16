import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Manny's Garage — Fargo's One-Stop Shop",
  description:
    "Learn about Manny's Garage in Fargo, ND. Automotive Service, Handyman, DIY Bays, and I.T. Service — real people, fair prices, and quality work you can count on.",
  openGraph: {
    title: "About Manny's Garage — Fargo, ND",
    description: "Real people, fair prices, and quality work. One shop for Automotive Service, Handyman, DIY Bay, and I.T. Service",
    url: "https://mannygarage.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

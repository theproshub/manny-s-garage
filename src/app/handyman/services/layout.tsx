import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handyman Services & Pricing | TV Mount, Cameras, Assembly — Manny's Garage Fargo",
  description:
    "Handyman pricing at Manny's Garage, Fargo ND. TV mounting from $1.50/inch, furniture assembly $50/item, security camera install $120. Book online today.",
  openGraph: {
    title: "Handyman Services & Pricing — Manny's Garage Fargo",
    description: "TV mounting, furniture assembly, security cameras — fixed prices, fast booking.",
    url: "https://mannygarage.com/handyman/services",
    images: [{ url: "https://mannygarage.com/hero/hero-handyman-services.webp", width: 1200, height: 630, alt: "Handyman services and pricing at Manny's Garage" }],
  },
};

export default function HandymanServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

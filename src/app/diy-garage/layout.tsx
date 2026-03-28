import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DIY Garage Bay Rental Fargo ND | Fully Equipped Bays — Manny's Garage",
  description:
    "Rent a fully equipped DIY garage bay in Fargo, ND by the hour. Lifts, tools, and workspace to work on your own vehicle. Book your bay at Manny's Garage.",
  openGraph: {
    title: "DIY Garage Bay Rental in Fargo, ND — Manny's Garage",
    description: "Rent a lift, tools, and workspace by the hour. Work on your own car at Manny's Garage.",
    url: "https://mannygarage.com/diy-garage",
    images: [{ url: "https://mannygarage.com/hero/diy-garage-bay.webp", width: 1200, height: 630, alt: "DIY garage bay rental at Manny's Garage Fargo ND" }],
  },
};

export default function DIYGarageLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handyman Services Fargo ND | TV Mounting, Cameras & Assembly — Manny's Garage",
  description:
    "Local handyman in Fargo, ND. TV wall mounting, security camera installation, furniture assembly, bunk beds, LED strips, and more. Fast booking, same-day slots.",
  openGraph: {
    title: "Handyman Services in Fargo, ND — Manny's Garage",
    description: "TV mounting, security cameras, furniture assembly and more. Fast, reliable, fair price.",
    url: "https://mannygarage.com/handyman",
  },
};

export default function HandymanLayout({ children }: { children: React.ReactNode }) {
  return children;
}

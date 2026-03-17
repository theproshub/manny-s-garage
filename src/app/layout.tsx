import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manny's Garage — Auto, Handyman, DIY Bay & IT | Fargo, ND",
  description:
    "Manny's Garage — auto repair, handyman, DIY bay, and IT in Fargo, ND. Repair your ride, upgrade your home, rent a bay, or sort your tech. One shop—no runaround.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="min-h-screen relative bg-[#030507]">
        <StickyHeader />
        <div className="pt-[64px] sm:pt-[80px] md:pt-[100px] lg:pt-[120px] xl:pt-[140px]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

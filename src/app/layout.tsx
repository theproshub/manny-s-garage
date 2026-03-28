import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";
import { localBusinessSchema } from "@/lib/schema";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manny's Garage — Auto, Handyman, DIY Bay & I.T. | Fargo, ND",
  description:
    "Manny's Garage — auto repair, handyman, DIY bay, and I.T. in Fargo, ND. Repair your ride, upgrade your home, rent a bay, or sort your tech. One shop—no runaround.",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
      </head>
      <body className="min-h-screen relative bg-[#030507]">
        <StickyHeader />
        <div className="pt-[72px] sm:pt-20 lg:pt-[140px] [padding-left:max(0px,env(safe-area-inset-left))] [padding-right:max(0px,env(safe-area-inset-right))]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { Letterhead } from "@/components/estimate/letterhead";
import { IndexTabs } from "@/components/estimate/index-tabs";
import { Footer } from "@/components/footer";
import { localBusinessSchema } from "@/lib/schema";

/**
 * One family, differentiated by weight and width rather than by mixing three
 * typefaces. Archivo is a grotesque drawn for high legibility at small sizes
 * in print and on screen — sturdier and far less worn than the institutional
 * default it replaces.
 *
 * There is no monospace. Money is set in Archivo with tabular figures, which
 * is what financial interfaces actually do; monospaced prices are the paper
 * receipt cliche the brief rules out.
 */
const archivo = Archivo({
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manny's Garage — Auto, Handyman, DIY Bay & I.T. | Fargo, ND",
  description:
    "Manny's Garage — auto repair, handyman, DIY bay, and I.T. in Fargo, ND. Repair your ride, upgrade your home, rent a bay, or sort your tech. One shop—no runaround.",
  metadataBase: new URL("https://mannygarage.com"),
  alternates: { canonical: "/" },
  verification: { google: "google8b2e203404a03e46" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Manny's Garage — Fargo's One-Stop Shop",
    description: "Auto repair, handyman, DIY bay, and I.T. in Fargo, ND.",
    url: "https://mannygarage.com",
    siteName: "Manny's Garage",
    locale: "en_US",
    type: "website",
    images: [{ url: "/logo-v2.webp", width: 203, height: 256, alt: "Manny's Garage logo" }],
  },
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
    <html lang="en" className={archivo.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
      </head>
      <body className="min-h-screen relative">
        <a href="#content" className="skip-link">Skip to content</a>
        <Letterhead />
        <IndexTabs />
        <div id="content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

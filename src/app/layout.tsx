import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Orbitron } from "next/font/google";
import "./globals.css";
import { StickyHeader } from "@/components/sticky-header";
import { ActionBar } from "@/components/action-bar";
import { Footer } from "@/components/footer";
import { localBusinessSchema } from "@/lib/schema";

/**
 * The shop's own pairing, restored: Plus Jakarta Sans carries body copy,
 * Orbitron carries display — headings, figures and labels.
 *
 * Both go through next/font rather than the `@import` the old stylesheet used.
 * That import is still valid CSS and still reaches the browser, but it makes
 * the typeface a runtime fetch from fonts.googleapis.com — which is why the
 * display face silently fell back to the body face on first render. next/font
 * self-hosts the same files and emits the variable at build time.
 */
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
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
    /* No `images` here on purpose. `src/app/opengraph-image.tsx` supplies the
       card and Next.js fills this in from it, at a correct 1200x630. Declaring
       one here would override that route — which is how this ended up pointing
       at the 203x256 logo, below every platform's large-card threshold, so the
       most-shared URL on the site previewed as a thumbnail. */
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
    <html lang="en" className={`${plusJakarta.variable} ${orbitron.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
      </head>
      <body className="min-h-screen relative">
        <a href="#content" className="skip-link">Skip to content</a>
        <StickyHeader />
        <div id="content">{children}</div>
        <Footer />
        <ActionBar />
      </body>
    </html>
  );
}

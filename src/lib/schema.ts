const BASE_URL = "https://manny-s-garage.vercel.app";

const businessBase = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "Manny's Garage",
  url: BASE_URL,
  logo: `${BASE_URL}/logo-v2.webp`,
  image: `${BASE_URL}/hero/hero-bays.webp`,
  telephone: "+17015550142",
  email: "service@mannysgarage.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1335 Main Ave S",
    addressLocality: "Fargo",
    addressRegion: "ND",
    postalCode: "58103",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 46.8772,
    longitude: -96.7898,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "15:00",
    },
  ],
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card",
  areaServed: {
    "@type": "City",
    name: "Fargo",
    "@id": "https://www.wikidata.org/wiki/Q486214",
  },
  sameAs: [],
};

export function localBusinessSchema() {
  return {
    ...businessBase,
    description:
      "Manny's Garage — auto repair, handyman, DIY bay, and I.T. in Fargo, ND. One shop, no runaround.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Manny's Garage Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Auto Repair" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Handyman Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "DIY Garage Bay Rental" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "I.T. Support" } },
      ],
    },
  };
}

export function autoServiceSchema() {
  return {
    ...businessBase,
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Manny's Garage — Automotive",
    description:
      "Automotive repair in Fargo, ND. Oil changes, brake jobs, diagnostics, battery replacement, and emergency roadside assistance.",
    serviceType: "Automotive Repair",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Automotive Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Oil Change", price: "40", priceCurrency: "USD" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brake Pad Replacement", price: "180", priceCurrency: "USD" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automotive Diagnostic", price: "0", priceCurrency: "USD" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Battery Replacement", price: "40", priceCurrency: "USD" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Roadside Assistance", price: "60", priceCurrency: "USD" } },
      ],
    },
  };
}

export function handymanServiceSchema() {
  return {
    ...businessBase,
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Manny's Garage — Handyman",
    description:
      "Handyman services in Fargo, ND. TV mounting, security camera installation, furniture assembly, and more.",
    serviceType: "Handyman",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Handyman Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "TV Wall Mount" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Security Camera Installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Furniture Assembly" } },
      ],
    },
  };
}

export function diyGarageSchema() {
  return {
    ...businessBase,
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Manny's Garage — DIY Bay Rental",
    description:
      "DIY garage bay rental in Fargo, ND. Rent a fully equipped bay by the hour to work on your own vehicle.",
    serviceType: "Garage Bay Rental",
  };
}

export function itServiceSchema() {
  return {
    ...businessBase,
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Manny's Garage — I.T. Services",
    description:
      "I.T. services in Fargo, ND. Website and app building, Wi-Fi setup, computer repair, and data reporting.",
    serviceType: "Information Technology Services",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "I.T. Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website & App Building" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wi-Fi & Internet Setup" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Computer Help & Repair" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Data & Reporting" } },
      ],
    },
  };
}

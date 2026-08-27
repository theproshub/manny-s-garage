/**
 * Single source of truth for every fact published on the site.
 * Nothing here may be duplicated as a literal in a component — the address,
 * rate and domain each previously drifted across files, which is what made
 * the site read as fake. `npm run check:facts` enforces this.
 */

export const BUSINESS = {
  name: "Manny's Garage",
  domain: "mannygarage.com",
  url: "https://mannygarage.com",
  email: "service@mannygarage.com",

  phone: {
    e164: "+16094988246",
    display: "+1 (609) 498-8246",
    tel: "tel:+16094988246",
    placeholder: "(609) 498-8246",
  },

  address: {
    street: "1341 Main Ave S",
    locality: "Fargo",
    region: "ND",
    postalCode: "58103",
    country: "US",
    oneLine: "1341 Main Ave S, Fargo, ND 58103",
    mapQuery: "1341+Main+Ave+S+Fargo+ND+58103",
  },

  geo: { latitude: 46.8772, longitude: -96.7898 },

  /** Rendered verbatim on the letterhead and the stub. */
  hours: [
    { days: "Mon–Fri", opens: "08:00", closes: "18:00" },
    { days: "Sat", opens: "09:00", closes: "15:00" },
    { days: "Sun", opens: null, closes: null },
  ],
} as const;

/** Published rates. The quote tables are derived from these, never retyped. */
export const RATES = {
  tvMountPerInch: 1.5,
  furniturePerItem: 50,
  cameraPerUnit: 120,
  windowTreatment: 50,
  bunkBed: 100,
  diyBayHourly: 20,
  diyMechanicHourly: 40,
  diyMaxHours: 8,
} as const;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${BUSINESS.address.mapQuery}&output=embed`;
export const appleMapsUrl = `https://maps.apple.com/maps?q=${BUSINESS.address.mapQuery}`;
export const mailtoUrl = `mailto:${BUSINESS.email}`;

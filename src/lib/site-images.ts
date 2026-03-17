/**
 * Content-related stock photos (Unsplash, Pexels) used across the site.
 * Each image is chosen to match the app goal: auto, handyman, DIY garage, IT.
 * URLs use w=1200&q=80 for consistent quality and Next.js Image optimization.
 */
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`;

export const siteImages = {
  /** Site logo (transparent PNG) */
  logo: "/logo.png",

  // —— Auto ——
  /** Garage hero - car in shop (Frankie Cordoba, Unsplash) */
  garageHero: unsplash("1646807284302-170c9505b2e7"),
  /** Diagnostics / check engine - mechanic at scanner (Dextar Vision, Unsplash) */
  diagnostics: unsplash("1771340012319-0b4fca008b54"),
  /** Brake rotor & caliper - brake/suspension (Erik Mclean, Unsplash) */
  brakeSuspension: unsplash("1581092160562-40aa08e78837"),
  /** Engine bay - tune-ups & maintenance (Unsplash) */
  engineMaintenance: unsplash("1486262715619-67b85e0b08d3"),
  /** Electrical / workshop - battery/charging (reuse diagnostics-style; Unsplash CDN uses numeric IDs only) */
  batteryCharging: unsplash("1771340012319-0b4fca008b54"),

  // —— Handyman ——
  /** TV on wall - TV mounting (BoliviaInteligente, Unsplash) */
  handymanTv: unsplash("1717295248380-9b10f252dbcb"),
  /** Living room / furniture (Prydumano Design, Unsplash) */
  handymanFurniture: unsplash("1724582586495-d050726cf354"),
  /** Security camera (Pexels) */
  handymanCameras: "https://images.pexels.com/photos/179993/pexels-photo-179993.jpeg?auto=compress&cs=tinysrgb&w=1200",

  // —— DIY garage ——
  /** Workshop / tools - DIY bay (PB Swiss Tools, Unsplash) */
  diyGarage: unsplash("1770656505795-350f37352c7a"),

  // —— IT ——
  /** Laptop / tech workspace (Teodor Skrebnev, Unsplash) */
  itConsultant: unsplash("1715967635831-f5a1f9658880"),

  // —— About / team ——
  /** Team / workshop - about page (Unsplash) */
  teamAbout: unsplash("1517048676732-d65bc937f952"),
} as const;

/**
 * Content-related stock photos (Unsplash, Pexels) used across the site.
 * Each image is chosen to match the app goal: auto, handyman, DIY garage, I.T.
 * URLs use w=1200&q=80 for consistent quality and Next.js Image optimization.
 */
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`;

export const siteImages = {
  /** Site logo (transparent PNG) */
  logo: "/logo-v2.webp",

  // —— Auto ——
  /** Garage hero - car in shop (Frankie Cordoba, Unsplash) */
  garageHero: unsplash("1646807284302-170c9505b2e7"),
  /** Engine bay - diagnostics / automotive service (Michael Lock, Unsplash) */
  diagnostics: "/hero/auto-engine-bay.webp",
  /** Brake rotor & caliper - brake/suspension (Toby Hall, Unsplash) */
  brakeSuspension: "/hero/auto-brake-suspension.webp",
  /** Engine bay - tune-ups & maintenance (Unsplash) */
  engineMaintenance: unsplash("1486262715619-67b85e0b08d3"),
  /** Electrical / workshop - battery/charging (reuse diagnostics-style; Unsplash CDN uses numeric IDs only) */
  batteryCharging: unsplash("1771340012319-0b4fca008b54"),

  // —— Handyman ——
  /** TV on wall - TV mounting (BoliviaInteligente, Unsplash) */
  handymanTv: unsplash("1717295248380-9b10f252dbcb"),
  /** Living room / furniture assembly (Francesca Tosolini, Unsplash) */
  handymanFurniture: "/hero/handyman-furniture.webp",
  /** Security camera installation (Alexis Dreher, Unsplash) */
  handymanCameras: "/hero/handyman-security-camera.webp",

  // —— DIY garage ——
  /** Garage with car on lifts - DIY bay rental (Lorenzo Hamers, Unsplash) */
  diyGarage: "/hero/diy-garage-bay.webp",

  // —— I.T ——
  /**
   * Laptop / tech workspace.
   * Local hero image to avoid remote fetch failures in restricted environments.
   */
  itConsultant: "/hero/hero-bays.webp",

  // —— About / team ——
  /** Team / workshop - about page (Unsplash) */
  teamAbout: unsplash("1517048676732-d65bc937f952"),
} as const;

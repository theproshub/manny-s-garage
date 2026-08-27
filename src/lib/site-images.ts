/**
 * Local image assets. All stock photography and remote hosts were removed —
 * real photos of the shop replace these as they become available, added as
 * captioned evidence rather than decoration.
 */
export const siteImages = {
  /** Site logo (transparent PNG) */
  logo: "/logo-v2.webp",

  // —— Auto ——
  /** Engine bay - diagnostics / automotive service (Michael Lock, Unsplash) */
  diagnostics: "/hero/auto-engine-bay.webp",
  /** Brake rotor & caliper - brake/suspension (Toby Hall, Unsplash) */
  brakeSuspension: "/hero/auto-brake-suspension.webp",

  // —— Handyman ——
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

} as const;

/**
 * Local image assets. All stock photography and remote hosts were removed —
 * real photos of the shop replace these as they become available, added as
 * captioned evidence rather than decoration.
 */
export const siteImages = {
  /**
   * The shop's logo: the full lockup — mascot, "MANNY'S GARAGE", and the
   * "AUTOMOTIVE · HANDYMAN · IT & MORE.." tagline.
   *
   * This is the original artwork restored. What was being served was
   * `logo-v2.webp`: a 203x256 crop of the mascot alone, with the shop's own
   * name cut out of its own logo. Before that, a transparency script had run
   * over the real lockup with a brightness threshold and destroyed 11,054
   * pixels of artwork — the tagline and the mascot's dark outlines — because
   * it could not tell dark ink from a dark background.
   *
   * Rebuilt from the last intact copy (092e842) by flood-filling the
   * background inward from the edges, so only the ground connected to the
   * frame was removed and every dark pixel inside the artwork survived.
   */
  logo: "/logo.webp",

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

/**
 * Local image assets. All stock photography and remote hosts were removed —
 * real photos of the shop replace these as they become available, added as
 * captioned evidence rather than decoration.
 *
 * `/shop/` is that replacement arriving: ten photographs of this actual
 * building on Main Ave S — the sign, the bays, the tyre stacks, the tool
 * wall. They were shot on a phone in portrait, so each one is pre-cropped to
 * a 1600x1000 landscape band rather than left for `object-cover` to guess at;
 * a 9:16 frame dropped into a 16:10 hero loses two thirds of itself, and what
 * survives is usually floor. Anything still pointing at `/hero/` or
 * `/services/` below is stock, and is a candidate for the next real photo.
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

  // —— The shop itself (real photographs, Oct 2026) ——
  /** Street frontage: the painted sign over the open bay door. */
  shopFront: "/shop/auto-shop-front.webp",
  /** The sign again, wider, with the bay open and the floor visible behind. */
  shopBayDoor: "/shop/auto-bay-door.webp",
  /** Inside: cars up on the lifts under the strip lights. */
  shopBays: "/shop/auto-bays.webp",
  /** Tyre stock, stacked against the back wall. */
  shopTires: "/shop/auto-tires.webp",
  /** Parts shelving — CV axle shafts, cases, welding helmet. */
  shopParts: "/shop/auto-parts.webp",

  /** The rentable bay, empty and ready: the two-post lift standing over a
   *  clear floor, with the tool chest and workstation behind it. This is the
   *  DIY hero — the page promises "a bay with a lift, tools, and air" and
   *  this is the only photograph that shows the lift. */
  bayInterior: "/shop/diy-bay.webp",
  /** The tool wall over the workbench — what a bay rental gets you. */
  bayToolWall: "/shop/diy-tool-wall.webp",
  /** Tyre changer and the air compressor beside it. */
  bayTireMachine: "/shop/diy-tire-machine.webp",
  /** The roll-away tool chest. */
  bayToolChest: "/shop/diy-tool-chest.webp",

} as const;

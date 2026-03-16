/**
 * Real stock photos (Unsplash, Pexels) used across the site.
 * All URLs use w=1200&q=80 for consistent quality and Next.js Image optimization.
 */
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`;

export const siteImages = {
  /** Auto shop / garage hero - car in garage being worked on (Frankie Cordoba, Unsplash) */
  garageHero: unsplash("1646807284302-170c9505b2e7"),
  /** Mechanic working on car engine in workshop (Dextar Vision, Unsplash) */
  diagnostics: unsplash("1771340012319-0b4fca008b54"),
  /** Living room with flat screen TV on wall (BoliviaInteligente, Unsplash) */
  handymanTv: unsplash("1717295248380-9b10f252dbcb"),
  /** Flat screen TV mounted on wall above wooden table (Tile Merchant Ireland, Unsplash) */
  handymanTvAlt: unsplash("1701421048182-2a628d927578"),
  /** Living room with couch and table - furniture assembly (Prydumano Design, Unsplash) */
  handymanFurniture: unsplash("1724582586495-d050726cf354"),
  /** Security camera on building (Pexels - free use) */
  handymanCameras: "https://images.pexels.com/photos/179993/pexels-photo-179993.jpeg?auto=compress&cs=tinysrgb&w=1200",
  /** Tools on workbench - DIY garage / workshop (PB Swiss Tools, Unsplash) */
  diyGarage: unsplash("1770656505795-350f37352c7a"),
  /** Laptop / tech workspace - IT consultant (Teodor Skrebnev, Unsplash) */
  itConsultant: unsplash("1715967635831-f5a1f9658880"),
} as const;

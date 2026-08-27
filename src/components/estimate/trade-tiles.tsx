import Link from "next/link";
import { CarFront, Hammer, Warehouse, Wifi } from "lucide-react";

/**
 * What the shop actually does, shown rather than listed. The name says
 * garage; three of the four are not car work, so the icons carry that faster
 * than a sentence can.
 */
const TRADES = [
  { icon: CarFront, label: "Car repair", note: "At our shop", href: "/auto" },
  { icon: Hammer, label: "House jobs", note: "We come to you", href: "/handyman" },
  { icon: Warehouse, label: "Rent a bay", note: "At our shop", href: "/diy-garage" },
  { icon: Wifi, label: "Tech help", note: "We come to you", href: "/it" },
];

export function TradeTiles() {
  return (
    <ul className="tiles">
      {TRADES.map(({ icon: Icon, label, note, href }) => (
        <li key={href}>
          <Link href={href} className="tile">
            <Icon className="tile-icon" strokeWidth={1.5} aria-hidden />
            <span className="tile-label">{label}</span>
            <span className="tile-note">{note}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

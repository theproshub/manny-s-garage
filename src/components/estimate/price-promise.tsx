import { CarFront, Hammer, Warehouse, Wifi } from "lucide-react";
import { RATES } from "@/lib/business";
import { SERVICE_OPTIONS, optionTotal } from "@/lib/estimates";

/**
 * The four kinds of work, side by side, on equal footing.
 *
 * Earlier versions of this graphic led with one job — first a TV mount, then a
 * brake job — which made one trade look like the business and the rest like
 * extras. They are peers. The matrix gives each the same row, the same
 * columns and the same weight.
 *
 * Starting prices are derived from the catalogue, never typed here, so the
 * hero cannot drift away from the prices further down the page.
 */
function cheapest(group: string): number {
  return Math.min(
    ...SERVICE_OPTIONS.filter((o) => o.group === group && o.status !== "quoted")
      .map(optionTotal)
      .filter((n) => n > 0),
  );
}

const usd0 = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const ROWS = [
  {
    icon: CarFront,
    trade: "Car repair",
    covers: "The work, and the check over",
    excluded: "Parts — agreed with you first",
    where: "At our shop",
    from: usd0(cheapest("Car repair")),
  },
  {
    icon: Hammer,
    trade: "House jobs",
    covers: "The whole job, start to finish",
    excluded: "Nothing",
    where: "We come to you",
    from: usd0(cheapest("House job")),
  },
  {
    icon: Warehouse,
    trade: "Rent a bay",
    covers: "Lift, tools, and the old oil taken away",
    excluded: "Nothing",
    where: "At our shop",
    from: `${usd0(RATES.diyBayHourly)}/hr`,
  },
  {
    icon: Wifi,
    trade: "Tech help",
    covers: "We look, then tell you the price",
    excluded: "Nothing added later",
    where: "We come to you",
    from: "Quoted",
  },
];

export function PricePromise() {
  return (
    <figure className="pp">
      <figcaption className="pp-cap">Four kinds of work. Same promise on all of them.</figcaption>

      <div className="pp-grid" role="table" aria-label="What each kind of work covers and what it starts at">
        <div className="pp-hrow" role="row">
          <span role="columnheader" className="pp-h">Work</span>
          <span role="columnheader" className="pp-h">What the price covers</span>
          <span role="columnheader" className="pp-h">Not in it</span>
          <span role="columnheader" className="pp-h pp-right">From</span>
        </div>

        {ROWS.map(({ icon: Icon, trade, where, covers, excluded, from }) => (
          <div className="pp-row" role="row" key={trade}>
            <span role="cell" className="pp-trade">
              <Icon className="pp-icon" strokeWidth={1.5} aria-hidden />
              <span className="min-w-0">
                {trade}
                <span className="pp-where">{where}</span>
              </span>
            </span>
            <span role="cell" className="pp-covers">{covers}</span>
            <span role="cell" className="pp-excl">{excluded}</span>
            <span role="cell" className="pp-from figure">{from}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}

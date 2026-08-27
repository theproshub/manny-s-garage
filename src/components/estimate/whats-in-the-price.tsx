import { formatUsd } from "./line-item";

/**
 * The hero graphic: what a price contains, and what it does not.
 *
 * Leads with a brake job because this is a garage — an earlier version led
 * with a TV bracket, chosen because its data was tidy, which let a design
 * convenience decide what the business appears to do.
 *
 * Two columns rather than a bar chart. The fear a customer brings to a repair
 * shop is the charge nobody mentioned, so the honest move is to give "not in
 * the price" its own column and let the reader see how little is in it — and
 * that the one item there is disclosed, not hidden.
 */
const LABOR = 180;

const INCLUDED = [
  "Fitting new pads to one axle",
  "A full check over the brake system",
  "Taking the old pads away",
  "Road test before you collect it",
];

const NOT_INCLUDED = [
  { item: "The pads themselves", note: "Priced for your car and agreed with you before we start" },
];

export function WhatsInThePrice() {
  return (
    <figure className="wip">
      <figcaption className="wip-cap">New brake pads, one axle — what the price covers</figcaption>

      <div className="wip-cols">
        <div className="wip-col">
          <p className="wip-head">In the price</p>
          <ul className="wip-list">
            {INCLUDED.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>

        <div className="wip-col wip-col-out">
          <p className="wip-head">Not in the price</p>
          <ul className="wip-list">
            {NOT_INCLUDED.map((n) => (
              <li key={n.item}>
                {n.item}
                <span className="wip-note">{n.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wip-total">
        <span className="wip-total-key">The work</span>
        <span className="wip-total-val figure">{formatUsd(LABOR)}</span>
      </div>
    </figure>
  );
}

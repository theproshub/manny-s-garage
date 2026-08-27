import { RATES } from "@/lib/business";

/**
 * The site's premise, drawn rather than asserted.
 *
 * Bar widths are proportional to the real amounts, so the graphic is a chart
 * of an actual job — a 55-inch TV mount — not an illustration of one. It shows
 * the one thing the site exists to prove: the parts of a price are visible,
 * and they add up to a number you are told before you agree to anything.
 */
const MOUNT = 55 * RATES.tvMountPerInch;
const BRACKET = 0;
const TOTAL = MOUNT + BRACKET;

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

export function PriceAnatomy() {
  const scale = 100 / TOTAL;

  return (
    <figure className="anatomy">
      <figcaption className="anatomy-cap">
        A 55-inch TV put on the wall — every part of the price
      </figcaption>

      <div className="anatomy-rows">
        <div className="anatomy-row">
          <span className="anatomy-key">Mounting</span>
          <span className="anatomy-track">
            <span className="anatomy-bar" style={{ width: `${MOUNT * scale}%` }} />
          </span>
          <span className="anatomy-val figure">{usd(MOUNT)}</span>
        </div>

        <div className="anatomy-row">
          <span className="anatomy-key">Bracket</span>
          <span className="anatomy-track">
            <span className="anatomy-bar is-none" />
          </span>
          <span className="anatomy-val anatomy-val-muted">Included</span>
        </div>

        <div className="anatomy-row">
          <span className="anatomy-key">Anything else</span>
          <span className="anatomy-track">
            <span className="anatomy-bar is-none" />
          </span>
          <span className="anatomy-val anatomy-val-muted">Nothing</span>
        </div>
      </div>

      <div className="anatomy-total">
        <span className="anatomy-total-key">You pay</span>
        <span className="anatomy-total-val figure">{usd(TOTAL)}</span>
      </div>
    </figure>
  );
}

import type { ReactNode } from "react";
import { BUSINESS } from "@/lib/business";

/**
 * The printed sheet the whole site sits on.
 *
 * A work order is a physical object: a bounded form with a titled masthead
 * and a form code at the foot. Without the boundary the page reads as
 * sections floating on a background; with it, it reads as a document.
 *
 * The copy notice explains the canary band rather than leaving it as an
 * unexplained tint — on a real multi-part form the colour tells you which
 * copy you are holding.
 */
export function Sheet({ children }: { children: ReactNode }) {
  return (
    <div className="sheet">
      <div className="sheet-masthead">
        <span className="sheet-title">Repair order · estimate</span>
        <span className="sheet-meta">
          {BUSINESS.address.locality}, {BUSINESS.address.region} · {BUSINESS.phone.display}
        </span>
      </div>

      {children}

      <div className="sheet-code">
        <span>Form MG-1</span>
        <span>Rev. 08/26</span>
        <span>White copy — customer</span>
        <span className="ml-auto">Prices shown in USD</span>
      </div>
    </div>
  );
}

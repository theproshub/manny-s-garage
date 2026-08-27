import { TRADE_LOCATION } from "@/lib/trade-location";

/**
 * The painted marker for a trade. A numeral means there is a bay at
 * 1341 Main Ave; MOB means we come to your address instead.
 *
 * The marker is decorative to assistive tech — it is always paired with
 * <BayNote>, which carries the same information as visible text. Announcing
 * both would read the location twice.
 */
export function BayMarker({ mark, size = "sm" }: { mark: string; size?: "sm" | "lg" }) {
  const loc = TRADE_LOCATION[mark];
  if (!loc) return null;

  return (
    <span
      className={`bay ${loc.kind === "mobile" ? "bay-mobile" : ""} ${size === "lg" ? "bay-lg" : ""}`}
      aria-hidden
    >
      {loc.marker}
    </span>
  );
}

export function BayNote({ mark }: { mark: string }) {
  const loc = TRADE_LOCATION[mark];
  if (!loc) return null;
  return <span className="bay-note">{loc.note}</span>;
}

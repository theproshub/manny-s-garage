import { TRADE_LOCATION } from "@/lib/trade-location";

/**
 * Says plainly where the work happens. Replaced the "01" / "MOB" bay markers,
 * which were shop-internal codes a customer had no way to read.
 */
export function WhereBadge({ mark, detail = false }: { mark: string; detail?: boolean }) {
  const loc = TRADE_LOCATION[mark];
  if (!loc) return null;

  return (
    <span className="where">
      <span className={`where-dot ${loc.kind === "mobile" ? "is-mobile" : ""}`} aria-hidden />
      <span className="where-label">{loc.label}</span>
      {detail ? <span className="where-detail">{loc.detail}</span> : null}
    </span>
  );
}

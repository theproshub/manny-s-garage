import { ServicePage } from "@/components/estimate/service-page";
import { Schedule } from "@/components/estimate/schedule";
import { HANDYMAN_ITEMS, tvMountPrice } from "@/lib/service-catalog";
import { RATES } from "@/lib/business";
import type { LineItem } from "@/components/estimate/line-item";

const TV_SIZES = [32, 43, 55, 65, 75, 85] as const;

/** Derived from the rate, never retyped — the table cannot drift from it. */
const TV_ROWS: readonly LineItem[] = TV_SIZES.map((size) => ({
  code: `H-110/${size}`,
  description: `${size}″ TV wall mount`,
  spec: `${size} × $${RATES.tvMountPerInch.toFixed(2)}`,
  price: tvMountPrice(size),
}));

export default function HandymanServicesPage() {
  return (
    <ServicePage
      mark="H"
      title="Handyman — service detail"
      intro="Per-item prices, plus the TV mounting table worked out at common screen sizes so you do not have to do the arithmetic."
      items={HANDYMAN_ITEMS}
      quoteHref="/quote?for=handyman"
      terms={[
        "Brackets and fixings quoted separately if you need us to supply them.",
        "Measure the screen corner to corner on the diagonal, not edge to edge.",
      ]}
    >
      <Schedule
        mark="H"
        heading="TV mounting by size"
        caption={`Charged at $${RATES.tvMountPerInch.toFixed(2)} per diagonal inch.`}
        items={TV_ROWS}
      />
    </ServicePage>
  );
}

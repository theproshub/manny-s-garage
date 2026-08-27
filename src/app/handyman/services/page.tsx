import { ServicePage } from "@/components/estimate/service-page";
import { Schedule } from "@/components/estimate/schedule";
import { HANDYMAN_ITEMS, tvMountPrice } from "@/lib/service-catalog";
import { RATES } from "@/lib/business";
import type { LineItem } from "@/components/estimate/line-item";

const TV_SIZES = [32, 43, 55, 65, 75, 85] as const;

/** Derived from the rate, never retyped — the table cannot drift from it. */
const TV_ROWS: readonly LineItem[] = TV_SIZES.map((size) => ({
  code: `H-110/${size}`,
  description: `${size}-inch TV`,
  spec: `${size} × $${RATES.tvMountPerInch.toFixed(2)}`,
  price: tvMountPrice(size),
}));

export default function HandymanServicesPage() {
  return (
    <ServicePage
      mark="H"
      title="What each house job costs"
      intro="Prices per item, plus the TV sizes already worked out so you do not have to do the math."
      items={HANDYMAN_ITEMS}
      quoteHref="/quote?for=handyman"
      terms={[
        "Need us to bring the bracket and screws? We will price those separately.",
        "Measure your screen corner to corner, not side to side.",
      ]}
    >
      <Schedule
        mark="H"
        heading="TV prices by screen size"
        caption={`$${RATES.tvMountPerInch.toFixed(2)} for every inch across the screen.`}
        items={TV_ROWS}
      />
    </ServicePage>
  );
}

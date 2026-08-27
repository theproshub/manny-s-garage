import { ServicePage } from "@/components/estimate/service-page";
import { HANDYMAN_ITEMS } from "@/lib/service-catalog";
import { RATES } from "@/lib/business";

export default function HandymanPage() {
  return (
    <ServicePage
      mark="H"
      title="Handyman work"
      intro="Mounting, assembly and installation around the house, priced per item or per inch so you can work out the cost before you call."
      items={HANDYMAN_ITEMS}
      quoteHref="/quote?for=handyman"
      terms={[
        `TV mounting is charged per diagonal inch at $${RATES.tvMountPerInch.toFixed(2)}. A 55-inch set is $${(55 * RATES.tvMountPerInch).toFixed(2)}.`,
        "Brackets and fixings are quoted separately if you need us to supply them.",
      ]}
    />
  );
}

import { ServicePage } from "@/components/estimate/service-page";
import { HANDYMAN_ITEMS } from "@/lib/service-catalog";
import { RATES } from "@/lib/business";

export default function HandymanPage() {
  return (
    <ServicePage
      mark="H"
      title="Handyman work"
      intro="Putting things up, putting things together, around your house. Priced per item or per inch, so you can work out the cost before you call."
      items={HANDYMAN_ITEMS}
      quoteHref="/quote?for=handyman"
      terms={[
        `We charge $${RATES.tvMountPerInch.toFixed(2)} for every inch across the screen. A 55-inch TV costs $${(55 * RATES.tvMountPerInch).toFixed(2)}.`,
        "Need us to bring the bracket and screws? We will price those separately.",
      ]}
    />
  );
}

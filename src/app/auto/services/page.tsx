import { ServicePage } from "@/components/estimate/service-page";
import { SpecList } from "@/components/estimate/spec-list";
import { AUTO_ITEMS, PARTS_DISCLAIMER } from "@/lib/service-catalog";

const DETAIL = [
  "Oil change — full synthetic, new filter, and we check your fluid levels while we are in there.",
  "New battery — we test it first. If your old one is fine, we say so and you keep it.",
  "Brake pads — the price covers one axle, which is two wheels. If the rotors need work too, we price that separately and tell you first.",
  "Check engine light — we read the fault and explain it in plain words. Free if we do the repair.",
  "Broken down — jump start, tire change, or a tow back to the shop, anywhere in Fargo.",
];

export default function AutoServicesPage() {
  return (
    <ServicePage
      mark="A"
      title="What each car job includes"
      intro="The same prices, with a bit more detail on what you get."
      items={AUTO_ITEMS}
      footnote={PARTS_DISCLAIMER}
      quoteHref="/quote?for=auto"
      terms={[PARTS_DISCLAIMER]}
    >
      <SpecList heading="What you get" items={DETAIL} />
    </ServicePage>
  );
}

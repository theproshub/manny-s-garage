import { ServicePage } from "@/components/estimate/service-page";
import { SpecList } from "@/components/estimate/spec-list";
import { AUTO_ITEMS, PARTS_DISCLAIMER } from "@/lib/service-catalog";

const DETAIL = [
  "A-110 Oil change — full synthetic, filter included, fluid levels checked.",
  "A-120 Battery replacement — test first; we only replace it if it has actually failed.",
  "A-210 Brake pads — priced per axle. Rotors quoted separately if they need turning or replacing.",
  "A-310 Diagnostic scan — codes read and explained in plain language. Free if we do the repair.",
  "A-410 Roadside assistance — jump start, tyre change or a tow into the shop, within Fargo.",
];

export default function AutoServicesPage() {
  return (
    <ServicePage
      mark="A"
      title="Automotive — service detail"
      intro="The same published prices, with what each job actually covers."
      items={AUTO_ITEMS}
      footnote={PARTS_DISCLAIMER}
      quoteHref="/quote?for=auto"
      terms={[PARTS_DISCLAIMER]}
    >
      <SpecList heading="What each job covers" items={DETAIL} />
    </ServicePage>
  );
}

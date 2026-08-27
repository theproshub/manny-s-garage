import { ServicePage } from "@/components/estimate/service-page";
import { SpecList } from "@/components/estimate/spec-list";
import { DIY_ITEMS, DIY_INVENTORY } from "@/lib/service-catalog";
import { RATES } from "@/lib/business";

const HOW = [
  "Book the hours you want. Sessions run up to " + RATES.diyMaxHours + " hours.",
  `Bay with lift and tools is $${RATES.diyBayHourly.toFixed(2)} an hour.`,
  `Need a hand? A mechanic is $${RATES.diyMechanicHourly.toFixed(2)} an hour on top, booked by the hour.`,
  "Bring your own parts and fluids, or ask us to order them in.",
  "Waste oil disposal is included.",
];

export default function DiyGarageServicesPage() {
  return (
    <ServicePage
      mark="D"
      title="DIY bay — how it works"
      intro="A professional bay, rented by the hour, for people who would rather do it themselves."
      items={DIY_ITEMS}
      quoteHref="/quote?for=diy"
      terms={[
        "You are responsible for your own work on your own vehicle.",
        "Equipment is returned in the condition it was provided.",
      ]}
    >
      <SpecList heading="How a session works" items={HOW} />
      <SpecList heading="What's in the bay" items={DIY_INVENTORY} />
    </ServicePage>
  );
}

import { ServicePage } from "@/components/estimate/service-page";
import { SpecList } from "@/components/estimate/spec-list";
import { DIY_ITEMS, DIY_INVENTORY } from "@/lib/service-catalog";
import { RATES } from "@/lib/business";

const HOW = [
  "Book the hours you want, up to " + RATES.diyMaxHours + " at a time.",
  `The bay, the lift and the tools are $${RATES.diyBayHourly.toFixed(2)} an hour.`,
  `Stuck? A mechanic is $${RATES.diyMechanicHourly.toFixed(2)} an hour on top.`,
  "Bring your own parts and oil, or ask us to order them in.",
  "We get rid of the old oil for you.",
];

export default function DiyGarageServicesPage() {
  return (
    <ServicePage
      mark="D"
      title="How renting a bay works"
      intro="A proper workshop bay, rented by the hour, for people who would rather do it themselves."
      items={DIY_ITEMS}
      quoteHref="/quote?for=diy"
      terms={[
        "It is your car and your work, so the job is yours.",
        "Leave the tools the way you found them.",
      ]}
    >
      <SpecList heading="How it works" items={HOW} />
      <SpecList heading="What's in the bay" items={DIY_INVENTORY} />
    </ServicePage>
  );
}

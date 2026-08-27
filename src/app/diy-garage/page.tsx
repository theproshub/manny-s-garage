import { ServicePage } from "@/components/estimate/service-page";
import { SpecList } from "@/components/estimate/spec-list";
import { DIY_ITEMS, DIY_INVENTORY } from "@/lib/service-catalog";
import { RATES } from "@/lib/business";

export default function DiyGaragePage() {
  return (
    <ServicePage
      mark="D"
      title="Rent a bay by the hour"
      intro="Your own vehicle, our lift and our tools. Book the bay by the hour and work on it yourself — or add a mechanic when you hit something you would rather not guess at."
      items={DIY_ITEMS}
      quoteHref="/quote?for=diy"
      terms={[
        `Sessions run up to ${RATES.diyMaxHours} hours.`,
        "You are responsible for your own work on your own vehicle.",
        "Equipment is returned in the condition it was provided.",
      ]}
    >
      <SpecList heading="What's in the bay" items={DIY_INVENTORY} />
    </ServicePage>
  );
}

import { ServicePage } from "@/components/estimate/service-page";
import { SpecList } from "@/components/estimate/spec-list";
import { DIY_ITEMS, DIY_INVENTORY } from "@/lib/service-catalog";
import { RATES } from "@/lib/business";

export default function DiyGaragePage() {
  return (
    <ServicePage
      mark="D"
      title="Rent a bay by the hour"
      intro="Your car, our lift, our tools. Book the bay by the hour and do the work yourself — or add a mechanic for the bits you would rather not guess at."
      items={DIY_ITEMS}
      quoteHref="/quote?for=diy"
      terms={[
        `You can book up to ${RATES.diyMaxHours} hours at a time.`,
        "It is your car and your work, so the job is yours.",
        "Leave the tools the way you found them.",
      ]}
    >
      <SpecList heading="What's in the bay" items={DIY_INVENTORY} />
    </ServicePage>
  );
}

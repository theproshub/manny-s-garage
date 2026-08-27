import { ServicePage } from "@/components/estimate/service-page";
import { AUTO_ITEMS, PARTS_DISCLAIMER } from "@/lib/service-catalog";

export default function AutoPage() {
  return (
    <ServicePage
      mark="A"
      title="Automotive repair"
      intro="These are the prices for the jobs we do most. If what you need is not on the list, we look at it and tell you the price before we start."
      items={AUTO_ITEMS}
      footnote={PARTS_DISCLAIMER}
      quoteHref="/quote?for=auto"
      terms={[
        PARTS_DISCLAIMER,
        "Reading the check engine light is free if we do the repair.",
      ]}
    />
  );
}

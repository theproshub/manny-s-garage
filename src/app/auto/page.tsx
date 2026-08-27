import { ServicePage } from "@/components/estimate/service-page";
import { AUTO_ITEMS, PARTS_DISCLAIMER } from "@/lib/service-catalog";

export default function AutoPage() {
  return (
    <ServicePage
      mark="A"
      title="Automotive repair"
      intro="Published prices for the work we do most. Anything not on this list is quoted before we start — you approve the figure first."
      items={AUTO_ITEMS}
      footnote={PARTS_DISCLAIMER}
      quoteHref="/quote?for=auto"
      terms={[
        PARTS_DISCLAIMER,
        "Diagnostic scan is free when we carry out the repair.",
      ]}
    />
  );
}

import { ServicePage } from "@/components/estimate/service-page";
import { IT_ITEMS } from "@/lib/service-catalog";

export default function ItPage() {
  return (
    <ServicePage
      mark="I"
      title="Tech help"
      intro="Wi-Fi that will not reach the back room. A computer that will not start. A website you need built. We look at it first, then tell you the price."
      items={IT_ITEMS}
      quoteHref="/quote"
      terms={[
        "Tech jobs are all different, so we cannot put one price on the page and mean it.",
        "You get the price before we start, not after.",
      ]}
    />
  );
}

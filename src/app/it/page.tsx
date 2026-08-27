import { ServicePage } from "@/components/estimate/service-page";
import { IT_ITEMS } from "@/lib/service-catalog";

export default function ItPage() {
  return (
    <ServicePage
      mark="I"
      title="Tech help"
      intro="Wi-Fi that will not reach the back room, a computer that will not start, a website that needs building. We scope the job first and quote it before any work begins."
      items={IT_ITEMS}
      quoteHref="/quote"
      terms={[
        "I.T. work is quoted per job — the scope varies too much to publish a flat rate honestly.",
        "We tell you what it will cost before we start, not after.",
      ]}
    />
  );
}

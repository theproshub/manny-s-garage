import { ServicePage } from "@/components/estimate/service-page";
import { SpecList } from "@/components/estimate/spec-list";
import { IT_ITEMS } from "@/lib/service-catalog";

const DETAIL = [
  "I-110 Wi-Fi and internet setup — routers, extenders, mesh, and getting signal into the rooms that never had it.",
  "I-210 Computer help and repair — slow machines, failed startups, data recovery, migration to a new device.",
  "I-310 Website and app building — scoped and quoted per project, built and handed over to you.",
  "I-410 Data and reporting — spreadsheets, dashboards and reports for small businesses.",
];

export default function ItServicesPage() {
  return (
    <ServicePage
      mark="I"
      title="Tech help — service detail"
      intro="Every I.T. job is scoped and quoted before work starts. Here is what each one covers."
      items={IT_ITEMS}
      quoteHref="/quote"
      terms={["Quoted per job — the scope varies too much to publish a flat rate honestly."]}
    >
      <SpecList heading="What each job covers" items={DETAIL} />
    </ServicePage>
  );
}

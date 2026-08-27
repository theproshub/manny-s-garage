import { ServicePage } from "@/components/estimate/service-page";
import { SpecList } from "@/components/estimate/spec-list";
import { IT_ITEMS } from "@/lib/service-catalog";

const DETAIL = [
  "Wi-Fi and internet — routers, extenders and mesh, and getting a signal into the rooms that never had one.",
  "Computer fixed — slow machines, ones that will not start, getting your files back, or moving you onto a new device.",
  "A website or app — we agree the price first, build it, and hand it over to you.",
  "Spreadsheets and reports — for small businesses that need their numbers in one place.",
];

export default function ItServicesPage() {
  return (
    <ServicePage
      mark="I"
      title="What each tech job includes"
      intro="We look at every tech job and give you a price before we start. Here is what each one covers."
      items={IT_ITEMS}
      quoteHref="/quote"
      terms={["Tech jobs are all different, so we cannot put one price on the page and mean it."]}
    >
      <SpecList heading="What you get" items={DETAIL} />
    </ServicePage>
  );
}

import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/app/_og/card";

export const alt = "Manny's Garage — auto repair, handyman, DIY bay and I.T. in Fargo, ND, with starting prices";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard();
}

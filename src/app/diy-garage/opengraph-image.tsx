import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/app/_og/card";

export const alt = "DIY bay rental at Manny's Garage, Fargo ND, with hourly rates";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard("DIY Bay");
}

import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/app/_og/card";

export const alt = "Automotive service prices at Manny's Garage, Fargo ND";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard("Automotive prices");
}

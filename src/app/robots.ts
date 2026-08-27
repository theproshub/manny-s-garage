import { BUSINESS } from "@/lib/business";
import { MetadataRoute } from "next";

const BASE_URL = BUSINESS.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

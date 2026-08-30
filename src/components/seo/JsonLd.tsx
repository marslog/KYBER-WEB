import { LOG_MANAGEMENT_FAQ } from "@/data/seoFaq";
import { buildFaqJsonLd } from "@/lib/structuredData";
import {
  MARSLOQ_SOFTWARE_JSON_LD,
  ORGANIZATION_JSON_LD,
  WEBSITE_JSON_LD,
} from "@/lib/siteSeo";
import StructuredData from "@/components/seo/StructuredData";

export default function JsonLd() {
  const payload = [
    ORGANIZATION_JSON_LD,
    WEBSITE_JSON_LD,
    MARSLOQ_SOFTWARE_JSON_LD,
    buildFaqJsonLd(LOG_MANAGEMENT_FAQ),
  ];

  return <StructuredData data={payload} />;
}

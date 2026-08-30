import { ORGANIZATION_JSON_LD, WEBSITE_JSON_LD } from "@/lib/siteSeo";

export default function JsonLd() {
  const payload = [ORGANIZATION_JSON_LD, WEBSITE_JSON_LD];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}

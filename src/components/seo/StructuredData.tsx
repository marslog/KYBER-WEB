type JsonLdPayload = Record<string, unknown> | Record<string, unknown>[];

interface StructuredDataProps {
  data: JsonLdPayload;
}

export default function StructuredData({ data }: StructuredDataProps) {
  const payload = Array.isArray(data) ? data : [data];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload.length === 1 ? payload[0] : payload) }}
    />
  );
}

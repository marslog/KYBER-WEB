export const CONTACT_RECIPIENT = "supawat@kyber-it.com";

export const CONTACT_SUBMISSION_ENABLED = true;

export const CONTACT_TOPICS = [
  "General enquiry",
  "KYBER HCI",
  "MARSLOQ",
  "Quotation",
  "Support",
] as const;

export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
}

export function parseContactFormBody(
  body: unknown,
): { ok: true; data: ContactFormPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const raw = body as Record<string, unknown>;
  const name = trimString(raw.name ?? raw.contactName);
  const email = trimString(raw.email);
  const phone = trimString(raw.phone);
  const topic = trimString(raw.topic ?? raw.productInterest) || "General enquiry";
  const message = trimString(raw.message ?? raw.projectDescription);

  if (!name) return { ok: false, error: "Name is required." };
  if (!email || !isValidEmail(email)) return { ok: false, error: "A valid email is required." };
  if (!message) return { ok: false, error: "Message is required." };
  if (!CONTACT_TOPICS.includes(topic as (typeof CONTACT_TOPICS)[number])) {
    return { ok: false, error: "Please select a valid topic." };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      phone: phone || undefined,
      topic,
      message,
    },
  };
}

function trimString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function formatContactEmail(data: ContactFormPayload): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = `[KYBER] Contact — ${data.topic} (${data.name})`;

  const lines = [
    "New KYBER website contact form submission",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `Topic: ${data.topic}`,
    "",
    "Message:",
    data.message,
  ];

  const text = lines.join("\n");
  const html = `
    <h2>New KYBER contact form submission</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(data.phone || "—")}</td></tr>
      <tr><td><strong>Topic</strong></td><td>${escapeHtml(data.topic)}</td></tr>
    </table>
    <p><strong>Message</strong></p>
    <p style="white-space:pre-wrap;">${escapeHtml(data.message)}</p>
  `;

  return { subject, text, html };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

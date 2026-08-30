export const PROJECT_REGISTRATION_RECIPIENT = "supawat@kyber-it.com";

/** Set to true when SMTP/Resend is configured and ready for production submissions. */
export const PROJECT_REGISTRATION_SUBMISSION_ENABLED = false;

export const PROJECT_REGISTRATION_PAUSED_MESSAGE =
  "Online quotation requests are temporarily unavailable. Use email or call us for a quotation or callback.";

export const QUOTATION_EMAIL_SUBJECT = "KYBER Quotation Request";

export function buildQuotationMailto(bodyLines?: string[]): string {
  const body = (bodyLines ?? [
    "Product interest:",
    "Organization:",
    "Contact name:",
    "Phone:",
    "",
    "Project / requirements:",
    "",
  ]).join("\n");

  const params = new URLSearchParams({
    subject: QUOTATION_EMAIL_SUBJECT,
    body,
  });

  return `mailto:${PROJECT_REGISTRATION_RECIPIENT}?${params.toString()}`;
}

export const PROJECT_INTERESTS = ["KYBER HCI", "MARSLOQ"] as const;

export interface ProjectRegistrationPayload {
  projectName: string;
  organization: string;
  contactName: string;
  email: string;
  phone?: string;
  productInterest: string;
  projectDescription: string;
}

export function parseProjectRegistrationBody(
  body: unknown,
): { ok: true; data: ProjectRegistrationPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const raw = body as Record<string, unknown>;
  const projectName = trimString(raw.projectName);
  const organization = trimString(raw.organization);
  const contactName = trimString(raw.contactName);
  const email = trimString(raw.email);
  const phone = trimString(raw.phone);
  const productInterest = trimString(raw.productInterest);
  const projectDescription = trimString(raw.projectDescription);

  if (!projectName) return { ok: false, error: "Project name is required." };
  if (!organization) return { ok: false, error: "Organization is required." };
  if (!contactName) return { ok: false, error: "Contact name is required." };
  if (!email || !isValidEmail(email)) return { ok: false, error: "A valid email is required." };
  if (!productInterest) return { ok: false, error: "Product interest is required." };
  if (!PROJECT_INTERESTS.includes(productInterest as (typeof PROJECT_INTERESTS)[number])) {
    return { ok: false, error: "Please select a valid product." };
  }
  if (!projectDescription) return { ok: false, error: "Project description is required." };

  return {
    ok: true,
    data: {
      projectName,
      organization,
      contactName,
      email,
      phone: phone || undefined,
      productInterest,
      projectDescription,
    },
  };
}

function trimString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function formatProjectRegistrationEmail(data: ProjectRegistrationPayload): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = `[KYBER] Quotation request — ${data.projectName} (${data.organization})`;

  const lines = [
    "New KYBER quotation request",
    "",
    `Project name: ${data.projectName}`,
    `Organization: ${data.organization}`,
    `Contact name: ${data.contactName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `Product interest: ${data.productInterest}`,
    "",
    "Requirements:",
    data.projectDescription,
  ];

  const text = lines.join("\n");
  const html = `
    <h2>New KYBER quotation request</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td><strong>Project name</strong></td><td>${escapeHtml(data.projectName)}</td></tr>
      <tr><td><strong>Organization</strong></td><td>${escapeHtml(data.organization)}</td></tr>
      <tr><td><strong>Contact name</strong></td><td>${escapeHtml(data.contactName)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(data.phone || "—")}</td></tr>
      <tr><td><strong>Product interest</strong></td><td>${escapeHtml(data.productInterest)}</td></tr>
    </table>
    <p><strong>Requirements</strong></p>
    <p style="white-space:pre-wrap;">${escapeHtml(data.projectDescription)}</p>
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

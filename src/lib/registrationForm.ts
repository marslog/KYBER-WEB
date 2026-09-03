import { CONTACT_RECIPIENT } from "@/lib/contactForm";

export interface PartnerRegistrationPayload {
  partnerName: string;
  partnerContact: string;
  partnerPosition: string;
  partnerMobile: string;
  partnerEmail: string;
  endUserName: string;
  endUserAddress: string;
  endUserContact: string;
  endUserPosition: string;
  endUserMobile: string;
  endUserEmail: string;
  notes?: string;
}

function trimString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function parseRegistrationBody(
  body: unknown,
): { ok: true; data: PartnerRegistrationPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const raw = body as Record<string, unknown>;

  const partnerName = trimString(raw.partnerName);
  const partnerContact = trimString(raw.partnerContact);
  const partnerPosition = trimString(raw.partnerPosition);
  const partnerMobile = trimString(raw.partnerMobile);
  const partnerEmail = trimString(raw.partnerEmail);
  const endUserName = trimString(raw.endUserName);
  const endUserAddress = trimString(raw.endUserAddress);
  const endUserContact = trimString(raw.endUserContact);
  const endUserPosition = trimString(raw.endUserPosition);
  const endUserMobile = trimString(raw.endUserMobile);
  const endUserEmail = trimString(raw.endUserEmail);
  const notes = trimString(raw.notes) || undefined;

  if (!partnerName) return { ok: false, error: "Partner Name is required." };
  if (!partnerContact) return { ok: false, error: "Partner Contact is required." };
  if (!partnerPosition) return { ok: false, error: "Partner Position is required." };
  if (!partnerMobile) return { ok: false, error: "Partner Mobile Number is required." };
  if (!partnerEmail || !isValidEmail(partnerEmail))
    return { ok: false, error: "A valid Partner Email is required." };
  if (!endUserName) return { ok: false, error: "End-User Name is required." };
  if (!endUserAddress) return { ok: false, error: "End-User Address is required." };
  if (!endUserContact) return { ok: false, error: "End-User Contact Name is required." };
  if (!endUserPosition) return { ok: false, error: "End-User Position is required." };
  if (!endUserMobile) return { ok: false, error: "End-User Mobile Number is required." };
  if (!endUserEmail || !isValidEmail(endUserEmail))
    return { ok: false, error: "A valid End-User Email is required." };

  return {
    ok: true,
    data: {
      partnerName,
      partnerContact,
      partnerPosition,
      partnerMobile,
      partnerEmail,
      endUserName,
      endUserAddress,
      endUserContact,
      endUserPosition,
      endUserMobile,
      endUserEmail,
      notes,
    },
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function formatRegistrationEmail(data: PartnerRegistrationPayload): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = `[KYBER] Partner Registration — ${data.partnerName} / ${data.endUserName}`;

  const lines = [
    "New KYBER Partner / End-User Registration",
    "",
    "═══ PARTNER INFORMATION ═══",
    `Partner Name:    ${data.partnerName}`,
    `Contact Person:  ${data.partnerContact}`,
    `Position:        ${data.partnerPosition}`,
    `Mobile:          ${data.partnerMobile}`,
    `Email:           ${data.partnerEmail}`,
    "",
    "═══ END-USER INFORMATION ═══",
    `Company Name:    ${data.endUserName}`,
    `Address:         ${data.endUserAddress}`,
    `Contact Person:  ${data.endUserContact}`,
    `Position:        ${data.endUserPosition}`,
    `Mobile:          ${data.endUserMobile}`,
    `Email:           ${data.endUserEmail}`,
  ];

  if (data.notes) {
    lines.push("", "Notes:", data.notes);
  }

  const text = lines.join("\n");

  const html = `
    <h2 style="color:#071b33;font-family:sans-serif;">New Partner / End-User Registration</h2>

    <h3 style="color:#0057B8;font-family:sans-serif;border-bottom:2px solid #0057B8;padding-bottom:4px;">Partner Information</h3>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;width:100%;max-width:600px;">
      <tr style="background:#f4f6f9;"><td style="width:140px;"><strong>Partner Name</strong></td><td>${escapeHtml(data.partnerName)}</td></tr>
      <tr><td><strong>Contact Person</strong></td><td>${escapeHtml(data.partnerContact)}</td></tr>
      <tr style="background:#f4f6f9;"><td><strong>Position</strong></td><td>${escapeHtml(data.partnerPosition)}</td></tr>
      <tr><td><strong>Mobile</strong></td><td>${escapeHtml(data.partnerMobile)}</td></tr>
      <tr style="background:#f4f6f9;"><td><strong>Email</strong></td><td><a href="mailto:${escapeHtml(data.partnerEmail)}">${escapeHtml(data.partnerEmail)}</a></td></tr>
    </table>

    <h3 style="color:#D4781A;font-family:sans-serif;border-bottom:2px solid #D4781A;padding-bottom:4px;margin-top:24px;">End-User Information</h3>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;width:100%;max-width:600px;">
      <tr style="background:#f4f6f9;"><td style="width:140px;"><strong>Company Name</strong></td><td>${escapeHtml(data.endUserName)}</td></tr>
      <tr><td><strong>Address</strong></td><td>${escapeHtml(data.endUserAddress)}</td></tr>
      <tr style="background:#f4f6f9;"><td><strong>Contact Person</strong></td><td>${escapeHtml(data.endUserContact)}</td></tr>
      <tr><td><strong>Position</strong></td><td>${escapeHtml(data.endUserPosition)}</td></tr>
      <tr style="background:#f4f6f9;"><td><strong>Mobile</strong></td><td>${escapeHtml(data.endUserMobile)}</td></tr>
      <tr><td><strong>Email</strong></td><td><a href="mailto:${escapeHtml(data.endUserEmail)}">${escapeHtml(data.endUserEmail)}</a></td></tr>
    </table>

    ${data.notes ? `<p style="margin-top:16px;font-family:sans-serif;"><strong>Notes</strong></p><p style="white-space:pre-wrap;font-family:sans-serif;">${escapeHtml(data.notes)}</p>` : ""}
  `;

  return { subject, text, html };
}

export function toContactFormPayload(data: PartnerRegistrationPayload) {
  return {
    name: data.partnerContact,
    email: data.partnerEmail,
    phone: data.partnerMobile,
    topic: "General enquiry" as const,
    message: [
      `Partner: ${data.partnerName} (${data.partnerPosition})`,
      `End-User: ${data.endUserName}`,
      `End-User Contact: ${data.endUserContact} (${data.endUserPosition})`,
      `End-User Mobile: ${data.endUserMobile}`,
      `End-User Email: ${data.endUserEmail}`,
      `Address: ${data.endUserAddress}`,
      data.notes ? `\nNotes:\n${data.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

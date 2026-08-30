/** @deprecated Use @/lib/contactForm instead */
export {
  CONTACT_RECIPIENT as PROJECT_REGISTRATION_RECIPIENT,
  CONTACT_SUBMISSION_ENABLED as PROJECT_REGISTRATION_SUBMISSION_ENABLED,
  CONTACT_TOPICS as PROJECT_INTERESTS,
  type ContactFormPayload as ProjectRegistrationPayload,
  parseContactFormBody as parseProjectRegistrationBody,
  formatContactEmail as formatProjectRegistrationEmail,
} from "@/lib/contactForm";

export const PROJECT_REGISTRATION_PAUSED_MESSAGE =
  "Online contact form is temporarily unavailable. Please email supawat@kyber-it.com directly.";

export const QUOTATION_EMAIL_SUBJECT = "KYBER Contact";

export function buildQuotationMailto(bodyLines?: string[]): string {
  const body = (bodyLines ?? ["Name:", "Email:", "Phone:", "", "Message:", ""]).join("\n");
  const params = new URLSearchParams({ subject: QUOTATION_EMAIL_SUBJECT, body });
  return `mailto:supawat@kyber-it.com?${params.toString()}`;
}

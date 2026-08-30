import { Resend } from "resend";
import nodemailer from "nodemailer";
import {
  CONTACT_RECIPIENT,
  type ContactFormPayload,
  formatContactEmail,
} from "@/lib/contactForm";

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  };
}

function getFromAddress(): string {
  return (
    process.env.EMAIL_FROM ||
    process.env.SMTP_FROM ||
    `KYBER Web <${process.env.SMTP_USER || "noreply@kyber-it.com"}>`
  );
}

function getRecipient(): string {
  return (
    process.env.CONTACT_TO ||
    process.env.PROJECT_REGISTRATION_TO ||
    CONTACT_RECIPIENT
  );
}

async function sendViaResend(
  data: ContactFormPayload,
  subject: string,
  html: string,
  text: string,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: getFromAddress(),
    to: [getRecipient()],
    replyTo: data.email,
    subject,
    html,
    text,
  });

  if (error) {
    throw new Error(error.message);
  }
}

async function sendViaSmtp(
  data: ContactFormPayload,
  subject: string,
  html: string,
  text: string,
): Promise<void> {
  const smtp = getSmtpConfig();
  if (!smtp) {
    throw new Error("SMTP is not configured");
  }

  const transporter = nodemailer.createTransport(smtp);
  await transporter.sendMail({
    from: getFromAddress(),
    to: getRecipient(),
    replyTo: data.email,
    subject,
    text,
    html,
  });
}

export async function sendContactEmail(
  data: ContactFormPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { subject, text, html } = formatContactEmail(data);

  const hasResend = Boolean(process.env.RESEND_API_KEY);
  const hasSmtp = Boolean(getSmtpConfig());

  if (!hasResend && !hasSmtp) {
    return {
      ok: false,
      error:
        "Email is not configured. Set RESEND_API_KEY on Vercel, or SMTP_HOST, SMTP_USER, and SMTP_PASS for Google Workspace.",
    };
  }

  try {
    if (hasResend) {
      await sendViaResend(data, subject, html, text);
    } else {
      await sendViaSmtp(data, subject, html, text);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown email error";
    return {
      ok: false,
      error: `Failed to send email: ${message}`,
    };
  }

  return { ok: true };
}

/** @deprecated Use sendContactEmail */
export async function sendProjectRegistrationEmail(
  data: ContactFormPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  return sendContactEmail(data);
}

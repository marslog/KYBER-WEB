import nodemailer from "nodemailer";
import {
  PROJECT_REGISTRATION_RECIPIENT,
  type ProjectRegistrationPayload,
  formatProjectRegistrationEmail,
} from "@/lib/projectRegistration";

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

export async function sendProjectRegistrationEmail(
  data: ProjectRegistrationPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const smtp = getSmtpConfig();
  if (!smtp) {
    return {
      ok: false,
      error:
        "Email is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables.",
    };
  }

  const to = process.env.PROJECT_REGISTRATION_TO || PROJECT_REGISTRATION_RECIPIENT;
  const from =
    process.env.SMTP_FROM || `KYBER Web <${process.env.SMTP_USER || "noreply@kyber-it.com"}>`;
  const { subject, text, html } = formatProjectRegistrationEmail(data);

  const transporter = nodemailer.createTransport(smtp);

  await transporter.sendMail({
    from,
    to,
    replyTo: data.email,
    subject,
    text,
    html,
  });

  return { ok: true };
}

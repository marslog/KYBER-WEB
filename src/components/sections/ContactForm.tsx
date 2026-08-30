"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import Link from "next/link";
import { CONTACT_RECIPIENT, CONTACT_TOPICS } from "@/lib/contactForm";

type FormVariant = "full" | "compact";

interface ContactFormProps {
  variant?: FormVariant;
  id?: string;
}

export default function ContactForm({ variant = "full", id = "contact-form" }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isCompact = variant === "compact";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          topic: formData.get("topic"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(payload.error || "Submission failed. Please try again.");
        return;
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        className={
          isCompact
            ? "text-center py-8 space-y-2"
            : "rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-8 text-center"
        }
      >
        <div
          className={
            isCompact
              ? "inline-flex"
              : "inline-flex items-center justify-center rounded-full bg-[var(--brand-soft)] p-3 mb-4"
          }
        >
          <CheckCircle2
            className={isCompact ? "w-10 h-10 mx-auto text-[var(--brand)]" : "w-6 h-6"}
            style={isCompact ? undefined : { color: "var(--brand)" }}
          />
        </div>
        <h3 className={`font-semibold ${isCompact ? "" : "text-lg mb-2"}`}>Message sent</h3>
        <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto">
          Thank you — our team will reply to your email shortly. For urgent enquiries, call us or
          email{" "}
          <a
            href={`mailto:${CONTACT_RECIPIENT}`}
            className="text-[var(--brand)] hover:underline"
          >
            {CONTACT_RECIPIENT}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className={
        isCompact
          ? "space-y-4"
          : "rounded-xl border border-[var(--border)] bg-white p-6 sm:p-8 space-y-5"
      }
    >
      {!isCompact && (
        <div>
          <h3 className="text-lg font-semibold">Send us a message</h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Questions about KYBER HCI or MARSLOQ? Fill in the form and we&apos;ll get back to you.
            Prefer a call?{" "}
            <Link href="/contact#request-callback" className="text-[var(--brand)] hover:underline">
              Request a callback
            </Link>
            .
          </p>
        </div>
      )}

      {isCompact && (
        <>
          <h3 className="text-lg font-semibold mb-1">Contact us</h3>
          <p className="text-sm text-[var(--text-muted)] mb-2">
            Send a quick message or{" "}
            <Link href="/contact#request-callback" className="text-[var(--brand)] hover:underline">
              request a callback
            </Link>
            .
          </p>
        </>
      )}

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0 pointer-events-none"
      />

      <div className={isCompact ? "space-y-4" : "grid sm:grid-cols-2 gap-5"}>
        <Field label="Your name" htmlFor={`${id}-name`} fullWidth={isCompact}>
          <input
            id={`${id}-name`}
            name="name"
            required
            autoComplete="name"
            className="kyber-input"
            placeholder="Jane Doe"
          />
        </Field>
        <Field label="Email" htmlFor={`${id}-email`} fullWidth={isCompact}>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className="kyber-input"
            placeholder="jane@company.com"
          />
        </Field>
        <Field label="Phone (optional)" htmlFor={`${id}-phone`} fullWidth={isCompact}>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className="kyber-input"
            placeholder="+66 ..."
          />
        </Field>
        <Field label="Topic" htmlFor={`${id}-topic`} fullWidth={isCompact}>
          <select
            id={`${id}-topic`}
            name="topic"
            className="kyber-input"
            required
            defaultValue="General enquiry"
          >
            {CONTACT_TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message" htmlFor={`${id}-message`} fullWidth>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={isCompact ? 3 : 5}
          required
          className="kyber-input resize-y"
          placeholder="How can we help? HCI, log management, quotation, support…"
        />
      </Field>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}{" "}
          <a href={`mailto:${CONTACT_RECIPIENT}`} className="underline">
            Email {CONTACT_RECIPIENT}
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="kyber-btn-primary gap-2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-4 h-4" />
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
  fullWidth = false,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className={fullWidth ? "block" : "block sm:col-span-1"}>
      <span className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">{label}</span>
      {children}
    </label>
  );
}

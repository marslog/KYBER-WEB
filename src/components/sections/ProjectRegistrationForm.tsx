"use client";

import { useState } from "react";
import { CheckCircle2, Mail, Send } from "lucide-react";
import Link from "next/link";
import { COMPANY_INFO } from "@/data/platformData";
import {
  PROJECT_INTERESTS,
  PROJECT_REGISTRATION_PAUSED_MESSAGE,
  PROJECT_REGISTRATION_SUBMISSION_ENABLED,
  buildQuotationMailto,
} from "@/lib/projectRegistration";

type FormVariant = "full" | "compact";

interface ProjectRegistrationFormProps {
  variant?: FormVariant;
  id?: string;
}

export default function ProjectRegistrationForm({
  variant = "full",
  id = "get-a-quote",
}: ProjectRegistrationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isCompact = variant === "compact";
  const submissionEnabled = PROJECT_REGISTRATION_SUBMISSION_ENABLED;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!submissionEnabled) return;

    setSubmitting(true);
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/project-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: formData.get("projectName"),
          organization: formData.get("organization"),
          contactName: formData.get("contactName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          productInterest: formData.get("productInterest"),
          projectDescription: formData.get("projectDescription"),
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

  function handleEmailQuotation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const mailto = buildQuotationMailto([
      `Product interest: ${String(formData.get("productInterest") || "")}`,
      `Organization: ${String(formData.get("organization") || "")}`,
      `Contact name: ${String(formData.get("contactName") || "")}`,
      `Email: ${String(formData.get("email") || "")}`,
      `Phone: ${String(formData.get("phone") || "")}`,
      `Project / use case: ${String(formData.get("projectName") || "")}`,
      "",
      "Requirements:",
      String(formData.get("projectDescription") || ""),
    ]);

    window.location.href = mailto;
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
        <h3 className={`font-semibold ${isCompact ? "" : "text-lg mb-2"}`}>
          Quotation request received
        </h3>
        <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto">
          Our team will prepare a tailored quotation and respond shortly. For urgent enquiries,
          call us or email{" "}
          <a
            href={`mailto:${COMPANY_INFO.supportEmail}`}
            className="text-[var(--brand)] hover:underline"
          >
            {COMPANY_INFO.supportEmail}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={submissionEnabled ? handleSubmit : handleEmailQuotation}
      className={
        isCompact
          ? "space-y-4"
          : "rounded-xl border border-[var(--border)] bg-white p-6 sm:p-8 space-y-5"
      }
    >
      {!isCompact && (
        <div>
          <h3 className="text-lg font-semibold">Request a quotation</h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Tell us about your HCI or MARSLOQ requirements and we&apos;ll send a tailored
            quotation. Prefer a call?{" "}
            <Link href="/contact#request-callback" className="text-[var(--brand)] hover:underline">
              Request a callback
            </Link>
            .
          </p>
        </div>
      )}

      {isCompact && (
        <>
          <h3 className="text-lg font-semibold mb-1">Request a quotation</h3>
          <p className="text-sm text-[var(--text-muted)] mb-2">
            Share your scope for a tailored quote, or{" "}
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
        <Field label="Project / use case" htmlFor={`${id}-projectName`} fullWidth={isCompact}>
          <input
            id={`${id}-projectName`}
            name="projectName"
            required
            className="kyber-input"
            placeholder="e.g. Hospital HCI cluster + syslog"
          />
        </Field>
        <Field label="Organization" htmlFor={`${id}-organization`} fullWidth={isCompact}>
          <input
            id={`${id}-organization`}
            name="organization"
            required
            className="kyber-input"
            placeholder="Company or agency name"
          />
        </Field>
        <Field label="Contact name" htmlFor={`${id}-contactName`} fullWidth={isCompact}>
          <input
            id={`${id}-contactName`}
            name="contactName"
            required
            className="kyber-input"
            placeholder="Jane Doe"
          />
        </Field>
        <Field label="Work email" htmlFor={`${id}-email`} fullWidth={isCompact}>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            className="kyber-input"
            placeholder="jane@company.com"
          />
        </Field>
        <Field label="Phone (for callback)" htmlFor={`${id}-phone`} fullWidth={isCompact}>
          <input
            id={`${id}-phone`}
            name="phone"
            className="kyber-input"
            placeholder="+66 ..."
          />
        </Field>
        <Field label="Product interest" htmlFor={`${id}-productInterest`} fullWidth={isCompact}>
          <select
            id={`${id}-productInterest`}
            name="productInterest"
            className="kyber-input"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Select a product
            </option>
            {PROJECT_INTERESTS.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Requirements for quotation" htmlFor={`${id}-projectDescription`} fullWidth>
        <textarea
          id={`${id}-projectDescription`}
          name="projectDescription"
          rows={isCompact ? 3 : 4}
          required
          className="kyber-input resize-y"
          placeholder="Scope, node count, syslog sources, timeline, compliance needs…"
        />
      </Field>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {!submissionEnabled && (
        <p className="text-sm text-[var(--text-secondary)] rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] px-4 py-3">
          {PROJECT_REGISTRATION_PAUSED_MESSAGE}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="kyber-btn-primary gap-2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? (
          "Submitting…"
        ) : submissionEnabled ? (
          <>
            <Send className="w-4 h-4" />
            Submit quotation request
          </>
        ) : (
          <>
            <Mail className="w-4 h-4" />
            Email quotation request
          </>
        )}
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

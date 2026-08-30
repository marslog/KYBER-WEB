"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { COMPANY_INFO } from "@/data/platformData";
import { PROJECT_INTERESTS } from "@/lib/projectRegistration";

type FormVariant = "full" | "compact";

interface ProjectRegistrationFormProps {
  variant?: FormVariant;
  id?: string;
}

export default function ProjectRegistrationForm({
  variant = "full",
  id = "project-registration",
}: ProjectRegistrationFormProps) {
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
        <h3 className={`font-semibold ${isCompact ? "" : "text-lg mb-2"}`}>
          Registration received
        </h3>
        <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto">
          Our team will review your project and respond shortly. For urgent enquiries, email{" "}
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
      onSubmit={handleSubmit}
      className={
        isCompact
          ? "space-y-4"
          : "rounded-xl border border-[var(--border)] bg-white p-6 sm:p-8 space-y-5"
      }
    >
      {!isCompact && (
        <div>
          <h3 className="text-lg font-semibold">Project registration</h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Share your project scope and we&apos;ll connect you with a KYBER architect.
          </p>
        </div>
      )}

      {isCompact && (
        <>
          <h3 className="text-lg font-semibold mb-1">Register your project</h3>
          <p className="text-sm text-[var(--text-muted)] mb-2">
            Tell us about your infrastructure goals.
          </p>
        </>
      )}

      <div className={isCompact ? "space-y-4" : "grid sm:grid-cols-2 gap-5"}>
        <Field label="Project name" htmlFor={`${id}-projectName`} fullWidth={isCompact}>
          <input
            id={`${id}-projectName`}
            name="projectName"
            required
            className="kyber-input"
            placeholder="e.g. Regional hospital HCI rollout"
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
        <Field label="Phone" htmlFor={`${id}-phone`} fullWidth={isCompact}>
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

      <Field label="Project description" htmlFor={`${id}-projectDescription`} fullWidth>
        <textarea
          id={`${id}-projectDescription`}
          name="projectDescription"
          rows={isCompact ? 3 : 4}
          required
          className="kyber-input resize-y"
          placeholder="Scope, timeline, workload count, compliance needs, or other requirements…"
        />
      </Field>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={submitting} className="kyber-btn-primary gap-2 w-full sm:w-auto">
        {submitting ? "Submitting…" : (
          <>
            <Send className="w-4 h-4" />
            Submit registration
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

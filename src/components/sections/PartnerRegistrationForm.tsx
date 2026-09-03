"use client";

import { useState } from "react";
import { CheckCircle2, Send, Building2, Users } from "lucide-react";
import { CONTACT_RECIPIENT } from "@/lib/contactForm";

export default function PartnerRegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = event.currentTarget;
    const fd = new FormData(form);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partnerName: fd.get("partnerName"),
          partnerContact: fd.get("partnerContact"),
          partnerPosition: fd.get("partnerPosition"),
          partnerMobile: fd.get("partnerMobile"),
          partnerEmail: fd.get("partnerEmail"),
          endUserName: fd.get("endUserName"),
          endUserAddress: fd.get("endUserAddress"),
          endUserContact: fd.get("endUserContact"),
          endUserPosition: fd.get("endUserPosition"),
          endUserMobile: fd.get("endUserMobile"),
          endUserEmail: fd.get("endUserEmail"),
          notes: fd.get("notes"),
          website: fd.get("website"),
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
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-10 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center justify-center rounded-full bg-[var(--brand-soft)] p-3 mb-4">
          <CheckCircle2 className="w-6 h-6" style={{ color: "var(--brand)" }} />
        </div>
        <h3 className="text-lg font-semibold mb-2">Registration submitted</h3>
        <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto">
          Thank you — our team will review your registration and contact you shortly.
          For urgent enquiries, email{" "}
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
      onSubmit={handleSubmit}
      className="space-y-8 max-w-3xl mx-auto"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0 pointer-events-none"
      />

      {/* Partner Information */}
      <fieldset className="rounded-xl border border-[var(--border)] bg-white p-6 sm:p-8 space-y-5">
        <legend className="flex items-center gap-2 text-base font-semibold text-[var(--text)] -ml-1 px-2">
          <Building2 className="w-4.5 h-4.5 text-[var(--brand)]" strokeWidth={1.75} />
          Partner Information
        </legend>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Partner Name" htmlFor="reg-partnerName">
            <input
              id="reg-partnerName"
              name="partnerName"
              required
              className="kyber-input"
              placeholder="e.g. Secure Serve Co., Ltd."
            />
          </Field>
          <Field label="Contact Person" htmlFor="reg-partnerContact">
            <input
              id="reg-partnerContact"
              name="partnerContact"
              required
              className="kyber-input"
              placeholder="e.g. Ms. Nudchanart Suetrong"
            />
          </Field>
          <Field label="Position" htmlFor="reg-partnerPosition">
            <input
              id="reg-partnerPosition"
              name="partnerPosition"
              required
              className="kyber-input"
              placeholder="e.g. Sales Manager"
            />
          </Field>
          <Field label="Mobile Number" htmlFor="reg-partnerMobile">
            <input
              id="reg-partnerMobile"
              name="partnerMobile"
              type="tel"
              required
              className="kyber-input"
              placeholder="e.g. 061-541-6498"
            />
          </Field>
          <Field label="Email" htmlFor="reg-partnerEmail" fullWidth>
            <input
              id="reg-partnerEmail"
              name="partnerEmail"
              type="email"
              required
              className="kyber-input"
              placeholder="e.g. nudchanart@secureserve.co.th"
            />
          </Field>
        </div>
      </fieldset>

      {/* End-User Information */}
      <fieldset className="rounded-xl border border-[var(--border)] bg-white p-6 sm:p-8 space-y-5">
        <legend className="flex items-center gap-2 text-base font-semibold text-[var(--text)] -ml-1 px-2">
          <Users className="w-4.5 h-4.5 text-[var(--marsloq-accent)]" strokeWidth={1.75} />
          End-User Information
        </legend>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Company / Organization Name" htmlFor="reg-endUserName" fullWidth>
            <input
              id="reg-endUserName"
              name="endUserName"
              required
              className="kyber-input"
              placeholder="e.g. ASIAN ALLIANCE INTERNATIONAL CO., LTD."
            />
          </Field>
          <Field label="Address" htmlFor="reg-endUserAddress" fullWidth>
            <textarea
              id="reg-endUserAddress"
              name="endUserAddress"
              required
              rows={2}
              className="kyber-input resize-y"
              placeholder="e.g. 55/2 Moo 2, Rama 2 Road, Bang Krachao, Mueang Samut Sakhon, Samut Sakhon 74000"
            />
          </Field>
          <Field label="Contact Person" htmlFor="reg-endUserContact">
            <input
              id="reg-endUserContact"
              name="endUserContact"
              required
              className="kyber-input"
              placeholder="e.g. Mr. Kiatipong"
            />
          </Field>
          <Field label="Position" htmlFor="reg-endUserPosition">
            <input
              id="reg-endUserPosition"
              name="endUserPosition"
              required
              className="kyber-input"
              placeholder="e.g. IT"
            />
          </Field>
          <Field label="Mobile Number" htmlFor="reg-endUserMobile">
            <input
              id="reg-endUserMobile"
              name="endUserMobile"
              type="tel"
              required
              className="kyber-input"
              placeholder="e.g. 092-317-9393"
            />
          </Field>
          <Field label="Email" htmlFor="reg-endUserEmail">
            <input
              id="reg-endUserEmail"
              name="endUserEmail"
              type="email"
              required
              className="kyber-input"
              placeholder="e.g. kiatipong.n@asianalliance.co.th"
            />
          </Field>
        </div>
      </fieldset>

      {/* Notes */}
      <fieldset className="rounded-xl border border-[var(--border)] bg-white p-6 sm:p-8 space-y-5">
        <legend className="text-base font-semibold text-[var(--text)] -ml-1 px-2">
          Additional Notes (optional)
        </legend>
        <Field label="Notes" htmlFor="reg-notes" fullWidth>
          <textarea
            id="reg-notes"
            name="notes"
            rows={3}
            className="kyber-input resize-y"
            placeholder="Any additional information about the project..."
          />
        </Field>
      </fieldset>

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
        {submitting ? "Submitting…" : "Submit Registration"}
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
    <label htmlFor={htmlFor} className={fullWidth ? "block sm:col-span-2" : "block"}>
      <span className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">{label}</span>
      {children}
    </label>
  );
}

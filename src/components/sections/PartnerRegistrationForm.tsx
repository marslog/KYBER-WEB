"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Send, Building2, Users } from "lucide-react";
import { CONTACT_RECIPIENT } from "@/lib/contactForm";
import {
  EMPTY_PARTNER_PROFILE,
  readPartnerProfile,
  type PartnerProfile,
} from "@/lib/partnerProfile";

const PRODUCT_OPTIONS = [
  { value: "kyber-hci", label: "KYBER HCI" },
  { value: "marsloq", label: "MARSLOQ" },
] as const;

export default function PartnerRegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [partner, setPartner] = useState<PartnerProfile>(EMPTY_PARTNER_PROFILE);
  const [profileReady, setProfileReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        const response = await fetch("/api/portal-login", {
          credentials: "include",
          cache: "no-store",
        });
        const data = await response.json();
        if (cancelled) return;
        setPartner(readPartnerProfile(data));
      } catch {
        if (!cancelled) setPartner(EMPTY_PARTNER_PROFILE);
      } finally {
        if (!cancelled) setProfileReady(true);
      }
    }

    void loadProfile();
    return () => {
      cancelled = true;
    };
  }, []);

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
          partnerName: partner.partnerName,
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
          products: fd.getAll("products"),
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
          Partner Information (ข้อมูลพาร์ทเนอร์)
        </legend>

        <p className="text-xs text-[var(--text-secondary)]">
          Partner name is loaded from your user account. Other details can be entered below.
        </p>
        {!profileReady ? (
          <p className="text-sm text-[var(--text-muted)]">Loading account details…</p>
        ) : !partner.partnerName ? (
          <p className="text-sm text-amber-700">
            Partner name is missing on this account. Please ask an administrator to update it.
          </p>
        ) : null}

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Partner Name (ชื่อพาร์ทเนอร์)" htmlFor="reg-partnerName">
            <input
              id="reg-partnerName"
              name="partnerName"
              value={partner.partnerName}
              readOnly
              className="kyber-input bg-[var(--bg-subtle)] text-[var(--text-secondary)] cursor-not-allowed"
            />
          </Field>
          <Field label="Contact Person (ชื่อผู้ติดต่อ)" htmlFor="reg-partnerContact">
            <input
              id="reg-partnerContact"
              name="partnerContact"
              required
              className="kyber-input"
            />
          </Field>
          <Field label="Position (ตำแหน่ง)" htmlFor="reg-partnerPosition">
            <input
              id="reg-partnerPosition"
              name="partnerPosition"
              required
              className="kyber-input"
            />
          </Field>
          <Field label="Mobile Number (เบอร์มือถือ)" htmlFor="reg-partnerMobile">
            <input
              id="reg-partnerMobile"
              name="partnerMobile"
              type="tel"
              required
              className="kyber-input"
            />
          </Field>
          <Field label="Email (อีเมล)" htmlFor="reg-partnerEmail" fullWidth>
            <input
              id="reg-partnerEmail"
              name="partnerEmail"
              type="email"
              required
              className="kyber-input"
            />
          </Field>
        </div>
      </fieldset>

      {/* End-User Information */}
      <fieldset className="rounded-xl border border-[var(--border)] bg-white p-6 sm:p-8 space-y-5">
        <legend className="flex items-center gap-2 text-base font-semibold text-[var(--text)] -ml-1 px-2">
          <Users className="w-4.5 h-4.5 text-[var(--marsloq-accent)]" strokeWidth={1.75} />
          End-User Information (ข้อมูลเอนด์ยูสเซอร์)
        </legend>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Company / Organization Name (ชื่อบริษัท / องค์กร)" htmlFor="reg-endUserName" fullWidth>
            <input
              id="reg-endUserName"
              name="endUserName"
              required
              className="kyber-input"
            />
          </Field>
          <Field label="Address (ที่อยู่)" htmlFor="reg-endUserAddress" fullWidth>
            <textarea
              id="reg-endUserAddress"
              name="endUserAddress"
              required
              rows={2}
              className="kyber-input resize-y"
            />
          </Field>
          <Field label="Contact Person (ชื่อผู้ติดต่อ)" htmlFor="reg-endUserContact">
            <input
              id="reg-endUserContact"
              name="endUserContact"
              required
              className="kyber-input"
            />
          </Field>
          <Field label="Position (ตำแหน่ง)" htmlFor="reg-endUserPosition">
            <input
              id="reg-endUserPosition"
              name="endUserPosition"
              required
              className="kyber-input"
            />
          </Field>
          <Field label="Mobile Number (เบอร์มือถือ)" htmlFor="reg-endUserMobile">
            <input
              id="reg-endUserMobile"
              name="endUserMobile"
              type="tel"
              required
              className="kyber-input"
            />
          </Field>
          <Field label="Email (อีเมล)" htmlFor="reg-endUserEmail">
            <input
              id="reg-endUserEmail"
              name="endUserEmail"
              type="email"
              required
              className="kyber-input"
            />
          </Field>
        </div>
      </fieldset>

      {/* Product Interest */}
      <fieldset className="rounded-xl border border-[var(--border)] bg-white p-6 sm:p-8 space-y-5">
        <legend className="flex items-center gap-2 text-base font-semibold text-[var(--text)] -ml-1 px-2">
          Product Interest (สินค้าที่สนใจ)
        </legend>

        <Field label="Product (สินค้า)" htmlFor="reg-products" fullWidth>
          <select
            id="reg-products"
            name="products"
            required
            defaultValue=""
            className="kyber-input"
          >
            <option value="" disabled>
              Select a product (เลือกสินค้า)
            </option>
            {PRODUCT_OPTIONS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </Field>
      </fieldset>

      {/* Notes */}
      <fieldset className="rounded-xl border border-[var(--border)] bg-white p-6 sm:p-8 space-y-5">
        <legend className="text-base font-semibold text-[var(--text)] -ml-1 px-2">
          Additional Notes (หมายเหตุเพิ่มเติม)
        </legend>
        <Field label="Notes (หมายเหตุ)" htmlFor="reg-notes" fullWidth>
          <textarea
            id="reg-notes"
            name="notes"
            rows={3}
            className="kyber-input resize-y"
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
        disabled={submitting || !partner.partnerName}
        className="kyber-btn-primary gap-2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-4 h-4" />
        {submitting ? "Submitting… (กำลังส่ง)" : "Register (ลงทะเบียน)"}
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

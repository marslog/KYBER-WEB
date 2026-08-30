"use client";

import { FormEvent, useState } from "react";
import { Lock } from "lucide-react";
import { PORTAL_LOGIN_SECTION } from "@/data/portalAccess";

type PortalLoginFormProps = {
  onSuccess?: () => void;
  className?: string;
};

export default function PortalLoginForm({ onSuccess, className = "" }: PortalLoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/portal-login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok) {
        setError(data.error || "Login failed. Please try again.");
        return;
      }

      if (onSuccess) {
        onSuccess();
      } else {
        window.location.reload();
      }
    } catch {
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div>
        <label htmlFor="portal-username" className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
          Username
        </label>
        <input
          id="portal-username"
          name="username"
          type="text"
          autoComplete="username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-ring)]"
          placeholder="Enter admin username"
        />
      </div>

      <div>
        <label htmlFor="portal-password" className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
          Password
        </label>
        <input
          id="portal-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-ring)]"
          placeholder="Enter password"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="kyber-btn-primary w-full justify-center gap-2 disabled:opacity-60"
      >
        <Lock className="w-4 h-4" aria-hidden="true" />
        {submitting ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
        {PORTAL_LOGIN_SECTION.subtitle}
      </p>
    </form>
  );
}

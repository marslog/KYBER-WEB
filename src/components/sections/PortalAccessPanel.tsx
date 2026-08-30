"use client";

import PortalLoginForm from "@/components/layout/PortalLoginForm";
import { PORTAL_LOGIN_SECTION } from "@/data/portalAccess";

export default function PortalAccessPanel() {
  return (
    <section className="rounded-xl border border-[var(--border)] bg-white p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand)] mb-2">
        {PORTAL_LOGIN_SECTION.title}
      </p>
      <h2 className="text-xl font-semibold mb-2">Access the Knowledge Base menu</h2>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
        Sign in with your administrator credentials. After a successful login, the page refreshes
        and the Knowledge Base menu appears in the navigation bar.
      </p>

      <div className="max-w-md">
        <PortalLoginForm />
      </div>
    </section>
  );
}

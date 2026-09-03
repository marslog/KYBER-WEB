import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RegistrationListPanel from "@/components/sections/RegistrationListPanel";
import { getPortalSessionFromCookies } from "@/lib/portalSessionServer";
import { isPortalAdmin, REGISTER_NAV, REGISTER_LIST_NAV } from "@/lib/portalSession";

export const metadata: Metadata = {
  title: `${REGISTER_LIST_NAV.label} — KYBER`,
  description: REGISTER_LIST_NAV.description,
};

export default async function RegistrationListPage() {
  const session = await getPortalSessionFromCookies();
  if (!session) {
    redirect("/?login=required");
  }

  const admin = isPortalAdmin(session);

  return (
    <main className="relative bg-[var(--bg)] min-h-screen text-[var(--text)]">
      <Navbar />
      <section className="pt-28 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand)] mb-3">
              Partner Portal
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
              {REGISTER_LIST_NAV.label}
            </h1>
            <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
              {admin
                ? "View all partner registrations and update status: pending, approved, or closed."
                : "Track the approval status of registrations submitted from your account."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mb-10 text-sm">
            <Link
              href={REGISTER_NAV.href}
              className="rounded-md border border-[var(--border)] px-3 py-1.5 text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
            >
              New Registration
            </Link>
            <span className="rounded-md bg-[var(--brand-soft)] px-3 py-1.5 font-medium text-[var(--brand)]">
              {REGISTER_LIST_NAV.label}
            </span>
          </div>
          <RegistrationListPanel />
        </div>
      </section>
      <Footer />
    </main>
  );
}

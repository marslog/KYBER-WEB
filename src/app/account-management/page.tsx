import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccountManagementPanel from "@/components/sections/AccountManagementPanel";
import { getPortalSessionFromCookies } from "@/lib/portalSessionServer";
import { isPortalAdmin, ACCOUNT_MANAGEMENT_NAV } from "@/lib/portalSession";

export const metadata: Metadata = {
  title: `${ACCOUNT_MANAGEMENT_NAV.label} — KYBER`,
  description: ACCOUNT_MANAGEMENT_NAV.description,
};

export default async function AccountManagementPage() {
  const session = await getPortalSessionFromCookies();
  if (!isPortalAdmin(session)) {
    redirect("/resources?login=required");
  }

  return (
    <main className="relative bg-[var(--bg)] min-h-screen text-[var(--text)]">
      <Navbar />

      <section className="pt-28 pb-14 md:pt-36 md:pb-16 bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow mb-3">Administrator</p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {ACCOUNT_MANAGEMENT_NAV.label}
          </h1>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed mt-4 max-w-2xl">
            Manage user accounts, assign RBAC roles, and update passwords. Signed in as{" "}
            <span className="font-medium text-[var(--text)]">{session?.username}</span>.
          </p>
        </div>
      </section>

      <section className="section-shell bg-[var(--bg-subtle)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AccountManagementPanel />
        </div>
      </section>

      <Footer />
    </main>
  );
}

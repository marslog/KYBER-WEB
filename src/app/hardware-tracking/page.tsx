import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HardwareTrackingPanel from "@/components/sections/HardwareTrackingPanel";
import { getPortalSessionFromCookies } from "@/lib/portalSessionServer";
import { isPortalAdmin, HARDWARE_TRACKING_NAV } from "@/lib/portalSession";

export const metadata: Metadata = {
  title: `${HARDWARE_TRACKING_NAV.label} — KYBER`,
  description: HARDWARE_TRACKING_NAV.description,
};

export default async function HardwareTrackingPage() {
  const session = await getPortalSessionFromCookies();
  if (!isPortalAdmin(session)) {
    redirect("/resources?login=required");
  }

  return (
    <main className="relative bg-[var(--bg)] min-h-screen text-[var(--text)]">
      <Navbar />

      <section className="pt-28 pb-12 md:pt-36 md:pb-14 bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--brand-soft)] text-[var(--brand)] mb-3 border border-[var(--brand)]/20">
            Administrator Only
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {HARDWARE_TRACKING_NAV.label}
          </h1>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed mt-3 max-w-3xl">
            Log and manage hardware assets across nodes and clusters. Track model specifications, serial numbers, deployment start dates, and warranty expiration dates. Signed in as{" "}
            <span className="font-semibold text-[var(--text)]">{session?.username}</span>.
          </p>
        </div>
      </section>

      <section className="section-shell bg-[var(--bg-subtle)] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HardwareTrackingPanel />
        </div>
      </section>

      <Footer />
    </main>
  );
}

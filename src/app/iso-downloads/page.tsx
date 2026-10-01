import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IsoDownloadsPanel from "@/components/sections/IsoDownloadsPanel";
import { getPortalSessionFromCookies } from "@/lib/portalSessionServer";
import { ISO_DOWNLOADS_NAV, isPortalAdmin } from "@/lib/portalSession";

export const metadata: Metadata = {
  title: `${ISO_DOWNLOADS_NAV.label} — KYBER`,
  description: ISO_DOWNLOADS_NAV.description,
};

export default async function IsoDownloadsPage() {
  const session = await getPortalSessionFromCookies();
  if (!session) {
    redirect("/?login=required");
  }

  const admin = isPortalAdmin(session);

  return (
    <main className="relative bg-[var(--bg)] min-h-screen text-[var(--text)]">
      <Navbar />

      <section className="pt-28 pb-12 md:pt-36 md:pb-14 bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--brand-soft)] text-[var(--brand)] mb-3 border border-[var(--brand)]/20">
            Authenticated Access
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {ISO_DOWNLOADS_NAV.label}
          </h1>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed mt-3 max-w-2xl">
            Browse and download KYBER OS ISO images. Verify integrity with the SHA256 checksum before deployment.
            Signed in as{" "}
            <span className="font-semibold text-[var(--text)]">{session.username}</span>
            {admin && <span className="ml-1 text-xs text-[var(--brand)] font-medium">(admin)</span>}.
          </p>
        </div>
      </section>

      <section className="section-shell bg-[var(--bg-subtle)] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <IsoDownloadsPanel isAdmin={admin} />
        </div>
      </section>

      <Footer />
    </main>
  );
}

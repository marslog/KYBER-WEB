import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PartnerRegistrationForm from "@/components/sections/PartnerRegistrationForm";
import { PORTAL_SESSION_COOKIE, parsePortalSessionToken } from "@/lib/portalSession";

export const metadata = {
  title: "Register — KYBER",
  description: "Partner and End-User registration form for KYBER products and services.",
};

export default async function RegisterPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(PORTAL_SESSION_COOKIE)?.value;
  const session = parsePortalSessionToken(token);

  if (!session) {
    redirect("/?login=required");
  }

  return (
    <main className="relative bg-[var(--bg)] min-h-screen text-[var(--text)]">
      <Navbar />
      <section className="pt-28 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand)] mb-3">
              Partner Portal
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
              Partner &amp; End-User Registration
            </h1>
            <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
              Register a new partner and end-user for KYBER products and services.
              All fields are required unless noted otherwise.
            </p>
          </div>
          <PartnerRegistrationForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}

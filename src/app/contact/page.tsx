import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Globe } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectRegistrationForm from "@/components/sections/ProjectRegistrationForm";
import { COMPANY_INFO } from "@/data/platformData";

export const metadata: Metadata = {
  title: "Contact KYBER — Project Registration",
  description:
    "Register your infrastructure project with KYBER platform architects. HCI, MARSLOQ, and full-platform deployments.",
};

export default function ContactPage() {
  return (
    <main className="relative bg-[var(--bg)] min-h-screen text-[var(--text)]">
      <Navbar />

      <section className="pt-28 pb-14 md:pt-36 md:pb-16 bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow mb-3">Contact</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight max-w-2xl">
            Register your project
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mt-5 max-w-2xl">
            Share your scope, timeline, and requirements. A KYBER architect will review your
            submission and follow up with next steps.
          </p>
        </div>
      </section>

      <section className="section-shell bg-[var(--bg-subtle)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-12 items-start">
            <ProjectRegistrationForm />

            <div className="space-y-5">
              <h2 className="text-lg font-semibold">Contact details</h2>
              <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
                <ContactRow icon={<MapPin className="w-4 h-4" />} label="Address">
                  {COMPANY_INFO.address}
                </ContactRow>
                <ContactRow icon={<MapPin className="w-4 h-4" />} label="Tax ID">
                  {COMPANY_INFO.taxId}
                </ContactRow>
                <ContactRow icon={<Phone className="w-4 h-4" />} label="Phone">
                  <a href={`tel:${COMPANY_INFO.phoneTel}`} className="hover:text-[var(--brand)] transition-colors">
                    {COMPANY_INFO.phone}
                  </a>
                  <span className="mx-1">·</span>
                  <a
                    href={`tel:${COMPANY_INFO.phoneSecondaryTel}`}
                    className="hover:text-[var(--brand)] transition-colors"
                  >
                    {COMPANY_INFO.phoneSecondary}
                  </a>
                </ContactRow>
                <ContactRow icon={<Phone className="w-4 h-4" />} label="Installation">
                  <a
                    href={`tel:${COMPANY_INFO.installationPhoneTel}`}
                    className="hover:text-[var(--brand)] transition-colors"
                  >
                    {COMPANY_INFO.installationPhone}
                  </a>
                </ContactRow>
                <ContactRow icon={<Mail className="w-4 h-4" />} label="Email">
                  <a
                    href={`mailto:${COMPANY_INFO.supportEmail}`}
                    className="hover:text-[var(--brand)] transition-colors"
                  >
                    {COMPANY_INFO.supportEmail}
                  </a>
                </ContactRow>
                <ContactRow icon={<Globe className="w-4 h-4" />} label="Website">
                  <a
                    href={COMPANY_INFO.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--brand)] transition-colors"
                  >
                    {COMPANY_INFO.website}
                  </a>
                </ContactRow>
                <ContactRow icon={<Clock className="w-4 h-4" />} label="Hours">
                  {COMPANY_INFO.hours}
                </ContactRow>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 text-[var(--brand)] shrink-0">{icon}</span>
      <span>
        <span className="block text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
          {label}
        </span>
        {children}
      </span>
    </li>
  );
}

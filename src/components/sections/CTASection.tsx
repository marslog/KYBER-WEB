"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { COMPANY_INFO } from "@/data/platformData";
import ProjectRegistrationForm from "@/components/sections/ProjectRegistrationForm";

export default function CTASection() {
  return (
    <section id="project-registration" className="py-24 bg-[var(--bg-dark)] text-[var(--text-on-dark)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted-on-dark)] mb-3">
                Get started
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
                Ready to modernize your infrastructure?
              </h2>
            </div>
            <p className="text-[var(--text-muted-on-dark)] leading-relaxed">
              Register your project with KYBER platform architects. We typically respond within one
              business day.
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[var(--text-muted-on-dark)]" />
                <a href={`tel:${COMPANY_INFO.phoneTel}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[var(--text-muted-on-dark)]" />
                <a
                  href={`mailto:${COMPANY_INFO.supportEmail}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_INFO.supportEmail}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[var(--text-muted-on-dark)]" />
                <span>{COMPANY_INFO.address}</span>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex text-sm text-[var(--text-muted-on-dark)] hover:text-white transition-colors underline underline-offset-4"
            >
              View full contact details
            </Link>
          </div>

          <div className="bg-white text-[var(--text)] rounded-lg p-8 border border-[var(--border)]">
            <ProjectRegistrationForm variant="compact" id="homepage-project-registration" />
          </div>
        </div>
      </div>
    </section>
  );
}

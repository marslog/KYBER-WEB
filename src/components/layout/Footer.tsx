"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronUp,
  Wrench,
  Globe,
} from "lucide-react";
import {
  NAV_STRUCTURE,
  COMPANY_INFO,
  FOOTER_LEGAL_LINKS,
} from "@/data/platformData";
import "@/app/footer.css";

const PRODUCT_LINKS = NAV_STRUCTURE.products
  .flatMap((category) => category.items)
  .slice(0, 6);

const SOLUTION_LINKS = NAV_STRUCTURE.solutions.slice(0, 5);
const COMPANY_LINKS = NAV_STRUCTURE.company.slice(0, 5);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="site-footer bg-[var(--bg-dark)] text-[var(--text-muted-on-dark)] border-t-2 border-[var(--brand)]"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          <div className="lg:col-span-4 space-y-4">
            <Image
              src="/assets/kyber-logo-main.png"
              alt="KYBER"
              width={120}
              height={32}
              className="h-7 w-auto brightness-0 invert"
            />
            <p className="text-sm leading-relaxed max-w-sm">
              {COMPANY_INFO.tagline}
            </p>
            <div className="site-footer__origin" title={COMPANY_INFO.originLabel}>
              <Image
                src={COMPANY_INFO.thailandFlagSrc}
                alt={`Flag of ${COMPANY_INFO.country}`}
                width={44}
                height={29}
                className="site-footer__origin-flag"
              />
              <div className="site-footer__origin-copy">
                <span className="site-footer__origin-en">
                  {COMPANY_INFO.originLabel}
                </span>
                <span className="site-footer__origin-th">
                  {COMPANY_INFO.originLabelTh}
                </span>
              </div>
            </div>
          </div>

          <nav
            className="lg:col-span-2"
            aria-label="Product links"
          >
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-on-dark)] mb-4">
              Products
            </h4>
            <ul className="space-y-2 text-sm">
              {PRODUCT_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav
            className="lg:col-span-2"
            aria-label="Solution links"
          >
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-on-dark)] mb-4">
              Solutions
            </h4>
            <ul className="space-y-2 text-sm">
              {SOLUTION_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav
            className="lg:col-span-2"
            aria-label="Company links"
          >
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-on-dark)] mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              {COMPANY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-on-dark)] mb-4">
              Contact
            </h4>
            <address className="not-italic">
              <ul className="space-y-2.5 text-sm">
                <li className="flex gap-2">
                  <MapPin
                    className="w-4 h-4 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block">{COMPANY_INFO.address}</span>
                    <span className="block mt-1 text-xs text-[var(--text-muted-on-dark)]">
                      {COMPANY_INFO.addressEn}
                    </span>
                  </span>
                </li>
                <li className="flex gap-2">
                  <Wrench className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>
                    <span className="block text-[11px] uppercase tracking-wider text-[var(--text-muted-on-dark)]">
                      Installation
                    </span>
                    <a
                      href={`tel:${COMPANY_INFO.installationPhoneTel}`}
                      className="hover:text-white transition-colors"
                    >
                      {COMPANY_INFO.installationPhone}
                    </a>
                  </span>
                </li>
                <li className="flex gap-2">
                  <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>
                    <a
                      href={`tel:${COMPANY_INFO.phoneTel}`}
                      className="hover:text-white transition-colors"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                    <span className="mx-1" aria-hidden="true">
                      ·
                    </span>
                    <a
                      href={`tel:${COMPANY_INFO.phoneSecondaryTel}`}
                      className="hover:text-white transition-colors"
                    >
                      {COMPANY_INFO.phoneSecondary}
                    </a>
                  </span>
                </li>
                <li className="flex gap-2">
                  <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${COMPANY_INFO.supportEmail}`}
                    className="hover:text-white transition-colors"
                  >
                    {COMPANY_INFO.supportEmail}
                  </a>
                </li>
                <li className="flex gap-2">
                  <Globe className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <a
                    href={COMPANY_INFO.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {COMPANY_INFO.website}
                  </a>
                </li>
                <li className="flex gap-2">
                  <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {COMPANY_INFO.hours}
                </li>
              </ul>
            </address>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 site-footer__meta text-xs">
          <div className="site-footer__meta-legal">
            <p className="site-footer__meta-name">
              © {year} {COMPANY_INFO.legalName}. All rights reserved.
            </p>
            <p>
              {COMPANY_INFO.legalNameTh} · Tax ID: {COMPANY_INFO.taxId} ·{" "}
              {COMPANY_INFO.countryTh}
            </p>
          </div>

          <nav className="site-footer__meta-links" aria-label="Legal and resources">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-2 hover:text-white transition-colors shrink-0"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}

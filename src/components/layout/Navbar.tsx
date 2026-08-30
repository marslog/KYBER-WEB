"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronDown, Menu, X, Search, ArrowRight } from "lucide-react";
import { NAV_STRUCTURE } from "@/data/platformData";
import PortalLoginMenu from "@/components/layout/PortalLoginMenu";
import { usePortalAuth } from "@/hooks/usePortalAuth";
import { KNOWLEDGE_BASE_HREF } from "@/data/portalAccess";
import { ACCOUNT_MANAGEMENT_NAV, KNOWLEDGE_BASE_NAV } from "@/lib/portalSession";

type NavbarProps = {
  overDarkHero?: boolean;
};

function filterResourcesForAuth(authenticated: boolean) {
  return NAV_STRUCTURE.resources.filter(
    (item) => authenticated || item.href !== KNOWLEDGE_BASE_HREF,
  );
}

function NavbarContent({ overDarkHero = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const darkNav = overDarkHero && !scrolled;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { authenticated, isAdmin, logout } = usePortalAuth();
  const searchParams = useSearchParams();
  const visibleResources = filterResourcesForAuth(authenticated);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchParams.get("login") === "required") {
      setLoginOpen(true);
    }
  }, [searchParams]);

  const navLinkClass = (active: boolean) =>
    `flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-md ${
      darkNav
        ? active
          ? "text-white bg-white/10"
          : "text-white/80 hover:text-white"
        : active
          ? "text-[var(--text)] bg-[var(--bg-subtle)]"
          : "text-[var(--text-secondary)] hover:text-[var(--text)]"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        darkNav
          ? "nav-shell--dark backdrop-blur-md border-b py-4"
          : scrolled
            ? "bg-white/95 backdrop-blur-sm border-b border-[var(--border)] py-3"
            : "bg-white/90 backdrop-blur-sm border-b border-[var(--border)] py-4"
      }`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center shrink-0" aria-label="KYBER home">
            <Image
              src={darkNav ? "/images/Kyber_logo[Gray].png" : "/images/kyber.png"}
              alt="KYBER"
              width={132}
              height={120}
              className="h-11 w-auto sm:h-12 sm:w-auto object-contain object-left"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {(["products", "solutions", "resources", "company"] as const).map((key) => (
              <div key={key} onMouseEnter={() => setActiveMenu(key)}>
                <button className={navLinkClass(activeMenu === key)}>
                  {key}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === key ? "rotate-180" : ""}`} />
                </button>
              </div>
            ))}
            {authenticated && (
              <Link href={KNOWLEDGE_BASE_NAV.href} className={navLinkClass(false)}>
                {KNOWLEDGE_BASE_NAV.label}
              </Link>
            )}
            {isAdmin && (
              <Link href={ACCOUNT_MANAGEMENT_NAV.href} className={navLinkClass(false)}>
                {ACCOUNT_MANAGEMENT_NAV.label}
              </Link>
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className={`p-2 transition-colors ${
                darkNav
                  ? "text-white/70 hover:text-white"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              <Search className="w-4 h-4" />
            </button>
            <Link
              href="#product-highlights"
              className={`text-sm px-3 py-2 transition-colors ${
                darkNav
                  ? "text-white/80 hover:text-white"
                  : "text-[var(--text-secondary)] hover:text-[var(--brand)]"
              }`}
            >
              Platform
            </Link>
            <Link href="/contact#contact-form" className="kyber-btn-primary text-sm py-2 px-4">
              Contact
            </Link>
            <PortalLoginMenu
              darkNav={darkNav}
              open={loginOpen}
              onOpenChange={setLoginOpen}
              authenticated={authenticated}
              onLogout={logout}
            />
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 ${darkNav ? "text-white" : "text-[var(--text)]"}`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {activeMenu && (
        <div
          className="hidden lg:block absolute top-full left-0 right-0 bg-white border-b border-[var(--border)] shadow-sm"
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            {activeMenu === "products" && (
              <div className="grid grid-cols-4 gap-8">
                {NAV_STRUCTURE.products.map((cat) => (
                  <div key={cat.category}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3 pb-2 border-b border-[var(--border)]">
                      {cat.category}
                    </p>
                    <div className="space-y-1">
                      {cat.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setActiveMenu(null)}
                          className="group block p-2 rounded-md hover:bg-[var(--brand-soft)] transition-colors"
                        >
                          <div className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--brand)] transition-colors">{item.name}</div>
                          <div className="text-xs text-[var(--text-muted)] mt-0.5">{item.desc}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeMenu === "solutions" && (
              <div className="grid grid-cols-3 gap-4">
                {NAV_STRUCTURE.solutions.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setActiveMenu(null)} className="p-4 rounded-lg border border-[var(--border)] hover:border-[var(--brand)] hover:bg-[var(--brand-soft)] transition-colors">
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">{item.desc}</div>
                  </Link>
                ))}
              </div>
            )}
            {activeMenu === "resources" && (
              <div className="grid grid-cols-3 gap-4">
                {visibleResources.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setActiveMenu(null)} className="p-4 rounded-lg border border-[var(--border)] hover:border-[var(--brand)] hover:bg-[var(--brand-soft)] transition-colors">
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">{item.desc}</div>
                  </Link>
                ))}
              </div>
            )}
            {activeMenu === "company" && (
              <div className="grid grid-cols-3 gap-4">
                {NAV_STRUCTURE.company.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setActiveMenu(null)} className="p-4 rounded-lg border border-[var(--border)] hover:border-[var(--brand)] hover:bg-[var(--brand-soft)] transition-colors">
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">{item.desc}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {mobileOpen && (
        <div
          className={`lg:hidden border-b px-6 py-6 space-y-6 max-h-[80vh] overflow-y-auto ${
            darkNav
              ? "bg-[var(--bg-dark)] border-white/10 text-white"
              : "bg-white border-[var(--border)]"
          }`}
        >
          {NAV_STRUCTURE.products.flatMap((c) => c.items).slice(0, 8).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm ${darkNav ? "text-white/90" : "text-[var(--text)]"}`}
            >
              {item.name}
            </Link>
          ))}
          {authenticated && (
            <Link
              href={KNOWLEDGE_BASE_NAV.href}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-medium ${darkNav ? "text-white" : "text-[var(--brand)]"}`}
            >
              {KNOWLEDGE_BASE_NAV.label}
            </Link>
          )}
          {isAdmin && (
            <Link
              href={ACCOUNT_MANAGEMENT_NAV.href}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-medium ${darkNav ? "text-white" : "text-[var(--brand)]"}`}
            >
              {ACCOUNT_MANAGEMENT_NAV.label}
            </Link>
          )}
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              if (authenticated) {
                void logout();
              } else {
                setLoginOpen(true);
              }
            }}
            className={`block text-sm ${darkNav ? "text-white/90" : "text-[var(--text)]"}`}
          >
            {authenticated ? "Logout" : "Login"}
          </button>
          <Link href="/contact#contact-form" onClick={() => setMobileOpen(false)} className="kyber-btn-primary w-full justify-center gap-2">
            Contact <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-24 px-4">
          <div className="bg-white border border-[var(--border)] rounded-lg w-full max-w-xl p-5 shadow-xl relative">
            <button onClick={() => setSearchOpen(false)} className="absolute top-4 right-4 text-[var(--text-muted)]">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-3">
              <Search className="w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search KYBER products..."
                className="bg-transparent w-full focus:outline-none text-sm"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default function Navbar(props: NavbarProps) {
  return (
    <Suspense fallback={<header className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-white/90 border-b border-[var(--border)]" />}>
      <NavbarContent {...props} />
    </Suspense>
  );
}

"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronDown, Menu, X, Search, ArrowRight } from "lucide-react";
import { NAV_STRUCTURE } from "@/data/platformData";
import PortalLoginMenu from "@/components/layout/PortalLoginMenu";
import { usePortalAuth } from "@/hooks/usePortalAuth";
import { KNOWLEDGE_BASE_HREF } from "@/data/portalAccess";
import { ADMIN_NAV, ADMIN_NAV_ITEMS, KNOWLEDGE_BASE_NAV, REGISTER_NAV, REGISTER_NAV_ITEMS } from "@/lib/portalSession";

// Flat search index built from nav structure
const SEARCH_INDEX = [
  ...NAV_STRUCTURE.products.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, section: "Product", desc: item.desc }))
  ),
  ...NAV_STRUCTURE.solutions.map((item) => ({
    name: item.title,
    href: item.href,
    desc: item.desc,
    section: "Solution",
  })),
  ...NAV_STRUCTURE.resources.map((item) => ({
    name: item.title,
    href: item.href,
    desc: item.desc,
    section: "Resource",
  })),
  ...NAV_STRUCTURE.company.map((item) => ({
    name: item.title,
    href: item.href,
    desc: item.desc,
    section: "Company",
  })),
];

type NavbarProps = {
  overDarkHero?: boolean;
};

function filterResourcesForAuth(authenticated: boolean) {
  return NAV_STRUCTURE.resources.filter(
    (item) => authenticated || item.href !== KNOWLEDGE_BASE_HREF,
  );
}

const NAV_LABELS: Record<string, string> = {
  products: "Products",
  solutions: "Solutions",
  resources: "Resources",
  company: "Company",
};

function NavbarContent({ overDarkHero = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const darkNav = overDarkHero && !scrolled;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { authenticated, isAdmin, logout } = usePortalAuth();
  const searchParams = useSearchParams();
  const visibleResources = filterResourcesForAuth(authenticated);
  const showRegisterMenu = authenticated;

  const searchResults = searchQuery.trim().length > 1
    ? SEARCH_INDEX.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
        if (!searchOpen) setSearchQuery("");
      }
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, mobileOpen]);

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
                  {NAV_LABELS[key]}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === key ? "rotate-180" : ""}`} />
                </button>
              </div>
            ))}
            {authenticated && (
              <Link href={KNOWLEDGE_BASE_NAV.href} className={navLinkClass(false)}>
                {KNOWLEDGE_BASE_NAV.label}
              </Link>
            )}
            {showRegisterMenu && (
              <div onMouseEnter={() => setActiveMenu("register")}>
                <button type="button" className={navLinkClass(activeMenu === "register")}>
                  {REGISTER_NAV.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === "register" ? "rotate-180" : ""}`} />
                </button>
              </div>
            )}
            {isAdmin && (
              <div onMouseEnter={() => setActiveMenu("admin")}>
                <button type="button" className={navLinkClass(activeMenu === "admin")}>
                  {ADMIN_NAV.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === "admin" ? "rotate-180" : ""}`} />
                </button>
              </div>
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => { setSearchOpen(true); setSearchQuery(""); }}
              aria-label="Search (Ctrl+K)"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors text-sm ${
                darkNav
                  ? "border-white/15 text-white/60 hover:text-white hover:border-white/30"
                  : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)]"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Search</span>
              <kbd className={`hidden xl:inline text-[10px] font-mono px-1.5 py-0.5 rounded ${
                darkNav
                  ? "bg-white/10 text-white/50"
                  : "bg-[var(--bg-subtle)] text-[var(--text-muted)]"
              }`}>⌘K</kbd>
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
            {showRegisterMenu && activeMenu === "register" && (
              <div className="grid grid-cols-2 gap-4 max-w-xl">
                {REGISTER_NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setActiveMenu(null)}
                    className="p-4 rounded-lg border border-[var(--border)] hover:border-[var(--brand)] hover:bg-[var(--brand-soft)] transition-colors"
                  >
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">{item.description}</div>
                  </Link>
                ))}
              </div>
            )}
            {isAdmin && activeMenu === "admin" && (
              <div className="grid grid-cols-2 gap-4 max-w-xl">
                {ADMIN_NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setActiveMenu(null)}
                    className="p-4 rounded-lg border border-[var(--border)] hover:border-[var(--brand)] hover:bg-[var(--brand-soft)] transition-colors"
                  >
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">{item.description}</div>
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
          {NAV_STRUCTURE.products.map((cat) => (
            <div key={cat.category} className="space-y-2">
              <p className={`text-[10px] font-semibold uppercase tracking-wider ${darkNav ? "text-white/40" : "text-[var(--text-muted)]"}`}>
                {cat.category}
              </p>
              {cat.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block text-sm ${darkNav ? "text-white/90" : "text-[var(--text)]"}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ))}
          <div className="space-y-2">
            <p className={`text-[10px] font-semibold uppercase tracking-wider ${darkNav ? "text-white/40" : "text-[var(--text-muted)]"}`}>
              Solutions
            </p>
            {NAV_STRUCTURE.solutions.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm ${darkNav ? "text-white/90" : "text-[var(--text)]"}`}
              >
                {item.title}
              </Link>
            ))}
          </div>
          {authenticated && (
            <Link
              href={KNOWLEDGE_BASE_NAV.href}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-medium ${darkNav ? "text-white" : "text-[var(--brand)]"}`}
            >
              {KNOWLEDGE_BASE_NAV.label}
            </Link>
          )}
          {showRegisterMenu && (
            <div className="space-y-3">
              <p className={`text-xs font-semibold uppercase tracking-wider ${darkNav ? "text-white/60" : "text-[var(--text-muted)]"}`}>
                {REGISTER_NAV.label}
              </p>
              {REGISTER_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block text-sm font-medium ${darkNav ? "text-white" : "text-[var(--brand)]"}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
          {isAdmin && (
            <div className="space-y-3">
              <p className={`text-xs font-semibold uppercase tracking-wider ${darkNav ? "text-white/60" : "text-[var(--text-muted)]"}`}>
                {ADMIN_NAV.label}
              </p>
              {ADMIN_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block text-sm font-medium ${darkNav ? "text-white" : "text-[var(--brand)]"}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
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
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-20 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) { setSearchOpen(false); setSearchQuery(""); } }}
        >
          <div className="bg-white border border-[var(--border)] rounded-xl w-full max-w-xl shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border)]">
              <Search className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products, solutions, resources…"
                className="bg-transparent w-full focus:outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-muted)]"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); } }}
              />
              <button
                onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors shrink-0"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {searchResults.length > 0 ? (
              <ul className="py-2 max-h-80 overflow-y-auto">
                {searchResults.map((result) => (
                  <li key={result.href}>
                    <Link
                      href={result.href}
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-[var(--bg-subtle)] transition-colors group"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">{result.section}</span>
                        </div>
                        <div className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--brand)] transition-colors">{result.name}</div>
                        <div className="text-xs text-[var(--text-muted)] mt-0.5 line-clamp-1">{result.desc}</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--brand)] shrink-0 mt-1.5 transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : searchQuery.trim().length > 1 ? (
              <div className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
                No results for <span className="font-medium text-[var(--text)]">&ldquo;{searchQuery}&rdquo;</span>
              </div>
            ) : (
              <div className="px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Popular</p>
                <div className="flex flex-wrap gap-2">
                  {["KYBER HCI", "MARSLOQ", "KSV", "KSAN", "Log Management", "VMware Migration"].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="text-xs px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
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

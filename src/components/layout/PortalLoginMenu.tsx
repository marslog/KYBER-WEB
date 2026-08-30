"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Lock, X } from "lucide-react";
import { PORTAL_LOGIN_SECTION } from "@/data/portalAccess";
import PortalLoginForm from "@/components/layout/PortalLoginForm";

type PortalLoginMenuProps = {
  darkNav?: boolean;
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authenticated: boolean;
  onLogout: () => void;
};

export default function PortalLoginMenu({
  darkNav = false,
  className = "",
  open,
  onOpenChange,
  authenticated,
  onLogout,
}: PortalLoginMenuProps) {
  useEffect(() => {
    if (!open) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onOpenChange(false);
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onOpenChange]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const triggerClass = darkNav
    ? "text-white/80 hover:text-white"
    : "text-[var(--text-secondary)] hover:text-[var(--text)]";

  return (
    <>
      {authenticated ? (
        <button
          type="button"
          onClick={onLogout}
          className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors rounded-md ${triggerClass} ${className}`}
        >
          Logout
        </button>
      ) : (
        <button
          type="button"
          onClick={() => onOpenChange(true)}
          className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors rounded-md ${triggerClass} ${className}`}
        >
          <Lock className="w-4 h-4" aria-hidden="true" />
          Login
        </button>
      )}

      {open && !authenticated && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/45 px-4 pt-24 sm:pt-28"
          onClick={() => onOpenChange(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="portal-login-title"
            className="portal-login-modal relative w-full max-w-md rounded-xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-md)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text)]"
              aria-label="Close login dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand)] mb-2">
              {PORTAL_LOGIN_SECTION.title}
            </p>
            <h2 id="portal-login-title" className="text-xl font-semibold mb-1">
              Admin sign in
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              Sign in to unlock the Knowledge Base menu in the navigation bar.
            </p>

            <PortalLoginForm
              onSuccess={() => {
                onOpenChange(false);
                window.location.reload();
              }}
            />

            <p className="text-xs text-[var(--text-muted)] mt-5">
              Need access?{" "}
              <Link
                href={PORTAL_LOGIN_SECTION.requestAccessHref}
                className="text-[var(--brand)] hover:underline"
                onClick={() => onOpenChange(false)}
              >
                {PORTAL_LOGIN_SECTION.requestAccessLabel}
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

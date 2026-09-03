import { createHmac, timingSafeEqual } from "crypto";
import type { PortalRole } from "@/lib/portalUserStore";

export const PORTAL_SESSION_COOKIE = "kyber_portal_session";
export const PORTAL_SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7;

export const KNOWLEDGE_BASE_NAV = {
  label: "Knowledge Base",
  href: "/resources/kb",
  description: "Best practices & troubleshooting articles",
} as const;

export const ACCOUNT_MANAGEMENT_NAV = {
  label: "Account Management",
  href: "/account-management",
  description: "Manage user accounts, roles, and passwords (RBAC)",
} as const;

export const REGISTER_NAV = {
  label: "Register",
  href: "/register",
  description: "Partner and End-User registration",
} as const;

export interface PortalSession {
  username: string;
  role: PortalRole;
  iat: number;
}

function getSessionSecret(): string {
  const secret = process.env.PORTAL_SESSION_SECRET?.trim();
  if (secret) return secret;

  const fallback = process.env.SMTP_PASS?.trim();
  if (fallback) return fallback;

  return "kyber-dev-portal-session";
}

function sign(encodedPayload: string): string {
  return createHmac("sha256", getSessionSecret()).update(encodedPayload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function getPortalAdminCredentials(): { username: string; password: string } {
  return {
    username: process.env.PORTAL_ADMIN_USERNAME?.trim() || "kyber",
    password: process.env.PORTAL_ADMIN_PASSWORD?.trim() || "Kyber@admin123",
  };
}

export function createPortalSessionToken(username: string, role: PortalRole): string {
  const payload = JSON.stringify({
    username,
    role,
    iat: Date.now(),
  } satisfies PortalSession);
  const encoded = Buffer.from(payload, "utf8").toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function parsePortalSessionToken(token: string | undefined | null): PortalSession | null {
  if (!token) return null;

  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  try {
    if (!safeEqual(signature, sign(encoded))) return null;

    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as PortalSession;
    if (
      typeof payload.username !== "string" ||
      (payload.role !== "admin" && payload.role !== "user") ||
      typeof payload.iat !== "number"
    ) {
      return null;
    }

    const ageMs = Date.now() - payload.iat;
    if (ageMs < 0 || ageMs > PORTAL_SESSION_MAX_AGE_SEC * 1000) return null;

    return payload;
  } catch {
    return null;
  }
}

export function verifyPortalSessionToken(token: string | undefined | null): boolean {
  return parsePortalSessionToken(token) !== null;
}

export function isPortalAdmin(session: PortalSession | null): boolean {
  return session?.role === "admin";
}

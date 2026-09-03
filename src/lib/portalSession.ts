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

export const REGISTER_LIST_NAV = {
  label: "Registration List",
  href: "/register/list",
  description: "Track registration approval status",
} as const;

export const REGISTER_NAV_ITEMS = [
  {
    label: "New Registration",
    href: REGISTER_NAV.href,
    description: "Submit a partner and end-user registration",
  },
  {
    label: REGISTER_LIST_NAV.label,
    href: REGISTER_LIST_NAV.href,
    description: REGISTER_LIST_NAV.description,
  },
] as const;

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

/* ── Web Crypto helpers (Edge-compatible) ── */

const enc = new TextEncoder();

function base64urlEncode(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function getCryptoKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    enc.encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function signPayload(encodedPayload: string): Promise<string> {
  const key = await getCryptoKey();
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(encodedPayload));
  return base64urlEncode(sig);
}

async function verifySignature(encodedPayload: string, signature: string): Promise<boolean> {
  const expected = await signPayload(encodedPayload);
  if (expected.length !== signature.length) return false;
  let result = 0;
  for (let i = 0; i < expected.length; i++) {
    result |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return result === 0;
}

function base64urlToUtf8(b64: string): string {
  const padded = b64.replace(/-/g, "+").replace(/_/g, "/");
  return decodeURIComponent(
    atob(padded)
      .split("")
      .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join(""),
  );
}

function utf8ToBase64url(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    ),
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function getPortalAdminCredentials(): { username: string; password: string } {
  return {
    username: process.env.PORTAL_ADMIN_USERNAME?.trim() || "kyber",
    password: process.env.PORTAL_ADMIN_PASSWORD?.trim() || "Kyber@admin123",
  };
}

export async function createPortalSessionToken(username: string, role: PortalRole): Promise<string> {
  const payload = JSON.stringify({
    username,
    role,
    iat: Date.now(),
  } satisfies PortalSession);
  const encoded = utf8ToBase64url(payload);
  const sig = await signPayload(encoded);
  return `${encoded}.${sig}`;
}

export async function parsePortalSessionToken(token: string | undefined | null): Promise<PortalSession | null> {
  if (!token) return null;

  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  try {
    const valid = await verifySignature(encoded, signature);
    if (!valid) return null;

    const payload = JSON.parse(base64urlToUtf8(encoded)) as PortalSession;
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

export async function verifyPortalSessionToken(token: string | undefined | null): Promise<boolean> {
  return (await parsePortalSessionToken(token)) !== null;
}

export function isPortalAdmin(session: PortalSession | null): boolean {
  return session?.role === "admin";
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  checkRateLimit,
  getClientIp,
  isAllowedOrigin,
} from "@/lib/apiSecurity";
import { authenticatePortalUser } from "@/lib/portalUserStore";
import {
  createPortalSessionToken,
  parsePortalSessionToken,
  PORTAL_SESSION_COOKIE,
  PORTAL_SESSION_MAX_AGE_SEC,
} from "@/lib/portalSession";

const NO_STORE = { "Cache-Control": "no-store" };

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(PORTAL_SESSION_COOKIE)?.value;
  const session = parsePortalSessionToken(token);

  if (!session) {
    return NextResponse.json({ authenticated: false }, { headers: NO_STORE });
  }

  return NextResponse.json(
    {
      authenticated: true,
      username: session.username,
      role: session.role,
      isAdmin: session.role === "admin",
    },
    { headers: NO_STORE },
  );
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403, headers: NO_STORE });
  }

  const clientIp = getClientIp(request);
  const rate = checkRateLimit(`portal-login:${clientIp}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      {
        status: 429,
        headers: {
          ...NO_STORE,
          ...(rate.retryAfterSec ? { "Retry-After": String(rate.retryAfterSec) } : {}),
        },
      },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400, headers: NO_STORE });
  }

  const username =
    body && typeof body === "object" && typeof (body as Record<string, unknown>).username === "string"
      ? (body as Record<string, string>).username.trim()
      : "";
  const password =
    body && typeof body === "object" && typeof (body as Record<string, unknown>).password === "string"
      ? (body as Record<string, string>).password
      : "";

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400, headers: NO_STORE });
  }

  const user = await authenticatePortalUser(username, password);
  if (!user) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401, headers: NO_STORE });
  }

  const cookieStore = await cookies();
  cookieStore.set(PORTAL_SESSION_COOKIE, createPortalSessionToken(user.username, user.role), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: PORTAL_SESSION_MAX_AGE_SEC,
  });

  return NextResponse.json(
    {
      ok: true,
      authenticated: true,
      username: user.username,
      role: user.role,
      isAdmin: user.role === "admin",
    },
    { headers: NO_STORE },
  );
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.set(PORTAL_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return NextResponse.json({ ok: true, authenticated: false }, { headers: NO_STORE });
}

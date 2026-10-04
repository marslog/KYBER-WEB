import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ACCOUNT_MANAGEMENT_NAV,
  HARDWARE_TRACKING_NAV,
  KNOWLEDGE_BASE_NAV,
  ISO_DOWNLOADS_NAV,
  REGISTER_NAV,
  REGISTER_LIST_NAV,
  PORTAL_SESSION_COOKIE,
  PORTAL_SESSION_MAX_AGE_SEC,
  parsePortalSessionToken,
  createPortalSessionToken,
} from "@/lib/portalSession";

/**
 * Sliding window session refresh:
 * When more than half the max-age has elapsed, re-sign the token
 * with a fresh `iat` so the cookie TTL resets to the full duration.
 */
async function maybeRefreshSession(
  request: NextRequest,
  response: NextResponse,
): Promise<NextResponse> {
  const token = request.cookies.get(PORTAL_SESSION_COOKIE)?.value;
  const session = await parsePortalSessionToken(token);
  if (!session) return response;

  const ageMs = Date.now() - session.iat;
  const halfLifeMs = (PORTAL_SESSION_MAX_AGE_SEC * 1000) / 2;

  if (ageMs > halfLifeMs) {
    // Re-issue a fresh token
    const freshToken = await createPortalSessionToken(session.username, session.role);
    response.cookies.set(PORTAL_SESSION_COOKIE, freshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: PORTAL_SESSION_MAX_AGE_SEC,
    });
  }

  return response;
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(PORTAL_SESSION_COOKIE)?.value;
  const session = await parsePortalSessionToken(token);
  const pathname = request.nextUrl.pathname;

  if (pathname === KNOWLEDGE_BASE_NAV.href) {
    if (session) {
      const res = NextResponse.next();
      return maybeRefreshSession(request, res);
    }

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/resources";
    redirectUrl.searchParams.set("login", "required");
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname === ISO_DOWNLOADS_NAV.href || pathname.startsWith("/iso-downloads/")) {
    if (session) {
      const res = NextResponse.next();
      return maybeRefreshSession(request, res);
    }

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    redirectUrl.searchParams.set("login", "required");
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname === REGISTER_NAV.href || pathname === REGISTER_LIST_NAV.href || pathname.startsWith("/register/")) {
    if (session) {
      const res = NextResponse.next();
      return maybeRefreshSession(request, res);
    }

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    redirectUrl.searchParams.set("login", "required");
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname === ACCOUNT_MANAGEMENT_NAV.href || pathname === HARDWARE_TRACKING_NAV.href || pathname.startsWith("/hardware-tracking/")) {
    if (session?.role === "admin") {
      const res = NextResponse.next();
      return maybeRefreshSession(request, res);
    }

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/resources";
    redirectUrl.searchParams.set("login", "required");
    return NextResponse.redirect(redirectUrl);
  }

  // Non-protected routes still get a sliding refresh for session health
  if (session) {
    const res = NextResponse.next();
    return maybeRefreshSession(request, res);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/resources/kb", "/account-management", "/register", "/register/:path*", "/hardware-tracking", "/hardware-tracking/:path*", "/iso-downloads", "/iso-downloads/:path*"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ACCOUNT_MANAGEMENT_NAV,
  KNOWLEDGE_BASE_NAV,
  REGISTER_NAV,
  REGISTER_LIST_NAV,
  PORTAL_SESSION_COOKIE,
  parsePortalSessionToken,
} from "@/lib/portalSession";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(PORTAL_SESSION_COOKIE)?.value;
  const session = await parsePortalSessionToken(token);
  const pathname = request.nextUrl.pathname;

  if (pathname === KNOWLEDGE_BASE_NAV.href) {
    if (session) return NextResponse.next();

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/resources";
    redirectUrl.searchParams.set("login", "required");
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname === REGISTER_NAV.href || pathname === REGISTER_LIST_NAV.href || pathname.startsWith("/register/")) {
    if (session) return NextResponse.next();

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    redirectUrl.searchParams.set("login", "required");
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname === ACCOUNT_MANAGEMENT_NAV.href) {
    if (session?.role === "admin") return NextResponse.next();

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/resources";
    redirectUrl.searchParams.set("login", "required");
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/resources/kb", "/account-management", "/register", "/register/:path*"],
};

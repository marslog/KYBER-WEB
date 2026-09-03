import { NextResponse } from "next/server";
import { isAllowedOrigin } from "@/lib/apiSecurity";
import {
  createPortalUser,
  listPortalUsers,
  type PortalRole,
} from "@/lib/portalUserStore";
import { getPortalSessionFromCookies } from "@/lib/portalSessionServer";
import { isPortalAdmin } from "@/lib/portalSession";
import { readPartnerProfile } from "@/lib/partnerProfile";

const NO_STORE = { "Cache-Control": "no-store" };

function unauthorized() {
  return NextResponse.json({ error: "Administrator access required." }, { status: 403, headers: NO_STORE });
}

export async function GET() {
  const session = await getPortalSessionFromCookies();
  if (!isPortalAdmin(session)) return unauthorized();

  const users = await listPortalUsers();
  return NextResponse.json({ users }, { headers: NO_STORE });
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403, headers: NO_STORE });
  }

  const session = await getPortalSessionFromCookies();
  if (!isPortalAdmin(session)) return unauthorized();

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
  const roleRaw =
    body && typeof body === "object" ? (body as Record<string, unknown>).role : undefined;
  const role: PortalRole = roleRaw === "admin" ? "admin" : "user";
  const partner = readPartnerProfile(body);

  try {
    const user = await createPortalUser({ username, password, role, ...partner });
    return NextResponse.json({ ok: true, user }, { status: 201, headers: NO_STORE });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create user.";
    return NextResponse.json({ error: message }, { status: 400, headers: NO_STORE });
  }
}

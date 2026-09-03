import { NextResponse } from "next/server";
import { isAllowedOrigin } from "@/lib/apiSecurity";
import { deletePortalUser, updatePortalUser, type PortalRole } from "@/lib/portalUserStore";
import { getPortalSessionFromCookies } from "@/lib/portalSessionServer";
import { isPortalAdmin } from "@/lib/portalSession";
import { readPartnerProfile } from "@/lib/partnerProfile";

const NO_STORE = { "Cache-Control": "no-store" };

function unauthorized() {
  return NextResponse.json({ error: "Administrator access required." }, { status: 403, headers: NO_STORE });
}

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403, headers: NO_STORE });
  }

  const session = await getPortalSessionFromCookies();
  if (!isPortalAdmin(session) || !session) return unauthorized();

  const { id } = await context.params;

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400, headers: NO_STORE });
  }

  const username =
    body && typeof body === "object" && typeof (body as Record<string, unknown>).username === "string"
      ? (body as Record<string, string>).username.trim()
      : undefined;
  const password =
    body && typeof body === "object" && typeof (body as Record<string, unknown>).password === "string"
      ? (body as Record<string, string>).password
      : undefined;
  const roleRaw =
    body && typeof body === "object" ? (body as Record<string, unknown>).role : undefined;
  const role: PortalRole | undefined =
    roleRaw === "admin" ? "admin" : roleRaw === "user" ? "user" : undefined;
  const partner = readPartnerProfile(body);

  try {
    const user = await updatePortalUser(
      id,
      { username, password: password || undefined, role, ...partner },
      session.username,
    );
    return NextResponse.json({ ok: true, user }, { headers: NO_STORE });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update user.";
    return NextResponse.json({ error: message }, { status: 400, headers: NO_STORE });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await getPortalSessionFromCookies();
  if (!isPortalAdmin(session) || !session) return unauthorized();

  const { id } = await context.params;

  try {
    await deletePortalUser(id, session.username);
    return NextResponse.json({ ok: true }, { headers: NO_STORE });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to delete user.";
    return NextResponse.json({ error: message }, { status: 400, headers: NO_STORE });
  }
}

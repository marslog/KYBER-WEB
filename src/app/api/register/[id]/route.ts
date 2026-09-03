import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  PORTAL_SESSION_COOKIE,
  parsePortalSessionToken,
  isPortalAdmin,
} from "@/lib/portalSession";
import { isAllowedOrigin } from "@/lib/apiSecurity";
import {
  isRegistrationStatus,
  updateRegistrationStatus,
} from "@/lib/registrationStore";

const NO_STORE = { "Cache-Control": "no-store" };

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const cookieStore = await cookies();
  const token = cookieStore.get(PORTAL_SESSION_COOKIE)?.value;
  const session = await parsePortalSessionToken(token);
  if (!isPortalAdmin(session)) {
    return NextResponse.json({ error: "Administrator access required." }, { status: 403, headers: NO_STORE });
  }

  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403, headers: NO_STORE });
  }

  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: "Registration id is required." }, { status: 400, headers: NO_STORE });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400, headers: NO_STORE });
  }

  const status =
    body && typeof body === "object" ? (body as Record<string, unknown>).status : undefined;

  if (!isRegistrationStatus(status)) {
    return NextResponse.json(
      { error: "Status must be pending, approved, or closed." },
      { status: 400, headers: NO_STORE },
    );
  }

  const record = await updateRegistrationStatus(id, status);
  if (!record) {
    return NextResponse.json({ error: "Registration not found." }, { status: 404, headers: NO_STORE });
  }

  return NextResponse.json({ ok: true, registration: record }, { headers: NO_STORE });
}

import { NextResponse } from "next/server";
import { isAllowedOrigin } from "@/lib/apiSecurity";
import { deleteIsoRecord, updateIsoRecord } from "@/lib/isoStore";
import type { IsoInput } from "@/lib/isoStore";
import { getPortalSessionFromCookies } from "@/lib/portalSessionServer";

const NO_STORE = { "Cache-Control": "no-store" };

function unauthorized() {
  return NextResponse.json(
    { error: "Login required to access ISO downloads." },
    { status: 403, headers: NO_STORE },
  );
}

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403, headers: NO_STORE });
  }

  const session = await getPortalSessionFromCookies();
  if (!session?.username) return unauthorized();

  const { id } = await context.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400, headers: NO_STORE });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400, headers: NO_STORE });
  }

  const raw = body as Record<string, unknown>;
  const input: Partial<IsoInput> = {};
  if (typeof raw.name === "string") input.name = raw.name;
  if (typeof raw.version === "string") input.version = raw.version;
  if (typeof raw.sha256 === "string") input.sha256 = raw.sha256;
  if (typeof raw.downloadUrl === "string") input.downloadUrl = raw.downloadUrl;
  if (typeof raw.uploadDate === "string") input.uploadDate = raw.uploadDate;
  if (typeof raw.notes === "string") input.notes = raw.notes;

  try {
    const record = await updateIsoRecord(id, input, session.username);
    return NextResponse.json({ ok: true, record }, { headers: NO_STORE });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update ISO record.";
    return NextResponse.json({ error: message }, { status: 400, headers: NO_STORE });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403, headers: NO_STORE });
  }

  const session = await getPortalSessionFromCookies();
  if (!session?.username) return unauthorized();

  const { id } = await context.params;

  try {
    await deleteIsoRecord(id);
    return NextResponse.json({ ok: true }, { headers: NO_STORE });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to delete ISO record.";
    return NextResponse.json({ error: message }, { status: 400, headers: NO_STORE });
  }
}

import { NextResponse } from "next/server";
import { isAllowedOrigin } from "@/lib/apiSecurity";
import { deleteHardwareRecord, updateHardwareRecord } from "@/lib/hardwareStore";
import { isHardwareStatus, type HardwareInput } from "@/lib/hardwareTypes";
import { isPortalAdmin } from "@/lib/portalSession";
import { getPortalSessionFromCookies } from "@/lib/portalSessionServer";

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
  if (!isPortalAdmin(session) || !session?.username) return unauthorized();

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

  const input: Partial<HardwareInput> = {};
  if (typeof raw.name === "string") input.name = raw.name;
  if (typeof raw.model === "string") input.model = raw.model;
  if (typeof raw.serialNumber === "string") input.serialNumber = raw.serialNumber;
  if (typeof raw.specifications === "string") input.specifications = raw.specifications;
  if (typeof raw.startDate === "string") input.startDate = raw.startDate;
  if (typeof raw.expirationDate === "string") input.expirationDate = raw.expirationDate;
  if (isHardwareStatus(raw.status)) input.status = raw.status;
  if (typeof raw.customer === "string") input.customer = raw.customer;
  else if (typeof raw.channelCustomer === "string") input.customer = raw.channelCustomer;
  if (typeof raw.customerContact === "string") input.customerContact = raw.customerContact;
  else if (typeof raw.channelContact === "string") input.customerContact = raw.channelContact;
  if (typeof raw.location === "string") input.location = raw.location;
  if (typeof raw.notes === "string") input.notes = raw.notes;

  try {
    const record = await updateHardwareRecord(id, input, session.username);
    return NextResponse.json({ ok: true, record }, { headers: NO_STORE });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update hardware asset.";
    return NextResponse.json({ error: message }, { status: 400, headers: NO_STORE });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403, headers: NO_STORE });
  }

  const session = await getPortalSessionFromCookies();
  if (!isPortalAdmin(session) || !session?.username) return unauthorized();

  const { id } = await context.params;

  try {
    await deleteHardwareRecord(id);
    return NextResponse.json({ ok: true }, { headers: NO_STORE });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to delete hardware asset.";
    return NextResponse.json({ error: message }, { status: 400, headers: NO_STORE });
  }
}

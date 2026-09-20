import { NextResponse } from "next/server";
import { isAllowedOrigin } from "@/lib/apiSecurity";
import { createHardwareRecord, listHardwareRecords } from "@/lib/hardwareStore";
import { isHardwareStatus, type HardwareInput } from "@/lib/hardwareTypes";
import { isPortalAdmin } from "@/lib/portalSession";
import { getPortalSessionFromCookies } from "@/lib/portalSessionServer";

const NO_STORE = { "Cache-Control": "no-store" };

function unauthorized() {
  return NextResponse.json({ error: "Administrator access required." }, { status: 403, headers: NO_STORE });
}

export async function GET() {
  const session = await getPortalSessionFromCookies();
  if (!isPortalAdmin(session)) return unauthorized();

  const records = await listHardwareRecords();
  return NextResponse.json({ records }, { headers: NO_STORE });
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403, headers: NO_STORE });
  }

  const session = await getPortalSessionFromCookies();
  if (!isPortalAdmin(session) || !session?.username) return unauthorized();

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
  const name = typeof raw.name === "string" ? raw.name : "";
  const model = typeof raw.model === "string" ? raw.model : "";
  const serialNumber = typeof raw.serialNumber === "string" ? raw.serialNumber : "";
  const specifications = typeof raw.specifications === "string" ? raw.specifications : "";
  const startDate = typeof raw.startDate === "string" ? raw.startDate : "";
  const expirationDate = typeof raw.expirationDate === "string" ? raw.expirationDate : "";
  const status = isHardwareStatus(raw.status) ? raw.status : "active";
  const customer = typeof raw.customer === "string" ? raw.customer : typeof raw.channelCustomer === "string" ? raw.channelCustomer : "";
  const customerContact = typeof raw.customerContact === "string" ? raw.customerContact : typeof raw.channelContact === "string" ? raw.channelContact : "";
  const location = typeof raw.location === "string" ? raw.location : "";
  const notes = typeof raw.notes === "string" ? raw.notes : "";

  const input: HardwareInput = {
    name,
    model,
    serialNumber,
    specifications,
    startDate,
    expirationDate,
    status,
    customer,
    customerContact,
    location,
    notes,
  };

  try {
    const record = await createHardwareRecord(input, session.username);
    return NextResponse.json({ ok: true, record }, { status: 201, headers: NO_STORE });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create hardware asset.";
    return NextResponse.json({ error: message }, { status: 400, headers: NO_STORE });
  }
}

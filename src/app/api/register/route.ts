import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  PORTAL_SESSION_COOKIE,
  parsePortalSessionToken,
  isPortalAdmin,
} from "@/lib/portalSession";
import { parseRegistrationBody, formatRegistrationEmail } from "@/lib/registrationForm";
import {
  createRegistration,
  listRegistrations,
  listRegistrationsByUsername,
} from "@/lib/registrationStore";
import { getPortalUserByUsername } from "@/lib/portalUserStore";
import { sendContactEmail } from "@/lib/email";
import {
  checkRateLimit,
  getClientIp,
  isAllowedOrigin,
  isHoneypotTriggered,
} from "@/lib/apiSecurity";

const NO_STORE = { "Cache-Control": "no-store" };

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(PORTAL_SESSION_COOKIE)?.value;
  const session = await parsePortalSessionToken(token);

  if (!session) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401, headers: NO_STORE });
  }

  const registrations = isPortalAdmin(session)
    ? await listRegistrations()
    : await listRegistrationsByUsername(session.username);

  return NextResponse.json(
    {
      registrations,
      canManageStatus: isPortalAdmin(session),
    },
    { headers: NO_STORE },
  );
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(PORTAL_SESSION_COOKIE)?.value;
  const session = await parsePortalSessionToken(token);

  if (!session) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401, headers: NO_STORE });
  }

  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403, headers: NO_STORE });
  }

  const clientIp = getClientIp(request);
  const rate = checkRateLimit(clientIp);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
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

  if (
    body &&
    typeof body === "object" &&
    isHoneypotTriggered((body as Record<string, unknown>).website)
  ) {
    return NextResponse.json({ ok: true }, { headers: NO_STORE });
  }

  const account = await getPortalUserByUsername(session.username);
  const partnerName = account?.partnerName?.trim() || "";
  if (!partnerName) {
    return NextResponse.json(
      { error: "Partner name is missing on this account. Please contact an administrator." },
      { status: 400, headers: NO_STORE },
    );
  }

  const payload =
    body && typeof body === "object"
      ? { ...(body as Record<string, unknown>), partnerName }
      : { partnerName };

  const parsed = parseRegistrationBody(payload);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400, headers: NO_STORE });
  }

  const record = await createRegistration(parsed.data, session.username);

  const { text } = formatRegistrationEmail(parsed.data);

  try {
    await sendContactEmail({
      name: parsed.data.partnerContact,
      email: parsed.data.partnerEmail,
      phone: parsed.data.partnerMobile,
      topic: "General enquiry",
      message: text,
    });
  } catch {
    // Persist succeeded; email is best-effort.
  }

  return NextResponse.json({ ok: true, registration: record }, { headers: NO_STORE });
}

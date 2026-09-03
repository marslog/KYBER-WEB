import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  PORTAL_SESSION_COOKIE,
  parsePortalSessionToken,
} from "@/lib/portalSession";
import { parseRegistrationBody, formatRegistrationEmail } from "@/lib/registrationForm";
import { sendContactEmail } from "@/lib/email";
import {
  checkRateLimit,
  getClientIp,
  isAllowedOrigin,
  isHoneypotTriggered,
} from "@/lib/apiSecurity";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(PORTAL_SESSION_COOKIE)?.value;
  const session = parsePortalSessionToken(token);

  if (!session) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const clientIp = getClientIp(request);
  const rate = checkRateLimit(clientIp);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: rate.retryAfterSec
          ? { "Retry-After": String(rate.retryAfterSec) }
          : undefined,
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (
    body &&
    typeof body === "object" &&
    isHoneypotTriggered((body as Record<string, unknown>).website)
  ) {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseRegistrationBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { subject, text, html } = formatRegistrationEmail(parsed.data);

  try {
    const result = await sendContactEmail({
      name: parsed.data.partnerContact,
      email: parsed.data.partnerEmail,
      phone: parsed.data.partnerMobile,
      topic: "General enquiry",
      message: text,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 503 });
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to send registration. Please try again or email us directly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}

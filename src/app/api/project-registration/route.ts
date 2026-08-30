import { NextResponse } from "next/server";
import { sendProjectRegistrationEmail } from "@/lib/email";
import { parseProjectRegistrationBody, PROJECT_REGISTRATION_SUBMISSION_ENABLED } from "@/lib/projectRegistration";
import {
  checkRateLimit,
  getClientIp,
  isAllowedOrigin,
  isHoneypotTriggered,
} from "@/lib/apiSecurity";

export async function POST(request: Request) {
  if (!PROJECT_REGISTRATION_SUBMISSION_ENABLED) {
    return NextResponse.json(
      { error: "Project registration is temporarily unavailable. Please contact us by email." },
      { status: 503 },
    );
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

  if (body && typeof body === "object" && isHoneypotTriggered((body as Record<string, unknown>).website)) {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseProjectRegistrationBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  if (parsed.data.projectDescription.length > 5000) {
    return NextResponse.json({ error: "Project description is too long." }, { status: 400 });
  }

  try {
    const result = await sendProjectRegistrationEmail(parsed.data);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 503 });
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to send registration email. Please try again or contact us directly." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { ok: true },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

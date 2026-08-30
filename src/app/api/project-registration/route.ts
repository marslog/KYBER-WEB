import { NextResponse } from "next/server";
import { sendProjectRegistrationEmail } from "@/lib/email";
import { parseProjectRegistrationBody } from "@/lib/projectRegistration";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = parseProjectRegistrationBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
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

  return NextResponse.json({ ok: true });
}

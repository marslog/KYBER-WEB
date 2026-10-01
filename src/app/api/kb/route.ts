import { NextResponse } from "next/server";
import { isAllowedOrigin } from "@/lib/apiSecurity";
import { getPortalSessionFromCookies } from "@/lib/portalSessionServer";
import { isPortalAdmin } from "@/lib/portalSession";
import { createKbPost, listKbPosts, type KbPostInput } from "@/lib/kbStore";

const NO_STORE = { "Cache-Control": "no-store" };

function unauthorized() {
  return NextResponse.json(
    { error: "Authentication required to access Knowledge Base." },
    { status: 401, headers: NO_STORE }
  );
}

function forbidden(msg = "Admin privileges required to perform this action.") {
  return NextResponse.json(
    { error: msg },
    { status: 403, headers: NO_STORE }
  );
}

export async function GET() {
  const session = await getPortalSessionFromCookies();
  if (!session) return unauthorized();

  const posts = await listKbPosts();
  return NextResponse.json(
    {
      posts,
      role: session.role,
      isAdmin: isPortalAdmin(session),
      username: session.username,
    },
    { headers: NO_STORE }
  );
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin." }, { status: 403, headers: NO_STORE });
  }

  const session = await getPortalSessionFromCookies();
  if (!session) return unauthorized();

  // Enforce Admin-only creation
  if (!isPortalAdmin(session)) {
    return forbidden("Read-only access: Admin privileges are required to create Knowledge Base posts.");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400, headers: NO_STORE });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload body." }, { status: 400, headers: NO_STORE });
  }

  const raw = body as Partial<KbPostInput>;
  if (!raw.title || typeof raw.title !== "string" || !raw.title.trim()) {
    return NextResponse.json({ error: "Post title is required." }, { status: 400, headers: NO_STORE });
  }

  if (!raw.content || typeof raw.content !== "string" || !raw.content.trim()) {
    return NextResponse.json({ error: "Post content is required." }, { status: 400, headers: NO_STORE });
  }

  try {
    const post = await createKbPost(
      {
        title: raw.title.trim(),
        category: (typeof raw.category === "string" ? raw.category.trim() : "") || "General",
        tags: Array.isArray(raw.tags) ? raw.tags : [],
        summary: typeof raw.summary === "string" ? raw.summary.trim() : "",
        content: raw.content.trim(),
      },
      session.username
    );

    return NextResponse.json({ ok: true, post }, { status: 201, headers: NO_STORE });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create Knowledge Base post.";
    return NextResponse.json({ error: message }, { status: 400, headers: NO_STORE });
  }
}

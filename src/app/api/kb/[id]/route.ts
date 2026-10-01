import { NextResponse } from "next/server";
import { isAllowedOrigin } from "@/lib/apiSecurity";
import { getPortalSessionFromCookies } from "@/lib/portalSessionServer";
import { isPortalAdmin } from "@/lib/portalSession";
import { getKbPostById, updateKbPost, deleteKbPost, type KbPostInput } from "@/lib/kbStore";

const NO_STORE = { "Cache-Control": "no-store" };

interface RouteContext {
  params: Promise<{ id: string }>;
}

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

export async function GET(_request: Request, context: RouteContext) {
  const session = await getPortalSessionFromCookies();
  if (!session) return unauthorized();

  const { id } = await context.params;
  const post = await getKbPostById(id);

  if (!post) {
    return NextResponse.json({ error: "Post not found." }, { status: 404, headers: NO_STORE });
  }

  return NextResponse.json({ post }, { headers: NO_STORE });
}

export async function PUT(request: Request, context: RouteContext) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin." }, { status: 403, headers: NO_STORE });
  }

  const session = await getPortalSessionFromCookies();
  if (!session) return unauthorized();

  // Enforce Admin-only edit
  if (!isPortalAdmin(session)) {
    return forbidden("Read-only access: Admin privileges are required to edit Knowledge Base posts.");
  }

  const { id } = await context.params;

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

  try {
    const updated = await updateKbPost(id, raw, session.username);
    return NextResponse.json({ ok: true, post: updated }, { headers: NO_STORE });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update post.";
    return NextResponse.json({ error: message }, { status: 400, headers: NO_STORE });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin." }, { status: 403, headers: NO_STORE });
  }

  const session = await getPortalSessionFromCookies();
  if (!session) return unauthorized();

  // Enforce Admin-only delete
  if (!isPortalAdmin(session)) {
    return forbidden("Read-only access: Admin privileges are required to delete Knowledge Base posts.");
  }

  const { id } = await context.params;

  try {
    const success = await deleteKbPost(id);
    if (!success) {
      return NextResponse.json({ error: "Post not found or already deleted." }, { status: 404, headers: NO_STORE });
    }
    return NextResponse.json({ ok: true, deletedId: id }, { headers: NO_STORE });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to delete post.";
    return NextResponse.json({ error: message }, { status: 400, headers: NO_STORE });
  }
}

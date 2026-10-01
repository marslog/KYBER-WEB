import { NextResponse } from "next/server";
import { getIsoRecordById } from "@/lib/isoStore";
import { getPortalSessionFromCookies } from "@/lib/portalSessionServer";
import { createReadStream } from "fs";
import { stat } from "fs/promises";
import { Readable } from "stream";

import path from "path";

const NO_STORE = { "Cache-Control": "no-store" };

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const session = await getPortalSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Authentication required to download ISO." }, { status: 403, headers: NO_STORE });
  }

  const { id } = await context.params;
  const record = await getIsoRecordById(id);

  if (!record) {
    return NextResponse.json({ error: "ISO image not found." }, { status: 404, headers: NO_STORE });
  }

  // If there's a physical file uploaded on disk
  if (record.filePath) {
    const candidates = [
      record.filePath,
      path.resolve(/*turbopackIgnore: true*/ process.cwd(), record.filePath),
      path.join(process.cwd(), "data", "uploads", "isos", path.basename(record.filePath)),
    ];

    let foundPath: string | null = null;
    let fileStat = null;

    for (const cand of candidates) {
      try {
        const s = await stat(/*turbopackIgnore: true*/ cand);
        if (s.isFile()) {
          foundPath = cand;
          fileStat = s;
          break;
        }
      } catch {
        // try next candidate
      }
    }

    if (foundPath && fileStat) {
      try {
        const stream = createReadStream(/*turbopackIgnore: true*/ foundPath);
        const webStream = Readable.toWeb(stream) as ReadableStream;
        const fallbackName = (record.name.replace(/[^a-zA-Z0-9._-]/g, "_") || "download") + ".iso";
        const downloadFilename = record.fileName || fallbackName;
        const safeAscii = downloadFilename.replace(/[^\w.-]/g, "_");
        const encoded = encodeURIComponent(downloadFilename);

        return new Response(webStream, {
          status: 200,
          headers: {
            "Content-Type": "application/octet-stream",
            "Content-Disposition": `attachment; filename="${safeAscii}"; filename*=UTF-8''${encoded}`,
            "Content-Length": String(fileStat.size),
            "Cache-Control": "private, max-age=3600",
          },
        });
      } catch (err) {
        console.error("[Download streaming error]:", err);
      }
    }
  }

  // If an external or relative URL exists
  if (record.downloadUrl && record.downloadUrl !== `/api/iso-downloads/${id}/download`) {
    if (record.downloadUrl.startsWith("http://") || record.downloadUrl.startsWith("https://")) {
      return NextResponse.redirect(record.downloadUrl);
    }
    return NextResponse.redirect(new URL(record.downloadUrl, request.url));
  }

  return NextResponse.json({ error: "Download file unavailable for this ISO image." }, { status: 404, headers: NO_STORE });
}

import { NextResponse } from "next/server";
import { getIsoRecordById } from "@/lib/isoStore";
import { getPortalSessionFromCookies } from "@/lib/portalSessionServer";
import { createReadStream } from "fs";
import { stat } from "fs/promises";
import { Readable } from "stream";

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
    try {
      const fileStat = await stat(record.filePath);
      if (fileStat.isFile()) {
        const stream = createReadStream(record.filePath);
        const webStream = Readable.toWeb(stream) as ReadableStream;
        const fallbackName = (record.name.replace(/[^a-zA-Z0-9._-]/g, "_") || "download") + ".iso";
        const downloadFilename = record.fileName || fallbackName;

        return new NextResponse(webStream, {
          status: 200,
          headers: {
            "Content-Type": "application/x-iso9660-image",
            "Content-Disposition": `attachment; filename="${downloadFilename}"`,
            "Content-Length": String(fileStat.size),
            "Cache-Control": "private, max-age=3600",
          },
        });
      }
    } catch {
      // File missing on disk, fallback to downloadUrl if available
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

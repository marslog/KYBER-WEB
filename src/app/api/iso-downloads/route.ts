import { NextResponse } from "next/server";
import { isAllowedOrigin } from "@/lib/apiSecurity";
import { createIsoRecord, listIsoRecords } from "@/lib/isoStore";
import type { IsoInput } from "@/lib/isoStore";
import { getPortalSessionFromCookies } from "@/lib/portalSessionServer";
import { mkdir } from "fs/promises";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { Readable } from "stream";
import path from "path";
import { createHash, randomUUID } from "crypto";

const NO_STORE = { "Cache-Control": "no-store" };

function unauthorized() {
  return NextResponse.json(
    { error: "Login required to access ISO downloads." },
    { status: 403, headers: NO_STORE },
  );
}

export async function GET() {
  const session = await getPortalSessionFromCookies();
  if (!session) return unauthorized();

  const records = await listIsoRecords();
  return NextResponse.json({ records }, { headers: NO_STORE });
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403, headers: NO_STORE });
  }

  const session = await getPortalSessionFromCookies();
  if (!session?.username) return unauthorized();

  const contentType = request.headers.get("content-type") || "";

  let name = "";
  let version = "";
  let sha256 = "";
  let downloadUrl = "";
  let uploadDate = "";
  let notes = "";
  let fileName: string | undefined;
  let fileSize: number | undefined;
  let filePath: string | undefined;

  if (contentType.includes("application/octet-stream") || request.headers.get("x-iso-filename")) {
    try {
      fileName = decodeURIComponent(request.headers.get("x-iso-filename") || "uploaded.iso");
      name = decodeURIComponent(request.headers.get("x-iso-name") || "").trim() || fileName.replace(/\.[^/.]+$/, "");
      version = decodeURIComponent(request.headers.get("x-iso-version") || "").trim();
      uploadDate = request.headers.get("x-iso-date") || new Date().toISOString().slice(0, 10);
      notes = decodeURIComponent(request.headers.get("x-iso-notes") || "").trim();
      const sizeHeader = request.headers.get("x-iso-filesize") || request.headers.get("content-length");
      fileSize = sizeHeader ? parseInt(sizeHeader, 10) : undefined;

      if (!request.body) {
        return NextResponse.json({ error: "No file content received." }, { status: 400, headers: NO_STORE });
      }

      const uploadsDir = path.join(process.cwd(), "data", "uploads", "isos");
      await mkdir(uploadsDir, { recursive: true });

      const safeId = randomUUID();
      const sanitized = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
      const diskTarget = path.join(uploadsDir, `${safeId}-${sanitized}`);

      const writeStream = createWriteStream(diskTarget);
      const nodeStream = Readable.fromWeb(request.body as any);
      const hasher = createHash("sha256");

      nodeStream.on("data", (chunk) => {
        hasher.update(chunk);
      });

      await pipeline(nodeStream, writeStream);

      filePath = diskTarget;
      sha256 = hasher.digest("hex");
    } catch (err) {
      console.error("[POST /api/iso-downloads raw stream error]:", err);
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "Failed to process streamed file." },
        { status: 400, headers: NO_STORE }
      );
    }
  } else if (contentType.includes("multipart/form-data")) {
    try {
      const formData = await request.formData();
      name = (formData.get("name") as string) || "";
      version = (formData.get("version") as string) || "";
      uploadDate = (formData.get("uploadDate") as string) || "";
      notes = (formData.get("notes") as string) || "";
      sha256 = (formData.get("sha256") as string) || "";
      downloadUrl = (formData.get("downloadUrl") as string) || "";

      const file = formData.get("file") as File | null;
      if (file && typeof file === "object" && file.size > 0) {
        fileName = file.name;
        fileSize = file.size;

        if (!name.trim()) {
          name = (file.name ? file.name.replace(/\.[^/.]+$/, "") : "KYBER-ISO").trim() || "KYBER-ISO";
        }

        const uploadsDir = path.join(process.cwd(), "data", "uploads", "isos");
        await mkdir(uploadsDir, { recursive: true });

        const safeId = randomUUID();
        const sanitized = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const diskTarget = path.join(uploadsDir, `${safeId}-${sanitized}`);

        const writeStream = createWriteStream(diskTarget);
        let nodeStream: Readable;
        if (typeof file.stream === "function") {
          nodeStream = Readable.fromWeb(file.stream() as any);
        } else {
          const ab = await file.arrayBuffer();
          nodeStream = Readable.from(Buffer.from(ab));
        }

        const hasher = createHash("sha256");
        nodeStream.on("data", (chunk) => {
          hasher.update(chunk);
        });

        await pipeline(nodeStream, writeStream);

        filePath = diskTarget;
        if (!sha256) {
          sha256 = hasher.digest("hex");
        }
      }
    } catch (err) {
      console.error("[POST /api/iso-downloads upload error]:", err);
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "Failed to process uploaded file." },
        { status: 400, headers: NO_STORE }
      );
    }
  } else {
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
    name = typeof raw.name === "string" ? raw.name : "";
    version = typeof raw.version === "string" ? raw.version : "";
    sha256 = typeof raw.sha256 === "string" ? raw.sha256 : "";
    downloadUrl = typeof raw.downloadUrl === "string" ? raw.downloadUrl : "";
    uploadDate = typeof raw.uploadDate === "string" ? raw.uploadDate : "";
    notes = typeof raw.notes === "string" ? raw.notes : "";
  }

  const input: IsoInput = {
    name,
    version,
    sha256,
    downloadUrl,
    fileName,
    fileSize,
    filePath,
    uploadDate,
    notes,
  };

  try {
    const record = await createIsoRecord(input, session.username);
    return NextResponse.json({ ok: true, record }, { status: 201, headers: NO_STORE });
  } catch (error) {
    console.error("[POST /api/iso-downloads creation error]:", error);
    const message = error instanceof Error ? error.message : "Unable to create ISO record.";
    return NextResponse.json({ error: message }, { status: 400, headers: NO_STORE });
  }
}

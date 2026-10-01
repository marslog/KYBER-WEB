import { mkdir, readFile, writeFile, unlink } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export interface IsoRecord {
  id: string;
  name: string;
  version: string;
  sha256: string;
  downloadUrl: string;
  fileName?: string;
  fileSize?: number;
  filePath?: string;
  uploadDate: string; // YYYY-MM-DD
  notes: string;
  createdBy: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface IsoInput {
  name: string;
  version: string;
  sha256?: string;
  downloadUrl?: string;
  fileName?: string;
  fileSize?: number;
  filePath?: string;
  uploadDate: string;
  notes: string;
}

interface IsoStoreFile {
  version: 1;
  items: IsoRecord[];
}

const STORE_PATH = path.join(process.cwd(), "data", "iso-downloads.json");

let memoryStore: IsoStoreFile | null = null;

function nowIso(): string {
  return new Date().toISOString();
}

function todayYmd(): string {
  return new Date().toISOString().slice(0, 10);
}

function createSeedStore(): IsoStoreFile {
  const timestamp = nowIso();
  return {
    version: 1,
    items: [
      {
        id: randomUUID(),
        name: "KYBER HCI OS",
        version: "5.2.1",
        sha256:
          "a3f8c2d4e1b90f6572c84a5b9d3e7f1a2c0d4e6f8b2a4c6d8e0f2a4b6c8d0e2",
        downloadUrl: "/contact#get-a-quote",
        uploadDate: "2026-08-15",
        notes: "Stable production release for KYBER HCI nodes.",
        createdBy: "kyber",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
      {
        id: randomUUID(),
        name: "KYBER KSV Hypervisor",
        version: "4.1.0",
        sha256:
          "b7e2d0c4f6a8e0b2d4f6a8c0e2b4d6f8a0c2e4b6d8f0a2c4e6b8d0f2a4c6e8",
        downloadUrl: "/contact#get-a-quote",
        uploadDate: "2026-07-22",
        notes: "Includes VMware OVA/OVF import enhancements.",
        createdBy: "kyber",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
      {
        id: randomUUID(),
        name: "MARSLOQ Appliance ISO",
        version: "3.0.5",
        sha256:
          "c1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1",
        downloadUrl: "/contact#get-a-quote",
        uploadDate: "2026-09-01",
        notes: "MARSLOQ with bundled Grok parser and Thai LLM assistant.",
        createdBy: "kyber",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ],
  };
}

async function persistStore(store: IsoStoreFile): Promise<void> {
  memoryStore = store;
  try {
    await mkdir(path.dirname(STORE_PATH), { recursive: true });
    await writeFile(/*turbopackIgnore: true*/ STORE_PATH, JSON.stringify(store, null, 2), "utf8");
  } catch {
    // Serverless read-only filesystem fallback to memory
  }
}

async function loadStore(): Promise<IsoStoreFile> {
  try {
    const raw = await readFile(/*turbopackIgnore: true*/ STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as IsoStoreFile;
    if (parsed?.version === 1 && Array.isArray(parsed.items)) {
      memoryStore = parsed;
      return parsed;
    }
  } catch {
    // fallback to memoryStore or seed
  }

  if (memoryStore) return memoryStore;

  const seeded = createSeedStore();
  await persistStore(seeded);
  return seeded;
}

export async function listIsoRecords(): Promise<IsoRecord[]> {
  const store = await loadStore();
  return [...store.items].sort((a, b) => b.uploadDate.localeCompare(a.uploadDate));
}

export async function getIsoRecordById(id: string): Promise<IsoRecord | null> {
  const store = await loadStore();
  return store.items.find((item) => item.id === id) || null;
}

export async function createIsoRecord(
  input: IsoInput,
  createdBy: string,
): Promise<IsoRecord> {
  if (!input.name.trim()) throw new Error("ISO name is required.");

  const store = await loadStore();
  const timestamp = nowIso();
  const recordId = randomUUID();
  const record: IsoRecord = {
    id: recordId,
    name: input.name.trim(),
    version: input.version.trim(),
    sha256: input.sha256 ? input.sha256.trim().toLowerCase() : "",
    downloadUrl: input.downloadUrl ? input.downloadUrl.trim() : `/api/iso-downloads/${recordId}/download`,
    fileName: input.fileName?.trim() || undefined,
    fileSize: typeof input.fileSize === "number" ? input.fileSize : undefined,
    filePath: input.filePath?.trim() || undefined,
    uploadDate: input.uploadDate || todayYmd(),
    notes: input.notes.trim(),
    createdBy,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  store.items.push(record);
  await persistStore(store);
  return record;
}

export async function updateIsoRecord(
  id: string,
  input: Partial<IsoInput>,
  updatedBy: string,
): Promise<IsoRecord> {
  const store = await loadStore();
  const idx = store.items.findIndex((item) => item.id === id);
  if (idx === -1) throw new Error("ISO record not found.");

  const existing = store.items[idx]!;
  const updated: IsoRecord = {
    ...existing,
    ...(input.name !== undefined && { name: input.name.trim() }),
    ...(input.version !== undefined && { version: input.version.trim() }),
    ...(input.sha256 !== undefined && { sha256: input.sha256.trim().toLowerCase() }),
    ...(input.downloadUrl !== undefined && { downloadUrl: input.downloadUrl.trim() }),
    ...(input.fileName !== undefined && { fileName: input.fileName }),
    ...(input.fileSize !== undefined && { fileSize: input.fileSize }),
    ...(input.filePath !== undefined && { filePath: input.filePath }),
    ...(input.uploadDate !== undefined && { uploadDate: input.uploadDate }),
    ...(input.notes !== undefined && { notes: input.notes }),
    updatedAt: new Date().toISOString(),
  };

  void updatedBy; // audit trail placeholder
  store.items[idx] = updated;
  await persistStore(store);
  return updated;
}

export async function deleteIsoRecord(id: string): Promise<void> {
  const store = await loadStore();
  const idx = store.items.findIndex((item) => item.id === id);
  if (idx === -1) throw new Error("ISO record not found.");
  const [removed] = store.items.splice(idx, 1);
  if (removed?.filePath) {
    try {
      await unlink(removed.filePath);
    } catch {
      // ignore if file doesn't exist on disk
    }
  }
  await persistStore(store);
}

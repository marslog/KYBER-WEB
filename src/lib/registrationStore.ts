import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import type { PartnerRegistrationPayload } from "@/lib/registrationForm";
import type { PartnerRegistrationRecord, RegistrationStatus } from "@/lib/registrationTypes";

export type { PartnerRegistrationRecord, RegistrationStatus };
export { isRegistrationStatus, REGISTRATION_STATUSES } from "@/lib/registrationTypes";

interface RegistrationStoreFile {
  version: 1;
  registrations: PartnerRegistrationRecord[];
}

const STORE_PATH =
  process.env.PORTAL_REGISTRATIONS_FILE?.trim() ||
  path.join(process.cwd(), "data", "registrations.json");

let memoryStore: RegistrationStoreFile | null = null;

function nowIso(): string {
  return new Date().toISOString();
}

function emptyStore(): RegistrationStoreFile {
  return { version: 1, registrations: [] };
}

async function persistStore(store: RegistrationStoreFile): Promise<void> {
  memoryStore = store;
  try {
    await mkdir(path.dirname(STORE_PATH), { recursive: true });
    await writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
  } catch {
    // Serverless filesystem may be read-only; keep in-memory for this instance.
  }
}

async function loadStore(): Promise<RegistrationStoreFile> {
  if (memoryStore) return memoryStore;

  try {
    const raw = await readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as RegistrationStoreFile;
    if (parsed?.version === 1 && Array.isArray(parsed.registrations)) {
      memoryStore = parsed;
      return parsed;
    }
  } catch {
    // Seed on first use.
  }

  const seeded = emptyStore();
  await persistStore(seeded);
  return seeded;
}

export async function listRegistrations(): Promise<PartnerRegistrationRecord[]> {
  const store = await loadStore();
  return [...store.registrations].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function listRegistrationsByUsername(
  username: string,
): Promise<PartnerRegistrationRecord[]> {
  const all = await listRegistrations();
  return all.filter((entry) => entry.submittedBy === username);
}

export async function createRegistration(
  data: PartnerRegistrationPayload,
  submittedBy: string,
): Promise<PartnerRegistrationRecord> {
  const store = await loadStore();
  const timestamp = nowIso();
  const record: PartnerRegistrationRecord = {
    ...data,
    id: randomUUID(),
    status: "pending",
    submittedBy,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  store.registrations.push(record);
  await persistStore(store);
  return record;
}

export async function updateRegistrationStatus(
  id: string,
  status: RegistrationStatus,
): Promise<PartnerRegistrationRecord | null> {
  const store = await loadStore();
  const record = store.registrations.find((entry) => entry.id === id);
  if (!record) return null;

  record.status = status;
  record.updatedAt = nowIso();
  await persistStore(store);
  return record;
}

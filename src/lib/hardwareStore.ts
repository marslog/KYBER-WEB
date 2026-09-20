import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import type { HardwareInput, HardwareRecord } from "@/lib/hardwareTypes";

interface HardwareStoreFile {
  version: 1;
  items: HardwareRecord[];
}

const STORE_PATH =
  process.env.PORTAL_HARDWARE_FILE?.trim() ||
  path.join(process.cwd(), "data", "hardware-inventory.json");

let memoryStore: HardwareStoreFile | null = null;

function nowIso(): string {
  return new Date().toISOString();
}

function createSeedStore(): HardwareStoreFile {
  const timestamp = nowIso();
  return {
    version: 1,
    items: [
      {
        id: randomUUID(),
        name: "KYBER HCI Enterprise Node A1",
        model: "KYBER-HCI-5000",
        serialNumber: "SN-98472-X1",
        specifications: "64-Core AMD EPYC 9554, 512GB DDR5 RAM, 8x 3.84TB NVMe SSD, Dual 25GbE SFP28 Ports",
        startDate: "2024-03-15",
        expirationDate: "2027-03-15",
        status: "active",
        customer: "Bangkok Bank PCL",
        customerContact: "Somchai Jaidee (IT Infrastructure Lead)",
        location: "Datacenter Alpha - Rack R-04 (U12-U14)",
        notes: "Primary HCI compute node for cluster pool Alpha",
        createdBy: "kyber",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
      {
        id: randomUUID(),
        name: "MARSLOQ Observability Appliance",
        model: "MSL-8110-GROK",
        serialNumber: "MSL-2024-8831",
        specifications: "32-Core Intel Xeon Gold 6430, 256GB DDR5 ECC, 12x 7.68TB Enterprise SAS SSD, Quad 10GbE",
        startDate: "2023-11-01",
        expirationDate: "2026-11-01",
        status: "active",
        customer: "Advanced Info Service (AIS)",
        customerContact: "Kittisak S. (SOC Manager)",
        location: "Datacenter Alpha - Rack R-02 (U08)",
        notes: "Centralized syslog parser and OpenSearch indexing server",
        createdBy: "kyber",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
      {
        id: randomUUID(),
        name: "KYBER KSAN SAN Storage Array",
        model: "KSAN-ARRAY-9000",
        serialNumber: "KSAN-77401-SAN",
        specifications: "Dual Redundant Controllers, 24x 15.36TB NVMe All-Flash Expansion, 100GbE RoCEv2 Fabric",
        startDate: "2022-06-10",
        expirationDate: "2025-06-10",
        status: "maintenance",
        customer: "Siam Commercial Bank (SCB)",
        customerContact: "Niran P. (Storage Specialist)",
        location: "Datacenter Beta - Rack B-01 (U01-U04)",
        notes: "Scheduled controller firmware update and drive health check",
        createdBy: "kyber",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
      {
        id: randomUUID(),
        name: "Edge Gateway Router Node",
        model: "KYBER-EDGE-100",
        serialNumber: "EDGE-10294-GW",
        specifications: "8-Core Intel Atom X6425RE, 32GB RAM, 2x 512GB M.2 NVMe, 6x 2.5GbE RJ45",
        startDate: "2021-01-20",
        expirationDate: "2024-01-20",
        status: "expired",
        customer: "PTT Public Company Limited",
        customerContact: "Anan T. (Network Engineer)",
        location: "Branch Office - Node Rack 01",
        notes: "Warranty expired. Pending hardware refresh proposal.",
        createdBy: "kyber",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ],
  };
}

async function persistStore(store: HardwareStoreFile): Promise<void> {
  memoryStore = store;
  try {
    await mkdir(path.dirname(STORE_PATH), { recursive: true });
    await writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
  } catch {
    // Serverless read-only filesystem fallback to memory
  }
}

async function loadStore(): Promise<HardwareStoreFile> {
  if (memoryStore) return memoryStore;

  try {
    const raw = await readFile(/*turbopackIgnore: true*/ STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as HardwareStoreFile;
    if (parsed?.version === 1 && Array.isArray(parsed.items)) {
      memoryStore = parsed;
      return parsed;
    }
  } catch {
    // Seed on first read
  }

  const seeded = createSeedStore();
  await persistStore(seeded);
  return seeded;
}

export async function listHardwareRecords(): Promise<HardwareRecord[]> {
  const store = await loadStore();
  return [...store.items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getHardwareRecordById(id: string): Promise<HardwareRecord | null> {
  const store = await loadStore();
  return store.items.find((item) => item.id === id) || null;
}

export async function createHardwareRecord(
  input: HardwareInput,
  createdBy: string,
): Promise<HardwareRecord> {
  const store = await loadStore();

  const name = input.name.trim();
  const model = input.model.trim();
  const serialNumber = input.serialNumber.trim();
  const specifications = input.specifications.trim();
  const startDate = input.startDate.trim();
  const expirationDate = input.expirationDate.trim();

  if (!name) throw new Error("Asset Name is required.");
  if (!model) throw new Error("Hardware Model is required.");
  if (!serialNumber) throw new Error("Serial Number is required.");
  if (!specifications) throw new Error("Specifications are required.");
  if (!startDate) throw new Error("Start Date is required.");
  if (!expirationDate) throw new Error("Expiration Date is required.");

  if (store.items.some((item) => item.serialNumber.toLowerCase() === serialNumber.toLowerCase())) {
    throw new Error(`Serial Number "${serialNumber}" is already logged in hardware inventory.`);
  }

  const timestamp = nowIso();
  const record: HardwareRecord = {
    id: randomUUID(),
    name,
    model,
    serialNumber,
    specifications,
    startDate,
    expirationDate,
    status: input.status || "active",
    customer: input.customer?.trim() || "",
    customerContact: input.customerContact?.trim() || "",
    location: input.location?.trim() || "",
    notes: input.notes?.trim() || "",
    createdBy,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  store.items.push(record);
  await persistStore(store);
  return record;
}

export async function updateHardwareRecord(
  id: string,
  input: Partial<HardwareInput>,
  actorUsername: string,
): Promise<HardwareRecord> {
  const store = await loadStore();
  const index = store.items.findIndex((item) => item.id === id);
  if (index < 0) throw new Error("Hardware asset not found.");

  const current = store.items[index];

  const nextSerial = input.serialNumber !== undefined ? input.serialNumber.trim() : current.serialNumber;
  if (!nextSerial) throw new Error("Serial Number cannot be empty.");

  if (
    store.items.some(
      (item) => item.id !== id && item.serialNumber.toLowerCase() === nextSerial.toLowerCase(),
    )
  ) {
    throw new Error(`Serial Number "${nextSerial}" is already logged by another asset.`);
  }

  const updated: HardwareRecord = {
    ...current,
    name: input.name !== undefined ? input.name.trim() : current.name,
    model: input.model !== undefined ? input.model.trim() : current.model,
    serialNumber: nextSerial,
    specifications: input.specifications !== undefined ? input.specifications.trim() : current.specifications,
    startDate: input.startDate !== undefined ? input.startDate.trim() : current.startDate,
    expirationDate: input.expirationDate !== undefined ? input.expirationDate.trim() : current.expirationDate,
    status: input.status !== undefined ? input.status : current.status,
    customer: input.customer !== undefined ? input.customer.trim() : current.customer,
    customerContact: input.customerContact !== undefined ? input.customerContact.trim() : current.customerContact,
    location: input.location !== undefined ? input.location.trim() : current.location,
    notes: input.notes !== undefined ? input.notes.trim() : current.notes,
    updatedAt: nowIso(),
  };

  store.items[index] = updated;
  await persistStore(store);
  return updated;
}

export async function deleteHardwareRecord(id: string): Promise<void> {
  const store = await loadStore();
  const index = store.items.findIndex((item) => item.id === id);
  if (index < 0) throw new Error("Hardware asset not found.");

  store.items.splice(index, 1);
  await persistStore(store);
}

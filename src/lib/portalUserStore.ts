import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { hashPortalPassword, verifyPortalPassword } from "@/lib/portalPassword";
import { getPortalAdminCredentials } from "@/lib/portalSession";
import {
  EMPTY_PARTNER_PROFILE,
  readPartnerProfile,
  type PartnerProfile,
} from "@/lib/partnerProfile";

export type PortalRole = "admin" | "user";

export interface PortalUserRecord extends PartnerProfile {
  id: string;
  username: string;
  passwordHash: string;
  role: PortalRole;
  createdAt: string;
  updatedAt: string;
}

export interface PortalUserPublic extends PartnerProfile {
  id: string;
  username: string;
  role: PortalRole;
  createdAt: string;
  updatedAt: string;
}

interface PortalUserStoreFile {
  version: 1;
  users: PortalUserRecord[];
}

const STORE_PATH =
  process.env.PORTAL_USERS_FILE?.trim() ||
  path.join(process.cwd(), "data", "portal-users.json");

let memoryStore: PortalUserStoreFile | null = null;

function nowIso(): string {
  return new Date().toISOString();
}

function toPublicUser(user: PortalUserRecord): PortalUserPublic {
  return {
    id: user.id,
    username: user.username,
    role: user.role,
    ...readPartnerProfile(user),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function createSeedStore(): PortalUserStoreFile {
  const { username, password } = getPortalAdminCredentials();
  const timestamp = nowIso();

  return {
    version: 1,
    users: [
      {
        id: randomUUID(),
        username,
        passwordHash: hashPortalPassword(password),
        role: "admin",
        ...EMPTY_PARTNER_PROFILE,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ],
  };
}

async function persistStore(store: PortalUserStoreFile): Promise<void> {
  memoryStore = store;
  try {
    await mkdir(path.dirname(STORE_PATH), { recursive: true });
    await writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
  } catch {
    // Serverless filesystem may be read-only; keep in-memory for this instance.
  }
}

async function loadStore(): Promise<PortalUserStoreFile> {
  if (memoryStore) return memoryStore;

  try {
    const raw = await readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as PortalUserStoreFile;
    if (parsed?.version === 1 && Array.isArray(parsed.users)) {
      parsed.users = parsed.users.map((user) => ({
        ...user,
        ...readPartnerProfile(user),
      }));
      memoryStore = parsed;
      return parsed;
    }
  } catch {
    // Seed on first use.
  }

  const seeded = createSeedStore();
  await persistStore(seeded);
  return seeded;
}

export async function listPortalUsers(): Promise<PortalUserPublic[]> {
  const store = await loadStore();
  return store.users.map(toPublicUser);
}

export async function authenticatePortalUser(
  username: string,
  password: string,
): Promise<PortalUserPublic | null> {
  const store = await loadStore();
  const user = store.users.find((entry) => entry.username === username);
  if (!user || !verifyPortalPassword(password, user.passwordHash)) return null;
  return toPublicUser(user);
}

export async function createPortalUser(input: {
  username: string;
  password: string;
  role: PortalRole;
} & PartnerProfile): Promise<PortalUserPublic> {
  const store = await loadStore();
  const username = input.username.trim();
  const partner = readPartnerProfile(input);

  if (!username) throw new Error("Username is required.");
  if (!input.password) throw new Error("Password is required.");
  if (!partner.partnerName) {
    throw new Error("Partner name is required.");
  }
  if (store.users.some((user) => user.username === username)) {
    throw new Error("Username already exists.");
  }

  const timestamp = nowIso();
  const user: PortalUserRecord = {
    id: randomUUID(),
    username,
    passwordHash: hashPortalPassword(input.password),
    role: input.role,
    ...partner,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  store.users.push(user);
  await persistStore(store);
  return toPublicUser(user);
}

export async function updatePortalUser(
  id: string,
  input: {
    username?: string;
    password?: string;
    role?: PortalRole;
  } & Partial<PartnerProfile>,
  actorUsername: string,
): Promise<PortalUserPublic> {
  const store = await loadStore();
  const index = store.users.findIndex((user) => user.id === id);
  if (index < 0) throw new Error("User not found.");

  const current = store.users[index];
  const nextUsername = input.username?.trim() || current.username;
  const nextPartner = readPartnerProfile({
    partnerName: input.partnerName ?? current.partnerName,
    partnerContact: input.partnerContact ?? current.partnerContact,
    partnerPosition: input.partnerPosition ?? current.partnerPosition,
    partnerMobile: input.partnerMobile ?? current.partnerMobile,
    partnerEmail: input.partnerEmail ?? current.partnerEmail,
  });

  if (!nextUsername) throw new Error("Username is required.");
  if (!nextPartner.partnerName) throw new Error("Partner name is required.");
  if (store.users.some((user) => user.id !== id && user.username === nextUsername)) {
    throw new Error("Username already exists.");
  }

  const nextRole = input.role ?? current.role;
  const adminCount = store.users.filter((user) => user.role === "admin").length;
  const isLastAdmin = current.role === "admin" && adminCount <= 1;

  if (isLastAdmin && nextRole !== "admin") {
    throw new Error("At least one administrator account is required.");
  }

  if (current.username === actorUsername && nextRole !== "admin" && isLastAdmin) {
    throw new Error("You cannot remove your own administrator role.");
  }

  const updated: PortalUserRecord = {
    ...current,
    username: nextUsername,
    role: nextRole,
    ...nextPartner,
    passwordHash: input.password ? hashPortalPassword(input.password) : current.passwordHash,
    updatedAt: nowIso(),
  };

  store.users[index] = updated;
  await persistStore(store);
  return toPublicUser(updated);
}

export async function deletePortalUser(id: string, actorUsername: string): Promise<void> {
  const store = await loadStore();
  const user = store.users.find((entry) => entry.id === id);
  if (!user) throw new Error("User not found.");

  if (user.username === actorUsername) {
    throw new Error("You cannot delete your own account while signed in.");
  }

  const adminCount = store.users.filter((entry) => entry.role === "admin").length;
  if (user.role === "admin" && adminCount <= 1) {
    throw new Error("At least one administrator account is required.");
  }

  store.users = store.users.filter((entry) => entry.id !== id);
  await persistStore(store);
}

export async function getPortalUserByUsername(username: string): Promise<PortalUserPublic | null> {
  const store = await loadStore();
  const user = store.users.find((entry) => entry.username === username);
  return user ? toPublicUser(user) : null;
}

import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export interface KbPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  summary: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface KbPostInput {
  title: string;
  category: string;
  tags?: string[];
  summary: string;
  content: string;
}

interface KbStoreFile {
  version: 1;
  items: KbPost[];
}

const STORE_PATH =
  process.env.PORTAL_KB_FILE?.trim() ||
  path.join(process.cwd(), "data", "kb-posts.json");

let memoryStore: KbStoreFile | null = null;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createSeedStore(): KbStoreFile {
  const now = new Date().toISOString();
  return {
    version: 1,
    items: [
      {
        id: "kb-001-hci-install",
        title: "KYBER HCI Node Deployment & OS Installation Guide",
        slug: "kyber-hci-node-deployment-os-installation-guide",
        category: "Installation Guide",
        tags: ["HCI", "Baremetal", "UEFI", "ISO", "Deployment"],
        summary:
          "Complete bare-metal installation procedure for KYBER HCI OS from bootable ISO, including UEFI prerequisites, storage disk allocation, and cluster joining.",
        content: `## 1. Prerequisites & Hardware Checklist

Before initiating the KYBER HCI OS installation, verify that the target bare-metal server satisfies the minimum enterprise specifications:

- **Processor**: Dual AMD EPYC 7003/9004 or Intel Xeon Scalable (minimum 32 cores recommended)
- **RAM**: Minimum 128 GB DDR4/DDR5 ECC Registered
- **Boot Media**: Dedicated RAID-1 M.2 NVMe (minimum 240 GB) or BOSS card for OS
- **Data Drives**: SAS-3 or NVMe SSDs configured in pass-through / HBA mode (JBOD, hardware RAID disabled)
- **Network**: Dual 10GbE or 25GbE SFP28 interfaces for cluster interconnect and VM trunking
- **IPMI / Out-of-band**: Configured iDRAC / iLO / IPMI interface with virtual media access

## 2. BIOS / UEFI Configuration

1. Power on the server and enter **BIOS Setup** (press \`F2\` or \`Del\`).
2. Set Boot Mode to **UEFI Only** (Legacy BIOS is not supported).
3. Disable **Secure Boot** if deploying custom storage drivers; otherwise keep Secure Boot **Enabled**.
4. Enable **Virtualization Technologies**:
   - Intel: \`Intel Virtualization Technology (VT-x)\` and \`VT-d\`
   - AMD: \`SVM Mode\` and \`IOMMU\`
5. In Storage Controller settings, ensure SATA/SAS controller is set to **AHCI / HBA / IT Mode**.
6. Set Power Management profile to **Maximum Performance** or **OS Controlled Performance**.

## 3. Booting the KYBER OS ISO

1. Download the latest **KYBER HCI OS ISO** from the Portal ISO Downloads menu.
2. Mount the ISO via IPMI Virtual Console or flash onto a USB flash drive:
   \`\`\`bash
   dd if=kyber-hci.v.2.2.11.iso of=/dev/sdX bs=4M status=progress conv=fdatasync
   \`\`\`
3. Reboot the server and press \`F11\` / \`F12\` for the Boot Menu.
4. Select the UEFI Virtual CD/DVD or USB drive.

## 4. Step-by-Step Installation Wizard

1. **Language & Keyboard**: Select \`English (US)\`.
2. **Installation Target**: Select the dedicated OS RAID-1 mirror pair. Do not select storage SSDs intended for the cluster storage pool.
3. **Network Configuration**:
   - Primary Interface: \`eth0\` or \`mgmt0\`
   - IP Assignment: Static IPv4 (e.g. \`10.10.10.21/24\`)
   - Default Gateway: \`10.10.10.1\`
   - DNS Servers: \`10.10.10.2, 10.10.10.3\`
   - Hostname: \`kyber-node-01.corp.internal\`
4. **Root Password & SSH Key**: Provide a strong root credential and paste administrative SSH public keys.
5. Click **Begin Installation**. The OS installation will format target partitions, unpack core hypervisor packages, and reboot within 5-8 minutes.

## 5. Post-Installation Verification

Once the system reboots into KYBER HCI OS, access the node via SSH or web console at \`https://10.10.10.21:8443\`:

\`\`\`bash
# Verify hypervisor status
systemctl status kyber-hypervisor

# Check detected NVMe & SAS storage disks
kyber-cli storage disk list

# Verify cluster network connectivity
kyber-cli network status
\`\`\`

You can now proceed to join this node into an existing KYBER HCI cluster pool or initialize a new cluster.`,
        author: "kyber",
        createdAt: "2026-09-15T08:00:00.000Z",
        updatedAt: now,
      },
      {
        id: "kb-002-marsloq-install",
        title: "MARSLOQ v2.1.3 Appliance Offline Setup & EPS Governance",
        slug: "marsloq-v213-appliance-offline-setup-eps-governance",
        category: "Installation Guide",
        tags: ["MARSLOQ", "Appliance", "EPS", "Docker", "Setup"],
        summary:
          "Installation and initial configuration walkthrough for the offline MARSLOQ Log Appliance ISO, containerized parser deployment, and EPS admission control thresholds.",
        content: `## 1. Overview of MARSLOQ v2.1.3 Appliance

MARSLOQ v2.1.3 is an all-in-one on-premise log collection, parsing, indexing, and compliance storage system. The offline installation ISO includes all pre-baked container images, OpenSearch 2.x binaries, Logstash pipelines, and Thai NLP / AI models without requiring internet access.

## 2. Installation Steps

1. Boot the server or virtual machine (minimum 8 vCPU, 32 GB RAM, 500 GB NVMe for Hot Tier) using \`marslog-appliance-sa.v2.1.3-20261001.iso\`.
2. Select **Automated MARSLOQ Installation** from the boot menu.
3. Partitioning will automatically configure:
   - \`/boot/efi\` (1 GB)
   - \`/\` OS root (100 GB)
   - \`/var/lib/marsloq/data\` (Remaining capacity with XFS filesystem)
4. Allow the unattended installation to complete and remove installation media upon reboot.

## 3. First-Time Initialization

Log in via console or SSH using the default administrator credential:

\`\`\`bash
# Check containerized stack health
marsloq-ctl status

# Initialize TLS certificates and admin passwords
sudo marsloq-ctl init-security --domain log.corp.internal
\`\`\`

## 4. Configuring EPS Admission Control

To protect the indexing cluster from out-of-memory crashes during high-volume spikes (e.g. Windows Security Event storms or firewall session surges), configure the admission limits in \`/etc/marsloq/governance.yml\`:

\`\`\`yaml
governance:
  license_tier: "ENTERPRISE-50K"
  max_eps_hard_limit: 55000
  backpressure:
    pause_active_inputs: true
    spillover_disk_queue: "/var/lib/marsloq/dlq"
    spillover_max_size_gb: 120
  quarantine:
    unknown_parser_rate_threshold: 0.15
\`\`\`

Apply changes without downtime:
\`\`\`bash
sudo marsloq-ctl reload-governance
\`\`\`

Access the Web UI at \`https://<APPLIANCE-IP>:5601\` to verify real-time ingestion rates.`,
        author: "kyber",
        createdAt: "2026-09-20T10:30:00.000Z",
        updatedAt: now,
      },
      {
        id: "kb-003-network-bonding",
        title: "Network Bonding & Dual 25GbE LACP Configuration on KSV",
        slug: "network-bonding-dual-25gbe-lacp-configuration-on-ksv",
        category: "Best Practices",
        tags: ["Networking", "LACP", "KSV", "VLAN", "High Availability"],
        summary:
          "Production network architecture guidelines for 802.3ad LACP link aggregation across redundant top-of-rack switches with separate VLANs for management, storage, and VM traffic.",
        content: `## Architecture Overview

High-throughput HCI systems require zero packet loss during peak I/O. We mandate active-active link aggregation using IEEE 802.3ad (Mode 4 / LACP) with \`layer2+3\` or \`layer3+4\` hash policies.

## Recommended Topology

- **Switch 1 (ToR-A)**: Connects to Physical NIC 1 (\`enp4s0f0\`)
- **Switch 2 (ToR-B)**: Connects to Physical NIC 2 (\`enp4s0f1\`)
- Switches must be configured with Multi-Chassis Link Aggregation (MLAG, vPC, or Virtual Chassis).

## KSV Network Configuration File

Create or edit \`/etc/network/interfaces.d/bond0.cfg\`:

\`\`\`text
auto enp4s0f0
iface enp4s0f0 inet manual

auto enp4s0f1
iface enp4s0f1 inet manual

auto bond0
iface bond0 inet manual
    bond-slaves enp4s0f0 enp4s0f1
    bond-miimon 100
    bond-mode 802.3ad
    bond-xmit-hash-policy layer3+4
    bond-lacp-rate fast

# Storage Network VLAN 200
auto bond0.200
iface bond0.200 inet static
    address 192.168.200.11/24
    mtu 9000

# Management Network VLAN 100
auto bond0.100
iface bond0.100 inet static
    address 10.10.100.11/24
    gateway 10.10.100.1
    dns-nameservers 10.10.100.2
\`\`\`

Reload networking stack:
\`\`\`bash
systemctl restart networking
cat /proc/net/bonding/bond0 | grep "MII Status"
\`\`\``,
        author: "kyber",
        createdAt: "2026-09-22T14:15:00.000Z",
        updatedAt: now,
      },
      {
        id: "kb-004-compliance-log",
        title: "Computer Crime Act B.E. 2564 & PDPA Audit Trail Setup",
        slug: "computer-crime-act-be-2564-pdpa-audit-trail-setup",
        category: "Security & Compliance",
        tags: ["Compliance", "Computer Act", "PDPA", "SHA256", "Audit"],
        summary:
          "Technical implementation checklist for Section 26 legal evidentiary retention compliance, NTP sub-10ms synchronization, and automated SHA-256 cryptographic chain validation.",
        content: `## Legal Requirements Summary

Under the Ministry of Digital Economy and Society notification (August 13, B.E. 2564), organizations in Thailand must store computer traffic data for at least 90 days (extendable up to 2 years upon official court or officer order).

### Mandatory Requirements:
1. **Clock Synchronization**: System time must be synchronized via NTP with an authoritative Stratum 1 or Stratum 2 server (e.g. \`time.navy.mi.th\` or \`time.nimt.or.th\`) with maximum variance strictly below 10 milliseconds.
2. **Integrity & Non-Repudiation**: Logs must be hashed using SHA-256 or digitally signed upon chunking to detect tampering.
3. **Least Privilege**: Only authorized officers can query user identity mapping.

## NTP Verification Command

\`\`\`bash
chronyc tracking
# Ensure "Last offset" is within +/- 0.005 s (5ms)
\`\`\`

## Automated SHA-256 Daily Verification Job

MARSLOQ generates cryptographic manifests for every rotated daily index:

\`\`\`bash
marsloq-audit verify-integrity --date 2026-09-30 --tier warm
\`\`\`

Outputs an audit receipt certified for submission to court or regulatory inspectors.`,
        author: "kyber",
        createdAt: "2026-09-25T11:00:00.000Z",
        updatedAt: now,
      },
    ],
  };
}

async function persistStore(store: KbStoreFile): Promise<void> {
  memoryStore = store;
  try {
    await mkdir(path.dirname(STORE_PATH), { recursive: true });
    await writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
  } catch {
    // Read-only filesystem fallback
  }
}

export async function loadKbStore(): Promise<KbStoreFile> {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as KbStoreFile;
    if (parsed?.version === 1 && Array.isArray(parsed.items)) {
      memoryStore = parsed;
      return parsed;
    }
  } catch {
    // Fallback to memory or seed
  }

  if (memoryStore) return memoryStore;

  const seeded = createSeedStore();
  await persistStore(seeded);
  return seeded;
}

export async function listKbPosts(): Promise<KbPost[]> {
  const store = await loadKbStore();
  return [...store.items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getKbPostById(id: string): Promise<KbPost | null> {
  const store = await loadKbStore();
  return store.items.find((item) => item.id === id) || null;
}

export async function createKbPost(
  input: KbPostInput,
  author: string
): Promise<KbPost> {
  if (!input.title.trim()) throw new Error("Post title is required.");
  if (!input.content.trim()) throw new Error("Post content is required.");

  const store = await loadKbStore();
  const now = new Date().toISOString();
  const id = `kb-${randomUUID().slice(0, 8)}`;
  const slug = `${slugify(input.title)}-${id.slice(3)}`;

  const post: KbPost = {
    id,
    title: input.title.trim(),
    slug,
    category: input.category.trim() || "General",
    tags: Array.isArray(input.tags)
      ? input.tags.map((t) => t.trim()).filter(Boolean)
      : [],
    summary: input.summary.trim() || input.content.slice(0, 160).replace(/\n/g, " "),
    content: input.content.trim(),
    author,
    createdAt: now,
    updatedAt: now,
  };

  store.items.unshift(post);
  await persistStore(store);
  return post;
}

export async function updateKbPost(
  id: string,
  input: Partial<KbPostInput>,
  _updatedBy: string
): Promise<KbPost> {
  const store = await loadKbStore();
  const idx = store.items.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Knowledge Base post not found.");

  const existing = store.items[idx];
  const now = new Date().toISOString();

  const updated: KbPost = {
    ...existing,
    ...(input.title !== undefined && {
      title: input.title.trim(),
      slug: `${slugify(input.title)}-${existing.id.slice(3)}`,
    }),
    ...(input.category !== undefined && { category: input.category.trim() }),
    ...(input.tags !== undefined && {
      tags: input.tags.map((t) => t.trim()).filter(Boolean),
    }),
    ...(input.summary !== undefined && { summary: input.summary.trim() }),
    ...(input.content !== undefined && { content: input.content.trim() }),
    updatedAt: now,
  };

  store.items[idx] = updated;
  await persistStore(store);
  return updated;
}

export async function deleteKbPost(id: string): Promise<boolean> {
  const store = await loadKbStore();
  const initialLength = store.items.length;
  store.items = store.items.filter((p) => p.id !== id);
  if (store.items.length === initialLength) return false;

  await persistStore(store);
  return true;
}

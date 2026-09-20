export type HardwareStatus = "active" | "maintenance" | "expired" | "decommissioned";

export const HARDWARE_STATUS_OPTIONS: { value: HardwareStatus; label: string; color: string }[] = [
  { value: "active", label: "Active", color: "emerald" },
  { value: "maintenance", label: "Maintenance", color: "sky" },
  { value: "expired", label: "Expired", color: "rose" },
  { value: "decommissioned", label: "Decommissioned", color: "slate" },
];

export interface HardwareRecord {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  specifications: string;
  startDate: string;      // YYYY-MM-DD
  expirationDate: string; // YYYY-MM-DD
  status: HardwareStatus;
  customer?: string;       // Customer Name
  customerContact?: string;// Customer Contact Person / Mobile / Email
  location?: string;
  notes?: string;
  createdBy: string;
  createdAt: string;     // ISO timestamp
  updatedAt: string;     // ISO timestamp
}

export interface HardwareInput {
  name: string;
  model: string;
  serialNumber: string;
  specifications: string;
  startDate: string;
  expirationDate: string;
  status: HardwareStatus;
  customer?: string;
  customerContact?: string;
  location?: string;
  notes?: string;
}

export function isHardwareStatus(value: unknown): value is HardwareStatus {
  return (
    typeof value === "string" &&
    ["active", "maintenance", "expired", "decommissioned"].includes(value)
  );
}

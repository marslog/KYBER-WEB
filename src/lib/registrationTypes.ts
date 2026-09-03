import type { PartnerRegistrationPayload } from "@/lib/registrationForm";

export type RegistrationStatus = "pending" | "approved" | "closed";

export const REGISTRATION_STATUSES: RegistrationStatus[] = ["pending", "approved", "closed"];

export function isRegistrationStatus(value: unknown): value is RegistrationStatus {
  return value === "pending" || value === "approved" || value === "closed";
}

export interface PartnerRegistrationRecord extends PartnerRegistrationPayload {
  id: string;
  status: RegistrationStatus;
  submittedBy: string;
  createdAt: string;
  updatedAt: string;
}

export type PartnerProfile = {
  partnerName: string;
  partnerContact: string;
  partnerPosition: string;
  partnerMobile: string;
  partnerEmail: string;
};

function trimField(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function readPartnerProfile(source: unknown): PartnerProfile {
  const raw = source && typeof source === "object" ? (source as Record<string, unknown>) : {};
  return {
    partnerName: trimField(raw.partnerName),
    partnerContact: trimField(raw.partnerContact),
    partnerPosition: trimField(raw.partnerPosition),
    partnerMobile: trimField(raw.partnerMobile),
    partnerEmail: trimField(raw.partnerEmail),
  };
}

export function isPartnerProfileComplete(profile: PartnerProfile): boolean {
  return Boolean(
    profile.partnerName &&
      profile.partnerContact &&
      profile.partnerPosition &&
      profile.partnerMobile &&
      profile.partnerEmail,
  );
}

export const EMPTY_PARTNER_PROFILE: PartnerProfile = {
  partnerName: "",
  partnerContact: "",
  partnerPosition: "",
  partnerMobile: "",
  partnerEmail: "",
};

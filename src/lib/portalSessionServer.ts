import { cookies } from "next/headers";
import { parsePortalSessionToken, PORTAL_SESSION_COOKIE, type PortalSession } from "@/lib/portalSession";

export async function getPortalSessionFromCookies(): Promise<PortalSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(PORTAL_SESSION_COOKIE)?.value;
  return parsePortalSessionToken(token);
}

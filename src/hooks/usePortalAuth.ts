"use client";

import { useSession } from "@/contexts/SessionContext";

/**
 * Backward-compatible portal auth hook.
 * Delegates to the centralized SessionProvider.
 */
export function usePortalAuth() {
  const session = useSession();

  return {
    authenticated: session.authenticated,
    username: session.username,
    role: session.role,
    isAdmin: session.isAdmin,
    loading: session.loading,
    refresh: session.refresh,
    logout: session.logout,
  };
}

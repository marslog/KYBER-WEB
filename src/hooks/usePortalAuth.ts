"use client";

import { useCallback, useEffect, useState } from "react";
import type { PortalRole } from "@/lib/portalUserStore";

export function usePortalAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<PortalRole | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/portal-login", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      if (!response.ok) {
        setAuthenticated(false);
        setUsername(null);
        setRole(null);
        setIsAdmin(false);
        return;
      }
      const data = (await response.json()) as {
        authenticated?: boolean;
        username?: string;
        role?: PortalRole;
        isAdmin?: boolean;
      };
      setAuthenticated(Boolean(data.authenticated));
      setUsername(data.username ?? null);
      setRole(data.role ?? null);
      setIsAdmin(Boolean(data.isAdmin));
    } catch {
      setAuthenticated(false);
      setUsername(null);
      setRole(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const logout = useCallback(async () => {
    await fetch("/api/portal-login", {
      method: "DELETE",
      credentials: "include",
    });
    window.location.href = "/";
  }, []);

  return { authenticated, username, role, isAdmin, loading, refresh, logout };
}

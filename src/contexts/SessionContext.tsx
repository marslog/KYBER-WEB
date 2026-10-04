"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { PortalRole } from "@/lib/portalUserStore";

/* ── Session timeout configuration (client-side, in seconds) ── */
const SESSION_IDLE_TIMEOUT_SEC = 30 * 60; // 30 min idle → auto-logout
const SESSION_WARNING_BEFORE_SEC = 5 * 60; // warn 5 min before logout
const ACTIVITY_CHECK_INTERVAL_MS = 30_000; // check every 30s
const SESSION_REFRESH_INTERVAL_MS = 5 * 60 * 1000; // refresh session check every 5 min

/* ── Types ── */
export interface SessionUser {
  username: string;
  role: PortalRole;
  isAdmin: boolean;
  partnerName?: string;
  partnerContact?: string;
  partnerPosition?: string;
  partnerMobile?: string;
  partnerEmail?: string;
}

interface SessionContextValue {
  /* Auth state */
  authenticated: boolean;
  user: SessionUser | null;
  loading: boolean;

  /* Shortcut accessors */
  username: string | null;
  role: PortalRole | null;
  isAdmin: boolean;

  /* Actions */
  refresh: () => Promise<void>;
  logout: () => Promise<void>;

  /* Session timeout */
  idleSecondsLeft: number | null;
  showTimeoutWarning: boolean;
  extendSession: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

/* ── Provider ── */
export function SessionProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [idleSecondsLeft, setIdleSecondsLeft] = useState<number | null>(null);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);

  const lastActivityRef = useRef(Date.now());
  const idleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const refreshTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Track user activity ── */
  const recordActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    setShowTimeoutWarning(false);
    setIdleSecondsLeft(null);
  }, []);

  /* ── Fetch session from server ── */
  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/portal-login", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      if (!response.ok) {
        setAuthenticated(false);
        setUser(null);
        return;
      }
      const data = (await response.json()) as {
        authenticated?: boolean;
        username?: string;
        role?: PortalRole;
        isAdmin?: boolean;
        partnerName?: string;
        partnerContact?: string;
        partnerPosition?: string;
        partnerMobile?: string;
        partnerEmail?: string;
      };
      if (data.authenticated) {
        setAuthenticated(true);
        setUser({
          username: data.username ?? "",
          role: (data.role ?? "user") as PortalRole,
          isAdmin: Boolean(data.isAdmin),
          partnerName: data.partnerName,
          partnerContact: data.partnerContact,
          partnerPosition: data.partnerPosition,
          partnerMobile: data.partnerMobile,
          partnerEmail: data.partnerEmail,
        });
      } else {
        setAuthenticated(false);
        setUser(null);
      }
    } catch {
      setAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ── Logout ── */
  const logout = useCallback(async () => {
    await fetch("/api/portal-login", {
      method: "DELETE",
      credentials: "include",
    });
    setAuthenticated(false);
    setUser(null);
    setShowTimeoutWarning(false);
    setIdleSecondsLeft(null);
    window.location.href = "/";
  }, []);

  /* ── Extend session (user clicked "Stay logged in") ── */
  const extendSession = useCallback(() => {
    recordActivity();
    // Also ping the server to refresh the token
    void fetch("/api/portal-login", {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });
  }, [recordActivity]);

  /* ── Initial fetch ── */
  useEffect(() => {
    void refresh();
  }, [refresh]);

  /* ── Activity listeners ── */
  useEffect(() => {
    if (!authenticated) return;

    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"] as const;
    const handler = () => recordActivity();

    for (const evt of events) {
      window.addEventListener(evt, handler, { passive: true });
    }
    return () => {
      for (const evt of events) {
        window.removeEventListener(evt, handler);
      }
    };
  }, [authenticated, recordActivity]);

  /* ── Idle timeout checker ── */
  useEffect(() => {
    if (!authenticated) {
      if (idleTimerRef.current) clearInterval(idleTimerRef.current);
      return;
    }

    idleTimerRef.current = setInterval(() => {
      const elapsed = (Date.now() - lastActivityRef.current) / 1000;
      const remaining = Math.max(0, SESSION_IDLE_TIMEOUT_SEC - elapsed);

      if (remaining <= 0) {
        // Session timed out due to inactivity
        void logout();
      } else if (remaining <= SESSION_WARNING_BEFORE_SEC) {
        setShowTimeoutWarning(true);
        setIdleSecondsLeft(Math.ceil(remaining));
      } else {
        setShowTimeoutWarning(false);
        setIdleSecondsLeft(null);
      }
    }, ACTIVITY_CHECK_INTERVAL_MS);

    return () => {
      if (idleTimerRef.current) clearInterval(idleTimerRef.current);
    };
  }, [authenticated, logout]);

  /* ── Periodic session refresh (keep server token alive) ── */
  useEffect(() => {
    if (!authenticated) {
      if (refreshTimerRef.current) clearInterval(refreshTimerRef.current);
      return;
    }

    refreshTimerRef.current = setInterval(() => {
      // Only refresh if user was recently active
      const idleSec = (Date.now() - lastActivityRef.current) / 1000;
      if (idleSec < SESSION_IDLE_TIMEOUT_SEC - SESSION_WARNING_BEFORE_SEC) {
        void refresh();
      }
    }, SESSION_REFRESH_INTERVAL_MS);

    return () => {
      if (refreshTimerRef.current) clearInterval(refreshTimerRef.current);
    };
  }, [authenticated, refresh]);

  return (
    <SessionContext.Provider
      value={{
        authenticated,
        user,
        loading,
        username: user?.username ?? null,
        role: user?.role ?? null,
        isAdmin: user?.isAdmin ?? false,
        refresh,
        logout,
        idleSecondsLeft,
        showTimeoutWarning,
        extendSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

/* ── Consumer hook ── */
export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used within a <SessionProvider>");
  }
  return ctx;
}

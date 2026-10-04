"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "@/contexts/SessionContext";
import { LoadingBarProvider } from "@/components/ui/GlobalLoadingBar";
import { ToastProvider } from "@/components/ui/ToastNotification";
import SessionTimeoutWarning from "@/components/ui/SessionTimeoutWarning";

/**
 * Client-side providers wrapper for the root layout.
 * Bundles session management, loading bar, and toast notifications.
 */
export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <LoadingBarProvider>
      <ToastProvider>
        <SessionProvider>
          {children}
          <SessionTimeoutWarning />
        </SessionProvider>
      </ToastProvider>
    </LoadingBarProvider>
  );
}

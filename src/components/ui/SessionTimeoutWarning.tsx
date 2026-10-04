"use client";

import { useSession } from "@/contexts/SessionContext";
import { Clock, RefreshCw } from "lucide-react";

function LogOutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

export default function SessionTimeoutWarning() {
  const { showTimeoutWarning, idleSecondsLeft, extendSession, logout } = useSession();

  if (!showTimeoutWarning || idleSecondsLeft === null) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="w-[360px] bg-white rounded-2xl border border-amber-200 shadow-2xl overflow-hidden">
        {/* Progress bar at top */}
        <div className="h-1 bg-amber-100">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-1000 ease-linear"
            style={{ width: `${Math.max(0, (idleSecondsLeft / 300) * 100)}%` }}
          />
        </div>

        <div className="p-5">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-[var(--text)]">
                Session Expiring
              </h4>
              <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed">
                You&apos;ll be logged out in{" "}
                <span className="font-mono font-bold text-amber-600">
                  {formatTime(idleSecondsLeft)}
                </span>{" "}
                due to inactivity.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={extendSession}
              className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-[var(--brand)] text-white hover:bg-[var(--brand)]/90 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Stay Logged In
            </button>
            <button
              onClick={() => void logout()}
              className="inline-flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:border-rose-300 hover:text-rose-500 transition-colors"
            >
              <LogOutIcon className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

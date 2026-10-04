"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { CheckCircle2, AlertCircle, X, Loader2 } from "lucide-react";

function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

/* ── Types ── */
export type ToastType = "success" | "error" | "info" | "loading";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number; // ms, 0 = persistent
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (type: ToastType, message: string, duration?: number) => string;
  removeToast: (id: string) => void;
  success: (message: string, duration?: number) => string;
  error: (message: string, duration?: number) => string;
  info: (message: string, duration?: number) => string;
  loading: (message: string) => string;
  /** Update an existing toast (e.g. change loading → success) */
  updateToast: (id: string, type: ToastType, message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, message: string, duration = 4000): string => {
      const id = `toast-${++toastCounter}`;
      const toast: Toast = { id, type, message, duration };
      setToasts((prev) => [...prev, toast]);

      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
      return id;
    },
    [removeToast],
  );

  const updateToast = useCallback(
    (id: string, type: ToastType, message: string, duration = 4000) => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, type, message, duration } : t)),
      );
      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    [removeToast],
  );

  const success = useCallback(
    (message: string, duration = 4000) => addToast("success", message, duration),
    [addToast],
  );
  const error = useCallback(
    (message: string, duration = 6000) => addToast("error", message, duration),
    [addToast],
  );
  const info = useCallback(
    (message: string, duration = 4000) => addToast("info", message, duration),
    [addToast],
  );
  const loading = useCallback(
    (message: string) => addToast("loading", message, 0),
    [addToast],
  );

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, success, error, info, loading, updateToast }}
    >
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return ctx;
}

/* ── Toast container (rendered at bottom-left) ── */
function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col gap-2.5 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

const TOAST_ICON: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0" />,
  error: <AlertCircle className="w-4.5 h-4.5 text-rose-500 shrink-0" />,
  info: <InfoIcon className="w-4.5 h-4.5 text-blue-500 shrink-0" />,
  loading: <Loader2 className="w-4.5 h-4.5 text-[var(--brand)] animate-spin shrink-0" />,
};

const TOAST_BORDER: Record<ToastType, string> = {
  success: "border-emerald-200",
  error: "border-rose-200",
  info: "border-blue-200",
  loading: "border-[var(--brand)]/30",
};

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  return (
    <div
      className={`pointer-events-auto flex items-start gap-2.5 px-4 py-3 rounded-xl border bg-white shadow-lg animate-in slide-in-from-bottom-2 fade-in duration-200 ${TOAST_BORDER[toast.type]}`}
    >
      <div className="mt-0.5">{TOAST_ICON[toast.type]}</div>
      <p className="text-sm text-[var(--text)] flex-1 leading-relaxed">{toast.message}</p>
      {toast.type !== "loading" && (
        <button
          onClick={() => onRemove(toast.id)}
          className="shrink-0 p-0.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

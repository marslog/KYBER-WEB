"use client";

import { useCallback, useState } from "react";
import { useLoadingBar } from "@/components/ui/GlobalLoadingBar";
import { useToast } from "@/components/ui/ToastNotification";

interface UseApiActionOptions {
  /** Show global loading bar? Default: true */
  showLoadingBar?: boolean;
  /** Show toast on success? Default: true */
  showSuccessToast?: boolean;
  /** Show toast on error? Default: true */
  showErrorToast?: boolean;
  /** Success message (default: "Done!") */
  successMessage?: string;
  /** Loading message shown while pending */
  loadingMessage?: string;
}

/**
 * Wraps an async action with automatic:
 * - pending/error state tracking
 * - global loading bar progress
 * - toast notifications (loading → success/error)
 *
 * Usage:
 * ```ts
 * const { execute, pending, error } = useApiAction({
 *   successMessage: "Item saved!",
 *   loadingMessage: "Saving…",
 * });
 *
 * const handleSave = () => execute(async () => {
 *   await fetch("/api/...", { method: "POST", ... });
 * });
 * ```
 */
export function useApiAction(options: UseApiActionOptions = {}) {
  const {
    showLoadingBar = true,
    showSuccessToast = true,
    showErrorToast = true,
    successMessage = "Done!",
    loadingMessage = "Processing…",
  } = options;

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadingBar = useLoadingBar();
  const toast = useToast();

  const execute = useCallback(
    async <T>(fn: () => Promise<T>): Promise<T | undefined> => {
      setPending(true);
      setError(null);
      if (showLoadingBar) loadingBar.start();

      let toastId: string | undefined;
      if (loadingMessage) {
        toastId = toast.loading(loadingMessage);
      }

      try {
        const result = await fn();
        if (showSuccessToast && toastId) {
          toast.updateToast(toastId, "success", successMessage);
        } else if (toastId) {
          toast.removeToast(toastId);
        }
        return result;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "An error occurred.";
        setError(msg);
        if (showErrorToast && toastId) {
          toast.updateToast(toastId, "error", msg, 6000);
        } else if (toastId) {
          toast.removeToast(toastId);
        }
        return undefined;
      } finally {
        setPending(false);
        if (showLoadingBar) loadingBar.done();
      }
    },
    [showLoadingBar, showSuccessToast, showErrorToast, successMessage, loadingMessage, loadingBar, toast],
  );

  return { execute, pending, error, setError };
}

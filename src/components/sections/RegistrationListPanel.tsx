"use client";

import { useCallback, useEffect, useState } from "react";
import type { PartnerRegistrationRecord, RegistrationStatus } from "@/lib/registrationTypes";
import { REGISTRATION_STATUSES } from "@/lib/registrationTypes";

const PRODUCT_LABELS: Record<string, string> = {
  "kyber-hci": "KYBER HCI",
  marsloq: "MARSLOQ",
};

const STATUS_STYLES: Record<RegistrationStatus, string> = {
  pending: "bg-amber-50 text-amber-800 border-amber-200",
  approved: "bg-emerald-50 text-emerald-800 border-emerald-200",
  closed: "bg-slate-100 text-slate-700 border-slate-200",
};

function formatProduct(value: string): string {
  return PRODUCT_LABELS[value] || value;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function RegistrationListPanel() {
  const [registrations, setRegistrations] = useState<PartnerRegistrationRecord[]>([]);
  const [canManageStatus, setCanManageStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadRegistrations = useCallback(async () => {
    setError("");
    try {
      const response = await fetch("/api/register", {
        credentials: "include",
        cache: "no-store",
      });
      const data = (await response.json()) as {
        registrations?: PartnerRegistrationRecord[];
        canManageStatus?: boolean;
        error?: string;
      };
      if (!response.ok) {
        setError(data.error || "Unable to load registrations.");
        return;
      }
      setRegistrations(data.registrations || []);
      setCanManageStatus(Boolean(data.canManageStatus));
    } catch {
      setError("Unable to load registrations.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRegistrations();
  }, [loadRegistrations]);

  async function handleStatusChange(id: string, status: RegistrationStatus) {
    setUpdatingId(id);
    setError("");
    try {
      const response = await fetch(`/api/register/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error || "Unable to update status.");
        return;
      }
      await loadRegistrations();
    } catch {
      setError("Unable to update status.");
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return <p className="text-sm text-[var(--text-secondary)]">Loading registrations…</p>;
  }

  return (
    <div className="space-y-4">
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {registrations.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-white p-8 text-sm text-[var(--text-secondary)]">
          No registrations yet. Use New Registration to add one.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-[var(--bg-subtle)] text-left text-xs uppercase tracking-wider text-[var(--text-muted)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Partner</th>
                <th className="px-4 py-3 font-semibold">End-User</th>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((item) => (
                <tr key={item.id} className="border-t border-[var(--border)] align-top">
                  <td className="px-4 py-3 whitespace-nowrap text-[var(--text-secondary)]">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{item.partnerName}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">
                      {item.partnerContact} · {item.partnerMobile}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">{item.partnerEmail}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{item.endUserName}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">
                      {item.endUserContact} · {item.endUserMobile}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">{item.endUserEmail}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {item.products.map(formatProduct).join(", ")}
                  </td>
                  <td className="px-4 py-3">
                    {canManageStatus ? (
                      <select
                        value={item.status}
                        disabled={updatingId === item.id}
                        onChange={(event) =>
                          void handleStatusChange(item.id, event.target.value as RegistrationStatus)
                        }
                        className={`rounded-md border px-2 py-1.5 text-xs font-medium ${STATUS_STYLES[item.status]}`}
                      >
                        {REGISTRATION_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span
                        className={`inline-flex rounded-md border px-2 py-1.5 text-xs font-medium capitalize ${STATUS_STYLES[item.status]}`}
                      >
                        {item.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

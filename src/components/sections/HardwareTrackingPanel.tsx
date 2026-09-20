"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  Search,
  Calendar,
  ShieldAlert,
  ShieldCheck,
  X,
  Server,
  Clock,
} from "lucide-react";
import type { HardwareInput, HardwareRecord, HardwareStatus } from "@/lib/hardwareTypes";

function HardDrive({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" x2="2" y1="12" y2="12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      <line x1="6" x2="6.01" y1="16" y2="16" />
      <line x1="10" x2="10.01" y1="16" y2="16" />
    </svg>
  );
}

function Plus({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function Check({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Copy({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function Edit({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z" />
    </svg>
  );
}

function Trash2({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}

function Filter({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function Info({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function Wrench({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function Building({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

const EMPTY_FORM: HardwareInput = {
  name: "",
  model: "",
  serialNumber: "",
  specifications: "",
  startDate: new Date().toISOString().split("T")[0],
  expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  status: "active",
  customer: "",
  customerContact: "",
  location: "",
  notes: "",
};

function getDaysRemaining(expirationDateStr: string): number {
  if (!expirationDateStr) return 0;
  const exp = new Date(expirationDateStr).getTime();
  const now = new Date().getTime();
  return Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
}

function getStatusBadge(status: HardwareStatus, daysRemaining: number) {
  if (status === "maintenance") {
    return {
      label: "Maintenance",
      bgClass: "bg-sky-50 text-sky-700 border-sky-200",
      dotClass: "bg-sky-500",
      icon: Wrench,
    };
  }
  if (status === "decommissioned") {
    return {
      label: "Decommissioned",
      bgClass: "bg-slate-100 text-slate-700 border-slate-300",
      dotClass: "bg-slate-500",
      icon: Info,
    };
  }
  if (daysRemaining < 0 || status === "expired") {
    return {
      label: "Expired",
      bgClass: "bg-rose-50 text-rose-700 border-rose-200",
      dotClass: "bg-rose-500",
      icon: ShieldAlert,
    };
  }
  if (daysRemaining <= 30) {
    return {
      label: `Expiring Soon (${daysRemaining}d)`,
      bgClass: "bg-amber-50 text-amber-800 border-amber-200",
      dotClass: "bg-amber-500",
      icon: Clock,
    };
  }
  return {
    label: "Active",
    bgClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
    dotClass: "bg-emerald-500",
    icon: ShieldCheck,
  };
}

export default function HardwareTrackingPanel() {
  const [records, setRecords] = useState<HardwareRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<HardwareInput>(EMPTY_FORM);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<HardwareInput>(EMPTY_FORM);

  const [viewingRecord, setViewingRecord] = useState<HardwareRecord | null>(null);
  const [deletingRecord, setDeletingRecord] = useState<HardwareRecord | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadRecords = useCallback(async () => {
    setError("");
    try {
      const response = await fetch("/api/hardware-tracking", {
        credentials: "include",
        cache: "no-store",
      });
      const data = (await response.json()) as { records?: HardwareRecord[]; error?: string };
      if (!response.ok) {
        setError(data.error || "Unable to load hardware records.");
        return;
      }
      setRecords(data.records || []);
    } catch {
      setError("Unable to load hardware records.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRecords();
  }, [loadRecords]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      const days = getDaysRemaining(rec.expirationDate);
      let computedStatus: string = rec.status;
      if (rec.status === "active" && days < 0) computedStatus = "expired";

      if (statusFilter !== "all" && computedStatus !== statusFilter) {
        return false;
      }

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        rec.name.toLowerCase().includes(q) ||
        rec.model.toLowerCase().includes(q) ||
        rec.serialNumber.toLowerCase().includes(q) ||
        rec.specifications.toLowerCase().includes(q) ||
        (rec.customer && rec.customer.toLowerCase().includes(q)) ||
        (rec.customerContact && rec.customerContact.toLowerCase().includes(q)) ||
        (rec.location && rec.location.toLowerCase().includes(q)) ||
        (rec.notes && rec.notes.toLowerCase().includes(q))
      );
    });
  }, [records, searchQuery, statusFilter]);

  const metrics = useMemo(() => {
    const total = records.length;
    let active = 0;
    let expiringSoon = 0;
    let expired = 0;
    let maintenance = 0;

    for (const rec of records) {
      const days = getDaysRemaining(rec.expirationDate);
      if (rec.status === "maintenance") {
        maintenance++;
      } else if (rec.status === "expired" || days < 0) {
        expired++;
      } else if (days <= 30) {
        expiringSoon++;
      } else {
        active++;
      }
    }

    return { total, active, expiringSoon, expired, maintenance };
  }, [records]);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/hardware-tracking", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error || "Unable to log hardware asset.");
        return;
      }

      setIsCreateOpen(false);
      setCreateForm(EMPTY_FORM);
      setMessage("Hardware asset logged successfully.");
      await loadRecords();
    } catch {
      setError("Unable to log hardware asset.");
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(record: HardwareRecord) {
    setEditingId(record.id);
    setEditForm({
      name: record.name,
      model: record.model,
      serialNumber: record.serialNumber,
      specifications: record.specifications,
      startDate: record.startDate,
      expirationDate: record.expirationDate,
      status: record.status,
      customer: record.customer || "",
      customerContact: record.customerContact || "",
      location: record.location || "",
      notes: record.notes || "",
    });
    setError("");
    setMessage("");
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingId) return;

    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/hardware-tracking/${editingId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error || "Unable to update hardware asset.");
        return;
      }

      setEditingId(null);
      setMessage("Hardware asset updated successfully.");
      await loadRecords();
    } catch {
      setError("Unable to update hardware asset.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteConfirm() {
    if (!deletingRecord) return;

    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/hardware-tracking/${deletingRecord.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error || "Unable to delete hardware asset.");
        return;
      }

      setDeletingRecord(null);
      setMessage("Hardware asset deleted.");
      await loadRecords();
    } catch {
      setError("Unable to delete hardware asset.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Metric Cards Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Total Hardware
            </p>
            <div className="p-2 rounded-lg bg-[var(--brand-soft)] text-[var(--brand)]">
              <Server className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold mt-2">{metrics.total}</p>
          <p className="text-xs text-[var(--text-secondary)] mt-1">Logged in inventory</p>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Active Warranty
            </p>
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold mt-2 text-emerald-950">{metrics.active}</p>
          <p className="text-xs text-emerald-700 mt-1">Healthy & operational</p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Expiring Soon
            </p>
            <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold mt-2 text-amber-950">{metrics.expiringSoon}</p>
          <p className="text-xs text-amber-700 mt-1">Within next 30 days</p>
        </div>

        <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-rose-800">
              Expired / Attention
            </p>
            <div className="p-2 rounded-lg bg-rose-100 text-rose-700">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold mt-2 text-rose-950">
            {metrics.expired + metrics.maintenance}
          </p>
          <p className="text-xs text-rose-700 mt-1">
            {metrics.expired} expired, {metrics.maintenance} maintenance
          </p>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[var(--border)] shadow-sm">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search model, serial, customer, specs, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[var(--brand)]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[var(--text-muted)] hidden sm:block" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--brand)]"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="expired">Expired</option>
              <option value="decommissioned">Decommissioned</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setCreateForm(EMPTY_FORM);
            setIsCreateOpen(true);
            setError("");
            setMessage("");
          }}
          className="kyber-btn-primary flex items-center justify-center gap-2 px-4 py-2 text-sm shrink-0"
        >
          <Plus className="w-4 h-4" /> Log Hardware Asset
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button type="button" onClick={() => setError("")} className="text-red-500 hover:text-red-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {message && (
        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm flex items-center justify-between">
          <span>{message}</span>
          <button type="button" onClick={() => setMessage("")} className="text-emerald-500 hover:text-emerald-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Table Section */}
      <section className="rounded-xl border border-[var(--border)] bg-white overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Hardware Inventory</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">
              Administrator hardware details, customer assignments, specifications, and warranty timelines.
            </p>
          </div>
          <span className="text-xs text-[var(--text-muted)] font-medium">
            Showing {filteredRecords.length} of {records.length} items
          </span>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-sm text-[var(--text-muted)]">
            Loading hardware inventory...
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="px-6 py-12 text-center space-y-2">
            <HardDrive className="w-10 h-10 text-[var(--text-muted)] mx-auto opacity-50" />
            <p className="text-sm font-medium text-[var(--text-secondary)]">No hardware assets found</p>
            <p className="text-xs text-[var(--text-muted)]">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search query or status filter."
                : 'Click "Log Hardware Asset" to add your first hardware record.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[var(--bg-subtle)] text-left text-xs uppercase tracking-wider text-[var(--text-muted)]">
                <tr>
                  <th className="px-6 py-3 font-semibold">Asset / Model</th>
                  <th className="px-6 py-3 font-semibold">Customer</th>
                  <th className="px-6 py-3 font-semibold">Serial Number</th>
                  <th className="px-6 py-3 font-semibold">Specifications</th>
                  <th className="px-6 py-3 font-semibold">Start & Expiration</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filteredRecords.map((item) => {
                  const daysRemaining = getDaysRemaining(item.expirationDate);
                  const badge = getStatusBadge(item.status, daysRemaining);
                  const BadgeIcon = badge.icon;

                  return (
                    <tr key={item.id} className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-[var(--text)]">{item.name}</div>
                        <div className="text-xs text-[var(--brand)] font-mono mt-0.5">{item.model}</div>
                        {item.location && (
                          <div className="text-xs text-[var(--text-muted)] mt-1 flex items-center gap-1">
                            <Server className="w-3 h-3" /> {item.location}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {item.customer ? (
                          <div>
                            <div className="font-medium text-xs text-[var(--text)] flex items-center gap-1">
                              <Building className="w-3.5 h-3.5 text-[var(--brand)] shrink-0" />
                              {item.customer}
                            </div>
                            {item.customerContact && (
                              <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                                {item.customerContact}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-[var(--text-muted)] font-italic">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-subtle)] border border-[var(--border)] font-mono text-xs text-[var(--text)]">
                          <span>{item.serialNumber}</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(item.serialNumber, item.id)}
                            className="text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
                            title="Copy Serial Number"
                          >
                            {copiedId === item.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-xs text-[var(--text-secondary)] line-clamp-2" title={item.specifications}>
                          {item.specifications}
                        </p>
                        <button
                          type="button"
                          onClick={() => setViewingRecord(item)}
                          className="text-[11px] text-[var(--brand)] hover:underline font-medium mt-1 inline-block"
                        >
                          View full details
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs space-y-1">
                          <div className="text-[var(--text-secondary)]">
                            <span className="text-[var(--text-muted)]">Start:</span> {item.startDate}
                          </div>
                          <div className="font-medium text-[var(--text)]">
                            <span className="text-[var(--text-muted)]">Expires:</span> {item.expirationDate}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${badge.bgClass}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dotClass}`} />
                          <BadgeIcon className="w-3 h-3" />
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(item)}
                            className="p-1.5 rounded-md border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
                            title="Edit Hardware Details"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingRecord(item)}
                            className="p-1.5 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Hardware Asset"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* CREATE HARDWARE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-xl border border-[var(--border)] shadow-xl p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <div>
                <h3 className="text-lg font-semibold">Log Hardware Asset</h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Enter hardware details, customer name, specifications, and warranty dates.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="create-name" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Asset / Device Name *
                  </label>
                  <input
                    id="create-name"
                    required
                    placeholder="e.g. KYBER HCI Cluster Node A1"
                    value={createForm.name}
                    onChange={(e) => setCreateForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>

                <div>
                  <label htmlFor="create-model" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Hardware Model *
                  </label>
                  <input
                    id="create-model"
                    required
                    placeholder="e.g. KYBER-HCI-5000"
                    value={createForm.model}
                    onChange={(e) => setCreateForm((prev) => ({ ...prev, model: e.target.value }))}
                    className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="create-serial" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Serial Number *
                  </label>
                  <input
                    id="create-serial"
                    required
                    placeholder="e.g. SN-98472-X1"
                    value={createForm.serialNumber}
                    onChange={(e) => setCreateForm((prev) => ({ ...prev, serialNumber: e.target.value }))}
                    className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-mono focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>

                <div>
                  <label htmlFor="create-status" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Status
                  </label>
                  <select
                    id="create-status"
                    value={createForm.status}
                    onChange={(e) => setCreateForm((prev) => ({ ...prev, status: e.target.value as HardwareStatus }))}
                    className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--brand)]"
                  >
                    <option value="active">Active</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="expired">Expired</option>
                    <option value="decommissioned">Decommissioned</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 bg-[var(--bg-subtle)] p-3.5 rounded-lg border border-[var(--border)]">
                <div>
                  <label htmlFor="create-customer" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Customer Name
                  </label>
                  <input
                    id="create-customer"
                    placeholder="e.g. Bangkok Bank PCL"
                    value={createForm.customer || ""}
                    onChange={(e) => setCreateForm((prev) => ({ ...prev, customer: e.target.value }))}
                    className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>

                <div>
                  <label htmlFor="create-customerContact" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Customer Contact Person / Email
                  </label>
                  <input
                    id="create-customerContact"
                    placeholder="e.g. Somchai J. (somchai@client.com)"
                    value={createForm.customerContact || ""}
                    onChange={(e) => setCreateForm((prev) => ({ ...prev, customerContact: e.target.value }))}
                    className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="create-specs" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                  Hardware Specifications *
                </label>
                <textarea
                  id="create-specs"
                  required
                  rows={3}
                  placeholder="e.g. 64-Core AMD EPYC, 512GB DDR5 RAM, 8x 3.84TB NVMe SSD, Dual 25GbE SFP28 Ports"
                  value={createForm.specifications}
                  onChange={(e) => setCreateForm((prev) => ({ ...prev, specifications: e.target.value }))}
                  className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--brand)]"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="create-start" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Start Date *
                  </label>
                  <input
                    id="create-start"
                    type="date"
                    required
                    value={createForm.startDate}
                    onChange={(e) => setCreateForm((prev) => ({ ...prev, startDate: e.target.value }))}
                    className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>

                <div>
                  <label htmlFor="create-expiration" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Expiration Date *
                  </label>
                  <input
                    id="create-expiration"
                    type="date"
                    required
                    value={createForm.expirationDate}
                    onChange={(e) => setCreateForm((prev) => ({ ...prev, expirationDate: e.target.value }))}
                    className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="create-location" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Location / Rack (Optional)
                  </label>
                  <input
                    id="create-location"
                    placeholder="e.g. Datacenter Alpha - Rack R-04"
                    value={createForm.location || ""}
                    onChange={(e) => setCreateForm((prev) => ({ ...prev, location: e.target.value }))}
                    className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>

                <div>
                  <label htmlFor="create-notes" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Notes (Optional)
                  </label>
                  <input
                    id="create-notes"
                    placeholder="e.g. Primary compute controller"
                    value={createForm.notes || ""}
                    onChange={(e) => setCreateForm((prev) => ({ ...prev, notes: e.target.value }))}
                    className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-[var(--border)] pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm font-medium hover:bg-[var(--bg-subtle)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="kyber-btn-primary px-5 py-2 text-sm font-medium"
                >
                  {submitting ? "Saving..." : "Log Asset"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT HARDWARE MODAL */}
      {editingId && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-xl border border-[var(--brand)] shadow-xl p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <div>
                <h3 className="text-lg font-semibold">Edit Hardware Asset</h3>
                <p className="text-xs text-[var(--text-secondary)]">Update details, customer, or warranty timeline.</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit-name" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Asset / Device Name *
                  </label>
                  <input
                    id="edit-name"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>

                <div>
                  <label htmlFor="edit-model" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Hardware Model *
                  </label>
                  <input
                    id="edit-model"
                    required
                    value={editForm.model}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, model: e.target.value }))}
                    className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit-serial" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Serial Number *
                  </label>
                  <input
                    id="edit-serial"
                    required
                    value={editForm.serialNumber}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, serialNumber: e.target.value }))}
                    className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-mono focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>

                <div>
                  <label htmlFor="edit-status" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Status
                  </label>
                  <select
                    id="edit-status"
                    value={editForm.status}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, status: e.target.value as HardwareStatus }))}
                    className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--brand)]"
                  >
                    <option value="active">Active</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="expired">Expired</option>
                    <option value="decommissioned">Decommissioned</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 bg-[var(--bg-subtle)] p-3.5 rounded-lg border border-[var(--border)]">
                <div>
                  <label htmlFor="edit-customer" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Customer Name
                  </label>
                  <input
                    id="edit-customer"
                    value={editForm.customer || ""}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, customer: e.target.value }))}
                    className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>

                <div>
                  <label htmlFor="edit-customerContact" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Customer Contact Person / Email
                  </label>
                  <input
                    id="edit-customerContact"
                    value={editForm.customerContact || ""}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, customerContact: e.target.value }))}
                    className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="edit-specs" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                  Hardware Specifications *
                </label>
                <textarea
                  id="edit-specs"
                  required
                  rows={3}
                  value={editForm.specifications}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, specifications: e.target.value }))}
                  className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--brand)]"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit-start" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Start Date *
                  </label>
                  <input
                    id="edit-start"
                    type="date"
                    required
                    value={editForm.startDate}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, startDate: e.target.value }))}
                    className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>

                <div>
                  <label htmlFor="edit-expiration" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Expiration Date *
                  </label>
                  <input
                    id="edit-expiration"
                    type="date"
                    required
                    value={editForm.expirationDate}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, expirationDate: e.target.value }))}
                    className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit-location" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Location / Rack
                  </label>
                  <input
                    id="edit-location"
                    value={editForm.location || ""}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, location: e.target.value }))}
                    className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>

                <div>
                  <label htmlFor="edit-notes" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Notes
                  </label>
                  <input
                    id="edit-notes"
                    value={editForm.notes || ""}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, notes: e.target.value }))}
                    className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-[var(--border)] pt-4">
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm font-medium hover:bg-[var(--bg-subtle)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="kyber-btn-primary px-5 py-2 text-sm font-medium"
                >
                  {submitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {viewingRecord && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white rounded-xl border border-[var(--border)] shadow-xl p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-[var(--border)] pb-3">
              <div>
                <p className="text-xs font-mono text-[var(--brand)]">{viewingRecord.model}</p>
                <h3 className="text-lg font-semibold">{viewingRecord.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingRecord(null)}
                className="text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
                  Serial Number
                </span>
                <span className="font-mono bg-[var(--bg-subtle)] px-2 py-1 rounded text-xs">
                  {viewingRecord.serialNumber}
                </span>
              </div>

              {viewingRecord.customer && (
                <div className="bg-[var(--bg-subtle)] p-3 rounded-lg border border-[var(--border)] space-y-1">
                  <span className="text-xs font-semibold text-[var(--brand)] uppercase block">
                    Customer
                  </span>
                  <div className="font-medium text-sm text-[var(--text)]">{viewingRecord.customer}</div>
                  {viewingRecord.customerContact && (
                    <div className="text-xs text-[var(--text-secondary)]">{viewingRecord.customerContact}</div>
                  )}
                </div>
              )}

              <div>
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
                  Hardware Specifications
                </span>
                <p className="p-3 rounded-lg bg-[var(--bg-subtle)] text-xs leading-relaxed text-[var(--text)]">
                  {viewingRecord.specifications}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
                    Start Date
                  </span>
                  <p className="text-xs font-medium">{viewingRecord.startDate}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
                    Expiration Date
                  </span>
                  <p className="text-xs font-medium">{viewingRecord.expirationDate}</p>
                </div>
              </div>

              {viewingRecord.location && (
                <div>
                  <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
                    Location / Rack
                  </span>
                  <p className="text-xs">{viewingRecord.location}</p>
                </div>
              )}

              {viewingRecord.notes && (
                <div>
                  <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
                    Notes
                  </span>
                  <p className="text-xs italic text-[var(--text-secondary)]">{viewingRecord.notes}</p>
                </div>
              )}

              <div className="text-[11px] text-[var(--text-muted)] border-t border-[var(--border)] pt-2">
                Logged by <span className="font-medium text-[var(--text)]">{viewingRecord.createdBy}</span> on{" "}
                {new Date(viewingRecord.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setViewingRecord(null)}
                className="px-4 py-2 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)] text-xs font-medium hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingRecord && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-xl border border-rose-200 shadow-xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2 rounded-full bg-rose-100">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Hardware Asset?</h3>
            </div>

            <p className="text-sm text-[var(--text-secondary)]">
              Are you sure you want to delete <span className="font-semibold text-gray-900">{deletingRecord.name}</span> (Serial: <span className="font-mono text-xs">{deletingRecord.serialNumber}</span>)? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setDeletingRecord(null)}
                className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm font-medium hover:bg-[var(--bg-subtle)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={submitting}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white text-sm font-medium hover:bg-rose-700 transition-colors"
              >
                {submitting ? "Deleting..." : "Delete Asset"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

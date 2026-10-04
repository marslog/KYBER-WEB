"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Download,
  Trash2,
  Plus,
  Check,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
  HardDrive,
  CalendarDays,
  FileText,
  X,
  UploadCloud,
} from "lucide-react";
import type { IsoRecord } from "@/lib/isoStore";

/* ─── helpers ─────────────────────────────────────────── */
function fmtDate(ymd: string) {
  if (!ymd) return "—";
  const d = new Date(ymd + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function fmtFileSize(bytes?: number) {
  if (typeof bytes !== "number" || bytes <= 0) return null;
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  let size = bytes;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

/* ─── Row detail expand ───────────────────────────────── */
interface RowProps {
  record: IsoRecord;
  isAdmin: boolean;
  onDelete: (id: string) => void;
  onUpdateRecord: (id: string, updates: { notes?: string; downloadUrl?: string }) => Promise<void>;
}

function IsoRow({ record, isAdmin, onDelete, onUpdateRecord }: RowProps) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(record.notes);
  const [downloadUrl, setDownloadUrl] = useState(record.downloadUrl || "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setNotes(record.notes);
    setDownloadUrl(record.downloadUrl || "");
  }, [record]);

  const handleSave = async () => {
    setSaving(true);
    await onUpdateRecord(record.id, { notes, downloadUrl });
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    setDeleting(true);
    await onDelete(record.id);
  };

  return (
    <div className="rounded-xl border border-[var(--border)] bg-white overflow-hidden transition-shadow hover:shadow-sm">
      {/* ── Main row ── */}
      <div className="flex items-center gap-4 px-5 py-4">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-[var(--brand-soft)] flex items-center justify-center">
          <HardDrive className="w-5 h-5 text-[var(--brand)]" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-[var(--text)] truncate">{record.name}</span>
            {record.version && (
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border)]">
                v{record.version}
              </span>
            )}
            {record.fileSize && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {fmtFileSize(record.fileSize)}
              </span>
            )}
          </div>
          {record.fileName && (
            <p className="text-[11px] text-[var(--text-muted)] truncate mt-0.5 font-mono">
              {record.fileName}
            </p>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-1 text-xs text-[var(--text-muted)] shrink-0">
          <CalendarDays className="w-3.5 h-3.5" />
          {fmtDate(record.uploadDate)}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {record.downloadUrl && (
            <a
              href={record.downloadUrl}
              target={record.downloadUrl.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-[var(--brand)] text-white hover:bg-[var(--brand)]/90 transition-colors"
              id={`iso-download-${record.id}`}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-1.5 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors"
            title={open ? "Collapse" : "Expand"}
          >
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ── Expanded detail ── */}
      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--bg-subtle)] px-5 py-5 space-y-4">
          {record.fileName && (
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <HardDrive className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
              <span>File: <span className="font-mono text-[var(--text)] font-medium">{record.fileName}</span></span>
              {record.fileSize && <span className="text-[var(--text-muted)]">({fmtFileSize(record.fileSize)})</span>}
            </div>
          )}

          {/* Upload date (mobile) */}
          <div className="sm:hidden flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <CalendarDays className="w-3.5 h-3.5" />
            Uploaded: {fmtDate(record.uploadDate)}
          </div>

          {/* Download URL */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1 flex items-center gap-1">
              Download Link / External Cloud URL
            </p>
            {isAdmin ? (
              <div>
                <input
                  type="text"
                  value={downloadUrl}
                  onChange={(e) => setDownloadUrl(e.target.value)}
                  placeholder="e.g. https://storage.kyber-it.com/isos/... or Google Drive / S3 direct link"
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-white text-xs font-mono text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)] transition"
                />
                <p className="text-[10px] text-[var(--text-muted)] mt-1">
                  For production downloads, paste an external URL (AWS S3, Cloudflare R2, Google Drive, or CDN).
                </p>
              </div>
            ) : (
              <p className="text-xs font-mono text-[var(--text-secondary)] truncate bg-[var(--bg)] px-3 py-1.5 rounded-lg border border-[var(--border)]">
                {record.downloadUrl || "—"}
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1 flex items-center gap-1">
              <FileText className="w-3 h-3" /> Notes
            </p>
            {isAdmin ? (
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Add release notes or remarks…"
                className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-white text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)] transition resize-none"
              />
            ) : (
              <p className="text-xs text-[var(--text-secondary)] whitespace-pre-line bg-[var(--bg)] p-3 rounded-lg border border-[var(--border)]">
                {record.notes || "No release notes provided."}
              </p>
            )}
            <div className="flex items-center justify-between mt-2">
              <span className="text-[11px] text-[var(--text-muted)]">
                Added by <span className="font-medium">{record.createdBy}</span> · {new Date(record.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
              </span>
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <>
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                        confirmDelete
                          ? "border-rose-400 bg-rose-50 text-rose-600 hover:bg-rose-100"
                          : "border-[var(--border)] text-[var(--text-muted)] hover:border-rose-300 hover:text-rose-500"
                      }`}
                    >
                      {deleting ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      {confirmDelete ? "Confirm remove" : "Remove"}
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving || (notes === record.notes && downloadUrl === (record.downloadUrl || ""))}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[var(--brand)] text-white hover:bg-[var(--brand)]/90 disabled:opacity-40 transition-colors"
                    >
                      {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                      Save changes
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Add ISO modal ───────────────────────────────────── */
interface AddModalProps {
  onClose: () => void;
  onAdded: (record: IsoRecord) => void;
}

function AddIsoModal({ onClose, onAdded }: AddModalProps) {
  const [form, setForm] = useState({
    name: "",
    version: "",
    sha256: "",
    downloadUrl: "",
    uploadDate: new Date().toISOString().slice(0, 10),
    notes: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    percent: number;
    loaded: number;
    total: number;
    status: string;
  } | null>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  const set = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleFileChange = (f: File | null) => {
    setSelectedFile(f);
    if (f) {
      if (!form.name.trim()) {
        const cleanName = f.name.replace(/\.[^/.]+$/, "").replace(/[-_.]+/g, " ");
        set("name", cleanName);
      }
      if (!form.version.trim()) {
        const match = f.name.match(/v?(\d+\.\d+(\.\d+)?)/i);
        if (match && match[1]) {
          set("version", match[1]);
        }
      }
    }
  };

  const handleCancel = () => {
    if (saving && xhrRef.current) {
      xhrRef.current.abort();
    }
    onClose();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() && !selectedFile) {
      setError("Please select an ISO file or enter an ISO name.");
      return;
    }
    setSaving(true);
    setError("");
    setUploadProgress(null);

    try {
      if (selectedFile) {
        setUploadProgress({
          percent: 0,
          loaded: 0,
          total: selectedFile.size,
          status: "Starting upload…",
        });

        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhrRef.current = xhr;
          xhr.open("POST", "/api/iso-downloads");
          xhr.withCredentials = true;
          xhr.setRequestHeader("Content-Type", "application/octet-stream");
          xhr.setRequestHeader("X-ISO-FileName", encodeURIComponent(selectedFile.name));
          xhr.setRequestHeader("X-ISO-Name", encodeURIComponent(form.name || selectedFile.name.replace(/\.[^/.]+$/, "")));
          xhr.setRequestHeader("X-ISO-Version", encodeURIComponent(form.version));
          xhr.setRequestHeader("X-ISO-Date", form.uploadDate);
          xhr.setRequestHeader("X-ISO-Notes", encodeURIComponent(form.notes));
          xhr.setRequestHeader("X-ISO-DownloadUrl", encodeURIComponent(form.downloadUrl || ""));
          xhr.setRequestHeader("X-ISO-FileSize", String(selectedFile.size));

          xhr.upload.onprogress = (evt) => {
            if (evt.lengthComputable) {
              const pct = Math.min(Math.round((evt.loaded / evt.total) * 100), 99);
              setUploadProgress({
                percent: pct,
                loaded: evt.loaded,
                total: evt.total,
                status: pct >= 99 ? "Finalizing & verifying checksum…" : `Uploading ISO (${pct}%)`,
              });
            }
          };

          xhr.onload = () => {
            xhrRef.current = null;
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const data = JSON.parse(xhr.responseText) as { ok?: boolean; record?: IsoRecord; error?: string };
                if (data.ok && data.record) {
                  setUploadProgress({
                    percent: 100,
                    loaded: selectedFile.size,
                    total: selectedFile.size,
                    status: "Upload complete!",
                  });
                  onAdded(data.record);
                  resolve();
                } else {
                  reject(new Error(data.error || "Failed to upload ISO."));
                }
              } catch {
                reject(new Error("Invalid server response."));
              }
            } else {
              try {
                const data = JSON.parse(xhr.responseText) as { error?: string };
                reject(new Error(data.error || `Server responded with status ${xhr.status}`));
              } catch {
                reject(new Error(`Server error (${xhr.status}).`));
              }
            }
          };

          xhr.onerror = () => {
            xhrRef.current = null;
            reject(new Error("Network error during upload."));
          };
          xhr.onabort = () => {
            xhrRef.current = null;
            reject(new Error("Upload cancelled."));
          };

          xhr.send(selectedFile);
        });
      } else {
        const res = await fetch("/api/iso-downloads", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = (await res.json()) as { ok?: boolean; record?: IsoRecord; error?: string };
        if (!res.ok || !data.ok) { setError(data.error ?? "Failed to add ISO."); return; }
        onAdded(data.record!);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-lg bg-white rounded-2xl border border-[var(--border)] shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand)] mb-0.5">New ISO</p>
            <h2 className="text-xl font-semibold">Upload ISO Image</h2>
          </div>
          <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4" id="add-iso-form">
          {/* File dropzone */}
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
              Select or Drop ISO File
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".iso,.img,.bin,.zip,.tar.gz"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0] || null;
                handleFileChange(f);
              }}
            />
            {selectedFile ? (
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--brand)] bg-[var(--brand-soft)] text-sm">
                <div className="flex items-center gap-2.5 min-w-0">
                  <HardDrive className="w-5 h-5 text-[var(--brand)] shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-[var(--text)] truncate">{selectedFile.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{fmtFileSize(selectedFile.size)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="p-1 rounded-md text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-50 transition-colors shrink-0"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  const f = e.dataTransfer.files?.[0] || null;
                  handleFileChange(f);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center p-5 rounded-xl border-2 border-dashed cursor-pointer transition-colors text-center ${
                  dragActive
                    ? "border-[var(--brand)] bg-[var(--brand-soft)]"
                    : "border-[var(--border)] hover:border-[var(--brand)] hover:bg-[var(--bg-subtle)]"
                }`}
              >
                <UploadCloud className="w-7 h-7 text-[var(--brand)] mb-1.5" />
                <p className="text-sm font-medium text-[var(--text)]">
                  Click to browse or drag &amp; drop ISO file
                </p>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  Supports .iso, .img, .bin, .zip
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">ISO Name <span className="text-rose-500">*</span></label>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. KYBER HCI OS"
                className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Version</label>
              <input
                value={form.version}
                onChange={(e) => set("version", e.target.value)}
                placeholder="e.g. 5.2.1"
                className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Upload Date</label>
              <input
                type="date"
                value={form.uploadDate}
                onChange={(e) => set("uploadDate", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)]"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                External Download URL <span className="text-[var(--text-muted)] font-normal">(Optional: S3 / Cloudflare R2 / Google Drive / CDN)</span>
              </label>
              <input
                value={form.downloadUrl}
                onChange={(e) => set("downloadUrl", e.target.value)}
                placeholder="https://storage.kyber-it.com/isos/... or direct cloud link"
                className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)]"
              />
              <p className="text-[10px] text-[var(--text-muted)] mt-1">
                Direct link for production downloads (allows downloading files &gt; 250MB on Vercel).
              </p>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                rows={3}
                placeholder="Release notes, requirements, changelog…"
                className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)] resize-none"
              />
            </div>
          </div>

          {/* Upload Progress Bar & Count */}
          {uploadProgress !== null && (
            <div className="p-4 rounded-xl border border-[var(--brand)]/30 bg-[var(--brand-soft)] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[var(--brand)] flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  {uploadProgress.status}
                </span>
                <span className="font-mono font-bold text-[var(--brand)] text-sm">
                  {uploadProgress.percent}%
                </span>
              </div>

              {/* Progress bar track & fill */}
              <div className="w-full h-3 rounded-full bg-black/10 overflow-hidden relative shadow-inner">
                <div
                  className="h-full bg-[var(--brand)] rounded-full transition-all duration-150 ease-out shadow-sm"
                  style={{ width: `${uploadProgress.percent}%` }}
                />
              </div>

              {/* Count details: uploaded / total size & remaining */}
              <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
                <span>
                  Uploaded: <span className="font-semibold text-[var(--text)]">{fmtFileSize(uploadProgress.loaded) || "0 B"}</span> / {fmtFileSize(uploadProgress.total) || "0 B"}
                </span>
                <span>
                  {uploadProgress.percent < 100 ? `${100 - uploadProgress.percent}% remaining` : "Processing file…"}
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 text-sm px-5 py-2 rounded-lg bg-[var(--brand)] text-white hover:bg-[var(--brand)]/90 disabled:opacity-50 transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
              {saving
                ? uploadProgress
                  ? `Uploading… ${uploadProgress.percent}%`
                  : "Saving…"
                : selectedFile
                  ? "Upload ISO"
                  : "Save ISO"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Main panel ──────────────────────────────────────── */
export default function IsoDownloadsPanel({ isAdmin }: { isAdmin: boolean }) {
  const [records, setRecords] = useState<IsoRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/iso-downloads", { credentials: "include", cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load ISO list.");
      const data = (await res.json()) as { records: IsoRecord[] };
      setRecords(data.records);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const handleDelete = async (id: string) => {
    await fetch(`/api/iso-downloads/${id}`, { method: "DELETE", credentials: "include" });
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const handleUpdateRecord = async (id: string, updates: { notes?: string; downloadUrl?: string }) => {
    const res = await fetch(`/api/iso-downloads/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const data = (await res.json()) as { record: IsoRecord };
      setRecords((prev) => prev.map((r) => (r.id === id ? data.record : r)));
    }
  };

  const filtered = search.trim()
    ? records.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.version.toLowerCase().includes(search.toLowerCase()) ||
          r.sha256.toLowerCase().includes(search.toLowerCase()) ||
          r.notes.toLowerCase().includes(search.toLowerCase()),
      )
    : records;

  return (
    <div>
      {/* ── Toolbar ── */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, version, notes…"
          className="flex-1 min-w-52 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-white text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)] transition"
          id="iso-search"
        />
        {isAdmin && (
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--brand)] text-white text-sm font-medium hover:bg-[var(--brand)]/90 transition-colors shrink-0"
            id="iso-add-btn"
          >
            <Plus className="w-4 h-4" />
            Import ISO
          </button>
        )}
      </div>

      {/* ── State: loading ── */}
      {loading && (
        <div className="flex items-center justify-center py-16 text-[var(--text-muted)]">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          Loading ISO library…
        </div>
      )}

      {/* ── State: error ── */}
      {!loading && error && (
        <div className="flex items-center gap-3 p-5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm">{error}</span>
          <button onClick={load} className="ml-auto text-sm underline hover:no-underline">Retry</button>
        </div>
      )}

      {/* ── State: empty ── */}
      {!loading && !error && filtered.length === 0 && (
        <div className="py-20 flex flex-col items-center gap-3 text-[var(--text-muted)]">
          <HardDrive className="w-10 h-10 opacity-30" />
          <p className="text-sm">{search ? "No ISOs match your search." : "No ISO images found."}</p>
          {isAdmin && !search && (
            <button onClick={() => setShowAdd(true)} className="text-sm text-[var(--brand)] underline hover:no-underline">
              Import your first ISO
            </button>
          )}
        </div>
      )}

      {/* ── ISO list ── */}
      {!loading && !error && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((record) => (
            <IsoRow
              key={record.id}
              record={record}
              isAdmin={isAdmin}
              onDelete={handleDelete}
              onUpdateRecord={handleUpdateRecord}
            />
          ))}
          <p className="text-xs text-center text-[var(--text-muted)] pt-2">
            {filtered.length} ISO image{filtered.length !== 1 ? "s" : ""} available
          </p>
        </div>
      )}

      {/* ── Add modal ── */}
      {showAdd && (
        <AddIsoModal
          onClose={() => setShowAdd(false)}
          onAdded={(record) => {
            setRecords((prev) => [record, ...prev]);
            setShowAdd(false);
          }}
        />
      )}
    </div>
  );
}

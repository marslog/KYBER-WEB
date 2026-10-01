"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search,
  BookOpen,
  Plus,
  Edit3,
  Trash2,
  Calendar,
  User,
  Tag,
  Clock,
  ArrowRight,
  Check,
  Copy,
  X,
  Loader2,
  AlertCircle,
  Shield,
  Eye,
  ChevronRight,
  FileText,
  Filter,
} from "lucide-react";
import type { KbPost, KbPostInput } from "@/lib/kbStore";

interface KnowledgeBasePanelProps {
  isAdmin: boolean;
  currentUser?: string;
}

const CATEGORIES = [
  "All",
  "Installation Guide",
  "Best Practices",
  "Security & Compliance",
  "Troubleshooting",
  "General",
] as const;

export default function KnowledgeBasePanel({
  isAdmin,
  currentUser,
}: KnowledgeBasePanelProps) {
  const [posts, setPosts] = useState<KbPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Detail reader
  const [readingPost, setReadingPost] = useState<KbPost | null>(null);

  // Editor modal (Admin only)
  const [editingPost, setEditingPost] = useState<KbPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Delete modal (Admin only)
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Copied code feedback
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Load posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/kb", { credentials: "include" });
      if (!res.ok) {
        throw new Error(`Failed to load knowledge base posts (${res.status})`);
      }
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchCat =
        selectedCategory === "All" ||
        p.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = search.trim().toLowerCase();
      if (!q) return matchCat;

      const matchSearch =
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.content.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });
  }, [posts, selectedCategory, search]);

  // Handle Delete (Admin)
  const confirmDelete = async () => {
    if (!deletingId || !isAdmin) return;
    try {
      setActionLoading(true);
      const res = await fetch(`/api/kb/${deletingId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete post");
      }
      setPosts((prev) => prev.filter((p) => p.id !== deletingId));
      if (readingPost?.id === deletingId) setReadingPost(null);
      setDeleteConfirmOpen(false);
      setDeletingId(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Helper for reading time
  const getReadTime = (content: string) => {
    const words = content.trim().split(/\s+/).length;
    const mins = Math.ceil(words / 180);
    return `${mins} min read`;
  };

  return (
    <div className="space-y-6">
      {/* ── Top Role Banner & Info ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-[var(--border)] bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
              isAdmin
                ? "bg-[var(--brand-soft)] text-[var(--brand)]"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}
          >
            {isAdmin ? <Shield className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[var(--text)]">
                {isAdmin ? "Administrator Privileges" : "Standard User Access"}
              </span>
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                  isAdmin
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-100 text-slate-700 border border-slate-200"
                }`}
              >
                {isAdmin ? "Full Authoring & Admin" : "Read-Only Mode"}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              {isAdmin
                ? "You have full access to publish, edit, and manage all installation guides and technical articles."
                : "You have read-only access. You can explore, search, and view technical guides and commands."}
            </p>
          </div>
        </div>

        {/* Admin Action Button */}
        {isAdmin && (
          <button
            onClick={() => {
              setEditingPost(null);
              setIsCreating(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--brand)] text-white text-sm font-medium shadow-sm hover:bg-[var(--brand)]/90 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Post</span>
          </button>
        )}
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="p-4 rounded-xl border border-[var(--border)] bg-white shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search guides by title, keywords, configuration commands, or tags…"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)] transition"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs">
          <Filter className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0 mr-1" />
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  active
                    ? "bg-[var(--brand)] text-white shadow-sm"
                    : "bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text)]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Content Grid / List ── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-[var(--text-muted)]">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--brand)] mb-3" />
          <p className="text-sm font-medium">Loading Knowledge Base articles…</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-center">
          <AlertCircle className="w-6 h-6 mx-auto mb-2 text-rose-600" />
          <p className="font-semibold text-sm">{error}</p>
          <button
            onClick={fetchPosts}
            className="mt-3 px-4 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-medium hover:bg-rose-700 transition"
          >
            Retry Loading
          </button>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-xl border border-dashed border-[var(--border)] bg-white">
          <BookOpen className="w-10 h-10 mx-auto text-[var(--text-muted)] mb-3 opacity-60" />
          <h3 className="text-base font-semibold text-[var(--text)]">No guides found</h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-sm mx-auto">
            {search
              ? `No articles matched your search query "${search}". Try different keywords.`
              : "No articles are available in this category yet."}
          </p>
          {isAdmin && !search && (
            <button
              onClick={() => {
                setEditingPost(null);
                setIsCreating(true);
              }}
              className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[var(--brand)] text-white text-xs font-medium hover:bg-[var(--brand)]/90 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create First Guide</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPosts.map((post) => {
            const isInstallGuide =
              post.category.toLowerCase().includes("install") ||
              post.category.toLowerCase().includes("setup");

            return (
              <div
                key={post.id}
                className="group relative flex flex-col justify-between p-5 rounded-xl border border-[var(--border)] bg-white hover:border-[var(--brand)]/50 hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                        isInstallGuide
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : post.category === "Security & Compliance"
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : post.category === "Troubleshooting"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[var(--text-muted)]">
                      <Clock className="w-3 h-3" />
                      {getReadTime(post.content)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setReadingPost(post)}
                    className="text-base font-semibold text-[var(--text)] group-hover:text-[var(--brand)] transition-colors cursor-pointer line-clamp-2 leading-snug mb-2"
                  >
                    {post.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3 mb-4">
                    {post.summary}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 text-[10px] text-[var(--text-secondary)] bg-[var(--bg-subtle)] px-2 py-0.5 rounded border border-[var(--border)] font-mono"
                        >
                          <Tag className="w-2.5 h-2.5 text-[var(--text-muted)]" />
                          {t}
                        </span>
                      ))}
                      {post.tags.length > 4 && (
                        <span className="text-[10px] text-[var(--text-muted)] self-center">
                          +{post.tags.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer with meta & actions */}
                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-2 mt-auto">
                  <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
                    <span className="inline-flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Admin Actions */}
                    {isAdmin && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingPost(post);
                            setIsCreating(false);
                          }}
                          className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--brand)] hover:bg-[var(--brand-soft)] transition-colors"
                          title="Edit guide"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeletingId(post.id);
                            setDeleteConfirmOpen(true);
                          }}
                          className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete guide"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => setReadingPost(post)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand)] hover:underline ml-1"
                    >
                      Read guide <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Reading Modal / Drawer ── */}
      {readingPost && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-[var(--border)] px-6 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--brand)] bg-[var(--brand-soft)] px-2.5 py-0.5 rounded-md">
                    {readingPost.category}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    • {getReadTime(readingPost.content)}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[var(--text)] truncate">
                  {readingPost.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {isAdmin && (
                  <button
                    onClick={() => {
                      const post = readingPost;
                      setReadingPost(null);
                      setEditingPost(post);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs font-medium text-[var(--text)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                )}
                <button
                  onClick={() => setReadingPost(null)}
                  className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-subtle)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Meta information bar */}
              <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[var(--brand)]" />
                    Author: <span className="font-medium text-[var(--text)]">{readingPost.author}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[var(--brand)]" />
                    Published:{" "}
                    <span className="font-medium text-[var(--text)]">
                      {new Date(readingPost.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </span>
                </div>

                {/* Tags */}
                {readingPost.tags && readingPost.tags.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    {readingPost.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-[var(--border)] text-[var(--text)]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary callout */}
              <div className="p-4 rounded-xl border-l-4 border-l-[var(--brand)] bg-[var(--brand-soft)]/40 text-sm text-[var(--text)] leading-relaxed">
                <span className="font-semibold block mb-1 text-[var(--brand)]">
                  Guide Summary
                </span>
                {readingPost.summary}
              </div>

              {/* Rendered content */}
              <div className="prose max-w-none text-sm text-[var(--text)] leading-relaxed space-y-4">
                <SimpleMarkdownRenderer
                  content={readingPost.content}
                  onCopyCode={handleCopyCode}
                  copiedId={copiedCodeId}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-[var(--bg-subtle)] border-t border-[var(--border)] px-6 py-3 flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>Last updated: {new Date(readingPost.updatedAt).toLocaleDateString("en-GB")}</span>
              <button
                onClick={() => setReadingPost(null)}
                className="px-4 py-1.5 rounded-lg bg-[var(--brand)] text-white font-medium hover:bg-[var(--brand)]/90 transition"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Admin Create / Edit Modal ── */}
      {isAdmin && (isCreating || editingPost) && (
        <PostEditorModal
          post={editingPost}
          onClose={() => {
            setIsCreating(false);
            setEditingPost(null);
          }}
          onSaved={(saved) => {
            setPosts((prev) => {
              const idx = prev.findIndex((p) => p.id === saved.id);
              if (idx >= 0) {
                const next = [...prev];
                next[idx] = saved;
                return next;
              }
              return [saved, ...prev];
            });
            setIsCreating(false);
            setEditingPost(null);
            setReadingPost(saved);
          }}
        />
      )}

      {/* ── Admin Delete Confirm Dialog ── */}
      {isAdmin && deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-[var(--border)] p-6 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[var(--text)]">Delete Guide</h3>
                <p className="text-xs text-[var(--text-muted)]">This action cannot be undone.</p>
              </div>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              Are you sure you want to permanently delete this Knowledge Base post from the server?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setDeleteConfirmOpen(false);
                  setDeletingId(null);
                }}
                disabled={actionLoading}
                className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--text)] hover:bg-[var(--bg-subtle)] transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={actionLoading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600 text-white text-sm font-medium hover:bg-rose-700 transition"
              >
                {actionLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Simple Markdown & Code block renderer ────────────────────── */
function SimpleMarkdownRenderer({
  content,
  onCopyCode,
  copiedId,
}: {
  content: string;
  onCopyCode: (text: string, id: string) => void;
  copiedId: string | null;
}) {
  const sections = useMemo(() => {
    const lines = content.split("\n");
    const elements: Array<{
      type: "h2" | "h3" | "p" | "code" | "list";
      content: string;
      codeLang?: string;
    }> = [];

    let inCode = false;
    let codeBuffer: string[] = [];
    let codeLang = "";
    let listBuffer: string[] = [];

    const flushList = () => {
      if (listBuffer.length > 0) {
        elements.push({ type: "list", content: listBuffer.join("\n") });
        listBuffer = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith("```")) {
        if (!inCode) {
          flushList();
          inCode = true;
          codeLang = line.replace("```", "").trim();
          codeBuffer = [];
        } else {
          inCode = false;
          elements.push({
            type: "code",
            content: codeBuffer.join("\n"),
            codeLang,
          });
          codeBuffer = [];
        }
        continue;
      }

      if (inCode) {
        codeBuffer.push(line);
        continue;
      }

      if (line.startsWith("## ")) {
        flushList();
        elements.push({ type: "h2", content: line.replace("## ", "").trim() });
      } else if (line.startsWith("### ")) {
        flushList();
        elements.push({ type: "h3", content: line.replace("### ", "").trim() });
      } else if (line.startsWith("- ") || line.startsWith("* ")) {
        listBuffer.push(line.replace(/^[-*]\s+/, ""));
      } else if (line.trim().length > 0) {
        flushList();
        elements.push({ type: "p", content: line });
      } else {
        flushList();
      }
    }

    flushList();
    if (inCode && codeBuffer.length > 0) {
      elements.push({ type: "code", content: codeBuffer.join("\n"), codeLang });
    }

    return elements;
  }, [content]);

  return (
    <div className="space-y-4">
      {sections.map((el, idx) => {
        if (el.type === "h2") {
          return (
            <h2
              key={idx}
              className="text-lg font-bold text-[var(--text)] pt-4 pb-1 border-b border-[var(--border)] flex items-center gap-2"
            >
              <ChevronRight className="w-4 h-4 text-[var(--brand)] shrink-0" />
              {el.content}
            </h2>
          );
        }
        if (el.type === "h3") {
          return (
            <h3 key={idx} className="text-base font-semibold text-[var(--text)] pt-2">
              {el.content}
            </h3>
          );
        }
        if (el.type === "list") {
          const items = el.content.split("\n");
          return (
            <ul key={idx} className="list-disc list-inside space-y-1 pl-2 text-sm text-[var(--text)]">
              {items.map((it, i) => (
                <li key={i} className="leading-relaxed">
                  {it}
                </li>
              ))}
            </ul>
          );
        }
        if (el.type === "code") {
          const codeId = `code-block-${idx}`;
          const isCopied = copiedId === codeId;
          return (
            <div
              key={idx}
              className="relative my-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-100 overflow-hidden text-xs font-mono shadow-inner"
            >
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400">
                <span>{el.codeLang || "bash / config"}</span>
                <button
                  type="button"
                  onClick={() => onCopyCode(el.content, codeId)}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto leading-relaxed">
                <code>{el.content}</code>
              </pre>
            </div>
          );
        }
        return (
          <p key={idx} className="text-sm text-[var(--text)] leading-relaxed">
            {el.content}
          </p>
        );
      })}
    </div>
  );
}

/* ── Admin Post Editor Modal ─────────────────────────────────── */
function PostEditorModal({
  post,
  onClose,
  onSaved,
}: {
  post: KbPost | null;
  onClose: () => void;
  onSaved: (saved: KbPost) => void;
}) {
  const isEditing = !!post;
  const [form, setForm] = useState<KbPostInput>({
    title: post?.title || "",
    category: post?.category || "Installation Guide",
    tags: post?.tags || [],
    summary: post?.summary || "",
    content: post?.content || "",
  });
  const [tagInput, setTagInput] = useState(post?.tags?.join(", ") || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Please provide a title for the post.");
      return;
    }
    if (!form.content.trim()) {
      setError("Content cannot be empty.");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const parsedTags = tagInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        ...form,
        tags: parsedTags,
      };

      const url = isEditing ? `/api/kb/${post.id}` : "/api/kb";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to save post.");
      }

      onSaved(data.post);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-[var(--border)] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[var(--brand)]" />
            <h2 className="text-lg font-bold text-[var(--text)]">
              {isEditing ? "Edit Knowledge Base Guide" : "Create New Knowledge Base Guide"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {error && (
            <div className="p-3 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[var(--text)] mb-1">
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. KYBER HCI Node Deployment & OS Installation Guide"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-white text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)] transition"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-white text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)] transition"
              >
                <option value="Installation Guide">Installation Guide</option>
                <option value="Best Practices">Best Practices</option>
                <option value="Security & Compliance">Security & Compliance</option>
                <option value="Troubleshooting">Troubleshooting</option>
                <option value="Performance Tuning">Performance Tuning</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="e.g. HCI, Baremetal, UEFI, ISO, Cluster"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-white text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--text)] mb-1">
              Summary / Excerpt
            </label>
            <textarea
              rows={2}
              value={form.summary}
              onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
              placeholder="Brief summary explaining what this guide covers and its objectives…"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-white text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)] transition resize-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-[var(--text)]">
                Content (Markdown supported) <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-[var(--text-muted)]">
                Supports ## Headings, - lists, ```bash code blocks
              </span>
            </div>
            <textarea
              rows={12}
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              placeholder={`## 1. Prerequisites\n- Hardware requirements...\n\n## 2. Installation Steps\nRun the following command:\n\`\`\`bash\nsudo kyber-setup --init\n\`\`\``}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-white text-sm font-mono text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)] transition leading-relaxed"
              required
            />
          </div>

          {/* Footer actions */}
          <div className="pt-4 border-t border-[var(--border)] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--text)] hover:bg-[var(--bg-subtle)] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[var(--brand)] text-white text-sm font-semibold hover:bg-[var(--brand)]/90 shadow-sm transition disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              <span>{isEditing ? "Save Changes" : "Publish Guide"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

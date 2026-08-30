"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import type { PortalRole, PortalUserPublic } from "@/lib/portalUserStore";

type UserFormState = {
  username: string;
  password: string;
  role: PortalRole;
};

const EMPTY_FORM: UserFormState = {
  username: "",
  password: "",
  role: "user",
};

export default function AccountManagementPanel() {
  const [users, setUsers] = useState<PortalUserPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [createForm, setCreateForm] = useState<UserFormState>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<UserFormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const loadUsers = useCallback(async () => {
    setError("");
    try {
      const response = await fetch("/api/portal-users", {
        credentials: "include",
        cache: "no-store",
      });
      const data = (await response.json()) as { users?: PortalUserPublic[]; error?: string };
      if (!response.ok) {
        setError(data.error || "Unable to load users.");
        return;
      }
      setUsers(data.users || []);
    } catch {
      setError("Unable to load users.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/portal-users", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error || "Unable to create user.");
        return;
      }

      setCreateForm(EMPTY_FORM);
      setMessage("User account created.");
      await loadUsers();
    } catch {
      setError("Unable to create user.");
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(user: PortalUserPublic) {
    setEditingId(user.id);
    setEditForm({
      username: user.username,
      password: "",
      role: user.role,
    });
    setError("");
    setMessage("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(EMPTY_FORM);
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingId) return;

    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/portal-users/${editingId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: editForm.username,
          role: editForm.role,
          ...(editForm.password ? { password: editForm.password } : {}),
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error || "Unable to update user.");
        return;
      }

      cancelEdit();
      setMessage("User account updated.");
      await loadUsers();
    } catch {
      setError("Unable to update user.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(user: PortalUserPublic) {
    if (!window.confirm(`Delete account "${user.username}"?`)) return;

    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/portal-users/${user.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error || "Unable to delete user.");
        return;
      }

      setMessage("User account deleted.");
      await loadUsers();
    } catch {
      setError("Unable to delete user.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-[var(--border)] bg-white p-6">
        <h2 className="text-lg font-semibold mb-1">Create user account</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-5">
          Add a new administrator or standard user. Passwords are stored using a one-way hash.
        </p>

        <form onSubmit={handleCreate} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="create-username" className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
              Username
            </label>
            <input
              id="create-username"
              value={createForm.username}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, username: event.target.value }))}
              required
              className="w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="create-password" className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
              Password
            </label>
            <input
              id="create-password"
              type="password"
              value={createForm.password}
              onChange={(event) => setCreateForm((prev) => ({ ...prev, password: event.target.value }))}
              required
              className="w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="create-role" className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
              Role (RBAC)
            </label>
            <select
              id="create-role"
              value={createForm.role}
              onChange={(event) =>
                setCreateForm((prev) => ({ ...prev, role: event.target.value as PortalRole }))
              }
              className="w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm bg-white"
            >
              <option value="user">User</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" disabled={submitting} className="kyber-btn-primary w-full justify-center">
              Create account
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-xl border border-[var(--border)] bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--border)]">
          <h2 className="text-lg font-semibold">User accounts</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Edit roles, reset passwords, or remove accounts. At least one administrator must remain.
          </p>
        </div>

        {loading ? (
          <p className="px-6 py-8 text-sm text-[var(--text-muted)]">Loading accounts...</p>
        ) : users.length === 0 ? (
          <p className="px-6 py-8 text-sm text-[var(--text-muted)]">No accounts found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[var(--bg-subtle)] text-left text-xs uppercase tracking-wider text-[var(--text-muted)]">
                <tr>
                  <th className="px-6 py-3 font-semibold">Username</th>
                  <th className="px-6 py-3 font-semibold">Role</th>
                  <th className="px-6 py-3 font-semibold">Updated</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-[var(--border)]">
                    <td className="px-6 py-4 font-medium">{user.username}</td>
                    <td className="px-6 py-4 capitalize">{user.role}</td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">
                      {new Date(user.updatedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(user)}
                          className="rounded-md border border-[var(--border)] px-3 py-1.5 text-xs font-medium hover:border-[var(--brand)] hover:text-[var(--brand)]"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleDelete(user)}
                          disabled={submitting}
                          className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {editingId && (
        <section className="rounded-xl border border-[var(--brand)] bg-[var(--brand-soft)] p-6">
          <h2 className="text-lg font-semibold mb-4">Edit user account</h2>
          <form onSubmit={handleUpdate} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="edit-username" className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                Username
              </label>
              <input
                id="edit-username"
                value={editForm.username}
                onChange={(event) => setEditForm((prev) => ({ ...prev, username: event.target.value }))}
                required
                className="w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm bg-white"
              />
            </div>
            <div>
              <label htmlFor="edit-password" className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                New password (optional)
              </label>
              <input
                id="edit-password"
                type="password"
                value={editForm.password}
                onChange={(event) => setEditForm((prev) => ({ ...prev, password: event.target.value }))}
                placeholder="Leave blank to keep current"
                className="w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm bg-white"
              />
            </div>
            <div>
              <label htmlFor="edit-role" className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                Role (RBAC)
              </label>
              <select
                id="edit-role"
                value={editForm.role}
                onChange={(event) =>
                  setEditForm((prev) => ({ ...prev, role: event.target.value as PortalRole }))
                }
                className="w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm bg-white"
              >
                <option value="user">User</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button type="submit" disabled={submitting} className="kyber-btn-primary flex-1 justify-center">
                Save changes
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm bg-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {message && (
        <p className="text-sm text-[var(--brand)]" role="status">
          {message}
        </p>
      )}
    </div>
  );
}

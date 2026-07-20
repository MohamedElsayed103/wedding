"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Template } from "@/lib/admin/types";

const input = "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none";
const label = "mb-1 block text-xs font-medium text-neutral-500";

export function TemplatesManager({ templates }: { templates: Template[] }) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [accentColor, setAccentColor] = useState("#c9a24b");
  const [error, setError] = useState("");

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, accentColor }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Could not create template.");
      return;
    }
    setName("");
    setDescription("");
    setAccentColor("#c9a24b");
    setCreating(false);
    router.refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this template? Sites using it will keep their templateId reference.")) return;
    await fetch(`/api/admin/templates/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-800">Templates</h1>
        <button
          onClick={() => setCreating((v) => !v)}
          className="rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
        >
          {creating ? "Cancel" : "+ New template"}
        </button>
      </div>

      {creating && (
        <form onSubmit={create} className="mb-6 rounded-lg border border-neutral-200 bg-white p-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Name</label>
              <input className={input} value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className={label}>Accent color</label>
              <div className="flex items-center gap-2">
                <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="h-9 w-12 rounded border border-neutral-300" />
                <input className={input} value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
              </div>
            </div>
            <div className="col-span-2">
              <label className={label}>Description</label>
              <textarea className={input} rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <button type="submit" className="mt-4 rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700">
            Create
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((t) => (
          <div key={t.id} className="rounded-lg border border-neutral-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border border-neutral-200" style={{ background: t.accentColor }} />
              <h3 className="font-medium text-neutral-800">{t.name}</h3>
            </div>
            <p className="mt-2 text-sm text-neutral-500">{t.description}</p>
            <button onClick={() => remove(t.id)} className="mt-4 text-xs text-red-500 hover:underline">
              Delete
            </button>
          </div>
        ))}
        {templates.length === 0 && <p className="text-sm text-neutral-400">No templates yet.</p>}
      </div>
    </div>
  );
}

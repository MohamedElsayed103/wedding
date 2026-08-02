"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Template } from "@/lib/admin/types";
import { DESIGN_META, DEFAULT_DESIGN_ID, designName } from "@/components/designs/meta";

const input = "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none";
const label = "mb-1 block text-xs font-medium text-neutral-500";

export function TemplatesManager({ templates }: { templates: Template[] }) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [accentColor, setAccentColor] = useState("#c9a24b");
  const [designId, setDesignId] = useState(DEFAULT_DESIGN_ID);
  const [error, setError] = useState("");

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, accentColor, designId }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Could not create template.");
      return;
    }
    setName("");
    setDescription("");
    setAccentColor("#c9a24b");
    setDesignId(DEFAULT_DESIGN_ID);
    setCreating(false);
    router.refresh();
  };

  const onDesign = (id: string) => {
    setDesignId(id);
    // Prefill from the chosen design so a theme is one click if unchanged.
    const d = DESIGN_META.find((m) => m.id === id);
    if (d) {
      setAccentColor(d.accentColor);
      if (!name) setName(d.name);
      if (!description) setDescription(d.description);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this template? Sites using it will keep their templateId reference.")) return;
    await fetch(`/api/admin/templates/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-800">Templates <span className="font-normal text-neutral-400">(themes)</span></h1>
        <button
          onClick={() => setCreating((v) => !v)}
          className="rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
        >
          {creating ? "Cancel" : "+ New theme"}
        </button>
      </div>
      <p className="mb-6 max-w-2xl rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">
        A template here is a <strong>theme</strong> — a name + accent colour applied to the one
        cinematic film design. It re-tints a couple&apos;s site; it does not create a new layout.
        A genuinely new <em>design</em> (different scenes/animation) ships in code, then appears here
        to pick from. Assign a theme to a couple in the site editor.
      </p>

      {creating && (
        <form onSubmit={create} className="mb-6 rounded-lg border border-neutral-200 bg-white p-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={label}>Design (coded layout &amp; animation)</label>
              <select className={input} value={designId} onChange={(e) => onDesign(e.target.value)}>
                {DESIGN_META.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              <p className="mt-1 text-xs text-neutral-400">
                {DESIGN_META.find((d) => d.id === designId)?.description}
              </p>
            </div>
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
            <span className="mt-3 inline-block rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
              {designName(t.designId)}
            </span>
            <div className="mt-4 flex items-center gap-4">
              <a
                href={`/demo?design=${encodeURIComponent(t.designId ?? "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-neutral-700 hover:underline"
              >
                Preview ↗
              </a>
              <button onClick={() => remove(t.id)} className="text-xs text-red-500 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
        {templates.length === 0 && <p className="text-sm text-neutral-400">No templates yet.</p>}
      </div>
    </div>
  );
}

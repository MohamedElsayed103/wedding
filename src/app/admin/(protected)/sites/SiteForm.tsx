"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Couple } from "@/components/characters/Couple";
import type { MemoryEntry, PlanTier, Site, SiteStatus, Template } from "@/lib/admin/types";

type FormState = Omit<Site, "id" | "createdAt" | "updatedAt">;

const emptySite = (templateId: string): FormState => ({
  slug: "",
  status: "draft",
  planTier: "bespoke",
  templateId,
  groomName_en: "",
  groomName_ar: "",
  brideName_en: "",
  brideName_ar: "",
  weddingDate: "",
  dateLabel_en: "",
  dateLabel_ar: "",
  dateDots: "",
  venueName_en: "",
  venueName_ar: "",
  venueCity_en: "",
  venueCity_ar: "",
  venueMapsUrl: "",
  defaultLanguage: "en",
  memories: [],
  groomLook: { skinTone: "fair", outfitPalette: "espresso", beardStyle: "short" },
  brideLook: { skinTone: "fair", outfitPalette: "champagne" },
  domain: "",
  notes: "",
});

function newMemory(): MemoryEntry {
  return {
    id: `memory-${Math.random().toString(36).slice(2, 8)}`,
    icon: "✦",
    title_en: "",
    title_ar: "",
    caption_en: "",
    caption_ar: "",
  };
}

const label = "mb-1 block text-xs font-medium text-neutral-500";
const input = "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none";
const section = "rounded-lg border border-neutral-200 bg-white p-5";

export function SiteForm({ site, templates }: { site?: Site; templates: Template[] }) {
  const router = useRouter();
  const isEdit = !!site;
  const [form, setForm] = useState<FormState>(
    site
      ? {
          slug: site.slug,
          status: site.status,
          planTier: site.planTier,
          templateId: site.templateId,
          groomName_en: site.groomName_en,
          groomName_ar: site.groomName_ar,
          brideName_en: site.brideName_en,
          brideName_ar: site.brideName_ar,
          weddingDate: site.weddingDate,
          dateLabel_en: site.dateLabel_en,
          dateLabel_ar: site.dateLabel_ar,
          dateDots: site.dateDots,
          venueName_en: site.venueName_en,
          venueName_ar: site.venueName_ar,
          venueCity_en: site.venueCity_en,
          venueCity_ar: site.venueCity_ar,
          venueMapsUrl: site.venueMapsUrl,
          defaultLanguage: site.defaultLanguage,
          memories: site.memories,
          groomLook: site.groomLook,
          brideLook: site.brideLook,
          domain: site.domain ?? "",
          notes: site.notes ?? "",
        }
      : emptySite(templates[0]?.id ?? "")
  );
  const [attirePreview, setAttirePreview] = useState<"signature" | "ceremony">("signature");
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [error, setError] = useState("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(isEdit ? `/api/admin/sites/${site!.id}` : "/api/admin/sites", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Save failed.");
        setSaving(false);
        return;
      }
      const saved = await res.json();
      setSaving(false);
      if (isEdit) {
        setSavedAt(Date.now());
        router.refresh();
      } else {
        router.push(`/admin/sites/${saved.id}`);
      }
    } catch {
      setError("Network error.");
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!site) return;
    if (!confirm(`Delete ${site.groomName_en} & ${site.brideName_en}'s site? This can't be undone.`)) return;
    await fetch(`/api/admin/sites/${site.id}`, { method: "DELETE" });
    router.push("/admin/sites");
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
      <form onSubmit={submit} className="flex flex-col gap-6">
        <div className={section}>
          <h2 className="mb-4 text-sm font-semibold text-neutral-700">Basics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Slug</label>
              <input className={input} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="mohamed-mariam" required />
            </div>
            <div>
              <label className={label}>Template</label>
              <select className={input} value={form.templateId} onChange={(e) => set("templateId", e.target.value)}>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>Plan tier</label>
              <select className={input} value={form.planTier} onChange={(e) => set("planTier", e.target.value as PlanTier)}>
                <option value="signature">Signature</option>
                <option value="bespoke">Bespoke</option>
                <option value="studio">Studio</option>
              </select>
            </div>
            <div>
              <label className={label}>Status</label>
              <select className={input} value={form.status} onChange={(e) => set("status", e.target.value as SiteStatus)}>
                <option value="draft">Draft</option>
                <option value="paid">Paid</option>
                <option value="live">Live</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label className={label}>Default language</label>
              <select className={input} value={form.defaultLanguage} onChange={(e) => set("defaultLanguage", e.target.value as "en" | "ar")}>
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
            <div>
              <label className={label}>Custom domain (optional)</label>
              <input className={input} value={form.domain} onChange={(e) => set("domain", e.target.value)} placeholder="mohamedandmariam.com" />
            </div>
          </div>
        </div>

        <div className={section}>
          <h2 className="mb-4 text-sm font-semibold text-neutral-700">Couple</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Groom name (EN)</label>
              <input className={input} value={form.groomName_en} onChange={(e) => set("groomName_en", e.target.value)} required />
            </div>
            <div>
              <label className={label}>Groom name (AR)</label>
              <input className={input} dir="rtl" value={form.groomName_ar} onChange={(e) => set("groomName_ar", e.target.value)} />
            </div>
            <div>
              <label className={label}>Bride name (EN)</label>
              <input className={input} value={form.brideName_en} onChange={(e) => set("brideName_en", e.target.value)} required />
            </div>
            <div>
              <label className={label}>Bride name (AR)</label>
              <input className={input} dir="rtl" value={form.brideName_ar} onChange={(e) => set("brideName_ar", e.target.value)} />
            </div>
          </div>
        </div>

        <div className={section}>
          <h2 className="mb-4 text-sm font-semibold text-neutral-700">Date &amp; venue</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Wedding date/time</label>
              <input type="datetime-local" className={input} value={form.weddingDate.slice(0, 16)} onChange={(e) => set("weddingDate", e.target.value)} required />
            </div>
            <div>
              <label className={label}>Date dots ("27 • 08 • 2026")</label>
              <input className={input} value={form.dateDots} onChange={(e) => set("dateDots", e.target.value)} />
            </div>
            <div>
              <label className={label}>Date label (EN)</label>
              <input className={input} value={form.dateLabel_en} onChange={(e) => set("dateLabel_en", e.target.value)} placeholder="27 August 2026" />
            </div>
            <div>
              <label className={label}>Date label (AR)</label>
              <input className={input} dir="rtl" value={form.dateLabel_ar} onChange={(e) => set("dateLabel_ar", e.target.value)} placeholder="27 أغسطس 2026" />
            </div>
            <div>
              <label className={label}>Venue name (EN)</label>
              <input className={input} value={form.venueName_en} onChange={(e) => set("venueName_en", e.target.value)} />
            </div>
            <div>
              <label className={label}>Venue name (AR)</label>
              <input className={input} dir="rtl" value={form.venueName_ar} onChange={(e) => set("venueName_ar", e.target.value)} />
            </div>
            <div>
              <label className={label}>Venue city (EN)</label>
              <input className={input} value={form.venueCity_en} onChange={(e) => set("venueCity_en", e.target.value)} />
            </div>
            <div>
              <label className={label}>Venue city (AR)</label>
              <input className={input} dir="rtl" value={form.venueCity_ar} onChange={(e) => set("venueCity_ar", e.target.value)} />
            </div>
            <div className="col-span-2">
              <label className={label}>Google Maps link</label>
              <input className={input} value={form.venueMapsUrl} onChange={(e) => set("venueMapsUrl", e.target.value)} placeholder="https://maps.app.goo.gl/..." />
            </div>
          </div>
        </div>

        <div className={section}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-700">Memories (the journey chapter)</h2>
            <button
              type="button"
              onClick={() => set("memories", [...form.memories, newMemory()])}
              className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
            >
              + Add memory
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {form.memories.map((m, i) => (
              <div key={m.id} className="rounded-md border border-neutral-200 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <input
                    className="w-16 rounded border border-neutral-200 px-2 py-1 text-center text-sm"
                    value={m.icon}
                    onChange={(e) => {
                      const next = [...form.memories];
                      next[i] = { ...m, icon: e.target.value };
                      set("memories", next);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => set("memories", form.memories.filter((_, j) => j !== i))}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input className={input} placeholder="Title (EN)" value={m.title_en} onChange={(e) => {
                    const next = [...form.memories]; next[i] = { ...m, title_en: e.target.value }; set("memories", next);
                  }} />
                  <input className={input} dir="rtl" placeholder="العنوان (AR)" value={m.title_ar} onChange={(e) => {
                    const next = [...form.memories]; next[i] = { ...m, title_ar: e.target.value }; set("memories", next);
                  }} />
                  <textarea className={input} placeholder="Caption (EN)" rows={2} value={m.caption_en} onChange={(e) => {
                    const next = [...form.memories]; next[i] = { ...m, caption_en: e.target.value }; set("memories", next);
                  }} />
                  <textarea className={input} dir="rtl" placeholder="الوصف (AR)" rows={2} value={m.caption_ar} onChange={(e) => {
                    const next = [...form.memories]; next[i] = { ...m, caption_ar: e.target.value }; set("memories", next);
                  }} />
                </div>
              </div>
            ))}
            {form.memories.length === 0 && <p className="text-sm text-neutral-400">No memories yet.</p>}
          </div>
        </div>

        <div className={section}>
          <h2 className="mb-1 text-sm font-semibold text-neutral-700">Internal notes</h2>
          <p className="mb-3 text-xs text-neutral-400">Never shown to guests.</p>
          <textarea className={input} rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-neutral-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-60"
          >
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create site"}
          </button>
          {savedAt && <span className="text-sm text-green-600">Saved ✓</span>}
          {isEdit && (
            <button
              type="button"
              onClick={remove}
              className="ml-auto rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
            >
              Delete site
            </button>
          )}
        </div>
      </form>

      {/* Live character preview — the actual production components, not a mockup */}
      <div className="lg:sticky lg:top-8 lg:self-start">
        <div className="rounded-lg border border-neutral-200 bg-gradient-to-b from-[#f6efe2] to-[#e8dcc6] p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-700">Live preview</h2>
            <div className="flex overflow-hidden rounded-md border border-neutral-300 text-xs">
              <button
                type="button"
                onClick={() => setAttirePreview("signature")}
                className={`px-2 py-1 ${attirePreview === "signature" ? "bg-neutral-800 text-white" : "bg-white text-neutral-600"}`}
              >
                Signature
              </button>
              <button
                type="button"
                onClick={() => setAttirePreview("ceremony")}
                className={`px-2 py-1 ${attirePreview === "ceremony" ? "bg-neutral-800 text-white" : "bg-white text-neutral-600"}`}
              >
                Ceremony
              </button>
            </div>
          </div>
          <div className="flex h-72 items-end justify-center overflow-hidden rounded-md">
            <Couple
              attire={attirePreview}
              animate={false}
              groomSkinTone={form.groomLook.skinTone}
              groomPalette={form.groomLook.outfitPalette as "espresso" | "olive" | "navy"}
              groomBeard={form.groomLook.beardStyle}
              brideSkinTone={form.brideLook.skinTone}
              bridePalette={form.brideLook.outfitPalette as "champagne" | "rose" | "sage"}
              className="h-64"
            />
          </div>
          <p className="mt-3 text-center text-xs text-neutral-500">
            {form.groomName_en || "Groom"} &amp; {form.brideName_en || "Bride"}
          </p>
        </div>

        <div className="mt-4 rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-neutral-700">Groom look</h2>
          <div className="flex flex-col gap-3">
            <div>
              <label className={label}>Skin tone</label>
              <select
                className={input}
                value={form.groomLook.skinTone}
                onChange={(e) => set("groomLook", { ...form.groomLook, skinTone: e.target.value as "fair" | "medium" | "tan" })}
              >
                <option value="fair">Fair</option>
                <option value="medium">Medium</option>
                <option value="tan">Tan</option>
              </select>
            </div>
            <div>
              <label className={label}>Suit palette (Signature only)</label>
              <select
                className={input}
                value={form.groomLook.outfitPalette}
                onChange={(e) => set("groomLook", { ...form.groomLook, outfitPalette: e.target.value })}
              >
                <option value="espresso">Espresso</option>
                <option value="olive">Olive</option>
                <option value="navy">Navy</option>
              </select>
            </div>
            <div>
              <label className={label}>Beard</label>
              <select
                className={input}
                value={form.groomLook.beardStyle}
                onChange={(e) => set("groomLook", { ...form.groomLook, beardStyle: e.target.value as "short" | "none" })}
              >
                <option value="short">Short, groomed</option>
                <option value="none">Clean-shaven</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-neutral-700">Bride look</h2>
          <div className="flex flex-col gap-3">
            <div>
              <label className={label}>Skin tone</label>
              <select
                className={input}
                value={form.brideLook.skinTone}
                onChange={(e) => set("brideLook", { ...form.brideLook, skinTone: e.target.value as "fair" | "medium" | "tan" })}
              >
                <option value="fair">Fair</option>
                <option value="medium">Medium</option>
                <option value="tan">Tan</option>
              </select>
            </div>
            <div>
              <label className={label}>Satin palette (Signature only)</label>
              <select
                className={input}
                value={form.brideLook.outfitPalette}
                onChange={(e) => set("brideLook", { ...form.brideLook, outfitPalette: e.target.value })}
              >
                <option value="champagne">Champagne</option>
                <option value="rose">Rose</option>
                <option value="sage">Sage</option>
              </select>
            </div>
          </div>
          <p className="mt-3 text-xs text-neutral-400">
            More hair/beard/hijab styles land here as art is commissioned — see BUSINESS_PLAN.md §4 Phase B.
          </p>
        </div>
      </div>
    </div>
  );
}

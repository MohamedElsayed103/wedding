"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Couple } from "@/components/characters/Couple";
import {
  BRIDE_DEFAULT_LOOK,
  GROOM_DEFAULT_LOOK,
  OPTIONS,
  type AvatarLook,
} from "@/components/characters/avatar/types";
import type { ChapterEntry, PlanTier, Site, SiteStatus, Template } from "@/lib/admin/types";

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
  chapters: [],
  groomLook: GROOM_DEFAULT_LOOK,
  brideLook: BRIDE_DEFAULT_LOOK,
  domain: "",
  notes: "",
});

const newChapter = (n: number): ChapterEntry => ({
  id: `ch-${Math.random().toString(36).slice(2, 8)}`,
  label_en: `Chapter ${n}`,
  label_ar: `الفصل ${n}`,
  text_en: "",
  text_ar: "",
});

const label = "mb-1 block text-xs font-medium text-neutral-500";
const input = "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none";
const section = "rounded-lg border border-neutral-200 bg-white p-5";

function Select({ value, onChange, opts }: { value: string; onChange: (v: string) => void; opts: readonly string[] }) {
  return (
    <select className={input} value={value} onChange={(e) => onChange(e.target.value)}>
      {opts.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

function LookEditor({ role, look, onChange }: { role: "groom" | "bride"; look: AvatarLook; onChange: (l: AvatarLook) => void }) {
  const set = (k: keyof AvatarLook, v: string) => onChange({ ...look, [k]: v });
  return (
    <div className="grid grid-cols-2 gap-3">
      <div><span className={label}>Skin tone</span><Select value={look.skinTone} onChange={(v) => set("skinTone", v)} opts={OPTIONS.skinTone} /></div>
      <div><span className={label}>Face shape</span><Select value={look.faceShape} onChange={(v) => set("faceShape", v)} opts={OPTIONS.faceShape} /></div>
      <div><span className={label}>Eyes</span><Select value={look.eyes} onChange={(v) => set("eyes", v)} opts={OPTIONS.eyes} /></div>
      <div><span className={label}>Brows</span><Select value={look.brows} onChange={(v) => set("brows", v)} opts={OPTIONS.brows} /></div>
      <div><span className={label}>Nose</span><Select value={look.nose} onChange={(v) => set("nose", v)} opts={OPTIONS.nose} /></div>
      <div><span className={label}>Mouth</span><Select value={look.mouth} onChange={(v) => set("mouth", v)} opts={OPTIONS.mouth} /></div>
      <div><span className={label}>Hair</span><Select value={look.hair} onChange={(v) => set("hair", v)} opts={role === "groom" ? OPTIONS.groomHair : OPTIONS.brideHair} /></div>
      <div><span className={label}>Hair colour</span><Select value={look.hairColor} onChange={(v) => set("hairColor", v)} opts={OPTIONS.hairColor} /></div>
      <div><span className={label}>Glasses</span><Select value={look.glasses} onChange={(v) => set("glasses", v)} opts={OPTIONS.glasses} /></div>
      {role === "groom" ? (
        <>
          <div><span className={label}>Beard</span><Select value={look.beard} onChange={(v) => set("beard", v)} opts={OPTIONS.beard} /></div>
          <div><span className={label}>Suit</span><Select value={look.outfit} onChange={(v) => set("outfit", v)} opts={OPTIONS.groomOutfit} /></div>
        </>
      ) : (
        <>
          <div><span className={label}>Hijab</span><Select value={look.hijab} onChange={(v) => set("hijab", v)} opts={OPTIONS.hijab} /></div>
          <div><span className={label}>Dress</span><Select value={look.outfit} onChange={(v) => set("outfit", v)} opts={OPTIONS.brideOutfit} /></div>
        </>
      )}
    </div>
  );
}

export function SiteForm({ site, templates }: { site?: Site; templates: Template[] }) {
  const router = useRouter();
  const isEdit = !!site;
  const [form, setForm] = useState<FormState>(() =>
    site
      ? {
          slug: site.slug, status: site.status, planTier: site.planTier, templateId: site.templateId,
          groomName_en: site.groomName_en, groomName_ar: site.groomName_ar,
          brideName_en: site.brideName_en, brideName_ar: site.brideName_ar,
          weddingDate: site.weddingDate, dateLabel_en: site.dateLabel_en, dateLabel_ar: site.dateLabel_ar, dateDots: site.dateDots,
          venueName_en: site.venueName_en, venueName_ar: site.venueName_ar, venueCity_en: site.venueCity_en, venueCity_ar: site.venueCity_ar,
          venueMapsUrl: site.venueMapsUrl, defaultLanguage: site.defaultLanguage, chapters: site.chapters ?? [],
          groomLook: { ...GROOM_DEFAULT_LOOK, ...site.groomLook },
          brideLook: { ...BRIDE_DEFAULT_LOOK, ...site.brideLook },
          domain: site.domain ?? "", notes: site.notes ?? "",
        }
      : emptySite(templates[0]?.id ?? "")
  );
  const [attirePreview, setAttirePreview] = useState<"signature" | "ceremony">("signature");
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

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
        const d = await res.json().catch(() => ({}));
        setError(d.error ?? "Save failed.");
        setSaving(false);
        return;
      }
      const saved = await res.json();
      setSaving(false);
      if (isEdit) { setSavedAt(true); router.refresh(); }
      else router.push(`/admin/sites/${saved.id}`);
    } catch {
      setError("Network error.");
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!site) return;
    if (!confirm(`Delete ${site.groomName_en} & ${site.brideName_en}'s site?`)) return;
    await fetch(`/api/admin/sites/${site.id}`, { method: "DELETE" });
    router.push("/admin/sites");
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
      <form onSubmit={submit} className="flex flex-col gap-6">
        <div className={section}>
          <h2 className="mb-4 text-sm font-semibold text-neutral-700">Basics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={label}>Slug</label><input className={input} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="mohamed-mariam" required /></div>
            <div><label className={label}>Template</label><select className={input} value={form.templateId} onChange={(e) => set("templateId", e.target.value)}>{templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
            <div><label className={label}>Plan tier</label><select className={input} value={form.planTier} onChange={(e) => set("planTier", e.target.value as PlanTier)}><option value="signature">Signature</option><option value="bespoke">Bespoke</option><option value="studio">Studio</option></select></div>
            <div><label className={label}>Status</label><select className={input} value={form.status} onChange={(e) => set("status", e.target.value as SiteStatus)}><option value="draft">Draft</option><option value="paid">Paid</option><option value="live">Live</option><option value="archived">Archived</option></select></div>
            <div><label className={label}>Default language</label><select className={input} value={form.defaultLanguage} onChange={(e) => set("defaultLanguage", e.target.value as "en" | "ar")}><option value="en">English</option><option value="ar">Arabic</option></select></div>
            <div><label className={label}>Custom domain</label><input className={input} value={form.domain} onChange={(e) => set("domain", e.target.value)} placeholder="optional" /></div>
          </div>
        </div>

        <div className={section}>
          <h2 className="mb-4 text-sm font-semibold text-neutral-700">Couple</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={label}>Groom (EN)</label><input className={input} value={form.groomName_en} onChange={(e) => set("groomName_en", e.target.value)} required /></div>
            <div><label className={label}>Groom (AR)</label><input className={input} dir="rtl" value={form.groomName_ar} onChange={(e) => set("groomName_ar", e.target.value)} /></div>
            <div><label className={label}>Bride (EN)</label><input className={input} value={form.brideName_en} onChange={(e) => set("brideName_en", e.target.value)} required /></div>
            <div><label className={label}>Bride (AR)</label><input className={input} dir="rtl" value={form.brideName_ar} onChange={(e) => set("brideName_ar", e.target.value)} /></div>
          </div>
        </div>

        <div className={section}>
          <h2 className="mb-4 text-sm font-semibold text-neutral-700">Date &amp; venue</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={label}>Wedding date/time</label><input type="datetime-local" className={input} value={form.weddingDate.slice(0, 16)} onChange={(e) => set("weddingDate", e.target.value)} required /></div>
            <div><label className={label}>Date dots</label><input className={input} value={form.dateDots} onChange={(e) => set("dateDots", e.target.value)} placeholder="27 • 08 • 2026" /></div>
            <div><label className={label}>Date label (EN)</label><input className={input} value={form.dateLabel_en} onChange={(e) => set("dateLabel_en", e.target.value)} /></div>
            <div><label className={label}>Date label (AR)</label><input className={input} dir="rtl" value={form.dateLabel_ar} onChange={(e) => set("dateLabel_ar", e.target.value)} /></div>
            <div><label className={label}>Venue (EN)</label><input className={input} value={form.venueName_en} onChange={(e) => set("venueName_en", e.target.value)} /></div>
            <div><label className={label}>Venue (AR)</label><input className={input} dir="rtl" value={form.venueName_ar} onChange={(e) => set("venueName_ar", e.target.value)} /></div>
            <div><label className={label}>City (EN)</label><input className={input} value={form.venueCity_en} onChange={(e) => set("venueCity_en", e.target.value)} /></div>
            <div><label className={label}>City (AR)</label><input className={input} dir="rtl" value={form.venueCity_ar} onChange={(e) => set("venueCity_ar", e.target.value)} /></div>
            <div className="col-span-2"><label className={label}>Google Maps link</label><input className={input} value={form.venueMapsUrl} onChange={(e) => set("venueMapsUrl", e.target.value)} /></div>
          </div>
        </div>

        <div className={section}>
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-700">Chapters</h2>
            <button type="button" onClick={() => set("chapters", [...form.chapters, newChapter(form.chapters.length + 1)])} className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50">+ Add</button>
          </div>
          <p className="mb-3 text-xs text-neutral-400">Chapter 1 shows in the meeting scene; the rest unfold along the walk.</p>
          <div className="flex flex-col gap-4">
            {form.chapters.map((c, i) => (
              <div key={c.id} className="rounded-md border border-neutral-200 p-3">
                <div className="mb-2 flex items-center justify-end">
                  <button type="button" onClick={() => set("chapters", form.chapters.filter((_, j) => j !== i))} className="text-xs text-red-500 hover:underline">Remove</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input className={input} placeholder="Label (EN)" value={c.label_en} onChange={(e) => { const n = [...form.chapters]; n[i] = { ...c, label_en: e.target.value }; set("chapters", n); }} />
                  <input className={input} dir="rtl" placeholder="العنوان" value={c.label_ar} onChange={(e) => { const n = [...form.chapters]; n[i] = { ...c, label_ar: e.target.value }; set("chapters", n); }} />
                  <textarea className={input} placeholder="Text (EN)" rows={2} value={c.text_en} onChange={(e) => { const n = [...form.chapters]; n[i] = { ...c, text_en: e.target.value }; set("chapters", n); }} />
                  <textarea className={input} dir="rtl" placeholder="النص" rows={2} value={c.text_ar} onChange={(e) => { const n = [...form.chapters]; n[i] = { ...c, text_ar: e.target.value }; set("chapters", n); }} />
                </div>
              </div>
            ))}
            {form.chapters.length === 0 && <p className="text-sm text-neutral-400">No chapters yet.</p>}
          </div>
        </div>

        <div className={section}>
          <h2 className="mb-1 text-sm font-semibold text-neutral-700">Internal notes</h2>
          <p className="mb-3 text-xs text-neutral-400">Never shown to guests.</p>
          <textarea className={input} rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="rounded-md bg-neutral-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-60">
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create site"}
          </button>
          {savedAt && <span className="text-sm text-green-600">Saved ✓</span>}
          {isEdit && <button type="button" onClick={remove} className="ml-auto rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50">Delete site</button>}
        </div>
      </form>

      {/* Live preview + look editors */}
      <div className="lg:sticky lg:top-8 lg:self-start">
        <div className="rounded-lg border border-neutral-200 bg-gradient-to-b from-[#f6efe2] to-[#e8dcc6] p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-700">Live preview</h2>
            <div className="flex overflow-hidden rounded-md border border-neutral-300 text-xs">
              <button type="button" onClick={() => setAttirePreview("signature")} className={`px-2 py-1 ${attirePreview === "signature" ? "bg-neutral-800 text-white" : "bg-white text-neutral-600"}`}>Signature</button>
              <button type="button" onClick={() => setAttirePreview("ceremony")} className={`px-2 py-1 ${attirePreview === "ceremony" ? "bg-neutral-800 text-white" : "bg-white text-neutral-600"}`}>Ceremony</button>
            </div>
          </div>
          <div className="flex h-72 items-end justify-center overflow-hidden rounded-md">
            <Couple attire={attirePreview} animate={false} groomLook={form.groomLook} brideLook={form.brideLook} className="h-64" />
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-neutral-700">Groom look</h2>
          <LookEditor role="groom" look={form.groomLook} onChange={(l) => set("groomLook", l)} />
        </div>
        <div className="mt-4 rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-neutral-700">Bride look</h2>
          <LookEditor role="bride" look={form.brideLook} onChange={(l) => set("brideLook", l)} />
          <p className="mt-3 text-xs text-neutral-400">Bride hair shows only when hijab = none.</p>
        </div>
      </div>
    </div>
  );
}

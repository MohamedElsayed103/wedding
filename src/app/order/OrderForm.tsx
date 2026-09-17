"use client";

import { useState } from "react";
import Link from "next/link";
import type { PricingTier } from "@/lib/brand";
import type { DesignMeta } from "@/components/designs/meta";

const input =
  "w-full rounded-lg border border-[color:var(--color-gold)]/30 bg-white/70 px-4 py-3 font-body text-sm text-[color:var(--color-ink)] outline-none focus:border-[color:var(--color-gold)]";
const label = "mb-1.5 block font-roman text-[0.7rem] tracking-wide-2 text-[color:var(--color-gold-deep)]";

export function OrderForm({
  plans,
  templates,
}: {
  plans: PricingTier[];
  templates: DesignMeta[];
}) {
  const [planId, setPlanId] = useState(plans[1]?.id ?? plans[0]?.id ?? "");
  const [templateId, setTemplateId] = useState(templates[0]?.id ?? "");
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    email: "",
    weddingDate: "",
    city: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, planId, templateId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[color:var(--color-ivory)] px-6 text-center safe-x">
        <div className="max-w-md">
          <span className="text-4xl">💌</span>
          <h1 className="mt-5 font-display text-3xl text-[color:var(--color-ink)]">Thank you!</h1>
          <p className="mt-3 font-serif text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
            Your request is in. We&apos;ll reach out on <strong>WhatsApp</strong> shortly to confirm
            the details and next steps.
          </p>
          <Link
            href="/studio"
            className="mt-8 inline-block rounded-full border border-[color:var(--color-gold)]/40 px-7 py-3 font-roman text-xs tracking-luxe text-[color:var(--color-gold-deep)] hover:bg-[color:var(--color-gold)]/10"
          >
            BACK
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[color:var(--color-ivory)] text-[color:var(--color-ink)]">
      <div className="mx-auto max-w-3xl px-5 py-14 safe-x">
        <div className="text-center">
          <p className="font-roman tracking-luxe text-[0.7rem] text-[color:var(--color-gold-deep)]">
            START YOUR INVITATION
          </p>
          <h1 className="mt-3 font-display text-4xl text-[color:var(--color-ink)]">
            Let&apos;s make your film
          </h1>
          <p className="mx-auto mt-3 max-w-xl font-serif text-lg text-[color:var(--color-ink-soft)]">
            Pick a plan and a look, tell us about your day, and we&apos;ll contact you on WhatsApp to
            finish the details. Payment is by InstaPay or Vodafone Cash.
          </p>
        </div>

        <form onSubmit={submit} className="mt-12 space-y-10">
          {/* 1 — Plan */}
          <section>
            <h2 className="font-roman text-xs tracking-wide-2 text-[color:var(--color-gold-deep)]">
              1 · CHOOSE A PLAN
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {plans.map((p) => {
                const active = p.id === planId;
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setPlanId(p.id)}
                    className={
                      "rounded-2xl border p-5 text-left transition-all " +
                      (active
                        ? "border-[color:var(--color-gold)] bg-[color:var(--color-gold)]/10 ring-1 ring-[color:var(--color-gold)]"
                        : "border-[color:var(--color-gold)]/25 bg-white/50 hover:border-[color:var(--color-gold)]/50")
                    }
                  >
                    <div className="font-display text-xl">{p.name}</div>
                    <div className="mt-1 font-display text-2xl text-[color:var(--color-gold-deep)]">
                      {p.price}
                    </div>
                    <p className="mt-2 font-serif text-sm italic text-[color:var(--color-ink-soft)]">
                      {p.tagline}
                    </p>
                    <ul className="mt-3 space-y-1">
                      {p.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex gap-1.5 font-body text-xs text-[color:var(--color-ink-soft)]">
                          <span className="text-[color:var(--color-gold)]">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 2 — Template */}
          <section>
            <h2 className="font-roman text-xs tracking-wide-2 text-[color:var(--color-gold-deep)]">
              2 · CHOOSE A TEMPLATE
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {templates.map((t) => {
                const active = t.id === templateId;
                return (
                  <div
                    key={t.id}
                    className={
                      "rounded-2xl border p-5 transition-all " +
                      (active
                        ? "border-[color:var(--color-gold)] bg-[color:var(--color-gold)]/10 ring-1 ring-[color:var(--color-gold)]"
                        : "border-[color:var(--color-gold)]/25 bg-white/50")
                    }
                  >
                    <button type="button" onClick={() => setTemplateId(t.id)} className="w-full text-left">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block h-3.5 w-3.5 rounded-full border"
                          style={{ background: t.accentColor }}
                        />
                        <span className="font-display text-lg">{t.name}</span>
                      </div>
                      <p className="mt-2 font-body text-sm text-[color:var(--color-ink-soft)]">
                        {t.description}
                      </p>
                    </button>
                    <a
                      href={`/demo?design=${encodeURIComponent(t.id)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block font-roman text-[0.65rem] tracking-wide-2 text-[color:var(--color-gold-deep)] hover:underline"
                    >
                      PREVIEW ↗
                    </a>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 3 — Details */}
          <section>
            <h2 className="font-roman text-xs tracking-wide-2 text-[color:var(--color-gold-deep)]">
              3 · YOUR DETAILS
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={label}>Your name(s) *</label>
                <input className={input} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ahmed & Sara" required />
              </div>
              <div>
                <label className={label}>WhatsApp number *</label>
                <input className={input} value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="+20 100 123 4567" required />
              </div>
              <div>
                <label className={label}>Email (optional)</label>
                <input className={input} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" />
              </div>
              <div>
                <label className={label}>Wedding date</label>
                <input className={input} type="date" value={form.weddingDate} onChange={(e) => set("weddingDate", e.target.value)} />
              </div>
              <div>
                <label className={label}>City / venue</label>
                <input className={input} value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Cairo — Marriott Zamalek" />
              </div>
              <div className="sm:col-span-2">
                <label className={label}>Anything else?</label>
                <textarea className={input} rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Colors you love, your story, special requests…" />
              </div>
            </div>
          </section>

          {error && <p className="text-center font-body text-sm text-red-600">{error}</p>}

          <div className="text-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="lux-button rounded-full px-10 py-4 font-roman text-xs tracking-luxe text-[#3c2c20] disabled:opacity-60"
            >
              {status === "sending" ? "SENDING…" : "SEND MY REQUEST"}
            </button>
            <p className="mt-3 font-body text-xs text-[color:var(--color-ink-soft)]">
              No payment now — we&apos;ll confirm everything on WhatsApp first.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

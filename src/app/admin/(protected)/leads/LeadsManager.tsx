"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Order, OrderStatus } from "@/lib/admin/types";

const STATUSES: OrderStatus[] = ["new", "contacted", "paid", "done", "cancelled"];

const STATUS_STYLE: Record<OrderStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  paid: "bg-green-100 text-green-700",
  done: "bg-neutral-200 text-neutral-600",
  cancelled: "bg-red-100 text-red-600",
};

const waDigits = (p: string) => p.replace(/[^\d]/g, "");

export function LeadsManager({
  orders,
  tableMissing,
}: {
  orders: Order[];
  tableMissing: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  const setStatus = async (id: string, status: OrderStatus) => {
    setBusy(id);
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBusy(null);
    router.refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    setBusy(id);
    await fetch(`/api/admin/orders/${id}`, { method: "DELETE" });
    setBusy(null);
    router.refresh();
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-800">Leads</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Orders from the public form. Contact each couple on WhatsApp, collect payment (InstaPay /
        Vodafone Cash), then create their site.
      </p>

      {tableMissing && (
        <div className="mt-4 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">
          The <code>orders</code> table doesn&apos;t exist yet. Run{" "}
          <code>supabase/migrations/0002_orders.sql</code> in the Supabase SQL editor. New orders
          still reach you on Telegram in the meantime.
        </div>
      )}

      <div className="mt-6 space-y-3">
        {orders.length === 0 && !tableMissing && (
          <p className="rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-500">
            No leads yet.
          </p>
        )}

        {orders.map((o) => {
          const digits = waDigits(o.whatsapp);
          return (
            <div key={o.id} className="rounded-lg border border-neutral-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-neutral-800">{o.name}</span>
                    <span className={"rounded-full px-2 py-0.5 text-xs " + STATUS_STYLE[o.status]}>
                      {o.status}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-neutral-500">
                    {o.planId} · {o.templateId}
                    {o.weddingDate ? ` · ${o.weddingDate}` : ""}
                    {o.city ? ` · ${o.city}` : ""}
                  </div>
                  <div className="mt-1 text-sm text-neutral-600">
                    {o.whatsapp}
                    {o.email ? ` · ${o.email}` : ""}
                  </div>
                  {o.notes && <div className="mt-2 max-w-xl text-sm text-neutral-500">“{o.notes}”</div>}
                  <div className="mt-1 text-xs text-neutral-400">
                    {new Date(o.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-2">
                    {digits && (
                      <a
                        href={`https://wa.me/${digits}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700"
                      >
                        WhatsApp
                      </a>
                    )}
                    <a
                      href={`tel:${o.whatsapp}`}
                      className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
                    >
                      Call
                    </a>
                  </div>
                  <select
                    value={o.status}
                    disabled={busy === o.id}
                    onChange={(e) => setStatus(o.id, e.target.value as OrderStatus)}
                    className="rounded-md border border-neutral-300 px-2 py-1 text-xs text-neutral-700"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => remove(o.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { createOrder, type NewOrderInput } from "@/lib/admin/store";
import { sendTelegram, waLink } from "@/lib/telegram";

export const dynamic = "force-dynamic";

const clip = (s: unknown, n: number) => String(s ?? "").trim().slice(0, n);

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const order: NewOrderInput = {
    name: clip(body.name, 120),
    whatsapp: clip(body.whatsapp, 40),
    email: clip(body.email, 160) || undefined,
    planId: clip(body.planId, 40),
    templateId: clip(body.templateId, 60),
    weddingDate: clip(body.weddingDate, 40) || undefined,
    city: clip(body.city, 160) || undefined,
    notes: clip(body.notes, 1000) || undefined,
  };

  // Minimum viable lead: a name and a way to reach them.
  if (!order.name || !order.whatsapp || !order.planId) {
    return NextResponse.json(
      { error: "Please add your name, WhatsApp number and a plan." },
      { status: 422 }
    );
  }

  // 1) Notify the owner — this must not be lost even if the DB is unavailable.
  const wa = waLink(order.whatsapp);
  const lines = [
    "🔔 New Zifaf order",
    `Name: ${order.name}`,
    `WhatsApp: ${order.whatsapp}${wa ? "  " + wa : ""}`,
    order.email ? `Email: ${order.email}` : null,
    `Plan: ${order.planId}`,
    `Template: ${order.templateId || "—"}`,
    order.weddingDate ? `Date: ${order.weddingDate}` : null,
    order.city ? `City/venue: ${order.city}` : null,
    order.notes ? `Notes: ${order.notes}` : null,
  ].filter(Boolean);
  await sendTelegram(lines.join("\n"));

  // 2) Persist for the admin Leads page (best-effort — table may not exist yet).
  try {
    await createOrder(order);
  } catch {
    // Notification already sent; don't fail the client's submission.
  }

  return NextResponse.json({ ok: true });
}

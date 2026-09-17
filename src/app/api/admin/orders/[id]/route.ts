import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin/auth";
import { deleteOrder, updateOrderStatus } from "@/lib/admin/store";
import type { OrderStatus } from "@/lib/admin/types";

interface Params {
  params: Promise<{ id: string }>;
}

const STATUSES: OrderStatus[] = ["new", "contacted", "paid", "done", "cancelled"];

export async function PATCH(req: NextRequest, { params }: Params) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { status } = (await req.json()) as { status?: OrderStatus };
  if (!status || !STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 422 });
  }
  const ok = await updateOrderStatus(id, status);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const ok = await deleteOrder(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return new NextResponse(null, { status: 204 });
}

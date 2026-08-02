import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin/auth";
import { seedIfEmpty } from "@/lib/admin/store";

export async function POST() {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const result = await seedIfEmpty();
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

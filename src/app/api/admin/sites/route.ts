import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin/auth";
import { createSite, listSites, type NewSiteInput } from "@/lib/admin/store";

export async function GET() {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(listSites());
}

export async function POST(req: NextRequest) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const input = (await req.json()) as NewSiteInput;
  const site = createSite(input);
  return NextResponse.json(site, { status: 201 });
}

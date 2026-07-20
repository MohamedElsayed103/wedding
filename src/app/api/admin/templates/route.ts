import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin/auth";
import { createTemplate, listTemplates, type NewTemplateInput } from "@/lib/admin/store";

export async function GET() {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(listTemplates());
}

export async function POST(req: NextRequest) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const input = (await req.json()) as NewTemplateInput;
  const template = createTemplate(input);
  return NextResponse.json(template, { status: 201 });
}

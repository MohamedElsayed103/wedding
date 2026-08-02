import { listTemplates } from "@/lib/admin/store";
import { TemplatesManager } from "./TemplatesManager";

export default async function TemplatesPage() {
  const templates = await listTemplates();
  return <TemplatesManager templates={templates} />;
}

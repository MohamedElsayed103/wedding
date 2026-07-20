import { listTemplates } from "@/lib/admin/store";
import { TemplatesManager } from "./TemplatesManager";

export default function TemplatesPage() {
  const templates = listTemplates();
  return <TemplatesManager templates={templates} />;
}

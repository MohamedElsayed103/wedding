import { listTemplates } from "@/lib/admin/store";
import { SiteForm } from "../SiteForm";

export default function NewSitePage() {
  const templates = listTemplates();
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-neutral-800">New site</h1>
      <SiteForm templates={templates} />
    </div>
  );
}

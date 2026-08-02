import { notFound } from "next/navigation";
import { getSite, listTemplates } from "@/lib/admin/store";
import { SiteForm } from "../SiteForm";

export default async function EditSitePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const site = await getSite(id);
  if (!site) notFound();
  const templates = await listTemplates();

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-neutral-800">
        {site.groomName_en} &amp; {site.brideName_en}
      </h1>
      <SiteForm site={site} templates={templates} />
    </div>
  );
}

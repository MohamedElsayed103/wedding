import Link from "next/link";
import { listSites } from "@/lib/admin/store";

export default async function SitesListPage() {
  const sites = await listSites();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-800">Sites</h1>
        <Link
          href="/admin/sites/new"
          className="rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
        >
          + New site
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-4 py-3 font-medium">Couple</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Plan</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {sites.map((s) => (
              <tr key={s.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/sites/${s.id}`} className="font-medium text-neutral-800 hover:underline">
                    {s.groomName_en} &amp; {s.brideName_en}
                  </Link>
                </td>
                <td className="px-4 py-3 text-neutral-500">{s.slug}</td>
                <td className="px-4 py-3 text-neutral-500">{s.dateLabel_en}</td>
                <td className="px-4 py-3 text-neutral-500">{s.planTier}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
            {sites.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-neutral-400">
                  No sites yet — create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

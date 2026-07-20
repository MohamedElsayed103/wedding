import Link from "next/link";
import { listSites, listTemplates } from "@/lib/admin/store";

export default function AdminDashboard() {
  const sites = listSites();
  const templates = listTemplates();

  const byStatus = (status: string) => sites.filter((s) => s.status === status).length;

  const stats = [
    { label: "Total sites", value: sites.length },
    { label: "Live", value: byStatus("live") },
    { label: "Paid, not live", value: byStatus("paid") },
    { label: "Draft", value: byStatus("draft") },
    { label: "Templates", value: templates.length },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-800">Dashboard</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Manage couples&apos; sites, visual templates and the character cast library.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-neutral-200 bg-white p-4">
            <div className="text-2xl font-semibold text-neutral-800">{s.value}</div>
            <div className="mt-1 text-xs text-neutral-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          href="/admin/sites/new"
          className="rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
        >
          + New site
        </Link>
        <Link
          href="/admin/sites"
          className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          View all sites
        </Link>
      </div>

      <h2 className="mt-10 text-sm font-semibold text-neutral-700">Recent sites</h2>
      <div className="mt-3 divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
        {sites.length === 0 && <p className="p-4 text-sm text-neutral-500">No sites yet.</p>}
        {sites.map((s) => (
          <Link
            key={s.id}
            href={`/admin/sites/${s.id}`}
            className="flex items-center justify-between px-4 py-3 text-sm hover:bg-neutral-50"
          >
            <div>
              <span className="font-medium text-neutral-800">
                {s.groomName_en} &amp; {s.brideName_en}
              </span>
              <span className="ml-2 text-neutral-400">/{s.slug}</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-neutral-600">
                {s.planTier}
              </span>
              <span
                className={
                  "rounded-full px-2 py-0.5 " +
                  (s.status === "live"
                    ? "bg-green-100 text-green-700"
                    : s.status === "paid"
                      ? "bg-amber-100 text-amber-700"
                      : s.status === "archived"
                        ? "bg-neutral-200 text-neutral-500"
                        : "bg-neutral-100 text-neutral-600")
                }
              >
                {s.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

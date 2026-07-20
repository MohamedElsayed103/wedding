import Link from "next/link";
import { requireAdminOrRedirect } from "@/lib/admin/auth";
import { LogoutButton } from "./LogoutButton";

/**
 * Deliberately plain — this is an internal ops tool, not the guest-facing
 * product, so it intentionally does NOT use the cinematic theme (fonts,
 * gold/ivory palette, animations) from globals.css. Keeping the two visually
 * distinct avoids ever confusing "the admin" with "the product."
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdminOrRedirect();

  return (
    <div
      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      className="min-h-screen bg-neutral-100 text-neutral-900"
    >
      <div className="flex min-h-screen">
        <aside className="w-56 shrink-0 border-r border-neutral-200 bg-white p-5">
          <p className="mb-6 text-sm font-semibold tracking-wide text-neutral-800">
            Studio Admin
          </p>
          <nav className="flex flex-col gap-1 text-sm">
            <Link href="/admin" className="rounded-md px-3 py-2 hover:bg-neutral-100">
              Dashboard
            </Link>
            <Link href="/admin/sites" className="rounded-md px-3 py-2 hover:bg-neutral-100">
              Sites
            </Link>
            <Link href="/admin/templates" className="rounded-md px-3 py-2 hover:bg-neutral-100">
              Templates
            </Link>
            <Link href="/admin/characters" className="rounded-md px-3 py-2 hover:bg-neutral-100">
              Characters
            </Link>
          </nav>
          <div className="mt-8 border-t border-neutral-200 pt-4">
            <LogoutButton />
          </div>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/** Shown on the dashboard when the DB is empty — inserts the flagship demo. */
export function SeedButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const seed = async () => {
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/seed", { method: "POST" });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error ?? "Seed failed — did you run the SQL migration?");
      setBusy(false);
      return;
    }
    router.refresh();
  };

  return (
    <div className="rounded-lg border border-dashed border-neutral-300 bg-white p-6 text-center">
      <p className="text-sm text-neutral-600">
        No sites yet. Add the flagship demo (Mohamed &amp; Mariam) to get started.
      </p>
      <button
        onClick={seed}
        disabled={busy}
        className="mt-4 rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-60"
      >
        {busy ? "Adding…" : "Add sample data"}
      </button>
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
    </div>
  );
}

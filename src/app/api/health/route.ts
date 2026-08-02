import { NextResponse } from "next/server";

/**
 * Public health check — reports whether the deployment is wired correctly
 * without ever exposing secret VALUES (only booleans + a row count). Hit
 * /api/health after deploying to Vercel to confirm env vars + DB connectivity.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const supabaseUrl = !!(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL);
  const supabaseKey = !!(
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY
  );
  const adminPassword = !!process.env.ADMIN_PASSWORD;
  const adminSecret = !!process.env.ADMIN_SESSION_SECRET;

  let dbReachable = false;
  let siteCount: number | null = null;
  let dbError: string | null = null;

  if (supabaseUrl && supabaseKey) {
    try {
      const { getServiceClient } = await import("@/lib/supabase");
      const sb = getServiceClient();
      const { count, error } = await sb
        .from("sites")
        .select("id", { count: "exact", head: true });
      if (error) dbError = error.code || error.message;
      else {
        dbReachable = true;
        siteCount = count ?? 0;
      }
    } catch (e) {
      dbError = e instanceof Error ? e.message : "unknown error";
    }
  }

  const ok = supabaseUrl && supabaseKey && adminPassword && adminSecret && dbReachable;

  return NextResponse.json({
    ok,
    env: { supabaseUrl, supabaseKey, adminPassword, adminSecret },
    db: { reachable: dbReachable, siteCount, error: dbError },
    hint: ok
      ? "All wired. If a route still shows defaults, redeploy after setting env vars."
      : "Set the missing env vars in Vercel → Settings → Environment Variables, then redeploy.",
  });
}

import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the SECRET key (service role).
 * NEVER import this from a client component — the secret key must not reach
 * the browser. All admin writes and public-site reads go through here; the
 * secret key bypasses row-level security, and RLS is ON with no policies so
 * the publishable/anon key can't touch these tables (see migrations/0001).
 */
let cached: SupabaseClient | null = null;

/**
 * Accept whichever env-var names are present. The Vercel–Supabase integration
 * injects `SUPABASE_SERVICE_ROLE_KEY` / `SUPABASE_URL`, while a manual .env uses
 * `SUPABASE_SECRET_KEY` / `NEXT_PUBLIC_SUPABASE_URL`. Supporting both means the
 * same code runs locally and on Vercel with no rename step.
 */
function readUrl(): string | undefined {
  const raw =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  if (!raw) return undefined;
  // Normalise: supabase-js wants the BASE project URL. Strip a trailing
  // `/rest/v1` (a common copy-paste mistake) and any trailing slashes, so a
  // mis-set env var can't produce the PGRST125 "invalid path" failure.
  return raw.trim().replace(/\/+$/, "").replace(/\/rest\/v1$/, "");
}

function readKey(): string | undefined {
  return (
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SERVICE_KEY
  );
}

export function getServiceClient(): SupabaseClient {
  if (cached) return cached;
  const url = readUrl();
  const key = readKey();
  if (!url || !key) {
    throw new Error(
      "Supabase env vars missing: set NEXT_PUBLIC_SUPABASE_URL (base project URL) " +
        "and SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY)."
    );
  }
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

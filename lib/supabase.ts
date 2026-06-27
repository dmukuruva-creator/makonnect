import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser/server Supabase client (anon key, RLS-enforced).
 *
 * v1 runs entirely on synthetic seed data (see lib/data.ts), so this client is
 * NOT yet used by any page. It is wired up ahead of the deployment phase, when
 * real data — protected by Row-Level Security — is imported by MakoZim staff.
 *
 * Env values come from Vercel / the org secret store. They are intentionally
 * empty in the committed `.env.example`; real keys NEVER live in the repo.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function getSupabaseClient(): SupabaseClient | null {
  if (!url || !anonKey) {
    // No credentials configured (e.g. the synthetic-data demo). Callers should
    // fall back to lib/data.ts rather than assume a live database.
    return null;
  }
  return createClient(url, anonKey);
}

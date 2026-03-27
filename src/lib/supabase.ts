import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

let _client: SupabaseClient<Database> | null = null;

function getClient(): SupabaseClient<Database> {
  if (_client) return _client;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. " +
        "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (see .env.example)."
    );
  }
  _client = createClient<Database>(supabaseUrl, supabaseAnonKey);
  return _client;
}

/** Typed Supabase browser/server client. Lazily created on first use so `next build` succeeds when env is only set on Vercel. */
export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get(_t, prop, receiver) {
    return Reflect.get(getClient(), prop, receiver);
  },
});

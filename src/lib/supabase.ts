import { createClient, SupabaseClient } from "@supabase/supabase-js"

let _supabase: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_ANON_KEY
    if (!url || !key) {
      throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set")
    }
    _supabase = createClient(url, key)
  }
  return _supabase
}

/** @deprecated Use getSupabase() instead — kept for backward compatibility */
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabase() as unknown as Record<string | symbol, unknown>)[prop]
  },
})

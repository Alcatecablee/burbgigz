import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Only create clients if environment variables are available
export const supabaseAdmin = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
}) : null

// Regular client for user operations
export const supabase = supabaseUrl && process.env.SUPABASE_ANON_KEY ? createClient(supabaseUrl, process.env.SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
}) : null

// Helper to check if Supabase is available
export function isSupabaseAvailable(): boolean {
  return supabaseAdmin !== null && supabase !== null
}
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only create client if environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not configured - some features may not work')
}

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
}) : null

// Helper function to check if Supabase is available
export function isSupabaseAvailable(): boolean {
  return supabase !== null
}

export type { User } from '@supabase/supabase-js'
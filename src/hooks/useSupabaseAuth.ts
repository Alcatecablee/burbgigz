import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase, isSupabaseAvailable, type User } from '../lib/supabase'
import type { AuthError } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  isLoading: boolean
  error: AuthError | null
}

export function useSupabaseAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null
  })

  useEffect(() => {
    if (!isSupabaseAvailable()) {
      console.warn('Supabase not available - auth features disabled');
      setAuthState({
        user: null,
        isLoading: false,
        error: null
      });
      return;
    }

    // Get initial session
    const getInitialSession = async () => {
      const { data: { session }, error } = await supabase!.auth.getSession()
      
      setAuthState({
        user: session?.user ?? null,
        isLoading: false,
        error
      })
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase!.auth.onAuthStateChange(
      async (event, session) => {
        setAuthState({
          user: session?.user ?? null,
          isLoading: false,
          error: null
        })
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseAvailable()) {
      throw new Error('Authentication not available - Supabase not configured');
    }

    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    const { data, error } = await supabase!.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      setAuthState(prev => ({ ...prev, isLoading: false, error }))
      throw error
    }
    
    return data
  }

  const signUp = async (email: string, password: string, metadata?: object) => {
    if (!isSupabaseAvailable()) {
      throw new Error('Authentication not available - Supabase not configured');
    }

    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    const { data, error } = await supabase!.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    
    if (error) {
      setAuthState(prev => ({ ...prev, isLoading: false, error }))
      throw error
    }
    
    return data
  }

  const signOut = async () => {
    if (!isSupabaseAvailable()) {
      throw new Error('Authentication not available - Supabase not configured');
    }

    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    const { error } = await supabase!.auth.signOut()
    
    if (error) {
      setAuthState(prev => ({ ...prev, isLoading: false, error }))
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    if (!isSupabaseAvailable()) {
      throw new Error('Authentication not available - Supabase not configured');
    }

    const { error } = await supabase!.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    
    if (error) throw error
  }

  return {
    user: authState.user,
    isLoading: authState.isLoading,
    error: authState.error,
    isAuthenticated: !!authState.user,
    signIn,
    signUp,
    signOut,
    resetPassword
  }
}
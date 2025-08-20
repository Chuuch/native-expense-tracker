import { Session, User } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Storage keys
const SESSION_KEY = 'supabase_session'
const USER_KEY = 'supabase_user'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // Load stored session on app start
  useEffect(() => {
    loadStoredSession()
  }, [])

  const loadStoredSession = async () => {
    try {
      const [storedSession, storedUser] = await Promise.all([
        SecureStore.getItemAsync(SESSION_KEY),
        SecureStore.getItemAsync(USER_KEY)
      ])

      if (storedSession && storedUser) {
        const session = JSON.parse(storedSession)
        const user = JSON.parse(storedUser)
        
        // Validate session hasn't expired
        if (session.expires_at && new Date(session.expires_at) > new Date()) {
          setSession(session)
          setUser(user)
        } else {
          // Clear expired session
          await clearStoredSession()
        }
      }
    } catch (error) {
      console.error('Error loading stored session:', error)
    } finally {
      setLoading(false)
    }
  }

  const storeSession = async (session: Session, user: User) => {
    try {
      await Promise.all([
        SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session)),
        SecureStore.setItemAsync(USER_KEY, JSON.stringify(user))
      ])
    } catch (error) {
      console.error('Error storing session:', error)
    }
  }

  const clearStoredSession = async () => {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(SESSION_KEY),
        SecureStore.deleteItemAsync(USER_KEY)
      ])
    } catch (error) {
      console.error('Error clearing stored session:', error)
    }
  }

  useEffect(() => {
    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setSession(session)
        setUser(session.user)
        await storeSession(session, session.user)
      } else if (event === 'SIGNED_OUT') {
        setSession(null)
        setUser(null)
        await clearStoredSession()
      } else if (event === 'TOKEN_REFRESHED' && session) {
        setSession(session)
        setUser(session.user)
        await storeSession(session, session.user)
      }
      
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'yourapp://reset-password',
    })
    if (error) throw error
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useSupabase } from '../contexts/SupabaseContext'
import { useEffect } from 'react'
import { syncPrivyUserWithSupabase } from '@/lib/auth/supabase-sync'

export function AuthButton() {
  const { ready, authenticated, user, login, logout } = usePrivy()
  const { profile, loading: supabaseLoading } = useSupabase()

  // Sync Privy user with Supabase when authenticated
  useEffect(() => {
    if (authenticated && user && !profile) {
      syncPrivyUserWithSupabase(user)
    }
  }, [authenticated, user, profile])

  if (!ready || supabaseLoading) {
    return (
      <button className="btn btn-secondary px-4 py-2" disabled>
        Loading...
      </button>
    )
  }

  if (authenticated) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">
          {profile?.display_name || user?.email?.address || user?.wallet?.address || 'Connected'}
        </span>
        <button 
          onClick={logout}
          className="btn btn-secondary px-4 py-2"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <button 
      onClick={login}
      className="btn btn-primary px-4 py-2"
    >
      Sign In
    </button>
  )
}

'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useSupabase } from '../contexts/SupabaseContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppLayout } from '../components/AppLayout'

interface AppAreaLayoutProps {
  children: React.ReactNode
}

export default function AppAreaLayout({ children }: AppAreaLayoutProps) {
  const { ready, authenticated, user } = usePrivy()
  const { profile, loading: supabaseLoading } = useSupabase()
  const router = useRouter()
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    if (ready && !supabaseLoading) {
      if (!authenticated || !user) {
        // Redirect to main site for authentication
        router.push('/')
        return
      }
      setIsCheckingAuth(false)
    }
  }, [ready, authenticated, user, supabaseLoading, router])

  // Show loading while checking authentication
  if (!ready || supabaseLoading || isCheckingAuth) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl">Loading app...</div>
        </div>
      </div>
    )
  }

  // If not authenticated, show login prompt
  if (!authenticated || !user) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="text-2xl font-bold text-white mb-4">Authentication Required</h1>
          <p className="text-gray-400 mb-6">
            Please sign in to access the builda.club app.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <AppLayout pageTitle="builda.club App">
      {children}
    </AppLayout>
  )
}

'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function ClubChat() {
  const params = useParams()
  const router = useRouter()
  const clubId = params.id as string

  useEffect(() => {
    // Redirect to the main club page since chat is now integrated there
    router.replace(`/club/${clubId}`)
  }, [clubId, router])

  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white">Redirecting to club dashboard...</p>
      </div>
    </div>
  )
}

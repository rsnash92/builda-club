'use client'

import { useState } from 'react'
import { useSupabase } from '../contexts/SupabaseContext'
import { ClubService } from '@/lib/services/club-service'

export function SupabaseTest() {
  const { user, profile } = useSupabase()
  const [clubs, setClubs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const clubsData = await ClubService.getClubs()
      setClubs(clubsData)
    } catch (error) {
      console.error('Error testing Supabase connection:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">Please sign in to test Supabase connection</p>
      </div>
    )
  }

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Supabase Connection Test</h3>
      <div className="space-y-2">
        <p><strong>User ID:</strong> {user.id}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Profile:</strong> {profile ? 'Loaded' : 'Not loaded'}</p>
        <button 
          onClick={testConnection}
          disabled={loading}
          className="btn btn-primary px-4 py-2"
        >
          {loading ? 'Testing...' : 'Test Database Connection'}
        </button>
        {clubs.length > 0 && (
          <div className="mt-4">
            <p><strong>Clubs found:</strong> {clubs.length}</p>
            <ul className="list-disc list-inside">
              {clubs.map(club => (
                <li key={club.id}>{club.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}


'use client'

import { useState } from 'react'
import { useSupabase } from '../contexts/SupabaseContext'

export default function SupabaseTest() {
  const { user, profile, loading } = useSupabase()
  const [testResult, setTestResult] = useState<string | null>(null)
  const [testing, setTesting] = useState(false)

  const testConnection = async () => {
    setTesting(true)
    setTestResult(null)

    try {
      // Test 1: Check if we can fetch clubs
      const clubsResponse = await fetch('/api/clubs')
      const clubsData = await clubsResponse.json()
      
      if (!clubsResponse.ok) {
        throw new Error(`Clubs API error: ${clubsData.error}`)
      }

      // Test 2: Check if we can seed the database
      const seedResponse = await fetch('/api/seed', { method: 'POST' })
      const seedData = await seedResponse.json()
      
      if (!seedResponse.ok) {
        throw new Error(`Seed API error: ${seedData.error}`)
      }

      setTestResult(`✅ Success! Found ${clubsData.clubs?.length || 0} clubs. Seed result: ${seedData.message}`)
    } catch (error) {
      setTestResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Supabase Integration Test</h3>
      
      <div className="space-y-4">
        <div>
          <p><strong>User Status:</strong> {loading ? 'Loading...' : user ? 'Logged in' : 'Not logged in'}</p>
          {user && (
            <p><strong>User ID:</strong> {user.id}</p>
          )}
          {profile && (
            <p><strong>Profile:</strong> {profile.display_name || profile.email || 'No profile'}</p>
          )}
        </div>

        <div>
          <button
            onClick={testConnection}
            disabled={testing}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded"
          >
            {testing ? 'Testing...' : 'Test Supabase Connection'}
          </button>
        </div>

        {testResult && (
          <div className={`p-3 rounded ${
            testResult.startsWith('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            <pre className="whitespace-pre-wrap">{testResult}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
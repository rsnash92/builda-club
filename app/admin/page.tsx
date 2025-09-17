'use client'

import { useState } from 'react'
import SupabaseTest from '../components/SupabaseTest'
import { useSupabase } from '../contexts/SupabaseContext'
import { AppLayout } from '../components/AppLayout'

export default function AdminPage() {
  const { user } = useSupabase()
  const [showTest, setShowTest] = useState(false)
  const [showTables, setShowTables] = useState(false)
  const [tables, setTables] = useState<Array<{ table_name: string; columns: any[]; error?: string }>>([])
  const [loadingTables, setLoadingTables] = useState(false)

  const checkTables = async () => {
    setLoadingTables(true)
    try {
      const response = await fetch('/api/check-tables')
      const data = await response.json()
      if (response.ok) {
        setTables(data.tables)
        setShowTables(true)
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      alert(`Error: ${error}`)
    } finally {
      setLoadingTables(false)
    }
  }

  // Temporarily bypass auth for testing
  // if (!user) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Access Required</h1>
  //         <p className="text-gray-600">Please log in to access the admin panel.</p>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <AppLayout pageTitle="Admin Panel">
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Admin Panel</h1>
        
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-white">Database Management</h2>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowTest(!showTest)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  {showTest ? 'Hide' : 'Show'} Supabase Test
                </button>
                
                <button
                  onClick={checkTables}
                  disabled={loadingTables}
                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded"
                >
                  {loadingTables ? 'Checking...' : 'Check Existing Tables'}
                </button>
              </div>
              
              {showTest && <SupabaseTest />}
              
              {showTables && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Current Database Tables</h3>
                  <div className="space-y-4">
                    {tables.map((table) => (
                      <div key={table.table_name} className="bg-gray-50 p-4 rounded">
                        <h4 className="font-medium text-gray-900">{table.table_name}</h4>
                        {table.error ? (
                          <p className="text-red-600 text-sm">{table.error}</p>
                        ) : (
                          <div className="mt-2">
                            <p className="text-sm text-gray-600 mb-2">Columns:</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {table.columns.map((column: any) => (
                                <div key={column.column_name} className="text-xs bg-white p-2 rounded border">
                                  <div className="font-medium">{column.column_name}</div>
                                  <div className="text-gray-500">{column.data_type}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

            <div className="bg-slate-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-white">Quick Actions</h2>
            <div className="space-y-2">
              <a 
                href="/" 
                className="block text-blue-600 hover:text-blue-800"
              >
                → View Homepage (with dynamic data)
              </a>
              <a 
                href="/create-club" 
                className="block text-blue-600 hover:text-blue-800"
              >
                → Create New Club
              </a>
              <a 
                href="/api/clubs" 
                target="_blank"
                className="block text-blue-600 hover:text-blue-800"
              >
                → View Clubs API
              </a>
            </div>
          </div>

            <div className="bg-slate-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-white">Database Schema</h2>
              <div className="text-sm text-gray-300 space-y-2">
              <p><strong>Tables created:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>clubs - Main club data with categories, metrics, etc.</li>
                <li>members - Club membership data</li>
                <li>transactions - Financial transactions</li>
                <li>user_profiles - User profile information</li>
              </ul>
              <p className="mt-4"><strong>Next steps:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Set up your Supabase environment variables</li>
                <li>Run the database schema in your Supabase SQL editor</li>
                <li>Test the connection using the test button above</li>
                <li>Seed the database with sample data</li>
              </ul>
            </div>
          </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

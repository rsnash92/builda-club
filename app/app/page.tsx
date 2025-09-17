'use client'

import { useSupabase } from '../contexts/SupabaseContext'
import { useState, useEffect } from 'react'
import { ClubWithMembers } from '@/lib/database/types'
import { ClubService } from '@/lib/services/club-service'
import Link from 'next/link'
import { 
  Plus, 
  Users, 
  TrendingUp, 
  Building2, 
  ArrowRight,
  Calendar,
  DollarSign
} from 'lucide-react'

export default function AppDashboard() {
  const { profile } = useSupabase()
  const [clubs, setClubs] = useState<ClubWithMembers[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserClubs = async () => {
      try {
        // TODO: Implement user's clubs fetching
        // For now, we'll show a placeholder
        setClubs([])
      } catch (error) {
        console.error('Failed to fetch user clubs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserClubs()
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="h-full bg-black p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {profile?.display_name || 'Builder'}! 👋
        </h1>
        <p className="text-gray-400">
          Ready to build something amazing with your community?
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Clubs</p>
              <p className="text-2xl font-bold text-white">{clubs.length}</p>
            </div>
            <Building2 className="h-8 w-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Treasury</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(clubs.reduce((sum, club) => sum + club.treasury_balance, 0))}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Members</p>
              <p className="text-2xl font-bold text-white">
                {clubs.reduce((sum, club) => sum + club.member_count, 0)}
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">This Month</p>
              <p className="text-2xl font-bold text-white">+12.5%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Clubs */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Your Clubs</h2>
            <Link
              href="/create-club"
              className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Create Club</span>
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-900 rounded-lg p-6 border border-gray-800 animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-2/3 mb-4"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : clubs.length === 0 ? (
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 text-center">
              <Building2 className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No clubs yet</h3>
              <p className="text-gray-400 mb-6">
                Join your first club or create one to start building together.
              </p>
              <div className="flex space-x-4 justify-center">
                <Link
                  href="/create-club"
                  className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Club</span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <span>Browse Clubs</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {clubs.map((club) => (
                <Link
                  key={club.id}
                  href={`/app/club/${club.id}`}
                  className="block bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-orange-500 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {club.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{club.name}</h3>
                        <p className="text-gray-400 text-sm">{club.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">
                        {formatCurrency(club.treasury_balance)}
                      </p>
                      <p className="text-gray-400 text-sm">{club.member_count} members</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Recent Activity & Quick Actions */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-gray-300 text-sm">Joined BUIDLers United</p>
                <span className="text-gray-500 text-xs">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-gray-300 text-sm">Created trading bot proposal</p>
                <span className="text-gray-500 text-xs">1 day ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <p className="text-gray-300 text-sm">Earned 1,250 $BUIDL</p>
                <span className="text-gray-500 text-xs">3 days ago</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/create-club"
                className="flex items-center space-x-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Plus className="h-5 w-5 text-orange-500" />
                <span className="text-white">Create New Club</span>
              </Link>
              <Link
                href="/app/club/demo"
                className="flex items-center space-x-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Building2 className="h-5 w-5 text-blue-500" />
                <span className="text-white">View Demo Club</span>
              </Link>
              <Link
                href="/"
                className="flex items-center space-x-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Users className="h-5 w-5 text-green-500" />
                <span className="text-white">Browse All Clubs</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

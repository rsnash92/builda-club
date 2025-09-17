'use client'

import Link from 'next/link'
import { Search, Flame, Gamepad2, Brain, Wrench, MessageCircle, DollarSign, PartyPopper, Heart, Users, Crown, TrendingUp, TrendingDown, ChevronDown, Clock, UserPlus } from 'lucide-react'
import { AppLayout } from './components/AppLayout'
import { useClubs } from '@/lib/hooks/useClubs'
import { useState } from 'react'

const filterOptions = [
  { id: 'newest', label: 'Newest', active: true },
  { id: 'trending', label: 'Trending', active: false },
  { id: 'volume', label: 'Volume', active: false },
  { id: 'ending', label: 'Ending', active: false },
  { id: 'open', label: 'Open', active: false, hasDropdown: true },
  { id: 'all-tokens', label: 'All Tokens', active: false, hasDropdown: true },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState('newest')

  // Use dynamic data instead of static
  const { clubs, loading, error } = useClubs({
    search: searchQuery || undefined,
    limit: 20
  })

  const formatVolume = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`
    }
    return `$${value.toFixed(2)}`
  }

  const getClubThumbnail = (club: any) => {
    if (club.thumbnail_url) {
      return club.thumbnail_url
    }
    
    // Generate gradient based on category
    const gradients = {
      crypto: 'from-yellow-400 to-orange-500',
      gaming: 'from-green-400 to-blue-500',
      ai: 'from-blue-400 to-purple-500',
      utility: 'from-orange-400 to-red-500',
      social: 'from-pink-400 to-purple-500',
      fun: 'from-yellow-400 to-pink-500'
    }
    
    return `bg-gradient-to-br ${gradients[club.category as keyof typeof gradients] || 'from-violet-400 to-purple-500'}`
  }

  const getClubEmoji = (club: any) => {
    const emojis = {
      crypto: '₿',
      gaming: '🎮',
      ai: '🤖',
      utility: '🔧',
      social: '💬',
      fun: '🎉'
    }
    return emojis[club.category as keyof typeof emojis] || '🏗️'
  }

  return (
    <AppLayout pageTitle="Clubs">
      <div className="p-6">
        {/* Top Search Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">Crypto</h1>
              <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                placeholder="Q Search clubs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
            <UserPlus className="h-4 w-4" />
            <span>Sign In</span>
          </button>
            </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-4 mb-6">
          {filterOptions.map((option) => (
                <button
              key={option.id}
              onClick={() => setActiveFilter(option.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === option.id
                  ? 'bg-violet-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {option.label}
              {option.hasDropdown && (
                <ChevronDown className="inline h-3 w-3 ml-1" />
              )}
                </button>
              ))}
        </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
            <p className="text-red-400 mb-4">Error loading clubs: {error}</p>
              <button
                onClick={() => window.location.reload()}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
              >
                Retry
              </button>
            </div>
          )}

        {/* Clubs Grid */}
          {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {clubs.map((club) => (
              <div key={club.id} className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                {/* USDC Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                    USDC
                  </span>
                </div>

                {/* Club Thumbnail */}
                <div className="relative h-48">
                    {club.thumbnail_url ? (
                      <img
                        src={club.thumbnail_url}
                        alt={club.name}
                      className="w-full h-full object-cover"
                      />
                    ) : (
                    <div className={`w-full h-full ${getClubThumbnail(club)} flex items-center justify-center`}>
                      <span className="text-6xl">{getClubEmoji(club)}</span>
                      </div>
                    )}
                </div>

                {/* Club Content */}
                <div className="p-4">
                  <h3 className="text-white font-bold text-sm mb-3 line-clamp-2">
                    {club.name}
                  </h3>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Active</span>
                      <span>Inactive</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${club.progress || 75}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span className="text-green-400">{club.progress || 75}%</span>
                      <span className="text-purple-400">{100 - (club.progress || 75)}%</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 mb-4">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors">
                      JOIN
                    </button>
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors">
                      VIEW
                    </button>
                  </div>

                  {/* Bottom Info */}
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        <span>+{club.likes || Math.floor(Math.random() * 1000)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-3 w-3" />
                        <span>{formatVolume(club.market_cap || Math.floor(Math.random() * 100000))}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Live</span>
                    </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && clubs.length === 0 && (
            <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No clubs found</p>
              <Link
                href="/create-club"
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
              >
                Create the first club
              </Link>
            </div>
          )}
        </div>
    </AppLayout>
  )
}

'use client'

import Link from 'next/link'
import { Search, Flame, Gamepad2, Brain, Wrench, MessageCircle, DollarSign, PartyPopper, Heart, Users, Crown, TrendingUp, TrendingDown, ChevronDown, Clock, UserPlus, Hammer, Wrench as WrenchIcon } from 'lucide-react'
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

  const getBuildingStatus = (club: any) => {
    const buildingStatuses = {
      crypto: ['Building: DeFi protocol', 'Shipped: 2 dApps this month', 'Building: NFT marketplace'],
      gaming: ['Building: P2E game', 'Shipped: 3 game modes', 'Building: Metaverse world'],
      ai: ['Building: AI trading bot', 'Shipped: ML model v2.0', 'Building: Chat assistant'],
      utility: ['Building: Developer tools', 'Shipped: 5 APIs this week', 'Building: Analytics dashboard'],
      social: ['Building: Social platform', 'Shipped: 3 features', 'Building: Community hub'],
      fun: ['Building: Meme generator', 'Shipped: 10 templates', 'Building: NFT collection']
    }
    
    const statuses = buildingStatuses[club.category as keyof typeof buildingStatuses] || ['Building: Web3 project', 'Shipped: 2 features', 'Building: Community tools']
    return statuses[Math.floor(Math.random() * statuses.length)]
  }

  const getOnlineBuilders = () => {
    return Math.floor(Math.random() * 50) + 1 // 1-50 builders online
  }

  const getBuilderCount = (club: any) => {
    return Math.floor(Math.random() * 500) + 50 // 50-550 builders
  }

  const getEarningAmount = () => {
    return Math.floor(Math.random() * 5000) + 100 // 100-5100 $BUIDL/mo
  }

  return (
    <AppLayout pageTitle="Clubs">
      <div className="p-6">
        {/* Trending Section Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-5 h-5 text-red-500">
              🔥
            </div>
            <h2 className="text-xl font-bold text-white">Now Trending</h2>
          </div>
        </div>

        {/* Trending Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-white text-sm">Show animations</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-white text-sm">Include nsfw</span>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <ChevronDown className="h-4 w-4 rotate-90" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </button>
          </div>
        </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
            <p className="text-red-400 mb-4">Error loading clubs: {error}</p>
              <button
                onClick={() => window.location.reload()}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Retry
              </button>
            </div>
          )}

        {/* Clubs Grid - Pump.fun style */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club) => {
              const onlineBuilders = getOnlineBuilders()
              const builderCount = getBuilderCount(club)
              const earningAmount = getEarningAmount()
              const buildingStatus = getBuildingStatus(club)

              return (
                <div key={club.id} className="pump-card hover:shadow-lg transition-all hover:scale-[1.02] duration-200 overflow-hidden">
                  {/* Card Content */}
                  <div className="p-4">
                    {/* Header with Avatar and Info */}
                    <div className="flex items-start space-x-3 mb-4">
                      {/* Avatar */}
                      <div className="relative">
                        {club.thumbnail_url ? (
                          <img
                            src={club.thumbnail_url}
                            alt={club.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className={`w-12 h-12 ${getClubThumbnail(club)} rounded-lg flex items-center justify-center`}>
                            <span className="text-2xl">{getClubEmoji(club)}</span>
                          </div>
                        )}
                      </div>

                      {/* Club Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-lg mb-1 truncate">
                          {club.name} ({club.token_symbol || 'CLUB'})
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {club.description || buildingStatus}
                        </p>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div>
                        <span className="text-white font-medium">replies: {Math.floor(Math.random() * 1000)}</span>
                      </div>
                      <div>
                        <span className="text-emerald-400 font-medium">market cap: {formatVolume(club.market_cap || Math.floor(Math.random() * 100000))}</span>
                      </div>
                    </div>

                    {/* Creator Info */}
                    <div className="text-xs text-gray-500">
                      <span>created by: </span>
                      <span className="text-blue-400">builder{Math.floor(Math.random() * 1000)}</span>
                      <span className="ml-2">({Math.floor(Math.random() * 24)}h ago)</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

          {/* Empty State */}
          {!loading && !error && clubs.length === 0 && (
            <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No trending tokens found</p>
              <Link
                href="/create-club"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Create new coin
              </Link>
            </div>
          )}
        </div>
    </AppLayout>
  )
}

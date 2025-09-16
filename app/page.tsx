'use client'

import Link from 'next/link'
import { Search, Flame, Gamepad2, Brain, Wrench, MessageCircle, DollarSign, PartyPopper, Heart, Users, Crown, TrendingUp, TrendingDown } from 'lucide-react'
import { AuthButton } from './components/AuthButton'
import { useClubs } from '@/lib/hooks/useClubs'
import { useState } from 'react'

const categories = [
  { name: "what's hot", icon: Flame, isDropdown: true },
  { name: "gaming", icon: Gamepad2, isDropdown: false },
  { name: "ai", icon: Brain, isDropdown: false },
  { name: "utility", icon: Wrench, isDropdown: false },
  { name: "social", icon: MessageCircle, isDropdown: false },
  { name: "money", icon: DollarSign, isDropdown: false },
  { name: "fun", icon: PartyPopper, isDropdown: false }
]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("what's hot")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Use dynamic data instead of static
  const { clubs, loading, error } = useClubs({
    category: selectedCategory === "what's hot" ? undefined : selectedCategory,
    search: searchQuery || undefined,
    limit: 20
  })

  const formatMarketCap = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`
    }
    return `$${value.toFixed(2)}`
  }

  const formatVolume = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`
    }
    return `$${value.toFixed(2)}`
  }

  const formatChange = (value: number) => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(2)}%`
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <span className="text-2xl font-bold">builda.club</span>
            </div>
            
            {/* Navigation Tabs */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-green-400 border-b-2 border-green-400 pb-1 font-medium">
                communities
              </Link>
              <Link href="/projects" className="text-gray-400 hover:text-white transition-colors">
                projects
              </Link>
              <Link href="/economics" className="text-gray-400 hover:text-white transition-colors">
                economics
              </Link>
            </nav>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8 hidden lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="find the next 100x community..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <AuthButton />
            </div>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.name
                    ? "bg-orange-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <category.icon className="h-4 w-4" />
                <span className="capitalize">{category.name}</span>
                {category.isDropdown && <span className="text-xs">▼</span>}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">Error loading communities: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Retry
            </button>
          </div>
        )}

        {/* Communities Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club) => (
              <div key={club.id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-gray-600 transition-colors">
                {/* Thumbnail */}
                <div className="relative">
                  {club.thumbnail_url ? (
                    <img 
                      src={club.thumbnail_url} 
                      alt={club.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <div className="text-4xl font-bold text-white/80">
                        {club.name.charAt(0)}
                      </div>
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {club.is_hot && (
                      <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                        <Flame className="h-3 w-3 mr-1" />
                        HOT
                      </div>
                    )}
                    {club.is_lord_of_dev && (
                      <div className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium flex items-center">
                        <Crown className="h-3 w-3 mr-1" />
                        LORD OF DEV
                      </div>
                    )}
                  </div>
                  
                  {/* Category Tag */}
                  <div className="absolute top-2 left-2">
                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                      {club.category || 'utility'}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{club.name}</h3>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3">by {club.created_by}</p>
                  
                  {/* Engagement Metrics */}
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{club.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">0</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {club.description || 'No description available'}
                  </p>
                  
                  {/* Financial Metrics */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium">
                        {club.token_symbol || '$CLUB'}
                      </button>
                      <div className="text-right">
                        <div className="text-sm font-medium text-white">
                          {formatMarketCap(club.market_cap)}
                          <span className={`ml-1 text-xs ${
                            club.market_cap_change >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {formatChange(club.market_cap_change)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400">
                          vol: {formatVolume(club.volume)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div 
                        className="bg-green-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${club.progress}%` }}
                      ></div>
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
            <p className="text-gray-400 mb-4">No communities found</p>
            <Link 
              href="/create-club"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Create the first club
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}


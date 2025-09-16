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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"></div>
                <span className="text-2xl font-bold text-gray-900">builda.club</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Communities
              </Link>
              <Link href="/projects" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Projects
              </Link>
              <Link href="/economics" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Economics
              </Link>
              <Link href="/create-club" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Create Club
              </Link>
              <Link href="/whitepaper" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Whitepaper
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <AuthButton />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              BUIDL & Earn
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform online communities into builder DAOs where members become co-owners, not subscribers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create-club"
                className="btn btn-primary px-8 py-3 text-lg"
              >
                Create Club
              </Link>
              <Link
                href="/whitepaper"
                className="btn btn-secondary px-8 py-3 text-lg"
              >
                Read Whitepaper
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Find the next 100x community..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`btn px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
                    selectedCategory === category.name
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  <span className="capitalize">{category.name}</span>
                  {category.isDropdown && <span className="text-xs">▼</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Communities Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">Error loading communities: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Retry
              </button>
            </div>
          )}

          {/* Communities Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {clubs.map((club) => (
                <div key={club.id} className="card hover:shadow-lg transition-shadow">
                  {/* Thumbnail */}
                  <div className="relative">
                    {club.thumbnail_url ? (
                      <img
                        src={club.thumbnail_url}
                        alt={club.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    ) : (
                      <div
                        className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center rounded-t-lg"
                      >
                        <div className="text-4xl font-bold text-white">
                          {club.name.charAt(0)}
                        </div>
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-2 right-2 flex gap-1">
                      {club.is_hot && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                          <Flame className="h-3 w-3" />
                          HOT
                        </span>
                      )}
                      {club.is_lord_of_dev && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                          <Crown className="h-3 w-3" />
                          LORD OF DEV
                        </span>
                      )}
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-2 left-2">
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                        {club.category || 'utility'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{club.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">by {club.created_by}</p>

                    {/* Engagement Metrics */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{club.likes}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">0</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {club.description || 'No description available'}
                    </p>

                    {/* Financial Metrics */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <button className="btn btn-secondary text-xs px-3 py-1">
                          {club.token_symbol || '$CLUB'}
                        </button>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900">
                            {formatMarketCap(club.market_cap)}
                            <span className={`ml-1 text-xs ${
                              club.market_cap_change >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {formatChange(club.market_cap_change)}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            vol: {formatVolume(club.volume)}
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-green-500 h-1 rounded-full"
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
              <p className="text-gray-500 mb-4">No communities found</p>
              <Link
                href="/create-club"
                className="btn btn-primary"
              >
                Create the first club
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

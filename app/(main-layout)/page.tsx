'use client'

import Link from 'next/link'
import { Search, Flame, Gamepad2, Brain, Wrench, MessageCircle, DollarSign, PartyPopper, Heart, Users, Crown, TrendingUp, TrendingDown } from 'lucide-react'
import { AuthButton } from '../components/AuthButton'
import { useClubs } from '@/lib/hooks/useClubs'
import { useState } from 'react'
import Animations from '@/components/shared/Animations'

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
    <main className="nftg-content nftg-content-home">
      <Animations />
      
      {/* Hero Banner Section */}
      <section className="banner">
        <div className="container-fluid">
          <div className="row vertical-column-gap">
            <div className="col-12 col-lg-8 col-xxl-9">
              <div className="banner__content">
                <div className="banner__content-inner">
                  <ol className="breadcrumb mt-8">
                    <li className="breadcrumb-item active">Explore</li>
                    <li className="breadcrumb-item active">Build</li>
                    <li className="breadcrumb-item active">Own</li>
                  </ol>
                  <h1 className="title-animation title-xxl stroked-text fw-8 transform-none mt-8">BUIDL & Earn</h1>
                  <p className="text-xl mt-6">Transform online communities into builder DAOs where members become co-owners, not subscribers.</p>
                  <div className="section__cta mt-40">
                    <div className="btn-wrapper">
                      <Link href="/create-club" className="btn--secondary">
                        Create Club
                      </Link>
                      <svg viewBox="0 0 100 102" xmlns="http://www.w3.org/2000/svg" fill="none" preserveAspectRatio="none" className="shape">
                        <path d="M0 1  L100 1  L100 55 L80 101 L0 101 Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 col-xxl-3">
              <div className="banner__slider">
                <div className="banner__slider-wrapper">
                  <div className="banner__slider-single">
                    <div className="thumb">
                      <Link href="/create-club">
                        <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center rounded-lg">
                          <div className="text-6xl font-bold text-white/80">
                            🏗️
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="content text-center">
                      <h2 className="fw-8 stroked-text text-uppercase">
                        <Link href="/create-club">BUILDA CLUBS</Link>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-6">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`btn btn--primary d-flex align-items-center gap-2 px-3 py-2 rounded-pill ${
                      selectedCategory === category.name ? 'active' : ''
                    }`}
                  >
                    <category.icon className="h-4 w-4" />
                    <span className="text-capitalize">{category.name}</span>
                    {category.isDropdown && <span className="text-xs">▼</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Communities Grid */}
      <section className="py-6">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {/* Loading State */}
              {loading && (
                <div className="d-flex justify-content-center align-items-center py-12">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="text-center py-12">
                  <p className="text-danger mb-4">Error loading communities: {error}</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="btn btn--primary"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Communities Grid */}
              {!loading && !error && (
                <div className="row g-4">
                  {clubs.map((club) => (
                    <div key={club.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
                      <div className="card game-card h-100">
                        {/* Thumbnail */}
                        <div className="position-relative">
                          {club.thumbnail_url ? (
                            <img 
                              src={club.thumbnail_url} 
                              alt={club.name}
                              className="card-img-top"
                              style={{ height: '200px', objectFit: 'cover' }}
                            />
                          ) : (
                            <div 
                              className="card-img-top d-flex align-items-center justify-content-center"
                              style={{ 
                                height: '200px', 
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                              }}
                            >
                              <div className="text-4xl font-bold text-white/80">
                                {club.name.charAt(0)}
                              </div>
                            </div>
                          )}
                          
                          {/* Badges */}
                          <div className="position-absolute top-0 end-0 p-2 d-flex gap-1">
                            {club.is_hot && (
                              <span className="badge bg-warning text-dark d-flex align-items-center gap-1">
                                <Flame className="h-3 w-3" />
                                HOT
                              </span>
                            )}
                            {club.is_lord_of_dev && (
                              <span className="badge bg-info text-dark d-flex align-items-center gap-1">
                                <Crown className="h-3 w-3" />
                                LORD OF DEV
                              </span>
                            )}
                          </div>
                          
                          {/* Category Tag */}
                          <div className="position-absolute top-0 start-0 p-2">
                            <span className="badge bg-secondary">
                              {club.category || 'utility'}
                            </span>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title text-white mb-2">{club.name}</h5>
                          <p className="text-muted small mb-3">by {club.created_by}</p>
                          
                          {/* Engagement Metrics */}
                          <div className="d-flex align-items-center gap-3 mb-3">
                            <div className="d-flex align-items-center gap-1 text-muted">
                              <Heart className="h-4 w-4" />
                              <span className="small">{club.likes}</span>
                            </div>
                            <div className="d-flex align-items-center gap-1 text-muted">
                              <Users className="h-4 w-4" />
                              <span className="small">0</span>
                            </div>
                          </div>
                          
                          <p className="card-text text-muted small mb-4 line-clamp-2">
                            {club.description || 'No description available'}
                          </p>
                          
                          {/* Financial Metrics */}
                          <div className="mt-auto">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <button className="btn btn-sm btn-outline-primary">
                                {club.token_symbol || '$CLUB'}
                              </button>
                              <div className="text-end">
                                <div className="small fw-bold text-white">
                                  {formatMarketCap(club.market_cap)}
                                  <span className={`ms-1 small ${
                                    club.market_cap_change >= 0 ? 'text-success' : 'text-danger'
                                  }`}>
                                    {formatChange(club.market_cap_change)}
                                  </span>
                                </div>
                                <div className="small text-muted">
                                  vol: {formatVolume(club.volume)}
                                </div>
                              </div>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="progress" style={{ height: '4px' }}>
                              <div 
                                className="progress-bar bg-success"
                                style={{ width: `${club.progress}%` }}
                              ></div>
                            </div>
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
                  <p className="text-muted mb-4">No communities found</p>
                  <Link 
                    href="/create-club"
                    className="btn btn--primary"
                  >
                    Create the first club
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


'use client'

import { useParams } from 'next/navigation'
import { 
  Heart,
  Search,
  LayoutDashboard,
  Plane,
  Play,
  Box,
  Calendar,
  Users,
  ChevronRight,
  Sun,
  Moon,
  Bell,
  Eye,
  BarChart3,
  ArrowUp,
  Grid3X3
} from 'lucide-react'

export default function ClubDashboard() {
  const params = useParams()
  const clubId = params.id as string

  // Mock data - replace with real data from Supabase
  const clubData = {
    id: clubId,
    name: 'BUIDLers United',
    description: 'A community of builders creating the future of Web3',
    memberCount: 127,
    onlineCount: 23,
    treasuryBalance: 12500.50,
    tokenPrice: 0.15,
    totalValue: 1875.08,
  }

  return (
    <div className="h-screen bg-slate-950 flex">
      {/* Left Sidebar */}
      <div className="w-16 bg-gray-800 flex flex-col items-center py-4 space-y-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col space-y-2">
          {[
            { id: 'dashboard', icon: LayoutDashboard, active: true },
            { id: 'parachute', icon: Plane, active: false },
            { id: 'play', icon: Play, active: false },
            { id: 'box', icon: Box, active: false },
            { id: 'search', icon: Search, active: false },
            { id: 'calendar', icon: Calendar, active: false },
            { id: 'users', icon: Users, active: false },
          ].map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  item.active
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
                title={item.id}
              >
                <Icon className="h-5 w-5" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header Bar */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-white">{clubData.name}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white">
                <Sun className="h-5 w-5" />
              </button>
              <button className="p-2 text-white">
                <Moon className="h-5 w-5" />
              </button>
              <span className="text-gray-300 text-sm">EN</span>
              <button className="p-2 text-gray-400 hover:text-white">
                <Bell className="h-5 w-5" />
              </button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">Y</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 bg-slate-950 p-6">
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-slate-800 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2">
                <button className="px-4 py-3 bg-slate-800 text-gray-300 rounded-lg hover:bg-slate-700 flex items-center gap-2">
                  Category
                  <span className="text-xs">▼</span>
                </button>
                <button className="px-4 py-3 bg-slate-800 text-gray-300 rounded-lg hover:bg-slate-700 flex items-center gap-2">
                  Difficulty
                  <span className="text-xs">▼</span>
                </button>
                <button className="px-4 py-3 bg-slate-800 text-gray-300 rounded-lg hover:bg-slate-700 flex items-center gap-2">
                  Author
                  <span className="text-xs">▼</span>
                </button>
                <button className="p-3 bg-slate-800 text-gray-300 rounded-lg hover:bg-slate-700">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Guides Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Guides</h2>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">By date</span>
                <ArrowUp className="h-4 w-4 text-gray-400" />
                <Grid3X3 className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Guide Card 1 */}
              <div className="bg-slate-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-black flex items-center justify-center">
                  <div className="text-white text-2xl font-bold">LayerZero.</div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 text-sm">
                    How to Claim Tokens from LayerZero Complete Step-by-Step Airdrop Guide
                  </h3>
                  <p className="text-gray-400 text-xs mb-3">Zodiac • 15 Jun, 2024</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span>14203</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>24700</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" />
                      <span>High</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guide Card 2 */}
              <div className="bg-slate-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-yellow-400 flex items-center justify-center relative">
                  <div className="text-black text-lg font-bold">MOVE ANYWHERE</div>
                  <div className="absolute top-2 right-2 text-black text-xs">MOVEMENT</div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 text-sm">
                    Movement Labs Airdrop Guide - How to get $MOVE Airdrop
                  </h3>
                  <p className="text-gray-400 text-xs mb-3">Zodiac • 13 Jun, 2024</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span>2150</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>7712</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" />
                      <span>High</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guide Card 3 */}
              <div className="bg-slate-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-slate-900 flex items-center justify-center relative">
                  <div className="text-white text-center">
                    <div className="text-lg font-bold mb-2">zkSync Airdrop Guide</div>
                    <div className="text-sm">4x Times Bigger Than Arbitrum?</div>
                    <div className="text-xs mt-2">RankFi</div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 text-sm">
                    zkSync Airdrop Guide: 4x Times Bigger Than Arbitrum? - RankFi
                  </h3>
                  <p className="text-gray-400 text-xs mb-3">Pasha • 9 Jun, 2024</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span>5100</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>10392</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" />
                      <span>Low</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guide Card 4 */}
              <div className="bg-slate-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-amber-800 flex items-center justify-center relative">
                  <div className="text-white text-center">
                    <div className="text-lg font-bold mb-2">Espresso</div>
                    <div className="text-sm">AIRDROP</div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 text-sm">
                    Espresso Testnet Guide: How to Deploy Contract & Qualify for Airdrop
                  </h3>
                  <p className="text-gray-400 text-xs mb-3">Pasha • 1 Jun, 2024</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span>2871</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>6692</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" />
                      <span>Middle</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Cards */}
              <div className="bg-slate-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-purple-600 flex items-center justify-center">
                  <div className="text-white text-2xl font-bold">MONAD</div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 text-sm">MONAD</h3>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-slate-900 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-lg font-bold mb-2">The Initiation</div>
                    <div className="text-sm">initia</div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 text-sm">
                    The Initiation Initia Incentivized Testnet for Validators
                  </h3>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-blue-400 flex items-center justify-center">
                  <div className="text-white text-2xl font-bold">CELESTIA</div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 text-sm">CELESTIA</h3>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-orange-500 flex items-center justify-center">
                  <div className="text-white text-2xl font-bold">$BLUR</div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 text-sm">$BLUR</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}


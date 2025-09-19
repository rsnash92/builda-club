'use client'

import { ReactNode, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Plane, 
  Play, 
  Box, 
  Search, 
  Calendar, 
  Users,
  ChevronRight,
  Sun,
  Moon,
  Bell,
  Menu,
  X,
  Home,
  Trophy,
  DollarSign,
  Newspaper,
  Zap,
  Flame,
  Gamepad2,
  Brain,
  Wrench,
  MessageCircle,
  PartyPopper
} from 'lucide-react'

interface AppLayoutProps {
  children: ReactNode
  pageTitle?: string
}

const navigationItems = [
  { id: 'home', icon: Home, href: '/', label: 'Home' },
  { id: 'clubs', icon: LayoutDashboard, href: '/', label: 'Clubs' },
  { id: 'leaderboard', icon: Trophy, href: '/leaderboard', label: 'Leaderboard' },
  { id: 'earn', icon: DollarSign, href: '/earn', label: 'Earn' },
  { id: 'news', icon: Newspaper, href: '/news', label: 'News' },
]

const categories = [
  { 
    id: 'crypto', 
    name: 'Crypto', 
    count: 24, 
    color: 'from-yellow-500 to-orange-500',
    thumbnail: '₿'
  },
  { 
    id: 'gaming', 
    name: 'Gaming', 
    count: 18, 
    color: 'from-green-500 to-blue-500',
    thumbnail: '🎮'
  },
  { 
    id: 'ai', 
    name: 'AI', 
    count: 12, 
    color: 'from-blue-500 to-purple-500',
    thumbnail: '🤖'
  },
  { 
    id: 'utility', 
    name: 'Utility', 
    count: 8, 
    color: 'from-orange-500 to-red-500',
    thumbnail: '🔧'
  },
  { 
    id: 'social', 
    name: 'Social', 
    count: 15, 
    color: 'from-pink-500 to-purple-500',
    thumbnail: '💬'
  },
  { 
    id: 'fun', 
    name: 'Fun', 
    count: 6, 
    color: 'from-yellow-500 to-orange-500',
    thumbnail: '🎉'
  },
]

export function AppLayout({ children, pageTitle = "builda.club" }: AppLayoutProps) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="h-screen pump-gradient flex">
      {/* Collapsible Sidebar - Full Height */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-slate-900/80 backdrop-blur-md border-r border-slate-700/50 transition-all duration-300 ease-in-out flex flex-col`}>
        {/* Sidebar Header with Logo and Menu Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">⬧</span>
              </div>
              <span className="text-white font-bold text-lg">pump.fun</span>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {sidebarCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4">
          <div className="space-y-1 px-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.id === 'home' && pathname === '/')
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors group ${
                    isActive
                      ? 'bg-slate-700/80 text-white'
                      : 'text-gray-400 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="ml-3 text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Categories Section */}
          {!sidebarCollapsed && (
            <div className="mt-8 px-2">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Categories
              </h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/?category=${category.id}`}
                    className="flex items-center px-3 py-2 rounded-lg text-gray-400 hover:bg-slate-700/50 hover:text-white transition-colors group"
                  >
                    <div className={`w-6 h-6 rounded bg-gradient-to-r ${category.color} flex items-center justify-center text-white text-xs font-bold mr-3`}>
                      {category.thumbnail}
                    </div>
                    <span className="text-sm font-medium flex-1">{category.name}</span>
                    <span className="text-xs text-gray-500">{category.count}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Main Header - Matching pump.fun style */}
        <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Title and Search */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-white">
                  Fun & real time <span className="text-gray-400">graph</span>
                </h1>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">with</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded"></div>
                    <span className="text-white font-semibold">pump.fun</span>
                  </div>
                </div>
              </div>
              <div className="relative ml-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search for token"
                  className="w-80 pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Right side - Action Buttons */}
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium">
                Create new coin
              </button>
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium">
                Log in
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-slate-900/30 backdrop-blur-sm">
          {children}
        </div>
      </div>
    </div>
  )
}
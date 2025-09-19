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
    <div className="h-screen bg-black flex">
      {/* Collapsible Sidebar - Full Height */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-black border-r border-gray-800 transition-all duration-300 ease-in-out flex flex-col`}>
        {/* Sidebar Header with Logo and Menu Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <img 
                src="/images/logo/builda-logo.webp"
                alt="builda.club"
                className="w-8 h-8"
              />
              <span className="text-white font-bold text-lg">builda</span>
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
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
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
                    className="flex items-center px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors group"
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
      <div className="flex-1 flex flex-col bg-black">
        {/* Main Header - Black Background */}
        <header className="bg-black border-b border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Search Bar */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search clubs..."
                  className="w-80 pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>

            {/* Right side - Sign In Button */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
'use client'

import { ReactNode } from 'react'
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
  Bell
} from 'lucide-react'

interface AppLayoutProps {
  children: ReactNode
  pageTitle?: string
}

const navigationItems = [
  { id: 'dashboard', icon: LayoutDashboard, href: '/', label: 'Dashboard' },
  { id: 'parachute', icon: Plane, href: '/parachute', label: 'Parachute' },
  { id: 'play', icon: Play, href: '/play', label: 'Play' },
  { id: 'box', icon: Box, href: '/box', label: 'Box' },
  { id: 'search', icon: Search, href: '/search', label: 'Search' },
  { id: 'calendar', icon: Calendar, href: '/calendar', label: 'Calendar' },
  { id: 'users', icon: Users, href: '/users', label: 'Users' },
]

export function AppLayout({ children, pageTitle = "builda.club" }: AppLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="h-screen bg-[#16141A] flex">
      {/* Left Sidebar */}
      <div className="w-16 bg-black flex flex-col items-center py-4 space-y-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.id === 'dashboard' && pathname === '/')
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isActive
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
                title={item.label}
              >
                <Icon className="h-5 w-5" />
              </Link>
            )
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header Bar */}
        <header className="bg-[#16141A] border-b border-gray-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-white">{pageTitle}</h1>
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

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

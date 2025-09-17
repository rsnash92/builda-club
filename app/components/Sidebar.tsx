'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Plane, 
  Play, 
  Box, 
  Search, 
  Calendar, 
  Users,
  ChevronRight
} from 'lucide-react'

const navigationItems = [
  { id: 'dashboard', icon: LayoutDashboard, href: '/', label: 'Dashboard' },
  { id: 'parachute', icon: Plane, href: '/parachute', label: 'Parachute' },
  { id: 'play', icon: Play, href: '/play', label: 'Play' },
  { id: 'box', icon: Box, href: '/box', label: 'Box' },
  { id: 'search', icon: Search, href: '/search', label: 'Search' },
  { id: 'calendar', icon: Calendar, href: '/calendar', label: 'Calendar' },
  { id: 'users', icon: Users, href: '/users', label: 'Users' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
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
  )
}

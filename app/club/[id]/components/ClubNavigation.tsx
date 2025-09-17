'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BarChart3, 
  MessageCircle, 
  Vote, 
  DollarSign, 
  Package, 
  Users, 
  Settings,
  ChevronRight
} from 'lucide-react'

interface ClubNavigationProps {
  club: ClubWithMembers
  activeTab?: string
  onTabChange?: (tab: string) => void
}

const clubTabs = [
  { id: 'overview', label: 'Overview', icon: BarChart3, href: '' },
  { id: 'chat', label: 'Chat', icon: MessageCircle, href: '/chat' },
  { id: 'governance', label: 'Governance', icon: Vote, href: '/governance' },
  { id: 'treasury', label: 'Treasury', icon: DollarSign, href: '/treasury' },
  { id: 'resources', label: 'Resources', icon: Package, href: '/resources' },
  { id: 'members', label: 'Members', icon: Users, href: '/members' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings', adminOnly: true },
]

export function ClubNavigation({ club, activeTab = 'overview', onTabChange }: ClubNavigationProps) {
  const pathname = usePathname()

  const handleTabClick = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId)
    }
  }

  return (
    <div className="bg-gray-900 border-b border-gray-800">
      {/* Club Context Bar */}
      <div className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
            {club.name.charAt(0)}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white font-semibold text-lg">{club.name}</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Club Navigation Tabs */}
      <div className="px-6">
        <nav className="flex space-x-1">
          {clubTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg transition-colors ${
                  isActive
                    ? 'bg-gray-800 text-white border-b-2 border-orange-500'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

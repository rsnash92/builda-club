'use client'

import { ReactNode, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Play, 
  Box, 
  Search, 
  ChevronRight,
  Menu,
  Home,
  MessageCircle,
  X,
  Building2,
  DollarSign,
  FileText,
  Settings,
  Users
} from 'lucide-react'

interface AppLayoutProps {
  children: ReactNode
  pageTitle?: string
}

const navigationItems = [
  { id: 'home', icon: Home, href: '/', label: 'Home' },
  { id: 'create-club', icon: Building2, href: '/create-club', label: 'Create Club' },
  { id: 'economics', icon: DollarSign, href: '/economics', label: 'Economics' },
  { id: 'whitepaper', icon: FileText, href: '/whitepaper', label: 'Whitepaper' },
  { id: 'demo', icon: Play, href: '/club/demo', label: 'Demo Club' },
  { id: 'admin', icon: Settings, href: '/admin', label: 'Admin' },
]


export function AppLayout({ children, pageTitle = "builda.club" }: AppLayoutProps) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showHamburger, setShowHamburger] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
    setShowHamburger(false) // Reset hamburger state when toggling
  }

  return (
    <div className="h-screen pump-gradient flex">
      {/* Collapsible Sidebar - Full Height */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-[#15161a] backdrop-blur-md border-r border-[#24252a] flex flex-col transition-all duration-300 ease-in-out`}>
        {/* Sidebar Header with Logo and Collapse Button */}
        <header className={`bg-[#15161a] backdrop-blur-md border-b border-[#24252a] ${sidebarCollapsed ? 'pt-[1.57rem] pb-[1.57rem] px-0' : 'pt-[1.4rem] pb-[1.4rem] px-6'}`}>
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-3">
                <Image 
                  src="/builda-logo.webp"
                  alt="builda.club"
                  width={24}
                  height={24}
                  className="w-6 rounded-full"
                  priority
                />
                <span className="text-white font-bold text-sm">builda.club</span>
              </div>
            )}
            {sidebarCollapsed && (
              <button
                onClick={toggleSidebar}
                onMouseEnter={() => setShowHamburger(true)}
                onMouseLeave={() => setShowHamburger(false)}
                className="flex items-center justify-center transition-all duration-200 py-0 px-0"
              >
                {showHamburger ? (
                  <Menu className="w-6 h-6 text-white" />
                ) : (
                  <Image 
                    src="/builda-logo.webp"
                    alt="builda.club"
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full object-contain"
                    priority
                  />
                )}
              </button>
            )}
            {!sidebarCollapsed && (
              <button
                onClick={toggleSidebar}
                className="w-6 h-[1.5rem] rounded-full border border-orange-400 flex items-center justify-center text-orange-400 hover:bg-orange-400/10 transition-colors"
              >
                <ChevronRight className="h-3 w-3" />
              </button>
            )}
          </div>
        </header>

        {/* Navigation Items */}
        <div className="flex-1 py-4">
          <div className={`space-y-2 ${sidebarCollapsed ? 'px-2' : 'px-3'}`}>
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.id === 'home' && pathname === '/')
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-3'} py-2 rounded-lg transition-colors group ${
                    isActive
                      ? 'bg-[#202128] text-white border border-orange-400/30'
                      : 'text-gray-400 hover:bg-[#202128]/50 hover:text-white'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="ml-3 text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              )
            })}
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Main Header - Matching pump.fun style */}
        <header className="bg-[#15161a] backdrop-blur-md border-b border-[#24252a] px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Search */}
            <div className="flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search for club"
                  className="w-80 pl-10 pr-4 py-2 bg-[#202128] border border-[#24252a] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Right side - Action Buttons */}
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-medium">
                Create club
              </button>
              <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-medium">
                Log in
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-[#15161a] backdrop-blur-sm">
          {children}
        </div>
      </div>
    </div>
  )
}
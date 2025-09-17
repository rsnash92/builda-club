'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
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
  Grid3X3,
  MessageCircle,
  Hash,
  Mic,
  Phone,
  Video,
  Settings,
  Send,
  Paperclip,
  Smile,
  MoreHorizontal
} from 'lucide-react'

export default function ClubDashboard() {
  const params = useParams()
  const clubId = params.id as string
  const [activeTab, setActiveTab] = useState('dashboard')
  const [activeChannel, setActiveChannel] = useState('general')
  const [message, setMessage] = useState('')

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

  // Discord-like channels
  const channels = [
    { id: 'general', name: 'general', icon: Hash, unread: 0 },
    { id: 'announcements', name: 'announcements', icon: Hash, unread: 3 },
    { id: 'development', name: 'development', icon: Hash, unread: 12 },
    { id: 'design', name: 'design', icon: Hash, unread: 0 },
    { id: 'marketing', name: 'marketing', icon: Hash, unread: 5 },
    { id: 'random', name: 'random', icon: Hash, unread: 0 },
  ]

  // Mock messages
  const mockMessages = {
    general: [
      { id: '1', user: 'alice.eth', avatar: 'A', message: 'Welcome to BUIDLers United! 🚀', timestamp: '2:30 PM', role: 'Founder' },
      { id: '2', user: 'bob.eth', avatar: 'B', message: 'Excited to be here! What are we building first?', timestamp: '2:32 PM', role: 'Builder' },
      { id: '3', user: 'charlie.eth', avatar: 'C', message: 'I think we should start with the treasury system', timestamp: '2:35 PM', role: 'Contributor' },
      { id: '4', user: 'alice.eth', avatar: 'A', message: 'Great idea! I\'ve created a proposal for that', timestamp: '2:36 PM', role: 'Founder' },
    ],
    development: [
      { id: '1', user: 'bob.eth', avatar: 'B', message: 'Just pushed the new smart contract code', timestamp: '1:45 PM', role: 'Builder' },
      { id: '2', user: 'diana.eth', avatar: 'D', message: 'Nice! I\'ll review it and test it locally', timestamp: '1:47 PM', role: 'Builder' },
      { id: '3', user: 'bob.eth', avatar: 'B', message: 'Thanks! Let me know if you find any issues', timestamp: '1:48 PM', role: 'Builder' },
    ],
    announcements: [
      { id: '1', user: 'alice.eth', avatar: 'A', message: '🎉 We just hit $10k in our treasury!', timestamp: '12:00 PM', role: 'Founder' },
      { id: '2', user: 'alice.eth', avatar: 'A', message: 'New governance proposal is up for voting', timestamp: '11:30 AM', role: 'Founder' },
    ]
  }

  const members = [
    { id: '1', name: 'alice.eth', status: 'online', role: 'Founder', avatar: 'A' },
    { id: '2', name: 'bob.eth', status: 'online', role: 'Builder', avatar: 'B' },
    { id: '3', name: 'charlie.eth', status: 'away', role: 'Contributor', avatar: 'C' },
    { id: '4', name: 'diana.eth', status: 'online', role: 'Builder', avatar: 'D' },
    { id: '5', name: 'eve.eth', status: 'offline', role: 'Contributor', avatar: 'E' },
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Founder': return 'text-purple-400'
      case 'Builder': return 'text-blue-400'
      case 'Contributor': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      user: 'You',
      avatar: 'Y',
      message: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      role: 'Builder'
    }

    // In a real app, this would send to the backend
    setMessage('')
  }

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
          {[
            { id: 'dashboard', icon: LayoutDashboard, active: activeTab === 'dashboard' },
            { id: 'chat', icon: MessageCircle, active: activeTab === 'chat' },
            { id: 'parachute', icon: Plane, active: activeTab === 'parachute' },
            { id: 'play', icon: Play, active: activeTab === 'play' },
            { id: 'box', icon: Box, active: activeTab === 'box' },
            { id: 'search', icon: Search, active: activeTab === 'search' },
            { id: 'calendar', icon: Calendar, active: activeTab === 'calendar' },
            { id: 'users', icon: Users, active: activeTab === 'users' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
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
        <header className="bg-[#16141A] border-b border-gray-600 px-6 py-4">
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
        {activeTab === 'dashboard' ? (
          <div className="flex-1 bg-[#16141A] p-6">
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
                {/* Guide Cards - same as before */}
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

                {/* Additional cards... */}
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

                {/* More cards... */}
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
        ) : activeTab === 'chat' ? (
          <div className="flex-1 flex bg-[#16141A]">
            {/* Channels Sidebar */}
            <div className="w-64 bg-black flex flex-col">
              {/* Server Header */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center text-gray-400 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  {clubData.onlineCount} online
                </div>
              </div>

              {/* Channels */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-2">
                  <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2 px-2">
                    Text Channels
                  </div>
                  <div className="space-y-1">
                    {channels.map((channel) => {
                      const Icon = channel.icon
                      const isActive = activeChannel === channel.id
                      return (
                        <button
                          key={channel.id}
                          onClick={() => setActiveChannel(channel.id)}
                          className={`w-full flex items-center px-2 py-2 rounded text-left hover:bg-gray-700 transition-colors ${
                            isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          <span className="flex-1">#{channel.name}</span>
                          {channel.unread > 0 && (
                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                              {channel.unread}
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      Y
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="text-white text-sm font-medium">You</div>
                    <div className="text-gray-400 text-xs">Builder</div>
                  </div>
                  <div className="flex space-x-1">
                    <button className="p-1 text-gray-400 hover:text-white">
                      <Mic className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white">
                      <Settings className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Channel Header */}
              <div className="h-12 bg-black border-b border-gray-700 flex items-center px-4">
                <Hash className="h-5 w-5 text-gray-400 mr-2" />
                <h2 className="text-white font-semibold">#{activeChannel}</h2>
                <div className="ml-4 text-gray-400 text-sm">
                  {mockMessages[activeChannel as keyof typeof mockMessages]?.length || 0} messages
                </div>
                <div className="ml-auto flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                    <Phone className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                    <Video className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                    <Search className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {(mockMessages[activeChannel as keyof typeof mockMessages] || []).map((msg) => (
                  <div key={msg.id} className="flex group hover:bg-gray-800/50 p-2 rounded">
                    <div className="relative">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {msg.avatar}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-900 ${
                        msg.user === 'You' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-white font-medium">{msg.user}</span>
                        <span className={`text-xs ${getRoleColor(msg.role)}`}>{msg.role}</span>
                        <span className="text-gray-400 text-xs">{msg.timestamp}</span>
                      </div>
                      <div className="text-gray-300 mt-1">{msg.message}</div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 flex space-x-1">
                      <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                        <Smile className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 bg-black">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Message #${activeChannel}`}
                      className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                    <Mic className="h-5 w-5" />
                  </button>
                  <button
                    type="submit"
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Members Sidebar */}
            <div className="w-60 bg-black border-l border-gray-700 flex flex-col">
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold">Members</h3>
                  <span className="text-gray-400 text-sm">{members.length}</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                <div className="space-y-1">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center p-2 hover:bg-gray-700 rounded">
                      <div className="relative">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {member.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${getStatusColor(member.status)}`}></div>
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="text-white text-sm font-medium">{member.name}</div>
                        <div className={`text-xs ${getRoleColor(member.role)}`}>{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-[#16141A] flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
              <p className="text-gray-400">This section is coming soon!</p>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}


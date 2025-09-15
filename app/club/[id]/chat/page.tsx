'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { 
  Hash, 
  Plus, 
  Settings, 
  Users, 
  Crown,
  Shield,
  Wrench,
  Megaphone,
  Code,
  Heart,
  Smile,
  MoreHorizontal,
  Send,
  Paperclip,
  Mic,
  Phone,
  Video,
  Search
} from 'lucide-react'

export default function ClubChat() {
  const params = useParams()
  const clubId = params.id as string
  const [activeChannel, setActiveChannel] = useState('general')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<any[]>([])

  // Mock data - replace with real data from Supabase
  const clubData = {
    id: clubId,
    name: 'BUIDLers United',
    memberCount: 127,
    onlineCount: 23
  }

  const channels = [
    { id: 'general', name: 'general', icon: Hash, unread: 0 },
    { id: 'announcements', name: 'announcements', icon: Megaphone, unread: 3 },
    { id: 'development', name: 'development', icon: Code, unread: 12 },
    { id: 'design', name: 'design', icon: Heart, unread: 0 },
    { id: 'marketing', name: 'marketing', icon: Megaphone, unread: 5 },
    { id: 'treasury', name: 'treasury', icon: Crown, unread: 0 },
    { id: 'governance', name: 'governance', icon: Shield, unread: 2 },
    { id: 'random', name: 'random', icon: Smile, unread: 0 },
  ]

  const members = [
    { id: '1', name: 'alice.eth', status: 'online', role: 'Founder', avatar: 'A' },
    { id: '2', name: 'bob.eth', status: 'online', role: 'Builder', avatar: 'B' },
    { id: '3', name: 'charlie.eth', status: 'away', role: 'Contributor', avatar: 'C' },
    { id: '4', name: 'diana.eth', status: 'online', role: 'Builder', avatar: 'D' },
    { id: '5', name: 'eve.eth', status: 'offline', role: 'Contributor', avatar: 'E' },
  ]

  // Mock messages - replace with real data from Supabase
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

  useEffect(() => {
    setMessages(mockMessages[activeChannel as keyof typeof mockMessages] || [])
  }, [activeChannel])

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

    setMessages([...messages, newMessage])
    setMessage('')
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Founder': return 'text-purple-600'
      case 'Builder': return 'text-blue-600'
      case 'Contributor': return 'text-green-600'
      default: return 'text-gray-600'
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

  return (
    <div className="h-screen bg-gray-900 flex">
      {/* Server Sidebar */}
      <div className="w-16 bg-gray-800 flex flex-col items-center py-4 space-y-2">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {clubData.name.charAt(0)}
        </div>
        <div className="w-8 h-0.5 bg-gray-600"></div>
        {channels.slice(0, 3).map((channel) => {
          const Icon = channel.icon
          return (
            <button
              key={channel.id}
              className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors"
            >
              <Icon className="h-5 w-5" />
            </button>
          )
        })}
        <button className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors">
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {/* Channels Sidebar */}
      <div className="w-64 bg-gray-800 flex flex-col">
        {/* Server Header */}
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-white font-semibold text-lg">{clubData.name}</h1>
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
        <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4">
          <Hash className="h-5 w-5 text-gray-400 mr-2" />
          <h2 className="text-white font-semibold">#{activeChannel}</h2>
          <div className="ml-4 text-gray-400 text-sm">
            {messages.length} messages
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
          {messages.map((msg) => (
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
        <div className="p-4 bg-gray-800">
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
      <div className="w-60 bg-gray-800 border-l border-gray-700 flex flex-col">
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
  )
}

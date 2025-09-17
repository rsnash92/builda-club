'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { useState } from 'react'
import { 
  Hash, 
  Volume2, 
  Plus, 
  Search, 
  Settings, 
  Mic, 
  Phone, 
  Video, 
  Smile, 
  Paperclip, 
  Send,
  Users,
  Wrench,
  Trophy
} from 'lucide-react'

interface ChatSectionProps {
  club: ClubWithMembers
}

const channels = [
  { id: 'general', name: 'general', icon: Hash, unread: 0 },
  { id: 'building', name: 'building', icon: Wrench, unread: 12 },
  { id: 'governance', name: 'governance', icon: Hash, unread: 3 },
  { id: 'resources', name: 'resources', icon: Hash, unread: 0 },
  { id: 'random', name: 'random', icon: Hash, unread: 0 },
]

const voiceRooms = [
  { id: 'builders-lounge', name: "Builder's Lounge", icon: Volume2, members: 4 },
  { id: 'focus-room', name: 'Focus Room', icon: Volume2, members: 2 },
]

const directMessages = [
  { id: 'alice', name: 'alice.sol', status: 'online', avatar: 'A' },
  { id: 'bob', name: 'bob.eth', status: 'building', avatar: 'B' },
  { id: 'carol', name: 'carol.eth', status: 'away', avatar: 'C' },
  { id: 'david', name: 'david.eth', status: 'offline', avatar: 'D' },
]

const onlineMembers = [
  { id: 'alice', name: 'alice', status: 'building', avatar: 'A' },
  { id: 'bob', name: 'bob', status: 'building', avatar: 'B' },
  { id: 'carol', name: 'carol', status: 'online', avatar: 'C' },
  { id: 'david', name: 'david', status: 'online', avatar: 'D' },
  { id: 'eve', name: 'eve', status: 'online', avatar: 'E' },
  { id: 'frank', name: 'frank', status: 'online', avatar: 'F' },
  { id: 'grace', name: 'grace', status: 'online', avatar: 'G' },
  { id: 'henry', name: 'henry', status: 'online', avatar: 'H' },
  { id: 'iris', name: 'iris', status: 'online', avatar: 'I' },
  { id: 'jack', name: 'jack', status: 'online', avatar: 'J' },
  { id: 'kate', name: 'kate', status: 'online', avatar: 'K' },
  { id: 'leo', name: 'leo', status: 'online', avatar: 'L' },
]

const recentBuilds = [
  { id: 1, action: 'Shipped trading bot', user: 'alice', time: '2 hours ago' },
  { id: 2, action: 'Fixed bug #23', user: 'bob', time: '5 hours ago' },
  { id: 3, action: 'Merged PR #45', user: 'carol', time: '1 day ago' },
  { id: 4, action: 'Deployed v2.1', user: 'david', time: '2 days ago' },
]

const mockMessages = [
  { id: '1', user: 'alice.sol', avatar: 'A', message: 'Just shipped the new trading bot! 🚀', timestamp: '2:30 PM', role: 'Builder' },
  { id: '2', user: 'bob.eth', avatar: 'B', message: 'Nice work! I\'ll test it locally', timestamp: '2:32 PM', role: 'Builder' },
  { id: '3', user: 'carol.eth', avatar: 'C', message: 'The UI looks amazing!', timestamp: '2:35 PM', role: 'Contributor' },
  { id: '4', user: 'alice.sol', avatar: 'A', message: 'Thanks! Next up: governance integration', timestamp: '2:36 PM', role: 'Builder' },
]

export function ChatSection({ club }: ChatSectionProps) {
  const [activeChannel, setActiveChannel] = useState('building')
  const [message, setMessage] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'building': return 'bg-orange-500'
      case 'away': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    setMessage('')
  }

  return (
    <div className="h-full flex bg-black">
      {/* Left Panel - Channels (20%) */}
      <div className="w-1/5 bg-gray-900 flex flex-col">
        {/* Channels */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">CHANNELS</h3>
            <Plus className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer" />
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

        {/* Voice Rooms */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">VOICE ROOMS</h3>
            <Plus className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer" />
          </div>
          <div className="space-y-1">
            {voiceRooms.map((room) => {
              const Icon = room.icon
              return (
                <div
                  key={room.id}
                  className="flex items-center px-2 py-2 rounded hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <Icon className="h-4 w-4 mr-2 text-green-400" />
                  <span className="flex-1 text-gray-400 text-sm">{room.name}</span>
                  <span className="text-xs text-gray-500">{room.members}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Direct Messages */}
        <div className="p-4 border-t border-gray-800 flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">DIRECT MESSAGES</h3>
            <Plus className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer" />
          </div>
          <div className="space-y-1">
            {directMessages.map((dm) => (
              <div
                key={dm.id}
                className="flex items-center px-2 py-2 rounded hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="relative">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {dm.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-900 ${getStatusColor(dm.status)}`}></div>
                </div>
                <span className="ml-2 text-gray-400 text-sm">{dm.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Panel - Chat Content (60%) */}
      <div className="flex-1 flex flex-col">
        {/* Channel Header */}
        <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4">
          <Hash className="h-5 w-5 text-gray-400 mr-2" />
          <h2 className="text-white font-semibold">#{activeChannel}</h2>
          <div className="ml-4 text-gray-400 text-sm">
            {mockMessages.length} messages
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
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockMessages.map((msg) => (
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
                  <span className="text-xs text-blue-400">{msg.role}</span>
                  <span className="text-gray-400 text-xs">{msg.timestamp}</span>
                </div>
                <div className="text-gray-300 mt-1">{msg.message}</div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 flex space-x-1">
                <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
                  <Smile className="h-4 w-4" />
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

      {/* Right Panel - Members & Activity (20%) */}
      <div className="w-1/5 bg-gray-900 flex flex-col">
        {/* Online Members */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">ONLINE NOW (12)</h3>
          </div>
          <div className="space-y-2">
            {onlineMembers.map((member) => (
              <div key={member.id} className="flex items-center">
                <div className="relative">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {member.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-900 ${getStatusColor(member.status)}`}></div>
                </div>
                <div className="ml-2 flex-1">
                  <div className="text-white text-sm">{member.name}</div>
                  {member.status === 'building' && (
                    <div className="text-orange-400 text-xs flex items-center">
                      <Wrench className="h-3 w-3 mr-1" />
                      building
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Builds */}
        <div className="p-4 border-t border-gray-800 flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">RECENT BUILDS</h3>
            <Trophy className="h-4 w-4 text-yellow-400" />
          </div>
          <div className="space-y-3">
            {recentBuilds.map((build) => (
              <div key={build.id} className="bg-gray-800 rounded-lg p-3">
                <div className="text-white text-sm font-medium">"{build.action}"</div>
                <div className="text-gray-400 text-xs mt-1">-{build.user}</div>
                <div className="text-gray-500 text-xs">{build.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

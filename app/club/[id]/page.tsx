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
  Search,
  DollarSign,
  Vote,
  FileText,
  TrendingUp,
  CreditCard,
  Gem,
  Hammer
} from 'lucide-react'
import ClubEconomicsDashboard from '../../components/ClubEconomicsDashboard'
import OwnershipDashboard from '../../components/OwnershipDashboard'
import MintingGovernance from '../../components/MintingGovernance'
import ClubVault from '../../components/ClubVault'

export default function ClubDashboard() {
  const params = useParams()
  const clubId = params.id as string
  const [activeChannel, setActiveChannel] = useState('general')
  const [activeManagementTab, setActiveManagementTab] = useState('overview')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<any[]>([])

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
    recentActivity: [
      { type: 'proposal', title: 'Fund new development tools', amount: 2500, status: 'voting' },
      { type: 'member', title: 'New member joined', member: 'alice.eth', status: 'completed' },
      { type: 'treasury', title: 'Treasury deposit', amount: 1000, status: 'completed' },
    ]
  }

  // Community channels for left sidebar
  const channels = [
    { id: 'general', name: 'general', icon: Hash, unread: 0 },
    { id: 'announcements', name: 'announcements', icon: Megaphone, unread: 3 },
    { id: 'development', name: 'development', icon: Code, unread: 12 },
    { id: 'design', name: 'design', icon: Heart, unread: 0 },
    { id: 'marketing', name: 'marketing', icon: Megaphone, unread: 5 },
    { id: 'random', name: 'random', icon: Smile, unread: 0 },
  ]

  // Club management tabs for header
  const managementTabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'economics', label: 'Economics', icon: CreditCard },
    { id: 'ownership', label: 'My Tokens', icon: Gem },
    { id: 'minting', label: 'Earn Tokens', icon: Hammer },
    { id: 'vault', label: 'Club Vault', icon: FileText },
    { id: 'treasury', label: 'Treasury', icon: DollarSign },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'governance', label: 'Governance', icon: Vote },
    { id: 'settings', label: 'Settings', icon: Settings },
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
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header with Club Management Tabs */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">{clubData.name}</h1>
              <p className="text-gray-400">{clubData.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">Treasury Balance</div>
                <div className="text-xl font-bold text-green-400">
                  ${clubData.treasuryBalance.toLocaleString()}
                </div>
              </div>
              <button className="btn btn-primary px-4 py-2">
                <Plus className="h-4 w-4 mr-2" />
                Invite Members
              </button>
            </div>
          </div>
          
          {/* Management Tabs */}
          <div className="mt-4 flex space-x-1">
            {managementTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveManagementTab(tab.id)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeManagementTab === tab.id
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Community Channels Sidebar */}
        <div className="w-64 bg-gray-800 flex flex-col">
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

      {/* Management Tab Content Overlay */}
      {activeManagementTab !== 'overview' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {managementTabs.find(tab => tab.id === activeManagementTab)?.label}
                </h2>
                <button
                  onClick={() => setActiveManagementTab('overview')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <MoreHorizontal className="h-6 w-6" />
                </button>
              </div>
              
              {activeManagementTab === 'economics' && (
                <ClubEconomicsDashboard 
                  clubId={clubId}
                  memberAddress="0x1234...5678"
                  isAdmin={true}
                  currentModel="TIERED"
                />
              )}
              {activeManagementTab === 'ownership' && (
                <OwnershipDashboard 
                  memberAddress="0x1234...5678"
                  clubId={clubId}
                  memberTokens={{ purchased: 500, earned: 110, total: 610 }}
                  clubMetrics={{ treasury: 75000, totalTokens: 50000, tokenValue: 1.50, memberCount: 247 }}
                />
              )}
              {activeManagementTab === 'minting' && (
                <MintingGovernance 
                  clubId={clubId}
                  memberAddress="0x1234...5678"
                  isApprovedMinter={true}
                  canVote={true}
                />
              )}
              {activeManagementTab === 'vault' && (
                <ClubVault 
                  clubId={clubId}
                  memberAddress="0x1234...5678"
                  memberTier="PRO"
                  isAdmin={true}
                />
              )}
              {activeManagementTab === 'treasury' && <TreasuryTab clubData={clubData} />}
              {activeManagementTab === 'members' && <MembersTab clubData={clubData} />}
              {activeManagementTab === 'governance' && <GovernanceTab clubData={clubData} />}
              {activeManagementTab === 'settings' && <SettingsTab clubData={clubData} />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Overview Tab Component
function OverviewTab({ clubData }: { clubData: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Members</p>
              <p className="text-2xl font-bold text-gray-900">{clubData.memberCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Treasury</p>
              <p className="text-2xl font-bold text-gray-900">${clubData.treasuryBalance.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Token Price</p>
              <p className="text-2xl font-bold text-gray-900">${clubData.tokenPrice}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {clubData.recentActivity.map((activity: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.member || activity.type}</p>
                </div>
                <div className="text-right">
                  {activity.amount && (
                    <p className="font-medium">${activity.amount.toLocaleString()}</p>
                  )}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activity.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full btn btn-primary text-left">
              <Plus className="h-4 w-4 mr-2" />
              Create Proposal
            </button>
            <button className="w-full btn btn-secondary text-left">
              <Users className="h-4 w-4 mr-2" />
              Invite Members
            </button>
            <button className="w-full btn btn-secondary text-left">
              <DollarSign className="h-4 w-4 mr-2" />
              Add to Treasury
            </button>
            <button className="w-full btn btn-secondary text-left">
              <FileText className="h-4 w-4 mr-2" />
              Share Resource
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Treasury Tab Component
function TreasuryTab({ clubData }: { clubData: any }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Treasury Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              ${clubData.treasuryBalance.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Total Balance</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {clubData.memberCount}
            </div>
            <div className="text-sm text-gray-500">Contributors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              ${clubData.totalValue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Total Value</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Treasury Deposit</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
              <div className="text-green-600 font-medium">+$1,000</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Tool Purchase</p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
              <div className="text-red-600 font-medium">-$250</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Pending Proposals</h3>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="font-medium">Fund new development tools</p>
              <p className="text-sm text-gray-500">$2,500 • 3 days left</p>
              <div className="mt-2">
                <div className="flex justify-between text-sm">
                  <span>Votes: 15/20</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Members Tab Component
function MembersTab({ clubData }: { clubData: any }) {
  const members = [
    { name: 'alice.eth', role: 'Founder', tokens: 1000, joined: '2 days ago' },
    { name: 'bob.eth', role: 'Builder', tokens: 500, joined: '1 week ago' },
    { name: 'charlie.eth', role: 'Contributor', tokens: 250, joined: '2 weeks ago' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Members ({clubData.memberCount})</h2>
        <button className="btn btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Invite Member
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500">
            <div>Member</div>
            <div>Role</div>
            <div>Tokens</div>
            <div>Joined</div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {members.map((member, index) => (
            <div key={index} className="px-6 py-4 grid grid-cols-4 gap-4 items-center">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <div className="font-medium">{member.name}</div>
                </div>
              </div>
              <div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  member.role === 'Founder' 
                    ? 'bg-purple-100 text-purple-800'
                    : member.role === 'Builder'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {member.role}
                </span>
              </div>
              <div className="font-medium">{member.tokens.toLocaleString()}</div>
              <div className="text-gray-500">{member.joined}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Governance Tab Component
function GovernanceTab({ clubData }: { clubData: any }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Governance</h2>
        <button className="btn btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Create Proposal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Active Proposals</h3>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium">Fund new development tools</h4>
              <p className="text-sm text-gray-600 mt-1">Request $2,500 for purchasing development tools</p>
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Votes: 15/20</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-500">3 days left</span>
                  <button className="text-sm text-blue-600 hover:text-blue-800">Vote</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Votes</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Update club rules</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                Passed
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Hire community manager</p>
                <p className="text-sm text-gray-500">1 week ago</p>
              </div>
              <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                Rejected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Resources Tab Component
function ResourcesTab({ clubData }: { clubData: any }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Resources</h2>
        <button className="btn btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Resource
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Development Tools</h3>
          <p className="text-sm text-gray-600 mb-4">Access to premium development tools</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">$2,500/month</span>
            <button className="text-sm text-blue-600 hover:text-blue-800">Access</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Design Assets</h3>
          <p className="text-sm text-gray-600 mb-4">Shared design library and templates</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Free</span>
            <button className="text-sm text-blue-600 hover:text-blue-800">View</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Community Server</h3>
          <p className="text-sm text-gray-600 mb-4">Discord server with premium features</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">$50/month</span>
            <button className="text-sm text-blue-600 hover:text-blue-800">Join</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Settings Tab Component
function SettingsTab({ clubData }: { clubData: any }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Club Settings</h2>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">General</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Club Name</label>
            <input 
              type="text" 
              defaultValue={clubData.name}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
              defaultValue={clubData.description}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Treasury Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Minimum Proposal Amount</label>
            <input 
              type="number" 
              defaultValue="100"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Voting Period (days)</label>
            <input 
              type="number" 
              defaultValue="7"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { 
  Users, 
  DollarSign, 
  Vote, 
  FileText, 
  Settings, 
  Plus,
  TrendingUp,
  Clock,
  Shield
} from 'lucide-react'

export default function ClubDashboard() {
  const params = useParams()
  const clubId = params.id as string
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data - replace with real data from Supabase
  const clubData = {
    id: clubId,
    name: 'BUIDLers United',
    description: 'A community of builders creating the future of Web3',
    memberCount: 127,
    treasuryBalance: 12500.50,
    tokenPrice: 0.15,
    totalValue: 1875.08,
    recentActivity: [
      { type: 'proposal', title: 'Fund new development tools', amount: 2500, status: 'voting' },
      { type: 'member', title: 'New member joined', member: 'alice.eth', status: 'completed' },
      { type: 'treasury', title: 'Treasury deposit', amount: 1000, status: 'completed' },
    ]
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'treasury', label: 'Treasury', icon: DollarSign },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'governance', label: 'Governance', icon: Vote },
    { id: 'resources', label: 'Resources', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{clubData.name}</h1>
              <p className="text-gray-600">{clubData.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Treasury Balance</div>
                <div className="text-xl font-bold text-green-600">
                  ${clubData.treasuryBalance.toLocaleString()}
                </div>
              </div>
              <button className="btn btn-primary px-4 py-2">
                <Plus className="h-4 w-4 mr-2" />
                Invite Members
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && <OverviewTab clubData={clubData} />}
          {activeTab === 'treasury' && <TreasuryTab clubData={clubData} />}
          {activeTab === 'members' && <MembersTab clubData={clubData} />}
          {activeTab === 'governance' && <GovernanceTab clubData={clubData} />}
          {activeTab === 'resources' && <ResourcesTab clubData={clubData} />}
          {activeTab === 'settings' && <SettingsTab clubData={clubData} />}
        </main>
      </div>
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

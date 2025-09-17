'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { useState } from 'react'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

interface TreasuryDashboardProps {
  club: ClubWithMembers
}

const treasuryAllocation = [
  { name: 'Development Tools', value: 40, amount: 60000, color: '#3B82F6' },
  { name: 'Trading Data & APIs', value: 27, amount: 40000, color: '#10B981' },
  { name: 'Education Resources', value: 20, amount: 30000, color: '#F59E0B' },
  { name: 'Reserve Fund', value: 13, amount: 20000, color: '#EF4444' },
]

const recentTransactions = [
  { id: 1, type: 'contribution', user: 'alice.sol', amount: 500, description: 'Joined club', time: '2 hours ago', status: 'completed' },
  { id: 2, type: 'expense', user: 'System', amount: -300, description: 'Purchased GitHub seats', time: '1 day ago', status: 'completed' },
  { id: 3, type: 'reward', user: 'bob.eth', amount: 0, description: 'Earned 500 $BUIDL (reward)', time: '2 days ago', status: 'completed' },
  { id: 4, type: 'contribution', user: 'carol.eth', amount: 1000, description: 'Joined club', time: '3 days ago', status: 'completed' },
  { id: 5, type: 'expense', user: 'System', amount: -150, description: 'OpenAI API credits', time: '4 days ago', status: 'completed' },
]

const spendingProposals = [
  { id: 1, title: 'Add Perplexity AI subscription', amount: 200, votes: { yes: 187, no: 43 }, timeLeft: '2 days', status: 'active' },
  { id: 2, title: 'Host hackathon with 10K $BUIDL prizes', amount: 10000, votes: { yes: 92, no: 31 }, timeLeft: '4 days', status: 'active' },
  { id: 3, title: 'Upgrade to Vercel Pro', amount: 500, votes: { yes: 45, no: 12 }, timeLeft: '6 days', status: 'active' },
]

const monthlyGrowth = [
  { month: 'Jan', amount: 50000 },
  { month: 'Feb', amount: 65000 },
  { month: 'Mar', amount: 78000 },
  { month: 'Apr', amount: 92000 },
  { month: 'May', amount: 110000 },
  { month: 'Jun', amount: 125000 },
  { month: 'Jul', amount: 148900 },
]

export function TreasuryDashboard({ club }: TreasuryDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'contribution':
        return <ArrowUpRight className="h-4 w-4 text-green-400" />
      case 'expense':
        return <ArrowDownRight className="h-4 w-4 text-red-400" />
      case 'reward':
        return <CheckCircle className="h-4 w-4 text-blue-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400'
      case 'pending':
        return 'text-yellow-400'
      case 'failed':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="h-full bg-black p-6">
      {/* Treasury Overview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Treasury Dashboard</h2>
          <button className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Proposal</span>
          </button>
        </div>

        {/* Treasury Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm">Current Balance</h3>
              <DollarSign className="h-5 w-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{formatCurrency(club.treasury_balance)}</div>
            <div className="text-green-400 text-sm">+$12,000 this month</div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm">Monthly Growth</h3>
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">+8.7%</div>
            <div className="text-green-400 text-sm">+$12,000 (+8.7%)</div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm">Per Member</h3>
              <TrendingUp className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{formatCurrency(club.treasury_balance / club.member_count)}</div>
            <div className="text-blue-400 text-sm">Average per builder</div>
          </div>
        </div>

        {/* Treasury Allocation Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Treasury Allocation</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={treasuryAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {treasuryAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [value + '%', name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {treasuryAllocation.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-300 text-sm">{item.name}</span>
                  </div>
                  <div className="text-white text-sm font-medium">{formatCurrency(item.amount)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Monthly Growth</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), 'Treasury']}
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                  />
                  <Bar dataKey="amount" fill="#F97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions & Spending Proposals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Transactions */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getTransactionIcon(tx.type)}
                  <div>
                    <div className="text-white text-sm font-medium">{tx.description}</div>
                    <div className="text-gray-400 text-xs">{tx.user} • {tx.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    tx.amount > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                  </div>
                  <div className={`text-xs ${getStatusColor(tx.status)}`}>
                    {tx.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spending Proposals */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Spending Proposals</h3>
          <div className="space-y-4">
            {spendingProposals.map((proposal) => (
              <div key={proposal.id} className="p-4 bg-gray-800 rounded-lg border border-orange-500/20">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-medium">{proposal.title}</h4>
                  <div className="flex items-center space-x-1 text-orange-400 text-sm">
                    <AlertCircle className="h-3 w-3" />
                    <span>{proposal.timeLeft} left</span>
                  </div>
                </div>
                <div className="text-gray-400 text-sm mb-3">{formatCurrency(proposal.amount)}</div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-green-400">{proposal.votes.yes} YES</span>
                    <span className="text-red-400">{proposal.votes.no} NO</span>
                  </div>
                  <button className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                    Vote
                  </button>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${(proposal.votes.yes / (proposal.votes.yes + proposal.votes.no)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

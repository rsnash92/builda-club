'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { useState } from 'react'
import { 
  Users, 
  Trophy, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Activity,
  Code,
  MessageSquare,
  Vote,
  Package,
  Clock,
  CheckCircle,
  Star
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface MemberDashboardProps {
  club: ClubWithMembers
}

const memberStats = {
  joined: '30 days ago',
  tokens: 500,
  ownership: 0.34,
  buidlEarned: 3450,
  contributions: 12,
  featuresShipped: 3,
  streak: 15,
  rank: 3
}

const earningsHistory = [
  { date: 'Week 1', amount: 800 },
  { date: 'Week 2', amount: 1200 },
  { date: 'Week 3', amount: 950 },
  { date: 'Week 4', amount: 1500 },
  { date: 'This Week', amount: 1000 },
]

const recentActivity = [
  {
    id: 1,
    type: 'contribution',
    action: 'Merged PR #45: Trading bot improvements',
    time: '2 hours ago',
    icon: Code,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10'
  },
  {
    id: 2,
    type: 'governance',
    action: 'Voted on Perplexity AI proposal',
    time: '1 day ago',
    icon: Vote,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10'
  },
  {
    id: 3,
    type: 'earnings',
    action: 'Earned 500 $BUIDL for feature contribution',
    time: '2 days ago',
    icon: DollarSign,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10'
  },
  {
    id: 4,
    type: 'chat',
    action: 'Active in #building channel',
    time: '3 days ago',
    icon: MessageSquare,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10'
  },
  {
    id: 5,
    type: 'resource',
    action: 'Downloaded Strategy Scanner v2.1',
    time: '5 days ago',
    icon: Package,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10'
  }
]

const achievements = [
  {
    id: 1,
    title: 'First Contribution',
    description: 'Made your first code contribution',
    icon: Star,
    earned: true,
    date: '30 days ago'
  },
  {
    id: 2,
    title: 'Feature Shipper',
    description: 'Shipped 3 features',
    icon: Code,
    earned: true,
    date: '15 days ago'
  },
  {
    id: 3,
    title: 'Governance Participant',
    description: 'Voted in 10+ proposals',
    icon: Vote,
    earned: true,
    date: '7 days ago'
  },
  {
    id: 4,
    title: 'Streak Master',
    description: '15-day building streak',
    icon: Trophy,
    earned: true,
    date: 'Today'
  },
  {
    id: 5,
    title: 'Top 10 Builder',
    description: 'Ranked in top 10 builders',
    icon: Trophy,
    earned: false,
    progress: 70
  },
  {
    id: 6,
    title: 'Treasury Guardian',
    description: 'Proposed 5+ treasury decisions',
    icon: DollarSign,
    earned: false,
    progress: 40
  }
]

export function MemberDashboard({ club }: MemberDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <div className="h-full bg-black p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Your Dashboard</h2>
        <p className="text-gray-400">Track your contributions, earnings, and achievements</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Joined</h3>
            <Calendar className="h-5 w-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{memberStats.joined}</div>
          <div className="text-blue-400 text-sm">Member since</div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Tokens</h3>
            <Users className="h-5 w-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{formatNumber(memberStats.tokens)}</div>
          <div className="text-green-400 text-sm">{memberStats.ownership}% ownership</div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">$BUIDL Earned</h3>
            <DollarSign className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{formatNumber(memberStats.buidlEarned)}</div>
          <div className="text-yellow-400 text-sm">This month</div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Rank</h3>
            <Trophy className="h-5 w-5 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">#{memberStats.rank}</div>
          <div className="text-orange-400 text-sm">Top builder</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Earnings Chart */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Earnings History</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                  formatter={(value: number) => [value + ' $BUIDL', 'Earnings']}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#F97316"
                  strokeWidth={3}
                  dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg ${activity.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium">{activity.action}</div>
                    <div className="text-gray-400 text-xs mt-1">{activity.time}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gray-900 rounded-lg p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-4">Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <div key={achievement.id} className={`p-4 rounded-lg border ${
                  achievement.earned 
                    ? 'bg-green-500/10 border-green-500/20' 
                    : 'bg-gray-800 border-gray-700'
                }`}>
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      achievement.earned 
                        ? 'bg-green-500/20' 
                        : 'bg-gray-700'
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        achievement.earned ? 'text-green-400' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${
                        achievement.earned ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className="text-gray-400 text-sm mt-1">{achievement.description}</p>
                      {achievement.earned ? (
                        <div className="text-green-400 text-xs mt-2 flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Earned {achievement.date}
                        </div>
                      ) : (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-orange-500 h-2 rounded-full"
                              style={{ width: `${achievement.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

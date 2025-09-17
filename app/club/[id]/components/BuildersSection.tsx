'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { useState } from 'react'
import { ChevronDown, ChevronUp, Trophy, Users, Activity, Code, MessageSquare } from 'lucide-react'

interface BuildersSectionProps {
  club: ClubWithMembers
}

export function BuildersSection({ club }: BuildersSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const topContributors = [
    {
      id: 1,
      name: 'alice.sol',
      earnings: 3450,
      contribution: 'Built scanner',
      avatar: 'A',
      status: 'online'
    },
    {
      id: 2,
      name: 'bob.eth',
      earnings: 2890,
      contribution: '5 strategies',
      avatar: 'B',
      status: 'online'
    },
    {
      id: 3,
      name: 'carol.eth',
      earnings: 2100,
      contribution: 'Documentation',
      avatar: 'C',
      status: 'away'
    },
    {
      id: 4,
      name: 'diana.eth',
      earnings: 1850,
      contribution: 'API integration',
      avatar: 'D',
      status: 'online'
    },
    {
      id: 5,
      name: 'eve.eth',
      earnings: 1650,
      contribution: 'UI components',
      avatar: 'E',
      status: 'offline'
    }
  ]

  const recentActivity = [
    {
      id: 1,
      user: 'alice.sol',
      action: 'shipped new feature',
      time: '2 hours ago',
      type: 'ship'
    },
    {
      id: 2,
      user: 'bob.eth',
      action: 'opened PR for bot upgrade',
      time: '5 hours ago',
      type: 'pr'
    },
    {
      id: 3,
      user: 'carol.eth',
      action: 'merged documentation update',
      time: '1 day ago',
      type: 'merge'
    },
    {
      id: 4,
      user: 'diana.eth',
      action: 'completed API testing',
      time: '2 days ago',
      type: 'complete'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500'
      case 'away':
        return 'bg-yellow-500'
      case 'offline':
        return 'bg-gray-400'
      default:
        return 'bg-gray-400'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'ship':
        return <Code className="h-3 w-3 text-green-400" />
      case 'pr':
        return <MessageSquare className="h-3 w-3 text-blue-400" />
      case 'merge':
        return <Activity className="h-3 w-3 text-purple-400" />
      case 'complete':
        return <Trophy className="h-3 w-3 text-orange-400" />
      default:
        return <Activity className="h-3 w-3 text-gray-400" />
    }
  }

  return (
    <div className="bg-gray-900/50 rounded-lg border border-gray-800">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Trophy className="h-5 w-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">Top Builders</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-6 pb-6 space-y-6">
          {/* Top Contributors */}
          <div>
            <h4 className="text-white font-medium mb-4">🏆 Top Contributors This Month</h4>
            <div className="space-y-3">
              {topContributors.map((contributor, index) => (
                <div key={contributor.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400 font-bold text-sm">#{index + 1}</span>
                      <div className="relative">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {contributor.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${getStatusColor(contributor.status)}`}></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">{contributor.name}</div>
                      <div className="text-gray-400 text-xs">{contributor.contribution}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-orange-400 font-semibold text-sm">
                      {contributor.earnings.toLocaleString()} $BUIDL
                    </div>
                    <div className="text-gray-400 text-xs">earned</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h4 className="text-white font-medium mb-4">Recent Activity</h4>
            <div className="space-y-2">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-2 hover:bg-gray-800/30 rounded">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <span className="text-white text-sm">{activity.user}</span>
                    <span className="text-gray-400 text-sm"> {activity.action}</span>
                  </div>
                  <span className="text-gray-500 text-xs">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Online Builders */}
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-4 border border-green-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-4 w-4 text-green-400" />
              <span className="text-white font-medium">12 builders active right now</span>
            </div>
            <p className="text-gray-400 text-sm">
              Join the conversation and start building with the community
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

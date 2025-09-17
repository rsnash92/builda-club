'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { useState } from 'react'
import { ChevronDown, ChevronUp, Vote, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react'

interface GovernanceSectionProps {
  club: ClubWithMembers
}

export function GovernanceSection({ club }: GovernanceSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const recentDecisions = [
    {
      id: 1,
      title: 'Build new scanner tool',
      result: 'approved',
      votes: { yes: 187, no: 43 },
      description: 'Proposal to develop automated market scanner',
      date: '2 days ago'
    },
    {
      id: 2,
      title: 'Hire 2 developers',
      result: 'approved',
      votes: { yes: 201, no: 29 },
      description: 'Add full-time developers to core team',
      date: '5 days ago'
    },
    {
      id: 3,
      title: 'Increase entry to $1000',
      result: 'rejected',
      votes: { yes: 89, no: 141 },
      description: 'Proposal to raise membership cost',
      date: '1 week ago'
    }
  ]

  const activeProposals = [
    {
      id: 4,
      title: 'Add Perplexity AI subscription',
      votes: { yes: 45, no: 12 },
      timeLeft: '2 days',
      description: 'Add AI research tool for strategy development'
    },
    {
      id: 5,
      title: 'Host hackathon with 10K $BUIDL prizes',
      votes: { yes: 78, no: 8 },
      timeLeft: '4 days',
      description: 'Community building event with rewards'
    }
  ]

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getResultColor = (result: string) => {
    switch (result) {
      case 'approved':
        return 'text-green-400'
      case 'rejected':
        return 'text-red-400'
      default:
        return 'text-gray-400'
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
          <Vote className="h-5 w-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Governance</h3>
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
          {/* Recent Decisions */}
          <div>
            <h4 className="text-white font-medium mb-4">Recent Decisions</h4>
            <div className="space-y-3">
              {recentDecisions.map((decision) => (
                <div key={decision.id} className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getResultIcon(decision.result)}
                      <span className="text-white font-medium">{decision.title}</span>
                    </div>
                    <span className={`text-sm font-medium ${getResultColor(decision.result)}`}>
                      {decision.result.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{decision.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-green-400">
                        {decision.votes.yes} yes
                      </span>
                      <span className="text-red-400">
                        {decision.votes.no} no
                      </span>
                    </div>
                    <span className="text-gray-500">{decision.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Proposals */}
          <div>
            <h4 className="text-white font-medium mb-4">Active Proposals</h4>
            <div className="space-y-3">
              {activeProposals.map((proposal) => (
                <div key={proposal.id} className="bg-gray-800/50 rounded-lg p-4 border border-orange-500/20">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-orange-400" />
                      <span className="text-white font-medium">{proposal.title}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-orange-400 text-sm">
                      <AlertCircle className="h-3 w-3" />
                      <span>{proposal.timeLeft} left</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{proposal.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-green-400">
                        {proposal.votes.yes} yes
                      </span>
                      <span className="text-red-400">
                        {proposal.votes.no} no
                      </span>
                    </div>
                    <button className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                      Vote Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Governance Stats */}
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-4 border border-purple-500/20">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold text-purple-400 mb-1">87%</div>
                <div className="text-gray-400 text-sm">Participation Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-1">23</div>
                <div className="text-gray-400 text-sm">Proposals This Month</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-3">
              Members actively participate in shaping the club's direction through transparent voting.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

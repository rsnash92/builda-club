'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { useState } from 'react'
import { ChevronDown, ChevronUp, DollarSign, Users, Database, Shield } from 'lucide-react'

interface TreasurySectionProps {
  club: ClubWithMembers
}

export function TreasurySection({ club }: TreasurySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const treasuryAllocation = [
    {
      category: 'Development Tools',
      amount: 60000,
      percentage: 40,
      description: 'GitHub, AWS, Vercel, Figma',
      icon: Database
    },
    {
      category: 'Trading Data & APIs',
      amount: 40000,
      percentage: 27,
      description: 'TradingView, Alpaca, Alpha Vantage',
      icon: DollarSign
    },
    {
      category: 'Education Resources',
      amount: 30000,
      percentage: 20,
      description: 'Courses, tutorials, certifications',
      icon: Users
    },
    {
      category: 'Reserve Fund',
      amount: 20000,
      percentage: 13,
      description: 'Emergency fund and opportunities',
      icon: Shield
    }
  ]

  const sharedResources = [
    {
      name: 'GitHub Organization',
      seats: 25,
      value: '$2,500/mo',
      description: 'Private repos and CI/CD'
    },
    {
      name: 'TradingView Premium',
      accounts: 50,
      value: '$1,500/mo',
      description: 'Advanced charting and alerts'
    },
    {
      name: 'OpenAI API',
      credits: '$5,000/mo',
      value: '$5,000/mo',
      description: 'AI development and analysis'
    },
    {
      name: 'Private Discord',
      experts: 15,
      value: '$200/mo',
      description: 'Expert community access'
    }
  ]

  return (
    <div className="bg-[#202128] rounded-lg border border-[#24252a]">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#202128]/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <DollarSign className="h-5 w-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">Treasury & Resources</h3>
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
          {/* Treasury Allocation */}
          <div>
            <h4 className="text-white font-medium mb-4">Treasury Allocation</h4>
            <div className="space-y-4">
              {treasuryAllocation.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="bg-[#202128]/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-blue-400" />
                        <span className="text-white font-medium">{item.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{formatCurrency(item.amount)}</div>
                        <div className="text-gray-400 text-sm">{item.percentage}%</div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                    <div className="w-full bg-[#24252a] rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Shared Resources */}
          <div>
            <h4 className="text-white font-medium mb-4">Shared Resources</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sharedResources.map((resource, index) => (
                <div key={index} className="bg-[#202128]/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{resource.name}</span>
                    <span className="text-green-400 font-semibold">{resource.value}</span>
                  </div>
                  <div className="text-gray-400 text-sm mb-1">
                    {resource.seats && `${resource.seats} seats`}
                    {resource.accounts && `${resource.accounts} accounts`}
                    {resource.credits && resource.credits}
                    {resource.experts && `${resource.experts} experts`}
                  </div>
                  <p className="text-gray-500 text-xs">{resource.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Treasury Stats */}
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-4 border border-green-500/20">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {formatCurrency(club.treasury_balance)}
                </div>
                <div className="text-gray-400 text-sm">Total Treasury</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {formatCurrency(club.treasury_balance / club.member_count)}
                </div>
                <div className="text-gray-400 text-sm">Per Member</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

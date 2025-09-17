'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { Badge } from '@/components/ui/badge'
import { ArrowUp } from 'lucide-react'

interface ClubHeaderProps {
  club: ClubWithMembers
}

export function ClubHeader({ club }: ClubHeaderProps) {
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
    <div className="space-y-6">
      {/* Club Title and Image */}
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
          {club.name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-white">{club.name}</h1>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              {club.category || 'Developer'}
            </Badge>
          </div>
          <p className="text-gray-400 text-lg mb-4">
            Building: {club.description || 'The future of Web3 development'}
          </p>
          
          {/* Key Stats */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Treasury:</span>
              <span className="text-white font-semibold">{formatCurrency(club.treasury_balance)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Entry:</span>
              <span className="text-white font-semibold">$500</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Builders:</span>
              <span className="text-white font-semibold">{formatNumber(club.member_count)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Building Status */}
      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-400 font-medium">Building Now</span>
            <span className="text-gray-400">•</span>
            <span className="text-white">12 builders online</span>
          </div>
          <div className="flex items-center space-x-2 text-green-400">
            <ArrowUp className="h-4 w-4" />
            <span className="text-sm font-medium">+3.3% this week</span>
          </div>
        </div>
      </div>
    </div>
  )
}

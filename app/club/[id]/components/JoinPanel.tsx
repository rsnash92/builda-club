'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Users, DollarSign, Vote, TrendingUp } from 'lucide-react'

interface JoinPanelProps {
  club: ClubWithMembers
}

export function JoinPanel({ club }: JoinPanelProps) {
  const [amount, setAmount] = useState('500')
  const [isJoining, setIsJoining] = useState(false)

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

  const handleJoin = async () => {
    setIsJoining(true)
    // TODO: Implement actual join logic
    setTimeout(() => {
      setIsJoining(false)
      alert('Join functionality coming soon!')
    }, 2000)
  }

  const entryAmount = parseFloat(amount) || 500
  const tokenAmount = entryAmount // 1:1 ratio
  const treasuryShare = (entryAmount / club.treasury_balance) * 100
  const votingPower = tokenAmount

  return (
    <div className="space-y-6">
      {/* Join & Build Panel */}
      <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">JOIN & BUILD</h3>
            <p className="text-gray-400 text-sm">Become a co-owner and start building value together</p>
          </div>

          {/* Entry Cost */}
          <div className="space-y-2">
            <Label className="text-white">Entry Cost</Label>
            <div className="text-2xl font-bold text-white">{formatCurrency(entryAmount)}</div>
            <p className="text-gray-400 text-sm">You Get: {formatNumber(tokenAmount)} Club Tokens</p>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-white">Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
                placeholder="500"
              />
            </div>
            <p className="text-gray-400 text-sm">Available: {formatCurrency(1000)}</p>
          </div>

          {/* Treasury Info */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Treasury Value:</span>
              <span className="text-white font-semibold">{formatCurrency(club.treasury_balance)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Your Share:</span>
              <span className="text-white font-semibold">{treasuryShare.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Voting Power:</span>
              <span className="text-white font-semibold">{formatNumber(votingPower)} votes</span>
            </div>
          </div>

          {/* Join Button */}
          <Button 
            onClick={handleJoin}
            disabled={isJoining}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
          >
            {isJoining ? 'Joining...' : 'JOIN CLUB'}
          </Button>
        </div>
      </div>

      {/* Club Stats */}
      <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
        <h4 className="text-lg font-semibold text-white mb-4">Club Stats</h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-400" />
              <span className="text-gray-400">Builders:</span>
            </div>
            <span className="text-white font-semibold">{formatNumber(club.member_count)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-xs">🔨</span>
              </div>
              <span className="text-gray-400">Building Now:</span>
            </div>
            <span className="text-white font-semibold">12 online</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-gray-400">Avg Earnings:</span>
            </div>
            <span className="text-white font-semibold">1,234 $BUIDL/mo</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Vote className="h-4 w-4 text-purple-400" />
              <span className="text-gray-400">Founded:</span>
            </div>
            <span className="text-white font-semibold">30 days ago</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-gray-400">Category:</span>
            </div>
            <span className="text-white font-semibold">{club.category || 'Developer DAO'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

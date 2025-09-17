'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TreasuryChartProps {
  club: ClubWithMembers
  activeTimeRange: string
  onTimeRangeChange: (range: string) => void
}

// Mock data for treasury growth
const generateTreasuryData = (range: string) => {
  const now = new Date()
  const data = []
  
  let days = 7
  if (range === '24H') days = 1
  else if (range === '7D') days = 7
  else if (range === '30D') days = 30
  else if (range === 'ALL') days = 90

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    // Simulate treasury growth with some volatility
    const baseAmount = 50000
    const growth = (days - i) * 2000
    const volatility = Math.sin(i * 0.5) * 1000
    const amount = baseAmount + growth + volatility
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      treasury: Math.max(amount, 10000),
      builders: Math.floor(20 + (days - i) * 2 + Math.random() * 5)
    })
  }
  
  return data
}

export function TreasuryChart({ club, activeTimeRange, onTimeRangeChange }: TreasuryChartProps) {
  const [chartData] = useState(() => generateTreasuryData(activeTimeRange))
  
  const timeRanges = [
    { key: '24H', label: '24H' },
    { key: '7D', label: '7D' },
    { key: '30D', label: '30D' },
    { key: 'ALL', label: 'ALL' }
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Treasury Growth</h3>
          <p className="text-gray-400 text-sm">Building value together, not trading speculation</p>
        </div>
        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range.key}
              onClick={() => onTimeRangeChange(range.key)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                activeTimeRange === range.key
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
              formatter={(value: number) => [formatCurrency(value), 'Treasury']}
            />
            <Line
              type="monotone"
              dataKey="treasury"
              stroke="#F97316"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#F97316' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-gray-400">Treasury Value</span>
        </div>
        <div className="text-gray-500">
          More builders = More resources = More value created
        </div>
      </div>
    </div>
  )
}

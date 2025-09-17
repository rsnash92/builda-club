'use client'

import { useState } from 'react'
import { ClubHeader } from '../[id]/components/ClubHeader'
import { TreasuryChart } from '../[id]/components/TreasuryChart'
import { JoinPanel } from '../[id]/components/JoinPanel'
import { BuildingSection } from '../[id]/components/BuildingSection'
import { TreasurySection } from '../[id]/components/TreasurySection'
import { GovernanceSection } from '../[id]/components/GovernanceSection'
import { BuildersSection } from '../[id]/components/BuildersSection'
import { ChevronLeft, Share2 } from 'lucide-react'

// Mock club data for demo
const mockClub = {
  id: 'demo-club',
  name: 'BUIDLers United',
  description: 'A community of builders creating the future of Web3',
  category: 'Developer',
  treasury_balance: 148900,
  member_count: 287,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-15T00:00:00Z',
  created_by: 'demo-user',
  members: []
}

export default function DemoClubPage() {
  const [activeTimeRange, setActiveTimeRange] = useState('7D')

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Header */}
      <div className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-400 hover:text-white transition-colors">
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span>Clubs</span>
            </button>
          </div>
          <button className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Share2 className="h-4 w-4" />
            <span>Share to Earn</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Club Header */}
              <ClubHeader club={mockClub} />

              {/* Treasury Chart */}
              <TreasuryChart 
                club={mockClub} 
                activeTimeRange={activeTimeRange}
                onTimeRangeChange={setActiveTimeRange}
              />

              {/* Expandable Sections */}
              <div className="space-y-6">
                <BuildingSection club={mockClub} />
                <TreasurySection club={mockClub} />
                <GovernanceSection club={mockClub} />
              </div>
            </div>

            {/* Right Column - Join Panel */}
            <div className="lg:col-span-1">
              <JoinPanel club={mockClub} />
              <BuildersSection club={mockClub} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { AppLayout } from '@/app/components/AppLayout'
import { ClubNavigation } from '../[id]/components/ClubNavigation'
import { ClubHeader } from '../[id]/components/ClubHeader'
import { TreasuryChart } from '../[id]/components/TreasuryChart'
import { JoinPanel } from '../[id]/components/JoinPanel'
import { BuildingSection } from '../[id]/components/BuildingSection'
import { TreasurySection } from '../[id]/components/TreasurySection'
import { GovernanceSection } from '../[id]/components/GovernanceSection'
import { BuildersSection } from '../[id]/components/BuildersSection'
import { ChatSection } from '../[id]/components/ChatSection'
import { TreasuryDashboard } from '../[id]/components/TreasuryDashboard'
import { ResourcesSection } from '../[id]/components/ResourcesSection'
import { MemberDashboard } from '../[id]/components/MemberDashboard'
import { ClubWithMembers } from '@/lib/database/types'

// Mock club data for demo
const mockClub: ClubWithMembers = {
  id: 'demo-club',
  name: 'BUIDLers United',
  description: 'A community of builders creating the future of Web3',
  category: 'Developer',
  token_symbol: 'BUIDL',
  treasury_balance: 148900,
  token_address: '0x1234567890abcdef',
  treasury_address: '0xabcdef1234567890',
  thumbnail_url: undefined,
  likes: 1247,
  is_hot: true,
  is_lord_of_dev: false,
  progress: 75,
  market_cap: 148900,
  market_cap_change: 12.5,
  volume: 25000,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-15T00:00:00Z',
  created_by: 'demo-user',
  members: [],
  member_count: 287
}

export default function DemoClubPage() {
  const [activeTimeRange, setActiveTimeRange] = useState('7D')
  const [activeTab, setActiveTab] = useState('overview') // Default to overview

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatSection club={mockClub} />
      case 'treasury':
        return <TreasuryDashboard club={mockClub} />
      case 'governance':
        return (
          <div className="h-full bg-black p-6">
            <GovernanceSection club={mockClub} />
          </div>
        )
      case 'resources':
        return <ResourcesSection club={mockClub} />
      case 'members':
        return <MemberDashboard club={mockClub} />
      case 'settings':
        return (
          <div className="h-full bg-black p-6">
            <div className="text-white text-xl">Settings - Coming Soon</div>
          </div>
        )
      default: // overview
        return (
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
        )
    }
  }

  return (
    <AppLayout pageTitle="BUIDLers United">
      {/* Club Navigation */}
      <ClubNavigation 
        club={mockClub} 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      {/* Dynamic Content Based on Active Tab */}
      {renderContent()}
    </AppLayout>
  )
}

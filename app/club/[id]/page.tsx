'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { AppLayout } from '@/app/components/AppLayout'
import { ClubService } from '@/lib/services/club-service'
import { ClubWithMembers } from '@/lib/database/types'
import { ClubNavigation } from './components/ClubNavigation'
import { ClubHeader } from './components/ClubHeader'
import { TreasuryChart } from './components/TreasuryChart'
import { JoinPanel } from './components/JoinPanel'
import { BuildingSection } from './components/BuildingSection'
import { TreasurySection } from './components/TreasurySection'
import { GovernanceSection } from './components/GovernanceSection'
import { BuildersSection } from './components/BuildersSection'
import { ChatSection } from './components/ChatSection'
import { TreasuryDashboard } from './components/TreasuryDashboard'
import { ResourcesSection } from './components/ResourcesSection'
import { MemberDashboard } from './components/MemberDashboard'

export default function ClubPage() {
  const params = useParams()
  const clubId = params.id as string
  const [club, setClub] = useState<ClubWithMembers | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTimeRange, setActiveTimeRange] = useState('7D')
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const clubData = await ClubService.getClubById(clubId)
        setClub(clubData)
      } catch (error) {
        console.error('Error fetching club:', error)
      } finally {
        setLoading(false)
      }
    }

    if (clubId) {
      fetchClub()
    }
  }, [clubId])

  if (loading) {
    return (
      <AppLayout pageTitle="Loading...">
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-xl">Loading club...</div>
        </div>
      </AppLayout>
    )
  }

  if (!club) {
    return (
      <AppLayout pageTitle="Club Not Found">
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-xl">Club not found</div>
        </div>
      </AppLayout>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatSection club={club} />
      case 'treasury':
        return <TreasuryDashboard club={club} />
      case 'governance':
        return (
          <div className="h-full bg-black p-6">
            <GovernanceSection club={club} />
          </div>
        )
      case 'resources':
        return <ResourcesSection club={club} />
      case 'members':
        return <MemberDashboard club={club} />
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
                  <ClubHeader club={club} />

                  {/* Treasury Chart */}
                  <TreasuryChart 
                    club={club} 
                    activeTimeRange={activeTimeRange}
                    onTimeRangeChange={setActiveTimeRange}
                  />

                  {/* Expandable Sections */}
                  <div className="space-y-6">
                    <BuildingSection club={club} />
                    <TreasurySection club={club} />
                    <GovernanceSection club={club} />
                  </div>
                </div>

                {/* Right Column - Join Panel */}
                <div className="lg:col-span-1">
                  <JoinPanel club={club} />
                  <BuildersSection club={club} />
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <AppLayout pageTitle={club.name}>
      {/* Club Navigation */}
      <ClubNavigation 
        club={club} 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      {/* Dynamic Content Based on Active Tab */}
      {renderContent()}
    </AppLayout>
  )
}

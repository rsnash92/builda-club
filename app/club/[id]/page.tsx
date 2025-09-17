'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { AppLayout } from '@/app/components/AppLayout'
import { ClubService } from '@/lib/services/club-service'
import { ClubWithMembers } from '@/lib/database/types'
import { ClubHeader } from './components/ClubHeader'
import { TreasuryChart } from './components/TreasuryChart'
import { JoinPanel } from './components/JoinPanel'
import { BuildingSection } from './components/BuildingSection'
import { TreasurySection } from './components/TreasurySection'
import { GovernanceSection } from './components/GovernanceSection'
import { BuildersSection } from './components/BuildersSection'
import { ChevronLeft, Share2 } from 'lucide-react'

export default function ClubPage() {
  const params = useParams()
  const clubId = params.id as string
  const [club, setClub] = useState<ClubWithMembers | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTimeRange, setActiveTimeRange] = useState('7D')

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

  return (
    <AppLayout pageTitle={club.name}>
      <div className="px-6 py-8">
        {/* Main Content */}
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
    </AppLayout>
  )
}

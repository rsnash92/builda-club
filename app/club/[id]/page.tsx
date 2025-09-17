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
import Link from 'next/link'
import { ArrowRight, Lock } from 'lucide-react'

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

  const renderContent = () => {
    return (
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Authentication Required Banner */}
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Join the App to Access Full Club Management</h3>
                <p className="text-gray-300">
                  Sign in to access the complete club experience including chat, treasury management, resources, and member tools.
                </p>
              </div>
              <Link
                href="/app"
                className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <span>Go to App</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

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

  return (
    <AppLayout pageTitle={club.name}>
      {renderContent()}
    </AppLayout>
  )
}

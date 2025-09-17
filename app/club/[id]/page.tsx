'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading club...</div>
      </div>
    )
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Club not found</div>
      </div>
    )
  }

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
    </div>
  )
}

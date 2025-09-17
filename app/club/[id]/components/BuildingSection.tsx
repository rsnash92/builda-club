'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { useState } from 'react'
import { ChevronDown, ChevronUp, CheckCircle, Clock, Code, BookOpen, Zap } from 'lucide-react'

interface BuildingSectionProps {
  club: ClubWithMembers
}

export function BuildingSection({ club }: BuildingSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const currentProjects = [
    {
      id: 1,
      name: 'AI Trading Bot',
      progress: 75,
      status: 'in-progress',
      description: 'Automated trading system with ML predictions'
    },
    {
      id: 2,
      name: 'Dashboard v2',
      progress: 100,
      status: 'completed',
      description: 'New analytics dashboard (Shipped last week)'
    },
    {
      id: 3,
      name: 'Strategy Backtester',
      progress: 25,
      status: 'in-progress',
      description: 'Backtesting framework for trading strategies'
    }
  ]

  const shippedThisMonth = [
    '3 Trading Strategies',
    '2 Analysis Tools', 
    '15 Educational Guides',
    'API Integration Suite',
    'Mobile App Beta'
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400'
      case 'in-progress':
        return 'text-blue-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="bg-gray-900/50 rounded-lg border border-gray-800">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Code className="h-5 w-5 text-orange-400" />
          <h3 className="text-lg font-semibold text-white">What We're Building</h3>
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
          {/* Current Projects */}
          <div>
            <h4 className="text-white font-medium mb-4">Current Projects</h4>
            <div className="space-y-4">
              {currentProjects.map((project) => (
                <div key={project.id} className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(project.status)}
                      <span className="text-white font-medium">{project.name}</span>
                    </div>
                    <span className={`text-sm ${getStatusColor(project.status)}`}>
                      {project.progress}%
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipped This Month */}
          <div>
            <h4 className="text-white font-medium mb-4">Shipped This Month</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {shippedThisMonth.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-300">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Value Created */}
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg p-4 border border-orange-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="h-5 w-5 text-orange-400" />
              <span className="text-white font-medium">Total Value Created</span>
            </div>
            <div className="text-2xl font-bold text-orange-400 mb-1">$450K+</div>
            <p className="text-gray-400 text-sm">
              Collective value built by our community of builders
            </p>
          </div>

          {/* Building Philosophy */}
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <BookOpen className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-white font-medium mb-2">Our Building Philosophy</h5>
                <p className="text-gray-400 text-sm">
                  We focus on creating real value through building, not speculation. 
                  Every project we ship adds to our collective treasury and benefits all members.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

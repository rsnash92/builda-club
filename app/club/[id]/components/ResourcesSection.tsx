'use client'

import { ClubWithMembers } from '@/lib/database/types'
import { useState } from 'react'
import { 
  Package, 
  Plus, 
  ExternalLink, 
  Download, 
  Users, 
  Settings, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Wrench,
  Code,
  BookOpen,
  Zap
} from 'lucide-react'

interface ResourcesSectionProps {
  club: ClubWithMembers
}

const sharedResources = [
  {
    category: 'DEVELOPMENT',
    resources: [
      {
        id: 1,
        name: 'GitHub Organization',
        description: 'Private repos and CI/CD',
        seats: { used: 25, total: 25 },
        cost: '$2,500/mo',
        status: 'active',
        icon: Code,
        color: 'from-gray-500 to-gray-700'
      },
      {
        id: 2,
        name: 'Vercel Team',
        description: 'Deployment and hosting',
        seats: { used: 10, total: '∞' },
        cost: '$1,200/mo',
        status: 'active',
        icon: Zap,
        color: 'from-black to-gray-800'
      },
      {
        id: 3,
        name: 'OpenAI API',
        description: 'AI development and analysis',
        usage: '43% used',
        cost: '$5,000/mo',
        status: 'active',
        icon: Wrench,
        color: 'from-green-500 to-emerald-600'
      }
    ]
  },
  {
    category: 'CREATED BY CLUB',
    resources: [
      {
        id: 4,
        name: 'Trading Bot v2.1',
        description: 'Automated trading system',
        type: 'download',
        status: 'available',
        icon: Download,
        color: 'from-blue-500 to-blue-700'
      },
      {
        id: 5,
        name: 'Strategy Scanner',
        description: 'Market analysis tool',
        type: 'access',
        status: 'available',
        icon: ExternalLink,
        color: 'from-purple-500 to-purple-700'
      },
      {
        id: 6,
        name: 'Education Portal',
        description: 'Learning resources and tutorials',
        type: 'visit',
        status: 'available',
        icon: BookOpen,
        color: 'from-orange-500 to-red-500'
      }
    ]
  }
]

const resourceRequests = [
  {
    id: 1,
    title: 'Add Figma Team Plan',
    description: 'Design collaboration and prototyping',
    cost: 500,
    votes: { yes: 23, no: 5 },
    status: 'voting',
    timeLeft: '3 days'
  },
  {
    id: 2,
    title: 'Upgrade to AWS Pro',
    description: 'Enhanced cloud infrastructure',
    cost: 1200,
    votes: { yes: 15, no: 8 },
    status: 'voting',
    timeLeft: '5 days'
  },
  {
    id: 3,
    title: 'Add Notion Workspace',
    description: 'Documentation and project management',
    cost: 200,
    votes: { yes: 31, no: 2 },
    status: 'approved',
    timeLeft: 'Completed'
  }
]

export function ResourcesSection({ club }: ResourcesSectionProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [showRequestForm, setShowRequestForm] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400'
      case 'available':
        return 'text-blue-400'
      case 'voting':
        return 'text-orange-400'
      case 'approved':
        return 'text-green-400'
      case 'rejected':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'voting':
        return <Clock className="h-4 w-4 text-orange-400" />
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="h-full bg-black p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Resources & Vault</h2>
          <p className="text-gray-400 mt-1">Shared tools and club-created assets</p>
        </div>
        <button 
          onClick={() => setShowRequestForm(true)}
          className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Propose Resource</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-4 mb-8">
        {['all', 'development', 'created', 'requests'].map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-orange-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="space-y-8">
        {sharedResources.map((category) => (
          <div key={category.category}>
            <h3 className="text-lg font-semibold text-white mb-4">{category.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.resources.map((resource) => {
                const Icon = resource.icon
                return (
                  <div key={resource.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${resource.color} flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(resource.status)}
                        <span className={`text-sm font-medium ${getStatusColor(resource.status)}`}>
                          {resource.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <h4 className="text-white font-semibold mb-2">{resource.name}</h4>
                    <p className="text-gray-400 text-sm mb-4">{resource.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {'seats' in resource && resource.seats && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Seats:</span>
                          <span className="text-white">
                            {resource.seats.used}/{resource.seats.total}
                          </span>
                        </div>
                      )}
                      {'usage' in resource && resource.usage && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Usage:</span>
                          <span className="text-white">{resource.usage}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Cost:</span>
                        <span className="text-white">{resource.cost}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {'type' in resource && resource.type === 'download' && (
                        <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
                          <Download className="h-4 w-4 inline mr-1" />
                          Download
                        </button>
                      )}
                      {'type' in resource && resource.type === 'access' && (
                        <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
                          <ExternalLink className="h-4 w-4 inline mr-1" />
                          Access
                        </button>
                      )}
                      {'type' in resource && resource.type === 'visit' && (
                        <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
                          <ExternalLink className="h-4 w-4 inline mr-1" />
                          Visit
                        </button>
                      )}
                      {(!('type' in resource) || !resource.type) && (
                        <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
                          <Settings className="h-4 w-4 inline mr-1" />
                          Manage
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Resource Requests */}
      <div className="mt-12">
        <h3 className="text-lg font-semibold text-white mb-4">Resource Requests</h3>
        <div className="space-y-4">
          {resourceRequests.map((request) => (
            <div key={request.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">{request.title}</h4>
                  <p className="text-gray-400 text-sm mb-2">{request.description}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-400">Cost: <span className="text-white">{formatCurrency(request.cost)}</span></span>
                    <span className="text-gray-400">Time Left: <span className="text-white">{request.timeLeft}</span></span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(request.status)}
                  <span className={`text-sm font-medium ${getStatusColor(request.status)}`}>
                    {request.status.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-green-400">{request.votes.yes} YES</span>
                  <span className="text-red-400">{request.votes.no} NO</span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded text-sm font-medium transition-colors">
                    Vote YES
                  </button>
                  <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium transition-colors">
                    Vote NO
                  </button>
                </div>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: `${(request.votes.yes / (request.votes.yes + request.votes.no)) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Request Form Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-white mb-4">Propose New Resource</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Resource name"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <textarea
                placeholder="Description"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 h-20"
              />
              <input
                type="number"
                placeholder="Monthly cost"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowRequestForm(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowRequestForm(false)}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Submit Proposal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

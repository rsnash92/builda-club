'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Users, DollarSign, Settings, CreditCard } from 'lucide-react'
import ModelSelection from '../components/ModelSelection'
import { useSupabase } from '../contexts/SupabaseContext'

interface ModelOption {
  id: string;
  name: string;
  type: 'FIXED' | 'SUBSCRIPTION' | 'TIERED';
  description: string;
  icon: string;
  bestFor: string[];
  examples: string[];
  recommended: boolean;
}

export default function CreateClub() {
  const router = useRouter()
  const { user } = useSupabase()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'development',
    category: 'utility',
    tokenSymbol: '',
    economicModel: null as ModelOption | null,
    initialFunding: 0,
    tokenDistribution: {
      builders: 70,
      founders: 15,
      early: 10,
      treasury: 5
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      setError('You must be logged in to create a club')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/clubs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          category: formData.category,
          token_symbol: formData.tokenSymbol || `$${formData.name.toUpperCase().slice(0, 4)}`,
          treasury_balance: formData.initialFunding,
          created_by: user.id
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create club')
      }

      const { club } = await response.json()
      router.push(`/club/${club.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { number: 1, title: 'Basic Info', icon: Settings },
    { number: 2, title: 'Economic Model', icon: CreditCard },
    { number: 3, title: 'Treasury', icon: DollarSign },
    { number: 4, title: 'Members', icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-2xl font-bold text-gray-900">Create Your Club</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => {
              const Icon = stepItem.icon
              const isActive = step === stepItem.number
              const isCompleted = step > stepItem.number
              
              return (
                <div key={stepItem.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive 
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : isCompleted
                      ? 'border-green-600 bg-green-600 text-white'
                      : 'border-gray-300 bg-white text-gray-500'
                  }`}>
                    {isCompleted ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className={`text-sm font-medium ${
                      isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {stepItem.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Club Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., BUIDLers United"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your club's mission and goals..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Club Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="development">Development</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="community">Community</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="utility">Utility</option>
                    <option value="gaming">Gaming</option>
                    <option value="ai">AI</option>
                    <option value="social">Social</option>
                    <option value="money">Money</option>
                    <option value="fun">Fun</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Token Symbol (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.tokenSymbol}
                    onChange={(e) => setFormData({...formData, tokenSymbol: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`$${formData.name.toUpperCase().slice(0, 4)}`}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Leave empty to auto-generate from club name
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Economic Model */}
          {step === 2 && (
            <div className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-6">Choose Economic Model</h2>
              <ModelSelection 
                onModelSelect={(model) => {
                  setFormData({...formData, economicModel: model})
                  setStep(3)
                }}
                currentStep={2}
                totalSteps={4}
              />
            </div>
          )}

          {/* Step 3: Treasury */}
          {step === 3 && (
            <div className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-6">Treasury Setup</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Initial Funding (USD)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.initialFunding}
                    onChange={(e) => setFormData({...formData, initialFunding: parseFloat(e.target.value) || 0})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    This will be the starting balance for your club's treasury
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Token Distribution</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Builders (70%)</span>
                      <span className="font-medium">{formData.tokenDistribution.builders}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Founders (15%)</span>
                      <span className="font-medium">{formData.tokenDistribution.founders}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Early Builders (10%)</span>
                      <span className="font-medium">{formData.tokenDistribution.early}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Treasury (5%)</span>
                      <span className="font-medium">{formData.tokenDistribution.treasury}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Members */}
          {step === 4 && (
            <div className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-6">Member Settings</h2>
              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">Ready to Launch!</h3>
                  <p className="text-sm text-green-700">
                    Your club will be created with the following settings. You can invite members and adjust settings after creation.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium">Club Name</span>
                    <span>{formData.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium">Type</span>
                    <span className="capitalize">{formData.type}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium">Initial Funding</span>
                    <span>${formData.initialFunding.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Token Distribution</span>
                    <span>70% / 15% / 10% / 5%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="btn btn-primary"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Club'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

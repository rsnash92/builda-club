'use client';

import { useState } from 'react';

interface EconomicModel {
  id: string;
  name: string;
  type: 'FIXED' | 'SUBSCRIPTION' | 'TIERED';
  description: string;
  icon: string;
  bestFor: string[];
  examples: string[];
  pricing: any;
  pros: string[];
  cons: string[];
}

interface EconomicModelsProps {
  clubId?: string;
  currentModel?: EconomicModel;
  isAdmin?: boolean;
  memberAddress?: string;
}

const EconomicModels: React.FC<EconomicModelsProps> = ({
  clubId,
  currentModel,
  isAdmin = false,
  memberAddress
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'fixed' | 'subscription' | 'tiered' | 'hybrid' | 'settings'>('overview');
  const [showModelChange, setShowModelChange] = useState(false);

  // Define all three economic models
  const economicModels: EconomicModel[] = [
    {
      id: 'fixed',
      name: 'Fixed Buy-In',
      type: 'FIXED',
      description: 'One-time payment, lifetime membership',
      icon: '🏦',
      bestFor: ['Investment clubs', 'Serious builder DAOs', 'Long-term projects', 'High-commitment communities'],
      examples: ['YC Alumni DAO', 'Solana Builders Club', 'Venture Capital Collective'],
      pricing: {
        current: 500,
        observerMode: '14 days free',
        scholarships: '10% of spots funded by treasury'
      },
      pros: ['Large treasury immediately', 'High commitment members', 'Simple economics', 'No churn concerns'],
      cons: ['No recurring revenue', 'Higher barrier to entry', 'Limited growth potential']
    },
    {
      id: 'subscription',
      name: 'Recurring Subscription',
      type: 'SUBSCRIPTION',
      description: 'Monthly/yearly recurring payment',
      icon: '🔄',
      bestFor: ['Learning communities', 'Trading/signals groups', 'Creative collectives', 'Service-based clubs'],
      examples: ['AI Trading Signals', 'Web3 Academy', 'Design Masterclass', 'Crypto Research Hub'],
      pricing: {
        monthly: 50,
        yearly: 500,
        tokensPerMonth: 100,
        loyaltyDiscounts: {
          month3: '10% discount',
          month6: '20% discount',
          month12: '30% discount + permanent tokens'
        }
      },
      pros: ['Predictable revenue', 'Lower barrier to entry', 'Flexible commitment', 'Built-in retention'],
      cons: ['Churn risk', 'Lower upfront capital', 'Recurring billing complexity']
    },
    {
      id: 'tiered',
      name: 'Tiered System',
      type: 'TIERED',
      description: 'Multiple membership levels from free to premium',
      icon: '🎯',
      bestFor: ['Diverse communities', 'Growth-focused clubs', 'Content creators', 'Educational platforms'],
      examples: ['Creative Collective', 'Global Dev Community', 'NFT Artists Guild', 'DeFi Learning Hub'],
      pricing: {
        observer: { price: 0, access: 'View-only', tokens: 0 },
        builder: { price: 25, access: 'Basic participation', tokens: 100 },
        pro: { price: 100, access: 'Full participation', tokens: 500 },
        elite: { price: 500, access: 'Leadership access', tokens: 2000 }
      },
      pros: ['Accessible to all', 'High revenue potential', 'Clear progression path', 'Flexible commitment'],
      cons: ['Complex to manage', 'Free riders possible', 'Tier management overhead']
    }
  ];

  // Mock revenue data for comparison
  const revenueComparison = {
    fixed: {
      members: 1000,
      avgPrice: 500,
      totalRaised: 500000,
      monthlyRevenue: 0,
      yearlyRevenue: 0
    },
    subscription: {
      members: 1000,
      avgMonthly: 50,
      monthlyRevenue: 50000,
      yearlyRevenue: 600000,
      churnRate: '5% monthly'
    },
    tiered: {
      distribution: {
        free: 400,
        builder: 300,
        pro: 250,
        elite: 50
      },
      monthlyRevenue: 60000,
      yearlyRevenue: 720000
    }
  };

  const renderModelCard = (model: EconomicModel) => (
    <div key={model.id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{model.icon}</span>
        <div>
          <h3 className="text-xl font-semibold">{model.name}</h3>
          <p className="text-gray-600">{model.description}</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Best For:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          {model.bestFor.map((use, index) => (
            <li key={index}>• {use}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Examples:</h4>
        <div className="flex flex-wrap gap-2">
          {model.examples.map((example, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              {example}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="font-semibold text-green-600 mb-1">Pros:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {model.pros.map((pro, index) => (
              <li key={index}>✓ {pro}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-red-600 mb-1">Cons:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {model.cons.map((con, index) => (
              <li key={index}>✗ {con}</li>
            ))}
          </ul>
        </div>
      </div>

      {isAdmin && (
        <button
          onClick={() => setShowModelChange(true)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Select This Model
        </button>
      )}
    </div>
  );

  const renderPricingDetails = (model: EconomicModel) => {
    switch (model.type) {
      case 'FIXED':
        return (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Fixed Buy-In Pricing</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-green-600">${model.pricing.current}</div>
                  <div className="text-sm text-green-700">One-time payment</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">Lifetime Access</div>
                  <div className="text-sm text-green-700">No recurring fees</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="font-semibold text-blue-800">Observer Mode</div>
                <div className="text-sm text-blue-700">{model.pricing.observerMode}</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="font-semibold text-purple-800">Scholarships</div>
                <div className="text-sm text-purple-700">{model.pricing.scholarships}</div>
              </div>
            </div>
          </div>
        );

      case 'SUBSCRIPTION':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Subscription Pricing</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-blue-600">${model.pricing.monthly}/mo</div>
                  <div className="text-sm text-blue-700">Monthly subscription</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">${model.pricing.yearly}/yr</div>
                  <div className="text-sm text-blue-700">Save 17% annually</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Loyalty Rewards</h4>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(model.pricing.loyaltyDiscounts).map(([period, discount]) => (
                  <div key={period} className="bg-yellow-50 p-3 rounded-lg text-center">
                    <div className="font-semibold text-yellow-800">{period}</div>
                    <div className="text-sm text-yellow-700">{discount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'TIERED':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold">Tiered Pricing Structure</h4>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(model.pricing).map(([tier, details]: [string, any]) => (
                <div key={tier} className={`p-4 rounded-lg border ${
                  tier === 'elite' ? 'bg-purple-50 border-purple-200' :
                  tier === 'pro' ? 'bg-blue-50 border-blue-200' :
                  tier === 'builder' ? 'bg-green-50 border-green-200' :
                  'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold capitalize">{tier}</div>
                    <div className="text-lg font-bold">
                      {details.price === 0 ? 'FREE' : `$${details.price}`}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">{details.access}</div>
                  <div className="text-sm text-gray-600">{details.tokens} tokens</div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">💰 Economic Models</h1>
          <p className="text-gray-600 mt-2">Choose the perfect economic structure for your community</p>
        </div>
        {currentModel && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-sm text-green-600">Current Model</div>
            <div className="font-semibold text-green-800">{currentModel.icon} {currentModel.name}</div>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'fixed', label: 'Fixed Buy-In', icon: '🏦' },
          { id: 'subscription', label: 'Subscription', icon: '🔄' },
          { id: 'tiered', label: 'Tiered', icon: '🎯' },
          { id: 'hybrid', label: 'Hybrid', icon: '🔀' },
          { id: 'settings', label: 'Settings', icon: '⚙️' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Model Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {economicModels.map(renderModelCard)}
          </div>

          {/* Revenue Comparison */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">📈 Revenue Projections (1000 Member Club)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(revenueComparison).map(([model, data]: [string, any]) => (
                <div key={model} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3 capitalize">{model} Model</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Members:</span>
                      <span className="font-medium">{data.members.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Revenue:</span>
                      <span className="font-medium">${data.monthlyRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Yearly Revenue:</span>
                      <span className="font-medium">${data.yearlyRevenue.toLocaleString()}</span>
                    </div>
                    {data.totalRaised && (
                      <div className="flex justify-between">
                        <span>Total Raised:</span>
                        <span className="font-medium">${data.totalRaised.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Individual Model Tabs */}
      {activeTab === 'fixed' && (
        <div className="space-y-6">
          {renderPricingDetails(economicModels[0])}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">How Fixed Buy-In Works</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">1</div>
                <div>
                  <h4 className="font-semibold">Member Pays Once</h4>
                  <p className="text-gray-600 text-sm">One-time payment (member-governed price, typically $200-1000)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">2</div>
                <div>
                  <h4 className="font-semibold">Receives Club Tokens</h4>
                  <p className="text-gray-600 text-sm">Gets proportional share of club tokens based on treasury value</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">3</div>
                <div>
                  <h4 className="font-semibold">Lifetime Access</h4>
                  <p className="text-gray-600 text-sm">Full access to vault, governance, and $BUIDL earning forever</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">4</div>
                <div>
                  <h4 className="font-semibold">Can Exit</h4>
                  <p className="text-gray-600 text-sm">Burn tokens for treasury share (with 10% exit penalty)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'subscription' && (
        <div className="space-y-6">
          {renderPricingDetails(economicModels[1])}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">How Subscription Works</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">1</div>
                <div>
                  <h4 className="font-semibold">Monthly/Yearly Payment</h4>
                  <p className="text-gray-600 text-sm">Recurring subscription (member-governed price, typically $25-100/month)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">2</div>
                <div>
                  <h4 className="font-semibold">Earn Tokens Monthly</h4>
                  <p className="text-gray-600 text-sm">Receives club tokens each month while subscribed</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">3</div>
                <div>
                  <h4 className="font-semibold">Loyalty Rewards</h4>
                  <p className="text-gray-600 text-sm">Long-term subscribers get discounts and permanent tokens</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">4</div>
                <div>
                  <h4 className="font-semibold">Cancellation Policy</h4>
                  <p className="text-gray-600 text-sm">Keep 50% of earned tokens, or restore all if return within 30 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tiered' && (
        <div className="space-y-6">
          {renderPricingDetails(economicModels[2])}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">How Tiered System Works</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">1</div>
                <div>
                  <h4 className="font-semibold">Choose Your Tier</h4>
                  <p className="text-gray-600 text-sm">Members select from Free, Builder, Pro, or Elite tiers</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">2</div>
                <div>
                  <h4 className="font-semibold">Tier-Based Access</h4>
                  <p className="text-gray-600 text-sm">Different levels of vault access, voting power, and $BUIDL earning rates</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">3</div>
                <div>
                  <h4 className="font-semibold">Upgrade Anytime</h4>
                  <p className="text-gray-600 text-sm">Members can upgrade or downgrade their tier as needed</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">4</div>
                <div>
                  <h4 className="font-semibold">Clear Progression</h4>
                  <p className="text-gray-600 text-sm">Obvious path from observer to elite member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hybrid Models Tab */}
      {activeTab === 'hybrid' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">🔀 Hybrid Model Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Subscription + Buyout</h4>
                <p className="text-sm text-blue-700 mb-3">Pay monthly or buy lifetime membership</p>
                <div className="space-y-2 text-sm">
                  <div>Monthly: $50/month</div>
                  <div>Buyout: $2000 (40 months worth)</div>
                  <div>Benefit: Flexibility for different commitment levels</div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Tiered + Permanent</h4>
                <p className="text-sm text-green-700 mb-3">Tiered system with lifetime option</p>
                <div className="space-y-2 text-sm">
                  <div>Tiers: Free, $25/mo, $100/mo</div>
                  <div>Lifetime: $3000 at any tier</div>
                  <div>Benefit: Best of both worlds</div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">Progressive Pricing</h4>
                <p className="text-sm text-purple-700 mb-3">Gradual price increase over time</p>
                <div className="space-y-2 text-sm">
                  <div>Month 1-3: $10/month (trial)</div>
                  <div>Month 4-12: $50/month (growth)</div>
                  <div>Year 2+: $100/month (mature)</div>
                  <div>Early members lock in their rate</div>
                </div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Usage-Based</h4>
                <p className="text-sm text-orange-700 mb-3">Pay based on actual usage</p>
                <div className="space-y-2 text-sm">
                  <div>Base: $25/month minimum</div>
                  <div>Usage: $0.10 per API call</div>
                  <div>Storage: $0.01 per GB</div>
                  <div>Fair pricing for actual value</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          {!isAdmin ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🔒</div>
              <div className="text-xl">Admin Access Required</div>
              <div className="text-sm">Only club administrators can change economic models</div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">⚙️ Economic Model Settings</h3>
              
              <div className="space-y-6">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Model Change Requirements</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Requires 10% of members to propose change</li>
                    <li>• 14 days minimum discussion period</li>
                    <li>• 75% approval needed to pass</li>
                    <li>• 30 day transition period</li>
                    <li>• Existing members grandfathered in</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Current Settings</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Model:</span>
                        <span className="font-medium">{currentModel?.name || 'Not Set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Members:</span>
                        <span className="font-medium">247</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Revenue:</span>
                        <span className="font-medium">$8,425</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => setShowModelChange(true)}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Propose Model Change
                      </button>
                      <button className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                        Adjust Current Prices
                      </button>
                      <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors">
                        View Revenue Analytics
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Model Change Modal */}
      {showModelChange && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Propose Economic Model Change</h3>
            
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">📋 Change Process</h4>
                <ol className="text-sm text-blue-700 space-y-1">
                  <li>1. Create proposal with new model details</li>
                  <li>2. Need 10% of members to support proposal</li>
                  <li>3. 14-day discussion period</li>
                  <li>4. Community vote (75% approval required)</li>
                  <li>5. 30-day transition period if approved</li>
                </ol>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Select New Model</label>
                <select className="w-full p-3 border rounded-lg">
                  <option value="">Choose model...</option>
                  <option value="fixed">Fixed Buy-In</option>
                  <option value="subscription">Subscription</option>
                  <option value="tiered">Tiered System</option>
                  <option value="hybrid">Custom Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Proposal Details</label>
                <textarea
                  className="w-full p-3 border rounded-lg h-32"
                  placeholder="Explain why this model change is beneficial for the community..."
                />
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                  Submit Proposal
                </button>
                <button
                  onClick={() => setShowModelChange(false)}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EconomicModels;

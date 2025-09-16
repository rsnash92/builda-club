'use client';

import { useState } from 'react';

interface MemberTokens {
  purchased: number;
  earned: number;
  total: number;
}

interface ClubMetrics {
  treasury: number;
  totalTokens: number;
  tokenValue: number;
  memberCount: number;
}

interface OwnershipDashboardProps {
  memberAddress: string;
  clubId: string;
  memberTokens: MemberTokens;
  clubMetrics: ClubMetrics;
}

const OwnershipDashboard: React.FC<OwnershipDashboardProps> = ({
  memberAddress,
  clubId,
  memberTokens,
  clubMetrics
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'earn' | 'buy' | 'exit'>('overview');

  // Calculate member's ownership metrics
  const ownershipPercentage = (memberTokens.total / clubMetrics.totalTokens) * 100;
  const memberShareValue = memberTokens.total * clubMetrics.tokenValue;
  const totalInvested = memberTokens.purchased; // Assuming 1:1 purchase rate
  const currentGain = memberShareValue - totalInvested;
  const gainPercentage = totalInvested > 0 ? (currentGain / totalInvested) * 100 : 0;
  
  // Exit calculations
  const exitValue = memberShareValue * 0.9; // 10% exit fee
  const exitGain = exitValue - totalInvested;

  // Earning opportunities
  const earningActivities = [
    { activity: 'Ship a feature', tokens: 50, description: 'Complete a development milestone' },
    { activity: 'Write documentation', tokens: 20, description: 'Create helpful guides or tutorials' },
    { activity: 'Onboard new member', tokens: 30, description: 'Help someone join successfully' },
    { activity: 'Weekly active streak', tokens: 10, description: 'Stay engaged for 7 days' },
    { activity: 'Code review', tokens: 15, description: 'Review and approve PRs' },
    { activity: 'Bug fix', tokens: 25, description: 'Fix critical issues' }
  ];

  const TokenCard = ({ label, amount, value, icon, highlight = false }: {
    label: string;
    amount: number;
    value: string;
    icon: string;
    highlight?: boolean;
  }) => (
    <div className={`p-4 rounded-lg border-2 ${highlight ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <div>
          <div className="font-medium">{label}</div>
          <div className="text-2xl font-bold">{amount.toLocaleString()}</div>
        </div>
      </div>
      <div className="text-sm text-gray-600">{value}</div>
    </div>
  );

  const ProgressBar = ({ percent, label }: { percent: number; label: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-gray-600">{percent.toFixed(2)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
    </div>
  );

  const Metric = ({ label, value, change, subtext }: {
    label: string;
    value: string;
    change?: string;
    subtext?: string;
  }) => (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-xl font-bold">{value}</div>
      {change && (
        <div className={`text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </div>
      )}
      {subtext && <div className="text-xs text-gray-500 mt-1">{subtext}</div>}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">💎 Your Club Ownership</h1>
          <p className="text-gray-600 mt-2">Track your tokens, earnings, and share of the treasury</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Current Token Value</div>
          <div className="text-2xl font-bold text-green-600">${clubMetrics.tokenValue.toFixed(2)}</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'earn', label: 'Earn Tokens', icon: '🔨' },
          { id: 'buy', label: 'Buy More', icon: '💰' },
          { id: 'exit', label: 'Exit Options', icon: '🚪' }
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
          {/* Token Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">🎯 Your Token Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TokenCard
                label="Purchased"
                amount={memberTokens.purchased}
                value={`$${(memberTokens.purchased * clubMetrics.tokenValue).toLocaleString()}`}
                icon="💰"
              />
              <TokenCard
                label="Earned"
                amount={memberTokens.earned}
                value={`$${(memberTokens.earned * clubMetrics.tokenValue).toLocaleString()}`}
                icon="🔨"
              />
              <TokenCard
                label="Total"
                amount={memberTokens.total}
                value={`$${memberShareValue.toLocaleString()}`}
                icon="💎"
                highlight={true}
              />
            </div>
          </div>

          {/* Ownership Percentage */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">📈 Your Ownership</h3>
            <ProgressBar 
              percent={ownershipPercentage} 
              label={`You own ${ownershipPercentage.toFixed(2)}% of ${clubId}`}
            />
            <div className="mt-4 text-sm text-gray-600">
              {memberTokens.total.toLocaleString()} tokens out of {clubMetrics.totalTokens.toLocaleString()} total
            </div>
          </div>

          {/* Value Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Metric
              label="Your Share of Treasury"
              value={`$${memberShareValue.toLocaleString()}`}
              change={currentGain > 0 ? `+$${currentGain.toLocaleString()}` : undefined}
            />
            <Metric
              label="Total Invested"
              value={`$${totalInvested.toLocaleString()}`}
              subtext="Capital contribution"
            />
            <Metric
              label="Current Gain/Loss"
              value={`$${currentGain.toLocaleString()}`}
              change={`${gainPercentage.toFixed(1)}%`}
            />
          </div>

          {/* Club Overview */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">🏦 Club Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">${clubMetrics.treasury.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Treasury</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{clubMetrics.totalTokens.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Tokens</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{clubMetrics.memberCount}</div>
                <div className="text-sm text-gray-600">Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">${clubMetrics.tokenValue.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Token Value</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Earn Tokens Tab */}
      {activeTab === 'earn' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">🔨 Earn Tokens Through Building</h2>
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">📋 Earning Rules</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Max 100 tokens per day</li>
                <li>• Max 2,000 tokens per month</li>
                <li>• Work tokens capped at 20% of total capital tokens</li>
                <li>• Requires 3 member approvals for verification</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {earningActivities.map((activity, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{activity.activity}</h4>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                      +{activity.tokens} tokens
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                    Submit for Approval
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">📊 Your Earning Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{memberTokens.earned}</div>
                <div className="text-sm text-gray-600">Tokens Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">45</div>
                <div className="text-sm text-gray-600">Activities Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">18.0%</div>
                <div className="text-sm text-gray-600">Of Total Portfolio</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buy More Tab */}
      {activeTab === 'buy' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">💰 Buy More Tokens</h2>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
              <h3 className="font-semibold text-green-800 mb-2">💎 Fixed Pricing</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">1 USDC = 1 Token</div>
              <p className="text-green-700">Always the same rate - fair for everyone!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Purchase Amount</h3>
                <div className="space-y-3">
                  <button className="w-full bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-left transition-colors">
                    <div className="font-semibold">$100</div>
                    <div className="text-sm text-gray-600">100 tokens</div>
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-left transition-colors">
                    <div className="font-semibold">$500</div>
                    <div className="text-sm text-gray-600">500 tokens</div>
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-left transition-colors">
                    <div className="font-semibold">$1,000</div>
                    <div className="text-sm text-gray-600">1,000 tokens</div>
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-left transition-colors">
                    <div className="font-semibold">Custom Amount</div>
                    <div className="text-sm text-gray-600">Enter your own amount</div>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Payment Methods</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-100 hover:bg-blue-200 p-4 rounded-lg text-left transition-colors">
                    <div className="font-semibold">USDC (Recommended)</div>
                    <div className="text-sm text-gray-600">Direct 1:1 conversion</div>
                  </button>
                  <button className="w-full bg-green-100 hover:bg-green-200 p-4 rounded-lg text-left transition-colors">
                    <div className="font-semibold">Credit Card</div>
                    <div className="text-sm text-gray-600">Via Stripe integration</div>
                  </button>
                  <button className="w-full bg-purple-100 hover:bg-purple-200 p-4 rounded-lg text-left transition-colors">
                    <div className="font-semibold">Bank Transfer</div>
                    <div className="text-sm text-gray-600">Direct bank payment</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors text-lg font-semibold">
                Buy Tokens Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Options Tab */}
      {activeTab === 'exit' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">🚪 Exit Options</h2>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Exit Fee</h3>
              <p className="text-yellow-700 text-sm">There's a 10% exit fee to discourage quick exits and protect the treasury.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2">Exit Now</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Your tokens:</span>
                    <span className="font-medium">{memberTokens.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current value:</span>
                    <span className="font-medium">${memberShareValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Exit fee (10%):</span>
                    <span className="font-medium">-${(memberShareValue * 0.1).toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>You receive:</span>
                    <span className="text-red-600">${exitValue.toLocaleString()}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
                  Exit Now
                </button>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Wait and Grow</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Current value:</span>
                    <span className="font-medium">${memberShareValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Projected 1 year:</span>
                    <span className="font-medium">${(memberShareValue * 1.5).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Projected 2 years:</span>
                    <span className="font-medium">${(memberShareValue * 2.2).toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-blue-700">
                  Treasury grows through member activities, investments, and building.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">📊 Exit Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Metric
                label="If You Exit Now"
                value={`$${exitValue.toLocaleString()}`}
                change={exitGain > 0 ? `+$${exitGain.toLocaleString()}` : undefined}
                subtext="After 10% exit fee"
              />
              <Metric
                label="Total Invested"
                value={`$${totalInvested.toLocaleString()}`}
                subtext="Your capital contribution"
              />
              <Metric
                label="Return on Investment"
                value={`${gainPercentage.toFixed(1)}%`}
                change={gainPercentage > 0 ? 'Profit' : 'Loss'}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnershipDashboard;

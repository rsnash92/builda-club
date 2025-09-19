'use client';

import { useState } from 'react';

interface ClubMember {
  address: string;
  tier: 'OBSERVER' | 'BUILDER' | 'PRO' | 'ELITE';
  joinDate: string;
  paymentStatus: 'ACTIVE' | 'EXPIRED' | 'GRANDFATHERED';
  totalPaid: number;
  lastPayment: string;
}

interface ClubEconomicsDashboardProps {
  clubId: string;
  memberAddress: string;
  isAdmin: boolean;
  currentModel: 'FIXED' | 'SUBSCRIPTION' | 'TIERED';
}

const ClubEconomicsDashboard: React.FC<ClubEconomicsDashboardProps> = ({
  clubId,
  memberAddress,
  isAdmin,
  currentModel
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'revenue' | 'settings' | 'proposals'>('overview');

  // Mock data - would come from database
  const clubStats = {
    totalMembers: 247,
    activeMembers: 234,
    monthlyRevenue: 8425,
    yearlyRevenue: 101100,
    treasury: 67400,
    averageLTV: 850
  };

  const memberDistribution = {
    OBSERVER: 127,
    BUILDER: 89,
    PRO: 34,
    ELITE: 8
  };

  const revenueHistory = [
    { month: 'Jan 2024', revenue: 7200, members: 198 },
    { month: 'Feb 2024', revenue: 7800, members: 215 },
    { month: 'Mar 2024', revenue: 8100, members: 228 },
    { month: 'Apr 2024', revenue: 8425, members: 247 }
  ];

  const recentMembers: ClubMember[] = [
    {
      address: '0x1234...5678',
      tier: 'PRO',
      joinDate: '2024-04-15',
      paymentStatus: 'ACTIVE',
      totalPaid: 400,
      lastPayment: '2024-04-15'
    },
    {
      address: '0x9876...5432',
      tier: 'BUILDER',
      joinDate: '2024-04-14',
      paymentStatus: 'ACTIVE',
      totalPaid: 125,
      lastPayment: '2024-04-14'
    },
    {
      address: '0x4567...8901',
      tier: 'ELITE',
      joinDate: '2024-04-13',
      paymentStatus: 'ACTIVE',
      totalPaid: 2000,
      lastPayment: '2024-04-13'
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'OBSERVER': return 'text-gray-400 bg-[#202128]';
      case 'BUILDER': return 'text-green-400 bg-green-500/20';
      case 'PRO': return 'text-blue-400 bg-blue-500/20';
      case 'ELITE': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-[#202128]';
    }
  };

  const getModelIcon = (model: string) => {
    switch (model) {
      case 'FIXED': return '🏦';
      case 'SUBSCRIPTION': return '🔄';
      case 'TIERED': return '🎯';
      default: return '💰';
    }
  };

  const getModelName = (model: string) => {
    switch (model) {
      case 'FIXED': return 'Fixed Buy-In';
      case 'SUBSCRIPTION': return 'Recurring Subscription';
      case 'TIERED': return 'Tiered System';
      default: return 'Unknown Model';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">💰 Club Economics</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl">{getModelIcon(currentModel)}</span>
            <span className="text-gray-600">{getModelName(currentModel)}</span>
          </div>
        </div>
        {isAdmin && (
          <button
            onClick={() => setActiveTab('proposals')}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
          >
            💡 Propose Changes
          </button>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-[#202128] p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'members', label: 'Members', icon: '👥' },
          { id: 'revenue', label: 'Revenue', icon: '💰' },
          { id: 'settings', label: 'Settings', icon: '⚙️' },
          { id: 'proposals', label: 'Proposals', icon: '🗳️' }
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
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
              <div className="text-sm opacity-90">Total Members</div>
              <div className="text-3xl font-bold">{clubStats.totalMembers}</div>
              <div className="text-sm opacity-75 mt-1">+{clubStats.totalMembers - clubStats.activeMembers} inactive</div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
              <div className="text-sm opacity-90">Monthly Revenue</div>
              <div className="text-3xl font-bold">${clubStats.monthlyRevenue.toLocaleString()}</div>
              <div className="text-sm opacity-75 mt-1">+12% from last month</div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
              <div className="text-sm opacity-90">Treasury</div>
              <div className="text-3xl font-bold">${clubStats.treasury.toLocaleString()}</div>
              <div className="text-sm opacity-75 mt-1">+${clubStats.monthlyRevenue} this month</div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
              <div className="text-sm opacity-90">Avg LTV</div>
              <div className="text-3xl font-bold">${clubStats.averageLTV}</div>
              <div className="text-sm opacity-75 mt-1">Lifetime value</div>
            </div>
          </div>

          {/* Member Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">👥 Member Distribution</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(memberDistribution).map(([tier, count]) => (
                <div key={tier} className="text-center">
                  <div className={`text-2xl font-bold px-3 py-1 rounded-full inline-block ${getTierColor(tier)}`}>
                    {count}
                  </div>
                  <div className="text-sm text-gray-600 mt-1 capitalize">{tier.toLowerCase()}</div>
                  <div className="text-xs text-gray-500">
                    {Math.round((count / clubStats.totalMembers) * 100)}% of total
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Trend */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">📈 Revenue Trend</h3>
            <div className="space-y-3">
              {revenueHistory.map((period, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-[#202128] rounded-lg">
                  <div>
                    <div className="font-medium">{period.month}</div>
                    <div className="text-sm text-gray-600">{period.members} members</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${period.revenue.toLocaleString()}</div>
                    <div className="text-sm text-green-600">
                      {index > 0 ? `+${Math.round(((period.revenue - revenueHistory[index - 1].revenue) / revenueHistory[index - 1].revenue) * 100)}%` : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Members Tab */}
      {activeTab === 'members' && (
        <div className="space-y-6">
          {/* Member Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold mb-3">Active Members</h3>
              <div className="text-3xl font-bold text-green-600">{clubStats.activeMembers}</div>
              <div className="text-sm text-gray-600">94.7% retention rate</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold mb-3">New This Month</h3>
              <div className="text-3xl font-bold text-blue-600">19</div>
              <div className="text-sm text-gray-600">+8.3% growth</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold mb-3">Churned This Month</h3>
              <div className="text-3xl font-bold text-red-600">5</div>
              <div className="text-sm text-gray-600">2.1% churn rate</div>
            </div>
          </div>

          {/* Recent Members */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold">Recent Members</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#202128]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Paid</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentMembers.map((member, index) => (
                    <tr key={index} className="hover:bg-[#202128]/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {member.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTierColor(member.tier)}`}>
                          {member.tier}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          member.paymentStatus === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                          member.paymentStatus === 'EXPIRED' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {member.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${member.totalPaid}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(member.joinDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Revenue Tab */}
      {activeTab === 'revenue' && (
        <div className="space-y-6">
          {/* Revenue Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">💰 Revenue Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">This Month</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Recurring Subscriptions</span>
                    <span className="font-semibold">${(clubStats.monthlyRevenue * 0.8).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Members</span>
                    <span className="font-semibold">${(clubStats.monthlyRevenue * 0.15).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Upgrades</span>
                    <span className="font-semibold">${(clubStats.monthlyRevenue * 0.05).toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span>${clubStats.monthlyRevenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">This Year</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Revenue</span>
                    <span className="font-semibold">${clubStats.yearlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Monthly</span>
                    <span className="font-semibold">${Math.round(clubStats.yearlyRevenue / 12).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth Rate</span>
                    <span className="font-semibold text-green-600">+12%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Projections */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">📊 Revenue Projections</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">$10,500</div>
                <div className="text-sm text-gray-600">Next Month</div>
                <div className="text-xs text-green-600">+25% growth</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">$125,000</div>
                <div className="text-sm text-gray-600">This Year</div>
                <div className="text-xs text-green-600">+24% growth</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">$180,000</div>
                <div className="text-sm text-gray-600">Next Year</div>
                <div className="text-xs text-green-600">+44% growth</div>
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
              <div className="text-sm">Only club administrators can modify economic settings</div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Current Model Settings */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">⚙️ Current Model Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Model Configuration</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Current Model:</span>
                        <span className="font-medium">{getModelName(currentModel)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Members:</span>
                        <span className="font-medium">{clubStats.totalMembers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Revenue:</span>
                        <span className="font-medium">${clubStats.monthlyRevenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                        Adjust Pricing
                      </button>
                      <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                        Export Member Data
                      </button>
                      <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors">
                        View Analytics
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Model Change Information */}
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Model Change Process</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Requires 10% of members to propose change</li>
                  <li>• 14 days minimum discussion period</li>
                  <li>• 75% approval needed to pass</li>
                  <li>• 30 day transition period</li>
                  <li>• Existing members grandfathered in</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Proposals Tab */}
      {activeTab === 'proposals' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">🗳️ Economic Model Proposals</h3>
            
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">📝</div>
              <div className="text-xl">No Active Proposals</div>
              <div className="text-sm">Create a proposal to change the economic model</div>
            </div>

            {isAdmin && (
              <div className="mt-6 text-center">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                  Create New Proposal
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubEconomicsDashboard;

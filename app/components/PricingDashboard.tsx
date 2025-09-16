'use client';

import { useState } from 'react';

interface PricingDashboardProps {
  clubId: string;
}

interface PricingMetrics {
  currentPrice: number;
  lastVote: string;
  nextVoteAvailable: boolean;
  applicationsPerWeek: number;
  conversionRate: number;
  memberSatisfaction: number;
  treasuryGrowthRate: number;
  memberSentiment: {
    tooHigh: number;
    justRight: number;
    tooLow: number;
  };
}

const PricingDashboard: React.FC<PricingDashboardProps> = ({ clubId }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'history'>('overview');

  // Mock data - would come from database
  const metrics: PricingMetrics = {
    currentPrice: 500,
    lastVote: "30 days ago (kept same)",
    nextVoteAvailable: true,
    applicationsPerWeek: 23,
    conversionRate: 47,
    memberSatisfaction: 8.7,
    treasuryGrowthRate: 12000,
    memberSentiment: {
      tooHigh: 12,
      justRight: 47,
      tooLow: 8
    }
  };

  const totalMembers = metrics.memberSentiment.tooHigh + metrics.memberSentiment.justRight + metrics.memberSentiment.tooLow;

  const pricingHistory = [
    { date: '2024-01-15', price: 400, vote: 'INCREASE_PRICE', result: 'PASSED', participation: '73%' },
    { date: '2023-12-01', price: 400, vote: 'KEEP_SAME', result: 'PASSED', participation: '65%' },
    { date: '2023-10-15', price: 400, vote: 'DECREASE_PRICE', result: 'FAILED', participation: '58%' },
    { date: '2023-09-01', price: 500, vote: 'INCREASE_PRICE', result: 'PASSED', participation: '81%' }
  ];

  const getSentimentColor = (type: keyof typeof metrics.memberSentiment) => {
    switch (type) {
      case 'tooHigh': return 'text-red-600';
      case 'justRight': return 'text-green-600';
      case 'tooLow': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">💰 Fair Pricing Dashboard</h1>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'metrics', label: 'Key Metrics', icon: '📈' },
          { id: 'history', label: 'Vote History', icon: '📜' }
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
          {/* Current State Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
              <div className="text-sm opacity-90">Current Price</div>
              <div className="text-3xl font-bold">${metrics.currentPrice}</div>
              <div className="text-sm opacity-75 mt-1">Member-governed</div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
              <div className="text-sm opacity-90">Last Vote</div>
              <div className="text-lg font-semibold">{metrics.lastVote}</div>
              <div className="text-sm opacity-75 mt-1">Community decision</div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
              <div className="text-sm opacity-90">Next Vote</div>
              <div className="text-lg font-semibold">
                {metrics.nextVoteAvailable ? 'Available now' : 'In 15 days'}
              </div>
              <div className="text-sm opacity-75 mt-1">Democratic process</div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
              <div className="text-sm opacity-90">Member Satisfaction</div>
              <div className="text-3xl font-bold">{metrics.memberSatisfaction}/10</div>
              <div className="text-sm opacity-75 mt-1">Community health</div>
            </div>
          </div>

          {/* Member Sentiment */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">🗣️ Member Sentiment</h3>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(metrics.memberSentiment).map(([type, count]) => (
                <div key={type} className="text-center">
                  <div className={`text-2xl font-bold ${getSentimentColor(type as any)}`}>
                    {count}
                  </div>
                  <div className="text-sm text-gray-600 capitalize">
                    {type.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round((count / totalMembers) * 100)}% of members
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">⚡ Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                💡 Propose Price Change
              </button>
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
                📊 View Detailed Analytics
              </button>
              <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors">
                🗳️ Cast Vote
              </button>
              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
                📋 View Proposals
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Tab */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Growth Metrics */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">📈 Growth Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Applications per week</span>
                  <span className="font-semibold">{metrics.applicationsPerWeek}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Conversion rate</span>
                  <span className="font-semibold text-green-600">{metrics.conversionRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Treasury growth rate</span>
                  <span className="font-semibold text-green-600">+${metrics.treasuryGrowthRate.toLocaleString()}/month</span>
                </div>
              </div>
            </div>

            {/* Quality Metrics */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">⭐ Quality Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Member satisfaction</span>
                  <span className="font-semibold text-green-600">{metrics.memberSatisfaction}/10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Retention rate</span>
                  <span className="font-semibold text-green-600">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Active builders</span>
                  <span className="font-semibold">89%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Analysis */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">💰 Pricing Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">$2,847</div>
                <div className="text-sm text-gray-600">Treasury per member</div>
                <div className="text-xs text-gray-500 mt-1">Current value per member</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">$534</div>
                <div className="text-sm text-gray-600">Suggested entry price</div>
                <div className="text-xs text-gray-500 mt-1">Based on treasury/member ratio</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">1,234</div>
                <div className="text-sm text-gray-600">Avg monthly $BUIDL</div>
                <div className="text-xs text-gray-500 mt-1">Member earnings</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold">📜 Voting History</h3>
            <p className="text-gray-600 text-sm mt-1">Track all pricing decisions made by the community</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proposal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participation</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pricingHistory.map((vote, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(vote.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${vote.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        vote.vote === 'INCREASE_PRICE' ? 'bg-green-100 text-green-800' :
                        vote.vote === 'DECREASE_PRICE' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {vote.vote.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        vote.result === 'PASSED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {vote.result}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vote.participation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingDashboard;

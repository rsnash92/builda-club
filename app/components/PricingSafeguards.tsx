'use client';

import { useState } from 'react';

interface SafeguardRule {
  id: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'TRIGGERED' | 'DISABLED';
  lastChecked: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
}

interface PricingSafeguardsProps {
  clubId: string;
  memberAddress: string;
  isAdmin: boolean;
}

const PricingSafeguards: React.FC<PricingSafeguardsProps> = ({
  clubId,
  memberAddress,
  isAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'rules' | 'history' | 'settings'>('overview');
  const [showSettings, setShowSettings] = useState(false);

  // Mock safeguard rules
  const safeguards: SafeguardRule[] = [
    {
      id: '1',
      name: 'Anti-Whale Protection',
      description: 'No member can own more than 5% of club tokens to prevent price manipulation',
      status: 'ACTIVE',
      lastChecked: '2024-02-01T10:00:00Z',
      impact: 'HIGH'
    },
    {
      id: '2',
      name: 'Price Increase Limit',
      description: 'Maximum 2x price increase per quarter to prevent rapid inflation',
      status: 'ACTIVE',
      lastChecked: '2024-02-01T10:00:00Z',
      impact: 'HIGH'
    },
    {
      id: '3',
      name: 'Price Decrease Limit',
      description: 'Maximum 50% price decrease per quarter to prevent rapid deflation',
      status: 'ACTIVE',
      lastChecked: '2024-02-01T10:00:00Z',
      impact: 'HIGH'
    },
    {
      id: '4',
      name: 'Minimum Price Floor',
      description: 'Platform minimum price of $10 to maintain economic viability',
      status: 'ACTIVE',
      lastChecked: '2024-02-01T10:00:00Z',
      impact: 'MEDIUM'
    },
    {
      id: '5',
      name: 'Voting Cooldown',
      description: '30-day cooldown between price votes to prevent spam and allow reflection',
      status: 'ACTIVE',
      lastChecked: '2024-02-01T10:00:00Z',
      impact: 'MEDIUM'
    },
    {
      id: '6',
      name: 'Circuit Breaker',
      description: 'Auto-trigger price reduction vote if 20% of members leave in 30 days',
      status: 'ACTIVE',
      lastChecked: '2024-02-01T10:00:00Z',
      impact: 'HIGH'
    },
    {
      id: '7',
      name: 'Observer Transparency',
      description: 'Non-members can view price discussions before joining',
      status: 'ACTIVE',
      lastChecked: '2024-02-01T10:00:00Z',
      impact: 'LOW'
    },
    {
      id: '8',
      name: 'Growth Bonus',
      description: 'Price setters get bonus $BUIDL if membership grows 50% after price change',
      status: 'ACTIVE',
      lastChecked: '2024-02-01T10:00:00Z',
      impact: 'MEDIUM'
    }
  ];

  const safeguardHistory = [
    {
      id: '1',
      rule: 'Anti-Whale Protection',
      trigger: 'Member 0x1234...5678 attempted to buy 6% of tokens',
      action: 'Transaction blocked, limited to 5% maximum',
      timestamp: '2024-01-28T14:30:00Z',
      severity: 'HIGH'
    },
    {
      id: '2',
      rule: 'Price Increase Limit',
      trigger: 'Proposal to increase price by 3x in one quarter',
      action: 'Proposal automatically rejected',
      timestamp: '2024-01-20T09:15:00Z',
      severity: 'HIGH'
    },
    {
      id: '3',
      rule: 'Circuit Breaker',
      trigger: '25% of members left in 25 days',
      action: 'Auto-triggered price reduction vote',
      timestamp: '2024-01-15T16:45:00Z',
      severity: 'HIGH'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'HIGH': return 'text-red-600 bg-red-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
      case 'LOW': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-green-600 bg-green-100';
      case 'TRIGGERED': return 'text-red-600 bg-red-100';
      case 'DISABLED': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'HIGH': return 'text-red-600 bg-red-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
      case 'LOW': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">🛡️ Pricing Safeguards</h1>
        {isAdmin && (
          <button
            onClick={() => setShowSettings(true)}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
          >
            ⚙️ Configure Safeguards
          </button>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'rules', label: 'Active Rules', icon: '🛡️' },
          { id: 'history', label: 'Trigger History', icon: '📜' },
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
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
              <div className="text-sm opacity-90">Active Safeguards</div>
              <div className="text-3xl font-bold">{safeguards.filter(s => s.status === 'ACTIVE').length}</div>
              <div className="text-sm opacity-75 mt-1">Protecting community</div>
            </div>
            
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg">
              <div className="text-sm opacity-90">Triggers This Month</div>
              <div className="text-3xl font-bold">{safeguardHistory.length}</div>
              <div className="text-sm opacity-75 mt-1">Prevented issues</div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
              <div className="text-sm opacity-90">High Impact Rules</div>
              <div className="text-3xl font-bold">{safeguards.filter(s => s.impact === 'HIGH').length}</div>
              <div className="text-sm opacity-75 mt-1">Critical protection</div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
              <div className="text-sm opacity-90">Last Check</div>
              <div className="text-lg font-semibold">2 hours ago</div>
              <div className="text-sm opacity-75 mt-1">System monitoring</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">🔔 Recent Activity</h3>
            <div className="space-y-4">
              {safeguardHistory.slice(0, 3).map((event) => (
                <div key={event.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                    {event.severity}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{event.rule}</div>
                    <div className="text-sm text-gray-600">{event.trigger}</div>
                    <div className="text-sm text-green-600">{event.action}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(event.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Protection Summary */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">🛡️ Protection Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Anti-Manipulation</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    Whale protection (5% max ownership)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    Price change limits (2x max increase)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    Voting cooldown (30 days)
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Community Protection</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    Minimum price floor ($10)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    Circuit breaker (20% exit trigger)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    Transparency (observer access)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rules Tab */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          {safeguards.map((safeguard) => (
            <div key={safeguard.id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🛡️</span>
                  <div>
                    <h3 className="text-xl font-semibold">{safeguard.name}</h3>
                    <p className="text-gray-600">{safeguard.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(safeguard.status)}`}>
                    {safeguard.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getImpactColor(safeguard.impact)}`}>
                    {safeguard.impact}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Last checked: {new Date(safeguard.lastChecked).toLocaleString()}</span>
                {isAdmin && (
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">Configure</button>
                    <button className="text-red-600 hover:text-red-800">Disable</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold">📜 Trigger History</h3>
            <p className="text-gray-600 text-sm mt-1">All safeguard activations and interventions</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trigger</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {safeguardHistory.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {event.rule}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {event.trigger}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {event.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(event.severity)}`}>
                        {event.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(event.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-6">⚙️ Safeguard Settings</h3>
          
          {!isAdmin ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🔒</div>
              <div className="text-xl">Admin Access Required</div>
              <div className="text-sm">Only club administrators can modify safeguard settings</div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-800">
                  <span className="text-xl">⚠️</span>
                  <span className="font-semibold">Warning</span>
                </div>
                <p className="text-yellow-700 text-sm mt-1">
                  Modifying safeguard settings can have serious implications for community protection. 
                  Changes should be made carefully and with community input.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Price Limits</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Max Increase per Quarter</label>
                      <input
                        type="number"
                        defaultValue="2"
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Max Decrease per Quarter</label>
                      <input
                        type="number"
                        defaultValue="0.5"
                        step="0.1"
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Minimum Price Floor</label>
                      <input
                        type="number"
                        defaultValue="10"
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Voting Rules</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Voting Cooldown (days)</label>
                      <input
                        type="number"
                        defaultValue="30"
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Quorum Required (%)</label>
                      <input
                        type="number"
                        defaultValue="51"
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Pass Threshold (%)</label>
                      <input
                        type="number"
                        defaultValue="66"
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                  Save Settings
                </button>
                <button className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors">
                  Reset to Defaults
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PricingSafeguards;

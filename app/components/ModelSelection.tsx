'use client';

import { useState } from 'react';

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

interface ModelSelectionProps {
  onModelSelect: (model: ModelOption) => void;
  currentStep?: number;
  totalSteps?: number;
}

const ModelSelection: React.FC<ModelSelectionProps> = ({
  onModelSelect,
  currentStep = 2,
  totalSteps = 5
}) => {
  const [selectedModel, setSelectedModel] = useState<ModelOption | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const modelOptions: ModelOption[] = [
    {
      id: 'fixed',
      name: 'Fixed Buy-In',
      type: 'FIXED',
      description: 'One-time payment, lifetime membership',
      icon: '🏦',
      bestFor: ['Investment clubs', 'Serious builder DAOs', 'Long-term projects'],
      examples: ['YC Alumni DAO', 'Solana Builders Club'],
      recommended: false
    },
    {
      id: 'subscription',
      name: 'Recurring Subscription',
      type: 'SUBSCRIPTION',
      description: 'Monthly/yearly recurring payment',
      icon: '🔄',
      bestFor: ['Learning communities', 'Trading/signals groups', 'Service-based clubs'],
      examples: ['AI Trading Signals', 'Web3 Academy'],
      recommended: true
    },
    {
      id: 'tiered',
      name: 'Tiered System',
      type: 'TIERED',
      description: 'Multiple membership levels from free to premium',
      icon: '🎯',
      bestFor: ['Diverse communities', 'Growth-focused clubs', 'Content creators'],
      examples: ['Creative Collective', 'Global Dev Community'],
      recommended: false
    }
  ];

  const handleModelSelect = (model: ModelOption) => {
    setSelectedModel(model);
    setShowDetails(true);
  };

  const handleConfirm = () => {
    if (selectedModel) {
      onModelSelect(selectedModel);
    }
  };

  const renderModelCard = (model: ModelOption) => (
    <div
      key={model.id}
      className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${
        selectedModel?.id === model.id
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
      onClick={() => handleModelSelect(model)}
    >
      {model.recommended && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
          Recommended
        </div>
      )}
      
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl">{model.icon}</span>
        <div>
          <h3 className="text-xl font-semibold">{model.name}</h3>
          <p className="text-gray-600">{model.description}</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2 text-sm">Best For:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          {model.bestFor.map((use, index) => (
            <li key={index}>• {use}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-medium mb-2 text-sm">Examples:</h4>
        <div className="flex flex-wrap gap-2">
          {model.examples.map((example, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              {example}
            </span>
          ))}
        </div>
      </div>

      {selectedModel?.id === model.id && (
        <div className="mt-4 pt-4 border-t border-blue-200">
          <div className="flex items-center gap-2 text-blue-600">
            <span className="text-xl">✓</span>
            <span className="font-medium">Selected</span>
          </div>
        </div>
      )}
    </div>
  );

  const renderModelDetails = () => {
    if (!selectedModel) return null;

    const getPricingExample = (model: ModelOption) => {
      switch (model.type) {
        case 'FIXED':
          return {
            price: '$500',
            description: 'One-time payment',
            features: ['Lifetime access', 'Full voting rights', 'All vault access', 'Unlimited $BUIDL earning']
          };
        case 'SUBSCRIPTION':
          return {
            price: '$50/month',
            description: 'Recurring subscription',
            features: ['Monthly access', 'Progressive discounts', 'Loyalty rewards', 'Cancel anytime']
          };
        case 'TIERED':
          return {
            price: 'Free to $500/month',
            description: 'Multiple tiers available',
            features: ['Observer (Free)', 'Builder ($25)', 'Pro ($100)', 'Elite ($500)']
          };
        default:
          return null;
      }
    };

    const pricing = getPricingExample(selectedModel);

    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{selectedModel.icon}</span>
          <div>
            <h3 className="text-xl font-semibold">{selectedModel.name}</h3>
            <p className="text-gray-600">{selectedModel.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Pricing Structure</h4>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{pricing?.price}</div>
              <div className="text-sm text-blue-700">{pricing?.description}</div>
            </div>
            
            <div className="mt-4">
              <h5 className="font-medium mb-2">Key Features:</h5>
              <ul className="space-y-1">
                {pricing?.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Revenue Potential</h4>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">100 Member Club</div>
                <div className="font-semibold">
                  {selectedModel.type === 'FIXED' && '$50,000 one-time'}
                  {selectedModel.type === 'SUBSCRIPTION' && '$5,000/month'}
                  {selectedModel.type === 'TIERED' && '$6,000/month'}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">1000 Member Club</div>
                <div className="font-semibold">
                  {selectedModel.type === 'FIXED' && '$500,000 one-time'}
                  {selectedModel.type === 'SUBSCRIPTION' && '$50,000/month'}
                  {selectedModel.type === 'TIERED' && '$60,000/month'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Select This Model
          </button>
          <button
            onClick={() => setShowDetails(false)}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back to Selection
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm text-gray-500">Economic Model</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Choose Your Economic Model</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the economic structure that best fits your community's goals and values. 
          You can always change this later through community governance.
        </p>
      </div>

      {!showDetails ? (
        <div className="space-y-6">
          {/* Model Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {modelOptions.map(renderModelCard)}
          </div>

          {/* Help Section */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">🤔 Not Sure Which to Choose?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-blue-800 mb-1">Choose Fixed Buy-In if:</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• You want committed, long-term members</li>
                  <li>• Building something serious (investment, VC)</li>
                  <li>• Prefer simple, one-time economics</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-1">Choose Subscription if:</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• Providing ongoing services or content</li>
                  <li>• Want predictable monthly revenue</li>
                  <li>• Building learning or trading community</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-1">Choose Tiered if:</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• Want to be accessible to everyone</li>
                  <li>• Building diverse, large community</li>
                  <li>• Need clear progression path</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold">Model Comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Feature</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fixed Buy-In</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscription</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium">Upfront Revenue</td>
                    <td className="px-6 py-4 text-sm text-green-600">High</td>
                    <td className="px-6 py-4 text-sm text-yellow-600">Medium</td>
                    <td className="px-6 py-4 text-sm text-red-600">Low</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium">Member Commitment</td>
                    <td className="px-6 py-4 text-sm text-green-600">High</td>
                    <td className="px-6 py-4 text-sm text-yellow-600">Medium</td>
                    <td className="px-6 py-4 text-sm text-red-600">Variable</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium">Growth Potential</td>
                    <td className="px-6 py-4 text-sm text-yellow-600">Medium</td>
                    <td className="px-6 py-4 text-sm text-green-600">High</td>
                    <td className="px-6 py-4 text-sm text-green-600">High</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium">Management Complexity</td>
                    <td className="px-6 py-4 text-sm text-green-600">Low</td>
                    <td className="px-6 py-4 text-sm text-yellow-600">Medium</td>
                    <td className="px-6 py-4 text-sm text-red-600">High</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium">Accessibility</td>
                    <td className="px-6 py-4 text-sm text-red-600">Low</td>
                    <td className="px-6 py-4 text-sm text-yellow-600">Medium</td>
                    <td className="px-6 py-4 text-sm text-green-600">High</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        renderModelDetails()
      )}
    </div>
  );
};

export default ModelSelection;

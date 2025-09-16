'use client';

import EconomicModels from '../components/EconomicModels';

export default function EconomicsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EconomicModels 
        clubId="demo"
        currentModel={undefined}
        isAdmin={true}
        memberAddress="0x1234...5678"
      />
    </div>
  );
}

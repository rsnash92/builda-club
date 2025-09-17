'use client';

import EconomicModels from '../components/EconomicModels';
import { AppLayout } from '../components/AppLayout';

export default function EconomicsPage() {
  return (
    <AppLayout pageTitle="Economics">
      <div className="p-6">
        <EconomicModels 
          clubId="demo"
          currentModel={undefined}
          isAdmin={true}
          memberAddress="0x1234...5678"
        />
      </div>
    </AppLayout>
  );
}

'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { SupabaseProvider } from './contexts/SupabaseContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        loginMethods: ['email', 'wallet', 'google', 'discord'],
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <SupabaseProvider>
        {children}
      </SupabaseProvider>
    </PrivyProvider>
  )
}

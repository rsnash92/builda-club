import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'builda.club - BUIDL Your Community\'s Future',
  description: 'Transform online communities into builder DAOs where members become co-owners, not subscribers.',
  keywords: ['web3', 'dao', 'community', 'blockchain', 'builders', 'crypto'],
  authors: [{ name: 'builda.club team' }],
  openGraph: {
    title: 'builda.club - BUIDL Your Community\'s Future',
    description: 'Transform online communities into builder DAOs where members become co-owners, not subscribers.',
    type: 'website',
    url: 'https://builda.club',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'builda.club - BUIDL Your Community\'s Future',
    description: 'Transform online communities into builder DAOs where members become co-owners, not subscribers.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}


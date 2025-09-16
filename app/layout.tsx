import type { Metadata } from 'next'
import { Khula } from 'next/font/google'
import './globals.css'
import './assets/scss/main.scss'
import 'swiper/swiper-bundle.css'
import { Providers } from './providers'
import Bootstrap from '@/components/shared/Bootstrap'
import Progress from '@/components/shared/Progress'

const khula = Khula({ subsets: ['latin'], weight: ['300', '400', '600', '700', '800'], variable: '--khula' })

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
      <body className={khula.variable}>
        <Progress />
        <Bootstrap>
          <Providers>
            {children}
          </Providers>
        </Bootstrap>
      </body>
    </html>
  )
}


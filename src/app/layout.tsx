import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' })
const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: {
    default: 'The Real House Tarot — Digital Guide',
    template: '%s · Real House Tarot',
  },
  description:
    'A best-in-class digital experience for The Real House Tarot guide: browse the deck, explore meanings, and do interactive spreads.',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'The Real House Tarot — Digital Guide',
    description:
      'Browse the deck, explore meanings, and do interactive spreads.',
    type: 'website',
  },
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen font-sans">
        <SiteHeader />
        <main className="min-h-[70vh]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}

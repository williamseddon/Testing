import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { site } from '@/data/site'

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' })
const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: {
    default: `${site.productName} — ${site.guideName}`,
    template: `%s · ${site.productName}`,
  },
  description:
    `Companion guide for the ${site.productName} deck. Built for the physical cards: scan, look up meanings, and follow spread prompts (plus optional digital pulls).`,
  metadataBase: new URL(site.links.home),
  openGraph: {
    title: `${site.productName} — ${site.guideName}`,
    description:
      `Physical-deck-first guide: card meanings, spread prompts, and optional digital pulls.`,
    type: 'website',
  },
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
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

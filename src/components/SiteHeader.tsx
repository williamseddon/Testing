import Link from 'next/link'
import { Container } from './Container'
import { HeaderSearch } from './header/HeaderSearch'
import { MobileMenu } from './header/MobileMenu'
import { site } from '@/data/site'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group inline-flex items-baseline gap-2">
          <span className="font-serif text-xl font-semibold tracking-tight">
            {site.productName}
          </span>
          <span className="hidden text-xs text-black/50 sm:inline">
            Guide
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm sm:flex">
          <Link href="/get-started" className="text-black/70 hover:text-black">
            Get started
          </Link>
          <Link href="/about" className="text-black/70 hover:text-black">
            About
          </Link>
          <Link href="/deck" className="text-black/70 hover:text-black">
            Deck
          </Link>
          <Link href="/read" className="text-black/70 hover:text-black">
            Spreads
          </Link>
          <Link href="/store" className="text-black/70 hover:text-black">
            Store
          </Link>
          <Link href="/contact" className="text-black/70 hover:text-black">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <HeaderSearch />
          <Link
            href="/get-started"
            className="hidden rounded-xl2 bg-black px-3 py-2 text-sm font-medium text-white hover:bg-black/90 sm:inline-flex"
          >
            Start here
          </Link>
          <Link
            href="/deck"
            className="hidden rounded-xl2 border border-black/10 bg-white/70 px-3 py-2 text-sm font-medium text-black hover:bg-white sm:inline-flex"
          >
            Search cards
          </Link>
          <MobileMenu className="sm:hidden" />
        </div>
      </Container>
    </header>
  )
}

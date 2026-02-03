import Link from 'next/link'
import { Container } from './Container'
import { site } from '@/data/site'

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-white/60">
      <Container className="py-10">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <div className="font-serif text-lg font-semibold">{site.productName}</div>
            <div className="mt-1 text-sm text-black/60">{site.tagline}</div>
            <p className="mt-4 text-xs text-black/50">{site.disclaimer}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <div className="font-medium text-black/80">Explore</div>
              <div className="space-y-1 text-black/60">
                <Link href="/get-started" className="block hover:text-black">
                  Get started
                </Link>
                <Link href="/deck" className="block hover:text-black">
                  Deck
                </Link>
                <Link href="/read" className="block hover:text-black">
                  Spreads
                </Link>
                <Link href="/store" className="block hover:text-black">
                  Store
                </Link>
                <Link href="/about" className="block hover:text-black">
                  Our Story
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-medium text-black/80">Contact</div>
              <div className="space-y-1 text-black/60">
                <a
                  className="block hover:text-black"
                  href={site.links.contact}
                  target="_blank"
                  rel="noreferrer"
                >
                  {site.contact.website}/contact
                </a>
                <a className="block hover:text-black" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
                <a
                  className="block hover:text-black"
                  href={site.links.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  {site.contact.instagramHandle}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-black/5 pt-6 text-xs text-black/45 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.productName}. All rights reserved.
          </span>
          <div className="flex gap-4">
            <Link href="/disclaimer" className="hover:text-black/70">
              Disclaimer
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

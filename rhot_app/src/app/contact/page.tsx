import Link from 'next/link'
import { Container } from '@/components/Container'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { site } from '@/data/site'
import { Instagram, Mail, Store } from 'lucide-react'

export const metadata = {
  title: `Contact • ${site.productName}`,
}

export default function ContactPage() {
  const instagramHandle = site.contact.instagram.startsWith('@')
    ? site.contact.instagram.slice(1)
    : site.contact.instagram

  const instagramUrl = `https://instagram.com/${instagramHandle}`

  return (
    <div>
      <Container className="py-12">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Contact</Badge>
            <Badge className="bg-white/70">{site.tagline}</Badge>
          </div>

          <h1 className="mt-4 font-serif text-5xl font-semibold tracking-tight">
            Let&apos;s stay connected
          </h1>

          <p className="mt-4 text-lg text-black/65">
            Have a question about your deck, a card you pulled, or an order? Reach out
            &mdash; we&apos;ll point you in the right direction.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {/* ✅ Button renders a Link branch when href is provided */}
            <Button href={`mailto:${site.contact.email}`} className="justify-center">
              <Mail className="h-4 w-4" />
              Email us
            </Button>

            <Button
              href="https://rhotarot.com/contact"
              target="_blank"
              rel="noreferrer"
              variant="soft"
              className="justify-center"
            >
              Contact form
            </Button>

            <Button
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              variant="ghost"
              className="justify-center"
            >
              <Instagram className="h-4 w-4" />
              {site.contact.instagram}
            </Button>

            <Button
              href="https://rhotarot.com/store"
              target="_blank"
              rel="noreferrer"
              variant="ghost"
              className="justify-center"
            >
              <Store className="h-4 w-4" />
              Visit the store
            </Button>
          </div>

          <div className="mt-10 rounded-2xl border border-black/10 bg-white/60 p-5 text-sm text-black/65">
            <div className="font-medium text-black/80">Quick info</div>
            <ul className="mt-3 space-y-2">
              <li>
                <span className="text-black/55">Website:</span>{' '}
                <Link
                  href={site.contact.website}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-black/20 underline-offset-4 hover:decoration-black/40"
                >
                  {site.contact.website.replace('https://', '')}
                </Link>
              </li>

              <li>
                <span className="text-black/55">Email:</span>{' '}
                <Link
                  href={`mailto:${site.contact.email}`}
                  className="underline decoration-black/20 underline-offset-4 hover:decoration-black/40"
                >
                  {site.contact.email}
                </Link>
              </li>

              <li>
                <span className="text-black/55">Instagram:</span>{' '}
                <Link
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-black/20 underline-offset-4 hover:decoration-black/40"
                >
                  {site.contact.instagram}
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-8 rounded-2xl border border-black/10 bg-white/50 p-5 text-xs text-black/55">
            DISCLAIMER: This product is not endorsed by, affiliated with, or
            commercially connected to anyone other than Twins who Tarot LLC.
          </div>

          <div className="mt-6 text-sm text-black/60">
            Want a quick walkthrough?{' '}
            <Link
              href="/get-started"
              className="underline decoration-black/20 underline-offset-4 hover:decoration-black/40"
            >
              Get started
            </Link>
            .
          </div>
        </div>
      </Container>
    </div>
  )
}



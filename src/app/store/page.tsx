import Link from 'next/link'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { site } from '@/data/site'

export const metadata = {
  title: `Store • ${site.productName}`,
}

export default function StorePage() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-2xl">
        <Badge className="bg-white/70">Official store</Badge>
        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Shop the physical deck
        </h1>

        <p className="mt-4 text-lg text-black/65">
          This site is the companion guide. For decks, refills, and merch, head to
          the official store.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            href={site.links.store}
            target="_blank"
            rel="noreferrer"
            size="lg"
            className="justify-center"
          >
            Open rhotarot.com/store
          </Button>
          <Button href="/get-started" variant="soft" size="lg">
            Start with your deck
          </Button>
        </div>

        <div className="mt-10 rounded-2xl border border-black/10 bg-white/60 p-6 text-sm text-black/65">
          Already have the deck? <Link href="/get-started" className="font-medium text-black hover:underline">Get started</Link>.
        </div>

        <div className="mt-6 text-xs text-black/55">{site.disclaimer}</div>
      </div>
    </Container>
  )
}

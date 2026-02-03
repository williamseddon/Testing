import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import { spreads, getSpread } from '@/data/spreads'
import { ReadingClient } from '@/components/read/ReadingClient'

export function generateStaticParams() {
  return spreads.map((s) => ({ spread: s.id }))
}

export default function SpreadPage({
  params,
  searchParams,
}: {
  params: { spread: string }
  searchParams?: { cards?: string; rev?: string; reversals?: string }
}) {
  const spread = getSpread(params.spread)
  if (!spread) return notFound()

  return (
    <Container className="py-10">
      <header className="space-y-3">
        <h1 className="font-serif text-4xl font-semibold tracking-tight">
          {spread.name}
        </h1>
        <p className="max-w-3xl text-base text-black/65">{spread.description}</p>
        <div className="text-sm text-black/55">{spread.tagline}</div>
        <div className="text-sm text-black/55">Use with your physical deck, or tap Shuffle &amp; Draw for a digital pull.</div>
      </header>

      <ReadingClient
        spread={spread}
        initialCardsParam={searchParams?.cards}
        initialRevParam={searchParams?.rev}
        initialReversals={searchParams?.reversals === '1'}
      />
    </Container>
  )
}

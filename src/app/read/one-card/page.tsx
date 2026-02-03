import { Container } from '@/components/Container'
import { ReadingClient } from '@/components/read/ReadingClient'
import type { Spread } from '@/data/spreads'

const oneCard: Spread = {
  id: 'one-card',
  name: 'One‑Card Pull',
  tagline: 'A fast check‑in for energy, guidance, or a vibe check.',
  description: 'Pull a single card and let it set the tone.',
  cards: 1,
  positions: [
    {
      key: '1',
      label: 'Your Card',
      prompt: 'What do you most need to know right now?',
    },
  ],
  layout: {
    cols: 1,
    rows: 1,
    cells: [{ key: '1', col: 1, row: 1 }],
  },
}

export default function OneCardPage({
  searchParams,
}: {
  searchParams?: { cards?: string; rev?: string; reversals?: string }
}) {
  return (
    <Container className="py-10">
      <header className="space-y-3">
        <h1 className="font-serif text-4xl font-semibold tracking-tight">
          {oneCard.name}
        </h1>
        <p className="max-w-3xl text-base text-black/65">{oneCard.description}</p>
        <div className="text-sm text-black/55">{oneCard.tagline}</div>
        <div className="text-sm text-black/55">Use with your physical deck, or let the app draw a card for you.</div>
      </header>

      <ReadingClient
        spread={oneCard}
        initialCardsParam={searchParams?.cards}
        initialRevParam={searchParams?.rev}
        initialReversals={searchParams?.reversals === '1'}
      />
    </Container>
  )
}

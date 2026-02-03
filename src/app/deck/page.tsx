import { Container } from '@/components/Container'
import { cards, filterCards } from '@/data/cards'
import { DeckToolbar } from '@/components/cards/DeckToolbar'
import { CardTile } from '@/components/cards/CardTile'

export default function DeckPage({
  searchParams,
}: {
  searchParams?: {
    arcana?: string
    suit?: string
    q?: string
  }
}) {
  const arcana =
    searchParams?.arcana === 'major' ||
    searchParams?.arcana === 'minor' ||
    searchParams?.arcana === 'all'
      ? searchParams.arcana
      : 'all'

  const suit =
    searchParams?.suit === 'wands' ||
    searchParams?.suit === 'pentacles' ||
    searchParams?.suit === 'swords' ||
    searchParams?.suit === 'cups' ||
    searchParams?.suit === 'all'
      ? searchParams.suit
      : 'all'

  const q = typeof searchParams?.q === 'string' ? searchParams.q.slice(0, 80) : ''

  const results = filterCards({ arcana, suit, q })

  return (
    <Container className="py-10">
      <div className="flex flex-col gap-6">
        <header className="space-y-3">
          <h1 className="font-serif text-4xl font-semibold tracking-tight">
            Explore the Deck
          </h1>
          <p className="max-w-2xl text-base text-black/65">
            Browse all 78 cards, search by card name or meaning keywords, and open any
            card for its full interpretation — perfect when you’ve pulled a card from
            your physical deck.
          </p>
        </header>

        <DeckToolbar arcana={arcana} suit={suit} q={q} />

        <div className="flex items-center justify-between text-sm text-black/60">
          <span>
            Showing <span className="font-medium text-black">{results.length}</span>{' '}
            of {cards.length}
          </span>
          <span className="hidden sm:inline">Tip: press Ctrl/⌘ K to search</span>
        </div>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-black/10 bg-white/60 p-10 text-center text-black/60">
            No matches. Try a different search or clear filters.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((card, i) => (
              <CardTile key={card.id} card={card} priority={i < 6} />
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}

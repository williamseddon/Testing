import rawCards from './cards.json'
import type { TarotCard, Suit } from './types'

export const cards = (rawCards as TarotCard[]).slice().sort((a, b) => a.order - b.order)

export const cardsById = new Map(cards.map((c) => [c.id, c]))

export const suits: { id: Suit; label: string }[] = [
  { id: 'wands', label: 'Wands' },
  { id: 'pentacles', label: 'Pentacles' },
  { id: 'swords', label: 'Swords' },
  { id: 'cups', label: 'Cups' },
]

export function getCard(id: string): TarotCard | undefined {
  return cardsById.get(id)
}

export function getNeighbors(id: string): { prev?: TarotCard; next?: TarotCard } {
  const i = cards.findIndex((c) => c.id === id)
  if (i === -1) return {}
  return {
    prev: cards[i - 1],
    next: cards[i + 1],
  }
}

export function filterCards(params: {
  arcana?: 'major' | 'minor' | 'all'
  suit?: Suit | 'all'
  q?: string
}) {
  const arcana = params.arcana ?? 'all'
  const suit = params.suit ?? 'all'
  const q = (params.q ?? '').trim().toLowerCase()

  return cards.filter((c) => {
    if (arcana !== 'all' && c.arcana !== arcana) return false
    if (suit !== 'all') {
      if (c.suit !== suit) return false
    }
    if (q) {
      const hay = [
        c.title,
        c.character ?? '',
        c.quote ?? '',
        c.kicker ?? '',
        c.callout ?? '',
        c.suit ?? '',
        c.rank ?? '',
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    }
    return true
  })
}

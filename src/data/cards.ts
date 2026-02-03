import rawCards from './cards.json'
import type { TarotCard, Suit, Rank } from './types'

export const cards = (rawCards as TarotCard[]).slice().sort((a, b) => a.order - b.order)

export const cardsById = new Map(cards.map((c) => [c.id, c]))

export const suits: { id: Suit; label: string }[] = [
  { id: 'wands', label: 'Wands' },
  { id: 'pentacles', label: 'Pentacles' },
  { id: 'swords', label: 'Swords' },
  { id: 'cups', label: 'Cups' },
]

function normalizeText(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const STOP_WORDS = new Set([
  'the',
  'a',
  'an',
  'of',
  'to',
  'and',
  'or',
  'for',
  'in',
  'on',
  'at',
  'with',
  'from',
  'card',
  'cards',
  'major',
  'minor',
  'arcana',
])

// Cheap fuzzy helper: treat distance<=1 as a match (great for mobile typos)
function editDistanceAtMostOne(a: string, b: string) {
  if (a === b) return true
  const la = a.length
  const lb = b.length
  if (Math.abs(la - lb) > 1) return false

  // Same length: allow one substitution
  if (la === lb) {
    let diffs = 0
    for (let i = 0; i < la; i++) {
      if (a[i] !== b[i]) {
        diffs += 1
        if (diffs > 1) return false
      }
    }
    return true
  }

  // Length differs by 1: allow one insert/delete
  const [shorter, longer] = la < lb ? [a, b] : [b, a]
  let i = 0
  let j = 0
  let usedSkip = false
  while (i < shorter.length && j < longer.length) {
    if (shorter[i] === longer[j]) {
      i += 1
      j += 1
      continue
    }
    if (usedSkip) return false
    usedSkip = true
    j += 1
  }
  return true
}

function romanToInt(input: string): number | null {
  // Supports typical roman numerals (I, V, X, L, C, D, M)
  // We only really need up to XXI, but this is fine.
  const s = input.toUpperCase()
  if (!/^[IVXLCDM]+$/.test(s)) return null
  const map: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  }
  let total = 0
  let prev = 0
  for (let i = s.length - 1; i >= 0; i--) {
    const v = map[s[i]]
    if (!v) return null
    if (v < prev) total -= v
    else {
      total += v
      prev = v
    }
  }
  return total
}

function tryParseNumberToken(token: string): number | null {
  if (!token) return null
  if (/^\d+$/.test(token)) return Number(token)
  const r = romanToInt(token)
  if (r != null && Number.isFinite(r)) return r
  return null
}

const rankToNumber: Partial<Record<Rank, number>> = {
  ace: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  page: 11,
  knight: 12,
  queen: 13,
  king: 14,
}

function tokensFromQuery(q: string) {
  const norm = normalizeText(q)
  if (!norm) return { norm: '', tokens: [] as string[] }
  const tokens = norm
    .split(' ')
    .map((t) => t.trim())
    .filter((t) => t && !STOP_WORDS.has(t))
  return { norm, tokens }
}

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

  const { norm: qNorm, tokens } = tokensFromQuery(params.q ?? '')

  const filtered = cards.filter((c) => {
    if (arcana !== 'all' && c.arcana !== arcana) return false
    if (suit !== 'all' && c.suit !== suit) return false
    return true
  })

  if (!tokens.length) return filtered

  const scoreFor = (c: TarotCard) => {
    const titleNorm = normalizeText(c.title ?? '')
    const characterNorm = normalizeText(c.character ?? '')
    const quoteNorm = normalizeText(c.quote ?? '')
    const kickerNorm = normalizeText(c.kicker ?? '')
    const calloutNorm = normalizeText(c.callout ?? '')
    const suitRankNorm = normalizeText(`${c.rank ?? ''} ${c.suit ?? ''} ${c.suit ?? ''} ${c.rank ?? ''}`)
    const idNorm = normalizeText(c.id)
    const bodyNorm = normalizeText((c.body ?? []).join(' '))

    const titleWords = titleNorm.split(' ').filter(Boolean)
    const characterWords = characterNorm.split(' ').filter(Boolean)

    let score = 0

    // Phrase bonus (helps when people type most of the title)
    if (qNorm && titleNorm.includes(qNorm)) score += 10
    if (qNorm && characterNorm.includes(qNorm)) score += 6

    for (const t of tokens) {
      if (!t) continue

      const n = tryParseNumberToken(t)

      // Exact id match (people sometimes paste the id)
      if (t === idNorm) score += 50

      // Major arcana numbers (0, 13, XIII, etc.)
      if (n != null && c.arcana === 'major' && c.majorNumber != null) {
        if (Number(c.majorNumber) === n) score += 20
        // Allow "00" -> 0
        if (n === 0 && (t === '00' || t === '000')) score += 18
      }

      // Minor rank numbers (optional support: "2" -> Two, etc.)
      if (n != null && c.arcana === 'minor' && c.rank) {
        const rn = rankToNumber[c.rank]
        if (rn != null && rn === n) score += 8
      }

      // Strong title matches
      if (titleNorm === t) score += 18
      else if (titleNorm.includes(t)) score += 12
      else if (titleWords.some((w) => w.startsWith(t))) score += 10
      else if (t.length >= 4 && titleWords.some((w) => editDistanceAtMostOne(w, t))) score += 6

      // Character matches
      if (characterNorm && characterNorm.includes(t)) score += 9
      else if (characterWords.some((w) => w.startsWith(t))) score += 7
      else if (t.length >= 4 && characterWords.some((w) => editDistanceAtMostOne(w, t))) score += 5

      // Keyword matches inside meaning text
      if (bodyNorm.includes(t)) score += 4

      // Light matches
      if (suitRankNorm.includes(t)) score += 4
      if (kickerNorm.includes(t) || calloutNorm.includes(t)) score += 2
      if (quoteNorm.includes(t)) score += 2
    }

    return score
  }

  return filtered
    .map((c) => ({ c, score: scoreFor(c) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.c.order - b.c.order)
    .map((x) => x.c)
}

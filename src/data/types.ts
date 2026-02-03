export type Arcana = 'major' | 'minor'
export type Suit = 'wands' | 'pentacles' | 'swords' | 'cups'
export type Rank =
  | 'ace'
  | 'two'
  | 'three'
  | 'four'
  | 'five'
  | 'six'
  | 'seven'
  | 'eight'
  | 'nine'
  | 'ten'
  | 'page'
  | 'knight'
  | 'queen'
  | 'king'

export type TarotCard = {
  id: string
  arcana: Arcana
  suit: Suit | null
  rank: Rank | null
  majorNumber: number | null
  title: string
  character: string | null
  quote: string | null
  body: string[]
  kicker: string | null
  callout: string | null
  order: number
  image: string
}

import type { TarotCard } from '@/data/types'

export type ThemeKey = 'major' | 'wands' | 'pentacles' | 'swords' | 'cups'

export function themeForCard(card: Pick<TarotCard, 'arcana' | 'suit'>): ThemeKey {
  if (card.arcana === 'major') return 'major'
  return (card.suit ?? 'major') as ThemeKey
}

export function gradientForTheme(theme: ThemeKey) {
  switch (theme) {
    case 'wands':
      return 'from-[rgb(var(--wands-from))] to-[rgb(var(--wands-to))]'
    case 'pentacles':
      return 'from-[rgb(var(--pentacles-from))] to-[rgb(var(--pentacles-to))]'
    case 'swords':
      return 'from-[rgb(var(--swords-from))] to-[rgb(var(--swords-to))]'
    case 'cups':
      return 'from-[rgb(var(--cups-from))] to-[rgb(var(--cups-to))]'
    case 'major':
    default:
      return 'from-[rgb(var(--major-from))] to-[rgb(var(--major-to))]'
  }
}

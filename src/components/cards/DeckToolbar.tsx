import Link from 'next/link'
import { suits } from '@/data/cards'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import type { ReactNode } from 'react'

function qs(params: Record<string, string | undefined>) {
  const sp = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v && v !== 'all' && v !== '') sp.set(k, v)
  }
  const s = sp.toString()
  return s ? `?${s}` : ''
}

export function DeckToolbar({
  arcana,
  suit,
  q,
}: {
  arcana: 'all' | 'major' | 'minor'
  suit: 'all' | 'wands' | 'pentacles' | 'swords' | 'cups'
  q: string
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-white/60 p-4 backdrop-blur">
      <form action="/deck" method="get" className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl2 border border-black/10 bg-white/70 px-3 py-2">
          <Search className="h-4 w-4 text-black/50" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Search cards, keywords, quotes, majors by number…"
            className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-black/35"
            aria-label="Search the deck"
          />
        </div>

        {/* Persist filters when searching */}
        {arcana !== 'all' ? <input type="hidden" name="arcana" value={arcana} /> : null}
        {suit !== 'all' ? <input type="hidden" name="suit" value={suit} /> : null}

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-xl2 border border-black/10 bg-black px-4 text-sm font-medium text-white hover:bg-black/90"
        >
          Search
        </button>

        <Link
          href="/deck"
          className="inline-flex h-11 items-center justify-center rounded-xl2 border border-black/10 bg-white/70 px-4 text-sm font-medium text-black/70 hover:bg-white"
        >
          Reset
        </Link>
      </form>

      <div className="flex flex-wrap gap-2">
        <Chip active={arcana === 'all'} href={`/deck${qs({ q, suit, arcana: 'all' })}`}>
          All
        </Chip>
        <Chip active={arcana === 'major'} href={`/deck${qs({ q, suit, arcana: 'major' })}`}>
          Major Arcana
        </Chip>
        <Chip active={arcana === 'minor'} href={`/deck${qs({ q, suit, arcana: 'minor' })}`}>
          Minor Arcana
        </Chip>
      </div>

      <div className="flex flex-wrap gap-2">
        <Chip active={suit === 'all'} href={`/deck${qs({ q, arcana, suit: 'all' })}`}>
          All Suits
        </Chip>
        {suits.map((s) => (
          <Chip
            key={s.id}
            active={suit === s.id}
            href={`/deck${qs({ q, arcana, suit: s.id })}`}
          >
            {s.label}
          </Chip>
        ))}
      </div>

      <div className="text-xs text-black/50">
        Tip: press <span className="font-medium">⌘K</span> to search from anywhere.
      </div>
    </div>
  )
}

function Chip({
  href,
  active,
  children,
}: {
  href: string
  active?: boolean
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-sm transition',
        active
          ? 'border-black bg-black text-white'
          : 'border-black/10 bg-white/70 text-black/70 hover:bg-white',
      )}
    >
      {children}
    </Link>
  )
}

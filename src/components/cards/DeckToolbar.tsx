import Link from 'next/link'
import { suits } from '@/data/cards'
import { cn } from '@/lib/utils'

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
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-black/60">
          Filters update via URL — shareable and bookmarkable.
        </div>
        <Link
          href="/deck"
          className="text-sm font-medium text-black/70 hover:text-black"
        >
          Reset
        </Link>
      </div>

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

      {q ? (
        <div className="text-sm text-black/70">
          Searching for: <span className="font-medium">{q}</span>
        </div>
      ) : null}
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
  children: React.ReactNode
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

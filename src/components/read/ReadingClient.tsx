'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { Spread } from '@/data/spreads'
import { cards, cardsById } from '@/data/cards'
import { drawUnique } from '@/lib/random'
import { cn } from '@/lib/utils'
import { gradientForTheme, themeForCard } from '@/lib/theme'
import { Button } from '@/components/Button'
import { Badge } from '@/components/Badge'
import { Copy, RefreshCw, Share2, Sparkles } from 'lucide-react'

type Drawn = { id: string; reversed: boolean }

function parseCardsParam(param: string | undefined): string[] | null {
  if (!param) return null
  const ids = param
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  if (!ids.length) return null

  for (const id of ids) {
    if (!cardsById.has(id)) return null
  }
  return ids
}

function parseRevParam(param: string | undefined, count: number): boolean[] | null {
  if (!param) return null
  const cleaned = param.replace(/[^01]/g, '')
  if (cleaned.length < count) return null
  return cleaned
    .slice(0, count)
    .split('')
    .map((c) => c === '1')
}

function buildQuery(drawn: Drawn[], includeReversals: boolean) {
  const sp = new URLSearchParams()
  sp.set('cards', drawn.map((d) => d.id).join(','))

  if (includeReversals) {
    sp.set(
      'rev',
      drawn
        .map((d) => (d.reversed ? '1' : '0'))
        .join(''),
    )
    sp.set('reversals', '1')
  }

  return `?${sp.toString()}`
}

export function ReadingClient({
  spread,
  initialCardsParam,
  initialRevParam,
  initialReversals,
}: {
  spread: Spread
  initialCardsParam?: string
  initialRevParam?: string
  initialReversals?: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()

  const deck = useMemo(() => cards.map((c) => c.id), [])

  const [includeReversals, setIncludeReversals] = useState<boolean>(
    initialReversals ?? false,
  )
  const [drawn, setDrawn] = useState<Drawn[] | null>(null)
  const [revealed, setRevealed] = useState<boolean[]>(
    () => new Array(spread.cards).fill(false),
  )
  const [toast, setToast] = useState<string | null>(null)

  // Keep revealed array length aligned to spread.cards if spread changes
  useEffect(() => {
    setRevealed((prev) => {
      if (prev.length === spread.cards) return prev
      const next = new Array(spread.cards).fill(false)
      for (let i = 0; i < Math.min(prev.length, next.length); i++) next[i] = prev[i]
      return next
    })
  }, [spread.cards])

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(null), 1800)
  }

  function newReading(opts?: { revealAll?: boolean }) {
    const ids = drawUnique(deck, spread.cards)
    const d: Drawn[] = ids.map((id) => ({
      id,
      reversed: includeReversals ? Math.random() < 0.5 : false,
    }))
    setDrawn(d)
    setRevealed(new Array(spread.cards).fill(Boolean(opts?.revealAll)))
    router.replace(pathname + buildQuery(d, includeReversals))
  }

  // Initialize from URL params (or auto-draw)
  useEffect(() => {
    const ids = parseCardsParam(initialCardsParam)
    const rev = parseRevParam(initialRevParam, spread.cards)

    // Use initialReversals to interpret URL reversals on first load (not the state which can change)
    const useReversals = Boolean(initialReversals)

    if (ids && ids.length === spread.cards) {
      const d: Drawn[] = ids.map((id, i) => ({
        id,
        reversed: useReversals ? Boolean(rev?.[i]) : false,
      }))
      setDrawn(d)
      setRevealed(new Array(spread.cards).fill(false))
      return
    }

    // If no valid params, auto-draw once
    newReading()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      showToast('Link copied')
    } catch {
      showToast('Could not copy link')
    }
  }

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: spread.name,
          text: 'My Real House Tarot reading',
          url: window.location.href,
        })
      } else {
        await copyLink()
      }
    } catch {
      // user canceled
    }
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr,0.6fr]">
      <section className="rounded-2xl border border-black/10 bg-white/60 p-5 backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{spread.cards} cards</Badge>
            {includeReversals ? (
              <Badge>Reversals on</Badge>
            ) : (
              <Badge>Reversals off</Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="soft" onClick={() => newReading()} className="justify-center">
              <RefreshCw className="h-4 w-4" />
              Shuffle &amp; Draw
            </Button>
            <Button variant="ghost" onClick={copyLink}>
              <Copy className="h-4 w-4" />
              Copy link
            </Button>
            <Button variant="ghost" onClick={share}>
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white/50 p-4">
          <div className="text-sm text-black/70">
            Tap each card to reveal. Your interpretation is the final authority — the
            cards are just the girls talking.
          </div>

          <label className="flex items-center gap-2 text-sm text-black/60">
            <input
              type="checkbox"
              checked={includeReversals}
              onChange={(e) => {
                const v = e.target.checked
                setIncludeReversals(v)

                // If a reading exists, update URL to reflect new reversals state (keep cards)
                if (drawn) {
                  const updated = drawn.map((d) => ({
                    ...d,
                    reversed: v ? d.reversed : false,
                  }))
                  setDrawn(updated)
                  router.replace(pathname + buildQuery(updated, v))
                }
              }}
            />
            Include reversals
          </label>
        </div>

        <div
          className="mt-6 grid gap-3"
          style={{
            gridTemplateColumns: `repeat(${spread.layout.cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${spread.layout.rows}, minmax(0, 1fr))`,
          }}
        >
          {spread.layout.cells.map((cell) => {
            const pos = spread.positions.find((p) => p.key === cell.key)!
            const di = Number(cell.key) - 1
            const d = drawn?.[di]
            const isRevealed = revealed?.[di] ?? false
            const card = d ? cardsById.get(d.id) : undefined
            const theme = card ? themeForCard(card) : 'major'

            return (
              <div
                key={cell.key}
                className="min-w-0"
                style={{ gridColumn: cell.col, gridRow: cell.row }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setRevealed((r) => {
                      const next = r.slice()
                      next[di] = !next[di]
                      return next
                    })
                  }}
                  className={cn(
                    'group relative w-full overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br p-3 text-left shadow-sm transition',
                    'hover:-translate-y-0.5 hover:shadow-glow',
                    gradientForTheme(theme),
                  )}
                  aria-label={`Card position ${pos.label}`}
                >
                  <div className="absolute inset-0 opacity-70 [mask-image:radial-gradient(260px_200px_at_55%_35%,black,transparent)]">
                    <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.9),transparent_60%)]" />
                  </div>

                  <div className="relative flex items-start justify-between gap-2">
                    <Badge className="bg-white/70">{pos.label}</Badge>
                    <Badge className="bg-white/70">#{cell.key}</Badge>
                  </div>

                  <div className="relative mt-3 grid place-items-center">
                    <div className="relative h-[220px] w-[140px] overflow-hidden rounded-[22px] border border-black/10 bg-white/45 shadow-sm">
                      {!isRevealed || !card ? (
                        <div className="grid h-full w-full place-items-center">
                          <div className="text-center">
                            <div className="font-serif text-lg italic text-black/70">
                              Tap to reveal
                            </div>
                            <div className="mt-1 text-xs text-black/45">
                              {d ? 'Ready when you are.' : 'Drawing…'}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className={cn(
                              'object-cover transition duration-500 group-hover:scale-[1.02]',
                              d?.reversed ? 'rotate-180' : '',
                            )}
                            sizes="(max-width: 1024px) 140px, 160px"
                          />
                          {d?.reversed ? (
                            <div className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-semibold text-white">
                              Reversed
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="relative mt-3">
                    <div className="text-xs font-medium uppercase tracking-wider text-black/45">
                      Prompt
                    </div>
                    <div className="mt-1 text-sm text-black/70">{pos.prompt}</div>
                  </div>

                  {isRevealed && card ? (
                    <div className="relative mt-4 flex items-center justify-between gap-2 rounded-2xl border border-black/10 bg-white/60 p-3">
                      <div className="min-w-0">
                        <div className="truncate font-serif text-lg font-semibold">
                          {card.title}
                        </div>
                        <div className="truncate text-xs text-black/60">
                          {card.character ?? ''}
                        </div>
                      </div>
                      <Link
                        href={`/card/${card.id}`}
                        className="inline-flex shrink-0 items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm text-black/70 hover:bg-white/70"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Sparkles className="h-4 w-4" />
                        Details
                      </Link>
                    </div>
                  ) : null}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      <aside className="rounded-2xl border border-black/10 bg-white/60 p-5 backdrop-blur">
        <div className="font-serif text-2xl font-semibold">Your pull</div>
        <p className="mt-2 text-sm text-black/60">
          Reveal cards one by one, then review them here with quick links.
        </p>

        <div className="mt-4 space-y-3">
          {spread.positions.map((p) => {
            const di = Number(p.key) - 1
            const d = drawn?.[di]
            const isRevealed = revealed?.[di] ?? false
            const card = d ? cardsById.get(d.id) : undefined

            return (
              <div
                key={p.key}
                className="rounded-2xl border border-black/10 bg-white/60 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-medium uppercase tracking-wider text-black/45">
                    {p.label}
                  </div>
                  <div className="text-xs text-black/45">#{p.key}</div>
                </div>

                {!isRevealed || !card ? (
                  <div className="mt-2 text-sm text-black/55">
                    {isRevealed ? 'Drawing…' : 'Reveal to see the card.'}
                  </div>
                ) : (
                  <div className="mt-2">
                    <Link
                      href={`/card/${card.id}`}
                      className="font-serif text-lg font-semibold hover:underline"
                    >
                      {card.title}
                    </Link>
                    <div className="mt-1 text-sm text-black/60">
                      {card.character ?? ''}
                      {d?.reversed ? ' · Reversed' : ''}
                    </div>
                    {card.quote ? (
                      <div className="mt-2 text-sm text-black/65">“{card.quote}”</div>
                    ) : null}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-black/10 bg-white/50 p-4 text-xs text-black/55">
          Tip: Save or share your URL to return to this exact reading.
        </div>
      </aside>

      {toast ? (
        <div className="fixed bottom-5 left-1/2 z-[200] -translate-x-1/2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      ) : null}
    </div>
  )
}

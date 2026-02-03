'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { Spread } from '@/data/spreads'
import { cards, cardsById, filterCards } from '@/data/cards'
import { site } from '@/data/site'
import { drawUnique } from '@/lib/random'
import { cn } from '@/lib/utils'
import { gradientForTheme, themeForCard } from '@/lib/theme'
import { Button } from '@/components/Button'
import { Badge } from '@/components/Badge'
import {
  Copy,
  RefreshCw,
  Share2,
  Sparkles,
  Search,
  X,
  RotateCcw,
} from 'lucide-react'

type Drawn = { id: string | null; reversed: boolean }

type Mode = 'physical' | 'digital'

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

function allAssigned(drawn: Drawn[]) {
  return drawn.every((d) => Boolean(d.id))
}

function buildQuery(drawn: Drawn[], includeReversals: boolean) {
  const sp = new URLSearchParams()
  sp.set(
    'cards',
    drawn
      .map((d) => d.id)
      .filter(Boolean)
      .join(','),
  )
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

  const [mode, setMode] = useState<Mode>(() =>
    initialCardsParam ? 'digital' : 'physical',
  )
  const [includeReversals, setIncludeReversals] = useState<boolean>(
    initialReversals ?? false,
  )
  const [drawn, setDrawn] = useState<Drawn[]>(() =>
    new Array(spread.cards).fill(null).map(() => ({ id: null, reversed: false })),
  )
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    new Array(spread.cards).fill(false),
  )
  const [toast, setToast] = useState<string | null>(null)

  const [pickerIndex, setPickerIndex] = useState<number | null>(null)
  const [pickerQ, setPickerQ] = useState('')

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(null), 1800)
  }

  function syncUrl(next: Drawn[], reversals = includeReversals) {
    if (allAssigned(next)) {
      router.replace(pathname + buildQuery(next, reversals))
    } else {
      router.replace(pathname)
    }
  }

  function newDigitalReading() {
    const ids = drawUnique(deck, spread.cards)
    const next: Drawn[] = ids.map((id) => ({
      id,
      reversed: includeReversals ? Math.random() < 0.5 : false,
    }))
    setDrawn(next)
    setRevealed(new Array(spread.cards).fill(false))
    router.replace(pathname + buildQuery(next, includeReversals))
  }

  function clearPhysical() {
    const next = new Array(spread.cards)
      .fill(null)
      .map(() => ({ id: null, reversed: false }))
    setDrawn(next)
    setRevealed(new Array(spread.cards).fill(false))
    router.replace(pathname)
  }

  function assignCard(index: number, id: string) {
    setDrawn((prev) => {
      const next = prev.slice()
      next[index] = {
        id,
        reversed: includeReversals ? next[index]?.reversed ?? false : false,
      }
      syncUrl(next)
      return next
    })
  }

  function toggleReversed(index: number) {
    setDrawn((prev) => {
      const next = prev.slice()
      const d = next[index]
      if (!d?.id) return prev
      next[index] = { ...d, reversed: !d.reversed }
      syncUrl(next)
      return next
    })
  }

  // Initialize from URL params (shared links)
  useEffect(() => {
    const ids = parseCardsParam(initialCardsParam)
    const rev = parseRevParam(initialRevParam, spread.cards)
    if (ids && ids.length === spread.cards) {
      const next: Drawn[] = ids.map((id, i) => ({
        id,
        reversed: includeReversals ? Boolean(rev?.[i]) : false,
      }))
      setDrawn(next)
      setMode('digital')
      setRevealed(new Array(spread.cards).fill(false))
    }
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
          text: `My ${site.productName} reading`,
          url: window.location.href,
        })
      } else {
        await copyLink()
      }
    } catch {
      // user canceled
    }
  }

  const pickerResults = useMemo(() => {
    const q = pickerQ.trim()
    const res = filterCards({ q, arcana: 'all', suit: 'all' })
    // Keep the modal snappy.
    return res.slice(0, q ? 48 : 36)
  }, [pickerQ])

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr,0.6fr]">
      <section className="rounded-2xl border border-black/10 bg-white/60 p-5 backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{spread.cards} cards</Badge>

            <div className="inline-flex overflow-hidden rounded-full border border-black/10 bg-white/70">
              <button
                type="button"
                onClick={() => {
                  setMode('physical')
                  clearPhysical()
                }}
                className={cn(
                  'px-3 py-1 text-xs font-medium',
                  mode === 'physical' ? 'bg-black text-white' : 'text-black/70 hover:bg-white',
                )}
              >
                Physical deck
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('digital')
                  newDigitalReading()
                }}
                className={cn(
                  'px-3 py-1 text-xs font-medium',
                  mode === 'digital' ? 'bg-black text-white' : 'text-black/70 hover:bg-white',
                )}
              >
                Digital draw
              </button>
            </div>

            {includeReversals ? <Badge>Reversals on</Badge> : <Badge>Reversals off</Badge>}
          </div>

          <div className="flex flex-wrap gap-2">
            {mode === 'digital' ? (
              <Button
                variant="soft"
                onClick={newDigitalReading}
                className="justify-center"
              >
                <RefreshCw className="h-4 w-4" />
                Shuffle &amp; Draw
              </Button>
            ) : (
              <Button
                variant="soft"
                onClick={clearPhysical}
                className="justify-center"
              >
                <RotateCcw className="h-4 w-4" />
                Clear cards
              </Button>
            )}

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

        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-black/10 bg-white/50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-black/70">
            {mode === 'digital' ? (
              <>Tap each card to reveal. Your interpretation is the final authority — the cards are just the girls talking.</>
            ) : (
              <>Pulled cards in real life? Tap each position to choose the card you drew (or jump to <Link href="/deck" className="font-medium text-black hover:underline">Search</Link>).</>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm text-black/60">
            <input
              type="checkbox"
              checked={includeReversals}
              onChange={(e) => {
                const v = e.target.checked
                setIncludeReversals(v)

                // If reversals get turned off, normalize existing cards.
                if (!v) {
                  setDrawn((prev) => {
                    const next = prev.map((d) => ({ ...d, reversed: false }))
                    syncUrl(next, v)
                    return next
                  })
                } else {
                  // Turning on: keep current state, but refresh URL if we have a full reading.
                  syncUrl(drawn, v)
                }
              }}
            />
            Include reversals
          </label>
        </div>

        {/* Mobile: stacked layout */}
        <div className="mt-6 space-y-4 md:hidden">
          {spread.positions.map((pos) => {
            const di = Number(pos.key) - 1
            const d = drawn?.[di]
            const card = d?.id ? cardsById.get(d.id) : undefined
            const theme = card ? themeForCard(card) : 'major'

            const isRevealed = mode === 'digital' ? Boolean(revealed?.[di]) : Boolean(d?.id)

            return (
              <button
                key={pos.key}
                type="button"
                onClick={() => {
                  if (mode === 'digital') {
                    setRevealed((r) => {
                      const next = r.slice()
                      next[di] = !next[di]
                      return next
                    })
                    return
                  }
                  setPickerIndex(di)
                  setPickerQ('')
                }}
                className={cn(
                  'group relative w-full overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br p-4 text-left shadow-sm transition',
                  'hover:shadow-glow',
                  gradientForTheme(theme),
                )}
                aria-label={`Card position ${pos.label}`}
              >
                <div className="absolute inset-0 opacity-70 [mask-image:radial-gradient(260px_200px_at_55%_35%,black,transparent)]">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.9),transparent_60%)]" />
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="w-[120px] flex-none">
                    <CardArt
                      card={isRevealed ? card : undefined}
                      reversed={Boolean(d?.reversed)}
                      label={mode === 'digital' ? (isRevealed ? undefined : 'Tap to reveal') : (card ? 'Tap to change' : 'Choose card')}
                      tiltIndex={di}
                      sizes="120px"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="bg-white/70">{pos.label}</Badge>
                      <Badge className="bg-white/70">#{pos.key}</Badge>
                      {includeReversals && card ? (
                        <span
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleReversed(di)
                          }}
                          className={cn(
                            'inline-flex cursor-pointer items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-black/70',
                            d?.reversed ? 'bg-black text-white' : '',
                          )}
                        >
                          {d?.reversed ? 'Reversed' : 'Upright'}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-3">
                      <div className="text-xs uppercase tracking-wider text-black/50">Prompt</div>
                      <div className="mt-1 font-serif text-lg leading-snug text-black/80">
                        {pos.prompt}
                      </div>
                    </div>

                    <div className="mt-3 rounded-xl2 border border-black/10 bg-white/60 p-3">
                      {card ? (
                        <div>
                          <div className="text-sm font-semibold text-black/85">{card.title}</div>
                          <div className="mt-1 text-sm text-black/60">
                            {card.character ?? ''}
                            {d?.reversed ? ' · Reversed' : ''}
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-black/55">
                          {mode === 'digital' ? 'Tap to reveal' : 'Tap to choose a card'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Desktop/tablet: grid layout */}
        <div
          className="mt-6 hidden gap-3 md:grid"
          style={{
            gridTemplateColumns: `repeat(${spread.layout.cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${spread.layout.rows}, minmax(0, 1fr))`,
          }}
        >
          {spread.layout.cells.map((cell) => {
            const pos = spread.positions.find((p) => p.key === cell.key)!
            const di = Number(cell.key) - 1
            const d = drawn?.[di]
            const card = d?.id ? cardsById.get(d.id) : undefined
            const theme = card ? themeForCard(card) : 'major'

            const isRevealed = mode === 'digital' ? Boolean(revealed?.[di]) : Boolean(d?.id)

            return (
              <div key={cell.key} className="min-w-0" style={{ gridColumn: cell.col, gridRow: cell.row }}>
                <button
                  type="button"
                  onClick={() => {
                    if (mode === 'digital') {
                      setRevealed((r) => {
                        const next = r.slice()
                        next[di] = !next[di]
                        return next
                      })
                      return
                    }
                    setPickerIndex(di)
                    setPickerQ('')
                  }}
                  className={cn(
                    'group relative w-full overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br p-4 text-left shadow-sm transition',
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
                    <div className="flex items-center gap-2">
                      <Badge className="bg-white/70">#{cell.key}</Badge>
                      {includeReversals && card ? (
                        <span
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleReversed(di)
                          }}
                          className={cn(
                            'inline-flex cursor-pointer items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-black/70',
                            d?.reversed ? 'bg-black text-white' : '',
                          )}
                        >
                          {d?.reversed ? 'Reversed' : 'Upright'}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="relative mt-4 grid place-items-center">
                    <div className="w-full max-w-[190px]">
                      <CardArt
                        card={isRevealed ? card : undefined}
                        reversed={Boolean(d?.reversed)}
                        label={mode === 'digital' ? (isRevealed ? undefined : 'Tap to reveal') : (card ? 'Tap to change' : 'Choose card')}
                        tiltIndex={di}
                        sizes="190px"
                      />
                    </div>
                  </div>

                  <div className="relative mt-4">
                    <div className="text-xs font-medium uppercase tracking-wider text-black/45">Prompt</div>
                    <div className="mt-1 text-sm text-black/70">{pos.prompt}</div>
                  </div>

                  {isRevealed && card ? (
                    <div className="relative mt-4 flex items-center justify-between gap-2 rounded-xl2 border border-black/10 bg-white/60 p-3">
                      <div className="min-w-0">
                        <div className="truncate font-serif text-lg font-semibold">{card.title}</div>
                        <div className="truncate text-xs text-black/60">{card.character ?? ''}</div>
                      </div>
                      <Link
                        href={`/card/${card.id}`}
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl2 border border-black/10 bg-white px-3 py-2 text-sm text-black/70 hover:bg-white/70"
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
        <div className="font-serif text-2xl font-semibold">Your cards</div>
        <p className="mt-2 text-sm text-black/60">
          {mode === 'digital'
            ? 'Reveal cards one by one, then review them here with quick links.'
            : 'Choose the cards you pulled, then review them here with quick links.'}
        </p>

        <div className="mt-4 space-y-3">
          {spread.positions.map((p) => {
            const di = Number(p.key) - 1
            const d = drawn?.[di]
            const card = d?.id ? cardsById.get(d.id) : undefined
            const isRevealed = mode === 'digital' ? Boolean(revealed?.[di]) : Boolean(d?.id)

            return (
              <div key={p.key} className="rounded-2xl border border-black/10 bg-white/60 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-medium uppercase tracking-wider text-black/45">{p.label}</div>
                  <div className="text-xs text-black/45">#{p.key}</div>
                </div>

                {!isRevealed || !card ? (
                  <div className="mt-2 text-sm text-black/55">
                    {mode === 'digital' ? 'Reveal to see the card.' : 'Choose a card for this position.'}
                  </div>
                ) : (
                  <div className="mt-2">
                    <Link href={`/card/${card.id}`} className="font-serif text-lg font-semibold hover:underline">
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

                {mode === 'physical' ? (
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setPickerIndex(di)
                        setPickerQ('')
                      }}
                      className="inline-flex items-center gap-2 rounded-xl2 border border-black/10 bg-white/70 px-3 py-2 text-sm text-black/70 hover:bg-white"
                    >
                      <Search className="h-4 w-4" />
                      {card ? 'Change card' : 'Choose card'}
                    </button>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-black/10 bg-white/50 p-4 text-xs text-black/55">
          Tip: Save or share your URL to return to this exact reading.
        </div>
      </aside>

      {pickerIndex != null ? (
        <div
          className="fixed inset-0 z-[120] flex items-start justify-center bg-black/30 p-4 pt-20 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-black/10 bg-white shadow-glow">
            <div className="flex items-center justify-between gap-2 border-b border-black/5 p-4">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-black/85">Choose a card</div>
                <div className="mt-1 text-xs text-black/50">
                  Search by title, character, keyword, or major number (e.g., XIII).
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPickerIndex(null)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl2 hover:bg-black/5"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-black/60" />
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 rounded-xl2 border border-black/10 bg-black/5 px-3 py-2">
                <Search className="h-4 w-4 text-black/50" />
                <input
                  autoFocus
                  value={pickerQ}
                  onChange={(e) => setPickerQ(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setPickerIndex(null)
                  }}
                  placeholder="Search the deck…"
                  className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-black/35"
                />
              </div>

              <div className="mt-4 max-h-[60vh] overflow-auto rounded-xl2 border border-black/10">
                <ul className="divide-y divide-black/5">
                  {pickerResults.map((c) => {
                    const selected = drawn?.[pickerIndex]?.id === c.id
                    return (
                      <li key={c.id}>
                        <button
                          type="button"
                          onClick={() => {
                            assignCard(pickerIndex, c.id)
                            setPickerIndex(null)
                          }}
                          className={cn(
                            'flex w-full items-center gap-3 p-3 text-left hover:bg-black/5',
                            selected ? 'bg-black/5' : '',
                          )}
                        >
                          <div className="relative h-14 w-10 overflow-hidden rounded-lg border border-black/10 bg-white">
                            <Image
                              src={c.image}
                              alt={c.title}
                              fill
                              className="object-contain p-1"
                              sizes="40px"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-semibold text-black/85">{c.title}</div>
                            <div className="truncate text-xs text-black/55">
                              {c.character ?? (c.arcana === 'major' ? `Major · ${c.majorNumber}` : `${c.rank} · ${c.suit}`)}
                            </div>
                          </div>
                          {selected ? (
                            <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">Selected</span>
                          ) : null}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="mt-3 text-xs text-black/45">
                Can’t find it? Try fewer words, a partial title ("magici"), or a keyword from the meaning.
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {toast ? (
        <div className="fixed bottom-5 left-1/2 z-[200] -translate-x-1/2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      ) : null}
    </div>
  )
}

function CardArt({
  card,
  reversed,
  label,
  tiltIndex,
  sizes,
}: {
  card?: { id: string; title: string; image: string } | undefined
  reversed?: boolean
  label?: string
  tiltIndex?: number
  sizes: string
}) {
  const tilt = typeof tiltIndex === 'number' ? ((tiltIndex % 3) - 1) * 1.15 : 0
  const lift = typeof tiltIndex === 'number' ? ((tiltIndex % 2) * 2 - 1) * 2 : 0

  return (
    <div
      className={cn(
        'relative aspect-[7/11] w-full overflow-hidden rounded-[22px] border border-black/10 bg-white/55 shadow-sm',
        'p-2',
      )}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[18px] bg-white/50"
        style={{
          transform: card
            ? `translateY(${lift}px) rotate(${tilt}deg)`
            : `translateY(0px) rotate(0deg)`,
          transition: 'transform 320ms ease',
        }}
      >
        {card ? (
          <Image
            src={card.image}
            alt={card.title}
            fill
            className={cn(
              'object-contain p-2',
              reversed ? 'rotate-180' : '',
            )}
            sizes={sizes}
          />
        ) : (
          <CardBack />
        )}
      </div>

      {label ? (
        <div className="absolute inset-0 grid place-items-center">
          <div className="rounded-full bg-black/70 px-3 py-1 text-[11px] font-semibold text-white">
            {label}
          </div>
        </div>
      ) : null}

      {reversed ? (
        <div className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-semibold text-white">
          Reversed
        </div>
      ) : null}
    </div>
  )
}

function CardBack() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.06),rgba(0,0,0,0.02))]" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="rounded-2xl border border-black/10 bg-white/65 px-4 py-3 text-center">
          <div className="font-serif text-lg font-semibold text-black/80">R H O T</div>
          <div className="mt-1 text-[11px] text-black/55">Real House of Tarot</div>
        </div>
      </div>
    </div>
  )
}

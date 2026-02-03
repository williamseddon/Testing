'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RefreshCw, Sparkles } from 'lucide-react'

import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { cards, cardsById } from '@/data/cards'
import { BLUR_DATA_URL } from '@/lib/blur'
import { cn } from '@/lib/utils'
import { gradientForTheme, themeForCard } from '@/lib/theme'

function safeRandomInt(maxExclusive: number) {
  if (maxExclusive <= 0) return 0
  try {
    const arr = new Uint32Array(1)
    crypto.getRandomValues(arr)
    return arr[0] % maxExclusive
  } catch {
    return Math.floor(Math.random() * maxExclusive)
  }
}

export function HomeQuickPull() {
  const [cardId, setCardId] = useState<string | null>(null)

  const card = useMemo(() => {
    if (!cardId) return null
    return cardsById.get(cardId) ?? null
  }, [cardId])

  function pull() {
    // Avoid immediately repeating the same card if possible.
    const ids = cards.map((c) => c.id)
    if (!ids.length) return
    if (ids.length === 1) {
      setCardId(ids[0]!)
      return
    }

    let next = ids[safeRandomInt(ids.length)]!
    if (cardId) {
      let guard = 0
      while (next === cardId && guard < 8) {
        next = ids[safeRandomInt(ids.length)]!
        guard += 1
      }
    }
    setCardId(next)
  }

  if (!card) {
    return (
      <div className="mt-4">
        <div className="grid place-items-center">
          <button
            type="button"
            onClick={pull}
            className="relative aspect-[7/11] w-full max-w-[220px] overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-sm"
            aria-label="Pull a card"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.08),transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.05),rgba(0,0,0,0.02))]" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-center">
                <div className="font-serif text-lg font-semibold text-black/80">R H O T</div>
                <div className="mt-1 text-[11px] text-black/55">Tap to pull</div>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="soft" onClick={pull} className="justify-center">
            <Sparkles className="h-4 w-4" />
            Pull a card
          </Button>
          <Button href="/read/one-card" variant="ghost" className="justify-center">
            One‑card pull page
          </Button>
        </div>
      </div>
    )
  }

  const theme = themeForCard(card)

  return (
    <div className="mt-4">
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br p-4 shadow-sm',
          gradientForTheme(theme),
        )}
      >
        <div className="absolute inset-0 opacity-70 [mask-image:radial-gradient(240px_200px_at_55%_35%,black,transparent)]">
          <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.9),transparent_60%)]" />
        </div>

        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-serif text-xl font-semibold leading-tight tracking-tight">{card.title}</div>
            <div className="mt-1 truncate text-xs text-black/60">
              {card.character ?? (card.arcana === 'major' ? 'Major Arcana' : card.suit)}
            </div>
          </div>

          <Badge className="shrink-0 bg-white/80">
            {card.arcana === 'major'
              ? `Major · ${card.majorNumber}`
              : `${card.rank} · ${card.suit}`}
          </Badge>
        </div>

        <div className="relative mt-4 grid place-items-center">
          <div className="relative h-[320px] w-[200px] overflow-hidden rounded-[26px] border border-black/10 bg-white shadow-sm">
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-contain p-2"
              sizes="200px"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
        </div>

        <div className="relative mt-4 flex flex-wrap gap-2">
          <Link
            href={`/card/${card.id}`}
            className="inline-flex items-center gap-2 rounded-xl2 border border-black/10 bg-white/80 px-3 py-2 text-sm font-medium text-black/75 hover:bg-white"
          >
            <Sparkles className="h-4 w-4" />
            Details
          </Link>

          <Button variant="ghost" onClick={pull} className="justify-center">
            <RefreshCw className="h-4 w-4" />
            Pull again
          </Button>
        </div>
      </div>
    </div>
  )
}

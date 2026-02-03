import Link from 'next/link'
import Image from 'next/image'
import type { TarotCard } from '@/data/types'
import { cn } from '@/lib/utils'
import { gradientForTheme, themeForCard } from '@/lib/theme'
import { Badge } from '@/components/Badge'
import { BLUR_DATA_URL } from '@/lib/blur'

export function CardTile({
  card,
  priority,
}: {
  card: TarotCard
  priority?: boolean
}) {
  const theme = themeForCard(card)
  return (
    <Link
      href={`/card/${card.id}`}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br shadow-sm transition',
        'hover:-translate-y-0.5 hover:shadow-glow',
        gradientForTheme(theme),
      )}
    >
      <div className="absolute inset-0 opacity-60 [mask-image:radial-gradient(240px_200px_at_55%_35%,black,transparent)]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.9),transparent_60%)]" />
      </div>

      <div className="relative p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-serif text-lg font-semibold leading-tight tracking-tight">
              {card.title}
            </div>
            <div className="mt-1 truncate text-xs text-black/60">
              {card.character ?? (card.arcana === 'major' ? 'Major Arcana' : card.suit)}
            </div>
          </div>

          <Badge className="shrink-0">
            {card.arcana === 'major'
              ? `Major · ${card.majorNumber}`
              : `${card.rank} · ${card.suit}`}
          </Badge>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-xl border border-black/10 bg-white">
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-contain p-1 transition duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 64px, 96px"
              priority={priority}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
          <div className="min-w-0">
            {card.quote ? (
              <p className="line-clamp-3 text-sm text-black/70">
                <span className="font-medium text-black/80">“</span>
                {card.quote}
                <span className="font-medium text-black/80">”</span>
              </p>
            ) : (
              <p className="text-sm text-black/55">Open for meaning and guidance.</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { Badge } from '@/components/Badge'
import { cards, getCard, getNeighbors } from '@/data/cards'
import { gradientForTheme, themeForCard } from '@/lib/theme'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { BLUR_DATA_URL } from '@/lib/blur'

export function generateStaticParams() {
  return cards.map((c) => ({ id: c.id }))
}

export default function CardPage({ params }: { params: { id: string } }) {
  const card = getCard(params.id)
  if (!card) return notFound()

  const theme = themeForCard(card)
  const { prev, next } = getNeighbors(card.id)

  return (
    <Container className="py-10">
      <div className="grid gap-8 lg:grid-cols-[360px,1fr]">
        <div
          className={cn(
            'relative overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br p-5 shadow-glow',
            gradientForTheme(theme),
          )}
        >
          <div className="absolute inset-0 opacity-70 [mask-image:radial-gradient(280px_220px_at_55%_35%,black,transparent)]">
            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.9),transparent_60%)]" />
          </div>

          <div className="relative">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight">
                  {card.title}
                </h1>
                <div className="mt-1 text-sm text-black/65">
                  {card.character ?? (card.arcana === 'major' ? 'Major Arcana' : card.suit)}
                </div>
              </div>
              <Badge>
                {card.arcana === 'major'
                  ? `Major · ${card.majorNumber}`
                  : `${card.rank} · ${card.suit}`}
              </Badge>
            </div>

            <div className="mt-5 grid place-items-center">
              <div className="relative h-[420px] w-[260px] overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-sm">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 1024px) 260px, 320px"
                  priority
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>
            </div>

            {card.callout ? (
              <div className="mt-6 rounded-2xl border border-black/10 bg-white/60 p-4 text-center font-serif text-xl italic text-black/80">
                {card.callout}
              </div>
            ) : null}

            <div className="mt-6 flex items-center justify-between gap-2">
              <Link
                href="/deck"
                className="inline-flex items-center gap-2 text-sm font-medium text-black/70 hover:text-black"
              >
                <ArrowLeft className="h-4 w-4" /> Back to deck
              </Link>
            </div>
          </div>
        </div>

        <article className="rounded-2xl border border-black/10 bg-white/60 p-6 backdrop-blur">
          {card.quote ? (
            <blockquote className="rounded-2xl border border-black/10 bg-white/60 p-5">
              <div className="text-xs font-medium uppercase tracking-wider text-black/45">
                Opening Line
              </div>
              <p className="mt-2 font-serif text-2xl leading-snug text-black/85">
                “{card.quote}”
              </p>
            </blockquote>
          ) : null}

          <div className="mt-6 prose-tarot text-base text-black/70">
            {card.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {card.kicker ? (
            <div className="mt-6 rounded-2xl border border-black/10 bg-white/50 p-5 text-sm text-black/70">
              <div className="text-xs font-medium uppercase tracking-wider text-black/45">
                Signature
              </div>
              <p className="mt-2">{card.kicker}</p>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              {prev ? (
                <Link
                  href={`/card/${prev.id}`}
                  className="inline-flex items-center gap-2 rounded-xl2 border border-black/10 bg-white/70 px-3 py-2 text-sm text-black/70 hover:bg-white"
                >
                  <ArrowLeft className="h-4 w-4" /> {prev.title}
                </Link>
              ) : null}
            </div>

            <div className="flex gap-2 sm:justify-end">
              {next ? (
                <Link
                  href={`/card/${next.id}`}
                  className="inline-flex items-center gap-2 rounded-xl2 border border-black/10 bg-white/70 px-3 py-2 text-sm text-black/70 hover:bg-white"
                >
                  {next.title} <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          </div>
        </article>
      </div>
    </Container>
  )
}

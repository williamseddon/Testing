import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { spreads } from '@/data/spreads'
import Link from 'next/link'
import { Shuffle, Sparkles } from 'lucide-react'

export default function ReadIndexPage() {
  return (
    <Container className="py-10">
      <header className="space-y-3">
        <h1 className="font-serif text-4xl font-semibold tracking-tight">
          Card Spreads
        </h1>
        <p className="max-w-2xl text-base text-black/65">
          Choose a spread, shuffle the deck, and tap to reveal each card. Your
          reading becomes a shareable link.
        </p>
      </header>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {spreads.map((s) => (
          <div
            key={s.id}
            className="rounded-2xl border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-serif text-2xl font-semibold">{s.name}</div>
                <div className="mt-1 text-sm text-black/60">{s.tagline}</div>
              </div>
              <div className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-black/60">
                {s.cards} cards
              </div>
            </div>

            <p className="mt-4 text-sm text-black/65">{s.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Button href={`/read/${s.id}`} size="md">
                <Shuffle className="h-4 w-4" />
                Start {s.name}
              </Button>
              <Link
                href={`/read/${s.id}`}
                className="inline-flex items-center gap-2 rounded-xl2 border border-black/10 bg-white/70 px-3 py-2 text-sm text-black/70 hover:bg-white"
              >
                <Sparkles className="h-4 w-4" /> View prompts
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-black/10 bg-white/60 p-6">
        <div className="font-serif text-2xl font-semibold">Quick pull</div>
        <p className="mt-2 text-sm text-black/65">
          Want a single card to set the tone? Try a one‑card pull.
        </p>
        <div className="mt-4">
          <Button href="/read/one-card" variant="soft">
            <Shuffle className="h-4 w-4" />
            One‑card pull
          </Button>
        </div>
      </div>
    </Container>
  )
}

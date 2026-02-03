import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { spreads } from '@/data/spreads'
import Link from 'next/link'
import { Shuffle, Sparkles, ArrowRight } from 'lucide-react'

export default function ReadIndexPage() {
  return (
    <Container className="py-10">
      <header className="space-y-3">
        <h1 className="font-serif text-4xl font-semibold tracking-tight">
          Spreads
        </h1>
        <p className="max-w-3xl text-base text-black/65">
          Use these spreads two ways: pull cards from your physical deck and keep the prompts on screen, or let the app shuffle and draw for a quick digital read.
        </p>
      </header>

      <div className="mt-6 rounded-2xl border border-black/10 bg-white/60 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-serif text-2xl font-semibold">Reading with your physical deck?</div>
            <p className="mt-2 text-sm text-black/65">
              Choose a spread below for the position prompts, then draw your cards in real life. You can look up any card in the <Link href="/deck" className="font-medium text-black hover:underline">deck library</Link>.
            </p>
          </div>
          <Button href="/get-started" variant="soft" className="justify-center">
            Start with your deck <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

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

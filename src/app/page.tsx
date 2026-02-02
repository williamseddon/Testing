import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { CardTile } from '@/components/cards/CardTile'
import { cardsById } from '@/data/cards'
import { site } from '@/data/site'
import { Sparkles, Layers, Shuffle } from 'lucide-react'

const featuredIds = [
  'major-00-the-fool',
  'major-01-the-magician',
  'wands-ace',
  'cups-two',
  'swords-queen',
  'pentacles-king',
]

export default function HomePage() {
  const featured = featuredIds
    .map((id) => cardsById.get(id))
    .filter(Boolean)
    .slice(0, 6)

  return (
    <div>
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-black/60">
              <Sparkles className="h-4 w-4" />
              {site.tagline}
            </div>

            <h1 className="mt-4 font-serif text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              A best‑in‑class digital guide for your next reading.
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-black/65">
              Explore all 78 cards, search by quote or Housewife, and run
              interactive spreads with shareable links.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/read" size="lg">
                <Shuffle className="h-4 w-4" />
                Start a Reading
              </Button>
              <Button href="/deck" size="lg" variant="secondary">
                <Layers className="h-4 w-4" />
                Browse the Deck
              </Button>
              <Button href="/about" size="lg" variant="ghost">
                Our Story
              </Button>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-black/60 sm:grid-cols-3">
              <Feature title="Fast + shareable" body="Readings live in the URL so you can share results." />
              <Feature title="Search everything" body="Titles, quotes, signatures, and Housewives." />
              <Feature title="Made for mobile" body="Tap-to-reveal cards with clear prompts." />
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur">
            <div className="font-serif text-2xl font-semibold">Today’s vibe</div>
            <p className="mt-2 text-sm text-black/60">
              Need inspo? Jump in with a featured pull.
            </p>

            <div className="mt-4 grid gap-3">
              {featured.slice(0, 3).map((c, i) => (
                <CardTile key={c!.id} card={c!} priority={i === 0} />
              ))}
            </div>
          </div>
        </div>

        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight">
                Featured cards
              </h2>
              <p className="mt-2 text-sm text-black/60">
                A quick sampler across Major + all four suits.
              </p>
            </div>
            <Button href="/deck" variant="ghost">
              View all
            </Button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c, i) => (
              <CardTile key={c!.id} card={c!} priority={i < 3} />
            ))}
          </div>
        </section>
      </Container>
    </div>
  )
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/60 p-4">
      <div className="text-sm font-medium text-black/75">{title}</div>
      <div className="mt-1 text-sm text-black/55">{body}</div>
    </div>
  )
}

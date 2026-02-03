import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { CardTile } from '@/components/cards/CardTile'
import { cardsById } from '@/data/cards'
import { site } from '@/data/site'
import { Sparkles, Layers, Shuffle, ShoppingBag } from 'lucide-react'
import { HomeQuickPull } from '@/components/home/HomeQuickPull'

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
              Start here with your physical deck.
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-black/65">
              Scanned the QR code in the box? Welcome. Use this guide to look up any card fast, keep
              spread prompts on screen while you read, and save notes as you go. Digital pulls are
              here too — just not the main event.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/get-started" size="lg">
                <Sparkles className="h-4 w-4" />
                Start with your deck
              </Button>
              <Button href="/deck" size="lg" variant="soft">
                <Layers className="h-4 w-4" />
                Search the deck
              </Button>
              <Button href="/read/one-card" size="lg" variant="ghost">
                <Shuffle className="h-4 w-4" />
                Quick digital pull
              </Button>
              <Button href="/store" size="lg" variant="ghost">
                <ShoppingBag className="h-4 w-4" />
                Shop the deck
              </Button>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-black/60 sm:grid-cols-3">
              <Feature
                title="Physical-first"
                body="Shuffle your real cards, then use prompts + meanings here as you flip." 
              />
              <Feature
                title="Search that actually finds cards"
                body="Search by title, character, keywords, majors by number, and meanings." 
              />
              <Feature
                title="Digital, when you want it"
                body="Try a quick pull, practice anywhere, and share your reading with a link." 
              />
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur">
            <div className="font-serif text-2xl font-semibold">Try a quick pull</div>
            <p className="mt-2 text-sm text-black/60">
              No deck in hand? Here’s a simple one‑card digital pull.
            </p>

            <HomeQuickPull />
          </div>
        </div>

        <section className="mt-14">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight">
                Browse the deck
              </h2>
              <p className="mt-2 text-sm text-black/60">
                A quick sampler across the Major + all four suits.
              </p>
            </div>
            <Button href="/deck" variant="ghost">
              View the full deck
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

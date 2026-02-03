import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { site } from '@/data/site'

export const metadata = {
  title: `Get started • ${site.productName}`,
}

export default function GetStartedPage() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-3xl">
        <Badge className="bg-white/70">Start here</Badge>

        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Start with your physical deck.
        </h1>

        <p className="mt-4 text-lg text-black/65">
          If you scanned the QR code inside the box, you’re in the right place. Use this guide to
          follow spread prompts, look up any card fast, and keep your reading moving.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="#new" size="lg" className="justify-center">
            I’m new
          </Button>
          <Button href="#experienced" size="lg" variant="soft" className="justify-center">
            I’m experienced
          </Button>
          <Button href="/deck" size="lg" variant="ghost" className="justify-center">
            Search the deck
          </Button>
        </div>

        <section className="mt-10 rounded-2xl border border-black/10 bg-white/60 p-6 backdrop-blur">
          <h2 className="font-serif text-2xl font-semibold">Physical‑deck flow</h2>
          <p className="mt-2 text-sm text-black/60">
            This is the default way to use {site.productName}. Shuffle your real cards, then use your
            phone for prompts + meanings.
          </p>

          <ol className="mt-4 space-y-3 text-black/70">
            <li>
              <span className="font-semibold">1) Ask a good question.</span> Something you can work
              with: “What am I not seeing?” beats “Tell me everything.”
            </li>
            <li>
              <span className="font-semibold">2) Shuffle + cut.</span> Cut into 2–3 piles when it
              feels right, then stack them back together.
            </li>
            <li>
              <span className="font-semibold">3) Choose a spread.</span> Use the prompts here, then
              place your physical cards face‑down in the positions.
            </li>
            <li>
              <span className="font-semibold">4) Flip one card at a time.</span> Look up each card as
              you reveal it (search is your friend).
            </li>
            <li>
              <span className="font-semibold">5) Tell the story.</span> Notice repeating suits,
              patterns, and who’s doing the talking.
            </li>
          </ol>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/read" variant="soft">
              Browse spreads
            </Button>
            <Button href="/read/one-card" variant="ghost">
              One‑card pull
            </Button>
          </div>
        </section>

        <section id="new" className="mt-10 scroll-mt-24">
          <div className="rounded-2xl border border-black/10 bg-white/60 p-6 backdrop-blur">
            <h2 className="font-serif text-2xl font-semibold">I’m new</h2>
            <p className="mt-2 text-black/70">
              Keep it simple. You don’t need to memorize anything — just follow the prompt, then read
              the card like a scene.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-black/10 bg-white/50 p-5">
                <div className="text-sm font-medium text-black/80">A quick glossary</div>
                <ul className="mt-3 space-y-2 text-sm text-black/70">
                  <li>
                    <span className="font-semibold">Major Arcana</span>: big themes, turning points,
                    the headline.
                  </li>
                  <li>
                    <span className="font-semibold">Minor Arcana</span>: the day‑to‑day, the details,
                    how it plays out.
                  </li>
                  <li>
                    <span className="font-semibold">Suits</span>: Cups = feelings, Wands = drive,
                    Swords = mind, Pentacles = real‑world.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white/50 p-5">
                <div className="text-sm font-medium text-black/80">Beginner rules that help</div>
                <ul className="mt-3 space-y-2 text-sm text-black/70">
                  <li>
                    <span className="font-semibold">Start small.</span> One‑card and three‑card
                    spreads build confidence quickly.
                  </li>
                  <li>
                    <span className="font-semibold">Reversals are optional.</span> If they feel like
                    noise, leave them off.
                  </li>
                  <li>
                    <span className="font-semibold">Your intuition wins.</span> The guide supports you
                    — it doesn’t overrule you.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-black/10 bg-white/50 p-5">
              <div className="text-sm font-medium text-black/80">Start with these</div>
              <div className="mt-3 flex flex-wrap gap-3">
                <Button href="/read/one-card" variant="soft">
                  One‑card pull
                </Button>
                <Button href="/read/sip-n-see" variant="ghost">
                  Sip N See (3 cards)
                </Button>
                <Button href="/deck" variant="ghost">
                  Card library
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="experienced" className="mt-10 scroll-mt-24">
          <div className="rounded-2xl border border-black/10 bg-white/60 p-6 backdrop-blur">
            <h2 className="font-serif text-2xl font-semibold">I’m experienced</h2>
            <p className="mt-2 text-black/70">
              Use this site as your fast companion: prompts on the left, card meanings on demand,
              shareable URLs when you do a digital pull.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-black/10 bg-white/50 p-5">
                <div className="text-sm font-medium text-black/80">Advanced shortcuts</div>
                <ul className="mt-3 space-y-2 text-sm text-black/70">
                  <li>
                    <span className="font-semibold">Track the suits.</span> What’s dominating the
                    room? What’s missing?
                  </li>
                  <li>
                    <span className="font-semibold">Read the relationships.</span> Which cards echo or
                    contradict each other?
                  </li>
                  <li>
                    <span className="font-semibold">Write the headline.</span> One sentence you can
                    remember tomorrow.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white/50 p-5">
                <div className="text-sm font-medium text-black/80">Journaling prompts</div>
                <ul className="mt-3 space-y-2 text-sm text-black/70">
                  <li>What’s the card asking you to admit?</li>
                  <li>What would change if you acted on this advice for 7 days?</li>
                  <li>What’s the boundary / action / conversation it points to?</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-black/10 bg-white/50 p-5">
              <div className="text-sm font-medium text-black/80">Go deeper with these spreads</div>
              <div className="mt-3 flex flex-wrap gap-3">
                <Button href="/read/reunion" variant="soft">
                  The Reunion
                </Button>
                <Button href="/read/sprinter-van" variant="ghost">
                  Sprinter Van
                </Button>
                <Button href="/read" variant="ghost">
                  All spreads
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-black/10 bg-white/60 p-6 backdrop-blur">
          <h2 className="font-serif text-2xl font-semibold">No deck with you?</h2>
          <p className="mt-2 text-black/70">
            Digital pulls are here when you want a quick check‑in, you’re traveling, or your deck is
            across the room.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button href="/read/one-card" variant="soft">
              Quick one‑card pull
            </Button>
            <Button href="/read" variant="ghost">
              Digital spreads
            </Button>
          </div>
        </section>

        <div className="mt-10 rounded-2xl border border-black/10 bg-white/50 p-6 text-sm text-black/65">
          Looking for the physical deck? Visit{' '}
          <a
            href={site.links.store}
            className="font-medium text-black hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            rhotarot.com/store
          </a>
          .
        </div>
      </div>
    </Container>
  )
}

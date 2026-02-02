import { Container } from '@/components/Container'
import { site } from '@/data/site'
import { Button } from '@/components/Button'

export default function AboutPage() {
  return (
    <Container className="py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr,360px]">
        <article className="rounded-2xl border border-black/10 bg-white/60 p-8 backdrop-blur">
          <h1 className="font-serif text-4xl font-semibold tracking-tight">
            {site.story.title}
          </h1>

          <div className="mt-6 prose-tarot text-base text-black/70">
            {site.story.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {site.story.callout ? (
            <div className="mt-6 rounded-2xl border border-black/10 bg-white/50 p-5 text-center font-serif text-2xl italic text-black/80">
              {site.story.callout}
            </div>
          ) : null}
        </article>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-black/10 bg-white/60 p-6">
            <div className="font-serif text-2xl font-semibold">
              {site.contact.title}
            </div>
            <div className="mt-4 space-y-2 text-sm text-black/65">
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-black/45">
                  Website
                </div>
                <div>{site.contact.website}</div>
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-black/45">
                  Email
                </div>
                <div>{site.contact.email}</div>
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-black/45">
                  Social
                </div>
                <div>{site.contact.social}</div>
              </div>
            </div>

            <div className="mt-5">
              <Button href="/deck" variant="soft">
                Explore the deck
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/60 p-6 text-xs text-black/55">
            {site.disclaimer}
          </div>
        </aside>
      </div>
    </Container>
  )
}

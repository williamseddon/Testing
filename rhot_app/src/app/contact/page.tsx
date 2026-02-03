import Link from 'next/link'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { site } from '@/data/site'

export const metadata = {
  title: `Contact • ${site.productName}`,
}

export default function ContactPage() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-2xl">
        <Badge className="bg-white/70">Contact</Badge>
        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Say hello
        </h1>

        <p className="mt-4 text-lg text-black/65">
          Questions, collaborations, press, or wholesale — we’d love to hear from you.
        </p>

        <div className="mt-6 rounded-2xl border border-black/10 bg-white/60 p-6">
          <div className="grid gap-4 text-sm text-black/70">
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-black/45">
                Email
              </div>
              <a className="mt-1 inline-block font-medium text-black hover:underline" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-black/45">
                Instagram
              </div>
              <a
                className="mt-1 inline-block font-medium text-black hover:underline"
                href="https://instagram.com/rhotarot"
                target="_blank"
                rel="noreferrer"
              >
                {site.contact.social}
              </a>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-black/45">
                Contact form
              </div>
              <a
                className="mt-1 inline-block font-medium text-black hover:underline"
                href="https://rhotarot.com/contact"
                target="_blank"
                rel="noreferrer"
              >
                rhotarot.com/contact
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button as="a" href={`mailto:${site.contact.email}`} className="justify-center">
              Email us
            </Button>
            <Button as="a" href="https://rhotarot.com/contact" target="_blank" rel="noreferrer" variant="soft">
              Open contact page
            </Button>
            <Button as="link" href="/get-started" variant="ghost">
              Get started
            </Button>
          </div>
        </div>

        <div className="mt-10 text-sm text-black/55">
          Looking for the store? <Link href="/store" className="font-medium text-black hover:underline">Go to the store page</Link>.
        </div>
      </div>
    </Container>
  )
}

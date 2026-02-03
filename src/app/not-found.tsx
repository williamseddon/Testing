import Link from 'next/link'
import { Container } from '@/components/Container'

export default function NotFound() {
  return (
    <Container className="py-20">
      <div className="mx-auto max-w-xl rounded-2xl border border-black/10 bg-white/60 p-10 text-center backdrop-blur">
        <h1 className="font-serif text-4xl font-semibold">Not found</h1>
        <p className="mt-3 text-sm text-black/60">
          That page doesn’t exist — like a lost confessional clip.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-xl2 bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
          >
            Home
          </Link>
          <Link
            href="/deck"
            className="rounded-xl2 border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-black hover:bg-white"
          >
            Explore deck
          </Link>
        </div>
      </div>
    </Container>
  )
}

import { Container } from '@/components/Container'
import { site } from '@/data/site'

export default function DisclaimerPage() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white/60 p-8 backdrop-blur">
        <h1 className="font-serif text-4xl font-semibold tracking-tight">
          Disclaimer
        </h1>
        <p className="mt-5 text-base text-black/70">{site.disclaimer}</p>

        <p className="mt-6 text-sm text-black/60">
          Tarot is a reflective tool. Interpretations are for inspiration and
          entertainment, and are not a substitute for professional advice.
        </p>
      </div>
    </Container>
  )
}

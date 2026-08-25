import testimonialsData from '../../data/testimonials.json'
import type { Testimonial } from '../../types'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const testimonials = testimonialsData as Testimonial[]

// Reuses the same verified testimonial data already live on Collections —
// never a new, separately-invented quote.
export function PartnerQuote() {
  const testimonial = testimonials.find((t) => t.n === 'Tomas Vandeputte') ?? testimonials[0]
  if (!testimonial) return null

  return (
    <section className="relative bg-ink-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Partner Testimonial</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl font-display text-2xl font-normal italic leading-[1.4] text-cream-100 sm:text-3xl lg:text-[2.2rem]">
            "{testimonial.q}"
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-7 text-[13.5px] uppercase tracking-widest text-cream-200/50">
            {testimonial.n} · {testimonial.r}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

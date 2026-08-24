import { SectionLabel } from '../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

const PRINCIPLES = [
  { number: '01', title: 'Comfort', copy: 'Designed around the way people actually sit, relax and live.' },
  { number: '02', title: 'Motion', copy: 'Movement becomes part of the experience rather than an afterthought.' },
  { number: '03', title: 'Technology', copy: 'Intelligent features remain intuitive and naturally integrated.' },
  { number: '04', title: 'Craft', copy: 'Every detail contributes to the feeling of the finished piece.' },
]

export function BrandPrinciples() {
  return (
    <section className="relative bg-ink-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>What We Believe</SectionLabel>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p) => (
            <RevealItem key={p.number}>
              <span className="font-display text-sm italic tabular-nums text-gold-400/80">{p.number}</span>
              <h3 className="mt-3 font-display text-2xl text-cream-100">{p.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-cream-200/60">{p.copy}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

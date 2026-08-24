import { Armchair, Sliders, Thermometer, Zap } from 'lucide-react'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

const CAPABILITIES = [
  {
    icon: Zap,
    title: 'Motion',
    copy: 'A motorized mechanism that reclines quietly and consistently — precision that stays out of view.',
  },
  {
    icon: Armchair,
    title: 'Comfort',
    copy: 'Ergonomic positioning across seat, back and leg support, tuned to how the body actually rests.',
  },
  {
    icon: Sliders,
    title: 'Control',
    copy: 'Smart touchscreen interface, remote and voice control on Climate Smart pieces — simple, not technical.',
  },
  {
    icon: Thermometer,
    title: 'Climate',
    copy: 'Patented liquid cooling & heating technology, where the family carries it, for a personal temperature range.',
  },
]

export function EngineeredExperience() {
  return (
    <section className="relative overflow-hidden bg-teal-950/15 py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950 via-teal-950/15 to-ink-950" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Engineered Into the Experience</SectionLabel>
          <h2 className="mt-5 max-w-lg font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
            Technology should <span className="italic text-gold-400">disappear into comfort.</span>
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((c) => (
            <RevealItem key={c.title}>
              <c.icon className="h-5 w-5 text-gold-400/80" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-xl text-cream-100">{c.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-cream-200/60">{c.copy}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

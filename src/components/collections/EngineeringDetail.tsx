import { Cog, Ruler, Waves, Palette } from 'lucide-react'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

const SPECS = [
  { icon: Cog, label: 'Motion System', value: 'Silent motor & hand-crank glide', border: '' },
  { icon: Ruler, label: 'Frame', value: 'Hardwood, hand-jointed', border: 'border-t sm:border-t-0 sm:border-l' },
  { icon: Waves, label: 'Suspension', value: 'Hand-tied, zone-tensioned', border: 'border-t lg:border-t-0 lg:border-l' },
  {
    icon: Palette,
    label: 'Upholstery',
    value: 'Curated fabric archive, made to order',
    border: 'border-t sm:border-l lg:border-t-0',
  },
]

export function EngineeringDetail() {
  return (
    <section className="relative bg-ink-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>The Construction</SectionLabel>
        </Reveal>

        <RevealGroup className="mt-8 grid grid-cols-1 border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {SPECS.map((spec) => (
            <RevealItem
              key={spec.label}
              className={`group flex items-start gap-4 border-white/10 px-1 py-7 sm:px-6 ${spec.border}`}
            >
              <spec.icon
                className="h-5 w-5 flex-none text-gold-400 transition-transform duration-500 group-hover:scale-110"
                strokeWidth={1.5}
              />
              <div>
                <p className="text-[11px] uppercase tracking-widest text-cream-200/45">{spec.label}</p>
                <p className="mt-1.5 font-display text-base text-cream-100">{spec.value}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

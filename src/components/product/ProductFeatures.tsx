import { Zap, Smartphone, Thermometer, Mic, Radio, Armchair, Palette, Wind } from 'lucide-react'
import type { HomeProduct } from '../../data/homeProducts'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

interface FeatureRule {
  match: (specs: string[]) => boolean
  icon: typeof Zap
  label: string
}

const RULES: FeatureRule[] = [
  {
    match: (s) => s.some((x) => /motorized reclining|reclining seats?$|reclining position/i.test(x)),
    icon: Zap,
    label: 'Motorized Reclining',
  },
  {
    match: (s) => s.some((x) => /smart touchscreen|interface control/i.test(x)),
    icon: Smartphone,
    label: 'Smart Interface Control',
  },
  {
    match: (s) => s.some((x) => /liquid cooling|temperature range/i.test(x)),
    icon: Thermometer,
    label: 'Liquid Cooling & Heating',
  },
  {
    match: (s) => s.some((x) => /voice control/i.test(x)),
    icon: Mic,
    label: 'Voice Control',
  },
  {
    match: (s) => s.some((x) => /remote control/i.test(x)),
    icon: Radio,
    label: 'Remote Control',
  },
  {
    match: (s) => s.some((x) => /ergonomic/i.test(x)),
    icon: Armchair,
    label: 'Ergonomic Support',
  },
  {
    match: (s) => s.some((x) => /upholstery/i.test(x)),
    icon: Palette,
    label: 'Premium Upholstery',
  },
  {
    match: (s) => s.some((x) => /static seating|no reclining/i.test(x)),
    icon: Wind,
    label: 'Static, Timeless Seating',
  },
]

export function ProductFeatures({ product }: { product: HomeProduct }) {
  const features = RULES.filter((r) => r.match(product.specifications))

  if (features.length === 0) return null

  return (
    <section className="relative bg-ink-950 py-14 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionLabel>What Makes It {product.name.split('|').pop()?.trim() ?? product.name}</SectionLabel>

        <RevealGroup className="mt-8 flex flex-wrap gap-3 sm:gap-4">
          {features.map((f) => (
            <RevealItem key={f.label}>
              <div className="group flex items-center gap-3 rounded-full border border-white/10 bg-ink-900/40 py-3 pl-3 pr-5 transition-all duration-300 hover:border-gold-400/35 hover:bg-ink-900/70">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-gold-400/25 text-gold-400 transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                </span>
                <span className="text-[12.5px] font-medium uppercase tracking-wide text-cream-100/90">
                  {f.label}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

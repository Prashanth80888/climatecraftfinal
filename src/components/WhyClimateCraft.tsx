import { Thermometer, VolumeX, Hand, Ruler } from 'lucide-react'
import { SectionLabel } from './ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal'

const FEATURES = [
  {
    icon: Thermometer,
    title: 'Smart Comfort',
    description: 'Liquid-based temperature control that keeps you cool or warm, exactly how you like it.',
  },
  {
    icon: VolumeX,
    title: 'Silent by Design',
    description: 'Whisper-quiet motors, precision-engineered for effortless motion.',
  },
  {
    icon: Hand,
    title: 'Handcrafted',
    description: 'Skilled hands, fine materials. Made in Europe with meticulous attention.',
  },
  {
    icon: Ruler,
    title: 'Made to Order',
    description: 'Bespoke sizing, configurations and finishes — quoted, never priced.',
  },
]

export function WhyClimateCraft() {
  return (
    <section id="why-climate-craft" className="relative overflow-hidden bg-teal-950/40 py-16 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950 via-teal-950/30 to-ink-950" />
      <div
        className="pointer-events-none absolute right-[10%] top-1/3 h-2 w-2 rounded-full bg-teal-400/60 blur-[1px]"
        style={{ boxShadow: '0 0 40px 10px rgba(79,179,163,0.35)' }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel>Why Climate Craft</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-4xl font-normal leading-[1.08] text-cream-100 sm:text-5xl">
                Engineered with purpose.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-cream-200/70">
                Every mechanism, every seam, every material is chosen for one reason — to move beautifully for years
                to come.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-7">
            {FEATURES.map((feature) => (
              <RevealItem key={feature.title} className="group">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/25 text-gold-400 transition-all duration-500 group-hover:scale-110 group-hover:border-gold-400/60 group-hover:bg-gold-400/5">
                  <feature.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-display text-lg text-cream-100">{feature.title}</h3>
                <p className="mt-2 max-w-xs text-[13.5px] leading-relaxed text-cream-200/60">
                  {feature.description}
                </p>
                <span className="mt-4 block h-px w-6 bg-gold-400/30 transition-all duration-500 group-hover:w-12 group-hover:bg-gold-400/70" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}

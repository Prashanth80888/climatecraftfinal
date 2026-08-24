import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

const CAPABILITIES = [
  'Motorized reclining and leg-rest movement',
  'Smart touchscreen interface, remote and voice control',
  'Patented liquid cooling & heating technology',
  'Ergonomic positioning across seat, back and leg support',
]

export function TechHumanSplit() {
  return (
    <section className="relative bg-ink-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="overflow-hidden rounded-[28px] border border-white/[0.06] shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9)]">
                <img
                  src="/images/about/tech-split.png"
                  alt="Motorized control integrated into a Climate Craft recliner"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover sm:aspect-[4/3]"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <SectionLabel>Technology &amp; Human Experience</SectionLabel>
              <h2 className="mt-5 max-w-md font-display text-3xl font-normal leading-[1.1] text-cream-100 sm:text-4xl">
                Technology should <span className="italic text-gold-400">disappear into the experience.</span>
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream-200/65">
                We build motorized movement, smart control and climate technology into the furniture itself —
                intuitive to use, without ever becoming the visual focus of the piece.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-8 space-y-3 border-t border-white/10 pt-6">
                {CAPABILITIES.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-[14px] leading-relaxed text-cream-200/65">
                    <span className="mt-2 h-1 w-1 flex-none rounded-full bg-gold-400" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
